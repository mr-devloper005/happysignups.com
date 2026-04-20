"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, Save, ShieldCheck, Sparkles } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Create Classified",
    description: "Add a local-only classified ad.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Create Article",
    description: "Write a local-only article post.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it’s useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  if (!taskConfig || !formConfig) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
        <NavbarShell />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Building2 className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">This option isn&apos;t available</h1>
          <p className="mt-3 text-sm text-slate-600">
            This create flow isn&apos;t enabled for {SITE_CONFIG.name}. Head back to the homepage or browse properties.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Back to home
            </Link>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
            >
              Browse properties
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const inputCls =
    "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";
  const textareaCls =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";

  const HIGHLIGHTS = [
    { icon: ShieldCheck, title: "Verified review", body: "Every listing is checked before going live to keep quality high." },
    { icon: Sparkles, title: "Reach buyers fast", body: "Most listings receive their first inquiry within 48 hours." },
    { icon: Building2, title: "Free to publish", body: "Add your property at no cost. Optional Pro tools for serious sellers." },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to properties
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-800">
                {taskConfig.label}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                Saved to your browser
              </span>
            </div>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {formConfig.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{formConfig.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
            {/* Form card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Listing details
                  </p>
                  <h2 className="mt-1 text-xl font-bold tracking-tight">Tell us about the property</h2>
                </div>
              </div>

              <div className="mt-6 grid gap-5">
                {formConfig.fields.map((field) => (
                  <div key={field.key} className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700">
                      {field.label}
                      {field.required ? <span className="ml-1 text-rose-500">*</span> : null}
                    </label>

                    {field.type === "textarea" ? (
                      <Textarea
                        rows={4}
                        placeholder={field.placeholder}
                        value={values[field.key] || ""}
                        onChange={(event) => updateValue(field.key, event.target.value)}
                        className={textareaCls}
                      />
                    ) : field.type === "category" ? (
                      <select
                        value={values[field.key] || ""}
                        onChange={(event) => updateValue(field.key, event.target.value)}
                        className={inputCls}
                      >
                        <option value="">Select category</option>
                        {CATEGORY_OPTIONS.map((option) => (
                          <option key={option.slug} value={option.slug}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "file" ? (
                      <div className="grid gap-3">
                        <Input
                          type="file"
                          accept="application/pdf"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (!file) return;
                            if (file.type !== "application/pdf") {
                              toast({
                                title: "Invalid file",
                                description: "Please upload a PDF file.",
                              });
                              return;
                            }
                            const reader = new FileReader();
                            setUploadingPdf(true);
                            reader.onload = () => {
                              const result = typeof reader.result === "string" ? reader.result : "";
                              updateValue(field.key, result);
                              setUploadingPdf(false);
                              toast({
                                title: "PDF uploaded",
                                description: "File is stored locally.",
                              });
                            };
                            reader.readAsDataURL(file);
                          }}
                          className={inputCls}
                        />
                        <Input
                          type="text"
                          placeholder="Or paste a PDF URL"
                          value={values[field.key] || ""}
                          onChange={(event) => updateValue(field.key, event.target.value)}
                          className={inputCls}
                        />
                        {uploadingPdf ? (
                          <p className="text-xs text-slate-500">Uploading PDF…</p>
                        ) : null}
                      </div>
                    ) : (
                      <Input
                        type={field.type === "number" ? "number" : "text"}
                        placeholder={
                          field.type === "images" || field.type === "tags" || field.type === "highlights"
                            ? "Separate values with commas"
                            : field.placeholder
                        }
                        value={values[field.key] || ""}
                        onChange={(event) => updateValue(field.key, event.target.value)}
                        className={inputCls}
                      />
                    )}

                    {field.type === "images" || field.type === "tags" || field.type === "highlights" ? (
                      <p className="text-xs text-slate-500">Tip: separate multiple values with commas.</p>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Save className="h-4 w-4" />
                  Publish listing
                </button>
                <Link
                  href={taskConfig.route}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  View all {taskConfig.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Side highlights */}
            <aside className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Why list with {SITE_CONFIG.name}
                </p>
                <div className="mt-5 space-y-5">
                  {HIGHLIGHTS.map((h) => (
                    <div key={h.title} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                        <h.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">{h.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{h.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-100 via-sky-50 to-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900">Need help filling this out?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Our team can help you craft a great listing — pricing, photos, and copy.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  Talk to us
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

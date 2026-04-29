import Link from 'next/link'
import { ArrowRight, Globe, Mail, MessageCircle, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { PhotoLightboxGrid } from '@/components/shared/photo-lightbox-grid'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const yearEstablished =
    typeof content.yearEstablished === 'string' || typeof content.yearEstablished === 'number'
      ? String(content.yearEstablished)
      : 'N/A'
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          {'<-'} Back to {taskLabel}
        </Link>

        <section className="rounded-[1.3rem] border border-[#2459d3] bg-white p-4 shadow-[0_16px_36px_rgba(30,64,175,0.08)] sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[120px_1fr_auto] lg:items-start">
            <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em]">{post.title}</h1>
              <p className="mt-1 text-sm text-slate-600">{category || taskLabel}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={website || '#'}
                  target={website ? '_blank' : undefined}
                  rel={website ? 'noreferrer' : undefined}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#2366d1] px-6 text-sm font-semibold text-white hover:bg-[#1f57b4]"
                >
                  <MessageCircle className="h-4 w-4" /> Open Website
                </a>
                {phone ? (
                  <a href={`tel:${phone}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                    <Phone className="h-4 w-4" /> {phone}
                  </a>
                ) : null}
              </div>
            </div>
            <div className="justify-self-start lg:justify-self-end">
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5" /> Save
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-[#2459d3] bg-[#f7faff] px-4 py-2.5 text-sm text-slate-700">
            <span className="font-medium">Make a connection</span>{' '}
            <span className="text-slate-600">{post.title} is accepting messages.</span>
          </div>

          <div className="mt-4 rounded-xl border border-[#2459d3] bg-white p-4 sm:p-5">
            <div className="border-b border-[#2459d3] pb-3">
              <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-800">Company Details</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 border-b border-[#2459d3] py-3 text-sm sm:grid-cols-[170px_1fr]">
              <span className="font-semibold text-slate-700">Year Established</span>
              <span className="text-slate-700">{yearEstablished}</span>
            </div>

            <div className="border-b border-[#2459d3] py-4">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-slate-800">Tell Us About You And Your Company</h3>
              <RichContent html={descriptionHtml} className="mt-3 text-sm leading-7 text-slate-700" />
              {highlights.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {highlights.slice(0, 4).map((item) => (
                    <span key={item} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs text-slate-700">{item}</span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="pt-4">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-slate-800">Contact Information</h3>
              <div className="mt-3 space-y-3 text-sm">
                <div className="grid grid-cols-1 gap-2 border-t border-[#2459d3] pt-3 sm:grid-cols-[170px_1fr]">
                  <span className="font-semibold text-slate-700">Company Name</span>
                  <span className="text-slate-700">{post.title}</span>
                </div>
                {phone ? (
                  <div className="grid grid-cols-1 gap-2 border-t border-[#2459d3] pt-3 sm:grid-cols-[170px_1fr]">
                    <span className="font-semibold text-slate-700">Phone Number</span>
                    <a href={`tel:${phone}`} className="inline-flex w-fit items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-800 hover:bg-slate-50">
                      <Phone className="h-4 w-4" /> {phone}
                    </a>
                  </div>
                ) : null}
                {location ? (
                  <div className="grid grid-cols-1 gap-2 border-t border-[#2459d3] pt-3 sm:grid-cols-[170px_1fr]">
                    <span className="font-semibold text-slate-700">Location</span>
                    <span className="text-slate-700">{location}</span>
                  </div>
                ) : null}
                {email ? (
                  <div className="grid grid-cols-1 gap-2 border-t border-[#2459d3] pt-3 sm:grid-cols-[170px_1fr]">
                    <span className="font-semibold text-slate-700">Email</span>
                    <a href={`mailto:${email}`} className="inline-flex items-center gap-2 text-slate-700 underline-offset-4 hover:underline">
                      <Mail className="h-4 w-4" /> {email}
                    </a>
                  </div>
                ) : null}
                {website ? (
                  <div className="grid grid-cols-1 gap-2 border-t border-[#2459d3] pt-3 sm:grid-cols-[170px_1fr]">
                    <span className="font-semibold text-slate-700">Website</span>
                    <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-700 underline-offset-4 hover:underline">
                      <Globe className="h-4 w-4" /> Visit Website <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            {images.length > 0 ? <PhotoLightboxGrid images={images} title={post.title} /> : null}

            {mapEmbedUrl ? (
              <div className="mt-5 overflow-hidden rounded-lg border border-slate-300">
                <div className="flex items-center justify-between bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  <span>Get Directions</span>
                  <span>View Larger Map</span>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[300px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </div>
        </section>

        {related.length ? (
          <section className="mt-10">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}

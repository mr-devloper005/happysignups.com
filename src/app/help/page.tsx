import Link from 'next/link'
import { ArrowRight, Building2, FileSearch, MessageCircle, Phone, Search, Shield, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Help Center | ${SITE_CONFIG.name}`,
  description: `Find answers about buying, selling, renting, and using ${SITE_CONFIG.name}.`,
}

const TOPICS = [
  {
    icon: Search,
    title: 'Searching properties',
    body: 'Use filters, save searches, and get email alerts when matching homes go live.',
  },
  {
    icon: Building2,
    title: 'Listing your property',
    body: 'Step-by-step guidance for sellers and agents on publishing a listing.',
  },
  {
    icon: User,
    title: 'Managing your account',
    body: 'Update profile, password, notification preferences, and saved properties.',
  },
  {
    icon: FileSearch,
    title: 'Inquiries & viewings',
    body: 'How to schedule a tour, contact an agent, and track your inquiries.',
  },
  {
    icon: Shield,
    title: 'Trust & verification',
    body: 'How we verify listings and what to do if something looks off.',
  },
  {
    icon: MessageCircle,
    title: 'Contacting agents',
    body: 'Best practices for reaching out and what to expect in a response.',
  },
]

const FAQS = [
  {
    q: 'Is it free to search for properties?',
    a: `Yes. Searching, browsing, and contacting agents on ${SITE_CONFIG.name} is completely free for buyers and renters.`,
  },
  {
    q: 'How do I list my property?',
    a: 'Create a free account, click "List a property" in your dashboard, and follow the guided flow. Most listings go live within 24 hours of review.',
  },
  {
    q: 'Are the listings verified?',
    a: 'Every listing is reviewed by our team for accurate details, real photography, and current availability before it goes live on the site.',
  },
  {
    q: 'Can I save properties to view later?',
    a: 'Yes — sign in and click the bookmark icon on any property card to save it to your shortlist. You can access your saved homes from your dashboard.',
  },
  {
    q: 'How do I schedule a viewing?',
    a: 'On any property page, click "Contact agent" or "Schedule viewing." The listing agent will get back to you within one business day.',
  },
  {
    q: 'Do you charge agents to list?',
    a: 'We offer a free tier and an optional Pro plan for agents who want premium placement, advanced analytics, and bulk listing tools.',
  },
  {
    q: 'How do I report an inaccurate listing?',
    a: 'Use the "Report this listing" link at the bottom of any property page. We review every report within 24 hours.',
  },
  {
    q: 'Can I delete my account?',
    a: 'Yes — go to Settings → Account → Delete account. Your data is permanently removed within 30 days.',
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main>
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Help center</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              How can we help you today?
            </h1>
            <div className="mt-8 flex h-14 max-w-2xl items-center gap-3 rounded-full bg-white px-5 shadow-sm ring-1 ring-slate-200">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles, guides, and FAQs..."
                className="h-full flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Browse by topic</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Popular help topics</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((t) => (
              <Link
                key={t.title}
                href="/contact"
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{t.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-slate-900">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">FAQ</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Frequently asked questions</h2>
              <p className="mt-3 text-base text-slate-600">
                Quick answers to the questions buyers, sellers, and agents ask us most often.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Still need help?
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-slate-600">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Talk to our support team</h2>
              <p className="mt-2 max-w-xl text-base text-slate-600">
                Real people, fast responses. Available Monday through Saturday, 9am – 7pm.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <MessageCircle className="h-4 w-4" />
                Send a message
              </Link>
              <a
                href="tel:+14155550184"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                <Phone className="h-4 w-4" />
                +1 (415) 555-0184
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

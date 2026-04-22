import Link from 'next/link'
import { ArrowRight, Award, Building2, Heart, Sparkles, Target, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `About | ${SITE_CONFIG.name}`,
  description: `Learn about ${SITE_CONFIG.name} — a modern property listing platform built for clarity, trust, and beautiful homes.`,
}

const STATS = [
  { value: '12K+', label: 'Properties listed' },
  { value: '8.6K', label: 'Happy buyers' },
  { value: '320+', label: 'Verified agents' },
  { value: '40', label: 'Cities covered' },
]

const VALUES = [
  {
    icon: Heart,
    title: 'People first',
    body: 'A house is more than walls. We design every interaction around the family that will live there.',
  },
  {
    icon: Award,
    title: 'Verified quality',
    body: 'Every listing is reviewed for accurate details, real photography, and current availability.',
  },
  {
    icon: Target,
    title: 'Clear pricing',
    body: 'No hidden fees, no inflated estimates. The price you see is the price you negotiate from.',
  },
  {
    icon: Sparkles,
    title: 'Beautifully simple',
    body: 'A clean interface so you spend less time fighting filters and more time imagining yourself home.',
  },
]

const MILESTONES = [
  { year: '2018', title: 'Founded in Aspen', body: 'Started with a single mission: bring calm, honest design to property search.' },
  { year: '2020', title: 'First 1,000 listings', body: 'Reached our first thousand verified properties across three states.' },
  { year: '2023', title: 'Agent network launched', body: 'Onboarded 200+ vetted local specialists who share our standards.' },
  { year: '2025', title: '40 cities and growing', body: 'Now serving buyers, sellers, and renters across 40 metro areas.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main>
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">About us</p>
            <div className="mt-3 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                We help people find homes they actually love.
              </h1>
              <p className="text-base leading-7 text-slate-600">
                {SITE_CONFIG.name} is a property listing platform built around clarity, trust, and great design. We
                connect buyers, sellers, and agents through a calmer, more honest way to discover real estate.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <p className="text-4xl font-bold tracking-tight text-slate-900">{s.value}</p>
                <p className="mt-2 text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative h-96 overflow-hidden rounded-3xl shadow-xl">
              <ContentImage
                src="/placeholder.svg?height=900&width=1400"
                alt="Modern home interior"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Our story</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Built by people who believe property search should feel calm.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                We started {SITE_CONFIG.name} because we were tired of cluttered listings, fake photos, and aggressive
                pop-ups. Today, we publish thousands of verified properties across the country — and every one of them
                follows the same standard of clarity and care.
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600">
                We work with a hand-picked network of agents who share that vision, and we invest heavily in the
                experience of every page you scroll through.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/listings"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Browse properties
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                >
                  Meet the team
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">What we believe</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Values that shape everything we ship</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.4fr_1fr]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Our journey</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">Milestones along the way</h2>
              </div>
              <ol className="relative space-y-6 border-l border-slate-200 pl-6">
                {MILESTONES.map((m) => (
                  <li key={m.year} className="relative">
                    <span className="absolute -left-[33px] flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                      ●
                    </span>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800">
                        {m.year}
                      </span>
                      <h3 className="text-lg font-semibold">{m.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{m.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to find your next home?</h2>
              <p className="mt-2 max-w-xl text-base text-slate-600">
                Browse curated listings or talk to one of our local agents today.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <Building2 className="h-4 w-4" />
                Explore properties
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                <Users className="h-4 w-4" />
                Talk to us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

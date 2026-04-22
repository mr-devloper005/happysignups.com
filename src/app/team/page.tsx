import Link from 'next/link'
import { ArrowRight, Award, Mail, MapPin, Phone, Star } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Agents | ${SITE_CONFIG.name}`,
  description: `Meet the verified ${SITE_CONFIG.name} property specialists ready to help you buy, sell, or rent.`,
}

const AGENTS = [
  {
    name: 'Olivia Bennett',
    role: 'Senior Property Advisor',
    location: 'Aspen, CO',
    rating: 4.9,
    sales: 184,
    image: '/placeholder.svg?height=600&width=600',
    specialties: ['Luxury homes', 'Mountain estates'],
  },
  {
    name: 'Marcus Hale',
    role: 'Urban Specialist',
    location: 'New York, NY',
    rating: 4.8,
    sales: 212,
    image: '/placeholder.svg?height=600&width=600',
    specialties: ['Condos', 'Penthouse'],
  },
  {
    name: 'Aisha Rahman',
    role: 'Coastal Properties Lead',
    location: 'Malibu, CA',
    rating: 5.0,
    sales: 96,
    image: '/placeholder.svg?height=600&width=600',
    specialties: ['Coastal retreat', 'Villas'],
  },
  {
    name: 'Daniel Park',
    role: 'First-Time Buyer Coach',
    location: 'Seattle, WA',
    rating: 4.7,
    sales: 156,
    image: '/placeholder.svg?height=600&width=600',
    specialties: ['Apartments', 'Studios'],
  },
  {
    name: 'Sophia Marquez',
    role: 'Investment Advisor',
    location: 'Austin, TX',
    rating: 4.9,
    sales: 138,
    image: '/placeholder.svg?height=600&width=600',
    specialties: ['Duplex', 'Income property'],
  },
  {
    name: 'James Whitaker',
    role: 'Heritage Estates Specialist',
    location: 'Boston, MA',
    rating: 4.8,
    sales: 102,
    image: '/placeholder.svg?height=600&width=600',
    specialties: ['Historic estates', 'Townhouses'],
  },
]

const FILTERS = ['All Agents', 'Luxury', 'Urban', 'Coastal', 'Investment', 'First-time Buyers']

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main>
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Our agents</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Meet our verified property specialists
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Hand-picked, deeply local, and rated by the buyers and sellers they&apos;ve worked with. Find the right
              {' '}{SITE_CONFIG.name} agent for your next move.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                type="button"
                className={
                  i === 0
                    ? 'rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white'
                    : 'rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                }
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AGENTS.map((agent) => (
              <article
                key={agent.name}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-64 overflow-hidden">
                  <ContentImage src={agent.image} alt={agent.name} fill className="object-cover" />
                  <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {agent.rating}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">{agent.role}</p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight">{agent.name}</h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    {agent.location}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {agent.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="text-sm">
                      <span className="font-bold text-slate-900">{agent.sales}</span>
                      <span className="text-slate-500"> properties sold</span>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      Contact
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <Award className="h-5 w-5" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Become a partner agent
                  </p>
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  Join the {SITE_CONFIG.name} agent network
                </h2>
                <p className="mt-3 max-w-2xl text-base text-slate-600">
                  Top-rated agents only. Get access to qualified leads, premium listing tools, and a clean platform
                  that lets your work speak for itself.
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    +1 (415) 555-0184
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    agents@{SITE_CONFIG.domain}
                  </span>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Apply now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

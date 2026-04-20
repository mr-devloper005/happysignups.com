import Link from 'next/link'
import { ArrowRight, Briefcase, Coffee, Globe, Heart, MapPin, TrendingUp, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Careers | ${SITE_CONFIG.name}`,
  description: `Join the ${SITE_CONFIG.name} team — we are building a calmer, more honest property listing platform.`,
}

const ROLES = [
  {
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Remote · US',
    type: 'Full-time',
    body: 'Shape the property browsing and listing experience across web and mobile.',
  },
  {
    title: 'Frontend Engineer (Next.js)',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    body: 'Build the listing surfaces, search, and dashboards that power our platform.',
  },
  {
    title: 'Real Estate Data Analyst',
    department: 'Data',
    location: 'Remote · US',
    type: 'Full-time',
    body: 'Help us turn millions of property data points into clear, useful market insight.',
  },
  {
    title: 'Agent Success Manager',
    department: 'Operations',
    location: 'Aspen, CO',
    type: 'Full-time',
    body: 'Onboard, support, and grow our verified agent partner network.',
  },
  {
    title: 'Content Writer (Real Estate)',
    department: 'Marketing',
    location: 'Remote · US',
    type: 'Part-time',
    body: 'Write market briefs, buyer guides, and design-led editorial for our blog.',
  },
  {
    title: 'Customer Support Specialist',
    department: 'Support',
    location: 'Remote · US',
    type: 'Full-time',
    body: 'Be the calm, helpful voice that answers buyer, seller, and agent questions.',
  },
]

const PERKS = [
  { icon: Globe, title: 'Remote-first', body: 'Work from anywhere. Quarterly in-person team weeks.' },
  { icon: Heart, title: 'Full health benefits', body: 'Medical, dental, and vision covered for you and family.' },
  { icon: TrendingUp, title: 'Equity in the company', body: 'Every full-time employee gets meaningful equity.' },
  { icon: Coffee, title: '4-day workweek option', body: 'Flexible compressed schedule available after first year.' },
  { icon: Users, title: 'Learning budget', body: '$2,000 annual budget for books, courses, and conferences.' },
  { icon: Briefcase, title: 'Sabbatical program', body: 'A paid month off after every four years with us.' },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main>
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Join us</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Build a calmer way to discover real estate.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              We&apos;re a small, opinionated team building {SITE_CONFIG.name} into the most trusted property platform
              for buyers, sellers, and agents. If clarity and craft matter to you, we&apos;d love to talk.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                See open roles
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                Learn about us
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Why work with us</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Benefits that actually matter</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.map((p) => (
              <div
                key={p.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="open-roles" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Open roles</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Find your next chapter</h2>
              </div>
              <p className="text-sm text-slate-500">{ROLES.length} positions open</p>
            </div>

            <div className="mt-8 divide-y divide-slate-200">
              {ROLES.map((role) => (
                <div
                  key={role.title}
                  className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold text-sky-800">
                        {role.department}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700">
                        {role.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {role.location}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl font-semibold">{role.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{role.body}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Apply
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Don&apos;t see your role?</h2>
              <p className="mt-2 max-w-xl text-base text-slate-600">
                We&apos;re always interested in meeting curious, kind, talented people. Send us a note.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

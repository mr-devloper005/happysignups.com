import { ArrowRight, Building2, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const CONTACT_LANES = [
  {
    icon: Building2,
    title: 'List a property',
    body: 'Sellers and agents — get your property in front of qualified buyers within 24 hours.',
  },
  {
    icon: MessageCircle,
    title: 'Speak with an agent',
    body: 'Looking for the right home? Our local specialists will walk you through every step.',
  },
  {
    icon: MapPin,
    title: 'Schedule a viewing',
    body: 'Pick a property, pick a time, and we will set up an in-person or virtual tour.',
  },
] as const

const QUICK_INFO = [
  { icon: Phone, label: 'Call us', value: '+1 (415) 555-0184' },
  { icon: Mail, label: 'Email', value: `hello@${SITE_CONFIG.domain}` },
  { icon: MapPin, label: 'Office', value: '124 Silver Lake Trail, Aspen' },
  { icon: Clock, label: 'Hours', value: 'Mon – Sat, 9am – 7pm' },
] as const

export function ContactPageOverride() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main>
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Get in touch</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Talk to a {SITE_CONFIG.name} property specialist
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Whether you&apos;re buying your first home, selling an estate, or scaling a portfolio, our team is here
              to make every step calm and clear.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-4">
              {CONTACT_LANES.map((lane) => (
                <div
                  key={lane.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <lane.icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold tracking-tight">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{lane.body}</p>
                </div>
              ))}

              <div className="grid gap-3 sm:grid-cols-2">
                {QUICK_INFO.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-slate-500" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {item.label}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold tracking-tight">Send us a message</h2>
              <p className="mt-2 text-sm text-slate-600">
                Share a few details and we&apos;ll get back within one business day.
              </p>
              <form className="mt-6 grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span className="font-medium text-slate-700">Full name</span>
                    <input
                      type="text"
                      className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      placeholder="Jane Doe"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span className="font-medium text-slate-700">Email address</span>
                    <input
                      type="email"
                      className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <label className="grid gap-2 text-sm">
                  <span className="font-medium text-slate-700">I&apos;m interested in</span>
                  <select className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10">
                    <option>Buying a property</option>
                    <option>Selling a property</option>
                    <option>Renting a property</option>
                    <option>Working with an agent</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="font-medium text-slate-700">Message</span>
                  <textarea
                    rows={5}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    placeholder="Tell us about the property, location, or any questions you have."
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Send message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

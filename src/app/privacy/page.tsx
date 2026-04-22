import Link from 'next/link'
import { Lock, Mail, Shield } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.name}`,
  description: `How ${SITE_CONFIG.name} collects, uses, and protects your information.`,
}

const SECTIONS = [
  {
    id: 'data-we-collect',
    title: '1. Information we collect',
    body: 'We collect information you give us directly — like your name, email, and saved properties — and basic usage data such as pages viewed and search queries. We never sell your personal information.',
  },
  {
    id: 'how-we-use',
    title: '2. How we use your information',
    body: 'We use it to personalize your property recommendations, connect you with agents you contact, send service updates, improve our search, and keep the platform secure.',
  },
  {
    id: 'sharing',
    title: '3. When we share information',
    body: 'When you contact an agent, we share your message and contact details with that agent only. We share aggregated, anonymized data with partners for analytics. We comply with legal requests when required by law.',
  },
  {
    id: 'cookies',
    title: '4. Cookies and tracking',
    body: 'We use essential cookies to keep you signed in and remember your preferences. Analytics cookies help us understand how the platform is used. You can manage cookie preferences in your browser at any time.',
  },
  {
    id: 'security',
    title: '5. Data security',
    body: 'Your data is encrypted in transit and at rest. We follow industry best practices for storage, access controls, and regular security reviews.',
  },
  {
    id: 'your-rights',
    title: '6. Your rights and choices',
    body: 'You can access, update, export, or delete your data from your account settings at any time. To exercise any rights or ask a question, email us using the address below.',
  },
  {
    id: 'children',
    title: '7. Children\'s privacy',
    body: `${SITE_CONFIG.name} is not intended for users under the age of 16. We do not knowingly collect data from children.`,
  },
  {
    id: 'changes',
    title: '8. Changes to this policy',
    body: 'When we make material changes, we will notify you via email and update the "Last updated" date at the top of this page.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main>
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Shield className="h-6 w-6" />
            </div>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Privacy</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Privacy Policy</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              We take your privacy seriously. This page explains exactly what we collect, why we collect it, and how
              you stay in control of your data on {SITE_CONFIG.name}.
            </p>
            <p className="mt-3 text-xs text-slate-500">Last updated: April 14, 2026</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">On this page</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-slate-600 hover:text-slate-900">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="space-y-10">
                {SECTIONS.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-28">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900">{s.title}</h2>
                    <p className="mt-3 text-base leading-7 text-slate-600">{s.body}</p>
                  </section>
                ))}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-slate-700" />
                    <h3 className="text-base font-semibold">Questions about your data?</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Reach our privacy team any time — we respond within two business days.
                  </p>
                  <Link
                    href={`mailto:privacy@${SITE_CONFIG.domain}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    <Mail className="h-4 w-4" />
                    privacy@{SITE_CONFIG.domain}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

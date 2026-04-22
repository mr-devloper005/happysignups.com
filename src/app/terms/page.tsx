import Link from 'next/link'
import { FileText, Mail, Scale } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Terms of Service | ${SITE_CONFIG.name}`,
  description: `The rules and guidelines for using ${SITE_CONFIG.name}.`,
}

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of terms',
    body: `By accessing or using ${SITE_CONFIG.name}, you agree to be bound by these Terms. If you do not agree, please do not use the platform.`,
  },
  {
    id: 'accounts',
    title: '2. Your account',
    body: 'You are responsible for keeping your login details secure and for all activity under your account. You must be at least 16 years old to create an account.',
  },
  {
    id: 'listings',
    title: '3. Listings and content',
    body: 'You retain ownership of the content and listings you post, and you grant us a license to display, distribute, and promote them on the platform. All listings must be accurate, lawful, and your own to publish.',
  },
  {
    id: 'acceptable-use',
    title: '4. Acceptable use',
    body: 'No spam, harassment, fake listings, scraping, reverse engineering, or unlawful activity. We reserve the right to suspend accounts that violate these standards.',
  },
  {
    id: 'agent-program',
    title: '5. Agent program',
    body: 'Agents who join our verified network agree to additional terms covering response times, listing accuracy, and communication standards. Failure to meet them may result in removal from the program.',
  },
  {
    id: 'fees',
    title: '6. Fees and subscriptions',
    body: 'Browsing and contacting agents is free. Premium features for sellers and agents are billed monthly or annually and renew automatically until cancelled.',
  },
  {
    id: 'disclaimers',
    title: '7. Disclaimers',
    body: `${SITE_CONFIG.name} is a listing platform — we do not act as a real estate agent or broker. Property details are provided by sellers and agents, and we are not responsible for the accuracy of third-party content.`,
  },
  {
    id: 'liability',
    title: '8. Limitation of liability',
    body: 'To the maximum extent permitted by law, our liability arising from your use of the platform is limited to the amount you have paid us in the past 12 months.',
  },
  {
    id: 'termination',
    title: '9. Termination',
    body: 'You may close your account at any time. We may suspend or terminate access if you violate these Terms or if required by law.',
  },
  {
    id: 'changes',
    title: '10. Changes to these terms',
    body: 'We may update these Terms from time to time. We will notify you of material changes and post the updated date at the top of this page.',
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main>
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Scale className="h-6 w-6" />
            </div>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Legal</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Terms of Service</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              The rules of the road for using {SITE_CONFIG.name}. Written in plain English so you can actually read
              them.
            </p>
            <p className="mt-3 text-xs text-slate-500">Last updated: April 14, 2026</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.32fr_1fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Sections</p>
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
                    <FileText className="h-5 w-5 text-slate-700" />
                    <h3 className="text-base font-semibold">Need to talk to us?</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    For questions about these Terms or any legal matter, get in touch with our team.
                  </p>
                  <Link
                    href={`mailto:legal@${SITE_CONFIG.domain}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    <Mail className="h-4 w-4" />
                    legal@{SITE_CONFIG.domain}
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

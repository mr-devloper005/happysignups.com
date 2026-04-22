import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Properties', href: '/listings' },
      { name: 'Search', href: '/search' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Agents', href: '/team' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { name: 'Contact', href: '/contact' },
      { name: 'Help Center', href: '/help' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
    ],
  },
] as const

export function FooterOverride() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
                <img
                  src="/favicon.png?v=20260401"
                  alt={`${SITE_CONFIG.name} logo`}
                  width="56"
                  height="56"
                  className="h-[115%] w-[115%] object-contain"
                />
              </div>
              <span className="text-lg font-semibold text-slate-900">{SITE_CONFIG.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
              Discover, list, and connect on {SITE_CONFIG.name} — a clean property listing platform built for buyers,
              sellers, and agents.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{col.heading}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-slate-600 transition hover:text-slate-900">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <p>
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p>{SITE_CONFIG.tagline}</p>
        </div>
      </div>
    </footer>
  )
}

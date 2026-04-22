import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'

export const metadata = {
  title: `Blog | ${SITE_CONFIG.name}`,
  description: `Insights, market trends, and home guides from the ${SITE_CONFIG.name} team.`,
}

const CATEGORIES = ['All', 'Buying', 'Selling', 'Market trends', 'Home design', 'Renting', 'Investment']

const FEATURED = {
  slug: 'fall-housing-market-2026',
  category: 'Market trends',
  date: 'Apr 14, 2026',
  readTime: '6 min read',
  title: 'Fall 2026 housing market: what buyers should expect',
  excerpt:
    'Inventory is loosening up in suburban metros while urban condos hold steady. Here is the data behind the shift, and what it means for your next move.',
  image: '/placeholder.svg?height=900&width=1400',
}

const POSTS = [
  {
    slug: 'first-home-checklist',
    category: 'Buying',
    date: 'Apr 10, 2026',
    readTime: '4 min',
    title: 'The first-time buyer checklist that actually works',
    excerpt: 'A clean, no-nonsense walkthrough of every step from pre-approval to closing day.',
    image: '/placeholder.svg?height=900&width=1400',
  },
  {
    slug: 'staging-on-a-budget',
    category: 'Selling',
    date: 'Apr 06, 2026',
    readTime: '5 min',
    title: 'Staging on a budget: small changes, big offers',
    excerpt: 'Five low-cost staging moves that consistently raise final offers in our agent data.',
    image: '/placeholder.svg?height=900&width=1400',
  },
  {
    slug: 'open-floor-plan-guide',
    category: 'Home design',
    date: 'Apr 02, 2026',
    readTime: '7 min',
    title: 'Why open floor plans are quietly going out of style',
    excerpt: 'A look at the design pendulum swinging back toward defined rooms and intentional zones.',
    image: '/placeholder.svg?height=900&width=1400',
  },
  {
    slug: 'rent-vs-buy-2026',
    category: 'Renting',
    date: 'Mar 28, 2026',
    readTime: '6 min',
    title: 'Rent vs. buy in 2026: the math, finally explained',
    excerpt: 'A simple framework using current rates and rent ratios to make the decision feel less abstract.',
    image: '/placeholder.svg?height=900&width=1400',
  },
  {
    slug: 'invest-small-multifamily',
    category: 'Investment',
    date: 'Mar 22, 2026',
    readTime: '8 min',
    title: 'Why small multifamily is the entry door to investing',
    excerpt: 'A look at duplexes and triplexes as a calmer, more sustainable investment path.',
    image: '/placeholder.svg?height=900&width=1400',
  },
  {
    slug: 'pricing-your-home',
    category: 'Selling',
    date: 'Mar 18, 2026',
    readTime: '5 min',
    title: 'Pricing your home: the case against round numbers',
    excerpt: 'How tiny pricing decisions trigger different search filters and change who actually sees your listing.',
    image: '/placeholder.svg?height=900&width=1400',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main>
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">{SITE_CONFIG.name} blog</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Sharper insights for buyers, sellers, and agents.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Market reports, buying guides, design ideas, and honest writing from people who actually work in real
              estate every day.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href={`/blog/${FEATURED.slug}`}
            className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl"
          >
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative h-72 overflow-hidden lg:h-auto">
                <ContentImage src={FEATURED.image} alt={FEATURED.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="rounded-full bg-sky-100 px-3 py-1 font-semibold text-sky-800">{FEATURED.category}</span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    {FEATURED.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {FEATURED.readTime}
                  </span>
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{FEATURED.title}</h2>
                <p className="mt-3 text-base leading-7 text-slate-600">{FEATURED.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  Read article
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((c, i) => (
              <button
                key={c}
                type="button"
                className={
                  i === 0
                    ? 'rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white'
                    : 'rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <ContentImage src={p.image} alt={p.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                    <Tag className="h-3.5 w-3.5" />
                    {p.category}
                    <span className="text-slate-300">·</span>
                    {p.date}
                    <span className="text-slate-300">·</span>
                    {p.readTime}
                  </div>
                  <h3 className="mt-3 text-lg font-bold tracking-tight">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Get our weekly market brief</h2>
            <p className="mt-3 text-base text-slate-600">
              The latest listings, market shifts, and home guides — delivered every Friday morning.
            </p>
            <form className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="you@example.com"
                className="h-12 flex-1 rounded-full border border-slate-200 bg-white px-5 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

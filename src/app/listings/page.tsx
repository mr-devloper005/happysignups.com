import Link from 'next/link'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Heart,
  LayoutGrid,
  MapPin,
  Maximize2,
  Plus,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts, buildPostUrl } from '@/lib/task-data'
import { normalizeCategory, isValidCategory } from '@/lib/categories'
import { SITE_CONFIG } from '@/lib/site-config'
import { taskPageMetadata } from '@/config/site.content'
import { buildTaskMetadata } from '@/lib/seo'
import type { SitePost } from '@/lib/site-connector'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('listing', {
    path: '/listings',
    title: taskPageMetadata.listing.title,
    description: taskPageMetadata.listing.description,
  })

const PROPERTY_FILTERS = [
  { label: 'All', slug: 'all' },
  { label: 'Villas', slug: 'villas' },
  { label: 'Apartments', slug: 'apartments' },
  { label: 'Duplex Homes', slug: 'duplex-homes' },
  { label: 'Urban Loft', slug: 'urban-loft' },
  { label: 'Coastal Retreat', slug: 'coastal-retreat' },
  { label: 'Penthouse', slug: 'penthouse' },
  { label: 'Eco-Smart Home', slug: 'eco-smart-home' },
  { label: 'Urban Condos', slug: 'urban-condos' },
  { label: 'Historic Estates', slug: 'historic-estates' },
  { label: 'Studio Apartments', slug: 'studio-apartments' },
] as const

const PRICE_RANGES = ['Any price', 'Under $500K', '$500K – $1M', '$1M – $3M', '$3M – $5M', '$5M+']
const BED_OPTIONS = ['Any', '1+', '2+', '3+', '4+', '5+']
const SORT_OPTIONS = ['Featured', 'Newest first', 'Price: low to high', 'Price: high to low']

const TRUST_BADGES = [
  { icon: ShieldCheck, title: 'Verified listings', body: 'Every property is reviewed before going live.' },
  { icon: TrendingUp, title: 'Real-time pricing', body: 'Updated daily with current market data.' },
  { icon: Sparkles, title: 'Hand-picked agents', body: 'Top-rated specialists in every metro area.' },
]

const FALLBACK_PROPERTIES = [
  {
    id: 'fb-1',
    slug: 'silver-lake-trail-aspen',
    title: '124 Silver Lake Trail, Lower Highlands District',
    price: '$5,250,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '3,500',
    beds: 4,
    baths: 4,
    location: 'Aspen, CO',
    tag: 'Featured',
  },
  {
    id: 'fb-2',
    slug: 'canyon-view-boulder',
    title: '442 Canyon View Drive',
    price: '$2,100,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '2,500',
    beds: 4,
    baths: 3,
    location: 'Boulder, CO',
    tag: 'New',
  },
  {
    id: 'fb-3',
    slug: 'south-broadway-seattle',
    title: '300 South Broadway, Pioneer Square',
    price: '$3,100,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '2,500',
    beds: 3,
    baths: 2,
    location: 'Seattle, WA',
    tag: 'Open House',
  },
  {
    id: 'fb-4',
    slug: 'west-12th-new-york',
    title: '118 West 12th Street',
    price: '$890,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '2,800',
    beds: 3,
    baths: 2,
    location: 'New York, NY',
    tag: '',
  },
  {
    id: 'fb-5',
    slug: 'cliffside-malibu',
    title: 'Cliffside Modern Villa',
    price: '$4,450,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '3,800',
    beds: 5,
    baths: 4,
    location: 'Malibu, CA',
    tag: 'Featured',
  },
  {
    id: 'fb-6',
    slug: 'heritage-row-boston',
    title: 'Heritage Row Townhouse',
    price: '$1,650,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '2,200',
    beds: 3,
    baths: 3,
    location: 'Boston, MA',
    tag: '',
  },
  {
    id: 'fb-7',
    slug: 'lakeside-loft-chicago',
    title: 'Lakeside Loft, Streeterville',
    price: '$1,250,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '1,950',
    beds: 2,
    baths: 2,
    location: 'Chicago, IL',
    tag: 'New',
  },
  {
    id: 'fb-8',
    slug: 'desert-modern-scottsdale',
    title: 'Desert Modern Estate',
    price: '$3,750,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '4,100',
    beds: 5,
    baths: 5,
    location: 'Scottsdale, AZ',
    tag: '',
  },
]

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage =
    typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
      ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
      : null
  return mediaUrl || contentImage || '/placeholder.svg?height=900&width=1400'
}

function getPostDetails(post: SitePost) {
  const content = (typeof post.content === 'object' && post.content) ? (post.content as Record<string, any>) : {}
  const rawPrice = content.price
  const price =
    typeof rawPrice === 'string' && rawPrice
      ? rawPrice
      : typeof rawPrice === 'number'
        ? `$${rawPrice.toLocaleString()}`
        : '$1,250,000'
  const location =
    (typeof content.address === 'string' && content.address) ||
    (typeof content.location === 'string' && content.location) ||
    'Premium location'
  const sqft = String(content.sqft || content.area || '2,400')
  const beds = Number(content.beds || content.bedrooms || 3)
  const baths = Number(content.baths || content.bathrooms || 2)
  const tag = typeof content.tag === 'string' ? content.tag : ''
  return { price, location, sqft, beds, baths, tag }
}

function PropertyCard({
  href,
  image,
  title,
  price,
  location,
  sqft,
  beds,
  baths,
  tag,
}: {
  href: string
  image: string
  title: string
  price: string
  location: string
  sqft: string
  beds: number
  baths: number
  tag?: string
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={href} className="block">
        <div className="relative h-60 overflow-hidden">
          <ContentImage src={image} alt={title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          {tag ? (
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-sm">
              {tag}
            </span>
          ) : null}
          <button
            type="button"
            aria-label="Save to favorites"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-sm transition hover:bg-white hover:text-rose-600"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-2xl font-bold text-slate-900">{price}</p>
          <h3 className="mt-2 line-clamp-2 text-base font-semibold text-slate-900">{title}</h3>
          <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{location}</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-[12px] font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 className="h-3.5 w-3.5 text-slate-400" />
              {sqft} sq.ft
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BedDouble className="h-3.5 w-3.5 text-slate-400" />
              {beds} bed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bath className="h-3.5 w-3.5 text-slate-400" />
              {baths} bath
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>
}) {
  const params = (await searchParams) || {}
  const requestedCategory = params.category ? normalizeCategory(params.category) : 'all'

  const remotePosts = await fetchTaskPosts('listing', 30).catch(() => [] as SitePost[])

  const seen = new Set<string>()
  const merged: SitePost[] = []
  for (const post of remotePosts) {
    if (post.slug && seen.has(post.slug)) continue
    if (post.slug) seen.add(post.slug)
    merged.push(post)
  }

  const filtered =
    requestedCategory === 'all'
      ? merged.filter((post) => {
          const content = post.content && typeof post.content === 'object' ? post.content : {}
          const value = typeof (content as any).category === 'string' ? (content as any).category : ''
          return !value || isValidCategory(value)
        })
      : merged.filter((post) => {
          const content = post.content && typeof post.content === 'object' ? post.content : {}
          const value =
            typeof (content as any).category === 'string'
              ? normalizeCategory((content as any).category)
              : ''
          return value === requestedCategory
        })

  const fromPosts = filtered.map((post) => {
    const d = getPostDetails(post)
    const href = buildPostUrl('listing', post.slug)
    return {
      id: post.id,
      slug: post.slug,
      href,
      image: getPostImage(post),
      title: post.title,
      price: d.price,
      location: d.location,
      sqft: d.sqft,
      beds: d.beds,
      baths: d.baths,
      tag: d.tag,
    }
  })

  const fallback = FALLBACK_PROPERTIES.map((p) => ({ ...p, href: '/listings' }))
  const properties = fromPosts.length ? fromPosts : fallback
  const featured = properties[0]
  const grid = properties.slice(1)

  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = properties.slice(0, 10).map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${baseUrl}/listings/${p.slug || ''}`,
    name: p.title,
  }))

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <SchemaJsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Property Listings',
            itemListElement: schemaItems,
          },
          {
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            name: SITE_CONFIG.name,
            url: `${baseUrl}/listings`,
            areaServed: 'Worldwide',
          },
        ]}
      />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Properties</p>
                  <Link
                    href="/create/listing"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                  >
                    <Plus className="h-4 w-4" />
                    Create listing
                  </Link>
                </div>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Find a home that fits the life you actually live.
                </h1>
                <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                  {properties.length}+ verified properties across the country. Filter by city, price, or property
                  type — every listing reviewed by the {SITE_CONFIG.name} team.
                </p>

                {/* Search bar */}
                <form action="/search" method="get" className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <div className="flex h-14 flex-1 items-center gap-3 rounded-full bg-white px-5 shadow-sm ring-1 ring-slate-200">
                    <Search className="h-5 w-5 text-slate-400" />
                    <input
                      name="q"
                      type="text"
                      placeholder="City, neighborhood, ZIP, or property type"
                      className="h-full flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </form>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Building2 className="h-6 w-6 text-sky-700" />
                  <p className="mt-4 text-3xl font-bold tracking-tight">{properties.length}+</p>
                  <p className="mt-1 text-sm text-slate-600">Listings live</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <ShieldCheck className="h-6 w-6 text-sky-700" />
                  <p className="mt-4 text-3xl font-bold tracking-tight">100%</p>
                  <p className="mt-1 text-sm text-slate-600">Verified</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <MapPin className="h-6 w-6 text-sky-700" />
                  <p className="mt-4 text-3xl font-bold tracking-tight">40</p>
                  <p className="mt-1 text-sm text-slate-600">Cities covered</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Sparkles className="h-6 w-6 text-sky-700" />
                  <p className="mt-4 text-3xl font-bold tracking-tight">4.9</p>
                  <p className="mt-1 text-sm text-slate-600">Avg. rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured property */}
        {featured ? (
          <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
            <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <Link href={featured.href} className="relative block h-80 overflow-hidden lg:h-auto">
                  <ContentImage
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                    Featured
                  </span>
                </Link>
                <div className="p-8 sm:p-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Spotlight property</p>
                  <Link href={featured.href} className="mt-3 block">
                    <h2 className="text-3xl font-bold tracking-tight transition group-hover:text-sky-700 sm:text-4xl">
                      {featured.title}
                    </h2>
                  </Link>
                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4" />
                    {featured.location}
                  </div>
                  <p className="mt-6 text-4xl font-bold tracking-tight text-slate-900">{featured.price}</p>
                  <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-700">
                    <span className="inline-flex items-center gap-2">
                      <Maximize2 className="h-4 w-4 text-slate-400" />
                      {featured.sqft} sq.ft
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <BedDouble className="h-4 w-4 text-slate-400" />
                      {featured.beds} bedrooms
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Bath className="h-4 w-4 text-slate-400" />
                      {featured.baths} bathrooms
                    </span>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={featured.href}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      View property
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                    >
                      Schedule a viewing
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </section>
        ) : null}

        {/* Filters bar */}
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Refine
              </span>
              <select
                aria-label="Price range"
                className="h-10 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                defaultValue={PRICE_RANGES[0]}
              >
                {PRICE_RANGES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <select
                aria-label="Bedrooms"
                className="h-10 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                defaultValue={BED_OPTIONS[0]}
              >
                {BED_OPTIONS.map((b) => (
                  <option key={b}>{b} beds</option>
                ))}
              </select>
              <select
                aria-label="Sort"
                className="h-10 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                defaultValue={SORT_OPTIONS[0]}
              >
                {SORT_OPTIONS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <div className="ml-auto inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-sm"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  Grid
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  Map
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {PROPERTY_FILTERS.map((f) => {
                const isActive = requestedCategory === f.slug || (f.slug === 'all' && requestedCategory === 'all')
                const href = f.slug === 'all' ? '/listings' : `/listings?category=${f.slug}`
                return (
                  <Link
                    key={f.slug}
                    href={href}
                    className={
                      isActive
                        ? 'rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white'
                        : 'rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200'
                    }
                  >
                    {f.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Results header */}
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Browse properties</h2>
              <p className="mt-1 text-sm text-slate-600">
                Showing <span className="font-semibold text-slate-900">{grid.length}</span> {grid.length === 1 ? 'property' : 'properties'}
                {requestedCategory !== 'all' ? (
                  <>
                    {' '}in{' '}
                    <span className="font-semibold text-slate-900">
                      {PROPERTY_FILTERS.find((f) => f.slug === requestedCategory)?.label || requestedCategory}
                    </span>
                  </>
                ) : null}
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline"
            >
              Open advanced search
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Grid */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          {grid.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {grid.map((p) => (
                <PropertyCard
                  key={p.id}
                  href={p.href}
                  image={p.image}
                  title={p.title}
                  price={p.price}
                  location={p.location}
                  sqft={p.sqft}
                  beds={p.beds}
                  baths={p.baths}
                  tag={p.tag}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-tight">No properties match these filters</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Try removing a filter or browse all properties.
              </p>
              <Link
                href="/listings"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                View all properties
              </Link>
            </div>
          )}
        </section>

        {/* Trust band */}
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {TRUST_BADGES.map((t) => (
              <div key={t.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <t.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Selling a property?</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                List with {SITE_CONFIG.name} and reach qualified buyers in days, not months.
              </h2>
              <p className="mt-3 max-w-xl text-base text-slate-600">
                Free to list, optional Pro tools for serious sellers and agents. Most listings go live within 24 hours
                of submission.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                List your property
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                Talk to an agent
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

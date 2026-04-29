import Link from 'next/link'
import { ArrowRight, Bath, BedDouble, MapPin, Maximize2, Search, LayoutGrid } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

const PROPERTY_CATEGORIES = [
  'All',
  'Villas',
  'Apartments',
  'Duplex Homes',
  'Urban Loft',
  'Coastal Retreat',
  'Penthouse',
  'Eco-Smart Home',
  'Urban Condos',
  'Historic Estates',
  'Studio Apartments',
] as const

const FALLBACK_PROPERTIES = [
  {
    id: 'fp-1',
    title: '124 Silver Lake Trail, Lower Highlands District, Aspen',
    price: '$5,250,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '3,500',
    beds: 4,
    baths: 4,
    location: 'Aspen, Chicago',
  },
  {
    id: 'fp-2',
    title: '442 Canyon View Dr',
    price: '$2,100,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '2,500',
    beds: 4,
    baths: 3,
    location: 'Boulder',
  },
  {
    id: 'fp-3',
    title: '300 South Broadway, Pioneer Square Arts District, Suite 405',
    price: '$3,100,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '2,500',
    beds: 3,
    baths: 2,
    location: 'Seattle',
  },
  {
    id: 'fp-4',
    title: '118 West 12th Street, District',
    price: '$890,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '2,800',
    beds: 3,
    baths: 2,
    location: 'New York',
  },
  {
    id: 'fp-5',
    title: 'Cliffside Modern Villa',
    price: '$4,450,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '3,800',
    beds: 5,
    baths: 4,
    location: 'Malibu, CA',
  },
  {
    id: 'fp-6',
    title: 'Heritage Row Townhouse',
    price: '$1,650,000',
    image: '/placeholder.svg?height=900&width=1400',
    sqft: '2,200',
    beds: 3,
    baths: 3,
    location: 'Boston, MA',
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

function getPostDetail(post: SitePost) {
  const content = (typeof post.content === 'object' && post.content) ? (post.content as Record<string, any>) : {}
  const price =
    (typeof content.price === 'string' && content.price) ||
    (typeof content.price === 'number' && `$${content.price.toLocaleString()}`) ||
    '$1,250,000'
  const location =
    (typeof content.address === 'string' && content.address) ||
    (typeof content.location === 'string' && content.location) ||
    'Premium location'
  const sqft = content.sqft || content.area || '2,400'
  const beds = content.beds || content.bedrooms || 3
  const baths = content.baths || content.bathrooms || 2
  return { price: String(price), location: String(location), sqft: String(sqft), beds, baths }
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('listing', 8, { allowMockFallback: true, fresh: true }).catch(() => [])
  const fromPosts = posts.map((post) => {
    const d = getPostDetail(post)
    return {
      id: post.id,
      title: post.title,
      href: `/listings/${post.slug}`,
      image: getPostImage(post),
      ...d,
    }
  })
  const properties = (fromPosts.length >= 6 ? fromPosts : [...fromPosts, ...FALLBACK_PROPERTIES]).slice(0, 6)
  const featured = properties[0] || FALLBACK_PROPERTIES[0]
  const grid = properties.slice(1)

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />

      <section className="relative">
        <div className="relative h-[520px] w-full overflow-hidden">
          <ContentImage
            src={featured.image || '/placeholder.svg?height=900&width=1400'}
            alt={featured.title || 'Featured property'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/40" />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="max-w-2xl rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Featured Property</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{featured.title}</h2>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4" />
                {featured.location}
              </div>
              <div className="mt-4 flex items-end justify-between gap-4">
                <span className="text-3xl font-bold text-slate-900">{featured.price}</span>
                <Link
                  href={(featured as any).href || '/listings'}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  View Property
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Our Most Exclusive Properties</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
            Throughout our history, we&apos;ve watched the markets rise, fall and evolve experience.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <div className="flex h-14 flex-1 items-center gap-3 rounded-full bg-white px-5 shadow-sm ring-1 ring-slate-200">
            <Search className="h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search properties"
              className="h-full flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            aria-label="Toggle grid"
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
          >
            <LayoutGrid className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {PROPERTY_CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              type="button"
              className={
                i === 0
                  ? 'rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white'
                  : 'rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((p) => (
            <Link
              key={p.id}
              href={(p as any).href || '/listings'}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg"
            >
              <div className="relative h-56 overflow-hidden">
                <ContentImage
                  src={p.image || '/placeholder.svg?height=900&width=1400'}
                  alt={p.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize2 className="h-3.5 w-3.5" />
                    {p.sqft} sq.ft
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble className="h-3.5 w-3.5" />
                    {p.beds} bed
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Bath className="h-3.5 w-3.5" />
                    {p.baths} bath
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-slate-900">{p.price}</p>
                <p className="mt-1 line-clamp-2 text-sm text-slate-600">{p.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            View More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Work with us</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Collaborate and create greatness!
            </h2>
            <p className="mt-4 max-w-xl text-base text-slate-600">
              We help you make your real-estate dreams come true. Team up with {SITE_CONFIG.name} to find a property
              that matches your lifestyle and quality.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                Browse Properties
              </Link>
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-3xl shadow-xl">
            <ContentImage
              src={featured.image || '/placeholder.svg?height=900&width=1400'}
              alt="Collaborate"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

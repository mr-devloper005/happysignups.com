'use client'

import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
import { ArrowRight, MapPin, Search, LayoutGrid, Bath, BedDouble, Maximize2 } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

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

const LISTING_FALLBACK_IMAGE = '/placeholder.jpg'

const FALLBACK_PROPERTIES = [
  {
    id: 'fp-1',
    title: '124 Silver Lake Trail, Lower Highlands District, Aspen',
    price: '$5,250,000',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    sqft: '3,500',
    beds: 4,
    baths: 4,
    location: 'Aspen, Chicago',
  },
  {
    id: 'fp-2',
    title: '442 Canyon View Dr',
    price: '$2,100,000',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1600&q=80',
    sqft: '2,500',
    beds: 4,
    baths: 3,
    location: 'Boulder',
  },
  {
    id: 'fp-3',
    title: '300 South Broadway, Pioneer Square Arts District, Suite 405',
    price: '$3,100,000',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    sqft: '2,500',
    beds: 3,
    baths: 2,
    location: 'Seattle',
  },
  {
    id: 'fp-4',
    title: '118 West 12th Street, District',
    price: '$890,000',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80',
    sqft: '2,800',
    beds: 3,
    baths: 2,
    location: 'New York',
  },
  {
    id: 'fp-5',
    title: 'Cliffside Modern Villa',
    price: '$4,450,000',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80',
    sqft: '3,800',
    beds: 5,
    baths: 4,
    location: 'Malibu, CA',
  },
  {
    id: 'fp-6',
    title: 'Heritage Row Townhouse',
    price: '$1,650,000',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1600&q=80',
    sqft: '2,200',
    beds: 3,
    baths: 3,
    location: 'Boston, MA',
  },
]

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media[0]?.url || media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = typeof post?.content === 'object' && post?.content ? (post.content as Record<string, unknown>) : {}
  const contentImage = typeof content.image === 'string' ? content.image : null
  const contentImages = Array.isArray(content.images) ? content.images : []
  const contentFirstImage = contentImages.find((url) => typeof url === 'string' && url)
  const contentLogo = typeof content.logo === 'string' ? content.logo : null
  return mediaUrl || contentImage || contentFirstImage || contentLogo || LISTING_FALLBACK_IMAGE
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

export default function HomePageClient() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [posts, setPosts] = useState<SitePost[]>([])

  // Load posts on component mount (useEffect so fetch runs after initial render)
  useEffect(() => {
    fetchTaskPosts('listing', 8, { allowMockFallback: true, fresh: true })
      .then(setPosts)
      .catch(() => setPosts([]))
  }, [])

  const filteredProperties = useMemo(() => {
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
    
    const allProperties = fromPosts.length >= 6 ? fromPosts : [...fromPosts, ...FALLBACK_PROPERTIES]
    
    return allProperties.filter((property) => {
      // Search filter
      const searchMatch = !searchQuery || 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Category filter
      const categoryMatch = selectedCategory === 'All' || 
        property.title.toLowerCase().includes(selectedCategory.toLowerCase())
      
      return searchMatch && categoryMatch
    }).slice(0, 6)
  }, [posts, searchQuery, selectedCategory])

  const featured = filteredProperties[0] || FALLBACK_PROPERTIES[0]
  const grid = filteredProperties.slice(1)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the filteredProperties useMemo
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />

      <section className="relative">
        <div className="relative h-[520px] w-full overflow-hidden">
          <ContentImage
            src={featured.image || LISTING_FALLBACK_IMAGE}
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

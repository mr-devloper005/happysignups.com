import Link from 'next/link'
import { Search as SearchIcon, SlidersHorizontal } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined
  )
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as any).type)
    if (typeText === 'comment') return false
    const description = compactText((content as any).description)
    const body = compactText((content as any).body)
    const excerpt = compactText((content as any).excerpt)
    const categoryText = compactText((content as any).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  const QUICK_CATEGORIES = [
    'Villas',
    'Apartments',
    'Duplex Homes',
    'Urban Loft',
    'Coastal Retreat',
    'Penthouse',
    'Eco-Smart Home',
  ]

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main>
        <section className="bg-gradient-to-br from-sky-100 via-sky-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">Search</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {query ? (
                <>
                  Results for <span className="text-sky-700">&ldquo;{query}&rdquo;</span>
                </>
              ) : (
                'Find your next property'
              )}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {query
                ? `${results.length} ${results.length === 1 ? 'match' : 'matches'} found across ${SITE_CONFIG.name}.`
                : `Search by location, property type, or keyword across every listing on ${SITE_CONFIG.name}.`}
            </p>

            <form action="/search" method="get" className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input type="hidden" name="master" value="1" />
              {category ? <input type="hidden" name="category" value={category} /> : null}
              {task ? <input type="hidden" name="task" value={task} /> : null}
              <div className="flex h-14 flex-1 items-center gap-3 rounded-full bg-white px-5 shadow-sm ring-1 ring-slate-200">
                <SearchIcon className="h-5 w-5 text-slate-400" />
                <input
                  name="q"
                  defaultValue={query}
                  type="text"
                  placeholder="Search city, neighborhood, or property type..."
                  className="h-full flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-slate-900 px-8 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <SearchIcon className="h-4 w-4" />
                Search
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Quick filters
              </span>
              {QUICK_CATEGORIES.map((cat) => {
                const params = new URLSearchParams()
                if (query) params.set('q', query)
                params.set('category', cat.toLowerCase())
                params.set('master', '1')
                return (
                  <Link
                    key={cat}
                    href={`/search?${params.toString()}`}
                    className={
                      category === cat.toLowerCase()
                        ? 'rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white'
                        : 'rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                    }
                  >
                    {cat}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {results.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((post) => {
                const taskKey = getPostTaskKey(post)
                const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`
                return <TaskPostCard key={post.id} post={post} href={href} />
              })}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <SearchIcon className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight">No properties match yet</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Try a different search term, remove a filter, or browse our most exclusive listings.
              </p>
              <Link
                href="/listings"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Browse all properties
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}

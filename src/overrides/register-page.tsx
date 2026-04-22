'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Sparkles, Loader2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!name || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    try {
      await signup(name, email, password)
      router.push('/')
    } catch {
      setError('Could not create account. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-900">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <Building2 className="h-8 w-8 text-slate-900" />
            <h1 className="mt-5 text-4xl font-bold tracking-tight">Join {SITE_CONFIG.name}</h1>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Create a free account to save properties, contact agents, and post your own listings.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                'List your property in minutes',
                'Reach verified buyers and renters',
                'Track inquiries and saved searches',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Create account</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Get started</h2>

            <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Full name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  placeholder="Jane Doe"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Email address</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  placeholder="you@example.com"
                />
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  placeholder="At least 8 characters"
                />
              </label>

              {error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

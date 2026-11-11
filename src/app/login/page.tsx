'use client'

import { useState } from 'react'
import Link from 'next/link'
import { login } from '@/app/actions/auth'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const res = await login(formData)
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="neo-box-lg w-full max-w-md p-8 bg-white">
        <div className="mb-6 text-center">
          <span className="inline-block bg-yellow-300 border-2 border-black font-black px-3 py-1 rounded-md text-sm mb-2 shadow-[2px_2px_0px_0px_#000]">
            BENTO.ME
          </span>
          <h1 className="text-3xl font-black tracking-tight">Masuk Akun</h1>
          <p className="text-sm font-semibold text-zinc-600 mt-1">Kelola link dan profil bento kreasimu</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-lg text-red-700 font-bold text-sm shadow-[2px_2px_0px_0px_#ef4444]">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="nama@domain.com"
              className="neo-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="neo-input w-full px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="neo-btn w-full py-3 bg-amber-300 mt-4 cursor-pointer"
          >
            {loading ? 'Memproses...' : 'Masuk Sekarang →'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-bold">
          Belum punya akun?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Daftar di sini
          </Link>
        </div>
      </div>
    </div>
  )
}

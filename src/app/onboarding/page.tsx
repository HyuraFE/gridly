'use client'

import { useState } from 'react'
import { createProfile } from '@/app/actions/profile'

export default function OnboardingPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const res = await createProfile(formData)
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="neo-box-lg w-full max-w-md p-8 bg-white">
        <div className="mb-6 text-center">
          <span className="inline-block bg-cyan-300 border-2 border-black font-black px-3 py-1 rounded-md text-sm mb-2 shadow-[2px_2px_0px_0px_#000]">
            STEP 1: IDENTITY
          </span>
          <h1 className="text-3xl font-black tracking-tight">Klaim Usernamemu</h1>
          <p className="text-sm font-semibold text-zinc-600 mt-1">Username ini akan jadi alamat link profilmu</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-lg text-red-700 font-bold text-sm shadow-[2px_2px_0px_0px_#ef4444]">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase mb-1">Username Unik</label>
            <div className="flex items-center">
              <span className="bg-zinc-200 border-3 border-r-0 border-black px-3 py-2 text-sm font-bold rounded-l-lg shadow-[3px_3px_0px_0px_#000]">
                /
              </span>
              <input
                name="username"
                type="text"
                required
                placeholder="nama-kamu"
                className="neo-input w-full px-3 py-2 text-sm rounded-l-none"
              />
            </div>
            <p className="text-[11px] font-semibold text-zinc-500 mt-1">3-24 karakter (huruf kecil, angka, _, -)</p>
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">Nama Tampilan</label>
            <input
              name="display_name"
              type="text"
              required
              placeholder="Contoh: Hyura FE"
              className="neo-input w-full px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">Bio Singkat</label>
            <textarea
              name="bio"
              rows={2}
              placeholder="Ceritakan tentang dirimu atau fokus karyamu..."
              className="neo-input w-full px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="neo-btn w-full py-3 bg-cyan-300 mt-4 cursor-pointer"
          >
            {loading ? 'Menyimpan...' : 'Selesai & Buka Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  )
}

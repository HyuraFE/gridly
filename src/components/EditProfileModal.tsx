'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateProfile } from '@/app/actions/profile'
import { Settings, X, Camera, Check } from 'lucide-react'

interface EditProfileModalProps {
  initialProfile: {
    display_name: string
    bio: string | null
    avatar_url: string | null
    username: string
  }
}

export default function EditProfileModal({ initialProfile }: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [displayName, setDisplayName] = useState(initialProfile.display_name || '')
  const [bio, setBio] = useState(initialProfile.bio || '')
  const [avatarUrl, setAvatarUrl] = useState(initialProfile.avatar_url || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('display_name', displayName)
    formData.append('bio', bio)
    formData.append('avatar_url', avatarUrl)

    const res = await updateProfile(formData)
    setLoading(false)

    if (res?.error) {
      setError(res.error)
    } else {
      setIsOpen(false)
      router.refresh()
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-2 border-2 border-black font-bold text-xs rounded-lg hover:bg-zinc-100 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#000] cursor-pointer bg-white"
        title="Edit Profil & Avatar"
      >
        <Settings className="w-4 h-4" />
        <span>Edit Profil</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="neo-box-lg bg-white w-full max-w-md p-6 relative animate-in fade-in zoom-in-95 duration-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-black">Edit Profil Akun</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 border-2 border-black rounded-lg hover:bg-zinc-100 shadow-[2px_2px_0px_0px_#000] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 mb-4 bg-rose-200 border-2 border-black rounded-lg text-xs font-bold text-rose-900 shadow-[2px_2px_0px_0px_#000]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Preview Avatar */}
              <div className="flex items-center gap-4 p-3 bg-zinc-50 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000]">
                <div className="w-16 h-16 rounded-xl border-2 border-black bg-yellow-300 flex items-center justify-center overflow-hidden shrink-0 shadow-[2px_2px_0px_0px_#000]">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={avatarUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setError('URL Gambar tidak valid atau tidak bisa dimuat')}
                    />
                  ) : (
                    <span className="font-black text-2xl">
                      {displayName ? displayName.charAt(0).toUpperCase() : '?'}
                    </span>
                  )}
                </div>
                <div className="text-xs">
                  <p className="font-black">Preview Foto Profil</p>
                  <p className="text-zinc-600 font-semibold mt-0.5">
                    Masukkan URL foto langsung (PNG, JPG, WebP)
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black mb-1 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" /> URL Foto Profil (Avatar)
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... atau link foto online"
                  value={avatarUrl}
                  onChange={(e) => {
                    setAvatarUrl(e.target.value)
                    setError(null)
                  }}
                  className="neo-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-black mb-1">
                  Nama Tampilan
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="neo-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-black mb-1">
                  Bio / Deskripsi Singkat
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Ceritakan siapa kamu atau apa fokusmu saat ini..."
                  className="neo-input w-full text-xs resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border-2 border-black font-bold text-xs rounded-lg hover:bg-zinc-100 shadow-[2px_2px_0px_0px_#000] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="neo-btn px-4 py-2 bg-yellow-300 font-black text-xs flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{loading ? 'Menyimpan...' : 'Simpan Profil'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

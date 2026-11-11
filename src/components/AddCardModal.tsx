'use client'

import { useState } from 'react'
import { addCard } from '@/app/actions/cards'

const COLOR_PRESETS = [
  { label: 'White', value: '#ffffff' },
  { label: 'Yellow', value: '#fef08a' },
  { label: 'Mint', value: '#bbf7d0' },
  { label: 'Cyan', value: '#bae6fd' },
  { label: 'Coral', value: '#fecdd3' },
  { label: 'Lavender', value: '#e9d5ff' },
]

export default function AddCardModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState('#ffffff')
  const [cardType, setCardType] = useState('link')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const res = await addCard(formData)
    if (res?.error) {
      setError(res.error)
      setLoading(false)
    } else {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="neo-btn px-4 py-2 bg-yellow-300 flex items-center gap-2 cursor-pointer text-sm"
      >
        <span className="text-lg font-black">+</span> Tambah Kartu Baru
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="neo-box-lg bg-white w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-black">Tambah Kartu Bento</h2>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-md border-2 border-black font-black hover:bg-zinc-100 flex items-center justify-center cursor-pointer shadow-[2px_2px_0px_0px_#000]"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded-lg text-red-700 font-bold text-xs">
                {error}
              </div>
            )}

            <form action={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase mb-1">Tipe Kartu</label>
                <select
                  name="type"
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                  className="neo-input w-full px-3 py-2 text-sm"
                >
                  <option value="link">🌐 Link Biasa (Portfolio, Website, Artikel)</option>
                  <option value="github">🐙 GitHub Repo / Username</option>
                  <option value="discord">💬 Discord Handle / Server</option>
                  <option value="spotify">🎵 Spotify Track / Playlist</option>
                  <option value="text">📝 Catatan / Quote / Status</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1">Judul Kartu</label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="Contoh: My Latest Open Source Project"
                  className="neo-input w-full px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1">
                  {cardType === 'link' && 'URL Link Tujuan'}
                  {cardType === 'github' && 'URL Repo atau Username GitHub'}
                  {cardType === 'discord' && 'Tag Discord / Link Invite'}
                  {cardType === 'spotify' && 'Link Lagu / Album Spotify'}
                  {cardType === 'text' && 'Isi Teks / Quote'}
                </label>
                <input
                  name="content"
                  type="text"
                  placeholder={
                    cardType === 'link'
                      ? 'https://example.com'
                      : cardType === 'github'
                      ? 'https://github.com/username/repo'
                      : cardType === 'discord'
                      ? 'username#0000 atau https://discord.gg/...'
                      : cardType === 'spotify'
                      ? 'https://open.spotify.com/track/...'
                      : 'Sedang fokus belajar sistem arsitektur...'
                  }
                  className="neo-input w-full px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Lebar (Kolom)</label>
                  <select name="col_span" className="neo-input w-full px-3 py-2 text-sm">
                    <option value="1">1 Kolom (Kotak Standar)</option>
                    <option value="2">2 Kolom (Lebar)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase mb-1">Tinggi (Baris)</label>
                  <select name="row_span" className="neo-input w-full px-3 py-2 text-sm">
                    <option value="1">1 Baris (Standar)</option>
                    <option value="2">2 Baris (Tinggi)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase mb-1">Warna Latar Kartu</label>
                <input type="hidden" name="bg_color" value={selectedColor} />
                <div className="flex gap-2">
                  {COLOR_PRESETS.map((c) => (
                    <button
                      type="button"
                      key={c.value}
                      onClick={() => setSelectedColor(c.value)}
                      style={{ backgroundColor: c.value }}
                      className={`w-8 h-8 rounded-md border-2 border-black cursor-pointer transition-transform ${
                        selectedColor === c.value
                          ? 'scale-115 ring-2 ring-black shadow-[2px_2px_0px_0px_#000]'
                          : 'opacity-80'
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border-2 border-black font-bold rounded-lg text-sm cursor-pointer hover:bg-zinc-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="neo-btn px-4 py-2 bg-lime-300 text-sm cursor-pointer"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Kartu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

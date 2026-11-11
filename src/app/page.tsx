import Link from 'next/link'
import { Sparkles, ArrowRight, Layers, ShieldCheck, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between p-4 md:p-8">
      {/* Navbar */}
      <header className="max-w-5xl w-full mx-auto neo-box p-4 bg-white flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg border-2 border-black bg-yellow-300 flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#000]">
            G
          </span>
          <span className="font-black text-xl tracking-tight">Gridly</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-bold px-3 py-2 border-2 border-black rounded-lg hover:bg-zinc-100 shadow-[2px_2px_0px_0px_#000]"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="neo-btn text-xs px-3 py-2 bg-yellow-300"
          >
            Daftar Gratis
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto w-full my-auto py-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-300 border-2 border-black rounded-full font-black text-xs mb-6 shadow-[2px_2px_0px_0px_#000]">
          <Sparkles className="w-4 h-4" /> Neobrutalism Link-in-Bio Platform
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight md:leading-none mb-6">
          Kumpulkan Karyamu dalam Satu Grid Estetis.
        </h1>

        <p className="text-base md:text-lg font-bold text-zinc-700 max-w-xl mx-auto mb-8 leading-relaxed">
          Ganti linktree monoton dengan bento grid modular penuh warna, interaktif, dan langsung mencerminkan kepribadianmu.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="neo-btn px-6 py-3.5 bg-yellow-300 text-base font-black flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Buat Gridly Sekarang <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="px-6 py-3.5 border-3 border-black rounded-lg font-black text-base bg-white hover:bg-zinc-100 shadow-[3px_3px_0px_0px_#000] w-full sm:w-auto justify-center"
          >
            Buka Dashboard
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-left">
          <div className="neo-box p-4 bg-white">
            <Layers className="w-6 h-6 mb-2 text-indigo-600" />
            <h3 className="font-black text-sm">Modular Layout</h3>
            <p className="text-xs font-semibold text-zinc-600 mt-1">
              Atur kartu dalam berbagai ukuran span 1x1, 2x1, atau 2x2 secara dinamis.
            </p>
          </div>
          <div className="neo-box p-4 bg-white">
            <Zap className="w-6 h-6 mb-2 text-amber-500" />
            <h3 className="font-black text-sm">Multi-Platform Cards</h3>
            <p className="text-xs font-semibold text-zinc-600 mt-1">
              Dukung link biasa, GitHub repositories, Discord badge, dan Spotify tracks.
            </p>
          </div>
          <div className="neo-box p-4 bg-white">
            <ShieldCheck className="w-6 h-6 mb-2 text-emerald-600" />
            <h3 className="font-black text-sm">Amankan Data dengan RLS</h3>
            <p className="text-xs font-semibold text-zinc-600 mt-1">
              Ditenagai PostgreSQL & Supabase Row Level Security untuk proteksi akun.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl w-full mx-auto text-center text-xs font-bold text-zinc-500 py-4">
        Gridly o by Arifin
      </footer>
    </div>
  )
}

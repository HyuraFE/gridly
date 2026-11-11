import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import CardItem from '@/components/CardItem'
import { Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createClient()

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('username, display_name, bio, avatar_url, theme, user_id')
    .eq('username', username.toLowerCase())
    .single()

  if (!profile) {
    notFound()
  }

  // Fetch user cards
  const { data: cards } = await supabase
    .from('bento_cards')
    .select('*')
    .eq('user_id', profile.user_id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header Block */}
        <header className="neo-box-lg bg-white p-6 md:p-8 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-3 border-black bg-amber-300 flex items-center justify-center font-black text-2xl md:text-3xl shadow-[3px_3px_0px_0px_#000]">
              {profile.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                profile.display_name.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-black text-black">
                  {profile.display_name}
                </h1>
                <span className="p-1 bg-yellow-300 border-2 border-black rounded-md shadow-[1px_1px_0px_0px_#000]" title="Verified Bento">
                  <Sparkles className="w-3.5 h-3.5 text-black" />
                </span>
              </div>
              <p className="text-xs font-bold text-zinc-500 mt-0.5">@{profile.username}</p>
              {profile.bio && (
                <p className="text-sm font-semibold text-zinc-800 mt-2 max-w-lg leading-relaxed">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          <div className="self-end md:self-auto">
            <Link
              href="/register"
              className="neo-btn text-xs px-3 py-1.5 bg-yellow-300 inline-flex items-center gap-1.5"
            >
              Buat Gridly Milikmu ↗
            </Link>
          </div>
        </header>

        {/* Bento Cards Grid */}
        <main>
          {cards && cards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
              {cards.map((card) => (
                <CardItem key={card.id} card={card} isOwner={false} />
              ))}
            </div>
          ) : (
            <div className="neo-box p-12 bg-white text-center">
              <p className="text-sm font-bold text-zinc-500">
                Pengguna ini belum menambahkan kartu ke profilnya.
              </p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs font-bold text-zinc-500">
          Gridly o by Arifin
        </footer>
      </div>
    </div>
  )
}

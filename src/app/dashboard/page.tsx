import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { signout } from '@/app/actions/auth'
import AddCardModal from '@/components/AddCardModal'
import EditProfileModal from '@/components/EditProfileModal'
import CardItem from '@/components/CardItem'
import { ExternalLink, User } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!profile) {
    redirect('/onboarding')
  }

  // Get user cards
  const { data: cards } = await supabase
    .from('bento_cards')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      {/* Top Bar */}
      <header className="neo-box p-4 bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl border-3 border-black bg-yellow-300 flex items-center justify-center font-black text-xl shadow-[2px_2px_0px_0px_#000] overflow-hidden shrink-0">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt={profile.display_name}
                className="w-full h-full object-cover"
              />
            ) : (
              profile.display_name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <span className="text-[11px] font-black uppercase bg-yellow-300 border-2 border-black px-2 py-0.5 rounded shadow-[1px_1px_0px_0px_#000]">
              Dashboard Editor
            </span>
            <h1 className="text-2xl font-black mt-1 flex items-center gap-2">
              Halo, {profile.display_name}!
            </h1>
            <p className="text-xs font-semibold text-zinc-600 mt-0.5">
              Link publikmu:{' '}
              <Link
                href={`/${profile.username}`}
                target="_blank"
                className="text-blue-600 hover:underline inline-flex items-center gap-1 font-bold"
              >
                /{profile.username} <ExternalLink className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          <EditProfileModal initialProfile={profile} />
          <AddCardModal />
          <form action={signout}>
            <button
              type="submit"
              className="px-3 py-2 border-2 border-black font-bold text-xs rounded-lg hover:bg-zinc-100 cursor-pointer shadow-[2px_2px_0px_0px_#000]"
            >
              Keluar
            </button>
          </form>
        </div>
      </header>

      {/* Main Grid Editor */}
      <main>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-black tracking-tight">Koleksi Kartu Gridly ({cards?.length || 0})</h2>
        </div>

        {cards && cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
            {cards.map((card) => (
              <CardItem key={card.id} card={card} isOwner={true} />
            ))}
          </div>
        ) : (
          <div className="neo-box p-12 bg-white text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-3 border-black bg-yellow-200 flex items-center justify-center mb-3 shadow-[2px_2px_0px_0px_#000]">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black">Belum ada kartu Gridly</h3>
            <p className="text-xs font-semibold text-zinc-600 max-w-sm mt-1 mb-4">
              Mulai isi profilmu dengan menambahkan kartu link proyek, media sosial, atau catatan singkat.
            </p>
            <AddCardModal />
          </div>
        )}
      </main>
    </div>
  )
}

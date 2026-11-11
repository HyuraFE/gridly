'use client'

import { deleteCard } from '@/app/actions/cards'
import { ExternalLink, GitBranch, Globe, MessageSquare, Music, FileText, Trash2 } from 'lucide-react'

interface BentoCard {
  id: string
  type: string
  title: string
  content: string | null
  bg_color: string
  col_span: number
  row_span: number
}

export default function CardItem({
  card,
  isOwner = false,
}: {
  card: BentoCard
  isOwner?: boolean
}) {
  const colClass = card.col_span === 2 ? 'col-span-1 md:col-span-2' : 'col-span-1'
  const rowClass = card.row_span === 2 ? 'row-span-2' : 'row-span-1'

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (confirm('Hapus kartu ini?')) {
      await deleteCard(card.id)
    }
  }

  const renderIcon = () => {
    switch (card.type) {
      case 'github':
        return <GitBranch className="w-5 h-5 text-zinc-900" />
      case 'discord':
        return <MessageSquare className="w-5 h-5 text-indigo-600" />
      case 'spotify':
        return <Music className="w-5 h-5 text-emerald-600" />
      case 'text':
        return <FileText className="w-5 h-5 text-amber-600" />
      default:
        return <Globe className="w-5 h-5 text-blue-600" />
    }
  }

  // Format link target properly with security validation against javascript:/data: URIs
  const getHref = () => {
    if (!card.content || card.type === 'text') return null
    const trimmed = card.content.trim()

    // Prevent XSS / malicious URI schemes
    if (/^(javascript|data|vbscript|file):/i.test(trimmed)) {
      return '#'
    }

    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed
    }
    if (card.type === 'github') {
      return `https://github.com/${trimmed.replace(/^@/, '')}`
    }
    return `https://${trimmed}`
  }

  const href = getHref()

  const cardInner = (
    <>
      <div className="w-full">
        <div className="flex justify-between items-start mb-3">
          <div className="p-2 border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_0px_#000]">
            {renderIcon()}
          </div>

          <div className="flex items-center gap-1.5">
            {isOwner && (
              <button
                type="button"
                onClick={handleDelete}
                className="p-1.5 border-2 border-black rounded-md bg-rose-200 hover:bg-rose-400 text-rose-900 cursor-pointer shadow-[2px_2px_0px_0px_#000] z-10 transition-colors"
                title="Hapus kartu"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <h3 className="font-black text-lg text-black leading-snug line-clamp-2">
          {card.title}
        </h3>

        {card.content && (
          <p className="mt-2 text-xs font-semibold text-zinc-700 line-clamp-3 break-words">
            {card.content}
          </p>
        )}
      </div>

      {href && (
        <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-zinc-600 group-hover:text-black">
          <span>Kunjungi link</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      )}
    </>
  )

  const containerClasses = `neo-box p-5 flex flex-col justify-between relative group ${colClass} ${rowClass} transition-all duration-150 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000]`

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ backgroundColor: card.bg_color || '#ffffff' }}
        className={`${containerClasses} cursor-pointer block no-underline`}
      >
        {cardInner}
      </a>
    )
  }

  return (
    <div
      style={{ backgroundColor: card.bg_color || '#ffffff' }}
      className={containerClasses}
    >
      {cardInner}
    </div>
  )
}

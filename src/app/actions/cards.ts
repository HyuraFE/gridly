'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addCard(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Sesi habis, silakan login ulang.' }
  }

  const type = formData.get('type') as string
  const title = (formData.get('title') as string || '').trim()
  const content = (formData.get('content') as string || '').trim()
  const bgColor = (formData.get('bg_color') as string || '#ffffff').trim()
  const colSpan = parseInt(formData.get('col_span') as string || '1', 10)
  const rowSpan = parseInt(formData.get('row_span') as string || '1', 10)

  if (!title) {
    return { error: 'Judul kartu wajib diisi.' }
  }

  const { error } = await supabase.from('bento_cards').insert({
    user_id: user.id,
    type,
    title,
    content: content || null,
    bg_color: bgColor,
    col_span: colSpan,
    row_span: rowSpan,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteCard(cardId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Sesi habis, silakan login ulang.' }
  }

  const { error } = await supabase
    .from('bento_cards')
    .delete()
    .eq('id', cardId)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

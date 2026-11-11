'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createProfile(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Sesi kedaluwarsa, silakan login ulang.' }
  }

  const username = (formData.get('username') as string || '').toLowerCase().trim()
  const displayName = (formData.get('display_name') as string || '').trim()
  const bio = (formData.get('bio') as string || '').trim()

  // Validation
  const usernameRegex = /^[a-z0-9_-]{3,24}$/
  if (!usernameRegex.test(username)) {
    return { error: 'Username hanya boleh huruf kecil, angka, _, atau -, panjang 3-24 karakter.' }
  }

  if (!displayName) {
    return { error: 'Nama tampilan wajib diisi.' }
  }

  // Check unique username
  const { data: existing } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single()

  if (existing) {
    return { error: 'Username sudah dipakai oleh pengguna lain.' }
  }

  const { error } = await supabase.from('profiles').insert({
    user_id: user.id,
    username,
    display_name: displayName,
    bio: bio || null,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Sesi kedaluwarsa, silakan login ulang.' }
  }

  const displayName = (formData.get('display_name') as string || '').trim()
  const bio = (formData.get('bio') as string || '').trim()
  const avatarUrl = (formData.get('avatar_url') as string || '').trim()

  if (!displayName) {
    return { error: 'Nama tampilan wajib diisi.' }
  }

  // Security check: avatar_url must be valid http/https or empty
  if (avatarUrl) {
    try {
      const parsed = new URL(avatarUrl)
      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return { error: 'URL foto harus berformat http atau https.' }
      }
    } catch {
      return { error: 'Format URL foto tidak valid.' }
    }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: displayName,
      bio: bio || null,
      avatar_url: avatarUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}


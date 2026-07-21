import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function saveBooking(data) {
  if (!supabase) return null
  const { data: result, error } = await supabase.from('bookings').insert([{ ...data, created_at: new Date().toISOString() }]).select()
  if (error) throw error
  return result[0]
}

export async function getBookings() {
  if (!supabase) return []
  const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function saveBlogPost(post) {
  if (!supabase) return null
  const { data, error } = await supabase.from('blog_posts').insert([{ ...post, created_at: new Date().toISOString() }]).select()
  if (error) throw error
  return data[0]
}

export async function getBlogPosts() {
  if (!supabase) return []
  const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function deleteBlogPost(id) {
  if (!supabase) return
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) throw error
}

export async function uploadImage(file) {
  if (!supabase) return ''
  try {
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('blog-images').upload(fileName, file)
    if (error) return ''
    const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(fileName)
    return urlData?.publicUrl || ''
  } catch {
    return ''
  }
}

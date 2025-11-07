import { supabase } from "./supabase-client";

export async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })

  if (error) {
    console.error('Error logging in:', error)
  }
}

export async function handleAuthCallback() {
  // Supabase automatically handles the hash fragment
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting session:', error)
    return null
  }

  // Ensure profile exists
  if (session?.user) {
    await ensureProfile(session.user)
  }
  
  return session
}

async function ensureProfile(user: any) {
  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()

  // If no profile, create one
  if (!existingProfile) {
    const { error } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || null,
        avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        role: 'user'
      })

    if (error) {
      console.error('Error creating profile:', error)
    }
  }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error) {
    console.error('Error fetching user:', error)
    return null
  }
  
  return user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error logging out:', error)
  }
}
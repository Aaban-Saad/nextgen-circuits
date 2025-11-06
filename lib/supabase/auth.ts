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
  
  return session
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
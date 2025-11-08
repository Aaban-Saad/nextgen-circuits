'use client'

import { supabase } from "./supabase-client";

export async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    }
  })

  if (error) {
    console.error('Error logging in:', error)
    throw error
  }
  
  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error logging out:', error)
    throw error
  }
  
  // Redirect to home after logout
  window.location.href = '/'
}
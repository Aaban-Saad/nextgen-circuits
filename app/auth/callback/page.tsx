'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { handleAuthCallback } from '@/lib/supabase/auth'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    handleAuthCallback().then((session) => {
      if (session) {
        // Clean redirect to home or dashboard
        router.push('/user')
      } else {
        router.push('/login')
      }
    })
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  )
}
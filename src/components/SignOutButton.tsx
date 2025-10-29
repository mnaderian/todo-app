'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' })
  }

  return (
    <button
      onClick={handleSignOut}
      className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    >
      Sign Out
    </button>
  )
}
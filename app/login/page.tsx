'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic (Firebase or your logic)
    console.log({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8 space-y-6">
        {/* Brand Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo/brand-logo.svg"
            alt="AC Ka Doctor"
            width={60}
            height={60}
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              placeholder="admin@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Optional Footer */}
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} AC Ka Doctor. All rights reserved.
        </p>
      </div>
    </div>
  )
}

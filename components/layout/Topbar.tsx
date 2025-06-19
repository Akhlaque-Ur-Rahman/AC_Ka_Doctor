'use client'

import React from 'react'

export default function Topbar() {
  return (
    <header className="flex items-center justify-end px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-800">Admin Name</p>
          <p className="text-xs text-gray-500">admin@ackadoctor.com</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-semibold">
          A
        </div>
      </div>
    </header>
  )
}

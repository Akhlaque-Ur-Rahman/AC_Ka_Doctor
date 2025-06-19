'use client'

import { Menu } from 'lucide-react'
import { useSidebar } from '@/hooks/useSidebar'

export default function Topbar() {
  const { toggle, collapsed } = useSidebar()

  return (
    <div
      className={`
        h-16 px-4 bg-white shadow-sm sticky top-0 z-30 flex items-center justify-between
        transition-all duration-300
        ${collapsed ? 'md:pl-20' : 'md:pl-60'}
      `}
    >
      {/* Hamburger menu */}
      <button
        onClick={toggle}
        className="md:hidden text-blue-700 hover:text-blue-500"
      >
        <Menu size={24} />
      </button>

      {/* Admin Info */}
      <div className="flex items-center gap-3 ml-auto">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-900">Admin Name</p>
          <p className="text-xs text-gray-500">admin@ackadoctor.com</p>
        </div>
        <div className="h-9 w-9 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </div>
  )
}

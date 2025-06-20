'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Topbar({
  collapsed,
  setCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: {
  collapsed: boolean
  setCollapsed: (val: boolean) => void
  isMobileOpen: boolean
  setIsMobileOpen: (val: boolean) => void
}) {
  return (
    <div className="h-16 px-4 flex items-center justify-between bg-white shadow-sm sticky top-0 z-20">
      {/* Toggle sidebar */}
      <div className="flex items-center gap-2">
        <button
          className="sm:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <button
          className="hidden sm:block"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Admin info */}
      <div className="h-16 px-4 bg-white flex items-center justify-between">
        <div className=" text-right">
          <p className="text-sm font-medium text-gray-800">Admin</p>
          <p className="text-xs text-gray-500">admin@example.com</p>
        </div>
          <Image
            src="/avatars/user-setting.png"
            alt="Admin Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
      </div>
    </div>
  )
}

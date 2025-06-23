'use client'

import { Home, Users, BarChart2, PieChart, LogOut, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Sidebar({
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
  const pathname = usePathname()

  const links = [
    { label: 'Home', icon: <Home size={18} />, href: '/dashboard' },
    { label: 'Analytics', icon: <PieChart size={18} />, href: '/analytics' },
    { label: 'Customers', icon: <Users size={18} />, href: '/customers' },
    { label: 'Reports', icon: <BarChart2 size={18} />, href: '/reports' },
  ]

  return (
    <aside
      className={`
        fixed sm:relative top-0 left-0 z-40
        h-screen sm:h-auto
        bg-slate-900 text-slate-100
        transition-all duration-300
        flex flex-col justify-between shadow-md
        ${collapsed ? 'w-20' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
      `}
    >
      <div>
        {/* 🔹 Top Brand Section for Mobile */}
        {isMobileOpen && (
          <div className="sm:hidden flex justify-between items-center px-4 py-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo/brand-logo.svg"
                alt="Logo"
                width={28}
                height={28}
              />
              <span className="text-lg font-semibold text-white">AC Ka Doctor</span>
            </div>
            <button onClick={() => setIsMobileOpen(false)} className="text-white">
              <X size={24} />
            </button>
          </div>
        )}

        {/* 🔹 Desktop Brand Logo */}
        {!collapsed && (
          <div className="hidden sm:flex justify-center items-center gap-2 px-4 py-4">
            <Image
              src="/logo/brand-logo.svg"
              alt="Logo"
              width={50}
              height={50}
            />
            <span className="text-lg font-semibold text-white">AC Ka Doctor</span>
          </div>
        )}

        {/* 🔹 Collapsed Logo */}
        {collapsed && (
          <div className="hidden sm:flex justify-center px-4 py-4">
            <Image
              src="/logo/brand-logo.svg"
              alt="Logo"
              width={40}
              height={40}
            />
          </div>
        )}

        {/* 🔹 Navigation */}
        <nav className="flex flex-col gap-1 px-2 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                transition-colors
                ${pathname === link.href
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800'}
              `}
            >
              {link.icon}
              {!collapsed && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* 🔹 Logout Button */}
      <div className="p-2 border-t border-slate-700">
        <button
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-slate-800 w-full rounded-md"
          onClick={() => alert('Logout')}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}

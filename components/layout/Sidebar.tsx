'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  BarChart,
  Globe,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/dashboard', icon: Home },
  { label: 'Customers', href: '/dashboard/customers', icon: Users },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
  { label: 'Website', href: '/', icon: Globe },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={`h-screen ${
        collapsed ? 'w-20' : 'w-60'
      } bg-blue-700 text-white flex flex-col transition-all duration-300 rounded-r-2xl`}
    >
      {/* Logo + Menu Section */}
      <div className="flex flex-col flex-1">
        {/* Logo + Toggle */}
        <header className="px-4 pt-4 pb-2 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center w-full">
              <img
                src="/logo/brand-logo.svg"
                alt="AC Ka Doctor"
                className={`${collapsed ? 'h-10 w-10' : 'h-16 w-auto'} transition-all duration-300`}
              />
            </div>
            <button
              onClick={() => setCollapsed(prev => !prev)}
              className="text-white hover:text-blue-300 ml-2"
            >
              {collapsed ? <PanelLeftOpen size={22} /> : <PanelLeftClose size={22} />}
            </button>
          </div>
        </header>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1.5 px-2 mt-2">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center ${
                  collapsed ? 'justify-center' : 'gap-3'
                } px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-blue-700 font-semibold'
                    : 'hover:bg-blue-600'
                }`}
              >
                <Icon size={20} className="shrink-0" />
                {!collapsed && <span className="truncate">{label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <footer className="px-2 pb-6">
        <Link
          href="/logout"
          className={`flex items-center ${
            collapsed ? 'justify-center' : 'gap-3'
          } px-3 py-2 rounded-md hover:bg-blue-600 transition`}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </footer>
    </aside>
  )
}

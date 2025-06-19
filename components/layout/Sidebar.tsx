'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
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
import { useSidebar } from '@/hooks/useSidebar'

const navItems = [
  { label: 'Home', href: '/dashboard', icon: Home },
  { label: 'Customers', href: '/dashboard/customers', icon: Users },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart },
  { label: 'Website', href: '/', icon: Globe },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggle, close, collapsed, toggleCollapse } = useSidebar()

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  return (
    <>
      {/* Backdrop on mobile */}
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col bg-blue-800 text-white
          transition-all duration-300 rounded-r-2xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:static md:z-auto
          ${collapsed ? 'w-20' : 'w-60'}
        `}
      >
        {/* Logo + Collapse Toggle */}
        <div className="relative pt-4 pb-2 px-4 flex justify-center">
          <img
            src="/logo/brand-logo.svg"
            alt="AC Ka Doctor"
            className={`transition-all duration-300 ${
              collapsed ? 'h-10 w-10' : 'h-20 w-auto'
            }`}
          />

          {/* Collapse Button (Desktop Only) */}
          <button
  onClick={toggleCollapse}
  className="hidden md:flex items-center justify-center absolute top-3/4 -right-0 
     text-white-800 shadow-lg  z-999
    hover: transition duration-200"
  aria-label="Toggle Sidebar"
>
  {collapsed ? <PanelLeftOpen size={24} /> : <PanelLeftClose size={24} />}
</button>

        </div>

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col gap-1.5 px-2 mt-2">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={close} // closes on mobile
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

        {/* Footer: Logout */}
        <footer className="px-2 pb-6">
          <Link
            href="/logout"
            onClick={close}
            className={`flex items-center ${
              collapsed ? 'justify-center' : 'gap-3'
            } px-3 py-2 rounded-md hover:bg-blue-600 transition`}
          >
            <LogOut size={20} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Link>
        </footer>
      </aside>
    </>
  )
}

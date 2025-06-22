'use client'

import { useState, ReactNode } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-opacity-40 sm:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className="flex flex-col flex-1 max-h-screen overflow-hidden">
        <Topbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* Scrollable content below topbar only */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  )
}

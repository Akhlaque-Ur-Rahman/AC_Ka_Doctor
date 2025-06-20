'use client'

import { useState, ReactNode } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)        // For desktop sidebar collapse
  const [isMobileOpen, setIsMobileOpen] = useState(false)  // For mobile sidebar drawer

  return (
    <div className="flex min-h-screen bg-gray-100 relative overflow-hidden">
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
      <div className="flex-1 flex flex-col">
        <Topbar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isMobileOpen={isMobileOpen}
          setIsMobileOpen={setIsMobileOpen}
        />
        <main className="p-4 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

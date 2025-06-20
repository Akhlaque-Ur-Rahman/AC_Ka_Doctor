'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

// Define the type of our context value
interface SidebarContextType {
  collapsed: boolean
  toggle: () => void
}

// Create the context
const SidebarContext = createContext<SidebarContextType | null>(null)

// Custom hook to access the sidebar context
export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

// Provider component to wrap your layout
export function SidebarProvider({ children }: { children: ReactNode }): JSX.Element {
  const [collapsed, setCollapsed] = useState(false)

  const toggle = () => setCollapsed((prev) => !prev)

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  )
}

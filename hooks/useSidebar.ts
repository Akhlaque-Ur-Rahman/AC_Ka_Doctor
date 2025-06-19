'use client'

import { useState } from 'react'

let _setCollapse: (val: boolean) => void = () => {}
let _getCollapse = () => false

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  _setCollapse = setCollapsed
  _getCollapse = () => collapsed

  return {
    isOpen,
    toggle: () => setIsOpen(prev => !prev),
    close: () => setIsOpen(false),
    collapsed,
    toggleCollapse: () => setCollapsed(prev => !prev),
  }
}

export const getSidebarCollapsed = () => _getCollapse()

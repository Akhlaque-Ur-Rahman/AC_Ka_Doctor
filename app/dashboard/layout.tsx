'use client'

import type { ReactNode } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function DashboardSectionLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}

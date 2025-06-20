// app/dashboard/layout.tsx
'use client'

import { ReactNode } from 'react'
import ClientLayout from '@/components/layout/ClientLayout'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>
}

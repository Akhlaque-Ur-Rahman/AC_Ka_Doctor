'use client'

import { Eye, MousePointerClick, Users } from 'lucide-react'
import StatCard from '@/components/StatCard'
import {useSummaryStats} from '@/hooks/useSummaryStats'

export default function DashboardPage() {
  const { stats, loading } = useSummaryStats()

  if (loading || !stats) {
    return <div className="p-4">Loading dashboard data...</div>
  }

  // Destructure stats
  const { impressions, clicks, customers, impressionsData, clicksData, customersData } = stats

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard
  title="Impressions"
  label="Last 7 days"
  value={739}
  icon={<Eye size={20} className="text-blue-500" />}
  color="#3B82F6" // Sky Blue for brand-safe, professional feel
  data={impressionsData}
/>










      <StatCard
  title="Clicks"
  label="Last 7 days"
  value={739}
  icon={<MousePointerClick size={20} />}
  color="#6366F1" // Tailwind green-500
  data={clicksData}
/>

      <StatCard
  title="Customers"
  label="Last 7 days"
  value={92}
  icon={<Users size={20} />}
  color="#10B981"
  data={customersData}
/>

    </div>
  )
}

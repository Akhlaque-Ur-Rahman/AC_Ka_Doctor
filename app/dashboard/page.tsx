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
        value={impressions}
        icon={<Eye size={20} />}
        color="blue"
        data={impressionsData}
      />

      <StatCard
        title="Clicks"
        label="Last 7 days"
        value={clicks}
        icon={<MousePointerClick size={20} />}
        color="green"
        data={clicksData}
      />

      <StatCard
        title="Customers"
        label="This month"
        value={customers}
        icon={<Users size={20} />}
        color="purple"
        data={customersData}
      />
    </div>
  )
}

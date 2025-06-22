'use client'

import { Eye, MousePointerClick, Users } from 'lucide-react'
import StatCard from '@/components/StatCard'
import RecentMessages from '@/components/RecentMessages'
import { useSummaryStats } from '@/hooks/useSummaryStats'
import StatCardGroup from '@/components/StatCardGroup'

export default function DashboardPage() {
  const { stats, loading } = useSummaryStats()

  if (loading || !stats) {
    return <div className="p-4">Loading dashboard data...</div>
  }

  // Destructure stats
  const { impressions, clicks, customers, impressionsData, clicksData, customersData } = stats

  return (
    <div className="space-y-6 p-4">
      <h1 className='text-2xl font-semibold text-gray-800'>Dashboard</h1>
      {/* Stat Cards */}
      <StatCardGroup/>

      {/* Recent Messages Section */}
      <RecentMessages />
    </div>
  )
}

'use client'

import { Eye, MousePointerClick, Users } from 'lucide-react'
import StatCard from '@/components/StatCard'
import RecentMessages from '@/components/RecentMessages'
import { useSummaryStats } from '@/hooks/useSummaryStats'
import StatCardGroup from '@/components/StatCardGroup'
import ToDoList from '@/components/ToDoList'

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
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 w-full">
          <RecentMessages />
        </div>
        <div className="lg:w-1/3 w-full">
          <ToDoList/>
        </div>
      </div>
    </div>
  )
}

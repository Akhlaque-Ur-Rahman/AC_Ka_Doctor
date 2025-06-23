'use client'

import { useState } from 'react'
import AnalyticsStatCard from '@/components/analytics/AnalyticsStatCard'
import AnalyticsTrafficChart from '@/components/analytics/AnalyticsTrafficChart'
import { Eye, BarChart2, Users } from 'lucide-react'
import DateRangeFilter, { RangeOption } from '@/components/DateRangeFilter'
import AnalyticsTrafficSources from '@/components/analytics/AnalyticsTrafficSources'
import AnalyticsTopLocations from '@/components/analytics/AnalyticsTopLocations'

const dummyData7Days = [
  { day: 'Mon', value: 200 },
  { day: 'Tue', value: 400 },
  { day: 'Wed', value: 300 },
  { day: 'Thu', value: 500 },
  { day: 'Fri', value: 600 },
  { day: 'Sat', value: 400 },
  { day: 'Sun', value: 700 },
]

const dummyData30Days = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  value: Math.floor(200 + Math.random() * 500),
}))

// For traffic chart, simulate date-based dummy data
const trafficData7Days = [
  { date: 'Mon', value: 500 },
  { date: 'Tue', value: 600 },
  { date: 'Wed', value: 550 },
  { date: 'Thu', value: 700 },
  { date: 'Fri', value: 800 },
  { date: 'Sat', value: 650 },
  { date: 'Sun', value: 900 },
]

const trafficData30Days = Array.from({ length: 30 }, (_, i) => ({
  date: (i + 1).toString(),
  value: Math.floor(400 + Math.random() * 400),
}))

export default function AnalyticsOverviewCards() {
  const [range, setRange] = useState<RangeOption>('Last 7 Days')

  const chartData = range === 'Last 30 Days' || range === 'This Month'
    ? dummyData30Days
    : dummyData7Days

  const trafficChartData = range === 'Last 30 Days' || range === 'This Month'
    ? trafficData30Days
    : trafficData7Days

  return (
    <div className="space-y-6">
      {/* 🔽 Global Filter Dropdown */}
      <div className="flex justify-end">
        <DateRangeFilter selected={range} onSelect={setRange} />
      </div>

      {/* 📊 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnalyticsStatCard
          title="Total Visitors"
          value="12,530"
          change={8.3}
          data={chartData}
          icon={Eye}
          iconColor="text-blue-600"
          lineColor="#3b82f6"
        />
        <AnalyticsStatCard
          title="Page Views"
          value="32,101"
          change={-3.4}
          data={chartData}
          icon={BarChart2}
          iconColor="text-purple-600"
          lineColor="#8b5cf6"
        />
        <AnalyticsStatCard
          title="New Users"
          value="4,220"
          change={2.1}
          data={chartData}
          icon={Users}
          iconColor="text-green-600"
          lineColor="#10b981"
        />
      </div>

      {/* 📈 Traffic Chart */}
      <AnalyticsTrafficChart
        title="Website Traffic Trend"
        data={trafficChartData}
        lineColor="#0ea5e9" // sky-500
      />
      <AnalyticsTrafficSources/>
      <AnalyticsTopLocations/>
    </div>
  )
}

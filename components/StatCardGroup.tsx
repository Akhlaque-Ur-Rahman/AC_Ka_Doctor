'use client'

import { useState } from 'react'
import { Eye, MousePointerClick, Users } from 'lucide-react'
import StatCard from './StatCard'
import { Filter } from 'lucide-react'

export default function StatCardGroup() {
  const [filter, setFilter] = useState('7')

  // Hardcoded datasets (replace later with API or props)
  const dataMap = {
    '7': {
      impressions: [140, 150, 160, 120, 100, 130, 180],
      clicks: [40, 30, 60, 50, 55, 45, 35],
      customers: [12, 8, 14, 10, 11, 7, 9],
    },
    '30': {
      impressions: Array(7).fill(100),
      clicks: Array(7).fill(40),
      customers: Array(7).fill(10),
    },
  }

  const { impressions, clicks, customers } = dataMap[filter as '7' | '30']


  return (
    <div className="w-full">
      {/* Filter */}
      <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-semibold">Overview</h2>
  <div className="flex items-center gap-2">
    <Filter className="w-4 h-4 text-gray-500" />
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value as '7' | '30')}
      className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none"
    >
      <option value="7">Last 7 Days</option>
      <option value="30">Last 30 Days</option>
    </select>
  </div>
</div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Impressions"
          label="Last 7 days"
          value={impressions.reduce((a, b) => a + b, 0)}
          icon={<Eye size={20} />}
          color="#3B82F6"
          data={impressions}
        />
        <StatCard
          title="Clicks"
          label="Last 7 days"
          value={clicks.reduce((a, b) => a + b, 0)}
          icon={<MousePointerClick size={20} />}
          color="#6366F1"
          data={clicks}
        />
        <StatCard
          title="Customers"
          label="Last 7 days"
          value={customers.reduce((a, b) => a + b, 0)}
          icon={<Users size={20} />}
          color="#10B981"
          data={customers}
        />
      </div>
    </div>
  )
}

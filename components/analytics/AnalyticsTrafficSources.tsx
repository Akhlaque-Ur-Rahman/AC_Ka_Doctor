'use client'

import {
  Search,
  Link,
  Users,
  Globe,
  BarChart2,
} from 'lucide-react'

const trafficSources = [
  { label: 'Organic Search', icon: Search, value: 5840, percent: 48, color: 'bg-blue-500' },
  { label: 'Direct', icon: Globe, value: 3021, percent: 25, color: 'bg-green-500' },
  { label: 'Referral', icon: Link, value: 1987, percent: 16, color: 'bg-yellow-500' },
  { label: 'Social Media', icon: Users, value: 1290, percent: 11, color: 'bg-pink-500' },
]

export default function AnalyticsTrafficSources() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
        <BarChart2 className="w-5 h-5 text-blue-600" />
        Traffic Sources Breakdown
      </div>

      <div className="space-y-4">
        {trafficSources.map((src, index) => (
          <div key={index}>
            {/* ✅ Icon + Label + % */}
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <src.icon className="w-4 h-4 text-gray-500" />
                {src.label}
              </div>
              <span className="text-sm font-medium text-gray-700">{src.percent}%</span>
            </div>

            {/* ✅ Bar */}
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${src.color}`}
                style={{ width: `${src.percent}%` }}
              />
            </div>

            {/* ✅ Sessions Count */}
            <p className="text-xs text-gray-500 mt-1">
              {src.value.toLocaleString()} sessions
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

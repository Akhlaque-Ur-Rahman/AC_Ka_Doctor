'use client'

import { ReactNode } from 'react'

export interface StatCardProps {
  title: string
  label: string
  value: number
  icon: ReactNode
  color: string // Tailwind color string e.g. 'blue', 'green'
  data: number[] // For mini line chart
}

export default function StatCard({
  title,
  label,
  value,
  icon,
  color,
  data,
}: StatCardProps) {
  // Generate SVG path string for mini chart
  const generateMiniChartPath = () => {
    if (!data || data.length === 0) return ''

    const maxVal = Math.max(...data)
    const minVal = Math.min(...data)
    const height = 30
    const width = 60
    const step = width / (data.length - 1 || 1)

    return data
      .map((point, i) => {
        const x = i * step
        const y = height - ((point - minVal) / (maxVal - minVal || 1)) * height
        return `${i === 0 ? 'M' : 'L'}${x},${y}`
      })
      .join(' ')
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className={`text-${color}-500`}>{icon}</div>

        {/* Mini line chart */}
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
          <path
            d={generateMiniChartPath()}
            stroke={`#3b82f6`} // optional: can derive from `color`
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>
    </div>
  )
}

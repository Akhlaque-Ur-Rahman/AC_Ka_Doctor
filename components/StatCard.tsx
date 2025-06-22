'use client'

import { ReactNode } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export interface StatCardProps {
  title: string
  label: string
  value: number
  icon: ReactNode
  color: string
  data: number[] // Array of 7 values for chart
}

const dayMap = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const transformToChartData = (raw: number[]) =>
  raw.map((value, index) => ({
    day: dayMap[index],
    value,
  }))

export default function StatCard({
  title,
  label,
  value,
  icon,
  color,
  data,
}: StatCardProps) {
  const chartData = transformToChartData(data)

  return (
    <div className="bg-white rounded-xl p-5 shadow-md w-full max-w-sm transition hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
        </div>
        <div
          className="w-10 h-10 flex items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}20` }} // light tint background
        >
          <div className="text-[18px]" style={{ color }}>
            {icon}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: '#9ca3af' }} // Tailwind gray-400
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                fontSize: '12px',
                borderRadius: '4px',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
              }}
              labelStyle={{ color: '#6b7280' }}
              cursor={{ fill: '#f3f4f6' }}
            />
            <Bar
              dataKey="value"
              fill={color}
              radius={[4, 4, 0, 0]}
              barSize={18}
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sub Label */}
      <p className="text-xs text-gray-400 mt-3">{label}</p>
    </div>
  )
}

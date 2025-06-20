'use client'

import { ReactNode } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export interface StatCardProps {
  title: string
  label: string
  value: number
  icon: ReactNode
  color: string
  data: number[] // expects array of 7 numbers
}

const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// transform [120, 130, ...] to [{ day: 'Sun', value: 120 }, ...]
const transformToChartData = (raw: number[]) =>
  raw.map((value, index) => ({
    day: dayMap[index],
    value,
  }))

export default function StatCard({ title, label, value, icon, color, data }: StatCardProps) {
  const chartData = transformToChartData(data)

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-600">{title}</h4>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-blue-500">{icon}</div>
      </div>

      {/* Sub Label */}
      <p className="text-xs text-gray-400 mt-2">{label}</p>

      {/* Chart */}
      <div className="mt-2 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide domain={[0, Math.max(...data) + 20]} />
            <Tooltip
              contentStyle={{ fontSize: '12px', borderRadius: '4px' }}
              labelStyle={{ color: '#6b7280' }} // gray-500
              cursor={{ fill: '#f3f4f6' }} // gray-100
            />
            <Bar
              dataKey="value"
              fill={color}
              radius={[4, 4, 0, 0]}
              animationDuration={400}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

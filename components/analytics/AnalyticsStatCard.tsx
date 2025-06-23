'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  title: string
  value: string
  change: number
  data: { day: string; value: number }[]
  icon: LucideIcon
  iconColor?: string
  lineColor?: string
}

export default function AnalyticsStatCard({
  title,
  value,
  change,
  data,
  icon: Icon,
  iconColor = 'text-blue-500',
  lineColor = '#3b82f6',
}: Props) {
  const changeColor = change >= 0 ? 'text-green-600' : 'text-red-500'
  const formattedChange = `${change > 0 ? '+' : ''}${change.toFixed(1)}%`

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          <span className="text-2xl font-bold text-gray-800">{value}</span>
        </div>
        <div className={cn('p-2 rounded-full bg-gray-100', iconColor)}>
          <Icon size={20} />
        </div>
      </div>

      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
  <LineChart data={data}>
    <XAxis
  dataKey="day"
  tickLine={false}
  axisLine={false}
  interval="preserveStartEnd" // ✅ Ensures "Mon" is shown
  style={{ fontSize: '12px', fill: '#6b7280' }}
/>

    <Tooltip
      cursor={{ stroke: '#e5e7eb', strokeWidth: 2 }}
      contentStyle={{
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '6px',
        fontSize: '12px',
      }}
    />
    <Line
      type="monotone"
      dataKey="value"
      stroke={lineColor}
      strokeWidth={2.5}
      dot={{ r: 3 }}
      activeDot={{ r: 5 }}
    />
  </LineChart>
</ResponsiveContainer>

      </div>

      <p className={cn('text-sm font-medium', changeColor)}>
        {formattedChange} from last week
      </p>
    </div>
  )
}

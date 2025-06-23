'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

type Props = {
  title: string
  data: { date: string; value: number }[]
  lineColor?: string
}

export default function AnalyticsTrafficChart({
  title,
  data,
  lineColor = '#3b82f6', // default blue
}: Props) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '12px', fill: '#6b7280' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '12px', fill: '#6b7280' }}
            />
            <Tooltip
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
    </div>
  )
}

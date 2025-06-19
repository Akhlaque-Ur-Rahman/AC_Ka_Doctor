'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function StatCard({
  label,
  value,
  icon,
  color,
  data,
}: {
  label: string
  value: number
  icon: React.ReactNode
  color: 'blue' | 'green' | 'purple'
  data: number[]
}) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-700',
  }

  const chartColor = {
    blue: '#3B82F6',
    green: '#10B981',
    purple: '#8B5CF6',
  }

  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString())

  useEffect(() => {
    animate(count, value, { duration: 1.2 })
  }, [value])

  const chartData = Array.isArray(data)
    ? data.map((v, i) => ({ name: `D${i + 1}`, value: v }))
    : []

  const gradientId = `gradient-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="bg-white shadow-sm rounded-lg p-5 space-y-2 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${colorMap[color]}`}>{icon}</div>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
        <motion.p className={`text-lg font-semibold ${colorMap[color].split(' ')[1]}`}>
          {rounded}
        </motion.p>
      </div>

      <div className="h-24 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColor[color]} stopOpacity={0.8} />
                <stop offset="100%" stopColor={chartColor[color]} stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" hide />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: 'none',
              }}
              labelFormatter={() => ''}
              formatter={(value) => [`${value}`, label]}
            />
            <Bar
              dataKey="value"
              fill={`url(#${gradientId})`}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

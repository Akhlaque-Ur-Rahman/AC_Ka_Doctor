'use client'

import { useEffect, useState } from 'react'
import { Eye, MousePointerClick, Users } from 'lucide-react'
import { db } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    impressions: 0,
    clicks: 0,
    customers: 0,
  })
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'analytics', 'summary'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data()
        setStats({
          impressions: data.impressions || 0,
          clicks: data.clicks || 0,
          customers: data.customers || 0,
        })
        setUpdatedAt(
          data.updatedAt?.seconds
            ? new Date(data.updatedAt.seconds * 1000)
            : new Date()
        )
      }
    })

    return () => unsub()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      {updatedAt && (
        <p className="text-sm text-gray-500">
          Last updated: {updatedAt.toLocaleString()}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard label="Impressions" value={stats.impressions} color="blue" icon={<Eye />} />
        <StatCard label="Clicks" value={stats.clicks} color="green" icon={<MousePointerClick />} />
        <StatCard label="Customers" value={stats.customers} color="purple" icon={<Users />} />
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string
  value: number
  color: 'blue' | 'green' | 'purple'
  icon: React.ReactNode
}) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-700',
  }

  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.floor(v).toLocaleString())

  useEffect(() => {
    animate(count, value, { duration: 1.2 })
  }, [value])

  return (
    <div className="bg-white shadow-sm rounded-lg p-5">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${colorMap[color]}`}>{icon}</div>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
      <motion.p
        className={`text-2xl font-semibold mt-2 ${colorMap[color].split(' ')[1]}`}
      >
        {rounded}
      </motion.p>
    </div>
  )
}

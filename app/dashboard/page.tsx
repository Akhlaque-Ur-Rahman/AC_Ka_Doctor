'use client'

import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import StatCard from '@/components/StatCard'
import { Eye, Users, MousePointerClick, BarChart3 } from 'lucide-react'

export default function DashboardPage() {
    const [summary, setSummary] = useState<any>(null)

    useEffect(() => {
        const fetchSummary = async () => {
            const docRef = doc(db, 'analytics', 'summary')
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setSummary(docSnap.data())
            } else {
                console.error('No analytics/summary doc found.')
            }
        }

        fetchSummary()
    }, [])

    if (!summary) {
        return <p className="p-6 text-gray-500">Loading dashboard...</p>
    }

    const lastUpdated = summary.updatedAt?.toDate().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <StatCard
                    label="Impressions"
                    value={summary.impressions ?? 0}
                    icon={<Eye size={20} />}
                    color="blue"
                    data={summary.impressionsData ?? []}
                />
                <StatCard
                    label="Clicks"
                    value={summary.clicks ?? 0}
                    icon={<MousePointerClick size={20} />}
                    color="purple"
                    data={summary.clicksData ?? []}
                />
                <StatCard
                    label="Customers"
                    value={summary.customers ?? 0}
                    icon={<Users size={20} />}
                    color="green"
                    data={summary.customersData ?? []}
                />
                
            </div>
        </div>
    )
}

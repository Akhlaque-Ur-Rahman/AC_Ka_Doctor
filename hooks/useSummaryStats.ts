// lib/hooks/useSummaryStats.ts
import { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase' // adjust the import path to your config

export interface SummaryStats {
  impressions: number
  clicks: number
  customers: number
  impressionsData: number[]
  clicksData: number[]
  customersData: number[]
}


export const useSummaryStats = () => {
  const [stats, setStats] = useState<SummaryStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const docRef = doc(db, 'analytics', 'summary')
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setStats(docSnap.data() as SummaryStats)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading }
}

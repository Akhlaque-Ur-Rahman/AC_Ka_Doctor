'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { MapPin } from 'lucide-react'
import indiaGeoJson from '@/lib/geo/india.json'

type StateData = {
  name: string
  value: number
}

const mockIndiaData: StateData[] = [
  { name: 'Bihar', value: 8200 },
  { name: 'Maharashtra', value: 3420 },
  { name: 'Karnataka', value: 2250 },
  { name: 'Delhi', value: 1890 },
  { name: 'Uttar Pradesh', value: 1340 },
  { name: 'Tamil Nadu', value: 980 },
  { name: 'Gujarat', value: 750 },
  { name: 'West Bengal', value: 610 },
  { name: 'Rajasthan', value: 500 },
]

export default function AnalyticsUserLocation() {
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chart = echarts.init(chartRef.current!)
    echarts.registerMap('india', indiaGeoJson as any)

    chart.setOption({
      title: {
        text: 'User Locations (India)',
        left: 'center',
        top: 10,
        textStyle: {
          fontSize: 16,
          color: '#111',
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} users',
      },
      visualMap: {
        min: 0,
        max: 9000,
        left: 20,
        bottom: 20,
        text: ['High', 'Low'],
        calculable: true,
        inRange: {
          color: ['#e0f2fe', '#60a5fa', '#1d4ed8'],
        },
      },
      series: [
        {
          name: 'Users',
          type: 'map',
          map: 'india',
          roam: true,
          zoom: 1.5,
          center: [87.5, 25.5],
          label: {
            show: false,
          },
          itemStyle: {
            borderColor: '#ccc',
            borderWidth: 0.5,
          },
          emphasis: {
            label: {
              show: true,
              fontWeight: 'bold',
              color: '#000',
            },
            itemStyle: {
              areaColor: '#4ade80',
              borderColor: '#0284c7',
              shadowColor: 'rgba(0,0,0,0.2)',
              shadowBlur: 6,
            },
          },
          data: mockIndiaData,
        },
      ],
    })

    const resize = () => chart.resize()
    window.addEventListener('resize', resize)

    return () => {
      chart.dispose()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
        <MapPin className="w-5 h-5 text-green-600" />
        User Location Overview (India)
      </div>
      <div ref={chartRef} className="w-full h-[400px]" />
    </div>
  )
}

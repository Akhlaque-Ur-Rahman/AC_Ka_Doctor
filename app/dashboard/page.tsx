'use client'

import { Eye, MousePointerClick, Users } from 'lucide-react'



export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Impressions */}
        <div className="bg-white shadow-sm rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
              <Eye size={20} />
            </div>
            <p className="text-sm text-gray-500">Impressions</p>
          </div>
          <p className="text-2xl font-semibold text-blue-700 mt-2">1,845</p>
        </div>

        {/* Clicks */}
        <div className="bg-white shadow-sm rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-600 p-2 rounded-full">
              <MousePointerClick size={20} />
            </div>
            <p className="text-sm text-gray-500">Clicks</p>
          </div>
          <p className="text-2xl font-semibold text-green-600 mt-2">739</p>
        </div>

        {/* Customers */}
        <div className="bg-white shadow-sm rounded-lg p-5">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
              <Users size={20} />
            </div>
            <p className="text-sm text-gray-500">Customers</p>
          </div>
          <p className="text-2xl font-semibold text-purple-700 mt-2">92</p>
        </div>
      </div>
    </div>
  )
}


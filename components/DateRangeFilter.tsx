'use client'

import { useState } from 'react'
import { CalendarDays, ChevronDown } from 'lucide-react'

export type RangeOption = 'Last 7 Days' | 'Last 30 Days' | 'This Month'

type Props = {
  selected: RangeOption
  onSelect: (range: RangeOption) => void
}

const options: RangeOption[] = ['Last 7 Days', 'Last 30 Days', 'This Month']

export default function DateRangeFilter({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false)

  return (
  <div className="relative inline-block text-sm font-medium text-gray-700">
    <button
      onClick={() => setOpen((prev) => !prev)}
      className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition bg-white"
    >
      <CalendarDays className="w-4 h-4 text-gray-500" />
      {selected}
      <ChevronDown className="w-4 h-4 text-gray-500" />
    </button>

    {open && (
      <div
        className="absolute right-0 z-50 mt-2 w-44 max-w-[90vw] bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden"
        style={{ maxWidth: '90vw' }} // optional fallback for strict environments
      >
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              onSelect(opt)
              setOpen(false)
            }}
            className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
              selected === opt ? 'bg-gray-100 font-semibold' : ''
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    )}
  </div>
)

}

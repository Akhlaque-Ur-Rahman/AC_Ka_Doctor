'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Modal from './MessageModal'

export type MessageType = {
id: string
name: string
email: string
message: string
status: 'read' | 'unread'
createdAt: Date
}

const initialMessages: MessageType[] = [
{
id: '1',
name: 'Karan Patel',
email: 'karan.patel@example.com',
message: 'Need urgent servicing for my AC. Please call back soon.',
status: 'read',
createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
},
{
id: '2',
name: 'Anjali Mehra',
email: 'anjali.mehra@example.com',
message: 'I would like to understand more about your AMC service plans.',
status: 'unread',
createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
},
{
id: '3',
name: 'Rohit Verma',
email: 'rohit.verma@example.com',
message: 'Is there any discount on annual maintenance contract?',
status: 'read',
createdAt: new Date(Date.now() - 5 * 60 * 1000),
},
{
id: '4',
name: 'Priya Shah',
email: 'priya.shah@example.com',
message: 'My AC is leaking water. Can I book a service online?',
status: 'unread',
createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
},
{
id: '5',
name: 'Rahul Jain',
email: 'rahul.jain@example.com',
message: 'Please send quotation for AMC plans.',
status: 'read',
createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
},
]

export default function RecentMessages() {
const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null)

return (
<div className="bg-white p-6 rounded-lg shadow-sm w-full">
<div className="flex justify-between items-center mb-4">
<h2 className="text-lg font-semibold flex items-center gap-2">
<MessageSquare className="w-5 h-5 text-blue-600" />
Recent Messages
</h2>
</div>

  {/* Table layout on desktop, stacked cards on mobile */}
  <div className="hidden md:block overflow-x-auto">
    <table className="min-w-full text-sm text-left">
      <thead>
        <tr className="border-b text-gray-600 uppercase text-xs">
          <th className="py-2 pr-4">Name</th>
          <th className="py-2 pr-4">Message</th>
          <th className="py-2 pr-4">Time</th>
        </tr>
      </thead>
      <tbody>
        {initialMessages.map((msg) => (
          <tr
            key={msg.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedMessage(msg)}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedMessage(msg)}
            className="border-b hover:bg-gray-50 cursor-pointer"
          >
            <td className="py-2 pr-4 font-medium text-gray-800">{msg.name}</td>
            <td className="py-2 pr-4 text-gray-700 max-w-[250px] truncate">{msg.message}</td>
            <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">
              {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile responsive card layout */}
  <div className="md:hidden space-y-3">
    {initialMessages.map((msg) => (
      <div
        key={msg.id}
        className="border rounded-lg px-4 py-3 shadow-sm cursor-pointer hover:bg-gray-50"
        onClick={() => setSelectedMessage(msg)}
      >
        <div className="font-semibold text-gray-800">{msg.name}</div>
        <div className="text-sm text-gray-600 truncate">{msg.message}</div>
        <div className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
        </div>
      </div>
    ))}
  </div>

  {/* Footer */}
  <div className="text-right mt-4">
    <Link href="/dashboard/messages" className="text-sm text-blue-600 hover:underline">
      View all messages →
    </Link>
  </div>

  {/* Modal */}
  {selectedMessage && (
    <Modal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
  )}
</div>
)
}
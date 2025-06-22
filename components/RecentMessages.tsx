'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, MoreVertical, MessageSquare } from 'lucide-react'
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

// Dummy 10 messages
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
  {
    id: '6',
    name: 'Sneha Kapoor',
    email: 'sneha.k@example.com',
    message: 'Do you provide emergency repairs on weekends?',
    status: 'unread',
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: '7',
    name: 'Vikas Sinha',
    email: 'vikas.sinha@example.com',
    message: 'Can I schedule an installation for next Monday?',
    status: 'read',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: '8',
    name: 'Neha Bansal',
    email: 'neha.bansal@example.com',
    message: 'I need help understanding your servicing process.',
    status: 'unread',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '9',
    name: 'Amit Roy',
    email: 'amit.roy@example.com',
    message: 'Is AMC compulsory or optional?',
    status: 'read',
    createdAt: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: '10',
    name: 'Megha Joshi',
    email: 'megha.joshi@example.com',
    message: 'Do you offer servicing for window ACs?',
    status: 'unread',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
]

export default function RecentMessages() {
  const [messages, setMessages] = useState(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all')

  const filteredMessages =
    filter === 'all'
      ? messages
      : messages.filter((msg) => msg.status === filter)

  const toggleStatus = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? { ...msg, status: msg.status === 'read' ? 'unread' : 'read' }
          : msg
      )
    )
    setDropdownOpen(null)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" /> Recent Messages
        </h2>


        {/* Tabs */}
        <div className="flex gap-2 text-sm font-medium">
          {(['all', 'read', 'unread'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-full border ${filter === tab
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'text-gray-600 border-gray-300 hover:bg-gray-100'
                } capitalize`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-600 uppercase text-xs">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Message</th>
              <th className="py-2 pr-4">Time</th>
              <th className="py-2 pr-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.map((msg) => (
              <tr key={msg.id} className="border-b hover:bg-gray-50">
                <td className="py-2 pr-4 font-medium text-gray-800">{msg.name}</td>
                <td className="py-2 pr-4 text-gray-600">{msg.email}</td>
                <td className="py-2 pr-4">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${msg.status === 'read'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {msg.status}
                  </span>
                </td>
                <td className="py-2 pr-4 max-w-[250px] text-gray-700 truncate">
                  {msg.message}
                </td>
                <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">
                  {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
                </td>
                <td className="py-2 pr-2 text-right relative">
                  <button
                    onClick={() => setSelectedMessage(msg)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    <Eye size={18} />
                  </button>

                  <div className="inline-block relative">
                    <button
                      onClick={() =>
                        setDropdownOpen(dropdownOpen === msg.id ? null : msg.id)
                      }
                    >
                      <MoreVertical size={18} />
                    </button>
                    {dropdownOpen === msg.id && (
                      <div className="absolute z-20 right-0 mt-2 w-40 bg-white border rounded shadow-md text-sm">
                        <button
                          onClick={() => toggleStatus(msg.id)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {msg.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-4">
        
        <Link href='/dashboard/messages' className="text-sm text-blue-600 hover:underline">
          View all messages →
        </Link>
      </div>

      {selectedMessage && (
        <Modal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  )
}

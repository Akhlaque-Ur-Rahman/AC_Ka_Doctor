// app/dashboard/messages/page.tsx
'use client'

import { useState } from 'react'
import { MessageSquare, Eye, MoreVertical, Download } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { saveAs } from 'file-saver'
import { CSVLink } from 'react-csv'
import Modal from '@/components/MessageModal'

export type MessageType = {
  id: string
  name: string
  email: string
  message: string
  status: 'read' | 'unread'
  createdAt: Date
}

// Dummy 20 messages (add more if needed)
const allMessages: MessageType[] = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  message: `Sample message ${i + 1} regarding AC servicing...`,
  status: i % 2 === 0 ? 'read' : 'unread',
  createdAt: new Date(Date.now() - (i + 1) * 60 * 60 * 1000),
}))

export default function MessagesPage() {
  const [messages, setMessages] = useState(allMessages)
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const messagesPerPage = 10

  const filteredMessages =
    filter === 'all'
      ? messages
      : messages.filter((msg) => msg.status === filter)

  const indexOfLast = currentPage * messagesPerPage
  const indexOfFirst = indexOfLast - messagesPerPage
  const currentMessages = filteredMessages.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage)

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
    <div className="space-y-6 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
          <MessageSquare className="w-6 h-6 text-blue-600" />
          All Messages
        </h1>

        {/* Filter Tabs */}
        <div className="flex gap-2 text-sm font-medium">
          {(['all', 'read', 'unread'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setFilter(tab)
                setCurrentPage(1)
              }}
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

      {/* Export Button */}
      <div className="flex justify-end">
        <CSVLink
          data={filteredMessages.map(({ createdAt, ...rest }) => ({
            ...rest,
            createdAt: createdAt.toISOString(),
          }))}
          filename="messages_export.csv"
          className="inline-flex items-center gap-1 text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          <Download size={16} />
          Export All Messages
        </CSVLink>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left mt-4">
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
            {currentMessages.map((msg) => (
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

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 text-sm rounded ${currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <Modal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  )
}

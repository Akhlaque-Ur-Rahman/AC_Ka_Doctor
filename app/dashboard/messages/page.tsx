'use client'

import { useState } from 'react'
import { MessageSquare, Download } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { CSVLink } from 'react-csv'
import MessageModal from '@/components/MessageModal'

export type MessageType = {
  id: string
  name: string
  email: string
  message: string
  status: 'read' | 'unread'
  createdAt: Date
}

const messagesData: MessageType[] = [
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
  },{
  id: '3',
  name: 'Ritika Sharma',
  email: 'ritika.sharma@example.com',
  message: 'Can you send me the AMC pricing list?',
  status: 'read',
  createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
},
{
  id: '4',
  name: 'Arjun Singh',
  email: 'arjun.singh@example.com',
  message: 'Is there an emergency repair option available?',
  status: 'unread',
  createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
},
{
  id: '5',
  name: 'Divya Khurana',
  email: 'divya.k@example.com',
  message: 'How do I request a technician visit?',
  status: 'read',
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
},
{
  id: '6',
  name: 'Mohit Rana',
  email: 'mohit.rana@example.com',
  message: 'I want to reschedule my appointment.',
  status: 'unread',
  createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
},
{
  id: '7',
  name: 'Pooja Iyer',
  email: 'pooja.iyer@example.com',
  message: 'Can I pay in cash after service?',
  status: 'read',
  createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
},
{
  id: '8',
  name: 'Raj Malhotra',
  email: 'raj.m@example.com',
  message: 'Facing issues with the cooling even after repair.',
  status: 'unread',
  createdAt: new Date(Date.now() - 45 * 60 * 1000),
},
{
  id: '9',
  name: 'Sneha Nair',
  email: 'sneha.nair@example.com',
  message: 'Can I cancel my existing AMC?',
  status: 'read',
  createdAt: new Date(Date.now() - 10 * 60 * 1000),
},
{
  id: '10',
  name: 'Ravi Choudhary',
  email: 'ravi.c@example.com',
  message: 'How long is the warranty for servicing?',
  status: 'unread',
  createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
},
{
  id: '11',
  name: 'Aarav Mehta',
  email: 'aarav.mehta@example.com',
  message: 'I need servicing for multiple AC units.',
  status: 'read',
  createdAt: new Date(Date.now() - 15 * 60 * 1000),
},
{
  id: '12',
  name: 'Kavita Das',
  email: 'kavita.das@example.com',
  message: 'Service technician was very helpful!',
  status: 'read',
  createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
},
{
  id: '13',
  name: 'Tanmay Bhatt',
  email: 'tanmay.b@example.com',
  message: 'When is the next availability for repair?',
  status: 'unread',
  createdAt: new Date(Date.now() - 22 * 60 * 1000),
},
{
  id: '14',
  name: 'Aisha Khan',
  email: 'aisha.khan@example.com',
  message: 'Can I get AMC for 2 years at once?',
  status: 'read',
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
},
{
  id: '15',
  name: 'Ramesh Iyer',
  email: 'ramesh.iyer@example.com',
  message: 'Do you cover outstation services?',
  status: 'unread',
  createdAt: new Date(Date.now() - 3 * 60 * 1000),
},
{
  id: '16',
  name: 'Sanya Kapoor',
  email: 'sanya.k@example.com',
  message: 'I need help using the booking form.',
  status: 'read',
  createdAt: new Date(Date.now() - 11 * 60 * 1000),
},
{
  id: '17',
  name: 'Harshit Rathi',
  email: 'harshit.rathi@example.com',
  message: 'Do you have any discount codes?',
  status: 'unread',
  createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
},
{
  id: '18',
  name: 'Mira Joshi',
  email: 'mira.joshi@example.com',
  message: 'When is the technician expected to arrive?',
  status: 'read',
  createdAt: new Date(Date.now() - 20 * 60 * 1000),
},
{
  id: '19',
  name: 'Nikhil Bansal',
  email: 'nikhil.b@example.com',
  message: 'My AC remote is not working. Can you help?',
  status: 'unread',
  createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
},
{
  id: '20',
  name: 'Diya Arora',
  email: 'diya.arora@example.com',
  message: 'Need an invoice for my last payment.',
  status: 'read',
  createdAt: new Date(Date.now() - 9 * 60 * 60 * 1000),
}

  // ...add more dummy messages up to 20
]

const ITEMS_PER_PAGE = 10

export default function MessagesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null)
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all')

  const filteredMessages = filter === 'all'
    ? messagesData
    : messagesData.filter(msg => msg.status === filter)

  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE)
  const paginatedMessages = filteredMessages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Status', key: 'status' },
    { label: 'Message', key: 'message' },
    { label: 'Created At', key: 'createdAt' },
  ]

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
          <MessageSquare className="text-blue-600" size={24} />
          All Messages
        </h1>

        <CSVLink
          data={filteredMessages.map((msg) => ({
            ...msg,
            createdAt: msg.createdAt.toISOString(),
          }))}
          headers={headers}
          filename="messages.csv"
          className="inline-flex items-center gap-2 text-sm text-blue-600 border border-blue-600 px-3 py-1.5 rounded hover:bg-blue-50"
        >
          <Download size={16} />
          Export Messages
        </CSVLink>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 text-sm font-medium">
        {(['all', 'read', 'unread'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setFilter(tab)
              setCurrentPage(1)
            }}
            className={`px-3 py-1.5 rounded-full border ${
              filter === tab
                ? 'bg-blue-100 text-blue-700 border-blue-300'
                : 'text-gray-600 border-gray-300 hover:bg-gray-100'
            } capitalize`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="border-b text-gray-600 uppercase text-xs">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Message</th>
              <th className="py-2 pr-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMessages.map((msg) => (
              <tr
                key={msg.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedMessage(msg)}
              >
                <td className="py-2 pr-4 font-medium text-gray-800">{msg.name}</td>
                <td className="py-2 pr-4 text-gray-600">{msg.email}</td>
                <td className="py-2 pr-4">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      msg.status === 'read'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {msg.status}
                  </span>
                </td>
                <td className="py-2 pr-4 text-gray-700 truncate max-w-[200px]">{msg.message}</td>
                <td className="py-2 pr-4 text-gray-500 whitespace-nowrap">
                  {formatDistanceToNow(msg.createdAt, { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {paginatedMessages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => setSelectedMessage(msg)}
            className="border p-4 rounded-lg shadow-sm bg-white cursor-pointer"
          >
            <div className="font-semibold text-gray-800">{msg.name}</div>
            <div className="text-sm text-gray-600 mb-2">{msg.email}</div>
            <div className="text-sm text-gray-700 mb-1 truncate">{msg.message}</div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span
                className={`px-2 py-0.5 rounded-full ${
                  msg.status === 'read'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {msg.status}
              </span>
              <span>{formatDistanceToNow(msg.createdAt, { addSuffix: true })}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1.5 rounded border text-sm ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  )
}

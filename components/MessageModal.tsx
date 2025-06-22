'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { MessageType } from '@/hooks/useMessages'

export default function MessageModal({
  message,
  onClose,
}: {
  message: MessageType
  onClose: () => void
}) {
  const [isRead, setIsRead] = useState(message.status === 'read')
  const [loading, setLoading] = useState(false)

  const handleStatusChange = async () => {
    setLoading(true)
    try {
      const ref = doc(db, 'messages', message.id)
      await updateDoc(ref, { status: isRead ? 'unread' : 'read' })
      setIsRead((prev) => !prev)
    } catch (err) {
      console.error('Failed to update status:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-800"
        >
          <X size={18} />
        </button>

        {/* Name */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-500">Sender Name</label>
          <div className="bg-gray-100 rounded-md px-3 py-2 mt-1 text-sm text-gray-800">
            {message.name}
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-500">Sender Email</label>
          <div className="bg-gray-100 rounded-md px-3 py-2 mt-1 text-sm text-gray-800">
            {message.email}
          </div>
        </div>

        {/* Message */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-500">Message</label>
          <div className="bg-gray-50 rounded-md px-3 py-2 mt-1 text-sm text-gray-700 whitespace-pre-wrap">
            {message.message}
          </div>
        </div>

        {/* Mark as Read Toggle */}
        
      </motion.div>
    </div>
  )
}

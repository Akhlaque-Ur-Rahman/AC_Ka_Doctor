'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export type MessageType = {
  id: string
  name: string
  email: string
  message: string
  tag?: string
status?: 'unread' | 'read' | 'pending' | string
  createdAt?: any
}

export default function useMessages() {
  const [messages, setMessages] = useState<MessageType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesRef = collection(db, 'messages')
        const q = query(messagesRef, orderBy('createdAt', 'desc'))

        const snapshot = await getDocs(q)
        console.log('📦 Firestore message snapshot size:', snapshot.size)

        if (snapshot.empty) {
          console.warn('⚠️ No messages found in Firestore.')
          setMessages([])
        } else {
          const parsed = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<MessageType, 'id'>),
          }))
          console.log('✅ Parsed messages:', parsed)
          setMessages(parsed)
        }
      } catch (error) {
        console.error('❌ Error fetching messages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  return { messages, loading }
}

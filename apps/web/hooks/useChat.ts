'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { getApiUrl } from '@/lib/api'

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  read: boolean
  createdAt: string
}

export interface Conversation {
  id: string
  participant: {
    id: string
    name: string
    avatar?: string
    role: string
  }
  lastMessage?: {
    content: string
    createdAt: string
    read: boolean
  }
  serviceRequest?: {
    id: string
    title: string
  }
  unreadCount: number
}

interface UseChatOptions {
  conversationId?: string
  pollingInterval?: number
  autoMarkRead?: boolean
}

export function useChat(options: UseChatOptions = {}) {
  const { conversationId, pollingInterval = 5000, autoMarkRead = true } = options

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pollingRef = useRef<NodeJS.Timeout | null>(null)
  const lastMessageIdRef = useRef<string | null>(null)

  const getToken = useCallback(() => {
    return localStorage.getItem('accessToken')
  }, [])

  // Fetch all conversations
  const fetchConversations = useCallback(async () => {
    try {
      const token = getToken()
      if (!token) return

      const response = await fetch(getApiUrl('/api/conversations'), {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setConversations(data.data.conversations || [])
      }
    } catch (err) {
      console.error('Error fetching conversations:', err)
      setError('Erro ao carregar conversas')
    } finally {
      setLoading(false)
    }
  }, [getToken])

  // Fetch messages for a specific conversation
  const fetchMessages = useCallback(async (convId: string) => {
    try {
      const token = getToken()
      if (!token) return

      const response = await fetch(
        getApiUrl('/api/conversations/${convId}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const data = await response.json()
      if (data.success) {
        const newMessages = data.data.messages || []
        setMessages(newMessages)

        // Check for new messages
        if (newMessages.length > 0) {
          const lastMessage = newMessages[newMessages.length - 1]
          if (lastMessageIdRef.current !== lastMessage.id) {
            lastMessageIdRef.current = lastMessage.id

            // Mark as read if autoMarkRead is enabled
            if (autoMarkRead) {
              markAsRead(convId)
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError('Erro ao carregar mensagens')
    }
  }, [getToken, autoMarkRead])

  // Send a message
  const sendMessage = useCallback(async (convId: string, content: string) => {
    if (!content.trim()) return null

    setSending(true)
    setError(null)

    try {
      const token = getToken()
      if (!token) throw new Error('Not authenticated')

      const response = await fetch(
        getApiUrl('/api/conversations/${convId}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content }),
        }
      )

      const data = await response.json()
      if (data.success) {
        const newMessage = data.data
        setMessages((prev) => [...prev, newMessage])
        return newMessage
      } else {
        throw new Error(data.message || 'Erro ao enviar mensagem')
      }
    } catch (err) {
      console.error('Error sending message:', err)
      setError('Erro ao enviar mensagem')
      return null
    } finally {
      setSending(false)
    }
  }, [getToken])

  // Mark conversation as read
  const markAsRead = useCallback(async (convId: string) => {
    try {
      const token = getToken()
      if (!token) return

      await fetch(getApiUrl('/api/conversations/${convId}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      })

      // Update local state
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === convId ? { ...conv, unreadCount: 0 } : conv
        )
      )
    } catch (err) {
      console.error('Error marking as read:', err)
    }
  }, [getToken])

  // Create or get conversation with a user
  const startConversation = useCallback(async (userId: string, serviceRequestId?: string) => {
    try {
      const token = getToken()
      if (!token) throw new Error('Not authenticated')

      const response = await fetch(getApiUrl('/api/conversations'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ participantId: userId, serviceRequestId }),
      })

      const data = await response.json()
      if (data.success) {
        await fetchConversations()
        return data.data
      } else {
        throw new Error(data.message || 'Erro ao iniciar conversa')
      }
    } catch (err) {
      console.error('Error starting conversation:', err)
      setError('Erro ao iniciar conversa')
      return null
    }
  }, [getToken, fetchConversations])

  // Get total unread count
  const getTotalUnread = useCallback(() => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0)
  }, [conversations])

  // Setup polling for new messages
  useEffect(() => {
    if (conversationId) {
      fetchMessages(conversationId)

      // Start polling
      pollingRef.current = setInterval(() => {
        fetchMessages(conversationId)
      }, pollingInterval)

      return () => {
        if (pollingRef.current) {
          clearInterval(pollingRef.current)
        }
      }
    }
  }, [conversationId, pollingInterval, fetchMessages])

  // Initial load of conversations
  useEffect(() => {
    fetchConversations()
  }, [fetchConversations])

  return {
    conversations,
    messages,
    loading,
    sending,
    error,
    fetchConversations,
    fetchMessages,
    sendMessage,
    markAsRead,
    startConversation,
    getTotalUnread,
  }
}

export default useChat

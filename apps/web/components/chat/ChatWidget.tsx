'use client'

import { useState, useEffect, useRef } from 'react'
import { Button, Card, CardContent, Input } from '@/components/ui'
import { LoadingSpinner } from '@/components/shared'
import { useChat } from '@/hooks/useChat'
import Image from 'next/image'
import {
  MessageSquare,
  X,
  Send,
  ChevronDown,
  CheckCheck,
} from 'lucide-react'

interface ChatWidgetProps {
  recipientId: string
  recipientName: string
  recipientAvatar?: string
  serviceRequestId?: string
  onClose?: () => void
}

export default function ChatWidget({
  recipientId,
  recipientName,
  recipientAvatar,
  serviceRequestId,
  onClose,
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string>('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, loading, sending, sendMessage, startConversation, fetchMessages } = useChat({
    conversationId: conversationId || undefined,
    pollingInterval: 3000,
  })

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setCurrentUserId(payload.sub || payload.userId)
      } catch (e) {
        console.error('Error parsing token:', e)
      }
    }
  }, [])

  useEffect(() => {
    if (isOpen && !conversationId) {
      initConversation()
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const initConversation = async () => {
    const conv = await startConversation(recipientId, serviceRequestId)
    if (conv) {
      setConversationId(conv.id)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !conversationId) return

    await sendMessage(conversationId, message)
    setMessage('')
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 lg:bottom-6 right-6 w-14 h-14 bg-mustard-500 rounded-full flex items-center justify-center shadow-lg hover:bg-mustard-600 transition-colors z-40"
      >
        <MessageSquare className="w-6 h-6 text-navy-900" />
      </button>
    )
  }

  return (
    <Card className="fixed bottom-24 lg:bottom-6 right-6 w-[350px] max-w-[calc(100vw-2rem)] shadow-2xl z-40">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-navy-900 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-mustard-500 flex items-center justify-center text-navy-900 font-semibold">
            {recipientAvatar ? (
              <img
                src={recipientAvatar}
                alt={recipientName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              recipientName.charAt(0)
            )}
          </div>
          <div>
            <p className="font-medium">{recipientName}</p>
            <p className="text-xs text-gray-300">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/10 rounded"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <CardContent className="p-0">
        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner size="md" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-sm text-center">
                Inicie a conversa enviando uma mensagem
              </p>
            </div>
          ) : (
            <>
              {messages.map((msg) => {
                const isOwn = msg.senderId === currentUserId
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        isOwn
                          ? 'bg-mustard-500 text-navy-900 rounded-br-md'
                          : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div
                        className={`flex items-center gap-1 mt-1 ${
                          isOwn ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <span className={`text-xs ${isOwn ? 'text-navy-700' : 'text-gray-400'}`}>
                          {formatTime(msg.createdAt)}
                        </span>
                        {isOwn && (
                          <CheckCheck
                            className={`w-3.5 h-3.5 ${
                              msg.read ? 'text-navy-700' : 'text-navy-500'
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 border-t bg-white rounded-b-lg">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
              disabled={sending || !conversationId}
            />
            <Button
              type="submit"
              size="sm"
              className="bg-mustard-500 hover:bg-mustard-600 text-navy-900"
              disabled={!message.trim() || sending || !conversationId}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

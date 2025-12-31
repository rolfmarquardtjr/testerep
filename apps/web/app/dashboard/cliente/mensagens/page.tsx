'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Input } from '@/components/ui'
import { LoadingSpinner } from '@/components/shared'
import {
  Search,
  Send,
  ChevronLeft,
  User,
  CheckCheck,
  Image as ImageIcon,
  MessageSquare,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  X,
  Clock,
  Home,
  FileText,
  Star,
  Circle,
} from 'lucide-react'

interface Message {
  id: string
  content: string
  senderId: string
  createdAt: string
  read: boolean
}

interface Conversation {
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

export default function MensagensPage() {
  const searchParams = useSearchParams()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [currentUserId, setCurrentUserId] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchConversations()
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
    const proName = searchParams.get('pro')
    if (proName && conversations.length > 0) {
      const conv = conversations.find(c => c.participant.name === proName)
      if (conv) {
        handleSelectConversation(conv)
      }
    }
  }, [searchParams, conversations])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('http://localhost:3001/api/conversations', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setConversations(data.data.conversations || [])
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (conversationId: string) => {
    setLoadingMessages(true)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`http://localhost:3001/api/conversations/${conversationId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setMessages(data.data.messages || [])
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoadingMessages(false)
    }
  }

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    fetchMessages(conversation.id)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    setSending(true)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`http://localhost:3001/api/conversations/${selectedConversation.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newMessage }),
      })

      const data = await response.json()
      if (data.success) {
        setMessages([...messages, data.data])
        setNewMessage('')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Ontem'
    } else if (diffDays < 7) {
      return date.toLocaleDateString('pt-BR', { weekday: 'short' })
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    }
  }

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.serviceRequest?.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalUnread = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Carregando..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Hero Banner */}
        <div className="max-w-7xl mx-auto px-8 pt-8">
          <div className="bg-navy-900 rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800 to-transparent" />
            <div className="relative z-10 max-w-lg">
              <h1 className="text-3xl font-bold text-white mb-3">Mensagens</h1>
              <p className="text-gray-300 mb-6">
                Converse com profissionais sobre seus servicos
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{conversations.length}</p>
                  <p className="text-sm text-gray-400">Conversas</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{totalUnread}</p>
                  <p className="text-sm text-gray-400">Nao lidas</p>
                </div>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"
              alt="Mensagens"
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 pb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[calc(100vh-320px)]">
            <div className="flex h-full">
              {/* Conversations Sidebar */}
              <div className="w-96 border-r border-gray-100 flex flex-col">
                {/* Search Header */}
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Buscar conversas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 bg-white border-gray-200 rounded-xl"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.length === 0 ? (
                    <div className="text-center py-16 px-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-10 h-10 text-gray-300" />
                      </div>
                      <h3 className="font-semibold text-navy-900 mb-2">Nenhuma conversa</h3>
                      <p className="text-sm text-gray-500">
                        Suas conversas com profissionais aparecerao aqui
                      </p>
                    </div>
                  ) : (
                    filteredConversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => handleSelectConversation(conversation)}
                        className={`w-full p-4 text-left transition-all border-b border-gray-50 ${
                          selectedConversation?.id === conversation.id
                            ? 'bg-mustard-50 border-l-4 border-l-mustard-500'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold text-lg shadow-sm overflow-hidden">
                              {conversation.participant.avatar ? (
                                <img
                                  src={conversation.participant.avatar}
                                  alt={conversation.participant.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                conversation.participant.name.charAt(0)
                              )}
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="font-semibold text-navy-900 truncate">
                                {conversation.participant.name}
                              </p>
                              {conversation.lastMessage && (
                                <span className="text-xs text-gray-400 flex-shrink-0">
                                  {formatTime(conversation.lastMessage.createdAt)}
                                </span>
                              )}
                            </div>
                            {conversation.serviceRequest && (
                              <p className="text-xs text-mustard-600 truncate mb-1 font-medium">
                                {conversation.serviceRequest.title}
                              </p>
                            )}
                            {conversation.lastMessage && (
                              <p className={`text-sm truncate ${
                                conversation.unreadCount > 0 ? 'text-navy-900 font-medium' : 'text-gray-500'
                              }`}>
                                {conversation.lastMessage.content}
                              </p>
                            )}
                          </div>
                          {conversation.unreadCount > 0 && (
                            <span className="w-6 h-6 rounded-full bg-mustard-500 text-navy-900 text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col bg-gray-50">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold shadow-sm overflow-hidden">
                            {selectedConversation.participant.avatar ? (
                              <img
                                src={selectedConversation.participant.avatar}
                                alt={selectedConversation.participant.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              selectedConversation.participant.name.charAt(0)
                            )}
                          </div>
                          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        </div>
                        <div>
                          <p className="font-semibold text-navy-900 text-lg">
                            {selectedConversation.participant.name}
                          </p>
                          <p className="text-sm text-green-600 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Online agora
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                          <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                          <Video className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                          <Star className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Service Request Info */}
                    {selectedConversation.serviceRequest && (
                      <div className="px-4 py-3 bg-mustard-50 border-b border-mustard-100">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-mustard-600" />
                          <span className="text-sm text-mustard-700 font-medium">
                            Pedido: {selectedConversation.serviceRequest.title}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      {loadingMessages ? (
                        <div className="flex items-center justify-center h-full">
                          <LoadingSpinner size="md" />
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <MessageSquare className="w-10 h-10 text-gray-300" />
                          </div>
                          <p className="text-gray-600 font-medium mb-1">Nenhuma mensagem ainda</p>
                          <p className="text-gray-400 text-sm">Envie uma mensagem para iniciar a conversa</p>
                        </div>
                      ) : (
                        <>
                          {messages.map((message, index) => {
                            const isOwn = message.senderId === currentUserId
                            const showDate = index === 0 ||
                              new Date(message.createdAt).toDateString() !==
                              new Date(messages[index - 1].createdAt).toDateString()

                            return (
                              <div key={message.id}>
                                {showDate && (
                                  <div className="flex justify-center my-6">
                                    <span className="px-4 py-1.5 bg-white rounded-full text-xs text-gray-500 shadow-sm border border-gray-100">
                                      {new Date(message.createdAt).toLocaleDateString('pt-BR', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long'
                                      })}
                                    </span>
                                  </div>
                                )}
                                <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                                  <div
                                    className={`max-w-lg rounded-2xl px-5 py-3 shadow-sm ${
                                      isOwn
                                        ? 'bg-navy-700 text-white rounded-br-md'
                                        : 'bg-white text-gray-900 rounded-bl-md border border-gray-100'
                                    }`}
                                  >
                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                    <div
                                      className={`flex items-center gap-1.5 mt-2 ${
                                        isOwn ? 'justify-end' : 'justify-start'
                                      }`}
                                    >
                                      <span className={`text-xs ${isOwn ? 'text-gray-300' : 'text-gray-400'}`}>
                                        {formatTime(message.createdAt)}
                                      </span>
                                      {isOwn && (
                                        <CheckCheck
                                          className={`w-4 h-4 ${
                                            message.read ? 'text-mustard-400' : 'text-gray-400'
                                          }`}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                          <div ref={messagesEndRef} />
                        </>
                      )}
                    </div>

                    {/* Message Input */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <button type="button" className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                          <Paperclip className="w-5 h-5" />
                        </button>
                        <button type="button" className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                          <ImageIcon className="w-5 h-5" />
                        </button>
                        <div className="flex-1 relative">
                          <Input
                            placeholder="Digite sua mensagem..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="h-12 rounded-xl bg-gray-50 border-gray-200 pr-12"
                            disabled={sending}
                          />
                          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <Smile className="w-5 h-5" />
                          </button>
                        </div>
                        <Button
                          type="submit"
                          className="h-12 px-6 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium"
                          disabled={!newMessage.trim() || sending}
                        >
                          <Send className="w-5 h-5" />
                        </Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                      <MessageSquare className="w-16 h-16 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">Suas mensagens</h3>
                    <p className="text-gray-500 text-center max-w-xs">
                      Selecione uma conversa ao lado para visualizar as mensagens
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden pb-20">
        {/* Conversations List */}
        {!selectedConversation && (
          <>
            {/* Mobile Header */}
            <div className="bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 px-4 pt-6 pb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Mensagens</h1>
              <p className="text-white/60 text-sm mb-6">
                Converse com profissionais
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-white">{conversations.length}</p>
                  <p className="text-xs text-white/60">Conversas</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold text-white">{totalUnread}</p>
                  <p className="text-xs text-white/60">Nao lidas</p>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-white/10 border-white/20 rounded-xl text-white placeholder:text-white/50"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="px-4 -mt-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {filteredConversations.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="font-semibold text-navy-900 mb-2">Nenhuma conversa</h3>
                    <p className="text-sm text-gray-500">
                      Suas conversas com profissionais aparecerao aqui
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredConversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => handleSelectConversation(conversation)}
                        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold text-lg shadow-sm overflow-hidden">
                              {conversation.participant.avatar ? (
                                <img
                                  src={conversation.participant.avatar}
                                  alt={conversation.participant.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                conversation.participant.name.charAt(0)
                              )}
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="font-semibold text-navy-900 truncate">
                                {conversation.participant.name}
                              </p>
                              {conversation.lastMessage && (
                                <span className="text-xs text-gray-400 flex-shrink-0">
                                  {formatTime(conversation.lastMessage.createdAt)}
                                </span>
                              )}
                            </div>
                            {conversation.serviceRequest && (
                              <p className="text-xs text-mustard-600 truncate mb-1 font-medium">
                                {conversation.serviceRequest.title}
                              </p>
                            )}
                            {conversation.lastMessage && (
                              <p className={`text-sm truncate ${
                                conversation.unreadCount > 0 ? 'text-navy-900 font-medium' : 'text-gray-500'
                              }`}>
                                {conversation.lastMessage.content}
                              </p>
                            )}
                          </div>
                          {conversation.unreadCount > 0 && (
                            <span className="w-6 h-6 rounded-full bg-mustard-500 text-navy-900 text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Chat View */}
        {selectedConversation && (
          <div className="fixed inset-0 z-50 bg-gray-50 flex flex-col">
            {/* Chat Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-gray-100 safe-area-top">
              <div className="px-4 py-3 flex items-center gap-3">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold shadow-sm overflow-hidden">
                    {selectedConversation.participant.avatar ? (
                      <img
                        src={selectedConversation.participant.avatar}
                        alt={selectedConversation.participant.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      selectedConversation.participant.name.charAt(0)
                    )}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-navy-900 truncate">
                    {selectedConversation.participant.name}
                  </p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              {selectedConversation.serviceRequest && (
                <div className="px-4 pb-3">
                  <div className="px-3 py-2 bg-mustard-50 rounded-xl flex items-center gap-2">
                    <Clock className="w-4 h-4 text-mustard-600" />
                    <span className="text-xs text-mustard-700 font-medium truncate">
                      {selectedConversation.serviceRequest.title}
                    </span>
                  </div>
                </div>
              )}
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <LoadingSpinner size="md" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                    <MessageSquare className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-600 font-medium mb-1">Nenhuma mensagem ainda</p>
                  <p className="text-gray-400 text-sm">Envie uma mensagem para iniciar!</p>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => {
                    const isOwn = message.senderId === currentUserId
                    const showDate = index === 0 ||
                      new Date(message.createdAt).toDateString() !==
                      new Date(messages[index - 1].createdAt).toDateString()

                    return (
                      <div key={message.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-500 shadow-sm border border-gray-100">
                              {new Date(message.createdAt).toLocaleDateString('pt-BR', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short'
                              })}
                            </span>
                          </div>
                        )}
                        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                              isOwn
                                ? 'bg-navy-700 text-white rounded-br-md'
                                : 'bg-white text-gray-900 rounded-bl-md border border-gray-100'
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <div
                              className={`flex items-center gap-1 mt-1.5 ${
                                isOwn ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <span className={`text-xs ${isOwn ? 'text-gray-300' : 'text-gray-400'}`}>
                                {formatTime(message.createdAt)}
                              </span>
                              {isOwn && (
                                <CheckCheck
                                  className={`w-3.5 h-3.5 ${
                                    message.read ? 'text-mustard-400' : 'text-gray-400'
                                  }`}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 safe-area-bottom">
              <div className="flex items-center gap-2">
                <button type="button" className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="h-12 rounded-full bg-gray-100 border-0 px-5 pr-12"
                    disabled={sending}
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <Button
                  type="submit"
                  className="h-12 w-12 p-0 bg-mustard-500 hover:bg-mustard-600 rounded-full flex items-center justify-center"
                  disabled={!newMessage.trim() || sending}
                >
                  <Send className="w-5 h-5 text-navy-900" />
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile Bottom Navigation - only show when not in chat */}
        {!selectedConversation && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40">
            <div className="flex items-center justify-around">
              <Link href="/dashboard/cliente" className="flex flex-col items-center py-2 px-3 text-gray-400">
                <Home className="w-6 h-6" />
                <span className="text-xs mt-1">Inicio</span>
              </Link>
              <Link href="/dashboard/cliente/pedidos" className="flex flex-col items-center py-2 px-3 text-gray-400">
                <FileText className="w-6 h-6" />
                <span className="text-xs mt-1">Pedidos</span>
              </Link>
              <Link href="/explorar" className="flex flex-col items-center py-2 px-3 text-gray-400">
                <Search className="w-6 h-6" />
                <span className="text-xs mt-1">Explorar</span>
              </Link>
              <Link href="/dashboard/cliente/mensagens" className="flex flex-col items-center py-2 px-3 text-mustard-600">
                <MessageSquare className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">Mensagens</span>
              </Link>
              <Link href="/dashboard/cliente/perfil" className="flex flex-col items-center py-2 px-3 text-gray-400">
                <User className="w-6 h-6" />
                <span className="text-xs mt-1">Perfil</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </div>
  )
}

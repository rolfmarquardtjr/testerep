'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button, Card, CardContent, Input } from '@/components/ui'
import { LoadingSpinner, EmptyState } from '@/components/shared'
import {
import { getApiUrl } from '@/lib/api'
  Search,
  Send,
  ArrowLeft,
  User,
  CheckCheck,
  Image as ImageIcon,
  MessageSquare,
  Home,
  Briefcase,
  CheckCircle,
  X,
  Phone,
  MoreVertical,
  Smile,
  Paperclip,
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

export default function MensagensProfissionalPage() {
  const searchParams = useSearchParams()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [showConversations, setShowConversations] = useState(true)
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
    const clientName = searchParams.get('client')
    if (clientName && conversations.length > 0) {
      const conv = conversations.find((c) => c.participant.name === clientName)
      if (conv) {
        handleSelectConversation(conv)
      }
    }
  }, [searchParams, conversations])

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(getApiUrl('/api/conversations'), {
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
      const response = await fetch(
        getApiUrl('/api/conversations/${conversationId}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

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
    setShowConversations(false)
    fetchMessages(conversation.id)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    setSending(true)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(
        getApiUrl('/api/conversations/${selectedConversation.id}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: newMessage }),
        }
      )

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

  const filteredConversations = conversations.filter((conv) =>
    conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalUnread = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Carregando conversas..." />
      </div>
    )
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block h-[calc(100vh-8rem)]">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-mustard-100 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-mustard-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy-900">Mensagens</h1>
              <p className="text-gray-600">
                {conversations.length} conversa(s) {totalUnread > 0 && `- ${totalUnread} nao lida(s)`}
              </p>
            </div>
          </div>
        </div>

        <Card className="h-[calc(100%-5rem)] overflow-hidden border-0 shadow-sm rounded-2xl">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-96 border-r border-gray-100 flex flex-col bg-gray-50/50">
              <div className="p-4 border-b border-gray-100 bg-white">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar conversas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-11 rounded-xl bg-gray-50 border-gray-200"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <MessageSquare className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="font-medium text-gray-900 mb-1">
                      {searchTerm ? 'Nenhuma conversa encontrada' : 'Nenhuma conversa'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {searchTerm
                        ? 'Tente outro termo de busca'
                        : 'Suas conversas com clientes aparecerao aqui'}
                    </p>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => handleSelectConversation(conversation)}
                      className={`w-full p-4 text-left transition-all border-b border-gray-100 ${
                        selectedConversation?.id === conversation.id
                          ? 'bg-mustard-50 border-l-4 border-l-mustard-500'
                          : 'hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold flex-shrink-0 shadow-sm">
                            {conversation.participant.avatar ? (
                              <img
                                src={conversation.participant.avatar}
                                alt={conversation.participant.name}
                                className="w-full h-full rounded-xl object-cover"
                              />
                            ) : (
                              conversation.participant.name.charAt(0)
                            )}
                          </div>
                          {conversation.unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <p className={`font-semibold truncate ${conversation.unreadCount > 0 ? 'text-navy-900' : 'text-gray-700'}`}>
                              {conversation.participant.name}
                            </p>
                            {conversation.lastMessage && (
                              <span className="text-xs text-gray-400 flex-shrink-0">
                                {formatTime(conversation.lastMessage.createdAt)}
                              </span>
                            )}
                          </div>
                          {conversation.serviceRequest && (
                            <p className="text-xs text-mustard-600 truncate mb-1">
                              {conversation.serviceRequest.title}
                            </p>
                          )}
                          {conversation.lastMessage && (
                            <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                              {conversation.lastMessage.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold shadow-sm">
                        {selectedConversation.participant.avatar ? (
                          <img
                            src={selectedConversation.participant.avatar}
                            alt={selectedConversation.participant.name}
                            className="w-full h-full rounded-xl object-cover"
                          />
                        ) : (
                          selectedConversation.participant.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900">
                          {selectedConversation.participant.name}
                        </p>
                        {selectedConversation.serviceRequest && (
                          <p className="text-xs text-gray-500">
                            {selectedConversation.serviceRequest.title}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="rounded-xl text-gray-500 hover:text-mustard-600 hover:bg-mustard-50">
                        <Phone className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-xl text-gray-500 hover:text-mustard-600 hover:bg-mustard-50">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                    {loadingMessages ? (
                      <div className="flex items-center justify-center h-full">
                        <LoadingSpinner size="md" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                            <MessageSquare className="w-8 h-8 text-gray-400" />
                          </div>
                          <p className="text-gray-600 font-medium">Nenhuma mensagem ainda</p>
                          <p className="text-sm text-gray-500 mt-1">Inicie a conversa com o cliente!</p>
                        </div>
                      </div>
                    ) : (
                      messages.map((message) => {
                        const isOwn = message.senderId === currentUserId
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                                isOwn
                                  ? 'bg-navy-900 text-white rounded-br-md'
                                  : 'bg-white text-gray-900 rounded-bl-md shadow-sm border border-gray-100'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <div
                                className={`flex items-center gap-1.5 mt-1.5 ${
                                  isOwn ? 'justify-end' : 'justify-start'
                                }`}
                              >
                                <span
                                  className={`text-xs ${isOwn ? 'text-gray-400' : 'text-gray-400'}`}
                                >
                                  {formatTime(message.createdAt)}
                                </span>
                                {isOwn && (
                                  <CheckCheck
                                    className={`w-4 h-4 ${
                                      message.read ? 'text-blue-400' : 'text-gray-400'
                                    }`}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
                    <div className="flex items-center gap-3">
                      <Button type="button" variant="ghost" size="sm" className="rounded-xl text-gray-400 hover:text-mustard-600 hover:bg-mustard-50">
                        <Paperclip className="w-5 h-5" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Digite sua mensagem..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="pr-12 h-12 rounded-xl bg-gray-50 border-gray-200"
                          disabled={sending}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg text-gray-400 hover:text-mustard-600"
                        >
                          <Smile className="w-5 h-5" />
                        </Button>
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 h-12 w-12 rounded-xl"
                        disabled={!newMessage.trim() || sending}
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-mustard-100 flex items-center justify-center">
                      <MessageSquare className="w-10 h-10 text-mustard-600" />
                    </div>
                    <h3 className="font-semibold text-navy-900 text-lg mb-2">Selecione uma conversa</h3>
                    <p className="text-gray-500">
                      Escolha uma conversa ao lado para ver as mensagens
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden pb-20">
        {/* Mobile Header */}
        {showConversations && (
          <div className="bg-navy-900 -mx-4 -mt-4 px-4 pt-4 pb-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-mustard-500" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Mensagens</h1>
                <p className="text-sm text-gray-400">
                  {conversations.length} conversa(s)
                </p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-11 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Conversations List Mobile */}
        {showConversations && (
          <div className="space-y-2">
            {filteredConversations.length === 0 ? (
              <Card className="border-0 shadow-sm rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-medium text-gray-900 mb-1">
                    {searchTerm ? 'Nenhuma conversa encontrada' : 'Nenhuma conversa'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {searchTerm
                      ? 'Tente outro termo de busca'
                      : 'Suas conversas com clientes aparecerao aqui'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredConversations.map((conversation) => (
                <Card
                  key={conversation.id}
                  className="border-0 shadow-sm rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold shadow-sm">
                          {conversation.participant.avatar ? (
                            <img
                              src={conversation.participant.avatar}
                              alt={conversation.participant.name}
                              className="w-full h-full rounded-xl object-cover"
                            />
                          ) : (
                            conversation.participant.name.charAt(0)
                          )}
                        </div>
                        {conversation.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className={`font-semibold truncate ${conversation.unreadCount > 0 ? 'text-navy-900' : 'text-gray-700'}`}>
                            {conversation.participant.name}
                          </p>
                          {conversation.lastMessage && (
                            <span className="text-xs text-gray-400 flex-shrink-0">
                              {formatTime(conversation.lastMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        {conversation.serviceRequest && (
                          <p className="text-xs text-mustard-600 truncate mb-1">
                            {conversation.serviceRequest.title}
                          </p>
                        )}
                        {conversation.lastMessage && (
                          <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                            {conversation.lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Chat View Mobile */}
        {!showConversations && selectedConversation && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col">
            {/* Chat Header Mobile */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-xl -ml-2"
                onClick={() => setShowConversations(true)}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold shadow-sm">
                {selectedConversation.participant.avatar ? (
                  <img
                    src={selectedConversation.participant.avatar}
                    alt={selectedConversation.participant.name}
                    className="w-full h-full rounded-xl object-cover"
                  />
                ) : (
                  selectedConversation.participant.name.charAt(0)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy-900 truncate">
                  {selectedConversation.participant.name}
                </p>
                {selectedConversation.serviceRequest && (
                  <p className="text-xs text-gray-500 truncate">
                    {selectedConversation.serviceRequest.title}
                  </p>
                )}
              </div>
              <Button variant="ghost" size="sm" className="rounded-xl text-gray-500">
                <Phone className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages Mobile */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
              {loadingMessages ? (
                <div className="flex items-center justify-center h-full">
                  <LoadingSpinner size="md" />
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <MessageSquare className="w-7 h-7 text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-medium">Nenhuma mensagem</p>
                    <p className="text-sm text-gray-500 mt-1">Inicie a conversa!</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => {
                  const isOwn = message.senderId === currentUserId
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                          isOwn
                            ? 'bg-navy-900 text-white rounded-br-md'
                            : 'bg-white text-gray-900 rounded-bl-md shadow-sm border border-gray-100'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div
                          className={`flex items-center gap-1 mt-1 ${
                            isOwn ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <span
                            className={`text-xs ${isOwn ? 'text-gray-400' : 'text-gray-400'}`}
                          >
                            {formatTime(message.createdAt)}
                          </span>
                          {isOwn && (
                            <CheckCheck
                              className={`w-3.5 h-3.5 ${
                                message.read ? 'text-blue-400' : 'text-gray-400'
                              }`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Message Input Mobile */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white safe-area-pb">
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="sm" className="rounded-xl text-gray-400">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 h-11 rounded-xl bg-gray-50"
                  disabled={sending}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 h-11 w-11 rounded-xl"
                  disabled={!newMessage.trim() || sending}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        {showConversations && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 z-50">
            <div className="flex items-center justify-around">
              <Link
                href="/dashboard/profissional"
                className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400"
              >
                <Home className="w-5 h-5" />
                <span className="text-xs">Inicio</span>
              </Link>
              <Link
                href="/dashboard/profissional/oportunidades"
                className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400"
              >
                <Briefcase className="w-5 h-5" />
                <span className="text-xs">Oportunidades</span>
              </Link>
              <Link
                href="/dashboard/profissional/trabalhos"
                className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400"
              >
                <CheckCircle className="w-5 h-5" />
                <span className="text-xs">Trabalhos</span>
              </Link>
              <Link
                href="/dashboard/profissional/mensagens"
                className="flex flex-col items-center gap-1 py-2 px-3 text-mustard-600"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs font-medium">Mensagens</span>
              </Link>
              <Link
                href="/dashboard/profissional/perfil"
                className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400"
              >
                <User className="w-5 h-5" />
                <span className="text-xs">Perfil</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Card, CardContent } from '@/components/ui'
import { StatusBadge, LoadingSpinner, StarRating } from '@/components/shared'
import { getApiUrl } from '@/lib/api'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
  Image as ImageIcon,
  Phone,
  Mail,
  Home,
  FileText,
  Search,
  ChevronRight,
  Star,
  Shield,
  DollarSign,
  Wrench,
  AlertCircle,
  Play,
  Trophy,
  X,
} from 'lucide-react'

interface Quote {
  id: string
  price: number
  message: string
  estimatedDuration: string
  status: string
  createdAt: string
  professional: {
    id: string
    bio: string
    rating: number
    totalReviews: number
    user: {
      name: string
      avatar?: string
    }
  }
}

interface ServiceRequest {
  id: string
  title: string
  description: string
  status: string
  city: string
  state: string
  address?: string
  preferredDate?: string
  budget?: number
  createdAt: string
  category?: { name: string }
  quotes?: Quote[]
  attachments?: { url: string }[]
  professional?: {
    user: { name: string; phone?: string; email?: string }
  }
}

const statusTimeline = [
  { status: 'PENDING', label: 'Aguardando Orcamentos', icon: Clock, shortLabel: 'Aguardando' },
  { status: 'ACCEPTED', label: 'Orcamento Aceito', icon: CheckCircle, shortLabel: 'Aceito' },
  { status: 'IN_PROGRESS', label: 'Em Andamento', icon: Play, shortLabel: 'Andamento' },
  { status: 'COMPLETED', label: 'Concluido', icon: Trophy, shortLabel: 'Concluido' },
]

const statusConfig: Record<string, {
  gradient: string;
  bgColor: string;
  textColor: string;
  icon: any;
  label: string;
}> = {
  PENDING: {
    gradient: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    icon: Clock,
    label: 'Aguardando Orcamentos'
  },
  ACCEPTED: {
    gradient: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    icon: CheckCircle,
    label: 'Orcamento Aceito'
  },
  IN_PROGRESS: {
    gradient: 'from-purple-400 to-pink-500',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    icon: Play,
    label: 'Em Andamento'
  },
  COMPLETED: {
    gradient: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    icon: Trophy,
    label: 'Concluido'
  },
  CANCELLED: {
    gradient: 'from-red-400 to-rose-500',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    icon: XCircle,
    label: 'Cancelado'
  },
}

export default function PedidoDetalhesPage() {
  const params = useParams()
  const router = useRouter()
  const [request, setRequest] = useState<ServiceRequest | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequest()
  }, [params.id])

  const fetchRequest = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${getApiUrl('/api/service-requests')}/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setRequest(data.data)
      }
    } catch (error) {
      console.error('Error fetching request:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getStatusIndex = (status: string) => {
    const index = statusTimeline.findIndex((s) => s.status === status)
    return index === -1 ? 0 : index
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Carregando detalhes..." />
      </div>
    )
  }

  if (!request) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Pedido nao encontrado</p>
        <Button asChild>
          <Link href="/dashboard/cliente/pedidos">Voltar aos Pedidos</Link>
        </Button>
      </div>
    )
  }

  const currentStatusIndex = getStatusIndex(request.status)
  const currentStatus = statusConfig[request.status] || statusConfig.PENDING

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/cliente/pedidos">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl font-bold text-navy-900">{request.title}</h1>
            <div className="flex items-center gap-3 mt-1">
              <StatusBadge status={request.status} />
              {request.category && (
                <span className="text-sm text-gray-500">{request.category.name}</span>
              )}
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        {request.status !== 'CANCELLED' && (
          <Card>
            <CardContent className="p-4 lg:p-6">
              <h3 className="font-semibold text-navy-900 mb-4">Status do Pedido</h3>
              <div className="flex items-center justify-between">
                {statusTimeline.map((step, index) => (
                  <div key={step.status} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index <= currentStatusIndex
                            ? 'bg-mustard-500 text-navy-900'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {index < currentStatusIndex ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 text-center ${
                          index <= currentStatusIndex ? 'text-navy-900 font-medium' : 'text-gray-500'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {index < statusTimeline.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          index < currentStatusIndex ? 'bg-mustard-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardContent className="p-4 lg:p-6">
                <h3 className="font-semibold text-navy-900 mb-3">Descricao do Servico</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{request.description}</p>

                {/* Attachments */}
                {request.attachments && request.attachments.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-navy-900 mb-2">Fotos Anexadas</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {request.attachments.map((attachment, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={attachment.url}
                            alt={`Anexo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quotes */}
            {request.quotes && request.quotes.length > 0 && (
              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-navy-900">
                      Orcamentos Recebidos ({request.quotes.length})
                    </h3>
                    <Button size="sm" asChild>
                      <Link href={`/dashboard/cliente/pedidos/${request.id}/orcamentos`}>
                        Ver Todos
                      </Link>
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {request.quotes.slice(0, 3).map((quote) => (
                      <div
                        key={quote.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-mustard-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-mustard-500 flex items-center justify-center text-navy-900 font-semibold">
                              {quote.professional.user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-navy-900">
                                {quote.professional.user.name}
                              </p>
                              <StarRating
                                value={quote.professional.rating}
                                readonly
                                size="sm"
                                showValue
                                totalReviews={quote.professional.totalReviews}
                              />
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-mustard-600">
                              {formatCurrency(quote.price)}
                            </p>
                            <p className="text-xs text-gray-500">{quote.estimatedDuration}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{quote.message}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request Info */}
            <Card>
              <CardContent className="p-4 lg:p-6 space-y-4">
                <h3 className="font-semibold text-navy-900">Informacoes</h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Local</p>
                      <p className="text-navy-900">
                        {request.address || `${request.city}, ${request.state}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Data Solicitada</p>
                      <p className="text-navy-900">{formatDate(request.createdAt)}</p>
                    </div>
                  </div>

                  {request.budget && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Orcamento Estimado</p>
                        <p className="text-navy-900">{formatCurrency(request.budget)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Professional Info (if assigned) */}
            {request.professional && (
              <Card>
                <CardContent className="p-4 lg:p-6 space-y-4">
                  <h3 className="font-semibold text-navy-900">Profissional</h3>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-mustard-500 flex items-center justify-center text-navy-900 font-semibold text-lg">
                      {request.professional.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-navy-900">{request.professional.user.name}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {request.professional.user.phone && (
                      <a
                        href={`tel:${request.professional.user.phone}`}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-mustard-600"
                      >
                        <Phone className="w-4 h-4" />
                        {request.professional.user.phone}
                      </a>
                    )}
                  </div>

                  <Button className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900" asChild>
                    <Link href={`/dashboard/cliente/mensagens?pro=${request.professional.user.name}`}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardContent className="p-4 lg:p-6 space-y-3">
                {request.status === 'PENDING' && request.quotes && request.quotes.length > 0 && (
                  <Button className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900" asChild>
                    <Link href={`/dashboard/cliente/pedidos/${request.id}/orcamentos`}>
                      Ver Orcamentos ({request.quotes.length})
                    </Link>
                  </Button>
                )}

                {request.status === 'COMPLETED' && (
                  <Button className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                    Avaliar Servico
                  </Button>
                )}

                {request.status === 'PENDING' && (
                  <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                    Cancelar Pedido
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gray-50 pb-24">
        {/* Premium Mobile Header */}
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 h-56">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-b ${currentStatus.gradient.replace('from-', 'from-').replace('to-', 'via-')}/90 to-gray-50`} />
          </div>

          {/* Header Content */}
          <div className="relative px-4 pt-4 pb-6">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/dashboard/cliente/pedidos"
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center active:scale-95 transition-transform"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <h1 className="text-lg font-semibold text-white">Detalhes do Pedido</h1>
              <div className="w-10" />
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentStatus.gradient} flex items-center justify-center shadow-lg`}>
                  <currentStatus.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-navy-900 text-lg leading-tight line-clamp-2">
                    {request.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    {request.category && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {request.category.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className={`px-3 py-2 rounded-xl ${currentStatus.bgColor} flex items-center gap-2`}>
                <currentStatus.icon className={`w-4 h-4 ${currentStatus.textColor}`} />
                <span className={`text-sm font-medium ${currentStatus.textColor}`}>
                  {currentStatus.label}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
                <div className="w-8 h-8 bg-mustard-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <Calendar className="w-4 h-4 text-mustard-600" />
                </div>
                <p className="text-[10px] text-gray-500">Criado em</p>
                <p className="text-xs font-semibold text-navy-900">
                  {new Date(request.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                </p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
                <div className="w-8 h-8 bg-mustard-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <FileText className="w-4 h-4 text-mustard-600" />
                </div>
                <p className="text-[10px] text-gray-500">Orcamentos</p>
                <p className="text-xs font-semibold text-navy-900">
                  {request.quotes?.length || 0}
                </p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
                <div className="w-8 h-8 bg-mustard-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <MapPin className="w-4 h-4 text-mustard-600" />
                </div>
                <p className="text-[10px] text-gray-500">Local</p>
                <p className="text-xs font-semibold text-navy-900 truncate">
                  {request.city}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        {request.status !== 'CANCELLED' && (
          <div className="px-4 mb-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-semibold text-navy-900 text-sm mb-4">Progresso do Pedido</h3>
              <div className="flex items-center justify-between gap-1">
                {statusTimeline.map((step, index) => {
                  const StepIcon = step.icon
                  const isActive = index <= currentStatusIndex
                  const isCurrent = index === currentStatusIndex
                  return (
                    <div key={step.status} className="flex-1 flex flex-col items-center">
                      <div className="relative">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isActive
                              ? isCurrent
                                ? 'bg-gradient-to-br from-mustard-400 to-mustard-600 shadow-lg shadow-mustard-200'
                                : 'bg-mustard-500'
                              : 'bg-gray-200'
                          }`}
                        >
                          <StepIcon className={`w-5 h-5 ${isActive ? 'text-navy-900' : 'text-gray-400'}`} />
                        </div>
                        {isCurrent && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                        )}
                      </div>
                      <span className={`text-[10px] mt-2 text-center leading-tight ${
                        isActive ? 'text-navy-900 font-medium' : 'text-gray-400'
                      }`}>
                        {step.shortLabel}
                      </span>
                      {index < statusTimeline.length - 1 && (
                        <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${
                          index < currentStatusIndex ? 'bg-mustard-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="px-4 space-y-4">
          {/* Description Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-mustard-600" />
              <h3 className="font-semibold text-navy-900 text-sm">Descricao do Servico</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed">
                {request.description}
              </p>
            </div>

            {/* Attachments */}
            {request.attachments && request.attachments.length > 0 && (
              <div className="px-4 pb-4">
                <p className="text-xs font-medium text-gray-500 mb-2 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Fotos Anexadas ({request.attachments.length})
                </p>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {request.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200"
                    >
                      <img
                        src={attachment.url}
                        alt={`Anexo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-mustard-600" />
              <h3 className="font-semibold text-navy-900 text-sm">Informacoes</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-mustard-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Localizacao</p>
                  <p className="text-sm font-medium text-navy-900">
                    {request.address || `${request.city}, ${request.state}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-mustard-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Data do Pedido</p>
                  <p className="text-sm font-medium text-navy-900">{formatDate(request.createdAt)}</p>
                </div>
              </div>

              {request.budget && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Orcamento Estimado</p>
                    <p className="text-sm font-bold text-mustard-600">{formatCurrency(request.budget)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Professional Card (if assigned) */}
          {request.professional && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <User className="w-4 h-4 text-mustard-600" />
                <h3 className="font-semibold text-navy-900 text-sm">Profissional Responsavel</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold text-xl shadow-lg">
                    {request.professional.user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-900">{request.professional.user.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Shield className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Verificado</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {request.professional.user.phone && (
                    <a
                      href={`tel:${request.professional.user.phone}`}
                      className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl text-sm text-gray-700 active:scale-95 transition-transform"
                    >
                      <Phone className="w-4 h-4 text-mustard-600" />
                      Ligar
                    </a>
                  )}
                  <Link
                    href={`/dashboard/cliente/mensagens?pro=${request.professional.user.name}`}
                    className="flex items-center justify-center gap-2 p-3 bg-mustard-500 rounded-xl text-sm font-medium text-navy-900 active:scale-95 transition-transform"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Mensagem
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Quotes Preview */}
          {request.quotes && request.quotes.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-mustard-600" />
                  <h3 className="font-semibold text-navy-900 text-sm">
                    Orcamentos ({request.quotes.length})
                  </h3>
                </div>
                <Link
                  href={`/dashboard/cliente/pedidos/${request.id}/orcamentos`}
                  className="text-xs font-medium text-mustard-600 flex items-center gap-1"
                >
                  Ver todos
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="p-4 space-y-3">
                {request.quotes.slice(0, 2).map((quote, index) => (
                  <Link
                    key={quote.id}
                    href={`/dashboard/cliente/pedidos/${request.id}/orcamentos`}
                    className={`block p-3 rounded-xl border transition-all active:scale-[0.98] ${
                      index === 0
                        ? 'border-mustard-300 bg-mustard-50/50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    {index === 0 && (
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-3 h-3 text-mustard-500 fill-mustard-500" />
                        <span className="text-[10px] font-medium text-mustard-700">Melhor Avaliado</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-semibold text-sm">
                        {quote.professional.user.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-navy-900 text-sm truncate">
                          {quote.professional.user.name}
                        </p>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-mustard-500 fill-mustard-500" />
                          <span className="text-xs text-gray-600">
                            {quote.professional.rating.toFixed(1)} ({quote.professional.totalReviews})
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-mustard-600">
                          {formatCurrency(quote.price)}
                        </p>
                        <p className="text-[10px] text-gray-500">{quote.estimatedDuration}</p>
                      </div>
                    </div>
                  </Link>
                ))}

                {request.quotes.length > 2 && (
                  <Link
                    href={`/dashboard/cliente/pedidos/${request.id}/orcamentos`}
                    className="block w-full py-3 text-center text-sm font-medium text-mustard-600 bg-mustard-50 rounded-xl active:scale-[0.98] transition-transform"
                  >
                    Ver mais {request.quotes.length - 2} orcamento(s)
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pb-4">
            {request.status === 'PENDING' && request.quotes && request.quotes.length > 0 && (
              <Link
                href={`/dashboard/cliente/pedidos/${request.id}/orcamentos`}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-mustard-400 to-mustard-600 text-navy-900 font-semibold rounded-2xl shadow-lg shadow-mustard-200 active:scale-[0.98] transition-transform"
              >
                <FileText className="w-5 h-5" />
                Ver Orcamentos ({request.quotes.length})
              </Link>
            )}

            {request.status === 'COMPLETED' && (
              <button className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-mustard-400 to-mustard-600 text-navy-900 font-semibold rounded-2xl shadow-lg shadow-mustard-200 active:scale-[0.98] transition-transform">
                <Star className="w-5 h-5" />
                Avaliar Servico
              </button>
            )}

            {request.status === 'PENDING' && (
              <button className="flex items-center justify-center gap-2 w-full py-3 border-2 border-red-200 text-red-600 font-medium rounded-2xl bg-red-50 active:scale-[0.98] transition-transform">
                <X className="w-4 h-4" />
                Cancelar Pedido
              </button>
            )}
          </div>
        </div>

        {/* Premium Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-around">
            <Link href="/dashboard/cliente" className="flex flex-col items-center gap-0.5 py-2 px-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400">Inicio</span>
            </Link>
            <Link href="/dashboard/cliente/pedidos" className="flex flex-col items-center gap-0.5 py-2 px-3">
              <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-mustard-600" />
              </div>
              <span className="text-[10px] font-medium text-mustard-600">Pedidos</span>
            </Link>
            <Link href="/explorar" className="flex flex-col items-center gap-0.5 py-2 px-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400">Explorar</span>
            </Link>
            <Link href="/dashboard/cliente/mensagens" className="flex flex-col items-center gap-0.5 py-2 px-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400">Mensagens</span>
            </Link>
            <Link href="/dashboard/cliente/perfil" className="flex flex-col items-center gap-0.5 py-2 px-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400">Perfil</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

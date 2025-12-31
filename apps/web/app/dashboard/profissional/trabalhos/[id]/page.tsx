'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Card, CardContent, Textarea } from '@/components/ui'
import { LoadingSpinner } from '@/components/shared'
import {
import { getApiUrl } from '@/lib/api'
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle,
  Play,
  AlertCircle,
  Home,
  Briefcase,
  TrendingUp,
  XCircle,
  FileText,
  Camera,
  Star,
  Shield,
} from 'lucide-react'

interface ServiceRequest {
  id: string
  title: string
  description: string
  status: string
  city: string
  state: string
  address?: string
  preferredDate?: string
  createdAt: string
  category?: { name: string }
  attachments?: { url: string }[]
  client?: {
    user: { name: string; avatar?: string; phone?: string; email?: string }
  }
  quote?: {
    id: string
    price: number
    message: string
    estimatedDuration: string
    status: string
  }
}

const statusTimeline = [
  { status: 'ACCEPTED', label: 'Orcamento Aceito', icon: CheckCircle },
  { status: 'IN_PROGRESS', label: 'Em Andamento', icon: TrendingUp },
  { status: 'COMPLETED', label: 'Concluido', icon: Star },
]

const getStatusConfig = (status: string) => {
  const configs: Record<string, { bg: string; text: string; icon: any; label: string }> = {
    'ACCEPTED': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle, label: 'Aceito' },
    'IN_PROGRESS': { bg: 'bg-blue-100', text: 'text-blue-700', icon: TrendingUp, label: 'Em andamento' },
    'COMPLETED': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle, label: 'Concluido' },
    'PENDING': { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock, label: 'Aguardando' },
    'CANCELLED': { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Cancelado' },
  }
  return configs[status] || configs['PENDING']
}

export default function TrabalhoDetalhesPage() {
  const params = useParams()
  const router = useRouter()
  const [job, setJob] = useState<ServiceRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false)
  const [completionNote, setCompletionNote] = useState('')

  useEffect(() => {
    fetchJob()
  }, [params.id])

  const fetchJob = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(getApiUrl('/api/service-requests/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setJob(data.data)
      }
    } catch (error) {
      console.error('Error fetching job:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartWork = async () => {
    setUpdating(true)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(getApiUrl('/api/service-requests/${params.id}/start`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setJob({ ...job!, status: 'IN_PROGRESS' })
      }
    } catch (error) {
      console.error('Error starting work:', error)
    } finally {
      setUpdating(false)
    }
  }

  const handleCompleteWork = async () => {
    setUpdating(true)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(getApiUrl('/api/service-requests/${params.id}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ note: completionNote }),
      })

      const data = await response.json()
      if (data.success) {
        setJob({ ...job!, status: 'COMPLETED' })
        setShowCompleteModal(false)
      }
    } catch (error) {
      console.error('Error completing work:', error)
    } finally {
      setUpdating(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
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

  if (!job) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-600 mb-4">Trabalho nao encontrado</p>
        <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
          <Link href="/dashboard/profissional/trabalhos">Voltar</Link>
        </Button>
      </div>
    )
  }

  const currentStatusIndex = getStatusIndex(job.status)
  const statusConfig = getStatusConfig(job.status)
  const StatusIcon = statusConfig.icon

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-6">
        {/* Hero Header */}
        <div className="relative bg-navy-900 rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600"
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900/80" />
          </div>

          <div className="relative p-8">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mb-4 text-gray-300 hover:text-white hover:bg-white/10"
            >
              <Link href="/dashboard/profissional/trabalhos">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar aos trabalhos
              </Link>
            </Button>

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                    <StatusIcon className="w-4 h-4" />
                    {statusConfig.label}
                  </span>
                  {job.category && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-gray-300">
                      {job.category.name}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
                <div className="flex items-center gap-4 text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {job.city}, {job.state}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(job.createdAt)}
                  </span>
                </div>
              </div>

              {job.quote && (
                <div className="text-right">
                  <p className="text-sm text-gray-400">Valor acordado</p>
                  <p className="text-3xl font-bold text-mustard-500">
                    {formatCurrency(job.quote.price)}
                  </p>
                  <p className="text-sm text-gray-400 flex items-center gap-1 justify-end">
                    <Clock className="w-4 h-4" />
                    {job.quote.estimatedDuration}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        {job.status !== 'CANCELLED' && (
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <h3 className="font-semibold text-navy-900 mb-6">Progresso do Trabalho</h3>
              <div className="flex items-center justify-between">
                {statusTimeline.map((step, index) => {
                  const StepIcon = step.icon
                  const isCompleted = index < currentStatusIndex
                  const isCurrent = index === currentStatusIndex
                  return (
                    <div key={step.status} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            isCompleted || isCurrent
                              ? 'bg-mustard-500 text-navy-900 shadow-lg shadow-mustard-500/20'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <StepIcon className="w-6 h-6" />
                        </div>
                        <span
                          className={`text-sm mt-3 text-center font-medium ${
                            isCompleted || isCurrent ? 'text-navy-900' : 'text-gray-400'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < statusTimeline.length - 1 && (
                        <div
                          className={`flex-1 h-1 mx-4 rounded-full ${
                            index < currentStatusIndex ? 'bg-mustard-500' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-mustard-600" />
                  </div>
                  <h3 className="font-semibold text-navy-900 text-lg">Descricao do Servico</h3>
                </div>
                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{job.description}</p>

                {/* Attachments */}
                {job.attachments && job.attachments.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center gap-2 mb-4">
                      <Camera className="w-5 h-5 text-gray-400" />
                      <h4 className="font-medium text-navy-900">Fotos do cliente</h4>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      {job.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity cursor-pointer"
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
              </CardContent>
            </Card>

            {/* Quote Details */}
            {job.quote && (
              <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-mustard-100 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-mustard-600" />
                    </div>
                    <h3 className="font-semibold text-navy-900 text-lg">Detalhes do Orcamento</h3>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-5 bg-gradient-to-br from-mustard-50 to-mustard-100/50 rounded-xl border border-mustard-200/50">
                      <p className="text-sm text-gray-600 mb-1">Valor Acordado</p>
                      <p className="text-2xl font-bold text-mustard-600">
                        {formatCurrency(job.quote.price)}
                      </p>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-200/50">
                      <p className="text-sm text-gray-600 mb-1">Prazo Estimado</p>
                      <p className="text-xl font-semibold text-navy-900 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        {job.quote.estimatedDuration}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-2">Sua proposta:</p>
                    <p className="text-gray-700 leading-relaxed">{job.quote.message}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            {job.client && (
              <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-mustard-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-mustard-600" />
                    </div>
                    <h3 className="font-semibold text-navy-900 text-lg">Cliente</h3>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold text-xl shadow-lg">
                      {job.client.user.avatar ? (
                        <img
                          src={job.client.user.avatar}
                          alt={job.client.user.name}
                          className="w-full h-full rounded-xl object-cover"
                        />
                      ) : (
                        job.client.user.name.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900 text-lg">{job.client.user.name}</p>
                      <p className="text-sm text-gray-500">Cliente</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {job.client.user.phone && (
                      <a
                        href={`tel:${job.client.user.phone}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-mustard-100 flex items-center justify-center group-hover:bg-mustard-200 transition-colors">
                          <Phone className="w-4 h-4 text-mustard-600" />
                        </div>
                        <span className="text-gray-700">{job.client.user.phone}</span>
                      </a>
                    )}
                    {job.client.user.email && (
                      <a
                        href={`mailto:${job.client.user.email}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-mustard-100 flex items-center justify-center group-hover:bg-mustard-200 transition-colors">
                          <Mail className="w-4 h-4 text-mustard-600" />
                        </div>
                        <span className="text-gray-700 truncate">{job.client.user.email}</span>
                      </a>
                    )}
                  </div>

                  <Button
                    className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-12 rounded-xl"
                    asChild
                  >
                    <Link href={`/dashboard/profissional/mensagens?client=${job.client.user.name}`}>
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Enviar Mensagem
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Location Info */}
            <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-mustard-600" />
                  </div>
                  <h3 className="font-semibold text-navy-900 text-lg">Local do Servico</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Endereco</p>
                    <p className="font-medium text-navy-900">
                      {job.address || `${job.city}, ${job.state}`}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500 mb-1">Data da solicitacao</p>
                    <p className="font-medium text-navy-900">{formatDate(job.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-mustard-600" />
                  </div>
                  <h3 className="font-semibold text-navy-900 text-lg">Acoes</h3>
                </div>

                {job.status === 'ACCEPTED' && (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl"
                    onClick={handleStartWork}
                    disabled={updating}
                  >
                    {updating ? (
                      'Iniciando...'
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        Iniciar Trabalho
                      </>
                    )}
                  </Button>
                )}

                {job.status === 'IN_PROGRESS' && (
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-12 rounded-xl"
                    onClick={() => setShowCompleteModal(true)}
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Marcar como Concluido
                  </Button>
                )}

                {job.status === 'COMPLETED' && (
                  <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200/50">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-emerald-800 text-lg">Trabalho Concluido!</p>
                    <p className="text-sm text-emerald-600 mt-1">
                      Aguarde a avaliacao do cliente
                    </p>
                  </div>
                )}

                {job.status === 'CANCELLED' && (
                  <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl border border-red-200/50">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-red-500 flex items-center justify-center">
                      <XCircle className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-red-800 text-lg">Trabalho Cancelado</p>
                    <p className="text-sm text-red-600 mt-1">
                      Este trabalho foi cancelado
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden pb-24">
        {/* Mobile Header */}
        <div className="bg-navy-900 -mx-4 -mt-4 px-4 pt-4 pb-6 mb-6">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-4 text-gray-300 hover:text-white hover:bg-white/10 -ml-2"
          >
            <Link href="/dashboard/profissional/trabalhos">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </Button>

          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              {statusConfig.label}
            </span>
            {job.category && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300">
                {job.category.name}
              </span>
            )}
          </div>

          <h1 className="text-xl font-bold text-white mb-3">{job.title}</h1>

          <div className="flex items-center gap-3 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.city}, {job.state}
            </span>
          </div>

          {job.quote && (
            <div className="mt-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Valor acordado</p>
                  <p className="text-2xl font-bold text-mustard-500">
                    {formatCurrency(job.quote.price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Prazo</p>
                  <p className="text-sm font-medium text-white">{job.quote.estimatedDuration}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Status Timeline */}
        {job.status !== 'CANCELLED' && (
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden mb-4">
            <CardContent className="p-4">
              <h3 className="font-semibold text-navy-900 mb-4 text-sm">Progresso</h3>
              <div className="flex items-center justify-between">
                {statusTimeline.map((step, index) => {
                  const StepIcon = step.icon
                  const isCompleted = index < currentStatusIndex
                  const isCurrent = index === currentStatusIndex
                  return (
                    <div key={step.status} className="flex items-center flex-1">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isCompleted || isCurrent
                              ? 'bg-mustard-500 text-navy-900'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <span
                          className={`text-xs mt-2 text-center ${
                            isCompleted || isCurrent ? 'text-navy-900 font-medium' : 'text-gray-400'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {index < statusTimeline.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-2 rounded-full ${
                            index < currentStatusIndex ? 'bg-mustard-500' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile Client Card */}
        {job.client && (
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold text-lg shadow-lg">
                  {job.client.user.avatar ? (
                    <img
                      src={job.client.user.avatar}
                      alt={job.client.user.name}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    job.client.user.name.charAt(0)
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-navy-900">{job.client.user.name}</p>
                  <p className="text-sm text-gray-500">Cliente</p>
                </div>
                <Button
                  size="sm"
                  className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl"
                  asChild
                >
                  <Link href={`/dashboard/profissional/mensagens?client=${job.client.user.name}`}>
                    <MessageSquare className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {(job.client.user.phone || job.client.user.email) && (
                <div className="flex gap-2 mt-3 pt-3 border-t">
                  {job.client.user.phone && (
                    <a
                      href={`tel:${job.client.user.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-gray-50 rounded-xl text-sm text-gray-700"
                    >
                      <Phone className="w-4 h-4 text-mustard-600" />
                      Ligar
                    </a>
                  )}
                  {job.client.user.email && (
                    <a
                      href={`mailto:${job.client.user.email}`}
                      className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-gray-50 rounded-xl text-sm text-gray-700"
                    >
                      <Mail className="w-4 h-4 text-mustard-600" />
                      Email
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Mobile Description */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-mustard-100 flex items-center justify-center">
                <FileText className="w-4 h-4 text-mustard-600" />
              </div>
              <h3 className="font-semibold text-navy-900">Descricao</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>

            {job.attachments && job.attachments.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Camera className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-navy-900">Fotos</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {job.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden bg-gray-100"
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
          </CardContent>
        </Card>

        {/* Mobile Quote Details */}
        {job.quote && (
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-mustard-100 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-mustard-600" />
                </div>
                <h3 className="font-semibold text-navy-900">Seu Orcamento</h3>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 leading-relaxed">{job.quote.message}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mobile Location */}
        <Card className="border-0 shadow-sm rounded-2xl overflow-hidden mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-mustard-100 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-mustard-600" />
              </div>
              <h3 className="font-semibold text-navy-900">Local</h3>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">{job.address || `${job.city}, ${job.state}`}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Solicitado em {formatDate(job.createdAt)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Completed/Cancelled Status */}
        {job.status === 'COMPLETED' && (
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden mb-4">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <p className="font-semibold text-emerald-800">Trabalho Concluido!</p>
              <p className="text-sm text-emerald-600 mt-1">Aguarde a avaliacao do cliente</p>
            </CardContent>
          </Card>
        )}

        {job.status === 'CANCELLED' && (
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden mb-4">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-red-500 flex items-center justify-center">
                <XCircle className="w-7 h-7 text-white" />
              </div>
              <p className="font-semibold text-red-800">Trabalho Cancelado</p>
              <p className="text-sm text-red-600 mt-1">Este trabalho foi cancelado</p>
            </CardContent>
          </Card>
        )}

        {/* Mobile Fixed Bottom Action */}
        {(job.status === 'ACCEPTED' || job.status === 'IN_PROGRESS') && (
          <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40">
            {job.status === 'ACCEPTED' && (
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 rounded-xl"
                onClick={handleStartWork}
                disabled={updating}
              >
                {updating ? (
                  'Iniciando...'
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Iniciar Trabalho
                  </>
                )}
              </Button>
            )}

            {job.status === 'IN_PROGRESS' && (
              <Button
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-12 rounded-xl"
                onClick={() => setShowCompleteModal(true)}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Marcar como Concluido
              </Button>
            )}
          </div>
        )}

        {/* Mobile Bottom Navigation */}
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
              className="flex flex-col items-center gap-1 py-2 px-3 text-mustard-600"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="text-xs font-medium">Trabalhos</span>
            </Link>
            <Link
              href="/dashboard/profissional/mensagens"
              className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Mensagens</span>
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
      </div>

      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border-0 shadow-2xl rounded-2xl">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-900">Confirmar Conclusao</h3>
                <p className="text-gray-600 mt-2">
                  Ao marcar como concluido, o cliente sera notificado e podera avaliar seu trabalho.
                </p>
              </div>
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Observacoes (opcional)
                </label>
                <Textarea
                  value={completionNote}
                  onChange={(e) => setCompletionNote(e.target.value)}
                  placeholder="Adicione observacoes sobre o trabalho realizado..."
                  rows={3}
                  className="rounded-xl"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCompleteModal(false)}
                  className="flex-1 h-12 rounded-xl"
                  disabled={updating}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleCompleteWork}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl font-semibold"
                  disabled={updating}
                >
                  {updating ? 'Concluindo...' : 'Confirmar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

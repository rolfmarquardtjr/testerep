'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button, Card, CardContent, Input, Label, Textarea } from '@/components/ui'
import { LoadingSpinner } from '@/components/shared'
import { getApiUrl } from '@/lib/api'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  User,
  Image as ImageIcon,
  Send,
  CheckCircle,
  AlertCircle,
  Target,
  Home as HomeIcon,
  Briefcase,
  MessageSquare,
  ChevronRight,
  Phone,
  Mail,
  Shield,
  Star,
  FileText,
  Zap,
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
  budget?: number
  createdAt: string
  category?: { name: string }
  attachments?: { url: string }[]
  client?: {
    user: { name: string; avatar?: string }
  }
  hasQuoted?: boolean
  myQuote?: {
    id: string
    price: number
    message: string
    status: string
  }
}

export default function OportunidadeDetalhesPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [request, setRequest] = useState<ServiceRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [quoteData, setQuoteData] = useState({
    price: '',
    message: '',
    estimatedDuration: '',
    validDays: '7',
  })

  useEffect(() => {
    fetchRequest()
    if (searchParams.get('enviar') === 'true') {
      setShowQuoteForm(true)
    }
  }, [params.id, searchParams])

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

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const token = localStorage.getItem('accessToken')

      const validUntil = new Date()
      validUntil.setDate(validUntil.getDate() + parseInt(quoteData.validDays))

      const response = await fetch(getApiUrl('/api/quotes'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceRequestId: params.id,
          price: parseFloat(quoteData.price),
          message: quoteData.message,
          estimatedDuration: quoteData.estimatedDuration,
          validUntil: validUntil.toISOString(),
        }),
      })

      const data = await response.json()
      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard/profissional/oportunidades')
        }, 2000)
      } else {
        setError(data.message || 'Erro ao enviar orcamento')
      }
    } catch (error) {
      console.error('Error submitting quote:', error)
      setError('Erro ao enviar orcamento. Tente novamente.')
    } finally {
      setSubmitting(false)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Carregando detalhes..." />
      </div>
    )
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-lg font-semibold text-navy-900 mb-2">Oportunidade nao encontrada</h2>
          <p className="text-gray-500 mb-6">Esta oportunidade pode ter sido removida ou nao existe mais.</p>
          <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
            <Link href="/dashboard/profissional/oportunidades">Voltar as Oportunidades</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-navy-900 mb-2">Orcamento Enviado!</h2>
          <p className="text-gray-600 mb-6">
            Seu orcamento foi enviado com sucesso. Aguarde a resposta do cliente.
          </p>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/dashboard/profissional/oportunidades">Ver Mais Oportunidades</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ==================== DESKTOP LAYOUT ==================== */}
      <div className="hidden lg:block">
        <div className="max-w-6xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <Link
              href="/dashboard/profissional/oportunidades"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-navy-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar as Oportunidades
            </Link>

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-mustard-100 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-mustard-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-navy-900">{request.title}</h1>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {request.city}, {request.state}
                    </span>
                    {request.category && (
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                        {request.category.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {request.budget && (
                <div className="text-right bg-mustard-50 px-6 py-4 rounded-2xl">
                  <p className="text-xs text-gray-500 mb-1">Orcamento estimado</p>
                  <p className="text-2xl font-bold text-mustard-600">
                    {formatCurrency(request.budget)}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-mustard-600" />
                    Descricao do Servico
                  </h3>
                  <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{request.description}</p>
                </div>

                {request.attachments && request.attachments.length > 0 && (
                  <div className="border-t border-gray-100 p-6">
                    <h4 className="text-sm font-semibold text-navy-900 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-mustard-600" />
                      Fotos Anexadas
                    </h4>
                    <div className="grid grid-cols-4 gap-3">
                      {request.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-xl overflow-hidden bg-gray-100 hover:ring-2 hover:ring-mustard-500 transition-all cursor-pointer"
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

              {showQuoteForm && !request.hasQuoted && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-navy-600 to-navy-700 p-6">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Enviar Orcamento
                    </h3>
                    <p className="text-sm text-gray-300 mt-1">
                      Preencha os detalhes da sua proposta
                    </p>
                  </div>

                  <div className="p-6">
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmitQuote} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="price">Valor do Servico (R$) *</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              min="0"
                              value={quoteData.price}
                              onChange={(e) => setQuoteData({ ...quoteData, price: e.target.value })}
                              className="pl-10 h-12"
                              placeholder="0,00"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="estimatedDuration">Prazo Estimado *</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="estimatedDuration"
                              value={quoteData.estimatedDuration}
                              onChange={(e) =>
                                setQuoteData({ ...quoteData, estimatedDuration: e.target.value })
                              }
                              className="pl-10 h-12"
                              placeholder="Ex: 2-3 dias"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="validDays">Validade do Orcamento</Label>
                        <select
                          id="validDays"
                          value={quoteData.validDays}
                          onChange={(e) => setQuoteData({ ...quoteData, validDays: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mustard-500"
                        >
                          <option value="3">3 dias</option>
                          <option value="7">7 dias</option>
                          <option value="15">15 dias</option>
                          <option value="30">30 dias</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Mensagem ao Cliente *</Label>
                        <Textarea
                          id="message"
                          value={quoteData.message}
                          onChange={(e) => setQuoteData({ ...quoteData, message: e.target.value })}
                          placeholder="Descreva sua proposta, experiencia relevante e diferenciais..."
                          rows={5}
                          className="resize-none"
                          required
                        />
                      </div>

                      <div className="flex gap-4 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowQuoteForm(false)}
                          className="flex-1 h-12"
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                          disabled={submitting}
                        >
                          {submitting ? (
                            'Enviando...'
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Enviar Orcamento
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {request.myQuote && (
                <div className="bg-emerald-50 rounded-2xl border border-emerald-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-emerald-800">Seu Orcamento</h3>
                        <p className="text-sm text-emerald-600">
                          {request.myQuote.status === 'PENDING'
                            ? 'Aguardando resposta do cliente'
                            : request.myQuote.status === 'ACCEPTED'
                            ? 'Aceito pelo cliente!'
                            : 'Recusado pelo cliente'}
                        </p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">Valor proposto</p>
                        <p className="text-2xl font-bold text-emerald-700">
                          {formatCurrency(request.myQuote.price)}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <p className="text-lg font-semibold text-emerald-700">
                          {request.myQuote.status === 'PENDING'
                            ? 'Aguardando'
                            : request.myQuote.status === 'ACCEPTED'
                            ? 'Aceito'
                            : 'Recusado'}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-2">Sua proposta:</p>
                      <p className="text-gray-700">{request.myQuote.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 space-y-5">
                  <h3 className="font-semibold text-navy-900">Informacoes</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-mustard-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Local</p>
                        <p className="text-navy-900 font-medium">
                          {request.address || `${request.city}, ${request.state}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-mustard-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Publicado em</p>
                        <p className="text-navy-900 font-medium">{formatDate(request.createdAt)}</p>
                      </div>
                    </div>

                    {request.preferredDate && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-mustard-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Data Desejada</p>
                          <p className="text-navy-900 font-medium">{formatDate(request.preferredDate)}</p>
                        </div>
                      </div>
                    )}

                    {request.budget && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <DollarSign className="w-5 h-5 text-mustard-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Orcamento do Cliente</p>
                          <p className="text-navy-900 font-semibold">
                            {formatCurrency(request.budget)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {request.client && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 space-y-4">
                    <h3 className="font-semibold text-navy-900">Cliente</h3>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-mustard-500 flex items-center justify-center text-navy-900 font-bold text-xl overflow-hidden">
                        {request.client.user.avatar ? (
                          <img
                            src={request.client.user.avatar}
                            alt={request.client.user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          request.client.user.name.charAt(0)
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900">{request.client.user.name}</p>
                        <p className="text-sm text-gray-500">Cliente na Repfy</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!request.hasQuoted && !showQuoteForm && (
                <Button
                  className="w-full h-14 bg-mustard-500 hover:bg-mustard-600 text-navy-900 text-base font-semibold rounded-2xl"
                  onClick={() => setShowQuoteForm(true)}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Orcamento
                </Button>
              )}

              <div className="bg-navy-600 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-mustard-400" />
                  <span className="font-semibold text-white">Dica</span>
                </div>
                <p className="text-sm text-gray-300">
                  Personalize sua proposta! Clientes preferem orcamentos detalhados que mostram que voce entendeu a necessidade deles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT ==================== */}
      <div className="lg:hidden pb-24">
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="px-4 py-3 flex items-center gap-3">
            <Link
              href="/dashboard/profissional/oportunidades"
              className="p-2 -ml-2 hover:bg-gray-100 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-navy-900 truncate">{request.title}</h1>
              <p className="text-xs text-gray-500">{request.category?.name}</p>
            </div>
          </div>
        </header>

        <div className="px-4 py-4 space-y-4">
          {request.budget && (
            <div className="bg-mustard-50 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Orcamento estimado</p>
                <p className="text-2xl font-bold text-mustard-600">{formatCurrency(request.budget)}</p>
              </div>
              <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-navy-900" />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
              <MapPin className="w-4 h-4" />
              {request.city}, {request.state}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700">
              <Calendar className="w-4 h-4" />
              {formatDate(request.createdAt)}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <h3 className="font-semibold text-navy-900 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-mustard-600" />
              Descricao
            </h3>
            <p className="text-gray-600 text-sm whitespace-pre-wrap">{request.description}</p>
          </div>

          {request.attachments && request.attachments.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="font-semibold text-navy-900 mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-mustard-600" />
                Fotos ({request.attachments.length})
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {request.attachments.map((attachment, index) => (
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

          {request.client && (
            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="font-semibold text-navy-900 mb-3">Cliente</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-mustard-500 flex items-center justify-center text-navy-900 font-bold">
                  {request.client.user.avatar ? (
                    <img
                      src={request.client.user.avatar}
                      alt={request.client.user.name}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  ) : (
                    request.client.user.name.charAt(0)
                  )}
                </div>
                <div>
                  <p className="font-semibold text-navy-900">{request.client.user.name}</p>
                  <p className="text-xs text-gray-500">Cliente na Repfy</p>
                </div>
              </div>
            </div>
          )}

          {request.myQuote && (
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-emerald-800">Seu Orcamento</h3>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-500">Valor</p>
                  <p className="text-lg font-bold text-emerald-700">
                    {formatCurrency(request.myQuote.price)}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-gray-500">Status</p>
                  <p className="text-lg font-semibold text-emerald-700">
                    {request.myQuote.status === 'PENDING' ? 'Aguardando' : request.myQuote.status === 'ACCEPTED' ? 'Aceito' : 'Recusado'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-emerald-700">{request.myQuote.message}</p>
            </div>
          )}

          {showQuoteForm && !request.hasQuoted && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="bg-navy-600 p-4">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Enviar Orcamento
                </h3>
              </div>

              <form onSubmit={handleSubmitQuote} className="p-4 space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm">Valor (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={quoteData.price}
                      onChange={(e) => setQuoteData({ ...quoteData, price: e.target.value })}
                      className="h-11"
                      placeholder="0,00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estimatedDuration" className="text-sm">Prazo *</Label>
                    <Input
                      id="estimatedDuration"
                      value={quoteData.estimatedDuration}
                      onChange={(e) =>
                        setQuoteData({ ...quoteData, estimatedDuration: e.target.value })
                      }
                      className="h-11"
                      placeholder="Ex: 2 dias"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validDays" className="text-sm">Validade</Label>
                  <select
                    id="validDays"
                    value={quoteData.validDays}
                    onChange={(e) => setQuoteData({ ...quoteData, validDays: e.target.value })}
                    className="w-full h-11 px-3 rounded-xl border border-gray-300 text-sm"
                  >
                    <option value="3">3 dias</option>
                    <option value="7">7 dias</option>
                    <option value="15">15 dias</option>
                    <option value="30">30 dias</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm">Mensagem *</Label>
                  <Textarea
                    id="message"
                    value={quoteData.message}
                    onChange={(e) => setQuoteData({ ...quoteData, message: e.target.value })}
                    placeholder="Descreva sua proposta..."
                    rows={4}
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowQuoteForm(false)}
                    className="flex-1 h-11"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-11 bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                    disabled={submitting}
                  >
                    {submitting ? 'Enviando...' : 'Enviar'}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>

        {!request.hasQuoted && !showQuoteForm && (
          <div className="fixed bottom-20 left-0 right-0 p-4 bg-white border-t border-gray-100">
            <Button
              className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold rounded-xl"
              onClick={() => setShowQuoteForm(true)}
            >
              <Send className="w-5 h-5 mr-2" />
              Enviar Orcamento
            </Button>
          </div>
        )}

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
          <div className="flex items-center justify-around">
            <Link href="/dashboard/profissional" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400">
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs">Inicio</span>
            </Link>
            <Link href="/dashboard/profissional/oportunidades" className="flex flex-col items-center gap-1 py-2 px-3 text-mustard-600">
              <Target className="w-6 h-6" />
              <span className="text-xs font-medium">Oportunidades</span>
            </Link>
            <Link href="/dashboard/profissional/trabalhos" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400">
              <Briefcase className="w-6 h-6" />
              <span className="text-xs">Trabalhos</span>
            </Link>
            <Link href="/dashboard/profissional/mensagens" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs">Mensagens</span>
            </Link>
            <Link href="/dashboard/profissional/perfil" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400">
              <User className="w-6 h-6" />
              <span className="text-xs">Perfil</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

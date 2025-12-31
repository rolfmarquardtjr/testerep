'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button, Card, CardContent } from '@/components/ui'
import { StatusBadge, LoadingSpinner, StarRating } from '@/components/shared'
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  MessageSquare,
  Shield,
  Award,
  Home,
  FileText,
  Search,
  User,
  Star,
  Briefcase,
  ChevronRight,
  Zap,
  Trophy,
  CheckCircle,
} from 'lucide-react'

interface Quote {
  id: string
  price: number
  message: string
  estimatedDuration: string
  status: string
  validUntil: string
  createdAt: string
  professional: {
    id: string
    bio: string
    rating: number
    totalReviews: number
    completedJobs: number
    verified: boolean
    responseTime: number
    user: {
      id: string
      name: string
      avatar?: string
    }
  }
}

export default function OrcamentosPage() {
  const params = useParams()
  const router = useRouter()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState<string | null>(null)

  useEffect(() => {
    fetchQuotes()
  }, [params.id])

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`http://localhost:3001/api/quotes/request/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setQuotes(data.data.quotes || [])
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptQuote = async (quoteId: string) => {
    setAccepting(quoteId)
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`http://localhost:3001/api/quotes/${quoteId}/accept`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        router.push(`/dashboard/cliente/pedidos/${params.id}`)
      }
    } catch (error) {
      console.error('Error accepting quote:', error)
    } finally {
      setAccepting(null)
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
      month: 'short',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Carregando orcamentos..." />
      </div>
    )
  }

  const sortedQuotes = [...quotes].sort((a, b) => b.professional.rating - a.professional.rating)

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/dashboard/cliente/pedidos/${params.id}`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-navy-900">Orcamentos Recebidos</h1>
            <p className="text-gray-600 mt-1">{quotes.length} profissional(is) interessado(s)</p>
          </div>
        </div>

        {/* Tips */}
        <Card className="bg-mustard-50 border-mustard-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-mustard-600 mt-0.5" />
              <div>
                <p className="font-medium text-navy-900">Dica para escolher</p>
                <p className="text-sm text-gray-700">
                  Compare nao apenas o preco, mas tambem a avaliacao, tempo de resposta e numero de
                  trabalhos concluidos do profissional.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        {quotes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-navy-900 mb-2">Aguardando orcamentos</h3>
              <p className="text-gray-600">
                Os profissionais estao analisando seu pedido. Voce sera notificado quando receber
                orcamentos.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {sortedQuotes.map((quote, index) => (
              <Card
                key={quote.id}
                className={`overflow-hidden ${
                  index === 0 ? 'ring-2 ring-mustard-500' : ''
                }`}
              >
                {index === 0 && (
                  <div className="bg-mustard-500 text-navy-900 px-4 py-1 text-sm font-medium">
                    Melhor Avaliado
                  </div>
                )}
                <CardContent className="p-4 lg:p-6">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Professional Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full bg-mustard-500 flex items-center justify-center text-navy-900 font-bold text-xl flex-shrink-0">
                          {quote.professional.user.avatar ? (
                            <img
                              src={quote.professional.user.avatar}
                              alt={quote.professional.user.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            quote.professional.user.name.charAt(0)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-navy-900">
                              {quote.professional.user.name}
                            </h3>
                            {quote.professional.verified && (
                              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                <Shield className="w-3 h-3" />
                                Verificado
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <StarRating
                              value={quote.professional.rating}
                              readonly
                              size="sm"
                              showValue
                              totalReviews={quote.professional.totalReviews}
                            />
                          </div>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
                            <span>{quote.professional.completedJobs} trabalhos</span>
                            <span>Responde em ~{quote.professional.responseTime}min</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">{quote.message}</p>
                      </div>

                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {quote.estimatedDuration}
                        </span>
                        <span>Valido ate {formatDate(quote.validUntil)}</span>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="lg:w-48 flex flex-col items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-6">
                      <div className="text-center lg:text-right">
                        <p className="text-2xl lg:text-3xl font-bold text-mustard-600">
                          {formatCurrency(quote.price)}
                        </p>
                        <p className="text-xs text-gray-500">Valor total</p>
                      </div>

                      <div className="flex flex-col gap-2 w-full">
                        <Button
                          className="bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                          onClick={() => handleAcceptQuote(quote.id)}
                          disabled={accepting === quote.id}
                        >
                          {accepting === quote.id ? (
                            'Aceitando...'
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Aceitar
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/profissional/${quote.professional.id}`}>
                            Ver Perfil
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-gray-50 pb-24">
        {/* Premium Mobile Header */}
        <div className="relative">
          {/* Background */}
          <div className="absolute inset-0 h-48">
            <img
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-900/80 to-gray-50" />
          </div>

          {/* Header Content */}
          <div className="relative px-4 pt-4 pb-6">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href={`/dashboard/cliente/pedidos/${params.id}`}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center active:scale-95 transition-transform"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </Link>
              <h1 className="text-lg font-semibold text-white">Orcamentos</h1>
              <div className="w-10" />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
                <div className="w-8 h-8 bg-mustard-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <FileText className="w-4 h-4 text-mustard-600" />
                </div>
                <p className="text-lg font-bold text-navy-900">{quotes.length}</p>
                <p className="text-[10px] text-gray-500">Orcamentos</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-lg font-bold text-navy-900">
                  {quotes.filter(q => q.professional.verified).length}
                </p>
                <p className="text-[10px] text-gray-500">Verificados</p>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-sm">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <Star className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-lg font-bold text-navy-900">
                  {quotes.length > 0 ? Math.max(...quotes.map(q => q.professional.rating)).toFixed(1) : '-'}
                </p>
                <p className="text-[10px] text-gray-500">Maior Nota</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="px-4 -mt-2 mb-4">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4 border border-amber-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-semibold text-amber-900 text-sm">Dica para escolher</p>
                <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                  Compare a avaliacao, tempo de resposta e trabalhos concluidos alem do preco.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quotes List */}
        <div className="px-4 space-y-3">
          {quotes.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">Aguardando orcamentos</h3>
              <p className="text-sm text-gray-500">
                Os profissionais estao analisando seu pedido
              </p>
            </div>
          ) : (
            sortedQuotes.map((quote, index) => (
              <div
                key={quote.id}
                className={`bg-white rounded-2xl shadow-sm border overflow-hidden active:scale-[0.99] transition-transform ${
                  index === 0 ? 'border-mustard-300 ring-2 ring-mustard-100' : 'border-gray-100'
                }`}
              >
                {/* Best Rated Badge */}
                {index === 0 && (
                  <div className="bg-gradient-to-r from-mustard-400 to-mustard-600 px-4 py-2 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-navy-900" />
                    <span className="text-sm font-semibold text-navy-900">Melhor Avaliado</span>
                  </div>
                )}

                <div className="p-4">
                  {/* Professional Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold text-xl shadow-lg overflow-hidden">
                        {quote.professional.user.avatar ? (
                          <img
                            src={quote.professional.user.avatar}
                            alt={quote.professional.user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          quote.professional.user.name.charAt(0)
                        )}
                      </div>
                      {quote.professional.verified && (
                        <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center border-2 border-white">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-navy-900 truncate">
                          {quote.professional.user.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-mustard-500 fill-mustard-500" />
                        <span className="text-sm font-medium text-navy-900">
                          {quote.professional.rating.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({quote.professional.totalReviews} avaliacoes)
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {quote.professional.completedJobs} trabalhos
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          ~{quote.professional.responseTime}min
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-gradient-to-r from-mustard-50 to-amber-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Valor total</p>
                        <p className="text-2xl font-bold text-mustard-600">
                          {formatCurrency(quote.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Prazo estimado</p>
                        <p className="text-sm font-semibold text-navy-900">{quote.estimatedDuration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <p className="text-sm text-gray-700 line-clamp-3">{quote.message}</p>
                  </div>

                  {/* Valid Until */}
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-4">
                    <Clock className="w-3 h-3" />
                    <span>Valido ate {formatDate(quote.validUntil)}</span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/profissional/${quote.professional.id}`}
                      className="flex items-center justify-center gap-2 py-3 bg-gray-100 rounded-xl text-sm font-medium text-gray-700 active:scale-95 transition-transform"
                    >
                      <User className="w-4 h-4" />
                      Ver Perfil
                    </Link>
                    <button
                      onClick={() => handleAcceptQuote(quote.id)}
                      disabled={accepting === quote.id}
                      className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-mustard-400 to-mustard-600 rounded-xl text-sm font-semibold text-navy-900 active:scale-95 transition-transform disabled:opacity-50"
                    >
                      {accepting === quote.id ? (
                        'Aceitando...'
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Aceitar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
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

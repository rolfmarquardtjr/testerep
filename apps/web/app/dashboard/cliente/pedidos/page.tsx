'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Input } from '@/components/ui'
import { LoadingSpinner } from '@/components/shared'
import {
import { getApiUrl } from '@/lib/api'
  Plus,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  DollarSign,
  ChevronRight,
  FileText,
  X,
  Calendar,
  TrendingUp,
  Bell,
  Home as HomeIcon,
  Compass,
  User,
  ArrowUpRight,
  Eye,
  MessageSquare,
  Star,
  Sparkles,
  Zap,
  Award,
  ArrowRight,
  Filter,
} from 'lucide-react'

interface ServiceRequest {
  id: string
  title: string
  description: string
  status: string
  city: string
  state: string
  category?: { name: string }
  quotes?: any[]
  budget?: number
  createdAt: string
}

const statusFilters = [
  { value: 'all', label: 'Todos', icon: FileText },
  { value: 'PENDING', label: 'Aguardando', icon: Clock },
  { value: 'IN_PROGRESS', label: 'Em Andamento', icon: TrendingUp },
  { value: 'COMPLETED', label: 'Concluido', icon: CheckCircle },
  { value: 'CANCELLED', label: 'Cancelado', icon: XCircle },
]

export default function PedidosPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchRequests()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [requests, searchTerm, statusFilter])

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(getApiUrl('/api/service-requests'), {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setRequests(data.data.requests || [])
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterRequests = () => {
    let filtered = [...requests]

    if (statusFilter !== 'all') {
      filtered = filtered.filter((r) => r.status === statusFilter)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term) ||
          r.category?.name.toLowerCase().includes(term)
      )
    }

    setFilteredRequests(filtered)
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; label: string; icon: any; gradient: string }> = {
      'PENDING': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Aguardando', icon: Clock, gradient: 'from-amber-400 to-orange-500' },
      'IN_PROGRESS': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em andamento', icon: TrendingUp, gradient: 'from-blue-400 to-cyan-500' },
      'COMPLETED': { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Concluido', icon: CheckCircle, gradient: 'from-emerald-400 to-green-500' },
      'CANCELLED': { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelado', icon: XCircle, gradient: 'from-red-400 to-rose-500' },
    }
    return configs[status] || configs['PENDING']
  }

  const formatDate = (date: string) => {
    const now = new Date()
    const created = new Date(date)
    const diffInDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Hoje'
    if (diffInDays === 1) return 'Ontem'
    if (diffInDays < 7) return `${diffInDays} dias atras`
    return created.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getStats = () => {
    return {
      total: requests.length,
      pending: requests.filter(r => r.status === 'PENDING').length,
      inProgress: requests.filter(r => r.status === 'IN_PROGRESS').length,
      completed: requests.filter(r => r.status === 'COMPLETED').length,
    }
  }

  const stats = getStats()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Carregando..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ==================== DESKTOP LAYOUT ==================== */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Hero Banner */}
          <div className="bg-navy-900 rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800 to-transparent" />
            <div className="relative z-10 max-w-xl">
              <h1 className="text-3xl font-bold text-white mb-3">Meus Pedidos</h1>
              <p className="text-gray-300 mb-6">
                Acompanhe todos os seus pedidos de servico em um so lugar
              </p>
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                  <p className="text-sm text-gray-400">Total</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{stats.pending}</p>
                  <p className="text-sm text-gray-400">Aguardando</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
                  <p className="text-sm text-gray-400">Em andamento</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{stats.completed}</p>
                  <p className="text-sm text-gray-400">Concluidos</p>
                </div>
              </div>
              <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                <Link href="/solicitar-servico">
                  <Plus className="w-5 h-5 mr-2" />
                  Novo Pedido
                </Link>
              </Button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600"
              alt="Servicos"
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30"
            />
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar pedidos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-xl w-full text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Status Filters */}
              <div className="flex gap-2">
                {statusFilters.map((filter) => {
                  const FilterIcon = filter.icon
                  return (
                    <button
                      key={filter.value}
                      onClick={() => setStatusFilter(filter.value)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        statusFilter === filter.value
                          ? 'bg-navy-900 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <FilterIcon className="w-4 h-4" />
                      {filter.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold text-navy-900">{filteredRequests.length}</span> pedido(s) encontrado(s)
            </p>
          </div>

          {/* Content */}
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-center py-20 px-6">
                <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-bold text-navy-900 text-xl mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'Nenhum pedido encontrado' : 'Nenhum pedido ainda'}
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca para encontrar o que procura'
                    : 'Solicite seu primeiro servico e receba orcamentos de profissionais qualificados em minutos'}
                </p>
                {searchTerm || statusFilter !== 'all' ? (
                  <Button
                    onClick={() => {
                      setSearchTerm('')
                      setStatusFilter('all')
                    }}
                    variant="outline"
                    className="border-navy-300 text-navy-600"
                  >
                    Limpar Filtros
                  </Button>
                ) : (
                  <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 h-12 px-6">
                    <Link href="/solicitar-servico">
                      <Plus className="w-5 h-5 mr-2" />
                      Solicitar Servico
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredRequests.map((request) => {
                const statusConfig = getStatusConfig(request.status)
                const StatusIcon = statusConfig.icon
                const quotesCount = request.quotes?.length || 0

                return (
                  <Link
                    key={request.id}
                    href={`/dashboard/cliente/pedidos/${request.id}`}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-mustard-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex">
                      {/* Left Color Bar */}
                      <div className={`w-1.5 bg-gradient-to-b ${statusConfig.gradient}`} />

                      <div className="flex-1 p-5">
                        <div className="flex items-start gap-5">
                          {/* Status Icon */}
                          <div className={`w-14 h-14 ${statusConfig.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                            <StatusIcon className={`w-7 h-7 ${statusConfig.text}`} />
                          </div>

                          {/* Main Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div>
                                <h3 className="font-bold text-navy-900 text-lg group-hover:text-mustard-600 transition-colors">
                                  {request.title}
                                </h3>
                                {request.category && (
                                  <span className="text-sm text-gray-500">{request.category.name}</span>
                                )}
                              </div>
                              <span className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.text} font-medium`}>
                                {statusConfig.label}
                                {request.status === 'PENDING' && quotesCount > 0 && (
                                  <span className="w-2 h-2 bg-mustard-500 rounded-full animate-pulse" />
                                )}
                              </span>
                            </div>

                            <p className="text-gray-600 mb-4 line-clamp-2">{request.description}</p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                {request.city}, {request.state}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {formatDate(request.createdAt)}
                              </span>
                              {request.budget && (
                                <span className="flex items-center gap-1.5 font-medium text-navy-900">
                                  <DollarSign className="w-4 h-4" />
                                  {formatCurrency(request.budget)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Right Section */}
                          <div className="flex flex-col items-end justify-between h-full gap-4">
                            {quotesCount > 0 && (
                              <div className="text-right">
                                <p className="text-2xl font-bold text-mustard-600">{quotesCount}</p>
                                <p className="text-xs text-gray-500">orcamento{quotesCount !== 1 ? 's' : ''}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-mustard-600 transition-colors">
                              Ver detalhes
                              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>

                        {/* Quotes Alert */}
                        {request.status === 'PENDING' && quotesCount > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between bg-mustard-50 -mx-5 -mb-5 px-5 py-3">
                            <div className="flex items-center gap-2">
                              <Bell className="w-4 h-4 text-mustard-600" />
                              <span className="text-sm font-medium text-mustard-700">
                                Voce tem {quotesCount} orcamento{quotesCount !== 1 ? 's' : ''} para avaliar
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-mustard-600 flex items-center gap-1">
                              Ver orcamentos <ChevronRight className="w-4 h-4" />
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT - ULTRA PREMIUM ==================== */}
      <div className="lg:hidden min-h-screen bg-gray-50 pb-28">
        {/* Premium Hero Header */}
        <div className="relative">
          {/* Background Image with Gradient */}
          <div className="absolute inset-0 h-72">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/95 via-navy-900/85 to-gray-50" />
          </div>

          {/* Header Content */}
          <div className="relative z-10 px-5 pt-6">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-mustard-400 to-mustard-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-navy-900" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">Meus Pedidos</h1>
                </div>
                <p className="text-sm text-white/60 ml-10">Acompanhe suas solicitacoes</p>
              </div>
              <Link
                href="/solicitar-servico"
                className="w-12 h-12 bg-gradient-to-br from-mustard-400 to-mustard-600 rounded-2xl flex items-center justify-center shadow-lg shadow-mustard-500/40 active:scale-95 transition-transform"
              >
                <Plus className="w-6 h-6 text-navy-900" />
              </Link>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
                <p className="text-[10px] text-white/60">Total</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <div className="w-10 h-10 bg-amber-500/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 text-amber-300" />
                </div>
                <p className="text-2xl font-bold text-amber-300">{stats.pending}</p>
                <p className="text-[10px] text-white/60">Aguardando</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <div className="w-10 h-10 bg-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-5 h-5 text-blue-300" />
                </div>
                <p className="text-2xl font-bold text-blue-300">{stats.inProgress}</p>
                <p className="text-[10px] text-white/60">Ativos</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 text-center border border-white/10">
                <div className="w-10 h-10 bg-emerald-500/30 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Award className="w-5 h-5 text-emerald-300" />
                </div>
                <p className="text-2xl font-bold text-emerald-300">{stats.completed}</p>
                <p className="text-[10px] text-white/60">Concluidos</p>
              </div>
            </div>

            {/* Premium Search Bar */}
            <div className="relative mb-4">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-mustard-600" />
              </div>
              <Input
                placeholder="Buscar pedidos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-16 pr-12 h-14 bg-white border-0 rounded-2xl w-full shadow-xl text-base font-medium"
              />
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 active:scale-90 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center">
                  <Filter className="w-4 h-4 text-navy-600" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Pills - Ultra Premium */}
        <div className="px-5 -mt-2 mb-5">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
            {statusFilters.map((filter) => {
              const FilterIcon = filter.icon
              const isActive = statusFilter === filter.value
              return (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-navy-800 to-navy-900 text-white shadow-lg shadow-navy-900/30'
                      : 'bg-white text-gray-600 border border-gray-100 shadow-sm'
                  }`}
                >
                  <FilterIcon className={`w-4 h-4 ${isActive ? 'text-mustard-400' : 'text-gray-400'}`} />
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Results Header */}
        <div className="px-5 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-mustard-500" />
            <p className="text-sm text-gray-600">
              <span className="font-bold text-navy-900">{filteredRequests.length}</span> pedido(s)
            </p>
          </div>
          {(searchTerm || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
              }}
              className="flex items-center gap-1 text-sm text-mustard-600 font-semibold active:scale-95 transition-transform"
            >
              <X className="w-3.5 h-3.5" />
              Limpar
            </button>
          )}
        </div>

        {/* Content - Ultra Premium Cards */}
        <div className="px-5">
          {filteredRequests.length === 0 ? (
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl">
              {/* Decorative Background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-mustard-100 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-navy-100 to-transparent rounded-full blur-3xl" />
              </div>

              <div className="relative p-8 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-mustard-100 to-mustard-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FileText className="w-12 h-12 text-mustard-500" />
                </div>
                <h3 className="font-bold text-navy-900 text-xl mb-2">
                  {searchTerm || statusFilter !== 'all' ? 'Nenhum resultado' : 'Comece agora!'}
                </h3>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Tente ajustar os filtros para encontrar o que procura'
                    : 'Solicite seu primeiro servico e receba orcamentos de profissionais verificados'}
                </p>
                {searchTerm || statusFilter !== 'all' ? (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setStatusFilter('all')
                    }}
                    className="h-14 px-8 bg-gray-100 rounded-2xl font-semibold text-gray-700 active:scale-95 transition-transform"
                  >
                    Limpar Filtros
                  </button>
                ) : (
                  <Link
                    href="/solicitar-servico"
                    className="inline-flex items-center gap-2 h-14 px-8 bg-gradient-to-r from-mustard-400 to-mustard-600 rounded-2xl font-bold text-navy-900 shadow-lg shadow-mustard-500/30 active:scale-95 transition-transform"
                  >
                    <Plus className="w-5 h-5" />
                    Criar Primeiro Pedido
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request, index) => {
                const statusConfig = getStatusConfig(request.status)
                const StatusIcon = statusConfig.icon
                const quotesCount = request.quotes?.length || 0
                const hasNewQuotes = request.status === 'PENDING' && quotesCount > 0

                return (
                  <Link
                    key={request.id}
                    href={`/dashboard/cliente/pedidos/${request.id}`}
                    className="block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-all"
                  >
                    {/* Gradient Top Bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${statusConfig.gradient}`} />

                    <div className="p-4">
                      {/* Header with Icon and Status */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-14 h-14 bg-gradient-to-br ${statusConfig.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <StatusIcon className="w-7 h-7 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-navy-900 text-base leading-tight line-clamp-2">{request.title}</h3>
                            {hasNewQuotes && (
                              <span className="flex-shrink-0 flex items-center gap-1 text-xs px-2 py-1 bg-mustard-100 text-mustard-700 rounded-lg font-semibold">
                                <Bell className="w-3 h-3" />
                                Novo
                              </span>
                            )}
                          </div>
                          {request.category && (
                            <p className="text-sm text-gray-500 mt-0.5">{request.category.name}</p>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{request.description}</p>

                      {/* Info Pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium">
                          <MapPin className="w-3.5 h-3.5" />
                          {request.city}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-medium">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(request.createdAt)}
                        </span>
                        {request.budget && (
                          <span className="inline-flex items-center gap-1.5 text-xs bg-mustard-50 text-mustard-700 px-3 py-1.5 rounded-lg font-semibold">
                            <DollarSign className="w-3.5 h-3.5" />
                            {formatCurrency(request.budget)}
                          </span>
                        )}
                      </div>

                      {/* Status Badge */}
                      <div className={`inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl ${statusConfig.bg} ${statusConfig.text} font-semibold`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusConfig.label}
                      </div>

                      {/* Quotes Section - Premium */}
                      {quotesCount > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex -space-x-2">
                                {[...Array(Math.min(quotesCount, 3))].map((_, i) => (
                                  <div key={i} className="w-9 h-9 bg-gradient-to-br from-mustard-400 to-mustard-600 rounded-xl border-2 border-white flex items-center justify-center shadow-md">
                                    <User className="w-4 h-4 text-navy-900" />
                                  </div>
                                ))}
                                {quotesCount > 3 && (
                                  <div className="w-9 h-9 bg-navy-100 rounded-xl border-2 border-white flex items-center justify-center">
                                    <span className="text-xs font-bold text-navy-700">+{quotesCount - 3}</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-navy-900">{quotesCount} orcamento{quotesCount !== 1 ? 's' : ''}</p>
                                <p className="text-xs text-gray-500">para avaliar</p>
                              </div>
                            </div>

                            <div className={`flex items-center gap-1 px-4 py-2 rounded-xl ${hasNewQuotes ? 'bg-gradient-to-r from-mustard-400 to-mustard-500 shadow-lg shadow-mustard-500/30' : 'bg-gray-100'}`}>
                              <span className={`text-xs font-bold ${hasNewQuotes ? 'text-navy-900' : 'text-gray-600'}`}>
                                Ver
                              </span>
                              <ArrowRight className={`w-4 h-4 ${hasNewQuotes ? 'text-navy-900' : 'text-gray-400'}`} />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Status-specific Footer */}
                      {quotesCount === 0 && request.status === 'PENDING' && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                              <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-amber-900">Aguardando orcamentos</p>
                              <p className="text-xs text-amber-700">Profissionais analisando...</p>
                            </div>
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                            </div>
                          </div>
                        </div>
                      )}

                      {request.status === 'IN_PROGRESS' && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                              <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-blue-900">Em andamento</p>
                              <p className="text-xs text-blue-700">Acompanhe o progresso</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-blue-400" />
                          </div>
                        </div>
                      )}

                      {request.status === 'COMPLETED' && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                              <Award className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-emerald-900">Concluido com sucesso</p>
                              <p className="text-xs text-emerald-700">Avalie o profissional</p>
                            </div>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 text-mustard-400 fill-mustard-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Ultra Premium Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 px-4 py-3 z-50">
          <div className="flex items-center justify-around max-w-md mx-auto">
            <Link href="/dashboard/cliente" className="flex flex-col items-center gap-1 py-1 px-4 active:scale-90 transition-transform">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <HomeIcon className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400 font-medium">Inicio</span>
            </Link>
            <Link href="/explorar" className="flex flex-col items-center gap-1 py-1 px-4 active:scale-90 transition-transform">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Compass className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400 font-medium">Explorar</span>
            </Link>
            <Link href="/solicitar-servico" className="flex flex-col items-center -mt-4 active:scale-90 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-br from-mustard-400 to-mustard-600 rounded-2xl flex items-center justify-center shadow-xl shadow-mustard-500/40 border-4 border-white">
                <Plus className="w-8 h-8 text-navy-900" />
              </div>
            </Link>
            <Link href="/dashboard/cliente/pedidos" className="flex flex-col items-center gap-1 py-1 px-4 active:scale-90 transition-transform">
              <div className="w-10 h-10 bg-gradient-to-br from-mustard-100 to-mustard-50 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-mustard-600" />
              </div>
              <span className="text-[10px] text-mustard-600 font-bold">Pedidos</span>
            </Link>
            <Link href="/dashboard/cliente/perfil" className="flex flex-col items-center gap-1 py-1 px-4 active:scale-90 transition-transform">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400 font-medium">Perfil</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

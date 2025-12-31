'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Card, CardContent, Input } from '@/components/ui'
import { StatusBadge, EmptyState, LoadingSpinner } from '@/components/shared'
import { getApiUrl } from '@/lib/api'
import {
  Search,
  MapPin,
  Calendar,
  User,
  ArrowRight,
  CheckCircle,
  Clock,
  X,
  TrendingUp,
  DollarSign,
  Briefcase,
  Target,
  Home as HomeIcon,
  MessageSquare,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  XCircle,
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
  category?: { name: string }
  createdAt: string
  client?: {
    user: { name: string; avatar?: string }
  }
  quote?: {
    price: number
    estimatedDuration: string
  }
}

const statusFilters = [
  { value: 'all', label: 'Todos', icon: Briefcase },
  { value: 'ACCEPTED', label: 'Aceitos', icon: CheckCircle },
  { value: 'IN_PROGRESS', label: 'Em Andamento', icon: TrendingUp },
  { value: 'COMPLETED', label: 'Concluidos', icon: CheckCircle },
  { value: 'CANCELLED', label: 'Cancelados', icon: XCircle },
]

export default function TrabalhosPage() {
  const [jobs, setJobs] = useState<ServiceRequest[]>([])
  const [filteredJobs, setFilteredJobs] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    filterJobs()
  }, [jobs, searchTerm, statusFilter])

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(getApiUrl('/api/service-requests/my-jobs'), {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setJobs(data.data.requests || [])
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterJobs = () => {
    let filtered = [...jobs]

    if (statusFilter !== 'all') {
      filtered = filtered.filter((j) => j.status === statusFilter)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(term) ||
          j.description.toLowerCase().includes(term) ||
          j.client?.user.name.toLowerCase().includes(term)
      )
    }

    setFilteredJobs(filtered)
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
      year: 'numeric',
    })
  }

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

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
  }

  const getStats = () => {
    return {
      total: jobs.length,
      inProgress: jobs.filter(j => j.status === 'IN_PROGRESS').length,
      completed: jobs.filter(j => j.status === 'COMPLETED').length,
      totalValue: jobs.reduce((acc, j) => acc + (j.quote?.price || 0), 0),
    }
  }

  const stats = getStats()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Carregando trabalhos..." />
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
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Briefcase className="w-6 h-6 text-mustard-400" />
                <span className="text-mustard-400 font-medium">{jobs.length} trabalho(s) encontrado(s)</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">
                Meus Trabalhos
              </h1>
              <p className="text-gray-300 mb-6">
                Acompanhe todos os seus projetos em andamento e concluidos. Mantenha seus clientes satisfeitos!
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
                  <p className="text-sm text-gray-400">Em andamento</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{stats.completed}</p>
                  <p className="text-sm text-gray-400">Concluidos</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{formatCurrency(stats.totalValue)}</p>
                  <p className="text-sm text-gray-400">Valor total</p>
                </div>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600"
              alt="Trabalhos"
              className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-20"
            />
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar trabalhos por titulo, descricao ou cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12"
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

              <div className="flex gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      statusFilter === filter.value
                        ? 'bg-mustard-500 text-navy-900'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs List */}
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="text-center py-16 px-6">
                <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
                  <Briefcase className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-semibold text-navy-900 text-lg mb-2">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Nenhum trabalho encontrado'
                    : 'Nenhum trabalho ainda'}
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Envie orcamentos para conseguir trabalhos'}
                </p>
                {searchTerm || statusFilter !== 'all' ? (
                  <Button onClick={clearFilters} className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                    Limpar Filtros
                  </Button>
                ) : (
                  <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                    <Link href="/dashboard/profissional/oportunidades">
                      <Target className="w-4 h-4 mr-2" />
                      Ver Oportunidades
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const statusConfig = getStatusConfig(job.status)
                const StatusIcon = statusConfig.icon

                return (
                  <Link
                    key={job.id}
                    href={`/dashboard/profissional/trabalhos/${job.id}`}
                    className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-mustard-200 transition-all duration-300 overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex gap-6">
                        {/* Icon */}
                        <div className={`w-16 h-16 ${statusConfig.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                          <StatusIcon className={`w-8 h-8 ${statusConfig.text}`} />
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-navy-900 group-hover:text-mustard-600 transition-colors">
                                {job.title}
                              </h3>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4" />
                                  {job.city}, {job.state}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(job.createdAt)}
                                </span>
                                {job.category && (
                                  <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                                    {job.category.name}
                                  </span>
                                )}
                              </div>
                            </div>

                            <span className={`text-xs px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.text} font-medium whitespace-nowrap`}>
                              {statusConfig.label}
                            </span>
                          </div>

                          <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                          <div className="flex items-center justify-between">
                            {job.client && (
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-mustard-500 flex items-center justify-center text-navy-900 font-bold overflow-hidden">
                                  {job.client.user.avatar ? (
                                    <img
                                      src={job.client.user.avatar}
                                      alt={job.client.user.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    job.client.user.name.charAt(0)
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-navy-900">{job.client.user.name}</p>
                                  <p className="text-xs text-gray-500">Cliente</p>
                                </div>
                              </div>
                            )}

                            {job.quote && (
                              <div className="text-right">
                                <p className="text-xs text-gray-500">Valor acordado</p>
                                <p className="text-xl font-bold text-mustard-600">
                                  {formatCurrency(job.quote.price)}
                                </p>
                                {job.quote.estimatedDuration && (
                                  <p className="text-xs text-gray-500 flex items-center gap-1 justify-end">
                                    <Clock className="w-3 h-3" />
                                    {job.quote.estimatedDuration}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-mustard-500 transition-colors self-center" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT ==================== */}
      <div className="lg:hidden pb-24">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h1 className="font-bold text-navy-900 text-lg">Meus Trabalhos</h1>
                <p className="text-xs text-gray-500">{filteredJobs.length} trabalho(s)</p>
              </div>
              <Button
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? 'bg-mustard-500 text-navy-900' : 'bg-gray-100 text-gray-700'}
              >
                <SlidersHorizontal className="w-4 h-4 mr-1" />
                Filtros
              </Button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar trabalhos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 bg-gray-100 border-0"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
              <div className="flex flex-wrap gap-2">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setStatusFilter(filter.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      statusFilter === filter.value
                        ? 'bg-mustard-500 text-navy-900'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
              {(searchTerm || statusFilter !== 'all') && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="w-full mt-3">
                  Limpar Filtros
                </Button>
              )}
            </div>
          )}
        </header>

        {/* Stats Cards */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-2xl p-3 border border-gray-100 text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-lg font-bold text-navy-900">{stats.inProgress}</p>
              <p className="text-[10px] text-gray-500">Em andamento</p>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-gray-100 text-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-lg font-bold text-navy-900">{stats.completed}</p>
              <p className="text-[10px] text-gray-500">Concluidos</p>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-gray-100 text-center">
              <div className="w-8 h-8 bg-mustard-100 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                <DollarSign className="w-4 h-4 text-mustard-600" />
              </div>
              <p className="text-sm font-bold text-navy-900">{formatCurrency(stats.totalValue).replace('R$', '')}</p>
              <p className="text-[10px] text-gray-500">Valor total</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="px-4">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">
                {searchTerm || statusFilter !== 'all'
                  ? 'Nenhum trabalho encontrado'
                  : 'Nenhum trabalho'}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {searchTerm || statusFilter !== 'all'
                  ? 'Tente ajustar os filtros'
                  : 'Envie orcamentos para conseguir trabalhos'}
              </p>
              {searchTerm || statusFilter !== 'all' ? (
                <Button size="sm" onClick={clearFilters} className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                  Limpar Filtros
                </Button>
              ) : (
                <Button size="sm" asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                  <Link href="/dashboard/profissional/oportunidades">
                    <Target className="w-4 h-4 mr-1" />
                    Oportunidades
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredJobs.map((job) => {
                const statusConfig = getStatusConfig(job.status)
                const StatusIcon = statusConfig.icon

                return (
                  <Link
                    key={job.id}
                    href={`/dashboard/profissional/trabalhos/${job.id}`}
                    className="block bg-white rounded-2xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-12 h-12 ${statusConfig.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <StatusIcon className={`w-6 h-6 ${statusConfig.text}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-navy-900 text-sm">{job.title}</h3>
                            <span className={`text-[10px] px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} font-medium whitespace-nowrap`}>
                              {statusConfig.label}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.city}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(job.createdAt)}
                            </span>
                          </div>

                          {job.client && (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-lg bg-mustard-500 flex items-center justify-center text-navy-900 text-xs font-bold">
                                {job.client.user.avatar ? (
                                  <img
                                    src={job.client.user.avatar}
                                    alt={job.client.user.name}
                                    className="w-full h-full rounded-lg object-cover"
                                  />
                                ) : (
                                  job.client.user.name.charAt(0)
                                )}
                              </div>
                              <span className="text-xs text-gray-600">{job.client.user.name}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {job.quote && (
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            {job.quote.estimatedDuration || 'A combinar'}
                          </div>
                          <p className="text-lg font-bold text-mustard-600">
                            {formatCurrency(job.quote.price)}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
          <div className="flex items-center justify-around">
            <Link href="/dashboard/profissional" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400">
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs">Inicio</span>
            </Link>
            <Link href="/dashboard/profissional/oportunidades" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400">
              <Target className="w-6 h-6" />
              <span className="text-xs">Oportunidades</span>
            </Link>
            <Link href="/dashboard/profissional/trabalhos" className="flex flex-col items-center gap-1 py-2 px-3 text-mustard-600">
              <Briefcase className="w-6 h-6" />
              <span className="text-xs font-medium">Trabalhos</span>
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

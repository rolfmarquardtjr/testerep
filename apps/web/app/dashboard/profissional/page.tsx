'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { StatusBadge, EmptyState, LoadingSpinner } from '@/components/shared'
import { getApiUrl } from '@/lib/api'
import {
  FileText,
  DollarSign,
  Star,
  TrendingUp,
  ArrowRight,
  MapPin,
  Eye,
  Send,
  CheckCircle,
  Briefcase,
  Clock,
  Users,
  Target,
  Award,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Bell,
  MessageSquare,
  User,
  Home as HomeIcon,
  Wallet,
  Zap,
  Shield,
  ThumbsUp,
  Plus,
} from 'lucide-react'

interface ServiceRequest {
  id: string
  title: string
  description: string
  status: string
  city: string
  state: string
  category?: { name: string }
  budget?: number
  createdAt: string
  client?: {
    user: { name: string }
  }
  hasQuoted?: boolean
}

interface Stats {
  totalJobs: number
  pendingQuotes: number
  activeJobs: number
  completedJobs: number
  totalEarnings: number
  rating: number
  totalReviews: number
}

export default function ProfissionalDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [myJobs, setMyJobs] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [stats, setStats] = useState<Stats>({
    totalJobs: 0,
    pendingQuotes: 0,
    activeJobs: 0,
    completedJobs: 0,
    totalEarnings: 0,
    rating: 4.8,
    totalReviews: 24,
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserName(user.name?.split(' ')[0] || 'Profissional')
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken')

      const requestsResponse = await fetch(getApiUrl('/api/service-requests/available'), {
        headers: { Authorization: `Bearer ${token}` },
      })
      const requestsData = await requestsResponse.json()
      if (requestsData.success) {
        setRequests(requestsData.data.requests || [])
      }

      const jobsResponse = await fetch(getApiUrl('/api/service-requests/my-jobs'), {
        headers: { Authorization: `Bearer ${token}` },
      })
      const jobsData = await jobsResponse.json()
      if (jobsData.success) {
        setMyJobs(jobsData.data.requests || [])
      }

      const statsResponse = await fetch(getApiUrl('/api/professionals/me/stats'), {
        headers: { Authorization: `Bearer ${token}` },
      })
      const statsData = await statsResponse.json()
      if (statsData.success) {
        setStats(statsData.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffHours < 1) return 'Agora'
    if (diffHours < 24) return `${diffHours}h atras`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return 'Ontem'
    return `${diffDays} dias atras`
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; icon: any; label: string }> = {
      'ACCEPTED': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle, label: 'Aceito' },
      'IN_PROGRESS': { bg: 'bg-blue-100', text: 'text-blue-700', icon: TrendingUp, label: 'Em andamento' },
      'COMPLETED': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle, label: 'Concluido' },
      'PENDING': { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock, label: 'Aguardando' },
      'CANCELLED': { bg: 'bg-red-100', text: 'text-red-700', icon: Clock, label: 'Cancelado' },
    }
    return configs[status] || configs['PENDING']
  }

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
          {/* Hero Banner with Image */}
          <div className="bg-navy-900 rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800 to-transparent" />
            <div className="relative z-10 max-w-xl">
              <p className="text-sm font-medium text-gray-400 mb-2">{getGreeting()}, {userName}</p>
              <h1 className="text-3xl font-bold text-white mb-3">
                Pronto para conquistar novos clientes?
              </h1>
              <p className="text-gray-300 mb-6">
                Voce tem <span className="text-mustard-400 font-semibold">{requests.length}</span> novas oportunidades esperando. Responda rapido para aumentar suas chances!
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{formatCurrency(stats.totalEarnings || 2450)}</p>
                  <p className="text-sm text-gray-400">Este mes</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 fill-mustard-500 text-mustard-500" />
                    <p className="text-3xl font-bold text-white">{stats.rating.toFixed(1)}</p>
                  </div>
                  <p className="text-sm text-gray-400">{stats.totalReviews} avaliacoes</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{stats.activeJobs || myJobs.length}</p>
                  <p className="text-sm text-gray-400">Ativos</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{stats.completedJobs || 47}</p>
                  <p className="text-sm text-gray-400">Concluidos</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                  <Link href="/dashboard/profissional/oportunidades">
                    <Target className="w-5 h-5 mr-2" />
                    Ver Oportunidades
                  </Link>
                </Button>
                <Button asChild className="bg-white/10 border border-white/30 text-white hover:bg-white/20">
                  <Link href="/dashboard/profissional/perfil">
                    <User className="w-5 h-5 mr-2" />
                    Meu Perfil
                  </Link>
                </Button>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600"
              alt="Profissional"
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30"
            />
          </div>

          {/* Main Content - 3 columns */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Opportunities */}
            <div className="lg:col-span-2 space-y-6">
              {/* New Opportunities */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <div>
                    <h2 className="font-bold text-navy-900 text-lg">Novas Oportunidades</h2>
                    <p className="text-sm text-gray-500">Clientes precisando dos seus servicos</p>
                  </div>
                  <Link href="/dashboard/profissional/oportunidades" className="text-sm font-medium text-mustard-600 flex items-center gap-1 hover:text-mustard-700">
                    Ver todas <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {requests.length === 0 ? (
                  <div className="text-center py-16 px-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
                      <Briefcase className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-navy-900 text-lg mb-2">Nenhuma oportunidade no momento</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      Novas solicitacoes de clientes aparecerao aqui. Complete seu perfil para ser encontrado!
                    </p>
                    <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                      <Link href="/dashboard/profissional/perfil">
                        <User className="w-4 h-4 mr-2" />
                        Completar Perfil
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {requests.slice(0, 4).map((request) => (
                      <div
                        key={request.id}
                        className="p-5 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-mustard-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Target className="w-7 h-7 text-mustard-600" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h3 className="font-semibold text-navy-900 group-hover:text-mustard-600 transition-colors">
                                {request.title}
                              </h3>
                              {request.budget && (
                                <span className="text-sm font-bold text-mustard-600 bg-mustard-50 px-3 py-1 rounded-full whitespace-nowrap">
                                  Ate {formatCurrency(request.budget)}
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-gray-500 mb-3 line-clamp-1">{request.description}</p>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                {request.city}, {request.state}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {getTimeAgo(request.createdAt)}
                              </span>
                              {request.category && (
                                <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                                  {request.category.name}
                                </span>
                              )}
                            </div>

                            <div className="flex gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="flex-1 border-gray-200"
                              >
                                <Link href={`/dashboard/profissional/oportunidades/${request.id}`}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  Ver Detalhes
                                </Link>
                              </Button>
                              {!request.hasQuoted && (
                                <Button
                                  size="sm"
                                  className="flex-1 bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                                  asChild
                                >
                                  <Link href={`/dashboard/profissional/oportunidades/${request.id}?enviar=true`}>
                                    <Send className="w-4 h-4 mr-1" />
                                    Enviar Orcamento
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* My Jobs */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <div>
                    <h2 className="font-bold text-navy-900 text-lg">Meus Trabalhos</h2>
                    <p className="text-sm text-gray-500">Acompanhe seus projetos ativos</p>
                  </div>
                  <Link href="/dashboard/profissional/trabalhos" className="text-sm font-medium text-mustard-600 flex items-center gap-1 hover:text-mustard-700">
                    Ver todos <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {myJobs.length === 0 ? (
                  <div className="text-center py-12 px-6">
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-navy-900 mb-2">Nenhum trabalho ainda</h3>
                    <p className="text-gray-500 text-sm">
                      Envie orcamentos para conseguir trabalhos
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {myJobs.slice(0, 3).map((job) => {
                      const statusConfig = getStatusConfig(job.status)
                      const StatusIcon = statusConfig.icon

                      return (
                        <Link
                          key={job.id}
                          href={`/dashboard/profissional/trabalhos/${job.id}`}
                          className="block p-5 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 ${statusConfig.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                              <StatusIcon className={`w-6 h-6 ${statusConfig.text}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <h3 className="font-semibold text-navy-900 group-hover:text-mustard-600 transition-colors">{job.title}</h3>
                                <span className={`text-xs px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.text} font-medium whitespace-nowrap`}>
                                  {statusConfig.label}
                                </span>
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4" />
                                  {job.city}, {job.state}
                                </span>
                                {job.client && (
                                  <span className="flex items-center gap-1.5">
                                    <User className="w-4 h-4" />
                                    {job.client.user.name}
                                  </span>
                                )}
                              </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-mustard-500 transition-colors" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-navy-900 mb-4">Acoes Rapidas</h3>
                <div className="space-y-3">
                  <Link
                    href="/dashboard/profissional/oportunidades"
                    className="flex items-center gap-4 p-4 bg-mustard-50 hover:bg-mustard-100 rounded-xl transition-colors group"
                  >
                    <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Target className="w-6 h-6 text-navy-900" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">Oportunidades</p>
                      <p className="text-xs text-gray-500">{requests.length} disponiveis</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </Link>

                  <Link
                    href="/dashboard/profissional/trabalhos"
                    className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                  >
                    <div className="w-12 h-12 bg-navy-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">Meus Trabalhos</p>
                      <p className="text-xs text-gray-500">{myJobs.length} em andamento</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </Link>

                  <Link
                    href="/dashboard/profissional/mensagens"
                    className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">Mensagens</p>
                      <p className="text-xs text-gray-500">Converse com clientes</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </Link>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-gradient-to-br from-navy-600 to-navy-700 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-6 h-6 text-mustard-400" />
                  <span className="font-bold">Dica para Vender Mais</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">
                  Responda rapido e fature mais!
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-mustard-400 mt-0.5 flex-shrink-0" />
                    Profissionais que respondem em menos de 1h tem 3x mais chances
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-mustard-400 mt-0.5 flex-shrink-0" />
                    Personalize suas propostas para cada cliente
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-mustard-400 mt-0.5 flex-shrink-0" />
                    Mantenha seu portfolio atualizado
                  </li>
                </ul>
              </div>

              {/* Performance Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-navy-900 mb-4">Seu Desempenho</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                        <Star className="w-5 h-5 text-mustard-600" />
                      </div>
                      <span className="text-sm text-gray-600">Avaliacao</span>
                    </div>
                    <span className="font-bold text-navy-900">{stats.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                        <ThumbsUp className="w-5 h-5 text-mustard-600" />
                      </div>
                      <span className="text-sm text-gray-600">Taxa de Resposta</span>
                    </div>
                    <span className="font-bold text-navy-900">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-mustard-600" />
                      </div>
                      <span className="text-sm text-gray-600">Tempo de Resposta</span>
                    </div>
                    <span className="font-bold text-navy-900">~15min</span>
                  </div>
                </div>
              </div>

              {/* Promo Banner */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600"
                  alt="Impulsione seu perfil"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs font-semibold text-mustard-400 uppercase tracking-wider">Destaque-se</span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Impulsione seu Perfil
                  </h3>
                  <Button size="sm" className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT ==================== */}
      <div className="lg:hidden pb-24">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{getGreeting()}</p>
              <p className="font-bold text-navy-900 text-lg">{userName}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-xl">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              <div className="w-10 h-10 bg-mustard-500 rounded-xl flex items-center justify-center text-navy-900 font-bold">
                {userName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white rounded-2xl p-3 border border-gray-100 text-center">
              <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-5 h-5 text-mustard-600" />
              </div>
              <p className="text-sm font-bold text-navy-900">R$ 2,4k</p>
              <p className="text-[10px] text-gray-500">Este mes</p>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-gray-100 text-center">
              <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Star className="w-5 h-5 text-mustard-600" />
              </div>
              <p className="text-sm font-bold text-navy-900">{stats.rating.toFixed(1)}</p>
              <p className="text-[10px] text-gray-500">Avaliacao</p>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-gray-100 text-center">
              <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Briefcase className="w-5 h-5 text-mustard-600" />
              </div>
              <p className="text-sm font-bold text-navy-900">{myJobs.length}</p>
              <p className="text-[10px] text-gray-500">Ativos</p>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-gray-100 text-center">
              <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-5 h-5 text-mustard-600" />
              </div>
              <p className="text-sm font-bold text-navy-900">{stats.completedJobs || 47}</p>
              <p className="text-[10px] text-gray-500">Concluidos</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="px-4 mb-4">
          <div className="relative bg-navy-600 rounded-2xl p-5 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mustard-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-mustard-400" />
                <span className="text-xs font-medium text-mustard-400">{requests.length} novas oportunidades</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Conquiste novos clientes!
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Responda rapido e aumente suas vendas
              </p>
              <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 w-full">
                <Link href="/dashboard/profissional/oportunidades">
                  <Target className="w-5 h-5 mr-2" />
                  Ver Oportunidades
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* New Opportunities */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-navy-900">Novas Oportunidades</h2>
            <Link href="/dashboard/profissional/oportunidades" className="text-sm font-medium text-mustard-600">
              Ver todas
            </Link>
          </div>

          {requests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">Nenhuma oportunidade</h3>
              <p className="text-sm text-gray-500 mb-4">
                Novas solicitacoes aparecerao aqui
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.slice(0, 3).map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl border border-gray-100 p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-mustard-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-mustard-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-navy-900 text-sm">{request.title}</h3>
                        {request.budget && (
                          <span className="text-xs font-bold text-mustard-600 whitespace-nowrap">
                            Ate {formatCurrency(request.budget)}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {request.city}
                        </span>
                        <span>{getTimeAgo(request.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 h-9 text-xs"
                    >
                      <Link href={`/dashboard/profissional/oportunidades/${request.id}`}>
                        <Eye className="w-3 h-3 mr-1" />
                        Detalhes
                      </Link>
                    </Button>
                    {!request.hasQuoted && (
                      <Button
                        size="sm"
                        className="flex-1 h-9 text-xs bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                        asChild
                      >
                        <Link href={`/dashboard/profissional/oportunidades/${request.id}?enviar=true`}>
                          <Send className="w-3 h-3 mr-1" />
                          Orcamento
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* My Jobs */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-navy-900">Meus Trabalhos</h2>
            <Link href="/dashboard/profissional/trabalhos" className="text-sm font-medium text-mustard-600">
              Ver todos
            </Link>
          </div>

          {myJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FileText className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="font-semibold text-navy-900 text-sm mb-1">Nenhum trabalho</h3>
              <p className="text-xs text-gray-500">
                Envie orcamentos para conseguir trabalhos
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {myJobs.slice(0, 2).map((job) => {
                const statusConfig = getStatusConfig(job.status)
                const StatusIcon = statusConfig.icon

                return (
                  <Link
                    key={job.id}
                    href={`/dashboard/profissional/trabalhos/${job.id}`}
                    className="block bg-white rounded-2xl border border-gray-100 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${statusConfig.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <StatusIcon className={`w-5 h-5 ${statusConfig.text}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-navy-900 text-sm truncate">{job.title}</h3>
                          <span className={`text-[10px] px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} font-medium whitespace-nowrap`}>
                            {statusConfig.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.city}
                          </span>
                          {job.client && (
                            <span className="truncate">
                              {job.client.user.name}
                            </span>
                          )}
                        </div>
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Tips Banner */}
        <div className="px-4 mb-4">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600"
              alt="Dicas"
              className="w-full h-32 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center p-5">
              <div>
                <span className="text-[10px] font-semibold text-mustard-400 uppercase tracking-wider">Dica do Dia</span>
                <h3 className="text-base font-bold text-white mb-2">
                  Responda em menos de 1h!
                </h3>
                <p className="text-xs text-gray-300">
                  3x mais chances de fechar negocio
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
          <div className="flex items-center justify-around">
            <Link href="/dashboard/profissional" className="flex flex-col items-center gap-1 py-2 px-3 text-mustard-600">
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs font-medium">Inicio</span>
            </Link>
            <Link href="/dashboard/profissional/oportunidades" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400 relative">
              <Target className="w-6 h-6" />
              <span className="text-xs">Oportunidades</span>
              {requests.length > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-mustard-500 rounded-full text-[10px] font-bold text-navy-900 flex items-center justify-center">
                  {requests.length}
                </span>
              )}
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

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { LoadingSpinner } from '@/components/shared'
import { getApiUrl } from '@/lib/api'
import {
  Plus,
  Clock,
  CheckCircle,
  FileText,
  ChevronRight,
  MapPin,
  Star,
  DollarSign,
  XCircle,
  TrendingUp,
  Calendar,
  Zap,
  Droplets,
  Paintbrush,
  Wind,
  SprayCan,
  Wrench,
  Search,
  ArrowRight,
  Shield,
  Award,
  Users,
  Hammer,
  Truck,
  Home as HomeIcon,
  Compass,
  User,
  Bell,
  Heart,
  ArrowUpRight,
  MessageSquare,
  Briefcase,
  ThumbsUp,
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
  createdAt: string
}

interface Category {
  id: string
  name: string
  icon: any
  count: number
  image: string
  color: string
}

export default function ClienteDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  })

  const featuredPros = [
    {
      id: '1',
      name: 'Joao Silva',
      category: 'Eletricista',
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600',
      verified: true,
      available: true,
      price: 'R$ 150',
      responseTime: 15,
      completedJobs: 89,
    },
    {
      id: '2',
      name: 'Maria Santos',
      category: 'Encanadora',
      rating: 5.0,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600',
      verified: true,
      available: true,
      price: 'R$ 120',
      responseTime: 10,
      completedJobs: 65,
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      category: 'Pintor',
      rating: 4.8,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600',
      verified: true,
      available: false,
      price: 'R$ 80/m2',
      responseTime: 20,
      completedJobs: 156,
    },
    {
      id: '4',
      name: 'Ana Costa',
      category: 'Limpeza',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600',
      verified: true,
      available: true,
      price: 'R$ 100',
      responseTime: 12,
      completedJobs: 112,
    },
  ]

  const categories: Category[] = [
    { id: 'eletrica', name: 'Eletricista', icon: Zap, count: 48, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', color: 'from-amber-500 to-orange-600' },
    { id: 'hidraulica', name: 'Encanador', icon: Droplets, count: 35, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400', color: 'from-blue-500 to-cyan-600' },
    { id: 'pintura', name: 'Pintor', icon: Paintbrush, count: 29, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400', color: 'from-orange-500 to-red-600' },
    { id: 'ar-condicionado', name: 'Ar Cond.', icon: Wind, count: 22, image: 'https://plus.unsplash.com/premium_photo-1682126012378-859ca7a9f4cf?w=400', color: 'from-cyan-500 to-blue-600' },
    { id: 'limpeza', name: 'Limpeza', icon: SprayCan, count: 67, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', color: 'from-violet-500 to-purple-600' },
    { id: 'montagem', name: 'Montador', icon: Wrench, count: 41, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400', color: 'from-slate-500 to-gray-600' },
  ]

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const user = JSON.parse(userData)
      setUserName(user.name?.split(' ')[0] || 'Usuario')
    }
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(getApiUrl('/api/service-requests'), {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        const reqs = data.data.requests || []
        setRequests(reqs)
        setStats({
          total: reqs.length,
          pending: reqs.filter((r: ServiceRequest) => r.status === 'PENDING').length,
          inProgress: reqs.filter((r: ServiceRequest) => r.status === 'IN_PROGRESS').length,
          completed: reqs.filter((r: ServiceRequest) => r.status === 'COMPLETED').length,
        })
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { bg: string; text: string; icon: any; label: string }> = {
      'PENDING': { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock, label: 'Aguardando' },
      'IN_PROGRESS': { bg: 'bg-blue-100', text: 'text-blue-700', icon: TrendingUp, label: 'Em andamento' },
      'COMPLETED': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle, label: 'Concluido' },
      'CANCELLED': { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'Cancelado' },
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
              <p className="text-sm font-medium text-gray-400 mb-2">{getGreeting()}, {userName}</p>
              <h1 className="text-3xl font-bold text-white mb-3">
                O que voce precisa hoje?
              </h1>
              <p className="text-gray-300 mb-6">
                Encontre profissionais qualificados para qualquer tipo de servico residencial ou comercial.
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
              <div className="flex gap-4">
                <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                  <Link href="/solicitar-servico">
                    <Plus className="w-5 h-5 mr-2" />
                    Novo Pedido
                  </Link>
                </Button>
                <Button asChild className="bg-white/10 border border-white/30 text-white hover:bg-white/20">
                  <Link href="/explorar">
                    <Search className="w-5 h-5 mr-2" />
                    Explorar
                  </Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600"
              alt="Profissional"
              width={600}
              height={400}
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30"
            />
          </div>

          {/* Categories Grid with Images */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-navy-900">Categorias Populares</h2>
              <Link href="/explorar" className="text-sm font-medium text-mustard-600 hover:text-mustard-700 flex items-center gap-1">
                Ver todas <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/explorar?categoria=${cat.id}`}
                  className="group relative overflow-hidden rounded-2xl aspect-square"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                      <cat.icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-white font-semibold text-center">{cat.name}</p>
                    <p className="text-gray-300 text-xs">{cat.count} profissionais</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Main Content - 2 columns */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Requests */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 className="font-bold text-navy-900 text-lg">Meus Pedidos</h2>
                  <Link href="/dashboard/cliente/pedidos" className="text-sm font-medium text-mustard-600 flex items-center gap-1 hover:text-mustard-700">
                    Ver todos <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {requests.length === 0 ? (
                  <div className="text-center py-16 px-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-navy-900 text-lg mb-2">Nenhum pedido ainda</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                      Solicite seu primeiro servico e receba orcamentos de profissionais qualificados em minutos
                    </p>
                    <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                      <Link href="/solicitar-servico">
                        <Plus className="w-4 h-4 mr-2" />
                        Solicitar Servico
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {requests.slice(0, 4).map((request) => {
                      const statusConfig = getStatusConfig(request.status)
                      const StatusIcon = statusConfig.icon
                      const quotesCount = request.quotes?.length || 0

                      return (
                        <Link
                          key={request.id}
                          href={`/dashboard/cliente/pedidos/${request.id}`}
                          className="block p-5 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 ${statusConfig.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                              <StatusIcon className={`w-7 h-7 ${statusConfig.text}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <h3 className="font-semibold text-navy-900 group-hover:text-mustard-600 transition-colors">{request.title}</h3>
                                <span className={`text-xs px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.text} font-medium whitespace-nowrap`}>
                                  {statusConfig.label}
                                </span>
                              </div>

                              <p className="text-sm text-gray-500 mb-3 line-clamp-1">{request.description}</p>

                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-4 h-4" />
                                  {request.city}, {request.state}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(request.createdAt)}
                                </span>
                                {quotesCount > 0 && (
                                  <span className="flex items-center gap-1.5 text-mustard-600 font-medium">
                                    <DollarSign className="w-4 h-4" />
                                    {quotesCount} orcamento{quotesCount !== 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-mustard-500 transition-colors" />
                          </div>

                          {request.status === 'PENDING' && quotesCount > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                              <span className="text-sm text-navy-600 font-medium">Ver orcamentos disponiveis</span>
                              <div className="flex items-center gap-2 bg-mustard-100 px-3 py-1.5 rounded-full">
                                <span className="w-2 h-2 bg-mustard-500 rounded-full animate-pulse" />
                                <span className="text-xs font-semibold text-mustard-700">Novo</span>
                              </div>
                            </div>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Featured Professionals with Cover Images */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <h2 className="font-bold text-navy-900 text-lg">Profissionais em Destaque</h2>
                  <Link href="/explorar" className="text-sm font-medium text-mustard-600 flex items-center gap-1 hover:text-mustard-700">
                    Ver todos <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-5 p-5">
                  {featuredPros.map((pro) => (
                    <Link
                      key={pro.id}
                      href={`/profissional/${pro.id}`}
                      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-mustard-400 hover:shadow-xl transition-all duration-300"
                    >
                      {/* Cover Image with Gradient Overlay */}
                      <div className="relative h-36 overflow-hidden">
                        <Image
                          src={pro.coverImage}
                          alt={pro.category}
                          fill
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          {pro.verified && (
                            <span className="flex items-center gap-1 text-xs px-2.5 py-1 bg-green-500 text-white rounded-full font-medium shadow-lg">
                              <Shield className="w-3 h-3" />
                              Verificado
                            </span>
                          )}
                          {pro.available ? (
                            <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white/90 backdrop-blur-sm text-green-700 rounded-full font-medium ml-auto">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              Online
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-600 rounded-full font-medium ml-auto">
                              <span className="w-2 h-2 bg-gray-400 rounded-full" />
                              Offline
                            </span>
                          )}
                        </div>

                        {/* Rating Badge on Image */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-lg">
                          <Star className="w-4 h-4 fill-mustard-500 text-mustard-500" />
                          <span className="font-bold text-navy-900">{pro.rating}</span>
                          <span className="text-xs text-gray-500">({pro.reviews})</span>
                        </div>
                      </div>

                      {/* Profile Section */}
                      <div className="relative px-4 pt-3 pb-4 bg-white">
                        {/* Avatar positioned above */}
                        <div className="absolute -top-8 left-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border-4 border-white shadow-xl">
                            <Image
                              src={pro.image}
                              alt={pro.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Name and Category - with padding for avatar */}
                        <div className="pt-10 mb-3">
                          <h3 className="font-bold text-navy-900 text-lg group-hover:text-mustard-600 transition-colors">{pro.name}</h3>
                          <p className="text-sm text-gray-500">{pro.category}</p>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-xl mb-3">
                          <div className="text-center">
                            <p className="text-lg font-bold text-navy-900">{pro.completedJobs}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Servicos</p>
                          </div>
                          <div className="w-px h-8 bg-gray-200" />
                          <div className="text-center">
                            <p className="text-lg font-bold text-navy-900">{pro.responseTime}min</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">Resposta</p>
                          </div>
                          <div className="w-px h-8 bg-gray-200" />
                          <div className="text-center">
                            <p className="text-lg font-bold text-mustard-600">{pro.price}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-wide">A partir</p>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button className="w-full py-2.5 bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium rounded-xl group-hover:bg-mustard-500 group-hover:text-navy-900 transition-all duration-300 flex items-center justify-center gap-2">
                          Ver Perfil
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-bold text-navy-900 mb-4">Acoes Rapidas</h3>
                <div className="space-y-3">
                  <Link
                    href="/solicitar-servico"
                    className="flex items-center gap-4 p-4 bg-mustard-50 hover:bg-mustard-100 rounded-xl transition-colors group"
                  >
                    <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="w-6 h-6 text-navy-900" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">Novo Pedido</p>
                      <p className="text-xs text-gray-500">Solicite um servico</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </Link>

                  <Link
                    href="/explorar"
                    className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                  >
                    <div className="w-12 h-12 bg-navy-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">Explorar</p>
                      <p className="text-xs text-gray-500">Encontre profissionais</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </Link>

                  <Link
                    href="/dashboard/cliente/mensagens"
                    className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy-900">Mensagens</p>
                      <p className="text-xs text-gray-500">Converse com profissionais</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                  </Link>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-gradient-to-br from-navy-600 to-navy-700 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-mustard-400" />
                  <span className="font-bold">Dica do Dia</span>
                </div>
                <h3 className="font-semibold text-lg mb-3">
                  Como escolher o melhor profissional?
                </h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Verifique as avaliacoes e comentarios
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Compare pelo menos 3 orcamentos
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    Prefira profissionais verificados
                  </li>
                </ul>
              </div>

              {/* Promo Banner */}
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
                  alt="Promocao"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs font-semibold text-mustard-400 uppercase tracking-wider">Oferta Especial</span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Primeira contratacao com 10% OFF
                  </h3>
                  <Button size="sm" className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                    Usar Cupom
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT ==================== */}
      <div className="lg:hidden pb-24">
        {/* Mobile Hero with Background Image */}
        <div className="relative">
          {/* Background Image */}
          <div className="absolute inset-0 h-64">
            <Image
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop"
              alt=""
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/70 to-gray-50" />
          </div>

          {/* Header */}
          <header className="relative z-10 px-5 pt-4 pb-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-white/70">{getGreeting()}</p>
              <p className="font-bold text-white text-lg">{userName}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-white/80 hover:bg-white/10 rounded-xl">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-navy-900" />
              </button>
              <div className="w-10 h-10 bg-mustard-500 rounded-xl flex items-center justify-center text-navy-900 font-bold shadow-lg">
                {userName.charAt(0)}
              </div>
            </div>
          </header>

          {/* Search */}
          <div className="relative z-10 px-5 mb-4">
            <Link href="/explorar" className="block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <div className="pl-12 pr-4 h-14 bg-white rounded-2xl text-gray-400 text-sm flex items-center shadow-lg">
                  Buscar servico ou profissional...
                </div>
              </div>
            </Link>
          </div>

          {/* Stats Cards - Floating */}
          <div className="relative z-10 px-5 pb-4">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
              <div className="flex-shrink-0 w-[85px] bg-white/95 backdrop-blur-sm rounded-2xl p-3 text-center shadow-lg">
                <div className="w-9 h-9 bg-navy-100 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                  <FileText className="w-4 h-4 text-navy-600" />
                </div>
                <p className="text-xl font-bold text-navy-900">{stats.total}</p>
                <p className="text-[10px] text-gray-500">Total</p>
              </div>
              <div className="flex-shrink-0 w-[85px] bg-white/95 backdrop-blur-sm rounded-2xl p-3 text-center shadow-lg">
                <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <p className="text-xl font-bold text-navy-900">{stats.pending}</p>
                <p className="text-[10px] text-gray-500">Aguardando</p>
              </div>
              <div className="flex-shrink-0 w-[85px] bg-white/95 backdrop-blur-sm rounded-2xl p-3 text-center shadow-lg">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xl font-bold text-navy-900">{stats.inProgress}</p>
                <p className="text-[10px] text-gray-500">Ativos</p>
              </div>
              <div className="flex-shrink-0 w-[85px] bg-white/95 backdrop-blur-sm rounded-2xl p-3 text-center shadow-lg">
                <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xl font-bold text-navy-900">{stats.completed}</p>
                <p className="text-[10px] text-gray-500">Concluidos</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner - More Visual */}
        <div className="px-5 mb-5">
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=300&fit=crop"
              alt=""
              width={600}
              height={300}
              className="w-full h-36 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-mustard-400" />
                <span className="text-xs font-medium text-mustard-400">Rapido e facil</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Precisa de um profissional?
              </h3>
              <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 w-fit h-11 px-5 rounded-xl">
                <Link href="/solicitar-servico">
                  <Plus className="w-5 h-5 mr-2" />
                  Novo Pedido
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Scroll - Improved */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3 px-5">
            <h2 className="font-bold text-navy-900">Categorias</h2>
            <Link href="/explorar" className="text-sm font-medium text-mustard-600">
              Ver todas
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 px-5 scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/explorar?categoria=${cat.id}`}
                className="flex-shrink-0 relative w-28 h-32 rounded-2xl overflow-hidden group shadow-md"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-2 shadow-lg`}>
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-white text-center">{cat.name}</span>
                  <span className="text-[10px] text-white/70">{cat.count} pros</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Requests - Improved */}
        <div className="px-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-navy-900">Meus Pedidos</h2>
            <Link href="/dashboard/cliente/pedidos" className="text-sm font-medium text-mustard-600">
              Ver todos
            </Link>
          </div>

          {requests.length === 0 ? (
            <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <Image
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
                  alt=""
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative p-8 text-center">
                <div className="w-16 h-16 bg-mustard-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-mustard-600" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2">Nenhum pedido ainda</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Solicite seu primeiro servico e receba orcamentos
                </p>
                <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 h-12 px-6 rounded-xl">
                  <Link href="/solicitar-servico">
                    <Plus className="w-5 h-5 mr-2" />
                    Criar Pedido
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {requests.slice(0, 3).map((request) => {
                const statusConfig = getStatusConfig(request.status)
                const StatusIcon = statusConfig.icon
                const quotesCount = request.quotes?.length || 0

                return (
                  <Link
                    key={request.id}
                    href={`/dashboard/cliente/pedidos/${request.id}`}
                    className="block bg-white rounded-2xl border border-gray-100 p-4 shadow-sm active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 ${statusConfig.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <StatusIcon className={`w-6 h-6 ${statusConfig.text}`} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-navy-900 text-sm truncate">{request.title}</h3>
                          <span className={`text-[10px] px-2 py-1 rounded-full ${statusConfig.bg} ${statusConfig.text} font-medium whitespace-nowrap`}>
                            {statusConfig.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {request.city}
                          </span>
                          <span>{formatDate(request.createdAt)}</span>
                        </div>

                        {quotesCount > 0 && (
                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs text-mustard-600 font-medium">
                              {quotesCount} orcamento{quotesCount !== 1 ? 's' : ''}
                            </span>
                            {request.status === 'PENDING' && (
                              <span className="w-2 h-2 bg-mustard-500 rounded-full animate-pulse" />
                            )}
                          </div>
                        )}
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        {/* Featured Professionals - Improved */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3 px-5">
            <h2 className="font-bold text-navy-900">Profissionais em Destaque</h2>
            <Link href="/explorar" className="text-sm font-medium text-mustard-600">
              Ver todos
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 px-5 scrollbar-hide">
            {featuredPros.map((pro) => (
              <Link
                key={pro.id}
                href={`/profissional/${pro.id}`}
                className="flex-shrink-0 w-56 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm active:scale-[0.98] transition-transform"
              >
                {/* Cover Image */}
                <div className="h-24 overflow-hidden relative">
                  <Image
                    src={pro.coverImage}
                    alt={pro.category}
                    fill
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/30 to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    {pro.available ? (
                      <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-green-500/90 backdrop-blur-sm text-white rounded-full font-medium">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        Online
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] px-2 py-1 bg-gray-500/90 backdrop-blur-sm text-white rounded-full font-medium">
                        Offline
                      </span>
                    )}
                  </div>

                  {/* Rating on Cover */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg shadow">
                    <Star className="w-3.5 h-3.5 fill-mustard-500 text-mustard-500" />
                    <span className="text-xs font-bold text-navy-900">{pro.rating}</span>
                  </div>
                </div>

                {/* Profile Section */}
                <div className="p-4 -mt-8 relative">
                  <div className="flex items-end gap-2 mb-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={pro.image}
                        alt={pro.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {pro.verified && (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mb-1">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold text-navy-900 truncate">{pro.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{pro.category}</p>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between py-2 px-2 bg-gray-50 rounded-xl text-center">
                    <div>
                      <p className="text-sm font-bold text-navy-900">{pro.completedJobs}</p>
                      <p className="text-[9px] text-gray-500">Servicos</p>
                    </div>
                    <div className="w-px h-6 bg-gray-200" />
                    <div>
                      <p className="text-sm font-bold text-navy-900">{pro.responseTime}min</p>
                      <p className="text-[9px] text-gray-500">Resposta</p>
                    </div>
                    <div className="w-px h-6 bg-gray-200" />
                    <div>
                      <p className="text-sm font-bold text-mustard-600">{pro.price}</p>
                      <p className="text-[9px] text-gray-500">A partir</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Promo Banner - Improved */}
        <div className="px-5 mb-6">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&h=300&fit=crop"
              alt="Promocao"
              width={600}
              height={300}
              className="w-full h-36 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-transparent" />
            <div className="absolute inset-0 flex items-center p-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-mustard-400" />
                  <span className="text-[10px] font-semibold text-mustard-400 uppercase tracking-wider">Oferta Especial</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  10% OFF na primeira contratacao
                </h3>
                <p className="text-xs text-gray-300 mb-3">Use o cupom: PRIMEIRA10</p>
                <Button size="sm" className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 h-9 px-4 rounded-lg font-medium">
                  Copiar Cupom
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Card - Mobile Only */}
        <div className="px-5 mb-6">
          <div className="bg-gradient-to-br from-navy-600 to-navy-700 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <ThumbsUp className="w-5 h-5 text-mustard-400" />
              <span className="font-semibold text-white">Dica do Dia</span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Compare pelo menos 3 orcamentos antes de contratar. Profissionais verificados tem selo verde no perfil.
            </p>
          </div>
        </div>

        {/* Mobile Bottom Navigation - Improved */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="flex items-center justify-around">
            <Link href="/dashboard/cliente" className="flex flex-col items-center gap-0.5 py-2 px-3">
              <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                <HomeIcon className="w-5 h-5 text-mustard-600" />
              </div>
              <span className="text-[10px] font-medium text-mustard-600">Inicio</span>
            </Link>
            <Link href="/explorar" className="flex flex-col items-center gap-0.5 py-2 px-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <Compass className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400">Explorar</span>
            </Link>
            <Link href="/solicitar-servico" className="flex flex-col items-center py-2 px-3">
              <div className="w-14 h-14 bg-mustard-500 rounded-2xl flex items-center justify-center -mt-6 shadow-lg shadow-mustard-500/30 border-4 border-white">
                <Plus className="w-7 h-7 text-navy-900" />
              </div>
            </Link>
            <Link href="/dashboard/cliente/pedidos" className="flex flex-col items-center gap-0.5 py-2 px-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-[10px] text-gray-400">Pedidos</span>
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
    </div>
  )
}

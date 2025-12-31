'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Card, CardContent, Input } from '@/components/ui'
import { EmptyState, LoadingSpinner } from '@/components/shared'
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  Send,
  X,
  SlidersHorizontal,
  Target,
  ChevronRight,
  Filter,
  ArrowLeft,
  Briefcase,
  Calendar,
  TrendingUp,
  Users,
  Home as HomeIcon,
  MessageSquare,
  User,
  CheckCircle,
  Zap,
} from 'lucide-react'

interface ServiceRequest {
  id: string
  title: string
  description: string
  city: string
  state: string
  category?: { id: string; name: string }
  budget?: number
  createdAt: string
  hasQuoted?: boolean
  quotesCount?: number
}

interface Category {
  id: string
  name: string
}

export default function OportunidadesPage() {
  const [requests, setRequests] = useState<ServiceRequest[]>([])
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCity, setSelectedCity] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [requests, searchTerm, selectedCategory, selectedCity])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken')

      const requestsResponse = await fetch('http://localhost:3001/api/service-requests/available', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const requestsData = await requestsResponse.json()
      if (requestsData.success) {
        setRequests(requestsData.data.requests || [])
      }

      const categoriesResponse = await fetch('http://localhost:3001/api/categories')
      const categoriesData = await categoriesResponse.json()
      if (categoriesData.success) {
        setCategories(categoriesData.data || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterRequests = () => {
    let filtered = [...requests]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((r) => r.category?.id === selectedCategory)
    }

    if (selectedCity) {
      filtered = filtered.filter((r) =>
        r.city.toLowerCase().includes(selectedCity.toLowerCase())
      )
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term)
      )
    }

    setFilteredRequests(filtered)
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

    if (diffHours < 1) return 'Agora mesmo'
    if (diffHours < 24) return `Ha ${diffHours} hora${diffHours > 1 ? 's' : ''}`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return 'Ontem'
    return `Ha ${diffDays} dias`
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedCity('')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Carregando oportunidades..." />
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
                <Target className="w-6 h-6 text-mustard-400" />
                <span className="text-mustard-400 font-medium">{filteredRequests.length} oportunidades disponiveis</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">
                Encontre novos clientes
              </h1>
              <p className="text-gray-300 mb-6">
                Clientes precisando dos seus servicos estao esperando. Responda rapido e aumente suas chances de fechar negocio!
              </p>

              {/* Search Bar */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Buscar por servico ou palavra-chave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`h-12 px-6 ${showFilters ? 'bg-mustard-500 text-navy-900' : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`}
                >
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600"
              alt="Oportunidades"
              className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-20"
            />
          </div>

          {/* Filters Card */}
          {showFilters && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-navy-900 mb-2 block">
                    Categoria
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mustard-500 focus:border-transparent"
                  >
                    <option value="all">Todas as categorias</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-navy-900 mb-2 block">
                    Cidade
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Filtrar por cidade"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="pl-11 h-11"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full h-11"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="text-center py-16 px-6">
                <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-5">
                  <Target className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-semibold text-navy-900 text-lg mb-2">
                  {searchTerm || selectedCategory !== 'all' || selectedCity
                    ? 'Nenhuma oportunidade encontrada'
                    : 'Nenhuma oportunidade disponivel'}
                </h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  {searchTerm || selectedCategory !== 'all' || selectedCity
                    ? 'Tente ajustar os filtros de busca'
                    : 'Novas solicitacoes de servico aparecerao aqui'}
                </p>
                {(searchTerm || selectedCategory !== 'all' || selectedCity) && (
                  <Button onClick={clearFilters} className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                    Limpar Filtros
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-mustard-200 transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex gap-6">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-mustard-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-mustard-200 transition-colors">
                        <Target className="w-8 h-8 text-mustard-600" />
                      </div>

                      {/* Main Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-navy-900 group-hover:text-mustard-600 transition-colors">
                              {request.title}
                            </h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                {request.city}, {request.state}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {getTimeAgo(request.createdAt)}
                              </span>
                              {request.category && (
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                                  {request.category.name}
                                </span>
                              )}
                            </div>
                          </div>

                          {request.budget && (
                            <div className="text-right flex-shrink-0">
                              <p className="text-xs text-gray-500 mb-1">Orcamento estimado</p>
                              <p className="text-xl font-bold text-mustard-600">
                                {formatCurrency(request.budget)}
                              </p>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">{request.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {request.quotesCount !== undefined && request.quotesCount > 0 && (
                              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                                <Users className="w-4 h-4" />
                                {request.quotesCount} orcamento{request.quotesCount !== 1 ? 's' : ''} enviado{request.quotesCount !== 1 ? 's' : ''}
                              </span>
                            )}
                            {request.hasQuoted && (
                              <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                                <CheckCircle className="w-4 h-4" />
                                Orcamento enviado
                              </span>
                            )}
                          </div>

                          <div className="flex gap-3">
                            <Button variant="outline" asChild className="border-gray-200">
                              <Link href={`/dashboard/profissional/oportunidades/${request.id}`}>
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Detalhes
                              </Link>
                            </Button>
                            {!request.hasQuoted && (
                              <Button
                                className="bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                                asChild
                              >
                                <Link href={`/dashboard/profissional/oportunidades/${request.id}?enviar=true`}>
                                  <Send className="w-4 h-4 mr-2" />
                                  Enviar Orcamento
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
                <h1 className="font-bold text-navy-900 text-lg">Oportunidades</h1>
                <p className="text-xs text-gray-500">{filteredRequests.length} disponiveis</p>
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
                placeholder="Buscar oportunidades..."
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
            <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm"
              >
                <option value="all">Todas as categorias</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Filtrar por cidade"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="pl-9 h-10 text-sm"
                />
              </div>
              {(searchTerm || selectedCategory !== 'all' || selectedCity) && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                  Limpar Filtros
                </Button>
              )}
            </div>
          )}
        </header>

        {/* Tip Banner */}
        <div className="px-4 py-4">
          <div className="bg-navy-600 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-mustard-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-navy-900" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Responda rapido!</p>
              <p className="text-xs text-gray-300">Profissionais que respondem em menos de 1h tem 3x mais chances</p>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="px-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">
                {searchTerm || selectedCategory !== 'all' || selectedCity
                  ? 'Nenhuma oportunidade encontrada'
                  : 'Nenhuma oportunidade'}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {searchTerm || selectedCategory !== 'all' || selectedCity
                  ? 'Tente ajustar os filtros'
                  : 'Novas solicitacoes aparecerao aqui'}
              </p>
              {(searchTerm || selectedCategory !== 'all' || selectedCity) && (
                <Button size="sm" onClick={clearFilters} className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                  Limpar Filtros
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-mustard-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Target className="w-6 h-6 text-mustard-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-navy-900 text-sm">{request.title}</h3>
                          {request.budget && (
                            <span className="text-xs font-bold text-mustard-600 whitespace-nowrap">
                              {formatCurrency(request.budget)}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {request.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getTimeAgo(request.createdAt)}
                          </span>
                        </div>

                        {request.category && (
                          <span className="inline-block px-2 py-0.5 bg-gray-100 rounded-full text-[10px] font-medium text-gray-600">
                            {request.category.name}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{request.description}</p>

                    {request.hasQuoted ? (
                      <div className="flex items-center justify-center gap-2 py-2 bg-emerald-50 rounded-xl text-sm font-medium text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                        Orcamento enviado
                      </div>
                    ) : (
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
                      </div>
                    )}
                  </div>
                </div>
              ))}
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

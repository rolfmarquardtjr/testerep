'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Input } from '@/components/ui'
import {
  Search,
  MapPin,
  Filter,
  X,
  Star,
  Shield,
  Clock,
  ChevronRight,
  Zap,
  Wrench,
  Droplets,
  Paintbrush,
  Wind,
  SprayCan,
  Home as HomeIcon,
  Compass,
  User,
  FileText,
  SlidersHorizontal,
  Grid,
  List,
  Heart,
  MessageSquare,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react'

interface Professional {
  id: string
  bio: string
  rating: number
  totalReviews: number
  completedJobs: number
  responseTime: number
  verified: boolean
  priceRange: string
  categories: { id: string; name: string }[]
  user: {
    id: string
    name: string
    avatar?: string
    city?: string
    state?: string
  }
}

interface Category {
  id: string
  name: string
  icon: string
  count: number
  image: string
}

export default function ExplorarPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const categories: Category[] = [
    { id: 'eletrica', name: 'Eletricista', icon: 'zap', count: 48, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400' },
    { id: 'hidraulica', name: 'Encanador', icon: 'droplets', count: 35, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400' },
    { id: 'pintura', name: 'Pintor', icon: 'paintbrush', count: 29, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400' },
    { id: 'ar-condicionado', name: 'Ar Condicionado', icon: 'wind', count: 22, image: 'https://plus.unsplash.com/premium_photo-1682126012378-859ca7a9f4cf?w=400' },
    { id: 'limpeza', name: 'Limpeza', icon: 'sprayCan', count: 67, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' },
    { id: 'montagem', name: 'Montador', icon: 'wrench', count: 41, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400' },
  ]

  const getCategoryIcon = (iconName: string, size = 6) => {
    const className = `w-${size} h-${size}`
    const icons: Record<string, React.ReactNode> = {
      'zap': <Zap className={className} />,
      'droplets': <Droplets className={className} />,
      'paintbrush': <Paintbrush className={className} />,
      'wind': <Wind className={className} />,
      'sprayCan': <SprayCan className={className} />,
      'wrench': <Wrench className={className} />,
    }
    return icons[iconName] || <Wrench className={className} />
  }

  useEffect(() => {
    fetchProfessionals()
  }, [])

  const fetchProfessionals = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/professionals')
      const data = await response.json()
      if (data.success) {
        setProfessionals(data.data.professionals || [])
      }
    } catch (error) {
      console.error('Error fetching professionals:', error)
      setProfessionals([
        {
          id: '1',
          bio: 'Eletricista profissional com 10 anos de experiencia em instalacoes residenciais e comerciais',
          rating: 4.9,
          totalReviews: 127,
          completedJobs: 89,
          responseTime: 15,
          verified: true,
          priceRange: 'R$ 150 - R$ 400',
          categories: [{ id: 'eletrica', name: 'Eletricista' }],
          user: { id: '1', name: 'Joao Silva', city: 'Sao Paulo', state: 'SP', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
        },
        {
          id: '2',
          bio: 'Especialista em instalacoes eletricas residenciais e prediais',
          rating: 5.0,
          totalReviews: 89,
          completedJobs: 65,
          responseTime: 10,
          verified: true,
          priceRange: 'R$ 200 - R$ 500',
          categories: [{ id: 'eletrica', name: 'Eletricista' }],
          user: { id: '2', name: 'Maria Santos', city: 'Sao Paulo', state: 'SP', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' }
        },
        {
          id: '3',
          bio: 'Encanador 24h, atendimento de emergencia e manutencao preventiva',
          rating: 4.7,
          totalReviews: 203,
          completedJobs: 156,
          responseTime: 20,
          verified: true,
          priceRange: 'R$ 120 - R$ 350',
          categories: [{ id: 'hidraulica', name: 'Encanador' }],
          user: { id: '3', name: 'Carlos Oliveira', city: 'Sao Paulo', state: 'SP', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }
        },
        {
          id: '4',
          bio: 'Pintor residencial e comercial com acabamento impecavel',
          rating: 4.8,
          totalReviews: 45,
          completedJobs: 32,
          responseTime: 30,
          verified: false,
          priceRange: 'R$ 25/m2',
          categories: [{ id: 'pintura', name: 'Pintor' }],
          user: { id: '4', name: 'Pedro Costa', city: 'Sao Paulo', state: 'SP', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' }
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredProfessionals = professionals.filter((pro) => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const matchesName = pro.user.name.toLowerCase().includes(term)
      const matchesBio = pro.bio?.toLowerCase().includes(term)
      const matchesCategory = pro.categories.some((c) =>
        c.name.toLowerCase().includes(term)
      )
      if (!matchesName && !matchesBio && !matchesCategory) return false
    }

    if (selectedCategory) {
      if (!pro.categories.some((c) => c.id === selectedCategory)) return false
    }

    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Hero Section */}
          <div className="bg-navy-900 rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800 to-transparent" />
            <div className="relative z-10 max-w-lg">
              <h1 className="text-3xl font-bold text-white mb-3">
                Encontre o profissional ideal
              </h1>
              <p className="text-gray-300 mb-6">
                Mais de 1.000 profissionais verificados prontos para atender voce
              </p>
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar servico ou profissional..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 h-12 bg-white border-0 rounded-xl text-base w-full"
                />
              </div>
              <Button className="bg-mustard-500 hover:bg-mustard-600 text-navy-900" asChild>
                <Link href="/solicitar-servico">
                  Solicitar Orcamento
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600"
              alt="Profissional"
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30"
            />
          </div>

          {/* Categories Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-navy-900">Categorias</h2>
              <button className="text-sm text-mustard-600 hover:text-mustard-700 font-medium">
                Ver todas
              </button>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                  className={`relative group overflow-hidden rounded-2xl aspect-square transition-all ${
                    selectedCategory === cat.id ? 'ring-2 ring-mustard-500 ring-offset-2' : ''
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-semibold text-sm">{cat.name}</p>
                    <p className="text-gray-300 text-xs">{cat.count} profissionais</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Results Section */}
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <h3 className="font-semibold text-navy-900 mb-4">Filtros</h3>

                {/* Ordenar */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Ordenar por</label>
                  <select className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm">
                    <option>Relevancia</option>
                    <option>Melhor avaliacao</option>
                    <option>Menor preco</option>
                    <option>Mais proximos</option>
                  </select>
                </div>

                {/* Verificado */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-mustard-500 focus:ring-mustard-500" />
                    <span className="text-sm text-gray-700">Apenas verificados</span>
                  </label>
                </div>

                {/* Avaliacao */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Avaliacao minima</label>
                  <div className="flex gap-2">
                    {[4, 4.5, 5].map((rating) => (
                      <button
                        key={rating}
                        className="flex items-center gap-1 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-mustard-500 hover:bg-mustard-50 transition-colors"
                      >
                        <Star className="w-4 h-4 fill-mustard-500 text-mustard-500" />
                        {rating}+
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preco */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Faixa de preco</label>
                  <div className="space-y-2">
                    {['Ate R$ 100', 'R$ 100 - R$ 300', 'R$ 300+'].map((price) => (
                      <label key={price} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-mustard-500 focus:ring-mustard-500" />
                        <span className="text-sm text-gray-700">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Limpar filtros
                </Button>
              </div>
            </div>

            {/* Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-navy-900">
                    {selectedCategory
                      ? categories.find(c => c.id === selectedCategory)?.name
                      : 'Todos os profissionais'
                    }
                  </h2>
                  <p className="text-sm text-gray-500">
                    {filteredProfessionals.length} resultado{filteredProfessionals.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100 text-navy-900' : 'text-gray-400'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100 text-navy-900' : 'text-gray-400'}`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Professionals Grid/List */}
              {loading ? (
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-xl" />
                        <div className="flex-1 space-y-2">
                          <div className="h-5 bg-gray-200 rounded w-3/4" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                          <div className="h-4 bg-gray-200 rounded w-2/3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProfessionals.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-navy-900 mb-2">Nenhum profissional encontrado</h3>
                  <p className="text-sm text-gray-500 mb-4">Tente buscar por outro termo ou categoria</p>
                  <Button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory(null)
                    }}
                    variant="outline"
                  >
                    Limpar filtros
                  </Button>
                </div>
              ) : (
                <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
                  {filteredProfessionals.map((pro) => (
                    <Link
                      key={pro.id}
                      href={`/profissional/${pro.id}`}
                      className={`block bg-white border border-gray-100 rounded-2xl hover:border-mustard-300 hover:shadow-lg transition-all group ${
                        viewMode === 'grid' ? 'p-4' : 'p-5'
                      }`}
                    >
                      <div className={viewMode === 'grid' ? 'flex flex-col' : 'flex gap-5'}>
                        {/* Avatar */}
                        <div className={`relative flex-shrink-0 ${viewMode === 'grid' ? 'mb-4' : ''}`}>
                          <div className={`bg-navy-100 rounded-xl overflow-hidden ${
                            viewMode === 'grid' ? 'w-full aspect-video' : 'w-24 h-24'
                          }`}>
                            {pro.user.avatar ? (
                              <img
                                src={pro.user.avatar}
                                alt={pro.user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-navy-900 text-2xl font-bold bg-mustard-100">
                                {pro.user.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          {pro.verified && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                              <CheckCircle className="w-3.5 h-3.5 text-white" />
                            </div>
                          )}
                          <button className="absolute top-2 right-2 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <Heart className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h3 className="font-semibold text-navy-900 group-hover:text-mustard-600 transition-colors">
                                {pro.user.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {pro.user.city}, {pro.user.state}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 bg-mustard-50 px-2 py-1 rounded-lg flex-shrink-0">
                              <Star className="w-4 h-4 fill-mustard-500 text-mustard-500" />
                              <span className="text-sm font-semibold text-navy-900">{pro.rating}</span>
                              <span className="text-xs text-gray-500">({pro.totalReviews})</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pro.bio}</p>

                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {pro.categories.map((cat) => (
                              <span
                                key={cat.id}
                                className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
                              >
                                {cat.name}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {pro.responseTime}min
                              </span>
                              <span>{pro.completedJobs} servicos</span>
                            </div>
                            <span className="text-sm font-bold text-navy-900">
                              {pro.priceRange || 'A combinar'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden pb-20">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-navy-900">
              Repfy
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-mustard-500" />
              <span>Sao Paulo, SP</span>
            </div>
          </div>

          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar servico ou profissional..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 h-12 bg-gray-100 border-0 rounded-xl text-base"
              />
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <SlidersHorizontal className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Categories Scroll */}
        <div className="px-4 py-4 overflow-x-auto bg-white">
          <div className="flex gap-3 min-w-max">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[80px] transition-all ${
                !selectedCategory
                  ? 'bg-mustard-500 text-navy-900'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                !selectedCategory ? 'bg-mustard-600' : 'bg-white'
              }`}>
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium">Todos</span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl min-w-[80px] transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-mustard-500 text-navy-900'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedCategory === cat.id ? 'bg-mustard-600' : 'bg-white'
                }`}>
                  {getCategoryIcon(cat.icon)}
                </div>
                <span className="text-xs font-medium">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Promo Banner */}
        <div className="px-4 mb-4">
          <div className="bg-navy-600 rounded-2xl p-4 flex items-center gap-4">
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Primeira contratacao?</h3>
              <p className="text-gray-300 text-sm">Ganhe 10% de desconto</p>
            </div>
            <Button size="sm" className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 whitespace-nowrap">
              Usar Cupom
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="px-4 mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-navy-900">
              {selectedCategory
                ? categories.find(c => c.id === selectedCategory)?.name
                : 'Profissionais'
              }
            </h2>
            <p className="text-sm text-gray-500">
              {filteredProfessionals.length} encontrado{filteredProfessionals.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        {/* Professionals List */}
        <div className="px-4 space-y-3">
          {loading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredProfessionals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-navy-900 mb-2">Nenhum profissional encontrado</h3>
              <p className="text-sm text-gray-500 mb-4">Tente buscar por outro termo</p>
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory(null)
                }}
                variant="outline"
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            filteredProfessionals.map((pro) => (
              <Link
                key={pro.id}
                href={`/profissional/${pro.id}`}
                className="block bg-white border border-gray-100 rounded-2xl p-4 hover:border-mustard-400 transition-all"
              >
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 bg-navy-100 rounded-xl overflow-hidden">
                      {pro.user.avatar ? (
                        <img
                          src={pro.user.avatar}
                          alt={pro.user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-navy-900 text-2xl font-bold bg-mustard-100">
                          {pro.user.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    {pro.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-navy-900 truncate">{pro.user.name}</h3>
                      <div className="flex items-center gap-1 bg-mustard-50 px-2 py-0.5 rounded-lg flex-shrink-0">
                        <Star className="w-3.5 h-3.5 fill-mustard-500 text-mustard-500" />
                        <span className="text-sm font-semibold text-navy-900">{pro.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-2 line-clamp-1">{pro.bio}</p>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {pro.categories.map((cat) => (
                        <span
                          key={cat.id}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {pro.responseTime}min
                        </span>
                        <span>{pro.completedJobs} servicos</span>
                      </div>
                      <span className="text-sm font-semibold text-mustard-600">
                        {pro.priceRange || 'A combinar'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* CTA Banner */}
        {!loading && filteredProfessionals.length > 0 && (
          <div className="px-4 py-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
              <h3 className="font-semibold text-navy-900 mb-2">Nao encontrou o que procura?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Crie uma solicitacao e receba orcamentos
              </p>
              <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                <Link href="/solicitar-servico">
                  Solicitar Servico
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 z-50">
          <div className="flex items-center justify-around">
            <Link href="/" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400">
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs">Inicio</span>
            </Link>
            <Link href="/explorar" className="flex flex-col items-center gap-1 py-2 px-3 text-mustard-600">
              <Compass className="w-6 h-6" />
              <span className="text-xs font-medium">Explorar</span>
            </Link>
            <Link href="/solicitar-servico" className="flex flex-col items-center gap-1 py-2 px-3">
              <div className="w-12 h-12 bg-mustard-500 rounded-full flex items-center justify-center -mt-6 shadow-lg">
                <FileText className="w-6 h-6 text-navy-900" />
              </div>
            </Link>
            <Link href="/dashboard/cliente/pedidos" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400">
              <FileText className="w-6 h-6" />
              <span className="text-xs">Pedidos</span>
            </Link>
            <Link href="/dashboard/cliente/perfil" className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400">
              <User className="w-6 h-6" />
              <span className="text-xs">Perfil</span>
            </Link>
          </div>
        </nav>

        {/* Filter Modal */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-navy-900">Filtros</h3>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-navy-900 mb-3 block">Ordenar por</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Relevancia', 'Avaliacao', 'Preco', 'Distancia'].map((option) => (
                      <button
                        key={option}
                        className="px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-mustard-500 hover:bg-mustard-50 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-medium text-navy-900">Apenas verificados</span>
                    <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow" />
                    </div>
                  </label>
                </div>

                <div>
                  <label className="text-sm font-medium text-navy-900 mb-3 block">Avaliacao minima</label>
                  <div className="flex gap-2">
                    {[4, 4.5, 5].map((rating) => (
                      <button
                        key={rating}
                        className="flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-mustard-500 hover:bg-mustard-50 transition-colors"
                      >
                        <Star className="w-4 h-4 fill-mustard-500 text-mustard-500" />
                        {rating}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-600"
                  onClick={() => setShowFilters(false)}
                >
                  Limpar
                </Button>
                <Button
                  className="flex-1 bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                  onClick={() => setShowFilters(false)}
                >
                  Aplicar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

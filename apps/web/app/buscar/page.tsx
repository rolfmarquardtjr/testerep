'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Card, CardContent, Input } from '@/components/ui'
import { LoadingSpinner, StarRating } from '@/components/shared'
import {
  Search,
  MapPin,
  Filter,
  X,
  Grid,
  List,
  Shield,
  Clock,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react'

interface Professional {
  id: string
  bio: string
  rating: number
  totalReviews: number
  completedJobs: number
  responseTime: number
  verified: boolean
  hourlyRate?: number
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
  icon?: string
  _count?: { professionals: number }
}

export default function BuscarPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('categoria') || ''

  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedCity, setSelectedCity] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'price'>('rating')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [prosRes, catsRes] = await Promise.all([
        fetch('http://localhost:3001/api/professionals'),
        fetch('http://localhost:3001/api/categories'),
      ])

      const prosData = await prosRes.json()
      const catsData = await catsRes.json()

      if (prosData.success) {
        setProfessionals(prosData.data.professionals || [])
      }
      if (catsData.success) {
        setCategories(catsData.data || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProfessionals = professionals
    .filter((pro) => {
      // Search
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        const matches =
          pro.user.name.toLowerCase().includes(term) ||
          pro.bio?.toLowerCase().includes(term) ||
          pro.categories.some((c) => c.name.toLowerCase().includes(term))
        if (!matches) return false
      }

      // Category
      if (selectedCategory) {
        if (!pro.categories.some((c) => c.id === selectedCategory)) return false
      }

      // City
      if (selectedCity) {
        if (!pro.user.city?.toLowerCase().includes(selectedCity.toLowerCase())) return false
      }

      // Rating
      if (minRating > 0) {
        if (pro.rating < minRating) return false
      }

      // Verified
      if (verifiedOnly) {
        if (!pro.verified) return false
      }

      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.totalReviews - a.totalReviews
        case 'price':
          return (a.hourlyRate || 999999) - (b.hourlyRate || 999999)
        default:
          return 0
      }
    })

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedCity('')
    setMinRating(0)
    setVerifiedOnly(false)
  }

  const hasActiveFilters =
    searchTerm || selectedCategory || selectedCity || minRating > 0 || verifiedOnly

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Buscando profissionais..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar profissionais ou servicos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg"
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

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? 'bg-mustard-50 border-mustard-300' : ''}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtros
                {hasActiveFilters && (
                  <span className="ml-2 w-2 h-2 bg-mustard-500 rounded-full" />
                )}
              </Button>

              <div className="flex border rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 ${viewMode === 'grid' ? 'bg-mustard-500 text-navy-900' : 'text-gray-500'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 ${viewMode === 'list' ? 'bg-mustard-500 text-navy-900' : 'text-gray-500'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Categoria
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mustard-500"
                  >
                    <option value="">Todas</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Cidade
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Qualquer cidade"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Avaliacao minima
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mustard-500"
                  >
                    <option value={0}>Qualquer</option>
                    <option value={3}>3+ estrelas</option>
                    <option value={4}>4+ estrelas</option>
                    <option value={4.5}>4.5+ estrelas</option>
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Ordenar por
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mustard-500"
                  >
                    <option value="rating">Melhor Avaliacao</option>
                    <option value="reviews">Mais Avaliados</option>
                    <option value="price">Menor Preco</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex items-end gap-2">
                  <label className="flex items-center gap-2 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-mustard-500 focus:ring-mustard-500"
                    />
                    <span className="text-sm text-gray-700">Verificados</span>
                  </label>
                  {hasActiveFilters && (
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Limpar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-6">
        <p className="text-gray-600 mb-4">
          {filteredProfessionals.length} profissional(is) encontrado(s)
        </p>

        {filteredProfessionals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-navy-900 mb-2">Nenhum resultado encontrado</h3>
              <p className="text-gray-500 mb-4">Tente ajustar seus filtros de busca</p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Limpar Filtros
                </Button>
              )}
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProfessionals.map((pro) => (
              <Card key={pro.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-mustard-500 flex items-center justify-center text-navy-900 font-bold text-2xl mx-auto mb-3">
                      {pro.user.avatar ? (
                        <Image
                          src={pro.user.avatar}
                          alt={pro.user.name}
                          width={80}
                          height={80}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        pro.user.name.charAt(0)
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="font-semibold text-navy-900">{pro.user.name}</h3>
                      {pro.verified && <Shield className="w-4 h-4 text-green-600" />}
                    </div>
                    <StarRating
                      value={pro.rating}
                      readonly
                      size="sm"
                      showValue
                      totalReviews={pro.totalReviews}
                    />
                  </div>

                  <div className="flex flex-wrap justify-center gap-1 mb-4">
                    {pro.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat.id}
                        className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center gap-4 text-center text-sm mb-4">
                    <div>
                      <p className="font-bold text-navy-900">{pro.completedJobs}</p>
                      <p className="text-xs text-gray-500">Trabalhos</p>
                    </div>
                    <div>
                      <p className="font-bold text-navy-900 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pro.responseTime}min
                      </p>
                      <p className="text-xs text-gray-500">Resposta</p>
                    </div>
                  </div>

                  {pro.user.city && (
                    <p className="text-sm text-gray-500 text-center mb-4 flex items-center justify-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {pro.user.city}, {pro.user.state}
                    </p>
                  )}

                  <Button
                    className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                    asChild
                  >
                    <Link href={`/profissional/${pro.id}`}>Ver Perfil</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProfessionals.map((pro) => (
              <Card key={pro.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 rounded-full bg-mustard-500 flex items-center justify-center text-navy-900 font-bold text-xl flex-shrink-0">
                        {pro.user.avatar ? (
                          <Image
                            src={pro.user.avatar}
                            alt={pro.user.name}
                            width={64}
                            height={64}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          pro.user.name.charAt(0)
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-navy-900 text-lg">
                            {pro.user.name}
                          </h3>
                          {pro.verified && <Shield className="w-4 h-4 text-green-600" />}
                        </div>
                        <StarRating
                          value={pro.rating}
                          readonly
                          size="sm"
                          showValue
                          totalReviews={pro.totalReviews}
                        />
                        <p className="text-gray-600 mt-2 line-clamp-2">
                          {pro.bio || 'Sem descricao'}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {pro.categories.map((cat) => (
                            <span
                              key={cat.id}
                              className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-700"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-4 lg:min-w-[200px]">
                      <div className="flex gap-4 text-center">
                        <div>
                          <p className="font-bold text-navy-900">{pro.completedJobs}</p>
                          <p className="text-xs text-gray-500">Trabalhos</p>
                        </div>
                        <div>
                          <p className="font-bold text-navy-900">~{pro.responseTime}min</p>
                          <p className="text-xs text-gray-500">Resposta</p>
                        </div>
                      </div>

                      {pro.user.city && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {pro.user.city}, {pro.user.state}
                        </p>
                      )}

                      <Button
                        className="bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                        asChild
                      >
                        <Link href={`/profissional/${pro.id}`}>
                          Ver Perfil
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

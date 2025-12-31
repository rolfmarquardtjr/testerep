'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Button, Card, CardContent } from '@/components/ui'
import { LoadingSpinner, StarRating } from '@/components/shared'
import {
import { getApiUrl } from '@/lib/api'
  ArrowLeft,
  MapPin,
  Clock,
  Shield,
  MessageSquare,
  Star,
  Calendar,
  Briefcase,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Dynamic import for Map
const Map = dynamic(() => import('@/components/map/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] flex items-center justify-center bg-gray-100 rounded-lg">
      <LoadingSpinner size="md" />
    </div>
  ),
})

interface PortfolioItem {
  id: string
  title: string
  description?: string
  imageUrl: string
}

interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  client: {
    user: { name: string; avatar?: string }
  }
}

interface Professional {
  id: string
  bio: string
  rating: number
  totalReviews: number
  completedJobs: number
  responseTime: number
  verified: boolean
  hourlyRate?: number
  latitude?: number
  longitude?: number
  categories: { id: string; name: string }[]
  portfolio: PortfolioItem[]
  reviews: Review[]
  user: {
    id: string
    name: string
    avatar?: string
    city?: string
    state?: string
    createdAt: string
  }
}

export default function ProfissionalPerfilPage() {
  const params = useParams()
  const router = useRouter()
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'sobre' | 'portfolio' | 'avaliacoes'>('sobre')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    fetchProfessional()
  }, [params.id])

  const fetchProfessional = async () => {
    try {
      const response = await fetch(getApiUrl('/api/professionals/${params.id}`)
      const data = await response.json()
      if (data.success) {
        setProfessional(data.data)
      }
    } catch (error) {
      console.error('Error fetching professional:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Carregando perfil..." />
      </div>
    )
  }

  if (!professional) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-navy-900 mb-2">Profissional nao encontrado</h2>
            <p className="text-gray-600 mb-4">
              O perfil que voce esta procurando nao existe ou foi removido.
            </p>
            <Button asChild>
              <Link href="/explorar">Explorar Profissionais</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-white hover:text-mustard-500"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-full bg-mustard-500 flex items-center justify-center text-navy-900 font-bold text-4xl flex-shrink-0 border-4 border-white shadow-xl">
              {professional.user.avatar ? (
                <img
                  src={professional.user.avatar}
                  alt={professional.user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                professional.user.name.charAt(0)
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl lg:text-3xl font-bold">{professional.user.name}</h1>
                {professional.verified && (
                  <span className="flex items-center gap-1 text-sm bg-green-500 text-white px-2 py-0.5 rounded-full">
                    <Shield className="w-3.5 h-3.5" />
                    Verificado
                  </span>
                )}
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-4 mt-2 text-gray-300">
                {professional.user.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {professional.user.city}, {professional.user.state}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Membro desde {formatDate(professional.user.createdAt)}
                </span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2 mt-3">
                <StarRating
                  value={professional.rating}
                  readonly
                  size="md"
                  showValue
                  totalReviews={professional.totalReviews}
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-4">
                {professional.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="px-3 py-1 bg-white/20 rounded-full text-sm"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 w-full lg:w-auto">
              <Button
                className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 min-w-[200px]"
                asChild
              >
                <Link href={`/solicitar-servico?profissional=${professional.id}`}>
                  Solicitar Orcamento
                </Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <MessageSquare className="w-4 h-4 mr-2" />
                Enviar Mensagem
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-mustard-600">{professional.completedJobs}</p>
              <p className="text-sm text-gray-500">Trabalhos Concluidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-mustard-600">{professional.rating.toFixed(1)}</p>
              <p className="text-sm text-gray-500">Avaliacao Media</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-mustard-600">~{professional.responseTime}min</p>
              <p className="text-sm text-gray-500">Tempo de Resposta</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-mustard-600">
                {professional.hourlyRate ? formatCurrency(professional.hourlyRate) : '-'}
              </p>
              <p className="text-sm text-gray-500">Valor/Hora</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('sobre')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'sobre'
                ? 'border-mustard-500 text-mustard-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Sobre
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'portfolio'
                ? 'border-mustard-500 text-mustard-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Portfolio ({professional.portfolio.length})
          </button>
          <button
            onClick={() => setActiveTab('avaliacoes')}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'avaliacoes'
                ? 'border-mustard-500 text-mustard-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Avaliacoes ({professional.totalReviews})
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'sobre' && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold text-navy-900 mb-4">Sobre</h2>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {professional.bio || 'Nenhuma descricao disponivel.'}
                  </p>
                </CardContent>
              </Card>
            )}

            {activeTab === 'portfolio' && (
              <div>
                {professional.portfolio.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="font-semibold text-navy-900 mb-2">Nenhum trabalho no portfolio</h3>
                      <p className="text-gray-500">
                        Este profissional ainda nao adicionou trabalhos ao portfolio.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {professional.portfolio.map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setSelectedImage(item.imageUrl)}
                      >
                        <div className="aspect-video bg-gray-100">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-navy-900">{item.title}</h3>
                          {item.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                              {item.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'avaliacoes' && (
              <div className="space-y-4">
                {professional.reviews.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="font-semibold text-navy-900 mb-2">Nenhuma avaliacao ainda</h3>
                      <p className="text-gray-500">
                        Este profissional ainda nao recebeu avaliacoes.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  professional.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold flex-shrink-0">
                            {review.client.user.avatar ? (
                              <img
                                src={review.client.user.avatar}
                                alt={review.client.user.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              review.client.user.name.charAt(0)
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-navy-900">
                                {review.client.user.name}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {formatDate(review.createdAt)}
                              </span>
                            </div>
                            <StarRating value={review.rating} readonly size="sm" />
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Map */}
            {professional.latitude && professional.longitude && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-navy-900 mb-3">Localizacao</h3>
                  <Map
                    center={[professional.latitude, professional.longitude]}
                    zoom={14}
                    markers={[
                      {
                        id: professional.id,
                        position: [professional.latitude, professional.longitude],
                        type: 'professional',
                        title: professional.user.name,
                      },
                    ]}
                    className="h-[200px] rounded-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {professional.user.city}, {professional.user.state}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Contact */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-navy-900 mb-3">Entre em Contato</h3>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                    asChild
                  >
                    <Link href={`/solicitar-servico?profissional=${professional.id}`}>
                      Solicitar Orcamento
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <span className="sr-only">Fechar</span>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Portfolio"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

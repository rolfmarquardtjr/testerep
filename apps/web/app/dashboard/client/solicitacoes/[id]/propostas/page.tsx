'use client'

import { Button } from '@/components/ui'
import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Shield,
  MessageSquare,
  Check,
  Award,
  TrendingDown,
  ChevronRight,
  X
} from 'lucide-react'

interface Proposal {
  id: string
  professionalId: string
  professionalName: string
  professionalPhoto: string
  rating: number
  reviewsCount: number
  completedJobs: number
  price: number
  timeline: string
  description: string
  whatsIncluded: string[]
  warranty: string
  badges: string[]
  responseTime: string
  distance: string
  verified: boolean
}

export default function PropostasPage() {
  const params = useParams()
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState<string | null>(null)

  // Mock data
  const serviceRequest = {
    id: params.id,
    category: 'Instalacao Eletrica',
    description: 'Preciso instalar 5 tomadas na sala e 3 no quarto',
    location: 'Sao Paulo, SP',
  }

  const proposals: Proposal[] = [
    {
      id: '1',
      professionalId: 'prof1',
      professionalName: 'Joao Eletricista',
      professionalPhoto: '',
      rating: 4.9,
      reviewsCount: 127,
      completedJobs: 89,
      price: 280,
      timeline: '2-3 dias',
      description: 'Vou fazer a instalacao completa de todas as tomadas com material de primeira qualidade. Trabalho com normas da ABNT.',
      whatsIncluded: ['Mao de obra completa', 'Tomadas padrao brasileiro', 'Teste de funcionamento', 'Limpeza do local'],
      warranty: '6 meses',
      badges: ['Top Profissional'],
      responseTime: '15 min',
      distance: '3.2 km',
      verified: true
    },
    {
      id: '2',
      professionalId: 'prof2',
      professionalName: 'Maria Eletrica Pro',
      professionalPhoto: '',
      rating: 5.0,
      reviewsCount: 89,
      completedJobs: 65,
      price: 320,
      timeline: '1 dia',
      description: 'Servico premium com material de alta qualidade e certificacao. Experiencia de 10 anos no mercado.',
      whatsIncluded: ['Mao de obra especializada', 'Tomadas premium Tramontina', 'Certificado de conformidade', 'Garantia estendida'],
      warranty: '1 ano',
      badges: ['Premium', 'Verificado'],
      responseTime: '5 min',
      distance: '5.8 km',
      verified: true
    },
    {
      id: '3',
      professionalId: 'prof3',
      professionalName: 'Carlos Instalacoes',
      professionalPhoto: '',
      rating: 4.7,
      reviewsCount: 203,
      completedJobs: 156,
      price: 220,
      timeline: '3-4 dias',
      description: 'Trabalho com instalacoes eletricas ha 15 anos. Preco justo e qualidade garantida.',
      whatsIncluded: ['Instalacao completa', 'Material basico incluso', 'Garantia padrao'],
      warranty: '3 meses',
      badges: [],
      responseTime: '30 min',
      distance: '7.1 km',
      verified: false
    },
  ]

  const lowestPrice = Math.min(...proposals.map(p => p.price))
  const highestRating = Math.max(...proposals.map(p => p.rating))

  const selectedProposalData = proposals.find(p => p.id === selectedProposal)

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <Link
              href="/dashboard/client/solicitacoes"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full"
            >
              <ArrowLeft className="w-5 h-5 text-navy-600" />
            </Link>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-navy-600">{serviceRequest.category}</h1>
              <p className="text-xs text-gray-500">{proposals.length} propostas recebidas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Proposals List */}
      <div className="px-4 py-4 space-y-3">
        {proposals.map((proposal, index) => {
          const isLowestPrice = proposal.price === lowestPrice
          const isHighestRating = proposal.rating === highestRating

          return (
            <div
              key={proposal.id}
              className={`bg-white rounded-2xl border-2 overflow-hidden transition-all ${
                selectedProposal === proposal.id
                  ? 'border-mustard-500 shadow-lg'
                  : 'border-gray-200'
              }`}
            >
              {/* Professional Info */}
              <div className="p-4">
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 bg-navy-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                      {proposal.professionalName.charAt(0)}
                    </div>
                    {proposal.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Shield className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-navy-600 truncate">{proposal.professionalName}</h3>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-navy-600">R$ {proposal.price}</p>
                        {isLowestPrice && (
                          <div className="flex items-center gap-1 text-green-600">
                            <TrendingDown className="w-3 h-3" />
                            <span className="text-[10px] font-medium">Menor preco</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 bg-mustard-50 px-2 py-0.5 rounded-md">
                        <Star className="w-3 h-3 fill-mustard-500 text-mustard-500" />
                        <span className="text-xs font-semibold text-navy-600">{proposal.rating}</span>
                        <span className="text-[10px] text-gray-500">({proposal.reviewsCount})</span>
                      </div>
                      {isHighestRating && (
                        <div className="flex items-center gap-1 text-mustard-600">
                          <Award className="w-3 h-3" />
                          <span className="text-[10px] font-medium">Top</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {proposal.timeline}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {proposal.distance}
                      </span>
                      <span>{proposal.completedJobs} servicos</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                {proposal.badges.length > 0 && (
                  <div className="flex gap-1.5 mt-3">
                    {proposal.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2 py-0.5 bg-mustard-100 text-mustard-700 rounded-full text-[10px] font-medium"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Included Preview */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1.5">
                    {proposal.whatsIncluded.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex items-center gap-1 text-xs text-gray-600">
                        <Check className="w-3 h-3 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                    {proposal.whatsIncluded.length > 2 && (
                      <span className="text-xs text-gray-500">
                        +{proposal.whatsIncluded.length - 2} mais
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-navy-300 text-navy-600"
                    onClick={() => setShowDetails(proposal.id)}
                  >
                    Ver mais
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setSelectedProposal(proposal.id)}
                    className={`flex-1 ${
                      selectedProposal === proposal.id
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-mustard-500 hover:bg-mustard-600 text-navy-900'
                    }`}
                  >
                    {selectedProposal === proposal.id ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Selecionada
                      </>
                    ) : (
                      'Selecionar'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Floating Action Bar */}
      {selectedProposal && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-50">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 bg-navy-500 rounded-xl flex items-center justify-center text-white font-bold">
              {selectedProposalData?.professionalName.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-navy-600">{selectedProposalData?.professionalName}</p>
              <p className="text-xs text-gray-500">R$ {selectedProposalData?.price}</p>
            </div>
            <button
              onClick={() => setSelectedProposal(null)}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 border-navy-300 text-navy-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button className="flex-1 bg-mustard-500 hover:bg-mustard-600 text-navy-900">
              <Check className="w-4 h-4 mr-2" />
              Contratar
            </Button>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl max-h-[85vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-navy-600">Detalhes da Proposta</h2>
              <button
                onClick={() => setShowDetails(null)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            {(() => {
              const proposal = proposals.find(p => p.id === showDetails)
              if (!proposal) return null

              return (
                <div className="p-4 space-y-6">
                  {/* Professional */}
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 bg-navy-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                      {proposal.professionalName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-600 text-lg">{proposal.professionalName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-mustard-500 text-mustard-500" />
                          <span className="font-semibold text-navy-600">{proposal.rating}</span>
                          <span className="text-sm text-gray-500">({proposal.reviewsCount} avaliacoes)</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{proposal.completedJobs} servicos realizados</p>
                    </div>
                  </div>

                  {/* Price & Timeline */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-mustard-50 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-navy-600">R$ {proposal.price}</p>
                      <p className="text-xs text-gray-600">Valor</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-lg font-bold text-navy-600">{proposal.timeline}</p>
                      <p className="text-xs text-gray-600">Prazo</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <p className="text-lg font-bold text-navy-600">{proposal.warranty}</p>
                      <p className="text-xs text-gray-600">Garantia</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-semibold text-navy-600 mb-2">Descricao</h4>
                    <p className="text-sm text-gray-700">{proposal.description}</p>
                  </div>

                  {/* What's Included */}
                  <div>
                    <h4 className="font-semibold text-navy-600 mb-3">O que esta incluido</h4>
                    <div className="space-y-2">
                      {proposal.whatsIncluded.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      className="flex-1 border-navy-300 text-navy-600"
                      onClick={() => setShowDetails(null)}
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Conversar
                    </Button>
                    <Button
                      className="flex-1 bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                      onClick={() => {
                        setSelectedProposal(proposal.id)
                        setShowDetails(null)
                      }}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Selecionar
                    </Button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

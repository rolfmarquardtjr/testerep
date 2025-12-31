'use client'

import { Button, Input, Label } from '@/components/ui'
import { useState } from 'react'
import Link from 'next/link'
import {
  User,
  DollarSign,
  Calendar,
  MapPin,
  Clock,
  FileText,
  Send,
  Eye,
  AlertCircle,
  CheckCircle,
  Briefcase,
  X,
  Home as HomeIcon,
  Compass,
  ChevronRight,
  TrendingUp
} from 'lucide-react'

interface Lead {
  id: string
  category: string
  description: string
  location: string
  distance: string
  urgency: 'normal' | 'urgente' | 'emergencia'
  estimatedPrice: string
  propertyType: string
  buildingAge: string
  photos: number
  createdAt: string
  hasProposal: boolean
  complexity: 'baixa' | 'media' | 'alta'
}

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<string | null>(null)
  const [proposalModal, setProposalModal] = useState(false)
  const [proposalData, setProposalData] = useState({
    price: '',
    timeline: '',
    description: '',
    warranty: '6',
    includeMaterial: true
  })

  // Mock data
  const stats = {
    activeLeads: 12,
    proposalsSent: 8,
    jobsInProgress: 3,
    monthlyRevenue: 2850
  }

  const leads: Lead[] = [
    {
      id: '1',
      category: 'Instalacao Eletrica',
      description: 'Preciso instalar 5 tomadas na sala e 3 no quarto. Uma tomada esta com problema.',
      location: 'Sao Paulo, SP',
      distance: '3.2 km',
      urgency: 'normal',
      estimatedPrice: 'R$ 200 - R$ 450',
      propertyType: 'Apartamento',
      buildingAge: 'Medio (6-15 anos)',
      photos: 4,
      createdAt: '2025-12-29T10:00:00',
      hasProposal: false,
      complexity: 'media'
    },
    {
      id: '2',
      category: 'Encanamento',
      description: 'Vazamento no banheiro, preciso urgente',
      location: 'Sao Paulo, SP',
      distance: '5.8 km',
      urgency: 'emergencia',
      estimatedPrice: 'R$ 180 - R$ 400',
      propertyType: 'Casa',
      buildingAge: 'Antigo (15+ anos)',
      photos: 2,
      createdAt: '2025-12-29T14:30:00',
      hasProposal: false,
      complexity: 'alta'
    },
    {
      id: '3',
      category: 'Instalacao Eletrica',
      description: 'Instalacao de lustres e arandelas na sala de estar',
      location: 'Sao Paulo, SP',
      distance: '7.1 km',
      urgency: 'normal',
      estimatedPrice: 'R$ 150 - R$ 300',
      propertyType: 'Apartamento',
      buildingAge: 'Novo (0-5 anos)',
      photos: 3,
      createdAt: '2025-12-28T16:00:00',
      hasProposal: true,
      complexity: 'baixa'
    },
  ]

  const getUrgencyConfig = (urgency: string) => {
    const configs = {
      'normal': { color: 'bg-blue-100 text-blue-700', text: 'Normal' },
      'urgente': { color: 'bg-yellow-100 text-yellow-700', text: 'Urgente' },
      'emergencia': { color: 'bg-red-100 text-red-700', text: 'Emergencia' },
    }
    return configs[urgency as keyof typeof configs]
  }

  const formatTimeAgo = (date: string) => {
    const now = new Date()
    const created = new Date(date)
    const diffInHours = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Agora'
    if (diffInHours < 24) return `${diffInHours}h atras`
    return `${Math.floor(diffInHours / 24)}d atras`
  }

  const handleSendProposal = () => {
    console.log('Enviando proposta:', proposalData)
    setProposalModal(false)
    setSelectedLead(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-navy-600">Leads</h1>
              <p className="text-sm text-gray-500">{leads.filter(l => !l.hasProposal).length} disponiveis</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-mustard-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-mustard-600" />
              <span className="text-sm font-semibold text-navy-600">R$ {stats.monthlyRevenue}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-navy-600">{stats.activeLeads}</p>
              <p className="text-[10px] text-gray-600">Leads</p>
            </div>
            <div className="bg-mustard-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-navy-600">{stats.proposalsSent}</p>
              <p className="text-[10px] text-gray-600">Propostas</p>
            </div>
            <div className="bg-green-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-navy-600">{stats.jobsInProgress}</p>
              <p className="text-[10px] text-gray-600">Ativos</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Info Banner */}
        <div className="bg-navy-600 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-mustard-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm font-medium mb-1">Responda rapido!</p>
              <p className="text-gray-300 text-xs">
                Profissionais que respondem em menos de 1h tem 3x mais chances de fechar
              </p>
            </div>
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-3">
          {leads.map((lead) => {
            const urgencyConfig = getUrgencyConfig(lead.urgency)

            return (
              <div
                key={lead.id}
                className={`bg-white rounded-2xl border-2 p-4 transition-all ${
                  lead.hasProposal
                    ? 'border-green-200 opacity-75'
                    : 'border-gray-200 hover:border-mustard-400'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-navy-600">{lead.category}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${urgencyConfig.color}`}>
                        {urgencyConfig.text}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {lead.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatTimeAgo(lead.createdAt)}
                      </span>
                    </div>
                  </div>
                  {lead.hasProposal && (
                    <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-[10px] font-medium text-green-700">Enviada</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{lead.description}</p>

                {/* Meta */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{lead.propertyType}</span>
                    <span>{lead.photos} fotos</span>
                  </div>
                  <span className="text-sm font-semibold text-mustard-600">{lead.estimatedPrice}</span>
                </div>

                {/* Actions */}
                {!lead.hasProposal ? (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-navy-300 text-navy-600"
                      onClick={() => setSelectedLead(lead.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detalhes
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-mustard-500 hover:bg-mustard-600 text-navy-900"
                      onClick={() => {
                        setSelectedLead(lead.id)
                        setProposalModal(true)
                      }}
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Enviar Proposta
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Aguardando resposta do cliente</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 lg:hidden z-50">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <Link href="/" className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[60px] text-gray-400">
            <HomeIcon className="w-6 h-6" />
            <span className="text-[10px]">Inicio</span>
          </Link>
          <Link href="/dashboard/professional/leads" className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[60px] text-mustard-600">
            <Briefcase className="w-6 h-6" />
            <span className="text-[10px] font-medium">Leads</span>
          </Link>
          <Link href="/dashboard/professional/proposals" className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[60px] text-gray-400">
            <FileText className="w-6 h-6" />
            <span className="text-[10px]">Propostas</span>
          </Link>
          <Link href="/dashboard/professional/jobs" className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[60px] text-gray-400">
            <Calendar className="w-6 h-6" />
            <span className="text-[10px]">Agenda</span>
          </Link>
          <Link href="/dashboard/professional/perfil" className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[60px] text-gray-400">
            <User className="w-6 h-6" />
            <span className="text-[10px]">Perfil</span>
          </Link>
        </div>
      </nav>

      {/* Proposal Modal */}
      {proposalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-t-3xl lg:rounded-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-navy-600">Enviar Proposta</h2>
                <p className="text-xs text-gray-500">
                  {leads.find(l => l.id === selectedLead)?.category}
                </p>
              </div>
              <button
                onClick={() => {
                  setProposalModal(false)
                  setSelectedLead(null)
                }}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-navy-900">
                  Valor do Servico (R$)
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="280"
                  value={proposalData.price}
                  onChange={(e) => setProposalData({ ...proposalData, price: e.target.value })}
                  className="h-12 text-lg font-semibold border-gray-300 focus:border-mustard-500 focus:ring-mustard-500"
                />
                <p className="text-xs text-gray-500">
                  Sugerido: {leads.find(l => l.id === selectedLead)?.estimatedPrice}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-sm font-medium text-navy-900">
                  Prazo de Execucao
                </Label>
                <Input
                  id="timeline"
                  type="text"
                  placeholder="2-3 dias"
                  value={proposalData.timeline}
                  onChange={(e) => setProposalData({ ...proposalData, timeline: e.target.value })}
                  className="h-12 border-gray-300 focus:border-mustard-500 focus:ring-mustard-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-navy-900">
                  Descricao
                </Label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Descreva como voce vai realizar o servico..."
                  value={proposalData.description}
                  onChange={(e) => setProposalData({ ...proposalData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-mustard-500 focus:ring-mustard-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-navy-900">Garantia</Label>
                <div className="flex gap-2">
                  {['3', '6', '12'].map((months) => (
                    <button
                      key={months}
                      onClick={() => setProposalData({ ...proposalData, warranty: months })}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        proposalData.warranty === months
                          ? 'bg-mustard-500 text-navy-900'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {months}m
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  checked={proposalData.includeMaterial}
                  onChange={(e) => setProposalData({ ...proposalData, includeMaterial: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-mustard-500 focus:ring-mustard-500"
                />
                <span className="text-sm text-navy-900">Material incluso no preco</span>
              </label>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <Button
                onClick={handleSendProposal}
                disabled={!proposalData.price || !proposalData.timeline || !proposalData.description}
                className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 text-base font-semibold"
              >
                <Send className="w-5 h-5 mr-2" />
                Enviar Proposta
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

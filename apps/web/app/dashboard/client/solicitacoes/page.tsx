'use client'

import { Button } from '@/components/ui'
import { useState } from 'react'
import Link from 'next/link'
import {
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  MapPin,
  DollarSign,
  Eye,
  FileText,
  ChevronRight,
  Home as HomeIcon,
  Compass,
  User
} from 'lucide-react'

interface ServiceRequest {
  id: string
  category: string
  description: string
  location: string
  status: 'aguardando' | 'com_propostas' | 'em_andamento' | 'concluido' | 'cancelado'
  createdAt: string
  proposalsCount: number
  urgency: string
}

export default function SolicitacoesClientePage() {
  const [activeTab, setActiveTab] = useState<'ativas' | 'historico'>('ativas')

  // Mock data - TODO: Integrar com API
  const requests: ServiceRequest[] = [
    {
      id: '1',
      category: 'Instalacao Eletrica',
      description: 'Preciso instalar 5 tomadas na sala e 3 no quarto',
      location: 'Sao Paulo, SP',
      status: 'com_propostas',
      createdAt: '2025-12-28T10:00:00',
      proposalsCount: 5,
      urgency: 'normal'
    },
    {
      id: '2',
      category: 'Encanamento',
      description: 'Vazamento no banheiro, urgente',
      location: 'Sao Paulo, SP',
      status: 'aguardando',
      createdAt: '2025-12-29T14:30:00',
      proposalsCount: 0,
      urgency: 'emergencia'
    },
    {
      id: '3',
      category: 'Montagem de Moveis',
      description: 'Montagem de guarda-roupa 6 portas',
      location: 'Sao Paulo, SP',
      status: 'em_andamento',
      createdAt: '2025-12-25T09:00:00',
      proposalsCount: 3,
      urgency: 'normal'
    },
    {
      id: '4',
      category: 'Pintura',
      description: 'Pintura completa de sala e cozinha',
      location: 'Sao Paulo, SP',
      status: 'concluido',
      createdAt: '2025-12-20T11:00:00',
      proposalsCount: 4,
      urgency: 'normal'
    },
  ]

  const activeRequests = requests.filter(r =>
    r.status === 'aguardando' || r.status === 'com_propostas' || r.status === 'em_andamento'
  )

  const historyRequests = requests.filter(r =>
    r.status === 'concluido' || r.status === 'cancelado'
  )

  const getStatusConfig = (status: string) => {
    const configs = {
      'aguardando': { color: 'bg-yellow-100 text-yellow-700', text: 'Aguardando', icon: Clock },
      'com_propostas': { color: 'bg-blue-100 text-blue-700', text: 'Com propostas', icon: FileText },
      'em_andamento': { color: 'bg-mustard-100 text-mustard-700', text: 'Em andamento', icon: Clock },
      'concluido': { color: 'bg-green-100 text-green-700', text: 'Concluido', icon: CheckCircle },
      'cancelado': { color: 'bg-red-100 text-red-700', text: 'Cancelado', icon: XCircle },
    }
    return configs[status as keyof typeof configs]
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

  const displayedRequests = activeTab === 'ativas' ? activeRequests : historyRequests

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-0">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-navy-600">Meus Pedidos</h1>
              <p className="text-sm text-gray-500">{activeRequests.length} ativos</p>
            </div>
            <Button asChild size="sm" className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
              <Link href="/solicitar-servico">
                <Plus className="w-4 h-4 mr-1" />
                Novo
              </Link>
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('ativas')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'ativas'
                  ? 'bg-mustard-500 text-navy-900'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Ativas ({activeRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('historico')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'historico'
                  ? 'bg-mustard-500 text-navy-900'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Historico ({historyRequests.length})
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4">
        {displayedRequests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-navy-600 mb-2">
              {activeTab === 'ativas' ? 'Nenhuma solicitacao ativa' : 'Sem historico ainda'}
            </h3>
            <p className="text-sm text-gray-500 mb-6 px-8">
              {activeTab === 'ativas'
                ? 'Voce nao tem solicitacoes de servico no momento'
                : 'Seus servicos concluidos aparecerao aqui'
              }
            </p>
            {activeTab === 'ativas' && (
              <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                <Link href="/solicitar-servico">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Solicitacao
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {displayedRequests.map((request) => {
              const statusConfig = getStatusConfig(request.status)
              const StatusIcon = statusConfig.icon

              return (
                <Link
                  key={request.id}
                  href={request.status === 'com_propostas'
                    ? `/dashboard/client/solicitacoes/${request.id}/propostas`
                    : `/dashboard/client/solicitacoes/${request.id}`
                  }
                  className="block bg-white rounded-2xl border border-gray-200 p-4 hover:border-mustard-400 transition-all"
                >
                  <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${statusConfig.color}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-navy-600 truncate">{request.category}</h3>
                        <span className="text-xs text-gray-500 flex-shrink-0">{formatDate(request.createdAt)}</span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2 line-clamp-1">{request.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {request.location.split(',')[0]}
                          </span>
                          {request.proposalsCount > 0 && (
                            <span className="flex items-center gap-1 text-mustard-600 font-medium">
                              <DollarSign className="w-3.5 h-3.5" />
                              {request.proposalsCount} proposta{request.proposalsCount !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  {/* Action Hint */}
                  {request.status === 'com_propostas' && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-navy-600 font-medium">Ver propostas</span>
                        <div className="flex items-center gap-1.5 bg-mustard-50 px-2.5 py-1 rounded-full">
                          <span className="w-2 h-2 bg-mustard-500 rounded-full animate-pulse" />
                          <span className="text-xs font-medium text-mustard-700">Novo</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {request.status === 'em_andamento' && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="flex-1 border-navy-300 text-navy-600">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" className="flex-1 bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 lg:hidden z-50">
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <Link href="/" className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[60px] text-gray-400">
            <HomeIcon className="w-6 h-6" />
            <span className="text-[10px]">Inicio</span>
          </Link>
          <Link href="/explorar" className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[60px] text-gray-400">
            <Compass className="w-6 h-6" />
            <span className="text-[10px]">Explorar</span>
          </Link>
          <Link href="/solicitar-servico" className="flex flex-col items-center gap-0.5 py-1 px-2">
            <div className="w-14 h-14 bg-mustard-500 rounded-full flex items-center justify-center -mt-8 shadow-lg border-4 border-white">
              <Plus className="w-6 h-6 text-navy-900" />
            </div>
          </Link>
          <Link href="/dashboard/client/solicitacoes" className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[60px] text-mustard-600">
            <FileText className="w-6 h-6" />
            <span className="text-[10px] font-medium">Pedidos</span>
          </Link>
          <Link href="/dashboard/client/perfil" className="flex flex-col items-center gap-0.5 py-1 px-2 min-w-[60px] text-gray-400">
            <User className="w-6 h-6" />
            <span className="text-[10px]">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

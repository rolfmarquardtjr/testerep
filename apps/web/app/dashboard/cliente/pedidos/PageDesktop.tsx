'use client'

import Link from 'next/link'
import { Button, Input } from '@/components/ui'
import {
    Plus,
    Search,
    Clock,
    CheckCircle,
    XCircle,
    MapPin,
    DollarSign,
    ChevronRight,
    FileText,
    X,
    Calendar,
    TrendingUp,
    ArrowUpRight,
    Bell,
    ArrowRight,
    Filter,
    User,
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
    budget?: number
    createdAt: string
}

interface PageDesktopProps {
    stats: {
        total: number
        pending: number
        inProgress: number
        completed: number
    }
    filteredRequests: ServiceRequest[]
    searchTerm: string
    statusFilter: string
    setSearchTerm: (term: string) => void
    setStatusFilter: (status: string) => void
}

const statusFilters = [
    { value: 'all', label: 'Todos', icon: FileText },
    { value: 'PENDING', label: 'Aguardando', icon: Clock },
    { value: 'IN_PROGRESS', label: 'Em Andamento', icon: TrendingUp },
    { value: 'COMPLETED', label: 'Concluido', icon: CheckCircle },
    { value: 'CANCELLED', label: 'Cancelado', icon: XCircle },
]

export default function PageDesktop({
    stats,
    filteredRequests,
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter,
}: PageDesktopProps) {
    const getStatusConfig = (status: string) => {
        const configs: Record<string, { bg: string; text: string; label: string; icon: any; gradient: string }> = {
            'PENDING': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Aguardando', icon: Clock, gradient: 'from-amber-400 to-orange-500' },
            'IN_PROGRESS': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em andamento', icon: TrendingUp, gradient: 'from-blue-400 to-cyan-500' },
            'COMPLETED': { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Concluido', icon: CheckCircle, gradient: 'from-emerald-400 to-green-500' },
            'CANCELLED': { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelado', icon: XCircle, gradient: 'from-red-400 to-rose-500' },
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

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    return (
        <div className="hidden lg:block">
            <div className="max-w-7xl mx-auto px-8 py-8">
                {/* Hero Banner */}
                <div className="bg-navy-900 rounded-3xl p-8 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800 to-transparent" />
                    <div className="relative z-10 max-w-xl">
                        <h1 className="text-3xl font-bold text-white mb-3">Meus Pedidos</h1>
                        <p className="text-gray-300 mb-6">
                            Acompanhe todos os seus pedidos de servico em um so lugar
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
                        <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                            <Link href="/solicitar-servico">
                                <Plus className="w-5 h-5 mr-2" />
                                Novo Pedido
                            </Link>
                        </Button>
                    </div>
                    <img
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600"
                        alt="Servicos"
                        className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30"
                    />
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                                placeholder="Buscar pedidos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 h-12 bg-gray-50 border-gray-200 rounded-xl w-full text-base"
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

                        {/* Status Filters */}
                        <div className="flex gap-2">
                            {statusFilters.map((filter) => {
                                const FilterIcon = filter.icon
                                return (
                                    <button
                                        key={filter.value}
                                        onClick={() => setStatusFilter(filter.value)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${statusFilter === filter.value
                                            ? 'bg-navy-900 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        <FilterIcon className="w-4 h-4" />
                                        {filter.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-gray-600">
                        <span className="font-semibold text-navy-900">{filteredRequests.length}</span> pedido(s) encontrado(s)
                    </p>
                </div>

                {/* Content */}
                {filteredRequests.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-center py-20 px-6">
                            <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                <FileText className="w-12 h-12 text-gray-400" />
                            </div>
                            <h3 className="font-bold text-navy-900 text-xl mb-2">
                                {searchTerm || statusFilter !== 'all' ? 'Nenhum pedido encontrado' : 'Nenhum pedido ainda'}
                            </h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                {searchTerm || statusFilter !== 'all'
                                    ? 'Tente ajustar os filtros de busca para encontrar o que procura'
                                    : 'Solicite seu primeiro servico e receba orcamentos de profissionais qualificados em minutos'}
                            </p>
                            {searchTerm || statusFilter !== 'all' ? (
                                <Button
                                    onClick={() => {
                                        setSearchTerm('')
                                        setStatusFilter('all')
                                    }}
                                    variant="outline"
                                    className="border-navy-300 text-navy-600"
                                >
                                    Limpar Filtros
                                </Button>
                            ) : (
                                <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 h-12 px-6">
                                    <Link href="/solicitar-servico">
                                        <Plus className="w-5 h-5 mr-2" />
                                        Solicitar Servico
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredRequests.map((request) => {
                            const statusConfig = getStatusConfig(request.status)
                            const StatusIcon = statusConfig.icon
                            const quotesCount = request.quotes?.length || 0

                            return (
                                <Link
                                    key={request.id}
                                    href={`/dashboard/cliente/pedidos/${request.id}`}
                                    className="group bg-white rounded-2xl border border-gray-100 hover:border-mustard-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div className="flex">
                                        {/* Left Color Bar */}
                                        <div className={`w-1.5 bg-gradient-to-b ${statusConfig.gradient}`} />

                                        <div className="flex-1 p-5">
                                            <div className="flex items-start gap-5">
                                                {/* Status Icon */}
                                                <div className={`w-14 h-14 ${statusConfig.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                                                    <StatusIcon className={`w-7 h-7 ${statusConfig.text}`} />
                                                </div>

                                                {/* Main Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-4 mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-navy-900 text-lg group-hover:text-mustard-600 transition-colors">
                                                                {request.title}
                                                            </h3>
                                                            {request.category && (
                                                                <span className="text-sm text-gray-500">{request.category.name}</span>
                                                            )}
                                                        </div>
                                                        <span className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full ${statusConfig.bg} ${statusConfig.text} font-medium`}>
                                                            {statusConfig.label}
                                                            {request.status === 'PENDING' && quotesCount > 0 && (
                                                                <span className="w-2 h-2 bg-mustard-500 rounded-full animate-pulse" />
                                                            )}
                                                        </span>
                                                    </div>

                                                    <p className="text-gray-600 mb-4 line-clamp-2">{request.description}</p>

                                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                        <span className="flex items-center gap-1.5">
                                                            <MapPin className="w-4 h-4" />
                                                            {request.city}, {request.state}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-4 h-4" />
                                                            {formatDate(request.createdAt)}
                                                        </span>
                                                        {request.budget && (
                                                            <span className="flex items-center gap-1.5 font-medium text-navy-900">
                                                                <DollarSign className="w-4 h-4" />
                                                                {formatCurrency(request.budget)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right Section */}
                                                <div className="flex flex-col items-end justify-between h-full gap-4">
                                                    {quotesCount > 0 && (
                                                        <div className="text-right">
                                                            <p className="text-2xl font-bold text-mustard-600">{quotesCount}</p>
                                                            <p className="text-xs text-gray-500">orcamento{quotesCount !== 1 ? 's' : ''}</p>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-mustard-600 transition-colors">
                                                        Ver detalhes
                                                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quotes Alert */}
                                            {request.status === 'PENDING' && quotesCount > 0 && (
                                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between bg-mustard-50 -mx-5 -mb-5 px-5 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <Bell className="w-4 h-4 text-mustard-600" />
                                                        <span className="text-sm font-medium text-mustard-700">
                                                            Voce tem {quotesCount} orcamento{quotesCount !== 1 ? 's' : ''} para avaliar
                                                        </span>
                                                    </div>
                                                    <span className="text-sm font-semibold text-mustard-600 flex items-center gap-1">
                                                        Ver orcamentos <ChevronRight className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

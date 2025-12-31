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
    FileText,
    X,
    TrendingUp,
    ArrowRight,
    Bell,
    Home as HomeIcon,
    Compass,
    User,
    Sparkles,
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

interface PageMobileProps {
    filteredRequests: ServiceRequest[]
    searchTerm: string
    statusFilter: string
    setSearchTerm: (term: string) => void
    setStatusFilter: (status: string) => void
}

const statusFilters = [
    { value: 'all', label: 'Todos', icon: FileText },
    { value: 'PENDING', label: 'Aberto', icon: Clock },
    { value: 'IN_PROGRESS', label: 'Em Andamento', icon: TrendingUp },
    { value: 'COMPLETED', label: 'Concluído', icon: CheckCircle },
    { value: 'CANCELLED', label: 'Cancelado', icon: XCircle },
]

export default function PageMobile({
    filteredRequests,
    searchTerm,
    statusFilter,
    setSearchTerm,
    setStatusFilter,
}: PageMobileProps) {

    const getStatusConfig = (status: string) => {
        const configs: Record<string, { bg: string; text: string; label: string; border: string }> = {
            'PENDING': { bg: 'bg-amber-50', text: 'text-amber-700', label: 'Aguardando', border: 'border-amber-100' },
            'IN_PROGRESS': { bg: 'bg-blue-50', text: 'text-blue-700', label: 'Em andamento', border: 'border-blue-100' },
            'COMPLETED': { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Concluído', border: 'border-emerald-100' },
            'CANCELLED': { bg: 'bg-red-50', text: 'text-red-700', label: 'Cancelado', border: 'border-red-100' },
        }
        return configs[status] || configs['PENDING']
    }

    const formatDate = (date: string) => {
        const now = new Date()
        const created = new Date(date)
        const diffInDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))

        if (diffInDays === 0) return 'Hoje'
        if (diffInDays === 1) return 'Ontem'
        if (diffInDays < 7) return `${diffInDays} dias atrás`
        return created.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value)
    }

    return (
        // SAFE ROOT CONTAINER: 100vw max width, overflow hidden
        <div className="lg:hidden min-h-screen bg-gray-50 pb-32 w-full max-w-[100vw] overflow-x-hidden flex flex-col">

            {/* 1. TOP HEADER SECTION */}
            <header className="bg-navy-900 pt-8 pb-8 px-6 rounded-b-[40px] shadow-2xl shadow-navy-900/10 z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Seus Serviços</span>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Meus Pedidos</h1>
                    </div>
                    <Link
                        href="/solicitar-servico"
                        className="w-12 h-12 bg-mustard-500 rounded-2xl flex items-center justify-center text-navy-900 shadow-xl shadow-mustard-500/20 active:scale-90 transition-all border-4 border-navy-800"
                    >
                        <Plus className="w-6 h-6 stroke-[3]" />
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Search className="w-5 h-5 text-gray-400" />
                    </div>
                    <Input
                        placeholder="Buscar por título..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-14 pl-12 pr-4 bg-navy-800/50 border-navy-700/50 rounded-2xl text-white placeholder:text-gray-400 focus:bg-navy-800 transition-all focus:ring-1 focus:ring-mustard-500/50"
                    />
                </div>
            </header>

            {/* 2. FILTERS & CONTENT */}
            <div className="flex-1 px-6 -mt-4 relative z-20">

                {/* Horizontal Filters Scroll */}
                <div className="w-full overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
                    <div className="flex gap-2 w-max">
                        {statusFilters.map((filter) => {
                            const isActive = statusFilter === filter.value
                            const Icon = filter.icon
                            return (
                                <button
                                    key={filter.value}
                                    onClick={() => setStatusFilter(filter.value)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wide transition-all shadow-sm ${isActive
                                            ? 'bg-white text-navy-900 ring-2 ring-navy-900'
                                            : 'bg-white text-gray-400 border border-gray-100'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-mustard-500' : ''}`} />
                                    {filter.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Results Info */}
                <div className="flex items-center justify-between mb-4 mt-2">
                    <span className="text-sm font-semibold text-gray-400">
                        {filteredRequests.length} {filteredRequests.length === 1 ? 'pedido encontrado' : 'pedidos encontrados'}
                    </span>
                    {(searchTerm || statusFilter !== 'all') && (
                        <button
                            onClick={() => { setSearchTerm(''); setStatusFilter('all') }}
                            className="text-xs font-bold text-mustard-600 bg-mustard-50 px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
                        >
                            LIMPAR FILTROS
                        </button>
                    )}
                </div>

                {/* Order List */}
                <div className="space-y-4">
                    {filteredRequests.length === 0 ? (
                        <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm flex flex-col items-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <FileText className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="font-bold text-navy-900 text-lg">Nenhum pedido</h3>
                            <p className="text-gray-400 text-sm mt-1 max-w-[200px] leading-relaxed">
                                Nenhum pedido encontrado com os filtros atuais.
                            </p>
                        </div>
                    ) : (
                        filteredRequests.map((request) => {
                            const status = getStatusConfig(request.status)
                            const quotesCount = request.quotes?.length || 0

                            return (
                                <Link
                                    key={request.id}
                                    href={`/dashboard/cliente/pedidos/${request.id}`}
                                    className="block bg-white rounded-3xl p-5 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform"
                                >
                                    {/* Card Header */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`px-3 py-1.5 rounded-lg ${status.bg} border ${status.border} flex items-center gap-2`}>
                                            <div className={`w-2 h-2 rounded-full ${status.bg.replace('bg-', 'bg-').replace('50', '500')}`} />
                                            <span className={`text-[10px] font-bold uppercase tracking-wide ${status.text}`}>
                                                {status.label}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">
                                            {formatDate(request.createdAt)}
                                        </span>
                                    </div>

                                    {/* Card Content */}
                                    <h3 className="font-bold text-navy-900 text-lg leading-tight mb-2 line-clamp-2">
                                        {request.title}
                                    </h3>

                                    {request.category && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-mustard-500" />
                                            <span className="text-xs font-semibold text-gray-500 uppercase">{request.category.name}</span>
                                        </div>
                                    )}

                                    {/* Card Details Grid */}
                                    <div className="grid grid-cols-2 gap-2 mb-5">
                                        <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="text-xs font-semibold text-gray-600 truncate">{request.city}</span>
                                        </div>
                                        {request.budget && (
                                            <div className="bg-gray-50 rounded-xl p-2.5 flex items-center gap-2">
                                                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                                                <span className="text-xs font-semibold text-gray-600">{formatCurrency(request.budget)}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            {quotesCount > 0 ? (
                                                <span className="text-xs font-bold text-mustard-600 flex items-center gap-1.5 bg-mustard-50 px-2.5 py-1 rounded-lg">
                                                    <User className="w-3.5 h-3.5" />
                                                    {quotesCount} {quotesCount === 1 ? 'proposta' : 'propostas'}
                                                </span>
                                            ) : (
                                                <span className="text-xs font-medium text-gray-400 italic">
                                                    Aguardando interessados
                                                </span>
                                            )}
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center">
                                            <ArrowRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>
            </div>

            {/* 3. BOTTOM NAVIGATION */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 pb-safe z-50">
                <div className="flex items-center justify-between px-8 py-4 max-w-sm mx-auto">
                    <Link href="/dashboard/cliente" className="flex flex-col items-center gap-1 group">
                        <HomeIcon className="w-6 h-6 text-gray-300 group-hover:text-navy-900 transition-colors" />
                    </Link>
                    <Link href="/explorar" className="flex flex-col items-center gap-1 group">
                        <Compass className="w-6 h-6 text-gray-300 group-hover:text-navy-900 transition-colors" />
                    </Link>
                    <Link href="/solicitar-servico" className="relative -top-8">
                        <div className="w-14 h-14 bg-navy-900 rounded-full flex items-center justify-center shadow-lg shadow-navy-900/30 border-4 border-white">
                            <Plus className="w-7 h-7 text-white" />
                        </div>
                    </Link>
                    <Link href="/dashboard/cliente/pedidos" className="flex flex-col items-center gap-1 group">
                        <FileText className="w-6 h-6 text-mustard-500 fill-mustard-500/20" />
                    </Link>
                    <Link href="/dashboard/cliente/perfil" className="flex flex-col items-center gap-1 group">
                        <User className="w-6 h-6 text-gray-300 group-hover:text-navy-900 transition-colors" />
                    </Link>
                </div>
            </nav>

        </div>
    )
}

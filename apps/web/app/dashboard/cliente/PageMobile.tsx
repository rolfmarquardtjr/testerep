'use client'

import {
    Bell,
    Search,
    Filter,
    MapPin,
    ArrowRight,
    Clock,
    CheckCircle,
    Star,
    ChevronRight,
    Plus,
    Home,
    FileText,
    Compass,
    MessageSquare,
    User,
    Zap,
    Shield,
    Award,
    TrendingUp,
    Sparkles,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Input } from '@/components/ui'

interface ServiceRequest {
    id: string
    title: string
    description: string
    status: string
    city: string
    state: string
    category?: {
        name: string
        image?: string
    }
    createdAt: string
    budget?: number
}

interface PageMobileProps {
    userName?: string
    stats: {
        total: number
        pending: number
        inProgress: number
        completed: number
    }
    recentRequests: ServiceRequest[]
    categories: any[]
}

export default function PageMobile({
    userName,
    stats,
    recentRequests,
    categories,
}: PageMobileProps) {
    const getStatusConfig = (status: string) => {
        const configs: Record<string, { bg: string; text: string; label: string; icon: any }> = {
            'PENDING': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Aguardando', icon: Clock },
            'IN_PROGRESS': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em andamento', icon: TrendingUp },
            'COMPLETED': { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Concluido', icon: CheckCircle },
        }
        return configs[status] || configs['PENDING']
    }

    return (
        <div className="lg:hidden space-y-6 pb-24">
            {/* Mobile Header Card */}
            <div className="bg-navy-900 rounded-3xl p-6 relative overflow-hidden shadow-xl shadow-navy-900/20 group">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
                        alt="Background"
                        fill
                        className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/80 to-navy-900/90" />
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-mustard-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-gray-300 text-sm mb-1 font-medium">Ola, {userName?.split(' ')[0]}</p>
                            <h1 className="text-2xl font-bold text-white leading-tight">
                                O que precisa <br />
                                <span className="text-mustard-400">resolver hoje?</span>
                            </h1>
                        </div>
                        <Link href="/dashboard/cliente/perfil" className="relative group/profile">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden group-active/profile:scale-95 transition-transform backdrop-blur-md">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-mustard-500 rounded-full border-2 border-navy-900" />
                        </Link>
                    </div>

                    <div className="relative group/search">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within/search:text-mustard-400 transition-colors z-10" />
                        <Input
                            placeholder="Buscar servicos..."
                            className="pl-12 h-14 bg-white/10 border-white/10 rounded-2xl text-white placeholder:text-gray-400 focus:bg-white/20 transition-all backdrop-blur-md"
                        />
                    </div>
                </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group active:scale-[0.98] transition-transform">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-mustard-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-50" />
                    <div className="w-10 h-10 bg-mustard-100 rounded-2xl flex items-center justify-center mb-2 z-10">
                        <Clock className="w-5 h-5 text-mustard-700" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-3xl font-bold text-navy-900">{stats.pending}</p>
                        <p className="text-sm font-medium text-gray-500">Em aberto</p>
                    </div>
                </div>
                <div className="bg-navy-900 p-4 rounded-3xl border border-navy-800 shadow-xl shadow-navy-900/10 flex flex-col justify-between h-32 relative overflow-hidden group active:scale-[0.98] transition-transform">
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                            alt="Abstract"
                            fill
                            className="object-cover opacity-10"
                        />
                        <div className="absolute inset-0 bg-navy-900/50" />
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center mb-2 z-10 backdrop-blur-sm border border-white/5">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-3xl font-bold text-white">{stats.inProgress}</p>
                        <p className="text-sm font-medium text-gray-300">Em andamento</p>
                    </div>
                </div>
            </div>

            {/* CTA Banner */}
            <div className="relative rounded-3xl p-6 shadow-lg shadow-mustard-500/20 overflow-hidden group min-h-[140px] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?q=80&w=2070&auto=format&fit=crop"
                        alt="Service Background"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-transparent" />
                </div>

                <div className="relative z-10 flex items-center justify-between w-full">
                    <div className="max-w-[60%]">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-mustard-500/20 border border-mustard-500/30 backdrop-blur-md mb-2">
                            <Sparkles className="w-3 h-3 text-mustard-400 fill-mustard-400" />
                            <span className="text-[10px] font-bold text-mustard-400 uppercase tracking-wide">Nova Solicitação</span>
                        </div>
                        <h3 className="font-bold text-white text-xl leading-tight mb-1">Precisa de ajuda?</h3>
                        <p className="text-gray-300 text-sm font-medium">Encontre o profissional ideal em minutos</p>
                    </div>
                    <Button asChild size="icon" className="h-14 w-14 bg-mustard-500 text-navy-900 rounded-2xl hover:bg-mustard-400 shadow-lg shadow-mustard-500/30 border-4 border-navy-900/10">
                        <Link href="/solicitar-servico">
                            <Plus className="w-7 h-7" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-navy-900">Categorias</h2>
                    <Link href="/explorar" className="text-sm font-medium text-mustard-600 flex items-center gap-1">
                        Ver todas <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="flex gap-4 w-max pr-4">
                        {(categories || []).slice(0, 5).map((category, index) => (
                            <Link
                                key={index}
                                href={`/explorar?categoria=${category.slug}`}
                                className="flex flex-col items-center gap-2 w-[72px] group"
                            >
                                <div className="w-[72px] h-[72px] rounded-3xl bg-white border border-gray-100 flex items-center justify-center shadow-sm group-active:scale-90 transition-all overflow-hidden relative">
                                    {category.image ? (
                                        <Image
                                            src={category.image}
                                            alt={category.name}
                                            fill
                                            className="object-cover transition-transform group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <span className="text-[11px] font-medium text-gray-600 text-center leading-tight line-clamp-2">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Requests */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold text-navy-900">Pedidos Recentes</h2>
                <div className="space-y-3">
                    {(recentRequests || []).length === 0 ? (
                        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-8 text-center bg-gray-50/50">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <FileText className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">Sem pedidos recentes</p>
                            <p className="text-xs text-gray-500 mt-1">Seus ultimos pedidos aparecerao aqui</p>
                        </div>
                    ) : (
                        (recentRequests || []).map((request) => {
                            const statusConfig = getStatusConfig(request.status)
                            const StatusIcon = statusConfig.icon
                            return (
                                <Link
                                    key={request.id}
                                    href={`/dashboard/cliente/pedidos/${request.id}`}
                                    className="block bg-white p-5 rounded-3xl border border-gray-100 shadow-sm active:scale-[0.98] transition-transform"
                                >
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-2xl ${statusConfig.bg} flex items-center justify-center`}>
                                                <StatusIcon className={`w-5 h-5 ${statusConfig.text}`} />
                                            </div>
                                            <div>
                                                <span className={`inline-block px-2.5 py-1 ${statusConfig.bg} ${statusConfig.text} text-[10px] font-bold rounded-full uppercase tracking-wide mb-1`}>
                                                    {statusConfig.label}
                                                </span>
                                                <p className="text-xs text-gray-400 font-medium">{new Date(request.createdAt).toLocaleDateString('pt-BR')}</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-navy-900 text-base mb-1 line-clamp-1">{request.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{request.description}</p>

                                    {request.category && (
                                        <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                                            <div className="w-1.5 h-1.5 rounded-full bg-mustard-500" />
                                            <p className="text-xs font-semibold text-gray-500 uppercase">{request.category.name}</p>
                                        </div>
                                    )}
                                </Link>
                            )
                        })
                    )}
                </div>
            </div>

            {/* Tips Card */}
            <div className="bg-navy-900 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-mustard-500/20 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                    <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                        <Zap className="w-5 h-5 text-mustard-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Dica Pro</h3>
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        Descreva bem o seu problema para receber orcamentos mais precisos dos nossos profissionais.
                    </p>
                    <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white border-dashed">
                        Ver mais dicas
                    </Button>
                </div>
            </div>

            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 px-6 py-4 z-50 pb-safe shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between max-w-sm mx-auto">
                    <Link href="/dashboard/cliente" className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-navy-900 rounded-2xl flex items-center justify-center shadow-lg shadow-navy-900/20">
                            <Home className="w-5 h-5 text-mustard-400" />
                        </div>
                    </Link>
                    <Link href="/explorar" className="flex flex-col items-center gap-1 active:scale-90 transition-transform group">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                            <Compass className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </div>
                    </Link>
                    <Link href="/solicitar-servico" className="flex flex-col items-center -mt-8 active:scale-90 transition-transform">
                        <div className="w-14 h-14 bg-mustard-500 rounded-3xl flex items-center justify-center shadow-xl shadow-mustard-500/30 border-4 border-white rotate-3 hover:rotate-6 transition-transform">
                            <Plus className="w-7 h-7 text-navy-900" />
                        </div>
                    </Link>
                    <Link href="/dashboard/cliente/pedidos" className="flex flex-col items-center gap-1 active:scale-90 transition-transform group">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                            <FileText className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </div>
                    </Link>
                    <Link href="/dashboard/cliente/perfil" className="flex flex-col items-center gap-1 active:scale-90 transition-transform group">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                            <User className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                        </div>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

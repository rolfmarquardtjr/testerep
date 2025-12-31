'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  FileText,
  MessageSquare,
  User,
  Settings,
  Briefcase,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  CheckSquare,
  Sparkles,
  TrendingUp,
  Bell,
} from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  userRole: 'CLIENT' | 'PROFESSIONAL'
  userName?: string
  userAvatar?: string
}

const clientNavItems = [
  { href: '/dashboard/cliente', label: 'Inicio', icon: Home, description: 'Visao geral' },
  { href: '/dashboard/cliente/pedidos', label: 'Meus Pedidos', icon: FileText, description: 'Acompanhe seus pedidos' },
  { href: '/explorar', label: 'Explorar', icon: Search, description: 'Encontre profissionais' },
  { href: '/dashboard/cliente/mensagens', label: 'Mensagens', icon: MessageSquare, description: 'Suas conversas', badge: 3 },
  { href: '/dashboard/cliente/perfil', label: 'Meu Perfil', icon: User, description: 'Suas informacoes' },
]

const professionalNavItems = [
  { href: '/dashboard/profissional', label: 'Inicio', icon: Home, description: 'Visao geral' },
  { href: '/dashboard/profissional/oportunidades', label: 'Oportunidades', icon: Briefcase, description: 'Novos trabalhos', badge: 5 },
  { href: '/dashboard/profissional/trabalhos', label: 'Meus Trabalhos', icon: CheckSquare, description: 'Em andamento' },
  { href: '/dashboard/profissional/mensagens', label: 'Mensagens', icon: MessageSquare, description: 'Suas conversas', badge: 2 },
  { href: '/dashboard/profissional/perfil', label: 'Meu Perfil', icon: User, description: 'Suas informacoes' },
]

export default function Sidebar({ userRole, userName, userAvatar }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  const navItems = userRole === 'CLIENT' ? clientNavItems : professionalNavItems

  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col h-screen sticky top-0 transition-all duration-300 ease-in-out',
        'bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900',
        collapsed ? 'w-20' : 'w-72'
      )}
    >
      {/* Logo & Toggle */}
      <div className="h-20 flex items-center justify-between px-5 border-b border-white/10">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center shadow-lg shadow-mustard-500/20 group-hover:shadow-mustard-500/40 transition-shadow">
              <Sparkles className="w-5 h-5 text-navy-900" />
            </div>
            <span className="text-2xl font-bold text-white">Repfy</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all',
            collapsed && 'mx-auto'
          )}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* User Card */}
      <div className={cn('p-4', collapsed && 'px-3')}>
        <div className={cn(
          'p-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/10',
          collapsed ? 'flex justify-center' : 'flex items-center gap-4'
        )}>
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold text-lg shadow-lg">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full rounded-xl object-cover" />
              ) : (
                userName?.charAt(0).toUpperCase() || 'U'
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-navy-900" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{userName || 'Usuario'}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-mustard-500" />
                {userRole === 'CLIENT' ? 'Cliente' : 'Profissional'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats - Only for non-collapsed */}
      {!collapsed && (
        <div className="px-4 mb-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-mustard-500" />
                <span className="text-xs text-gray-400">Este mes</span>
              </div>
              <p className="text-lg font-bold text-white">
                {userRole === 'CLIENT' ? '3' : '12'}
              </p>
              <p className="text-xs text-gray-500">
                {userRole === 'CLIENT' ? 'pedidos' : 'trabalhos'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-mustard-500" />
                <span className="text-xs text-gray-400">Novos</span>
              </div>
              <p className="text-lg font-bold text-white">
                {userRole === 'CLIENT' ? '2' : '5'}
              </p>
              <p className="text-xs text-gray-500">
                {userRole === 'CLIENT' ? 'orcamentos' : 'oportunidades'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
        {!collapsed && (
          <p className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Menu Principal
          </p>
        )}
        {navItems.map((item) => {
          // Fixed: Only match exact path for home pages, use startsWith for other pages
          const isHomePage = item.href === '/dashboard/cliente' || item.href === '/dashboard/profissional'
          const isActive = isHomePage
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-mustard-500 to-mustard-400 text-navy-900 shadow-lg shadow-mustard-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5',
                collapsed && 'justify-center px-0'
              )}
              title={collapsed ? item.label : undefined}
            >
              <div className={cn(
                'flex items-center justify-center w-9 h-9 rounded-lg transition-all',
                isActive
                  ? 'bg-navy-900/20'
                  : 'bg-white/5 group-hover:bg-white/10'
              )}>
                <item.icon size={18} className={isActive ? 'text-navy-900' : ''} />
              </div>
              {!collapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className={cn('truncate', isActive && 'font-semibold')}>{item.label}</p>
                    {!isActive && (
                      <p className="text-xs text-gray-500 truncate">{item.description}</p>
                    )}
                  </div>
                  {item.badge && (
                    <span className={cn(
                      'px-2 py-0.5 text-xs font-bold rounded-full',
                      isActive
                        ? 'bg-navy-900/20 text-navy-900'
                        : 'bg-mustard-500 text-navy-900'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {collapsed && item.badge && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full bg-mustard-500 text-navy-900">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-white/10 space-y-1.5">
        <Link
          href="/dashboard/configuracoes"
          className={cn(
            'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all',
            collapsed && 'justify-center px-0'
          )}
          title={collapsed ? 'Configuracoes' : undefined}
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5">
            <Settings size={18} />
          </div>
          {!collapsed && <span>Configuracoes</span>}
        </Link>
        <button
          onClick={handleLogout}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all',
            collapsed && 'justify-center px-0'
          )}
          title={collapsed ? 'Sair' : undefined}
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/10">
            <LogOut size={18} />
          </div>
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  )
}

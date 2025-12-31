'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  HelpCircle,
  Sparkles,
} from 'lucide-react'

interface DashboardHeaderProps {
  userName?: string
  userAvatar?: string
  notificationCount?: number
}

export default function DashboardHeader({
  userName,
  userAvatar,
  notificationCount = 0,
}: DashboardHeaderProps) {
  const router = useRouter()
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
      setSearchQuery('')
    }
  }

  const notifications = [
    { id: 1, title: 'Novo orcamento recebido', desc: 'Joao Silva enviou um orcamento', time: '5 min', unread: true },
    { id: 2, title: 'Servico confirmado', desc: 'Seu pedido #1234 foi confirmado', time: '1h', unread: true },
    { id: 3, title: 'Avaliacao pendente', desc: 'Avalie o servico de Maria Santos', time: '2h', unread: false },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Section - Mobile Menu & Search */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors">
            <Menu size={22} />
          </button>

          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-navy-900" />
            </div>
            <span className="font-bold text-navy-900">Repfy</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block relative">
            <form onSubmit={handleSearch}>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-mustard-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar servicos, profissionais..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 h-11 pl-11 pr-4 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-mustard-500 focus:ring-2 focus:ring-mustard-500/20 transition-all"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Search Button - Mobile */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <Search size={20} />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowUserMenu(false)
              }}
              className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors group"
            >
              <Bell size={20} className="group-hover:text-navy-900 transition-colors" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg shadow-red-500/30 animate-pulse">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
                    <h3 className="font-semibold text-navy-900">Notificacoes</h3>
                    <button className="text-xs text-mustard-600 hover:text-mustard-700 font-medium">
                      Marcar todas como lidas
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={cn(
                          'p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0',
                          notif.unread && 'bg-mustard-50/50'
                        )}
                      >
                        <div className="flex gap-3">
                          {notif.unread && (
                            <span className="w-2 h-2 rounded-full bg-mustard-500 mt-2 flex-shrink-0" />
                          )}
                          <div className={cn('flex-1', !notif.unread && 'ml-5')}>
                            <p className="text-sm font-medium text-navy-900">{notif.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{notif.desc}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time} atras</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                    <Link
                      href="/notificacoes"
                      className="block text-center text-sm font-medium text-mustard-600 hover:text-mustard-700 py-2 rounded-lg hover:bg-mustard-50 transition-colors"
                    >
                      Ver todas as notificacoes
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-1" />

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu)
                setShowNotifications(false)
              }}
              className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold text-sm shadow-lg shadow-mustard-500/20 group-hover:shadow-mustard-500/30 transition-shadow">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full rounded-xl object-cover" />
                ) : (
                  userName?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-navy-900">{userName || 'Usuario'}</p>
              </div>
              <ChevronDown size={16} className="hidden sm:block text-gray-400 group-hover:text-gray-600 transition-colors" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <p className="font-semibold text-navy-900">{userName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Gerenciar sua conta</p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/dashboard/cliente/perfil"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-navy-900 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <User size={16} />
                      </div>
                      Meu Perfil
                    </Link>
                    <Link
                      href="/dashboard/configuracoes"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-navy-900 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Settings size={16} />
                      </div>
                      Configuracoes
                    </Link>
                    <Link
                      href="/ajuda"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-navy-900 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <HelpCircle size={16} />
                      </div>
                      Ajuda e Suporte
                    </Link>
                  </div>
                  <div className="p-2 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                        <LogOut size={16} />
                      </div>
                      Sair da conta
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar servicos, profissionais..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full h-12 pl-12 pr-12 rounded-xl bg-gray-50 border border-gray-200 text-base placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-mustard-500 focus:ring-2 focus:ring-mustard-500/20"
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  )
}

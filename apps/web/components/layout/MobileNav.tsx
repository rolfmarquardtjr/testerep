'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Home,
  FileText,
  MessageSquare,
  User,
  Briefcase,
  PlusCircle,
  Sparkles,
} from 'lucide-react'

interface MobileNavProps {
  userRole: 'CLIENT' | 'PROFESSIONAL'
}

const clientNavItems = [
  { href: '/dashboard/cliente', label: 'Inicio', icon: Home },
  { href: '/dashboard/cliente/pedidos', label: 'Pedidos', icon: FileText },
  { href: '/solicitar-servico', label: 'Novo', icon: PlusCircle, highlight: true },
  { href: '/dashboard/cliente/mensagens', label: 'Chat', icon: MessageSquare, badge: 3 },
  { href: '/dashboard/cliente/perfil', label: 'Perfil', icon: User },
]

const professionalNavItems = [
  { href: '/dashboard/profissional', label: 'Inicio', icon: Home },
  { href: '/dashboard/profissional/oportunidades', label: 'Jobs', icon: Briefcase, badge: 5 },
  { href: '/dashboard/profissional/trabalhos', label: 'Trabalhos', icon: FileText },
  { href: '/dashboard/profissional/mensagens', label: 'Chat', icon: MessageSquare, badge: 2 },
  { href: '/dashboard/profissional/perfil', label: 'Perfil', icon: User },
]

export default function MobileNav({ userRole }: MobileNavProps) {
  const pathname = usePathname()
  const navItems = userRole === 'CLIENT' ? clientNavItems : professionalNavItems

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50" />

      {/* Nav Items */}
      <div className="relative flex items-center justify-around h-20 px-2 safe-area-bottom">
        {navItems.map((item) => {
          // Fixed: Only match exact path for home pages, use startsWith for other pages
          const isHomePage = item.href === '/dashboard/cliente' || item.href === '/dashboard/profissional'
          const isActive = isHomePage
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + '/')
          const isHighlight = 'highlight' in item && item.highlight
          const hasBadge = 'badge' in item && item.badge

          if (isHighlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-8"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center shadow-xl shadow-mustard-500/40 hover:shadow-mustard-500/60 transition-shadow">
                    <Sparkles className="w-7 h-7 text-navy-900" />
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-mustard-400 to-mustard-600 opacity-30 blur-lg -z-10" />
                </div>
                <span className="text-xs mt-2 font-semibold text-mustard-600">{item.label}</span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex flex-col items-center justify-center py-2 px-3 min-w-[60px] rounded-2xl transition-all',
                isActive
                  ? 'text-mustard-600'
                  : 'text-gray-400 hover:text-gray-600'
              )}
            >
              {/* Active Background */}
              {isActive && (
                <div className="absolute inset-0 bg-mustard-50 rounded-2xl" />
              )}

              {/* Icon Container */}
              <div className="relative">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                  isActive
                    ? 'bg-gradient-to-br from-mustard-400 to-mustard-500 shadow-lg shadow-mustard-500/30'
                    : 'bg-transparent'
                )}>
                  <item.icon
                    size={22}
                    className={isActive ? 'text-navy-900' : ''}
                  />
                </div>

                {/* Badge */}
                {hasBadge && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg shadow-red-500/30">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className={cn(
                'relative text-xs mt-1 transition-all',
                isActive ? 'font-semibold' : ''
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

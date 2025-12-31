'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home as HomeIcon,
  Compass,
  User,
  FileText,
  Plus
} from 'lucide-react'

interface NavItem {
  href: string
  icon: React.ReactNode
  label: string
  isCenter?: boolean
}

interface BottomNavProps {
  variant?: 'client' | 'professional'
}

export function BottomNav({ variant = 'client' }: BottomNavProps) {
  const pathname = usePathname()

  const clientNavItems: NavItem[] = [
    { href: '/', icon: <HomeIcon className="w-6 h-6" />, label: 'Inicio' },
    { href: '/explorar', icon: <Compass className="w-6 h-6" />, label: 'Explorar' },
    { href: '/solicitar-servico', icon: <Plus className="w-6 h-6" />, label: 'Solicitar', isCenter: true },
    { href: '/dashboard/client/solicitacoes', icon: <FileText className="w-6 h-6" />, label: 'Pedidos' },
    { href: '/dashboard/client/perfil', icon: <User className="w-6 h-6" />, label: 'Perfil' },
  ]

  const professionalNavItems: NavItem[] = [
    { href: '/', icon: <HomeIcon className="w-6 h-6" />, label: 'Inicio' },
    { href: '/dashboard/professional/leads', icon: <Compass className="w-6 h-6" />, label: 'Leads' },
    { href: '/dashboard/professional/proposals', icon: <FileText className="w-6 h-6" />, label: 'Propostas' },
    { href: '/dashboard/professional/perfil', icon: <User className="w-6 h-6" />, label: 'Perfil' },
  ]

  const navItems = variant === 'professional' ? professionalNavItems : clientNavItems

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 lg:hidden z-50 safe-area-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.href)

          if (item.isCenter) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 py-1 px-2"
              >
                <div className="w-14 h-14 bg-mustard-500 rounded-full flex items-center justify-center -mt-8 shadow-lg border-4 border-white">
                  {item.icon}
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 min-w-[60px] transition-colors ${
                active ? 'text-mustard-600' : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className={`text-[10px] ${active ? 'font-medium' : ''}`}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav

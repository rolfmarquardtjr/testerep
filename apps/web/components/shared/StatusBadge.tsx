'use client'

import { cn } from '@/lib/utils'

type Status =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED'
  | 'OPEN'
  | 'QUOTING'

interface StatusBadgeProps {
  status: Status | string
  size?: 'sm' | 'md'
  className?: string
}

const statusConfig: Record<string, { label: string; colors: string }> = {
  PENDING: {
    label: 'Pendente',
    colors: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  IN_PROGRESS: {
    label: 'Em Andamento',
    colors: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  COMPLETED: {
    label: 'Concluido',
    colors: 'bg-green-100 text-green-800 border-green-200',
  },
  CANCELLED: {
    label: 'Cancelado',
    colors: 'bg-red-100 text-red-800 border-red-200',
  },
  ACCEPTED: {
    label: 'Aceito',
    colors: 'bg-green-100 text-green-800 border-green-200',
  },
  REJECTED: {
    label: 'Recusado',
    colors: 'bg-red-100 text-red-800 border-red-200',
  },
  EXPIRED: {
    label: 'Expirado',
    colors: 'bg-gray-100 text-gray-800 border-gray-200',
  },
  OPEN: {
    label: 'Aberto',
    colors: 'bg-mustard-100 text-mustard-800 border-mustard-200',
  },
  QUOTING: {
    label: 'Recebendo Orcamentos',
    colors: 'bg-purple-100 text-purple-800 border-purple-200',
  },
}

export default function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    colors: 'bg-gray-100 text-gray-800 border-gray-200',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
        config.colors,
        className
      )}
    >
      {config.label}
    </span>
  )
}

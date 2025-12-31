'use client'

import { cn } from '@/lib/utils'
import { LucideIcon, FileX, Search, MessageSquare, Bell, Image } from 'lucide-react'
import { Button } from '@/components/ui'
import Link from 'next/link'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
  variant?: 'default' | 'compact'
  className?: string
}

const presetIcons = {
  noResults: Search,
  noData: FileX,
  noMessages: MessageSquare,
  noNotifications: Bell,
  noImages: Image,
}

export default function EmptyState({
  icon: Icon = FileX,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  variant = 'default',
  className,
}: EmptyStateProps) {
  const isCompact = variant === 'compact'

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        isCompact ? 'py-8 px-4' : 'py-16 px-6',
        className
      )}
    >
      <div
        className={cn(
          'rounded-full bg-gray-100 flex items-center justify-center mb-4',
          isCompact ? 'w-12 h-12' : 'w-16 h-16'
        )}
      >
        <Icon className={cn('text-gray-400', isCompact ? 'w-6 h-6' : 'w-8 h-8')} />
      </div>

      <h3
        className={cn(
          'font-semibold text-navy-900',
          isCompact ? 'text-base' : 'text-lg'
        )}
      >
        {title}
      </h3>

      {description && (
        <p
          className={cn(
            'text-gray-500 mt-1 max-w-sm',
            isCompact ? 'text-sm' : 'text-base'
          )}
        >
          {description}
        </p>
      )}

      {(actionLabel && (actionHref || onAction)) && (
        <div className="mt-4">
          {actionHref ? (
            <Button asChild size={isCompact ? 'sm' : 'default'}>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button onClick={onAction} size={isCompact ? 'sm' : 'default'}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

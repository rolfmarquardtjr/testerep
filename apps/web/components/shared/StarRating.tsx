'use client'

import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import { useState } from 'react'

interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  totalReviews?: number
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}

export default function StarRating({
  value,
  onChange,
  readonly = false,
  size = 'md',
  showValue = false,
  totalReviews,
  className,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState(0)

  const displayValue = hoverValue || value

  const handleClick = (starValue: number) => {
    if (!readonly && onChange) {
      onChange(starValue)
    }
  }

  const handleMouseEnter = (starValue: number) => {
    if (!readonly) {
      setHoverValue(starValue)
    }
  }

  const handleMouseLeave = () => {
    setHoverValue(0)
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= displayValue
          const isHalf = star === Math.ceil(displayValue) && displayValue % 1 !== 0

          return (
            <button
              key={star}
              type="button"
              onClick={() => handleClick(star)}
              onMouseEnter={() => handleMouseEnter(star)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              className={cn(
                'p-0.5 transition-transform',
                !readonly && 'hover:scale-110 cursor-pointer',
                readonly && 'cursor-default'
              )}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled
                    ? 'fill-mustard-400 text-mustard-400'
                    : 'fill-transparent text-gray-300'
                )}
              />
            </button>
          )
        })}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-navy-900 ml-1">
          {value.toFixed(1)}
        </span>
      )}

      {totalReviews !== undefined && (
        <span className="text-sm text-gray-500 ml-1">
          ({totalReviews})
        </span>
      )}
    </div>
  )
}

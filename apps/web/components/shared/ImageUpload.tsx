'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

interface ImageUploadProps {
  value?: string[]
  onChange?: (files: File[], previews: string[]) => void
  maxFiles?: number
  maxSizeMB?: number
  className?: string
  disabled?: boolean
}

export default function ImageUpload({
  value = [],
  onChange,
  maxFiles = 5,
  maxSizeMB = 5,
  className,
  disabled = false,
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>(value)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState<string>('')
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles || disabled) return
      setError('')

      const validFiles: File[] = []
      const validPreviews: string[] = []

      const remainingSlots = maxFiles - previews.length

      Array.from(newFiles).slice(0, remainingSlots).forEach((file) => {
        // Check file type
        if (!file.type.startsWith('image/')) {
          setError('Apenas imagens sao permitidas')
          return
        }

        // Check file size
        if (file.size > maxSizeMB * 1024 * 1024) {
          setError(`Tamanho maximo: ${maxSizeMB}MB`)
          return
        }

        validFiles.push(file)
        validPreviews.push(URL.createObjectURL(file))
      })

      if (validFiles.length > 0) {
        const newFilesArray = [...files, ...validFiles]
        const newPreviewsArray = [...previews, ...validPreviews]

        setFiles(newFilesArray)
        setPreviews(newPreviewsArray)

        if (onChange) {
          onChange(newFilesArray, newPreviewsArray)
        }
      }
    },
    [files, previews, maxFiles, maxSizeMB, disabled, onChange]
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const removeImage = useCallback(
    (index: number) => {
      const newPreviews = previews.filter((_, i) => i !== index)
      const newFiles = files.filter((_, i) => i !== index)

      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(previews[index])

      setPreviews(newPreviews)
      setFiles(newFiles)

      if (onChange) {
        onChange(newFiles, newPreviews)
      }
    },
    [files, previews, onChange]
  )

  const canAddMore = previews.length < maxFiles

  return (
    <div className={cn('space-y-4', className)}>
      {/* Upload Area */}
      {canAddMore && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            'relative border-2 border-dashed rounded-xl p-8 text-center transition-colors',
            dragActive
              ? 'border-mustard-500 bg-mustard-50'
              : 'border-gray-300 hover:border-mustard-400',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            disabled={disabled}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-navy-900 mb-1">
              Arraste imagens ou clique para selecionar
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG ate {maxSizeMB}MB ({previews.length}/{maxFiles})
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
            >
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                disabled={disabled}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

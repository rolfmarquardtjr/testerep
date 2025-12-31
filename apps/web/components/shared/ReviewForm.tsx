'use client'

import { useState } from 'react'
import { Button, Card, CardContent, Textarea } from '@/components/ui'
import { StarRating } from '@/components/shared'
import { CheckCircle } from 'lucide-react'
import { getApiUrl } from '@/lib/api'

interface ReviewFormProps {
  professionalId: string
  professionalName: string
  serviceRequestId: string
  onSubmit?: () => void
  onCancel?: () => void
}

export default function ReviewForm({
  professionalId,
  professionalName,
  serviceRequestId,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      setError('Por favor, selecione uma avaliacao')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(getApiUrl('/api/reviews'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          professionalId,
          serviceRequestId,
          rating,
          comment,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          onSubmit?.()
        }, 2000)
      } else {
        setError(data.message || 'Erro ao enviar avaliacao')
      }
    } catch (err) {
      console.error('Error submitting review:', err)
      setError('Erro ao enviar avaliacao. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-navy-900 mb-2">Avaliacao Enviada!</h3>
          <p className="text-gray-600">
            Obrigado por avaliar o profissional. Sua opiniao ajuda outros clientes.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-navy-900 mb-4">
          Avaliar {professionalName}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Como foi sua experiencia?
            </label>
            <StarRating
              value={rating}
              onChange={setRating}
              size="lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deixe um comentario (opcional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte como foi sua experiencia com o profissional..."
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
                disabled={submitting}
              >
                Cancelar
              </Button>
            )}
            <Button
              type="submit"
              className="flex-1 bg-mustard-500 hover:bg-mustard-600 text-navy-900"
              disabled={submitting || rating === 0}
            >
              {submitting ? 'Enviando...' : 'Enviar Avaliacao'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

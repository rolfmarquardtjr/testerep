'use client'

import { Button, Input, Label } from '@/components/ui'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { getApiUrl } from '@/lib/api'

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch(getApiUrl('/api/auth/forgot-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
      } else {
        setError(data.error || 'Erro ao enviar e-mail de recuperação')
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6 md:p-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-2xl font-bold">Repfy</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">
          {success ? (
            // Success State
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy-600 mb-4">
                E-mail Enviado!
              </h1>
              <p className="text-gray-600 mb-2">
                Enviamos um link de recuperação para:
              </p>
              <p className="text-navy-900 font-semibold mb-6">
                {email}
              </p>
              <p className="text-gray-600 mb-8">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-medium"
                >
                  <Link href="/login">Voltar para Login</Link>
                </Button>
                <button
                  onClick={() => {
                    setSuccess(false)
                    setEmail('')
                  }}
                  className="w-full text-sm text-gray-600 hover:text-mustard-600 transition-colors"
                >
                  Não recebeu o e-mail? Tentar novamente
                </button>
              </div>
            </div>
          ) : (
            // Form State
            <>
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-mustard-100 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-mustard-600" />
                </div>
              </div>

              {/* Title */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-navy-600 mb-2">
                  Recuperar Senha
                </h1>
                <p className="text-gray-600">
                  Informe seu e-mail e enviaremos um link para redefinir sua senha
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-navy-900">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="h-12 text-base border-gray-300 focus:border-mustard-500 focus:ring-mustard-500"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-medium text-base transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
                </Button>

                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-600 hover:text-mustard-600 transition-colors"
                  >
                    Voltar para Login
                  </Link>
                </div>
              </form>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Nota:</strong> O link de recuperação expira em 1 hora. Se você não receber o e-mail em alguns minutos, verifique sua pasta de spam ou tente novamente.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

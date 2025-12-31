'use client'

import { Button, Input, Label } from '@/components/ui'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'
import { getApiUrl } from '@/lib/api'

function RedefinirSenhaContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Token de recuperação inválido ou ausente')
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      setError('Token de recuperação inválido')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(getApiUrl('/api/auth/reset-password'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      } else {
        setError(data.error || 'Erro ao redefinir senha')
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-navy-600 mb-4">
            Link Inválido
          </h1>
          <p className="text-gray-600 mb-8">
            Este link de recuperação de senha é inválido ou expirou.
          </p>
          <Button
            asChild
            className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-medium"
          >
            <Link href="/recuperar-senha">Solicitar Novo Link</Link>
          </Button>
        </div>
      </div>
    )
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
                Senha Redefinida!
              </h1>
              <p className="text-gray-600 mb-8">
                Sua senha foi alterada com sucesso. Você será redirecionado para a página de login em instantes.
              </p>
              <Button
                asChild
                className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-medium"
              >
                <Link href="/login">Ir para Login</Link>
              </Button>
            </div>
          ) : (
            // Form State
            <>
              {/* Title */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-navy-600 mb-2">
                  Redefinir Senha
                </h1>
                <p className="text-gray-600">
                  Digite sua nova senha
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
                  <Label htmlFor="password" className="text-sm font-medium text-navy-900">
                    Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 8 caracteres"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      className="h-12 text-base pr-12 border-gray-300 focus:border-mustard-500 focus:ring-mustard-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-mustard-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-navy-900">
                    Confirmar Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Digite a senha novamente"
                      value={confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                      className="h-12 text-base pr-12 border-gray-300 focus:border-mustard-500 focus:ring-mustard-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-mustard-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2">A senha deve conter:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className={password.length >= 8 ? 'text-green-600' : ''}>
                      • Mínimo de 8 caracteres
                    </li>
                    <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                      • Pelo menos uma letra maiúscula
                    </li>
                    <li className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
                      • Pelo menos uma letra minúscula
                    </li>
                    <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                      • Pelo menos um número
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-medium text-base transition-colors"
                  disabled={loading || password !== confirmPassword || password.length < 8}
                >
                  {loading ? 'Redefinindo...' : 'Redefinir Senha'}
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <RedefinirSenhaContent />
    </Suspense>
  )
}

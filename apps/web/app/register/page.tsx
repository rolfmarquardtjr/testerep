'use client'

import { Button, Input, Label } from '@/components/ui'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react'
import { getApiUrl } from '@/lib/api'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'CLIENT' as 'CLIENT' | 'PROFESSIONAL',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z\d]/.test(password)) strength++
    return strength
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setFormData({ ...formData, password: newPassword })
    setPasswordStrength(calculatePasswordStrength(newPassword))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(getApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('accessToken', data.data.accessToken)
        localStorage.setItem('refreshToken', data.data.refreshToken)
        localStorage.setItem('user', JSON.stringify(data.data.user))

        // Redirect based on role
        if (data.data.user.role === 'PROFESSIONAL') {
          router.push('/dashboard/profissional')
        } else {
          router.push('/dashboard/cliente')
        }
      } else {
        setError(data.error || 'Falha no cadastro')
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500'
    if (passwordStrength <= 3) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Fraca'
    if (passwordStrength <= 3) return 'Média'
    return 'Forte'
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="p-6 md:p-8">
        <Link href="/" className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-2xl font-bold">Repfy</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-navy-600 mb-2">
              Criar conta
            </h1>
            <p className="text-gray-600">
              Preencha seus dados para começar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-navy-900">
                Tipo de conta
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'CLIENT' })}
                  className={`relative p-4 border-2 rounded-lg text-center transition-all ${
                    formData.role === 'CLIENT'
                      ? 'border-mustard-500 bg-mustard-50'
                      : 'border-gray-200 hover:border-mustard-300'
                  }`}
                >
                  {formData.role === 'CLIENT' && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-mustard-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-navy-900" />
                    </div>
                  )}
                  <div className="font-semibold text-navy-900 mb-1">Cliente</div>
                  <div className="text-xs text-gray-600">
                    Busco profissionais
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'PROFESSIONAL' })}
                  className={`relative p-4 border-2 rounded-lg text-center transition-all ${
                    formData.role === 'PROFESSIONAL'
                      ? 'border-mustard-500 bg-mustard-50'
                      : 'border-gray-200 hover:border-mustard-300'
                  }`}
                >
                  {formData.role === 'PROFESSIONAL' && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-mustard-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-navy-900" />
                    </div>
                  )}
                  <div className="font-semibold text-navy-900 mb-1">Profissional</div>
                  <div className="text-xs text-gray-600">
                    Ofereço serviços
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-navy-900">
                Nome completo
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="João Silva"
                value={formData.name}
                onChange={handleChange}
                className="h-12 text-base border-gray-300 focus:border-mustard-500 focus:ring-mustard-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-navy-900">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                className="h-12 text-base border-gray-300 focus:border-mustard-500 focus:ring-mustard-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-navy-900">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={handlePasswordChange}
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
              {formData.password && (
                <div className="space-y-1.5">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          i < passwordStrength ? 'bg-mustard-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Força: <span className="font-medium text-mustard-600">{getPasswordStrengthText()}</span>
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-navy-900">
                Confirmar senha
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Digite a senha novamente"
                  value={formData.confirmPassword}
                  onChange={handleChange}
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
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-xs text-mustard-600 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  As senhas coincidem
                </p>
              )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-4 h-4 rounded border-gray-300 text-mustard-500 focus:ring-mustard-500" required />
              <span className="text-sm text-gray-600">
                Concordo com os{' '}
                <Link href="/termos" className="font-medium text-navy-600 underline hover:text-mustard-600">
                  Termos de Uso
                </Link>{' '}
                e{' '}
                <Link href="/privacidade" className="font-medium text-navy-600 underline hover:text-mustard-600">
                  Política de Privacidade
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-medium text-base transition-colors"
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar conta'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">
                  ou
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                type="button"
                className="w-full h-12 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-navy-900 font-medium">Continuar com Google</span>
              </Button>
              <Button
                variant="outline"
                type="button"
                className="w-full h-12 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-navy-900 font-medium">Continuar com Facebook</span>
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link href="/login" className="font-semibold text-navy-600 hover:text-mustard-600 transition-colors">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

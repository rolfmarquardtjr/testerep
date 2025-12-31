'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Input, Label } from '@/components/ui'
import { LoadingSpinner } from '@/components/shared'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Lock,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Shield,
  HelpCircle,
  FileText,
  Calendar,
  CreditCard,
  Star,
  Award,
  Edit3,
  X,
  Settings,
  CheckCircle,
  Home,
  Search,
  MessageSquare,
} from 'lucide-react'

interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  city?: string
  state?: string
  address?: string
  cpf?: string
  createdAt?: string
}

export default function PerfilPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    address: '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('http://localhost:3001/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (data.success) {
        setProfile(data.data)
        setFormData({
          name: data.data.name || '',
          phone: data.data.phone || '',
          city: data.data.city || '',
          state: data.data.state || '',
          address: data.data.address || '',
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const token = localStorage.getItem('accessToken')

      let avatarUrl = profile?.avatar
      if (avatarFile) {
        const formDataUpload = new FormData()
        formDataUpload.append('file', avatarFile)

        const uploadResponse = await fetch('http://localhost:3001/api/upload', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formDataUpload,
        })

        const uploadData = await uploadResponse.json()
        if (uploadData.success) {
          avatarUrl = uploadData.data.url
        }
      }

      const response = await fetch('http://localhost:3001/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          avatar: avatarUrl,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setProfile(data.data)
        setSuccessMessage('Perfil atualizado com sucesso!')
        setAvatarFile(null)
        setActiveSection(null)
      } else {
        setErrorMessage(data.message || 'Erro ao atualizar perfil')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      setErrorMessage('Erro ao salvar perfil. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('As senhas nao coincidem')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setErrorMessage('A nova senha deve ter no minimo 6 caracteres')
      return
    }

    setSaving(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('http://localhost:3001/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setSuccessMessage('Senha alterada com sucesso!')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setActiveSection(null)
      } else {
        setErrorMessage(data.message || 'Erro ao alterar senha')
      }
    } catch (error) {
      console.error('Error changing password:', error)
      setErrorMessage('Erro ao alterar senha. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/')
  }

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]

  const formatDate = (date?: string) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" text="Carregando..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Messages Toast */}
      {(successMessage || errorMessage) && (
        <div className="fixed top-4 right-4 z-50">
          {successMessage && (
            <div className="p-4 bg-green-500 text-white rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-right">
              <CheckCircle className="w-5 h-5" />
              {successMessage}
              <button onClick={() => setSuccessMessage('')}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {errorMessage && (
            <div className="p-4 bg-red-500 text-white rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-right">
              <X className="w-5 h-5" />
              {errorMessage}
              <button onClick={() => setErrorMessage('')}>
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Hero Banner */}
        <div className="max-w-7xl mx-auto px-8 pt-8">
          <div className="bg-navy-900 rounded-3xl p-8 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-800 to-transparent" />
            <div className="relative z-10 flex items-center gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-mustard-500 flex items-center justify-center text-navy-900 font-bold text-4xl overflow-hidden border-4 border-white/20 shadow-2xl">
                  {avatarPreview || profile?.avatar ? (
                    <img
                      src={avatarPreview || profile?.avatar}
                      alt={profile?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    profile?.name?.charAt(0) || 'U'
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-mustard-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-mustard-400 transition-colors shadow-lg">
                  <Camera className="w-4 h-4 text-navy-900" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{profile?.name}</h1>
                  <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Verificado
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{profile?.email}</p>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-sm text-gray-400">Pedidos</p>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">4.8</p>
                    <p className="text-sm text-gray-400">Avaliacao</p>
                  </div>
                  <div className="w-px h-10 bg-white/20" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">8</p>
                    <p className="text-sm text-gray-400">Concluidos</p>
                  </div>
                </div>
              </div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600"
              alt="Perfil"
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-8 pb-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Quick Actions */}
            <div className="col-span-1 space-y-6">
              {/* Quick Settings */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <h3 className="font-semibold text-navy-900 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-mustard-600" />
                    Acesso Rapido
                  </h3>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => setActiveSection('dados')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeSection === 'dados' ? 'bg-mustard-50 text-mustard-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeSection === 'dados' ? 'bg-mustard-500 text-navy-900' : 'bg-mustard-100 text-mustard-600'
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Dados Pessoais</p>
                      <p className="text-xs text-gray-500">Nome, telefone, endereco</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setActiveSection('seguranca')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeSection === 'seguranca' ? 'bg-mustard-50 text-mustard-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeSection === 'seguranca' ? 'bg-mustard-500 text-navy-900' : 'bg-mustard-100 text-mustard-600'
                    }`}>
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Seguranca</p>
                      <p className="text-xs text-gray-500">Alterar senha</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setActiveSection('notificacoes')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeSection === 'notificacoes' ? 'bg-mustard-50 text-mustard-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeSection === 'notificacoes' ? 'bg-mustard-500 text-navy-900' : 'bg-mustard-100 text-mustard-600'
                    }`}>
                      <Bell className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Notificacoes</p>
                      <p className="text-xs text-gray-500">Preferencias de alertas</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Support Links */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <h3 className="font-semibold text-navy-900">Suporte</h3>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-mustard-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Central de Ajuda</p>
                      <p className="text-xs text-gray-500">Duvidas frequentes</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-mustard-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Privacidade</p>
                      <p className="text-xs text-gray-500">Termos e politicas</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 bg-red-50 hover:bg-red-100 rounded-2xl transition-colors border border-red-100"
              >
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <p className="font-medium text-red-600">Sair da conta</p>
              </button>
            </div>

            {/* Right Column - Content */}
            <div className="col-span-2">
              {/* Personal Data Form */}
              {activeSection === 'dados' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-navy-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-900">Dados Pessoais</h3>
                        <p className="text-sm text-gray-500">Atualize suas informacoes pessoais</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nome Completo</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-12 rounded-xl border-gray-200 focus:border-mustard-500 focus:ring-mustard-500"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                        <Input
                          id="email"
                          value={profile?.email || ''}
                          disabled
                          className="h-12 rounded-xl bg-gray-50 border-gray-200"
                        />
                        <p className="text-xs text-gray-400">O email nao pode ser alterado</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefone</Label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-12 pl-12 rounded-xl border-gray-200 focus:border-mustard-500 focus:ring-mustard-500"
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">Endereco</Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="h-12 pl-12 rounded-xl border-gray-200 focus:border-mustard-500 focus:ring-mustard-500"
                            placeholder="Rua, numero, bairro"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium text-gray-700">Cidade</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="h-12 rounded-xl border-gray-200 focus:border-mustard-500 focus:ring-mustard-500"
                          placeholder="Sua cidade"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-medium text-gray-700">Estado</Label>
                        <select
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mustard-500 focus:border-mustard-500"
                        >
                          <option value="">Selecione o estado</option>
                          {brazilianStates.map((state) => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveSection(null)}
                        className="flex-1 h-12 rounded-xl"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium"
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <LoadingSpinner size="sm" />
                            <span className="ml-2">Salvando...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5 mr-2" />
                            Salvar Alteracoes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Form */}
              {activeSection === 'seguranca' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center">
                        <Lock className="w-6 h-6 text-navy-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-900">Seguranca</h3>
                        <p className="text-sm text-gray-500">Altere sua senha de acesso</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleChangePassword} className="p-6 space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">Senha Atual</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="h-12 rounded-xl border-gray-200 focus:border-mustard-500 focus:ring-mustard-500"
                        placeholder="Digite sua senha atual"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">Nova Senha</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="h-12 rounded-xl border-gray-200 focus:border-mustard-500 focus:ring-mustard-500"
                          placeholder="Digite a nova senha"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmar Senha</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className="h-12 rounded-xl border-gray-200 focus:border-mustard-500 focus:ring-mustard-500"
                          placeholder="Confirme a nova senha"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-sm text-amber-800">
                        A senha deve ter no minimo 6 caracteres. Recomendamos usar letras, numeros e caracteres especiais.
                      </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setActiveSection(null)}
                        className="flex-1 h-12 rounded-xl"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium"
                        disabled={saving}
                      >
                        {saving ? 'Alterando...' : 'Alterar Senha'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Notifications */}
              {activeSection === 'notificacoes' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center">
                        <Bell className="w-6 h-6 text-navy-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-900">Notificacoes</h3>
                        <p className="text-sm text-gray-500">Configure suas preferencias de alertas</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {[
                      { title: 'Novos Orcamentos', desc: 'Quando profissionais enviarem orcamentos', default: true },
                      { title: 'Mensagens', desc: 'Novas mensagens de profissionais', default: true },
                      { title: 'Status do Pedido', desc: 'Atualizacoes sobre seus pedidos', default: true },
                      { title: 'Marketing', desc: 'Novidades e promocoes', default: false },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-medium text-navy-900">{item.title}</p>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                          <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-mustard-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 pb-6">
                    <Button
                      onClick={() => setActiveSection(null)}
                      className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium"
                    >
                      Salvar Preferencias
                    </Button>
                  </div>
                </div>
              )}

              {/* Default View */}
              {!activeSection && (
                <div className="space-y-6">
                  {/* Current Info Card */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-navy-900">Informacoes da Conta</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setActiveSection('dados')}
                          className="border-mustard-300 text-mustard-700 hover:bg-mustard-50"
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Editar
                        </Button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Nome
                          </p>
                          <p className="font-medium text-navy-900">{profile?.name || '-'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email
                          </p>
                          <p className="font-medium text-navy-900">{profile?.email || '-'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Telefone
                          </p>
                          <p className="font-medium text-navy-900">{profile?.phone || '-'}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Endereco
                          </p>
                          <p className="font-medium text-navy-900">
                            {profile?.address ? `${profile.address}, ${profile.city} - ${profile.state}` : '-'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-mustard-200 transition-all text-left group">
                      <div className="w-12 h-12 bg-mustard-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-mustard-200 transition-colors">
                        <FileText className="w-6 h-6 text-mustard-600" />
                      </div>
                      <h4 className="font-semibold text-navy-900 mb-1">Meus Pedidos</h4>
                      <p className="text-sm text-gray-500">Veja o historico de pedidos</p>
                    </button>

                    <button className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-mustard-200 transition-all text-left group">
                      <div className="w-12 h-12 bg-mustard-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-mustard-200 transition-colors">
                        <CreditCard className="w-6 h-6 text-mustard-600" />
                      </div>
                      <h4 className="font-semibold text-navy-900 mb-1">Pagamentos</h4>
                      <p className="text-sm text-gray-500">Gerencie formas de pagamento</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden pb-20">
        {/* Mobile Header with Profile */}
        <div className="bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 px-4 pt-6 pb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-mustard-500 flex items-center justify-center text-navy-900 font-bold text-3xl overflow-hidden border-2 border-white/20 shadow-xl">
                {avatarPreview || profile?.avatar ? (
                  <img
                    src={avatarPreview || profile?.avatar}
                    alt={profile?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profile?.name?.charAt(0) || 'U'
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-mustard-500 rounded-lg flex items-center justify-center cursor-pointer shadow-lg">
                <Camera className="w-4 h-4 text-navy-900" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">{profile?.name}</h1>
              <p className="text-white/60 text-sm">{profile?.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-xs text-white/60">Pedidos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white">4.8</p>
              <p className="text-xs text-white/60">Avaliacao</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-xs text-white/60">Concluidos</p>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="px-4 -mt-4 space-y-4">
          {/* Menu Options - when no section selected */}
          {!activeSection && (
            <>
              {/* Account Section */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <p className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase bg-gray-50 border-b border-gray-100">Conta</p>

                <button
                  onClick={() => setActiveSection('dados')}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <User className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Dados Pessoais</p>
                    <p className="text-xs text-gray-500">Nome, telefone, endereco</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  onClick={() => setActiveSection('seguranca')}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Seguranca</p>
                    <p className="text-xs text-gray-500">Alterar senha</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  onClick={() => setActiveSection('notificacoes')}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Notificacoes</p>
                    <p className="text-xs text-gray-500">Preferencias de alertas</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Support Section */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <p className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase bg-gray-50 border-b border-gray-100">Suporte</p>

                <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Central de Ajuda</p>
                    <p className="text-xs text-gray-500">Duvidas frequentes</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100">
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Privacidade</p>
                    <p className="text-xs text-gray-500">Termos e politicas</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors border border-red-100"
              >
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <p className="font-medium text-red-600">Sair da conta</p>
              </button>
            </>
          )}

          {/* Edit Personal Data - Mobile */}
          {activeSection === 'dados' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                <button
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </button>
                <h3 className="text-lg font-semibold text-navy-900">Dados Pessoais</h3>
              </div>

              <form onSubmit={handleSaveProfile} className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-mobile" className="text-sm font-medium text-gray-700">Nome Completo</Label>
                  <Input
                    id="name-mobile"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-mobile" className="text-sm font-medium text-gray-700">Email</Label>
                  <Input
                    id="email-mobile"
                    value={profile?.email || ''}
                    disabled
                    className="h-12 rounded-xl bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-mobile" className="text-sm font-medium text-gray-700">Telefone</Label>
                  <Input
                    id="phone-mobile"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address-mobile" className="text-sm font-medium text-gray-700">Endereco</Label>
                  <Input
                    id="address-mobile"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="Rua, numero, bairro"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="city-mobile" className="text-sm font-medium text-gray-700">Cidade</Label>
                    <Input
                      id="city-mobile"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="h-12 rounded-xl"
                      placeholder="Sua cidade"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state-mobile" className="text-sm font-medium text-gray-700">Estado</Label>
                    <select
                      id="state-mobile"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full h-12 px-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mustard-500"
                    >
                      <option value="">UF</option>
                      {brazilianStates.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium"
                  disabled={saving}
                >
                  {saving ? 'Salvando...' : 'Salvar Alteracoes'}
                </Button>
              </form>
            </div>
          )}

          {/* Change Password - Mobile */}
          {activeSection === 'seguranca' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                <button
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </button>
                <h3 className="text-lg font-semibold text-navy-900">Alterar Senha</h3>
              </div>

              <form onSubmit={handleChangePassword} className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword-mobile" className="text-sm font-medium text-gray-700">Senha Atual</Label>
                  <Input
                    id="currentPassword-mobile"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="Digite sua senha atual"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword-mobile" className="text-sm font-medium text-gray-700">Nova Senha</Label>
                  <Input
                    id="newPassword-mobile"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="Digite a nova senha"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword-mobile" className="text-sm font-medium text-gray-700">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmPassword-mobile"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="h-12 rounded-xl"
                    placeholder="Confirme a nova senha"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium"
                  disabled={saving}
                >
                  {saving ? 'Alterando...' : 'Alterar Senha'}
                </Button>
              </form>
            </div>
          )}

          {/* Notifications - Mobile */}
          {activeSection === 'notificacoes' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                <button
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </button>
                <h3 className="text-lg font-semibold text-navy-900">Notificacoes</h3>
              </div>

              <div className="p-4 space-y-3">
                {[
                  { title: 'Novos Orcamentos', desc: 'Quando profissionais enviarem orcamentos', default: true },
                  { title: 'Mensagens', desc: 'Novas mensagens de profissionais', default: true },
                  { title: 'Status do Pedido', desc: 'Atualizacoes sobre seus pedidos', default: true },
                  { title: 'Marketing', desc: 'Novidades e promocoes', default: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-navy-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mustard-500"></div>
                    </label>
                  </div>
                ))}

                <Button
                  onClick={() => setActiveSection(null)}
                  className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium mt-4"
                >
                  Salvar Preferencias
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40">
          <div className="flex items-center justify-around">
            <Link href="/dashboard/cliente" className="flex flex-col items-center py-2 px-3 text-gray-400">
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Inicio</span>
            </Link>
            <Link href="/dashboard/cliente/pedidos" className="flex flex-col items-center py-2 px-3 text-gray-400">
              <FileText className="w-6 h-6" />
              <span className="text-xs mt-1">Pedidos</span>
            </Link>
            <Link href="/explorar" className="flex flex-col items-center py-2 px-3 text-gray-400">
              <Search className="w-6 h-6" />
              <span className="text-xs mt-1">Explorar</span>
            </Link>
            <Link href="/dashboard/cliente/mensagens" className="flex flex-col items-center py-2 px-3 text-gray-400">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs mt-1">Mensagens</span>
            </Link>
            <Link href="/dashboard/cliente/perfil" className="flex flex-col items-center py-2 px-3 text-mustard-600">
              <User className="w-6 h-6" />
              <span className="text-xs mt-1 font-medium">Perfil</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

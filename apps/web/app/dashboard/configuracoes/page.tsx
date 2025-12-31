'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Input, Label } from '@/components/ui'
import { LoadingSpinner } from '@/components/shared'
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  CreditCard,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageSquare,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Download,
  FileText,
  Home,
  Search,
  User,
  X,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react'

type SettingsSection = 'notificacoes' | 'privacidade' | 'aparencia' | 'idioma' | 'pagamentos' | 'ajuda' | 'conta' | null

export default function ConfiguracoesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<SettingsSection>(null)
  const [userRole, setUserRole] = useState<'CLIENT' | 'PROFESSIONAL'>('CLIENT')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Settings states
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    orcamentos: true,
    mensagens: true,
    atualizacoes: true,
  })

  const [privacy, setPrivacy] = useState({
    perfilPublico: true,
    mostrarAvaliacao: true,
    mostrarLocalizacao: false,
    permitirMensagens: true,
  })

  const [appearance, setAppearance] = useState({
    tema: 'light' as 'light' | 'dark' | 'system',
  })

  useEffect(() => {
    const role = localStorage.getItem('userRole') as 'CLIENT' | 'PROFESSIONAL'
    if (role) setUserRole(role)
    setLoading(false)
  }, [])

  const handleSave = (section: string) => {
    setSuccessMessage(`Configuracoes de ${section} salvas com sucesso!`)
    setTimeout(() => setSuccessMessage(''), 3000)
    setActiveSection(null)
  }

  const getDashboardPath = () => {
    return userRole === 'CLIENT' ? '/dashboard/cliente' : '/dashboard/profissional'
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
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-mustard-500 rounded-2xl flex items-center justify-center">
                  <Settings className="w-7 h-7 text-navy-900" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Configuracoes</h1>
                  <p className="text-gray-400">Personalize sua experiencia</p>
                </div>
              </div>
              <p className="text-gray-300">
                Gerencie suas preferencias de notificacoes, privacidade, aparencia e muito mais.
              </p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"
              alt="Configuracoes"
              className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-30"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-8 pb-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Column - Settings Menu */}
            <div className="col-span-1 space-y-4">
              {/* Main Settings */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <h3 className="font-semibold text-navy-900">Preferencias</h3>
                </div>
                <div className="p-2">
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
                      <p className="text-xs text-gray-500">Email, push e SMS</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setActiveSection('privacidade')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeSection === 'privacidade' ? 'bg-mustard-50 text-mustard-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeSection === 'privacidade' ? 'bg-mustard-500 text-navy-900' : 'bg-mustard-100 text-mustard-600'
                    }`}>
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Privacidade</p>
                      <p className="text-xs text-gray-500">Visibilidade do perfil</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setActiveSection('aparencia')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeSection === 'aparencia' ? 'bg-mustard-50 text-mustard-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeSection === 'aparencia' ? 'bg-mustard-500 text-navy-900' : 'bg-mustard-100 text-mustard-600'
                    }`}>
                      <Palette className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Aparencia</p>
                      <p className="text-xs text-gray-500">Tema e visual</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setActiveSection('idioma')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeSection === 'idioma' ? 'bg-mustard-50 text-mustard-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeSection === 'idioma' ? 'bg-mustard-500 text-navy-900' : 'bg-mustard-100 text-mustard-600'
                    }`}>
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Idioma e Regiao</p>
                      <p className="text-xs text-gray-500">Portugues (Brasil)</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                  <h3 className="font-semibold text-navy-900">Conta</h3>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => setActiveSection('pagamentos')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeSection === 'pagamentos' ? 'bg-mustard-50 text-mustard-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeSection === 'pagamentos' ? 'bg-mustard-500 text-navy-900' : 'bg-mustard-100 text-mustard-600'
                    }`}>
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Pagamentos</p>
                      <p className="text-xs text-gray-500">Metodos de pagamento</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <button
                    onClick={() => setActiveSection('conta')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeSection === 'conta' ? 'bg-mustard-50 text-mustard-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeSection === 'conta' ? 'bg-mustard-500 text-navy-900' : 'bg-mustard-100 text-mustard-600'
                    }`}>
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Conta e Dados</p>
                      <p className="text-xs text-gray-500">Exportar e excluir</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Help */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-2">
                  <button
                    onClick={() => setActiveSection('ajuda')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeSection === 'ajuda' ? 'bg-mustard-50 text-mustard-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      activeSection === 'ajuda' ? 'bg-mustard-500 text-navy-900' : 'bg-mustard-100 text-mustard-600'
                    }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-navy-900">Ajuda e Suporte</p>
                      <p className="text-xs text-gray-500">Central de ajuda</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Back to Dashboard */}
              <Link
                href={getDashboardPath()}
                className="flex items-center gap-3 p-4 bg-navy-50 hover:bg-navy-100 rounded-2xl transition-colors border border-navy-100"
              >
                <div className="w-10 h-10 bg-navy-100 rounded-xl flex items-center justify-center">
                  <ChevronLeft className="w-5 h-5 text-navy-600" />
                </div>
                <p className="font-medium text-navy-700">Voltar ao Dashboard</p>
              </Link>
            </div>

            {/* Right Column - Content */}
            <div className="col-span-2">
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
                        <p className="text-sm text-gray-500">Escolha como deseja receber alertas</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Channels */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">Canais de notificacao</h4>
                      <div className="space-y-3">
                        {[
                          { key: 'email', icon: Mail, title: 'Email', desc: 'Receba notificacoes por email' },
                          { key: 'push', icon: Smartphone, title: 'Push', desc: 'Notificacoes no navegador' },
                          { key: 'sms', icon: MessageSquare, title: 'SMS', desc: 'Mensagens de texto' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <item.icon className="w-5 h-5 text-gray-500" />
                              <div>
                                <p className="font-medium text-navy-900">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.desc}</p>
                              </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications[item.key as keyof typeof notifications]}
                                onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-mustard-500"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Types */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">Tipos de notificacao</h4>
                      <div className="space-y-3">
                        {[
                          { key: 'orcamentos', title: 'Novos orcamentos', desc: 'Quando receber um orcamento' },
                          { key: 'mensagens', title: 'Mensagens', desc: 'Novas mensagens de profissionais' },
                          { key: 'atualizacoes', title: 'Atualizacoes', desc: 'Status dos seus pedidos' },
                          { key: 'marketing', title: 'Marketing', desc: 'Novidades e promocoes' },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <p className="font-medium text-navy-900">{item.title}</p>
                              <p className="text-sm text-gray-500">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications[item.key as keyof typeof notifications]}
                                onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-mustard-500"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleSave('notificacoes')}
                      className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium"
                    >
                      Salvar Preferencias
                    </Button>
                  </div>
                </div>
              )}

              {/* Privacy */}
              {activeSection === 'privacidade' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-navy-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-900">Privacidade</h3>
                        <p className="text-sm text-gray-500">Controle a visibilidade do seu perfil</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {[
                      { key: 'perfilPublico', icon: Eye, title: 'Perfil publico', desc: 'Outros usuarios podem ver seu perfil' },
                      { key: 'mostrarAvaliacao', icon: CheckCircle, title: 'Mostrar avaliacoes', desc: 'Exibir suas avaliacoes no perfil' },
                      { key: 'mostrarLocalizacao', icon: Globe, title: 'Mostrar localizacao', desc: 'Exibir sua cidade no perfil' },
                      { key: 'permitirMensagens', icon: MessageSquare, title: 'Permitir mensagens', desc: 'Receber mensagens de profissionais' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium text-navy-900">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacy[item.key as keyof typeof privacy]}
                            onChange={(e) => setPrivacy({ ...privacy, [item.key]: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-mustard-500"></div>
                        </label>
                      </div>
                    ))}

                    <Button
                      onClick={() => handleSave('privacidade')}
                      className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium mt-4"
                    >
                      Salvar Preferencias
                    </Button>
                  </div>
                </div>
              )}

              {/* Appearance */}
              {activeSection === 'aparencia' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center">
                        <Palette className="w-6 h-6 text-navy-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-900">Aparencia</h3>
                        <p className="text-sm text-gray-500">Personalize o visual da plataforma</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-4">Tema</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { key: 'light', icon: Sun, title: 'Claro' },
                        { key: 'dark', icon: Moon, title: 'Escuro' },
                        { key: 'system', icon: Smartphone, title: 'Sistema' },
                      ].map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setAppearance({ ...appearance, tema: item.key as typeof appearance.tema })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            appearance.tema === item.key
                              ? 'border-mustard-500 bg-mustard-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                            appearance.tema === item.key ? 'bg-mustard-500 text-navy-900' : 'bg-gray-100 text-gray-500'
                          }`}>
                            <item.icon className="w-6 h-6" />
                          </div>
                          <p className={`text-sm font-medium ${
                            appearance.tema === item.key ? 'text-mustard-700' : 'text-gray-700'
                          }`}>
                            {item.title}
                          </p>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100">
                      <p className="text-sm text-amber-800">
                        O tema escuro estara disponivel em breve. Por enquanto, apenas o tema claro esta ativo.
                      </p>
                    </div>

                    <Button
                      onClick={() => handleSave('aparencia')}
                      className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium mt-6"
                    >
                      Salvar Preferencias
                    </Button>
                  </div>
                </div>
              )}

              {/* Language */}
              {activeSection === 'idioma' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center">
                        <Globe className="w-6 h-6 text-navy-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-900">Idioma e Regiao</h3>
                        <p className="text-sm text-gray-500">Configure idioma e formato de data</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Idioma</Label>
                      <select className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mustard-500">
                        <option value="pt-BR">Portugues (Brasil)</option>
                        <option value="en-US" disabled>English (US) - Em breve</option>
                        <option value="es" disabled>Espanol - Em breve</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Formato de data</Label>
                      <select className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mustard-500">
                        <option value="DD/MM/YYYY">DD/MM/AAAA (31/12/2024)</option>
                        <option value="MM/DD/YYYY">MM/DD/AAAA (12/31/2024)</option>
                        <option value="YYYY-MM-DD">AAAA-MM-DD (2024-12-31)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Fuso horario</Label>
                      <select className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mustard-500">
                        <option value="America/Sao_Paulo">Brasilia (GMT-3)</option>
                        <option value="America/Manaus">Manaus (GMT-4)</option>
                        <option value="America/Belem">Belem (GMT-3)</option>
                      </select>
                    </div>

                    <Button
                      onClick={() => handleSave('idioma')}
                      className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium"
                    >
                      Salvar Preferencias
                    </Button>
                  </div>
                </div>
              )}

              {/* Payments */}
              {activeSection === 'pagamentos' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-navy-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-900">Pagamentos</h3>
                        <p className="text-sm text-gray-500">Gerencie seus metodos de pagamento</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <CreditCard className="w-8 h-8 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-navy-900 mb-2">Nenhum metodo cadastrado</h4>
                      <p className="text-gray-500 mb-6">Adicione um cartao para facilitar seus pagamentos</p>
                      <Button className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                        Adicionar Cartao
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Account */}
              {activeSection === 'conta' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center">
                          <Lock className="w-6 h-6 text-navy-900" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-navy-900">Conta e Dados</h3>
                          <p className="text-sm text-gray-500">Gerencie seus dados pessoais</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                          <Download className="w-5 h-5 text-mustard-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-navy-900">Exportar meus dados</p>
                          <p className="text-sm text-gray-500">Baixe uma copia dos seus dados</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>

                      <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                          <FileText className="w-5 h-5 text-mustard-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-navy-900">Historico de atividades</p>
                          <p className="text-sm text-gray-500">Veja seu historico de acoes</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-red-100 bg-gradient-to-r from-red-50 to-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-red-700">Zona de Perigo</h3>
                          <p className="text-sm text-red-500">Acoes irreversiveis</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <button className="w-full flex items-center gap-4 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors border border-red-100">
                        <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-red-700">Excluir minha conta</p>
                          <p className="text-sm text-red-500">Esta acao nao pode ser desfeita</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Help */}
              {activeSection === 'ajuda' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center">
                        <HelpCircle className="w-6 h-6 text-navy-900" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-900">Ajuda e Suporte</h3>
                        <p className="text-sm text-gray-500">Encontre respostas para suas duvidas</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-mustard-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-navy-900">Central de Ajuda</p>
                        <p className="text-sm text-gray-500">Perguntas frequentes</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-mustard-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-navy-900">Falar com Suporte</p>
                        <p className="text-sm text-gray-500">Chat com nossa equipe</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    <button className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center">
                        <Mail className="w-5 h-5 text-mustard-600" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-navy-900">Enviar Email</p>
                        <p className="text-sm text-gray-500">suporte@repfy.com.br</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              )}

              {/* Default View */}
              {!activeSection && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-mustard-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Settings className="w-10 h-10 text-mustard-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">Selecione uma opcao</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Escolha uma categoria no menu ao lado para configurar suas preferencias de conta, notificacoes, privacidade e muito mais.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden pb-20">
        {/* Mobile Header */}
        <div className="bg-gradient-to-br from-navy-800 via-navy-700 to-navy-900 px-4 pt-6 pb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-mustard-500 rounded-2xl flex items-center justify-center">
              <Settings className="w-7 h-7 text-navy-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Configuracoes</h1>
              <p className="text-white/60 text-sm">Personalize sua experiencia</p>
            </div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="px-4 -mt-4 space-y-4">
          {!activeSection && (
            <>
              {/* Preferences */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <p className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase bg-gray-50 border-b border-gray-100">Preferencias</p>

                <button
                  onClick={() => setActiveSection('notificacoes')}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Notificacoes</p>
                    <p className="text-xs text-gray-500">Email, push e SMS</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  onClick={() => setActiveSection('privacidade')}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Privacidade</p>
                    <p className="text-xs text-gray-500">Visibilidade do perfil</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  onClick={() => setActiveSection('aparencia')}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Aparencia</p>
                    <p className="text-xs text-gray-500">Tema e visual</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  onClick={() => setActiveSection('idioma')}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Idioma e Regiao</p>
                    <p className="text-xs text-gray-500">Portugues (Brasil)</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Account */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <p className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase bg-gray-50 border-b border-gray-100">Conta</p>

                <button
                  onClick={() => setActiveSection('pagamentos')}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Pagamentos</p>
                    <p className="text-xs text-gray-500">Metodos de pagamento</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                  onClick={() => setActiveSection('conta')}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Conta e Dados</p>
                    <p className="text-xs text-gray-500">Exportar e excluir</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Support */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setActiveSection('ajuda')}
                  className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-mustard-100 flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-mustard-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-navy-900">Ajuda e Suporte</p>
                    <p className="text-xs text-gray-500">Central de ajuda</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Back */}
              <Link
                href={getDashboardPath()}
                className="flex items-center gap-3 p-4 bg-navy-50 rounded-2xl hover:bg-navy-100 transition-colors border border-navy-100"
              >
                <div className="w-11 h-11 bg-navy-100 rounded-xl flex items-center justify-center">
                  <ChevronLeft className="w-5 h-5 text-navy-600" />
                </div>
                <p className="font-medium text-navy-700">Voltar ao Dashboard</p>
              </Link>
            </>
          )}

          {/* Mobile Section Views */}
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
                  { key: 'email', title: 'Email', desc: 'Receba por email' },
                  { key: 'push', title: 'Push', desc: 'Notificacoes no navegador' },
                  { key: 'sms', title: 'SMS', desc: 'Mensagens de texto' },
                  { key: 'orcamentos', title: 'Novos orcamentos', desc: 'Quando receber orcamento' },
                  { key: 'mensagens', title: 'Mensagens', desc: 'Novas mensagens' },
                  { key: 'marketing', title: 'Marketing', desc: 'Novidades e promocoes' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-navy-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mustard-500"></div>
                    </label>
                  </div>
                ))}

                <Button
                  onClick={() => handleSave('notificacoes')}
                  className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium mt-4"
                >
                  Salvar
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'privacidade' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                <button
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </button>
                <h3 className="text-lg font-semibold text-navy-900">Privacidade</h3>
              </div>

              <div className="p-4 space-y-3">
                {[
                  { key: 'perfilPublico', title: 'Perfil publico', desc: 'Visivel para outros' },
                  { key: 'mostrarAvaliacao', title: 'Mostrar avaliacoes', desc: 'Exibir no perfil' },
                  { key: 'mostrarLocalizacao', title: 'Mostrar localizacao', desc: 'Exibir cidade' },
                  { key: 'permitirMensagens', title: 'Permitir mensagens', desc: 'Receber mensagens' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-navy-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy[item.key as keyof typeof privacy]}
                        onChange={(e) => setPrivacy({ ...privacy, [item.key]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-mustard-500"></div>
                    </label>
                  </div>
                ))}

                <Button
                  onClick={() => handleSave('privacidade')}
                  className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium mt-4"
                >
                  Salvar
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'aparencia' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                <button
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </button>
                <h3 className="text-lg font-semibold text-navy-900">Aparencia</h3>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'light', icon: Sun, title: 'Claro' },
                    { key: 'dark', icon: Moon, title: 'Escuro' },
                    { key: 'system', icon: Smartphone, title: 'Sistema' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setAppearance({ ...appearance, tema: item.key as typeof appearance.tema })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        appearance.tema === item.key
                          ? 'border-mustard-500 bg-mustard-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                        appearance.tema === item.key ? 'bg-mustard-500 text-navy-900' : 'bg-gray-100 text-gray-500'
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-medium text-center">{item.title}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-amber-50 rounded-xl">
                  <p className="text-xs text-amber-800">Tema escuro em breve.</p>
                </div>

                <Button
                  onClick={() => handleSave('aparencia')}
                  className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium mt-4"
                >
                  Salvar
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'idioma' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                <button
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </button>
                <h3 className="text-lg font-semibold text-navy-900">Idioma e Regiao</h3>
              </div>

              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Idioma</Label>
                  <select className="w-full h-12 px-4 rounded-xl border border-gray-200">
                    <option value="pt-BR">Portugues (Brasil)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">Formato de data</Label>
                  <select className="w-full h-12 px-4 rounded-xl border border-gray-200">
                    <option value="DD/MM/YYYY">DD/MM/AAAA</option>
                  </select>
                </div>

                <Button
                  onClick={() => handleSave('idioma')}
                  className="w-full h-12 bg-mustard-500 hover:bg-mustard-600 text-navy-900 rounded-xl font-medium"
                >
                  Salvar
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'pagamentos' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                <button
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </button>
                <h3 className="text-lg font-semibold text-navy-900">Pagamentos</h3>
              </div>

              <div className="p-8 text-center">
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-7 h-7 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">Nenhum metodo cadastrado</p>
                <Button className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                  Adicionar Cartao
                </Button>
              </div>
            </div>
          )}

          {activeSection === 'conta' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                  <button
                    onClick={() => setActiveSection(null)}
                    className="flex items-center gap-2 text-sm text-gray-500 mb-3"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </button>
                  <h3 className="text-lg font-semibold text-navy-900">Conta e Dados</h3>
                </div>

                <div className="p-4 space-y-3">
                  <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Download className="w-5 h-5 text-mustard-600" />
                    <span className="font-medium text-navy-900">Exportar meus dados</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <FileText className="w-5 h-5 text-mustard-600" />
                    <span className="font-medium text-navy-900">Historico de atividades</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
                <div className="p-4">
                  <button className="w-full flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                    <Trash2 className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-700">Excluir minha conta</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ajuda' && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-mustard-50 to-white">
                <button
                  onClick={() => setActiveSection(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 mb-3"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </button>
                <h3 className="text-lg font-semibold text-navy-900">Ajuda e Suporte</h3>
              </div>

              <div className="p-4 space-y-3">
                <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <FileText className="w-5 h-5 text-mustard-600" />
                  <div className="text-left">
                    <p className="font-medium text-navy-900">Central de Ajuda</p>
                    <p className="text-xs text-gray-500">Perguntas frequentes</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <MessageSquare className="w-5 h-5 text-mustard-600" />
                  <div className="text-left">
                    <p className="font-medium text-navy-900">Falar com Suporte</p>
                    <p className="text-xs text-gray-500">Chat com nossa equipe</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-mustard-600" />
                  <div className="text-left">
                    <p className="font-medium text-navy-900">Enviar Email</p>
                    <p className="text-xs text-gray-500">suporte@repfy.com.br</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40">
          <div className="flex items-center justify-around">
            <Link href={getDashboardPath()} className="flex flex-col items-center py-2 px-3 text-gray-400">
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Inicio</span>
            </Link>
            <Link href={`${getDashboardPath()}/pedidos`} className="flex flex-col items-center py-2 px-3 text-gray-400">
              <FileText className="w-6 h-6" />
              <span className="text-xs mt-1">Pedidos</span>
            </Link>
            <Link href="/explorar" className="flex flex-col items-center py-2 px-3 text-gray-400">
              <Search className="w-6 h-6" />
              <span className="text-xs mt-1">Explorar</span>
            </Link>
            <Link href={`${getDashboardPath()}/mensagens`} className="flex flex-col items-center py-2 px-3 text-gray-400">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs mt-1">Mensagens</span>
            </Link>
            <Link href={`${getDashboardPath()}/perfil`} className="flex flex-col items-center py-2 px-3 text-gray-400">
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Perfil</span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

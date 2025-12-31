'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Card, CardContent, Input, Label, Textarea } from '@/components/ui'
import { LoadingSpinner, StarRating } from '@/components/shared'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Lock,
  Briefcase,
  Plus,
  X,
  Image as ImageIcon,
  Award,
  Clock,
  Star,
  CheckCircle,
  Home,
  MessageSquare,
  Shield,
  Eye,
  EyeOff,
  Trash2,
  Edit3,
  TrendingUp,
  DollarSign,
} from 'lucide-react'

interface Category {
  id: string
  name: string
}

interface PortfolioItem {
  id: string
  title: string
  description: string
  imageUrl: string
}

interface ProfessionalProfile {
  id: string
  bio: string
  rating: number
  totalReviews: number
  completedJobs: number
  responseTime: number
  verified: boolean
  hourlyRate?: number
  categories: Category[]
  portfolio: PortfolioItem[]
  user: {
    id: string
    name: string
    email: string
    phone?: string
    avatar?: string
    city?: string
    state?: string
  }
}

export default function PerfilProfissionalPage() {
  const [profile, setProfile] = useState<ProfessionalProfile | null>(null)
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('dados')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    bio: '',
    hourlyRate: '',
  })

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([])
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: '',
    description: '',
    imageUrl: '',
  })
  const [showAddPortfolio, setShowAddPortfolio] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [portfolioImageFile, setPortfolioImageFile] = useState<File | null>(null)
  const [portfolioImagePreview, setPortfolioImagePreview] = useState<string | null>(null)

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('accessToken')

      const profileResponse = await fetch('http://localhost:3001/api/professionals/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const profileData = await profileResponse.json()
      if (profileData.success) {
        setProfile(profileData.data)
        setFormData({
          name: profileData.data.user.name || '',
          phone: profileData.data.user.phone || '',
          city: profileData.data.user.city || '',
          state: profileData.data.user.state || '',
          bio: profileData.data.bio || '',
          hourlyRate: profileData.data.hourlyRate?.toString() || '',
        })
        setSelectedCategories(profileData.data.categories.map((c: Category) => c.id))
        setPortfolioItems(profileData.data.portfolio || [])
      }

      const categoriesResponse = await fetch('http://localhost:3001/api/categories')
      const categoriesData = await categoriesResponse.json()
      if (categoriesData.success) {
        setAllCategories(categoriesData.data || [])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
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

  const handlePortfolioImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPortfolioImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPortfolioImagePreview(reader.result as string)
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

      let avatarUrl = profile?.user.avatar
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

      const response = await fetch('http://localhost:3001/api/professionals/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          avatar: avatarUrl,
          bio: formData.bio,
          hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
          categoryIds: selectedCategories,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setProfile(data.data)
        setSuccessMessage('Perfil atualizado com sucesso!')
        setAvatarFile(null)
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

  const handleAddPortfolioItem = async () => {
    if (!newPortfolioItem.title || !portfolioImageFile) return

    setSaving(true)
    try {
      const token = localStorage.getItem('accessToken')

      const formDataUpload = new FormData()
      formDataUpload.append('file', portfolioImageFile)

      const uploadResponse = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataUpload,
      })

      const uploadData = await uploadResponse.json()
      if (!uploadData.success) {
        setErrorMessage('Erro ao fazer upload da imagem')
        return
      }

      const response = await fetch('http://localhost:3001/api/professionals/me/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newPortfolioItem.title,
          description: newPortfolioItem.description,
          imageUrl: uploadData.data.url,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setPortfolioItems([...portfolioItems, data.data])
        setNewPortfolioItem({ title: '', description: '', imageUrl: '' })
        setPortfolioImageFile(null)
        setPortfolioImagePreview(null)
        setShowAddPortfolio(false)
        setSuccessMessage('Item adicionado ao portfolio!')
      }
    } catch (error) {
      console.error('Error adding portfolio item:', error)
      setErrorMessage('Erro ao adicionar item ao portfolio')
    } finally {
      setSaving(false)
    }
  }

  const handleRemovePortfolioItem = async (itemId: string) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`http://localhost:3001/api/professionals/me/portfolio/${itemId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        setPortfolioItems(portfolioItems.filter((item) => item.id !== itemId))
        setSuccessMessage('Item removido do portfolio')
      }
    } catch (error) {
      console.error('Error removing portfolio item:', error)
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

  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ]

  const tabs = [
    { id: 'dados', label: 'Dados Pessoais', icon: User },
    { id: 'servicos', label: 'Servicos', icon: Briefcase },
    { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
    { id: 'seguranca', label: 'Seguranca', icon: Lock },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Carregando perfil..." />
      </div>
    )
  }

  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-6">
        {/* Hero Header */}
        <div className="relative bg-navy-900 rounded-2xl overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600"
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900/80" />
          </div>

          <div className="relative p-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold text-4xl overflow-hidden shadow-2xl">
                  {avatarPreview || profile?.user.avatar ? (
                    <img
                      src={avatarPreview || profile?.user.avatar}
                      alt={profile?.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    profile?.user.name?.charAt(0) || 'P'
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-mustard-500 rounded-xl flex items-center justify-center cursor-pointer hover:bg-mustard-600 transition-colors shadow-lg">
                  <Camera className="w-5 h-5 text-navy-900" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{profile?.user.name}</h1>
                  {profile?.verified && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Verificado
                    </span>
                  )}
                </div>
                <p className="text-gray-400 flex items-center gap-2 mb-3">
                  <Mail className="w-4 h-4" />
                  {profile?.user.email}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-5 h-5 text-mustard-500 fill-mustard-500" />
                    <span className="text-white font-semibold">{profile?.rating?.toFixed(1) || '0.0'}</span>
                    <span className="text-gray-400">({profile?.totalReviews || 0} avaliacoes)</span>
                  </div>
                  {profile?.user.city && (
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {profile?.user.city}, {profile?.user.state}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <p className="text-3xl font-bold text-white">{profile?.completedJobs || 0}</p>
                  <p className="text-sm text-gray-400">Trabalhos</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <p className="text-3xl font-bold text-white">~{profile?.responseTime || 0}min</p>
                  <p className="text-sm text-gray-400">Resposta</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 flex items-center gap-3">
            <CheckCircle className="w-5 h-5" />
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3">
            <X className="w-5 h-5" />
            {errorMessage}
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm rounded-2xl overflow-hidden sticky top-6">
              <CardContent className="p-4">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          activeTab === tab.id
                            ? 'bg-mustard-500 text-navy-900 font-semibold shadow-lg shadow-mustard-500/20'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          activeTab === tab.id ? 'bg-navy-900/20' : 'bg-mustard-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-navy-900' : 'text-mustard-600'}`} />
                        </div>
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dados' && (
              <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-mustard-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-mustard-600" />
                    </div>
                    <h2 className="text-xl font-bold text-navy-900">Dados Pessoais</h2>
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700 font-medium">Nome Completo</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Seu nome completo"
                          className="h-12 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium">Telefone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(00) 00000-0000"
                          className="h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-gray-700 font-medium">Bio / Descricao Profissional</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Fale sobre sua experiencia, especialidades e diferenciais..."
                        rows={4}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700 font-medium">Cidade</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Sua cidade"
                          className="h-12 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-gray-700 font-medium">Estado</Label>
                        <select
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mustard-500 bg-white"
                        >
                          <option value="">Selecione</option>
                          {brazilianStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hourlyRate" className="text-gray-700 font-medium">Valor/Hora (R$)</Label>
                        <Input
                          id="hourlyRate"
                          type="number"
                          step="0.01"
                          value={formData.hourlyRate}
                          onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                          placeholder="0,00"
                          className="h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-12 px-6 rounded-xl"
                        disabled={saving}
                      >
                        {saving ? 'Salvando...' : (
                          <>
                            <Save className="w-5 h-5 mr-2" />
                            Salvar Alteracoes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === 'servicos' && (
              <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-mustard-100 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-mustard-600" />
                    </div>
                    <h2 className="text-xl font-bold text-navy-900">Servicos Oferecidos</h2>
                  </div>
                  <p className="text-gray-600 mb-6 ml-13">
                    Selecione as categorias de servicos que voce oferece
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {allCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => toggleCategory(category.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedCategories.includes(category.id)
                            ? 'border-mustard-500 bg-mustard-50 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            selectedCategories.includes(category.id)
                              ? 'bg-mustard-500 text-navy-900'
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <span className={`font-medium ${
                            selectedCategories.includes(category.id)
                              ? 'text-navy-900'
                              : 'text-gray-700'
                          }`}>
                            {category.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t flex justify-end">
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-12 px-6 rounded-xl"
                      disabled={saving}
                    >
                      {saving ? 'Salvando...' : 'Salvar Servicos'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-mustard-100 flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-mustard-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-navy-900">Portfolio</h2>
                          <p className="text-gray-600 text-sm">Mostre seus trabalhos anteriores</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setShowAddPortfolio(true)}
                        className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold rounded-xl"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Adicionar
                      </Button>
                    </div>

                    {portfolioItems.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="font-semibold text-navy-900 mb-2">Nenhum trabalho ainda</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                          Adicione fotos dos seus trabalhos anteriores para atrair mais clientes
                        </p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {portfolioItems.map((item) => (
                          <div key={item.id} className="relative group">
                            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex flex-col justify-end p-4">
                              <h4 className="font-semibold text-white">{item.title}</h4>
                              {item.description && (
                                <p className="text-sm text-gray-300 line-clamp-2 mt-1">
                                  {item.description}
                                </p>
                              )}
                              <button
                                onClick={() => handleRemovePortfolioItem(item.id)}
                                className="absolute top-3 right-3 w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Add Portfolio Modal */}
                {showAddPortfolio && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-md border-0 shadow-2xl rounded-2xl">
                      <CardContent className="p-6">
                        <div className="text-center mb-6">
                          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-mustard-100 flex items-center justify-center">
                            <ImageIcon className="w-7 h-7 text-mustard-600" />
                          </div>
                          <h3 className="text-xl font-bold text-navy-900">Adicionar ao Portfolio</h3>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-gray-700 font-medium">Foto do Trabalho *</Label>
                            {portfolioImagePreview ? (
                              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                                <img
                                  src={portfolioImagePreview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  onClick={() => {
                                    setPortfolioImageFile(null)
                                    setPortfolioImagePreview(null)
                                  }}
                                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white hover:bg-red-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-mustard-500 hover:bg-mustard-50/50 transition-all">
                                <Camera className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-500">Clique para selecionar</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handlePortfolioImageChange}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="portfolioTitle" className="text-gray-700 font-medium">Titulo *</Label>
                            <Input
                              id="portfolioTitle"
                              value={newPortfolioItem.title}
                              onChange={(e) =>
                                setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })
                              }
                              placeholder="Ex: Reforma de Banheiro"
                              className="h-12 rounded-xl"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="portfolioDescription" className="text-gray-700 font-medium">Descricao (opcional)</Label>
                            <Textarea
                              id="portfolioDescription"
                              value={newPortfolioItem.description}
                              onChange={(e) =>
                                setNewPortfolioItem({
                                  ...newPortfolioItem,
                                  description: e.target.value,
                                })
                              }
                              placeholder="Descreva o trabalho realizado..."
                              rows={3}
                              className="rounded-xl"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowAddPortfolio(false)
                              setNewPortfolioItem({ title: '', description: '', imageUrl: '' })
                              setPortfolioImageFile(null)
                              setPortfolioImagePreview(null)
                            }}
                            className="flex-1 h-12 rounded-xl"
                            disabled={saving}
                          >
                            Cancelar
                          </Button>
                          <Button
                            onClick={handleAddPortfolioItem}
                            className="flex-1 bg-mustard-500 hover:bg-mustard-600 text-navy-900 h-12 rounded-xl font-semibold"
                            disabled={saving || !newPortfolioItem.title || !portfolioImageFile}
                          >
                            {saving ? 'Adicionando...' : 'Adicionar'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'seguranca' && (
              <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-mustard-100 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-mustard-600" />
                    </div>
                    <h2 className="text-xl font-bold text-navy-900">Seguranca</h2>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword" className="text-gray-700 font-medium">Senha Atual</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, currentPassword: e.target.value })
                          }
                          placeholder="Digite sua senha atual"
                          className="h-12 rounded-xl pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-gray-700 font-medium">Nova Senha</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({ ...passwordData, newPassword: e.target.value })
                          }
                          placeholder="Digite a nova senha"
                          className="h-12 rounded-xl pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                        }
                        placeholder="Confirme a nova senha"
                        className="h-12 rounded-xl"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-12 px-6 rounded-xl"
                      disabled={saving}
                    >
                      {saving ? 'Alterando...' : 'Alterar Senha'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden pb-20">
        {/* Mobile Header */}
        <div className="bg-navy-900 -mx-4 -mt-4 px-4 pt-4 pb-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-mustard-400 to-mustard-600 flex items-center justify-center text-navy-900 font-bold text-2xl overflow-hidden shadow-lg">
                {avatarPreview || profile?.user.avatar ? (
                  <img
                    src={avatarPreview || profile?.user.avatar}
                    alt={profile?.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profile?.user.name?.charAt(0) || 'P'
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
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-white">{profile?.user.name}</h1>
                {profile?.verified && (
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                )}
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <Star className="w-4 h-4 text-mustard-500 fill-mustard-500" />
                <span className="text-white font-medium">{profile?.rating?.toFixed(1) || '0.0'}</span>
                <span className="text-gray-400 text-sm">({profile?.totalReviews || 0})</span>
              </div>
              {profile?.user.city && (
                <p className="text-sm text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile?.user.city}, {profile?.user.state}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white/10 rounded-xl text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">{profile?.completedJobs || 0}</p>
              <p className="text-xs text-gray-400">Trabalhos</p>
            </div>
            <div className="p-3 bg-white/10 rounded-xl text-center backdrop-blur-sm">
              <p className="text-2xl font-bold text-white">~{profile?.responseTime || 0}min</p>
              <p className="text-xs text-gray-400">Resposta</p>
            </div>
          </div>
        </div>

        {/* Messages Mobile */}
        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 flex items-center gap-2 text-sm mb-4">
            <CheckCircle className="w-4 h-4" />
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2 text-sm mb-4">
            <X className="w-4 h-4" />
            {errorMessage}
          </div>
        )}

        {/* Mobile Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 -mx-4 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-mustard-500 text-navy-900 font-semibold shadow-lg shadow-mustard-500/20'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Mobile Content */}
        {activeTab === 'dados' && (
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-4">
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name-mobile" className="text-gray-700 font-medium text-sm">Nome Completo</Label>
                  <Input
                    id="name-mobile"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome completo"
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-mobile" className="text-gray-700 font-medium text-sm">Telefone</Label>
                  <Input
                    id="phone-mobile"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio-mobile" className="text-gray-700 font-medium text-sm">Bio</Label>
                  <Textarea
                    id="bio-mobile"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Fale sobre sua experiencia..."
                    rows={3}
                    className="rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="city-mobile" className="text-gray-700 font-medium text-sm">Cidade</Label>
                    <Input
                      id="city-mobile"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Cidade"
                      className="h-11 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state-mobile" className="text-gray-700 font-medium text-sm">Estado</Label>
                    <select
                      id="state-mobile"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mustard-500 bg-white text-sm"
                    >
                      <option value="">UF</option>
                      {brazilianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate-mobile" className="text-gray-700 font-medium text-sm">Valor/Hora (R$)</Label>
                  <Input
                    id="hourlyRate-mobile"
                    type="number"
                    step="0.01"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    placeholder="0,00"
                    className="h-11 rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-12 rounded-xl"
                  disabled={saving}
                >
                  {saving ? 'Salvando...' : 'Salvar'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'servicos' && (
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-4">
              <p className="text-gray-600 text-sm mb-4">
                Selecione as categorias de servicos que voce oferece
              </p>

              <div className="space-y-2">
                {allCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                      selectedCategories.includes(category.id)
                        ? 'border-mustard-500 bg-mustard-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      selectedCategories.includes(category.id)
                        ? 'bg-mustard-500 text-navy-900'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <span className={`font-medium text-sm ${
                      selectedCategories.includes(category.id)
                        ? 'text-navy-900'
                        : 'text-gray-700'
                    }`}>
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleSaveProfile}
                className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-12 rounded-xl mt-4"
                disabled={saving}
              >
                {saving ? 'Salvando...' : 'Salvar Servicos'}
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            <Button
              onClick={() => setShowAddPortfolio(true)}
              className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-12 rounded-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Trabalho
            </Button>

            {portfolioItems.length === 0 ? (
              <Card className="border-0 shadow-sm rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-medium text-navy-900 mb-1">Nenhum trabalho</p>
                  <p className="text-sm text-gray-500">
                    Adicione fotos para atrair mais clientes
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="relative">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                      <p className="text-white text-sm font-medium truncate">{item.title}</p>
                    </div>
                    <button
                      onClick={() => handleRemovePortfolioItem(item.id)}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center text-white shadow-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Portfolio Modal Mobile */}
            {showAddPortfolio && (
              <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
                <Card className="w-full max-h-[90vh] overflow-y-auto border-0 shadow-2xl rounded-t-2xl">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-navy-900">Adicionar ao Portfolio</h3>
                      <button
                        onClick={() => {
                          setShowAddPortfolio(false)
                          setNewPortfolioItem({ title: '', description: '', imageUrl: '' })
                          setPortfolioImageFile(null)
                          setPortfolioImagePreview(null)
                        }}
                        className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium text-sm">Foto *</Label>
                        {portfolioImagePreview ? (
                          <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                            <img
                              src={portfolioImagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => {
                                setPortfolioImageFile(null)
                                setPortfolioImagePreview(null)
                              }}
                              className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer">
                            <Camera className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Selecionar foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePortfolioImageChange}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium text-sm">Titulo *</Label>
                        <Input
                          value={newPortfolioItem.title}
                          onChange={(e) =>
                            setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })
                          }
                          placeholder="Ex: Reforma de Banheiro"
                          className="h-11 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-700 font-medium text-sm">Descricao</Label>
                        <Textarea
                          value={newPortfolioItem.description}
                          onChange={(e) =>
                            setNewPortfolioItem({
                              ...newPortfolioItem,
                              description: e.target.value,
                            })
                          }
                          placeholder="Descreva o trabalho..."
                          rows={3}
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAddPortfolio(false)
                          setNewPortfolioItem({ title: '', description: '', imageUrl: '' })
                          setPortfolioImageFile(null)
                          setPortfolioImagePreview(null)
                        }}
                        className="flex-1 h-11 rounded-xl"
                        disabled={saving}
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleAddPortfolioItem}
                        className="flex-1 bg-mustard-500 hover:bg-mustard-600 text-navy-900 h-11 rounded-xl font-semibold"
                        disabled={saving || !newPortfolioItem.title || !portfolioImageFile}
                      >
                        {saving ? 'Adicionando...' : 'Adicionar'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {activeTab === 'seguranca' && (
          <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-4">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium text-sm">Senha Atual</Label>
                  <div className="relative">
                    <Input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                      placeholder="Senha atual"
                      className="h-11 rounded-xl pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium text-sm">Nova Senha</Label>
                  <div className="relative">
                    <Input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      placeholder="Nova senha"
                      className="h-11 rounded-xl pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium text-sm">Confirmar Nova Senha</Label>
                  <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    placeholder="Confirme a nova senha"
                    className="h-11 rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-12 rounded-xl"
                  disabled={saving}
                >
                  {saving ? 'Alterando...' : 'Alterar Senha'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 z-50">
          <div className="flex items-center justify-around">
            <Link
              href="/dashboard/profissional"
              className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Inicio</span>
            </Link>
            <Link
              href="/dashboard/profissional/oportunidades"
              className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400"
            >
              <Briefcase className="w-5 h-5" />
              <span className="text-xs">Oportunidades</span>
            </Link>
            <Link
              href="/dashboard/profissional/trabalhos"
              className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="text-xs">Trabalhos</span>
            </Link>
            <Link
              href="/dashboard/profissional/mensagens"
              className="flex flex-col items-center gap-1 py-2 px-3 text-gray-400"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Mensagens</span>
            </Link>
            <Link
              href="/dashboard/profissional/perfil"
              className="flex flex-col items-center gap-1 py-2 px-3 text-mustard-600"
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-medium">Perfil</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

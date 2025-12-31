'use client'

import { Button, Input, Label } from '@/components/ui'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { getApiUrl } from '@/lib/api'
import {
  ArrowLeft,
  Upload,
  MapPin,
  Calendar,
  AlertCircle,
  Check,
  ChevronRight,
  Zap,
  Wrench,
  Droplets,
  Paintbrush,
  Wind,
  Sparkles,
  Home,
  Building2,
  Store,
  Clock,
  Image as ImageIcon,
  X,
  Info,
  Shield,
  Star,
  Users,
  Camera,
  ChevronDown,
  Trophy,
  Rocket,
  ArrowRight,
  Play,
} from 'lucide-react'

interface ServiceRequest {
  category: string
  propertyType: string
  buildingAge: string
  description: string
  urgency: string
  photos: File[]
  location: string
  preferredDate: string
}

export default function SolicitarServicoPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<ServiceRequest>({
    category: '',
    propertyType: '',
    buildingAge: '',
    description: '',
    urgency: 'normal',
    photos: [],
    location: '',
    preferredDate: '',
  })
  const [loading, setLoading] = useState(false)
  const [animateIn, setAnimateIn] = useState(true)

  const categories = [
    { id: 'eletrica', name: 'Eletricista', icon: Zap, estimatedPrice: 'R$ 200 - R$ 450', color: 'from-yellow-400 to-amber-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400' },
    { id: 'hidraulica', name: 'Encanador', icon: Droplets, estimatedPrice: 'R$ 180 - R$ 400', color: 'from-blue-400 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600', image: 'https://images.unsplash.com/photo-1585704032915-c3400305a614?w=400' },
    { id: 'montagem', name: 'Montador', icon: Wrench, estimatedPrice: 'R$ 80 - R$ 250', color: 'from-gray-400 to-slate-500', bgColor: 'bg-gray-50', textColor: 'text-gray-600', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' },
    { id: 'pintura', name: 'Pintor', icon: Paintbrush, estimatedPrice: 'R$ 150 - R$ 600', color: 'from-purple-400 to-violet-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600', image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400' },
    { id: 'ar-condicionado', name: 'Ar Condicionado', icon: Wind, estimatedPrice: 'R$ 200 - R$ 500', color: 'from-cyan-400 to-teal-500', bgColor: 'bg-cyan-50', textColor: 'text-cyan-600', image: 'https://images.unsplash.com/photo-1631545806609-71d7a61e3c8a?w=400' },
    { id: 'limpeza', name: 'Limpeza', icon: Sparkles, estimatedPrice: 'R$ 100 - R$ 300', color: 'from-green-400 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-600', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400' },
  ]

  const propertyTypes = [
    { id: 'casa', name: 'Casa', icon: Home, desc: 'Residencia unifamiliar' },
    { id: 'apartamento', name: 'Apartamento', icon: Building2, desc: 'Condominio vertical' },
    { id: 'comercial', name: 'Comercial', icon: Store, desc: 'Loja ou escritorio' },
  ]

  const buildingAges = [
    { id: 'novo', name: 'Novo', desc: '0-5 anos', complexity: 'baixa', icon: Sparkles },
    { id: 'medio', name: 'Medio', desc: '6-15 anos', complexity: 'media', icon: Home },
    { id: 'antigo', name: 'Antigo', desc: '15+ anos', complexity: 'alta', icon: Building2 },
  ]

  const urgencyLevels = [
    { id: 'normal', name: 'Normal', desc: 'Ate 7 dias', price: 'Preco padrao', icon: Clock, color: 'from-gray-400 to-gray-500' },
    { id: 'urgente', name: 'Urgente', desc: '24-48 horas', price: '+20-30%', icon: AlertCircle, color: 'from-amber-400 to-orange-500' },
    { id: 'emergencia', name: 'Emergencia', desc: 'Hoje', price: '+50-80%', icon: Zap, color: 'from-red-400 to-rose-500' },
  ]

  useEffect(() => {
    setAnimateIn(true)
    const timer = setTimeout(() => setAnimateIn(false), 300)
    return () => clearTimeout(timer)
  }, [step])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData({ ...formData, photos: [...formData.photos, ...filesArray] })
    }
  }

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    setFormData({ ...formData, photos: newPhotos })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken')

      const attachmentUrls: string[] = []
      for (const photo of formData.photos) {
        const uploadData = new FormData()
        uploadData.append('file', photo)

        const uploadRes = await fetch(getApiUrl('/api/upload'), {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: uploadData,
        })

        const uploadResult = await uploadRes.json()
        if (uploadResult.success) {
          attachmentUrls.push(uploadResult.data.url)
        }
      }

      const locationParts = formData.location.split(',').map(s => s.trim())
      const city = locationParts[0] || formData.location
      const state = locationParts[1] || 'SP'

      const response = await fetch(getApiUrl('/api/service-requests'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: categories.find(c => c.id === formData.category)?.name || 'Servico',
          description: formData.description,
          categoryId: formData.category,
          city,
          state,
          address: formData.location,
          preferredDate: formData.preferredDate || undefined,
          urgency: formData.urgency,
          propertyType: formData.propertyType,
          buildingAge: formData.buildingAge,
          attachments: attachmentUrls,
        }),
      })

      const data = await response.json()
      if (data.success) {
        router.push('/solicitar-servico/confirmacao')
      } else {
        alert(data.message || 'Erro ao enviar solicitacao')
      }
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('Erro ao enviar solicitacao. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const stepTitles = [
    { title: 'Servico', desc: 'Qual servico?' },
    { title: 'Local', desc: 'Onde sera?' },
    { title: 'Detalhes', desc: 'Descreva o problema' },
    { title: 'Finalizar', desc: 'Revise e envie' },
  ]

  const selectedCategory = categories.find(c => c.id === formData.category)

  const getProgress = () => {
    let progress = 0
    if (formData.category) progress += 25
    if (formData.propertyType && formData.location) progress += 25
    if (formData.description && formData.description.length >= 20) progress += 25
    if (formData.urgency) progress += 25
    return progress
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ==================== DESKTOP LAYOUT ==================== */}
      <div className="hidden lg:block min-h-screen">
        {/* Hero Header */}
        <div className="relative h-64 bg-navy-900 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920"
              alt=""
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/95 to-navy-900/80" />
          </div>

          <div className="relative max-w-6xl mx-auto px-8 py-8">
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-3 text-white hover:text-mustard-400 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-2xl font-bold">Repfy</span>
              </Link>
              <div className="flex items-center gap-2 text-white/60">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Seguro e Garantido</span>
              </div>
            </div>

            {/* Title and Progress */}
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Solicitar Servico
                </h1>
                <p className="text-white/70">
                  Receba ate 7 orcamentos em 24 horas
                </p>
              </div>

              {/* Desktop Progress Steps */}
              <div className="flex items-center gap-3">
                {stepTitles.map((s, index) => {
                  const stepNum = index + 1
                  const isActive = step === stepNum
                  const isCompleted = step > stepNum

                  return (
                    <div key={stepNum} className="flex items-center gap-2">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        isCompleted
                          ? 'bg-green-500'
                          : isActive
                          ? 'bg-mustard-500'
                          : 'bg-white/10'
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          isCompleted || isActive ? 'text-navy-900' : 'text-white/60'
                        }`}>
                          {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
                        </div>
                        <span className={`text-sm font-medium ${
                          isCompleted || isActive ? 'text-navy-900' : 'text-white/60'
                        }`}>
                          {s.title}
                        </span>
                      </div>
                      {stepNum < 4 && (
                        <ChevronRight className={`w-4 h-4 ${step > stepNum ? 'text-green-400' : 'text-white/30'}`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-8 -mt-12 pb-12">
          <div className="grid grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="col-span-1">
              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden sticky top-8">
                {/* Header with gradient */}
                <div className={`p-5 ${selectedCategory ? `bg-gradient-to-r ${selectedCategory.color}` : 'bg-gradient-to-r from-mustard-400 to-mustard-600'}`}>
                  <div className="flex items-center gap-3">
                    {selectedCategory ? (
                      <>
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <selectedCategory.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white/80 text-sm">Servico selecionado</p>
                          <p className="text-white font-bold text-lg">{selectedCategory.name}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white/80 text-sm">Vamos comecar</p>
                          <p className="text-white font-bold text-lg">Escolha o servico</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-5 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Progresso</span>
                    <span className="text-sm font-bold text-navy-900">{getProgress()}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-mustard-400 to-mustard-600 transition-all duration-500 ease-out"
                      style={{ width: `${getProgress()}%` }}
                    />
                  </div>
                </div>

                {/* Summary Details */}
                <div className="p-5 space-y-4">
                  {formData.propertyType && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        {propertyTypes.find(p => p.id === formData.propertyType)?.icon && (
                          <Home className="w-5 h-5 text-navy-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tipo de imovel</p>
                        <p className="text-sm font-medium text-navy-900">
                          {propertyTypes.find(p => p.id === formData.propertyType)?.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.location && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <MapPin className="w-5 h-5 text-navy-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Localizacao</p>
                        <p className="text-sm font-medium text-navy-900 truncate max-w-[150px]">
                          {formData.location}
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.urgency && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${
                        urgencyLevels.find(u => u.id === formData.urgency)?.color
                      }`}>
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Urgencia</p>
                        <p className="text-sm font-medium text-navy-900">
                          {urgencyLevels.find(u => u.id === formData.urgency)?.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.photos.length > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <Camera className="w-5 h-5 text-navy-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Fotos anexadas</p>
                        <p className="text-sm font-medium text-navy-900">{formData.photos.length} foto(s)</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Trust Badges */}
                <div className="p-5 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Profissionais verificados</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>Avaliados pela comunidade</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>+10.000 servicos realizados</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-span-2">
              <div className={`bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ${
                animateIn ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}>
                {/* Step 1: Categoria */}
                {step === 1 && (
                  <div className="p-8">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-navy-900 mb-2">
                        Qual servico voce precisa?
                      </h2>
                      <p className="text-gray-500">
                        Selecione a categoria que melhor descreve o que voce precisa
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {categories.map((category) => {
                        const Icon = category.icon
                        const isSelected = formData.category === category.id
                        return (
                          <button
                            key={category.id}
                            onClick={() => setFormData({ ...formData, category: category.id })}
                            className={`relative group overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                              isSelected
                                ? 'border-mustard-500 shadow-lg shadow-mustard-500/20'
                                : 'border-gray-100 hover:border-mustard-300 hover:shadow-md'
                            }`}
                          >
                            {/* Background Image */}
                            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                              <img
                                src={category.image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className={`relative p-5 ${isSelected ? 'bg-mustard-50/80' : 'bg-white/80'} backdrop-blur-sm`}>
                              <div className="flex items-start gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${category.color} shadow-lg group-hover:scale-110 transition-transform`}>
                                  <Icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-navy-900 text-lg">{category.name}</h3>
                                    {isSelected && (
                                      <div className="w-6 h-6 bg-mustard-500 rounded-full flex items-center justify-center">
                                        <Check className="w-4 h-4 text-navy-900" />
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500">{category.estimatedPrice}</p>
                                </div>
                              </div>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => setStep(2)}
                        disabled={!formData.category}
                        className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 px-8 h-12 rounded-xl shadow-lg shadow-mustard-500/30 disabled:opacity-50 disabled:shadow-none"
                      >
                        Continuar
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Local */}
                {step === 2 && (
                  <div className="p-8">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-navy-900 mb-2">
                        Sobre o local do servico
                      </h2>
                      <p className="text-gray-500">
                        Essas informacoes ajudam os profissionais a preparar orcamentos mais precisos
                      </p>
                    </div>

                    <div className="space-y-8">
                      {/* Property Type */}
                      <div>
                        <Label className="text-sm font-semibold text-navy-900 mb-4 block">
                          Tipo de imovel
                        </Label>
                        <div className="grid grid-cols-3 gap-4">
                          {propertyTypes.map((type) => {
                            const Icon = type.icon
                            const isSelected = formData.propertyType === type.id
                            return (
                              <button
                                key={type.id}
                                onClick={() => setFormData({ ...formData, propertyType: type.id })}
                                className={`p-5 border-2 rounded-2xl transition-all ${
                                  isSelected
                                    ? 'border-mustard-500 bg-mustard-50 shadow-lg shadow-mustard-500/20'
                                    : 'border-gray-100 hover:border-mustard-300'
                                }`}
                              >
                                <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center ${
                                  isSelected ? 'bg-mustard-500' : 'bg-gray-100'
                                }`}>
                                  <Icon className={`w-6 h-6 ${isSelected ? 'text-navy-900' : 'text-gray-500'}`} />
                                </div>
                                <h3 className="font-bold text-navy-900 text-center mb-1">{type.name}</h3>
                                <p className="text-xs text-gray-500 text-center">{type.desc}</p>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Building Age */}
                      <div>
                        <Label className="text-sm font-semibold text-navy-900 mb-4 block">
                          Idade da construcao
                        </Label>
                        <div className="grid grid-cols-3 gap-4">
                          {buildingAges.map((age) => {
                            const Icon = age.icon
                            const isSelected = formData.buildingAge === age.id
                            return (
                              <button
                                key={age.id}
                                onClick={() => setFormData({ ...formData, buildingAge: age.id })}
                                className={`p-4 border-2 rounded-xl text-center transition-all ${
                                  isSelected
                                    ? 'border-mustard-500 bg-mustard-50'
                                    : 'border-gray-100 hover:border-mustard-300'
                                }`}
                              >
                                <Icon className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-mustard-600' : 'text-gray-400'}`} />
                                <h3 className="font-semibold text-navy-900">{age.name}</h3>
                                <p className="text-xs text-gray-500">{age.desc}</p>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <Label htmlFor="location" className="text-sm font-semibold text-navy-900 mb-3 block">
                          Localizacao
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="location"
                            type="text"
                            placeholder="Digite seu CEP ou endereco completo"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="pl-12 h-14 rounded-xl border-gray-200 focus:border-mustard-500 focus:ring-mustard-500 text-base"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={() => setStep(1)} className="h-12 px-6 rounded-xl">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        disabled={!formData.propertyType || !formData.buildingAge || !formData.location}
                        className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 px-8 h-12 rounded-xl shadow-lg shadow-mustard-500/30 disabled:opacity-50 disabled:shadow-none"
                      >
                        Continuar
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Description */}
                {step === 3 && (
                  <div className="p-8">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-navy-900 mb-2">
                        Descreva o que voce precisa
                      </h2>
                      <p className="text-gray-500">
                        Quanto mais detalhes, mais preciso sera o orcamento
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <Label htmlFor="description" className="text-sm font-semibold text-navy-900 mb-3 block">
                          Descricao do servico
                        </Label>
                        <textarea
                          id="description"
                          rows={5}
                          placeholder="Exemplo: Preciso instalar 5 tomadas na sala e 3 no quarto. O apartamento tem fiacao antiga e gostaria de uma avaliacao geral..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:border-mustard-500 focus:ring-mustard-500 resize-none text-base"
                        />
                        <div className="flex justify-between mt-2">
                          <p className="text-xs text-gray-400">Minimo 20 caracteres</p>
                          <p className={`text-xs ${formData.description.length >= 20 ? 'text-green-500' : 'text-gray-400'}`}>
                            {formData.description.length}/500
                          </p>
                        </div>
                      </div>

                      {/* Photos */}
                      <div>
                        <Label className="text-sm font-semibold text-navy-900 mb-3 block">
                          Fotos do local/problema (opcional)
                        </Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-mustard-400 transition-colors bg-gray-50">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <label htmlFor="photo-upload" className="cursor-pointer">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                              <Camera className="w-8 h-8 text-mustard-500" />
                            </div>
                            <p className="font-semibold text-navy-900 mb-1">Adicionar fotos</p>
                            <p className="text-sm text-gray-500">PNG, JPG ate 5MB cada</p>
                          </label>
                        </div>

                        {formData.photos.length > 0 && (
                          <div className="grid grid-cols-5 gap-3 mt-4">
                            {formData.photos.map((photo, index) => (
                              <div key={index} className="relative group aspect-square">
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-full object-cover rounded-xl"
                                />
                                <button
                                  onClick={() => removePhoto(index)}
                                  className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={() => setStep(2)} className="h-12 px-6 rounded-xl">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                      </Button>
                      <Button
                        onClick={() => setStep(4)}
                        disabled={!formData.description || formData.description.length < 20}
                        className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 px-8 h-12 rounded-xl shadow-lg shadow-mustard-500/30 disabled:opacity-50 disabled:shadow-none"
                      >
                        Continuar
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Urgency & Review */}
                {step === 4 && (
                  <div className="p-8">
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-navy-900 mb-2">
                        Quando voce precisa do servico?
                      </h2>
                      <p className="text-gray-500">
                        A urgencia pode influenciar o valor do orcamento
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Urgency Levels */}
                      <div className="grid grid-cols-3 gap-4">
                        {urgencyLevels.map((level) => {
                          const Icon = level.icon
                          const isSelected = formData.urgency === level.id
                          return (
                            <button
                              key={level.id}
                              onClick={() => setFormData({ ...formData, urgency: level.id })}
                              className={`relative p-5 border-2 rounded-2xl text-left transition-all overflow-hidden ${
                                isSelected
                                  ? 'border-mustard-500 shadow-lg'
                                  : 'border-gray-100 hover:border-mustard-300'
                              }`}
                            >
                              {isSelected && (
                                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${level.color}`} />
                              )}
                              <div className="relative">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br ${level.color}`}>
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-bold text-navy-900 mb-1">{level.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">{level.desc}</p>
                                <span className={`text-sm font-semibold ${
                                  level.id === 'normal' ? 'text-green-600' : 'text-amber-600'
                                }`}>
                                  {level.price}
                                </span>
                              </div>
                            </button>
                          )
                        })}
                      </div>

                      {/* Preferred Date */}
                      <div>
                        <Label htmlFor="preferredDate" className="text-sm font-semibold text-navy-900 mb-3 block">
                          Data preferencial (opcional)
                        </Label>
                        <div className="relative max-w-xs">
                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="preferredDate"
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                            className="pl-12 h-12 rounded-xl"
                          />
                        </div>
                      </div>

                      {/* Info Box */}
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Info className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-navy-900 mb-1">O que acontece agora?</h4>
                          <p className="text-sm text-gray-600">
                            Voce recebera de 3 a 7 orcamentos de profissionais verificados em ate 24 horas. Compare precos, avaliacoes e escolha o melhor!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={() => setStep(3)} className="h-12 px-6 rounded-xl">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-gradient-to-r from-mustard-400 to-mustard-600 hover:from-mustard-500 hover:to-mustard-700 text-navy-900 px-8 h-12 rounded-xl shadow-lg shadow-mustard-500/30 font-semibold"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin mr-2" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar Solicitacao
                            <Rocket className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT ==================== */}
      <div className="lg:hidden min-h-screen flex flex-col">
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 safe-area-top">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-center">
              <p className="text-sm font-bold text-navy-900">{stepTitles[step - 1].title}</p>
              <p className="text-xs text-gray-500">Passo {step} de 4</p>
            </div>
            <div className="w-10" />
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-100">
            <div
              className="h-full bg-gradient-to-r from-mustard-400 to-mustard-600 transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </header>

        {/* Mobile Content */}
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
          animateIn ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
        }`}>
          {/* Step 1: Category */}
          {step === 1 && (
            <div className="p-5">
              {/* Hero Section */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy-900 mb-2">
                  Qual servico voce precisa?
                </h1>
                <p className="text-gray-500">
                  Selecione a categoria
                </p>
              </div>

              {/* Category Cards */}
              <div className="space-y-3">
                {categories.map((category) => {
                  const Icon = category.icon
                  const isSelected = formData.category === category.id
                  return (
                    <button
                      key={category.id}
                      onClick={() => setFormData({ ...formData, category: category.id })}
                      className={`relative w-full overflow-hidden rounded-2xl border-2 transition-all active:scale-[0.98] ${
                        isSelected
                          ? 'border-mustard-500 shadow-lg shadow-mustard-500/20'
                          : 'border-gray-100'
                      }`}
                    >
                      {/* Background gradient */}
                      <div className={`absolute inset-0 opacity-5 bg-gradient-to-r ${category.color}`} />

                      <div className="relative p-4 flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${category.color} shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-navy-900 text-lg">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.estimatedPrice}</p>
                        </div>
                        {isSelected && (
                          <div className="w-7 h-7 bg-mustard-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-navy-900" />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Trust Badge */}
              <div className="mt-6 p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-navy-900">Profissionais verificados</p>
                  <p className="text-xs text-gray-500">Todos passam por analise de qualidade</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="p-5">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy-900 mb-2">
                  Sobre o local
                </h1>
                <p className="text-gray-500">
                  Essas informacoes ajudam no orcamento
                </p>
              </div>

              <div className="space-y-6">
                {/* Property Type */}
                <div>
                  <Label className="text-sm font-semibold text-navy-900 mb-3 block">
                    Tipo de imovel
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {propertyTypes.map((type) => {
                      const Icon = type.icon
                      const isSelected = formData.propertyType === type.id
                      return (
                        <button
                          key={type.id}
                          onClick={() => setFormData({ ...formData, propertyType: type.id })}
                          className={`p-4 border-2 rounded-2xl transition-all active:scale-95 ${
                            isSelected
                              ? 'border-mustard-500 bg-mustard-50'
                              : 'border-gray-100'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${
                            isSelected ? 'bg-mustard-500' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-navy-900' : 'text-gray-500'}`} />
                          </div>
                          <span className="text-sm font-medium text-navy-900 block text-center">{type.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Building Age */}
                <div>
                  <Label className="text-sm font-semibold text-navy-900 mb-3 block">
                    Idade da construcao
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {buildingAges.map((age) => {
                      const isSelected = formData.buildingAge === age.id
                      return (
                        <button
                          key={age.id}
                          onClick={() => setFormData({ ...formData, buildingAge: age.id })}
                          className={`p-4 border-2 rounded-2xl text-center transition-all active:scale-95 ${
                            isSelected
                              ? 'border-mustard-500 bg-mustard-50'
                              : 'border-gray-100'
                          }`}
                        >
                          <span className="text-sm font-semibold text-navy-900 block">{age.name}</span>
                          <span className="text-xs text-gray-500">{age.desc}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location-mobile" className="text-sm font-semibold text-navy-900 mb-3 block">
                    Localizacao
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="location-mobile"
                      type="text"
                      placeholder="CEP ou endereco"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="pl-12 h-14 rounded-2xl text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Description */}
          {step === 3 && (
            <div className="p-5">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy-900 mb-2">
                  Descreva o servico
                </h1>
                <p className="text-gray-500">
                  Mais detalhes = melhores orcamentos
                </p>
              </div>

              <div className="space-y-6">
                {/* Description */}
                <div>
                  <textarea
                    rows={5}
                    placeholder="Descreva o que voce precisa em detalhes..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-100 rounded-2xl focus:border-mustard-500 focus:ring-0 resize-none text-base"
                  />
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-400">Minimo 20 caracteres</p>
                    <p className={`text-xs font-medium ${
                      formData.description.length >= 20 ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      {formData.description.length}/500
                    </p>
                  </div>
                </div>

                {/* Photos */}
                <div>
                  <Label className="text-sm font-semibold text-navy-900 mb-3 block">
                    Fotos (opcional)
                  </Label>

                  {formData.photos.length === 0 ? (
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload-mobile"
                      />
                      <label htmlFor="photo-upload-mobile" className="cursor-pointer">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-3">
                          <Camera className="w-7 h-7 text-mustard-500" />
                        </div>
                        <p className="font-medium text-navy-900">Adicionar fotos</p>
                        <p className="text-xs text-gray-500">Ajuda os profissionais a entender melhor</p>
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-4 gap-2">
                        {formData.photos.map((photo, index) => (
                          <div key={index} className="relative aspect-square">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded-xl"
                            />
                            <button
                              onClick={() => removePhoto(index)}
                              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <label
                          htmlFor="photo-upload-mobile-add"
                          className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer"
                        >
                          <Camera className="w-6 h-6 text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoUpload}
                            className="hidden"
                            id="photo-upload-mobile-add"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Urgency */}
          {step === 4 && (
            <div className="p-5">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy-900 mb-2">
                  Quando voce precisa?
                </h1>
                <p className="text-gray-500">
                  A urgencia pode influenciar o preco
                </p>
              </div>

              <div className="space-y-6">
                {/* Urgency Options */}
                <div className="space-y-3">
                  {urgencyLevels.map((level) => {
                    const Icon = level.icon
                    const isSelected = formData.urgency === level.id
                    return (
                      <button
                        key={level.id}
                        onClick={() => setFormData({ ...formData, urgency: level.id })}
                        className={`relative w-full p-4 border-2 rounded-2xl text-left transition-all active:scale-[0.98] overflow-hidden ${
                          isSelected
                            ? 'border-mustard-500 shadow-lg'
                            : 'border-gray-100'
                        }`}
                      >
                        {isSelected && (
                          <div className={`absolute inset-0 opacity-10 bg-gradient-to-r ${level.color}`} />
                        )}
                        <div className="relative flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${level.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-0.5">
                              <h3 className="font-bold text-navy-900">{level.name}</h3>
                              <span className={`text-sm font-semibold ${
                                level.id === 'normal' ? 'text-green-600' : 'text-amber-600'
                              }`}>
                                {level.price}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">{level.desc}</p>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 bg-mustard-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-navy-900" />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Date */}
                <div>
                  <Label htmlFor="preferredDate-mobile" className="text-sm font-semibold text-navy-900 mb-3 block">
                    Data preferencial (opcional)
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="preferredDate-mobile"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="pl-12 h-14 rounded-2xl text-base"
                    />
                  </div>
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-2xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="w-5 h-5 text-mustard-400" />
                    <h4 className="font-semibold">Resumo da Solicitacao</h4>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Servico:</span>
                      <span className="font-medium">
                        {categories.find(c => c.id === formData.category)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Local:</span>
                      <span className="font-medium">
                        {propertyTypes.find(p => p.id === formData.propertyType)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Urgencia:</span>
                      <span className="font-medium">
                        {urgencyLevels.find(u => u.id === formData.urgency)?.name}
                      </span>
                    </div>
                    {formData.photos.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-white/70">Fotos:</span>
                        <span className="font-medium">{formData.photos.length} anexada(s)</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    Voce recebera ate 7 orcamentos em 24 horas
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 safe-area-bottom">
          {step < 4 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && !formData.category) ||
                (step === 2 && (!formData.propertyType || !formData.buildingAge || !formData.location)) ||
                (step === 3 && (!formData.description || formData.description.length < 20))
              }
              className="w-full h-14 bg-gradient-to-r from-mustard-400 to-mustard-600 hover:from-mustard-500 hover:to-mustard-700 text-navy-900 rounded-2xl font-semibold text-base shadow-lg shadow-mustard-500/30 disabled:opacity-50 disabled:shadow-none"
            >
              Continuar
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-mustard-400 to-mustard-600 hover:from-mustard-500 hover:to-mustard-700 text-navy-900 rounded-2xl font-semibold text-base shadow-lg shadow-mustard-500/30"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin mr-2" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Solicitacao
                  <Rocket className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

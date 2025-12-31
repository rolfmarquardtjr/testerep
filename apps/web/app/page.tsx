'use client'

import { Button, Input } from '@/components/ui'
import {
  Search, Star, Shield, Clock, ArrowRight, ChevronRight,
  Zap, Droplets, Paintbrush, Wind, Sparkles, Wrench,
  CheckCircle, MapPin, Users, Award, TrendingUp,
  Phone, Mail, MessageCircle, Hammer, Truck,
  Lock, CreditCard, Headphones, Play, Quote,
  BadgeCheck, Timer, ThumbsUp, Eye, Target,
  Briefcase, Home, Building, Heart, AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function HomePage() {
  // Contador animado para prova social
  const [servicesCount, setServicesCount] = useState(0)
  const [professionalsOnline, setProfessionalsOnline] = useState(0)

  useEffect(() => {
    // Animacao de contador (Vies: Prova Social + Movimento atrai atencao)
    const targetServices = 12847
    const targetOnline = 127
    const duration = 2000
    const steps = 60

    let currentServices = 0
    let currentOnline = 0
    const incrementServices = targetServices / steps
    const incrementOnline = targetOnline / steps

    const timer = setInterval(() => {
      currentServices += incrementServices
      currentOnline += incrementOnline
      if (currentServices >= targetServices) {
        setServicesCount(targetServices)
        setProfessionalsOnline(targetOnline)
        clearInterval(timer)
      } else {
        setServicesCount(Math.floor(currentServices))
        setProfessionalsOnline(Math.floor(currentOnline))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  const categories = [
    { id: 'eletrica', name: 'Eletricista', icon: Zap, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop', jobs: 2341 },
    { id: 'hidraulica', name: 'Encanador', icon: Droplets, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop', jobs: 1892 },
    { id: 'pintura', name: 'Pintor', icon: Paintbrush, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop', jobs: 1654 },
    { id: 'ar', name: 'Ar Condicionado', icon: Wind, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop', jobs: 987 },
    { id: 'limpeza', name: 'Limpeza', icon: Sparkles, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop', jobs: 3210 },
    { id: 'montagem', name: 'Montador', icon: Wrench, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', jobs: 1456 },
    { id: 'marcenaria', name: 'Marceneiro', icon: Hammer, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop', jobs: 876 },
    { id: 'mudanca', name: 'Mudanca', icon: Truck, image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=400&h=300&fit=crop', jobs: 1123 },
  ]

  // Profissionais em destaque com fotos reais (Vies: Efeito Halo)
  const featuredPros = [
    {
      id: '1',
      name: 'Carlos Eduardo',
      category: 'Eletricista',
      rating: 4.9,
      reviews: 247,
      jobs: 189,
      price: 'R$ 120',
      verified: true,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      responseTime: '15 min',
      description: 'Especialista em instalacoes residenciais com 12 anos de experiencia',
    },
    {
      id: '2',
      name: 'Fernanda Lima',
      category: 'Designer de Interiores',
      rating: 5.0,
      reviews: 156,
      jobs: 98,
      price: 'R$ 200',
      verified: true,
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
      responseTime: '30 min',
      description: 'Transformo ambientes com criatividade e funcionalidade',
    },
    {
      id: '3',
      name: 'Roberto Santos',
      category: 'Encanador',
      rating: 4.8,
      reviews: 312,
      jobs: 267,
      price: 'R$ 100',
      verified: true,
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      responseTime: '20 min',
      description: 'Solucoes rapidas para vazamentos e instalacoes hidraulicas',
    },
    {
      id: '4',
      name: 'Ana Carolina',
      category: 'Pintora',
      rating: 4.9,
      reviews: 198,
      jobs: 145,
      price: 'R$ 80',
      verified: true,
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      responseTime: '25 min',
      description: 'Pintura residencial com acabamento impecavel e pontualidade',
    },
  ]

  // Depoimentos reais com fotos (Vies: Prova Social + Autoridade)
  const testimonials = [
    {
      id: 1,
      name: 'Patricia Mendes',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      role: 'Empresaria',
      location: 'Sao Paulo, SP',
      rating: 5,
      text: 'Incrivel! Em menos de 2 horas recebi 5 orcamentos. Contratei um eletricista que resolveu meu problema no mesmo dia. Nunca mais vou perder tempo ligando para varios profissionais.',
      service: 'Instalacao Eletrica',
      saved: 'R$ 350',
      date: 'Ha 3 dias',
    },
    {
      id: 2,
      name: 'Marcos Oliveira',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      role: 'Engenheiro',
      location: 'Rio de Janeiro, RJ',
      rating: 5,
      text: 'A verificacao de antecedentes me deu total seguranca para deixar o profissional entrar na minha casa. O servico foi impecavel e o preco muito justo comparado ao mercado.',
      service: 'Reforma de Banheiro',
      saved: 'R$ 1.200',
      date: 'Ha 1 semana',
    },
    {
      id: 3,
      name: 'Juliana Costa',
      photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      role: 'Medica',
      location: 'Belo Horizonte, MG',
      rating: 5,
      text: 'Como tenho pouco tempo, adorei poder resolver tudo pelo celular. Agendei a limpeza pos-obra para o sabado e a profissional chegou pontualmente. Casa impecavel!',
      service: 'Limpeza Pos-Obra',
      saved: 'R$ 200',
      date: 'Ha 5 dias',
    },
  ]

  // Estatisticas para ancoragem e prova social
  const stats = [
    { number: '12.847', label: 'Servicos realizados', icon: CheckCircle, suffix: '' },
    { number: '2.500', label: 'Profissionais verificados', icon: BadgeCheck, suffix: '+' },
    { number: '4.9', label: 'Avaliacao media', icon: Star, suffix: '/5' },
    { number: '98', label: 'Clientes satisfeitos', icon: Heart, suffix: '%' },
  ]

  // Garantias (Vies: Reducao de Risco + Autoridade)
  const guarantees = [
    {
      icon: Shield,
      title: 'Profissionais Verificados',
      description: 'Checagem de documentos, antecedentes e qualificacoes de todos os profissionais',
    },
    {
      icon: Lock,
      title: 'Pagamento Seguro',
      description: 'Seu dinheiro fica protegido ate voce confirmar que o servico foi concluido',
    },
    {
      icon: ThumbsUp,
      title: 'Garantia de Satisfacao',
      description: 'Se nao ficar satisfeito, devolvemos seu dinheiro em ate 7 dias',
    },
    {
      icon: Headphones,
      title: 'Suporte 7 dias',
      description: 'Equipe disponivel todos os dias para ajudar voce no que precisar',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HEADER FIXO ===== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-mustard-500 rounded-xl flex items-center justify-center">
                <Wrench className="w-5 h-5 lg:w-6 lg:h-6 text-navy-900" />
              </div>
              <span className="text-xl lg:text-2xl font-bold text-navy-900">Repfy</span>
            </Link>

            {/* Nav Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/explorar" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">
                Explorar Profissionais
              </Link>
              <Link href="/como-funciona" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">
                Como Funciona
              </Link>
              <Link href="/para-profissionais" className="text-sm font-medium text-gray-600 hover:text-navy-900 transition-colors">
                Seja um Profissional
              </Link>
            </nav>

            {/* CTA Header */}
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-navy-900 px-4 py-2 transition-colors">
                Entrar
              </Link>
              <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-10 lg:h-11 px-4 lg:px-6 rounded-xl">
                <Link href="/register">
                  <span className="hidden sm:inline">Cadastrar Gratis</span>
                  <span className="sm:hidden">Cadastrar</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Barra de Urgencia - Vies: Escassez + FOMO */}
        <div className="bg-navy-900 py-2 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-white font-medium">{professionalsOnline} profissionais online agora</span>
            </div>
            <span className="text-gray-400 hidden sm:inline">|</span>
            <span className="text-gray-300 hidden sm:inline">Resposta media: 15 minutos</span>
          </div>
        </div>
      </header>

      {/* ===== HERO SECTION - MOBILE ===== */}
      <section className="lg:hidden relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=1000&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/90 to-navy-900/70" />
        </div>

        <div className="relative px-5 pt-8 pb-10">
          {/* Badge de Confianca */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="" className="w-8 h-8 rounded-full border-2 border-white/20" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face" alt="" className="w-8 h-8 rounded-full border-2 border-white/20" />
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="" className="w-8 h-8 rounded-full border-2 border-white/20" />
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 fill-mustard-500 text-mustard-500" />
              <span className="text-sm font-bold text-white">4.9</span>
              <span className="text-sm text-white/80">• {servicesCount.toLocaleString()}+ servicos</span>
            </div>
          </div>

          {/* Titulo Principal */}
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
            O profissional certo para sua casa em{' '}
            <span className="text-mustard-400">minutos</span>
          </h1>

          {/* Subtitulo */}
          <p className="text-base text-white/80 mb-6">
            Receba ate 5 orcamentos de profissionais verificados. Compare e contrate com seguranca.
          </p>

          {/* Barra de Busca Mobile */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="O que voce precisa?"
              className="pl-12 h-14 bg-white border-0 rounded-2xl text-base shadow-lg"
            />
          </div>

          <Button className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-14 rounded-2xl text-base mb-6">
            <Search className="w-5 h-5 mr-2" />
            Buscar Profissional
          </Button>

          {/* Quick Links Mobile - Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {['Eletricista', 'Encanador', 'Pintor', 'Limpeza', 'Montador'].map((item) => (
              <Link
                key={item}
                href={`/explorar?q=${item.toLowerCase()}`}
                className="flex-shrink-0 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full hover:bg-white/20 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Trust Badges Mobile */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                <Shield className="w-5 h-5 text-mustard-400" />
              </div>
              <p className="text-xs text-white/80">Verificados</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                <Lock className="w-5 h-5 text-mustard-400" />
              </div>
              <p className="text-xs text-white/80">Pag. Seguro</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
                <ThumbsUp className="w-5 h-5 text-mustard-400" />
              </div>
              <p className="text-xs text-white/80">Garantia</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HERO SECTION - DESKTOP ===== */}
      {/* Vies: Clareza + Proposta de Valor + Prova Social Imediata */}
      <section className="relative overflow-hidden bg-gray-50 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            {/* Conteudo Hero */}
            <div className="text-center lg:text-left mb-10 lg:mb-0">
              {/* Badge de Confianca - Vies: Prova Social */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-6">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="" className="w-7 h-7 rounded-full border-2 border-white" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face" alt="" className="w-7 h-7 rounded-full border-2 border-white" />
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" alt="" className="w-7 h-7 rounded-full border-2 border-white" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-mustard-500 text-mustard-500" />
                  <span className="text-sm font-bold text-navy-900">4.9</span>
                </div>
                <span className="text-sm text-gray-600">+{servicesCount.toLocaleString()} servicos realizados</span>
              </div>

              {/* Titulo Principal - Beneficio Claro */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 leading-tight">
                O profissional certo para sua casa em{' '}
                <span className="text-mustard-600">minutos</span>
              </h1>

              {/* Subtitulo - Proposta de Valor */}
              <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Receba ate 5 orcamentos de profissionais verificados. Compare precos, veja avaliacoes e contrate com seguranca.
              </p>

              {/* Barra de Busca - CTA Principal */}
              <div className="relative max-w-xl mx-auto lg:mx-0 mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="O que voce precisa? Ex: consertar vazamento"
                  className="pl-12 pr-32 h-14 lg:h-16 bg-white border-gray-200 rounded-2xl text-base shadow-lg focus:border-mustard-500 focus:ring-mustard-500"
                />
                <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-10 lg:h-12 px-4 lg:px-6 rounded-xl">
                  Buscar
                </Button>
              </div>

              {/* Links Rapidos - Vies: Facilidade */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-sm">
                <span className="text-gray-500">Mais procurados:</span>
                {['Eletricista', 'Encanador', 'Pintor', 'Limpeza'].map((item) => (
                  <Link
                    key={item}
                    href={`/explorar?q=${item.toLowerCase()}`}
                    className="text-navy-900 hover:text-mustard-600 font-medium underline-offset-2 hover:underline transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>

              {/* Trust Badges - Vies: Autoridade + Reducao de Risco */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Profissionais verificados</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span>Pagamento seguro</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                  <span>Garantia de satisfacao</span>
                </div>
              </div>
            </div>

            {/* Imagem Hero - Lado Direito */}
            <div className="relative hidden lg:block">
              {/* Imagem Principal */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=500&fit=crop"
                  alt="Profissional realizando servico"
                  className="w-full h-[500px] object-cover"
                />
                {/* Overlay suave */}
                <div className="absolute inset-0 bg-navy-900/10" />
              </div>

              {/* Card Flutuante - Orcamento Recebido (Vies: Prova Social em Tempo Real) */}
              <div className="absolute -left-8 top-8 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-pulse-slow max-w-[220px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-900">Orcamento recebido!</p>
                    <p className="text-xs text-gray-500">Agora mesmo</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" alt="" className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium text-navy-900">Carlos Eduardo</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-mustard-500 text-mustard-500" />
                      <span className="text-xs text-gray-600">4.9 (247 avaliacoes)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Flutuante - Economia (Vies: Ancoragem) */}
              <div className="absolute -right-4 bottom-12 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-mustard-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-mustard-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Economia media</p>
                    <p className="text-xl font-bold text-navy-900">R$ 380</p>
                    <p className="text-xs text-green-600 font-medium">comparando orcamentos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOGOS/MIDIA - Vies: Autoridade ===== */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 mb-6">Reconhecido pela midia e parceiros</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Forbes</div>
            <div className="text-2xl font-bold text-gray-400">Exame</div>
            <div className="text-2xl font-bold text-gray-400">Estadao</div>
            <div className="text-2xl font-bold text-gray-400">Veja</div>
            <div className="text-2xl font-bold text-gray-400">G1</div>
          </div>
        </div>
      </section>

      {/* ===== ESTATISTICAS - MOBILE ===== */}
      <section className="lg:hidden py-8 bg-white">
        <div className="px-5">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {stats.map((stat, i) => (
              <div key={i} className="flex-shrink-0 w-[140px] text-center p-4 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-mustard-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-mustard-600" />
                </div>
                <p className="text-2xl font-bold text-navy-900">
                  {stat.number}{stat.suffix}
                </p>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ESTATISTICAS - DESKTOP ===== */}
      <section className="hidden lg:block py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 lg:p-8 bg-gray-50 rounded-2xl">
                <stat.icon className="w-8 h-8 text-mustard-500 mx-auto mb-3" />
                <p className="text-3xl lg:text-4xl font-bold text-navy-900">
                  {stat.number}{stat.suffix}
                </p>
                <p className="text-sm lg:text-base text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIAS - MOBILE ===== */}
      <section className="lg:hidden py-10 bg-gray-50">
        <div className="px-5 mb-6">
          <h2 className="text-2xl font-bold text-navy-900 mb-2">
            Encontre o profissional ideal
          </h2>
          <p className="text-gray-600">
            +50 categorias de servicos disponiveis
          </p>
        </div>

        {/* Horizontal Scroll de Categorias */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-5 scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/explorar?categoria=${cat.id}`}
              className="flex-shrink-0 w-[160px] group"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-md">
                <div className="aspect-[3/4] relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent" />

                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                      <cat.icon className="w-5 h-5 text-navy-900" />
                    </div>
                    <h3 className="font-semibold text-white text-base">{cat.name}</h3>
                    <p className="text-white/70 text-xs">{cat.jobs.toLocaleString()} servicos</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="px-5 mt-4">
          <Button asChild variant="outline" className="w-full border-navy-200 text-navy-900 h-12 rounded-xl">
            <Link href="/explorar">
              Ver todas as categorias
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ===== CATEGORIAS - DESKTOP ===== */}
      <section className="hidden lg:block py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              Encontre o profissional ideal
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mais de 50 categorias de servicos. Escolha o que voce precisa e receba orcamentos em minutos.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/explorar?categoria=${cat.id}`}
                className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Imagem de Fundo */}
                <div className="aspect-[4/3] relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy-900/40 group-hover:bg-navy-900/50 transition-colors" />

                  {/* Conteudo sobre a imagem */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-white/90 rounded-xl flex items-center justify-center">
                        <cat.icon className="w-5 h-5 text-navy-900" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white text-lg">{cat.name}</h3>
                    <p className="text-white/80 text-sm">{cat.jobs.toLocaleString()} servicos</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-navy-200 text-navy-900 hover:bg-navy-50 h-12 px-8 rounded-xl">
              <Link href="/explorar">
                Ver todas as categorias
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== COMO FUNCIONA - MOBILE ===== */}
      <section className="lg:hidden py-12 bg-navy-900">
        <div className="px-5">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-mustard-500/20 text-mustard-400 rounded-full text-xs font-medium mb-3">
              Simples e rapido
            </span>
            <h2 className="text-2xl font-bold text-white mb-2">
              Como funciona
            </h2>
            <p className="text-sm text-gray-400">
              3 passos para encontrar o profissional perfeito
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                step: '1',
                icon: Target,
                title: 'Descreva o que precisa',
                description: 'Conte em poucas palavras o servico que voce precisa.',
                time: '30 segundos',
              },
              {
                step: '2',
                icon: Users,
                title: 'Receba orcamentos',
                description: 'Profissionais enviam propostas com precos e prazos.',
                time: 'Ate 2 horas',
              },
              {
                step: '3',
                icon: CheckCircle,
                title: 'Contrate com seguranca',
                description: 'Converse, agende e pague com protecao.',
                time: 'Voce decide',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl">
                <div className="w-12 h-12 bg-mustard-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-navy-900">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400 mb-2">{item.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-mustard-400">
                    <Timer className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button asChild className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-14 rounded-2xl">
            <Link href="/solicitar-servico">
              Solicitar Orcamento Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <p className="text-gray-500 text-xs text-center mt-3">Sem compromisso. Cancele quando quiser.</p>
        </div>
      </section>

      {/* ===== COMO FUNCIONA - DESKTOP ===== */}
      <section className="hidden lg:block py-16 lg:py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-mustard-500/20 text-mustard-400 rounded-full text-sm font-medium mb-4">
              Simples e rapido
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Em apenas 3 passos voce encontra o profissional perfeito
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '1',
                icon: Target,
                title: 'Descreva o que precisa',
                description: 'Conte em poucas palavras o servico que voce precisa. Pode ser simples, tipo "consertar torneira vazando".',
                time: '30 segundos',
              },
              {
                step: '2',
                icon: Users,
                title: 'Receba orcamentos',
                description: 'Profissionais verificados enviam propostas com precos e prazos. Compare e escolha o melhor.',
                time: 'Ate 2 horas',
              },
              {
                step: '3',
                icon: CheckCircle,
                title: 'Contrate com seguranca',
                description: 'Converse pelo chat, agende o servico e pague com protecao. Simples assim.',
                time: 'Voce decide',
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                {/* Linha conectora */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-white/10" />
                )}

                <div className="relative">
                  <div className="w-20 h-20 bg-mustard-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl font-bold text-navy-900">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 mb-4 max-w-xs mx-auto">{item.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-mustard-400">
                    <Timer className="w-4 h-4" />
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-14 px-10 rounded-xl">
              <Link href="/solicitar-servico">
                Solicitar Orcamento Gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <p className="text-gray-400 text-sm mt-4">Sem compromisso. Cancele quando quiser.</p>
          </div>
        </div>
      </section>

      {/* ===== PROFISSIONAIS EM DESTAQUE - MOBILE ===== */}
      <section className="lg:hidden py-10 bg-white">
        <div className="px-5 mb-6">
          <h2 className="text-2xl font-bold text-navy-900 mb-1">
            Profissionais em destaque
          </h2>
          <p className="text-gray-600 text-sm">Os mais bem avaliados da plataforma</p>
        </div>

        {/* Horizontal Scroll de Profissionais */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-5 scrollbar-hide">
          {featuredPros.map((pro) => (
            <Link
              key={pro.id}
              href={`/profissional/${pro.id}`}
              className="flex-shrink-0 w-[280px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Header com Imagem de Fundo */}
              <div className="relative h-24 bg-gradient-to-br from-navy-900 to-navy-800">
                <img
                  src={pro.photo.replace('w=200', 'w=400').replace('h=200', 'h=300')}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />

                {/* Online Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-white font-medium">Online</span>
                </div>
              </div>

              <div className="p-4 -mt-8 relative">
                {/* Foto */}
                <div className="relative mb-3">
                  <img
                    src={pro.photo}
                    alt={pro.name}
                    className="w-16 h-16 rounded-xl object-cover border-4 border-white shadow-md"
                  />
                  {pro.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center border-2 border-white">
                      <BadgeCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="font-semibold text-navy-900">{pro.name}</h3>
                <p className="text-mustard-600 font-medium text-sm mb-2">{pro.category}</p>

                {/* Rating e Response */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1 bg-mustard-50 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-mustard-500 text-mustard-500" />
                    <span className="text-sm font-bold text-navy-900">{pro.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">({pro.reviews})</span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ~{pro.responseTime}
                  </span>
                </div>

                {/* Preco e CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-lg font-bold text-navy-900">{pro.price}</p>
                    <p className="text-[10px] text-gray-400">a partir de</p>
                  </div>
                  <Button size="sm" className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-medium h-9 px-4 rounded-xl">
                    Ver perfil
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="px-5 mt-2">
          <Button asChild variant="outline" className="w-full border-navy-200 text-navy-900 h-12 rounded-xl">
            <Link href="/explorar">
              Ver todos os profissionais
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ===== PROFISSIONAIS EM DESTAQUE - DESKTOP ===== */}
      <section className="hidden lg:block py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-2">
                Profissionais em destaque
              </h2>
              <p className="text-gray-600">Os mais bem avaliados da plataforma</p>
            </div>
            <Button asChild variant="outline" className="border-navy-200 text-navy-900 hidden sm:flex">
              <Link href="/explorar">
                Ver todos
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPros.map((pro) => (
              <Link
                key={pro.id}
                href={`/profissional/${pro.id}`}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-mustard-300 transition-all duration-300"
              >
                <div className="p-6">
                  {/* Foto e Badge */}
                  <div className="relative mb-4">
                    <img
                      src={pro.photo}
                      alt={pro.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                    {pro.verified && (
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center border-2 border-white">
                        <BadgeCheck className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {/* Online indicator */}
                    <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-navy-900 text-lg">{pro.name}</h3>
                  <p className="text-mustard-600 font-medium text-sm mb-2">{pro.category}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pro.description}</p>

                  {/* Rating e Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-mustard-50 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-mustard-500 text-mustard-500" />
                      <span className="text-sm font-bold text-navy-900">{pro.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({pro.reviews} avaliacoes)</span>
                  </div>

                  {/* Tempo de Resposta */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>Responde em ~{pro.responseTime}</span>
                  </div>

                  {/* Preco e CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xl font-bold text-navy-900">{pro.price}</p>
                      <p className="text-xs text-gray-400">a partir de</p>
                    </div>
                    <Button size="sm" className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-medium">
                      Ver perfil
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Button asChild variant="outline" className="border-navy-200 text-navy-900 w-full h-12">
              <Link href="/explorar">
                Ver todos os profissionais
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== GARANTIAS - MOBILE ===== */}
      <section className="lg:hidden py-10 bg-gray-50">
        <div className="px-5">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">
              Por que confiar no Repfy?
            </h2>
            <p className="text-sm text-gray-600">
              Sua seguranca e satisfacao em primeiro lugar
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {guarantees.map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100">
                <div className="w-11 h-11 bg-mustard-100 rounded-xl flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-mustard-600" />
                </div>
                <h3 className="font-semibold text-navy-900 text-sm mb-1">{item.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GARANTIAS - DESKTOP ===== */}
      <section className="hidden lg:block py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              Por que confiar no Repfy?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sua seguranca e satisfacao sao nossa prioridade numero 1
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((item, i) => (
              <div key={i} className="bg-white p-6 lg:p-8 rounded-2xl border border-gray-100 hover:border-mustard-200 hover:shadow-lg transition-all">
                <div className="w-14 h-14 bg-mustard-100 rounded-2xl flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-mustard-600" />
                </div>
                <h3 className="font-semibold text-navy-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEPOIMENTOS - MOBILE ===== */}
      <section className="lg:hidden py-10 bg-white">
        <div className="px-5 mb-6">
          <h2 className="text-2xl font-bold text-navy-900 mb-2">
            O que nossos clientes dizem
          </h2>
          <p className="text-sm text-gray-600">
            +98% dos clientes recomendam o Repfy
          </p>
        </div>

        {/* Horizontal Scroll de Depoimentos */}
        <div className="flex gap-4 overflow-x-auto pb-4 px-5 scrollbar-hide">
          {testimonials.map((review) => (
            <div key={review.id} className="flex-shrink-0 w-[300px] bg-gray-50 p-5 rounded-2xl relative">
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-6 h-6 text-mustard-200" />

              {/* Rating */}
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-mustard-500 text-mustard-500" />
                ))}
              </div>

              {/* Texto */}
              <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-4">"{review.text}"</p>

              {/* Economia destacada */}
              <div className="bg-green-50 border border-green-100 rounded-xl p-2.5 mb-4">
                <p className="text-xs text-green-700">
                  <span className="font-semibold">Economizou {review.saved}</span> comparando orcamentos
                </p>
              </div>

              {/* Autor */}
              <div className="flex items-center gap-3">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== DEPOIMENTOS - DESKTOP ===== */}
      <section className="hidden lg:block py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-gray-600">
              Mais de 98% dos clientes recomendam o Repfy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((review) => (
              <div key={review.id} className="bg-gray-50 p-6 lg:p-8 rounded-2xl relative">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-mustard-200" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-mustard-500 text-mustard-500" />
                  ))}
                </div>

                {/* Texto */}
                <p className="text-gray-700 mb-6 leading-relaxed">"{review.text}"</p>

                {/* Economia destacada - Vies: Ancoragem */}
                <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-6">
                  <p className="text-sm text-green-700">
                    <span className="font-semibold">Economizou {review.saved}</span> comparando orcamentos
                  </p>
                </div>

                {/* Autor */}
                <div className="flex items-center gap-3">
                  <img
                    src={review.photo}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-navy-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.role} - {review.location}</p>
                  </div>
                </div>

                {/* Servico e Data */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
                  <span>{review.service}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA PARA PROFISSIONAIS - MOBILE ===== */}
      <section className="lg:hidden relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=1000&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/95 to-navy-900/80" />
        </div>

        <div className="relative px-5 py-12">
          <span className="inline-block px-3 py-1 bg-mustard-500/20 text-mustard-400 rounded-full text-xs font-medium mb-4">
            Para profissionais
          </span>
          <h2 className="text-2xl font-bold text-white mb-3">
            Aumente sua renda com novos clientes
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            Cadastre-se gratis e receba solicitacoes de servico na sua regiao hoje.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-mustard-400">R$ 4.500</p>
              <p className="text-xs text-gray-300">Renda media/mes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-mustard-400">15+</p>
              <p className="text-xs text-gray-300">Novos clientes/mes</p>
            </div>
          </div>

          {/* Beneficios */}
          <ul className="space-y-2 mb-6">
            {[
              'Cadastro 100% gratuito',
              'Leads qualificados na sua regiao',
              'Voce escolhe os trabalhos',
              'Suporte dedicado',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-200">
                <CheckCircle className="w-4 h-4 text-mustard-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <Button asChild className="w-full bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-14 rounded-2xl">
            <Link href="/register?tipo=profissional">
              Cadastrar como Profissional
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ===== CTA PARA PROFISSIONAIS - DESKTOP ===== */}
      <section className="hidden lg:block py-16 lg:py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-10 lg:mb-0">
              <span className="inline-block px-4 py-1 bg-mustard-500/20 text-mustard-400 rounded-full text-sm font-medium mb-4">
                Para profissionais
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Aumente sua renda com novos clientes todos os dias
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Cadastre-se gratuitamente e comece a receber solicitacoes de servico na sua regiao hoje mesmo.
              </p>

              {/* Stats para profissionais - Vies: Ancoragem */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-mustard-400">R$ 4.500</p>
                  <p className="text-sm text-gray-300">Renda media mensal</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-3xl font-bold text-mustard-400">15+</p>
                  <p className="text-sm text-gray-300">Novos clientes/mes</p>
                </div>
              </div>

              {/* Beneficios */}
              <ul className="space-y-3 mb-8">
                {[
                  'Cadastro 100% gratuito',
                  'Receba leads qualificados na sua regiao',
                  'Voce escolhe quais trabalhos aceitar',
                  'Suporte dedicado para profissionais',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle className="w-5 h-5 text-mustard-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button asChild size="lg" className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 font-semibold h-14 px-8 rounded-xl">
                <Link href="/register?tipo=profissional">
                  Cadastrar como Profissional
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Imagem do profissional */}
            <div className="relative hidden lg:block">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=500&fit=crop"
                  alt="Profissional trabalhando"
                  className="w-full h-[500px] object-cover"
                />
              </div>

              {/* Card de ganhos */}
              <div className="absolute -left-8 bottom-8 bg-white rounded-2xl shadow-xl p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ganhos este mes</p>
                    <p className="text-2xl font-bold text-navy-900">R$ 5.240</p>
                    <p className="text-sm text-green-600 font-medium">+23% vs mes anterior</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ - MOBILE ===== */}
      <section className="lg:hidden py-10 bg-gray-50">
        <div className="px-5">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'O Repfy e gratuito para clientes?',
                a: 'Sim! Solicitar orcamentos e comparar profissionais e 100% gratuito.',
              },
              {
                q: 'Como sei que os profissionais sao confiaveis?',
                a: 'Todos passam por verificacao de documentos e antecedentes. Veja avaliacoes reais antes de contratar.',
              },
              {
                q: 'Em quanto tempo recebo orcamentos?',
                a: 'Em media, voce recebe o primeiro orcamento em ate 15 minutos.',
              },
              {
                q: 'E se eu nao ficar satisfeito?',
                a: 'Oferecemos garantia de satisfacao. Suporte disponivel 7 dias por semana.',
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="font-medium text-navy-900 text-sm pr-3">{faq.q}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-gray-600 text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ - DESKTOP ===== */}
      <section className="hidden lg:block py-16 lg:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-900 mb-4">
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'O Repfy e gratuito para clientes?',
                a: 'Sim! Solicitar orcamentos e comparar profissionais e 100% gratuito. Voce so paga pelo servico contratado diretamente ao profissional.',
              },
              {
                q: 'Como sei que os profissionais sao confiaveis?',
                a: 'Todos os profissionais passam por verificacao de documentos e antecedentes. Alem disso, voce pode ver avaliacoes reais de outros clientes antes de contratar.',
              },
              {
                q: 'Em quanto tempo recebo orcamentos?',
                a: 'Em media, voce recebe o primeiro orcamento em ate 15 minutos. A maioria dos clientes recebe de 3 a 5 propostas em ate 2 horas.',
              },
              {
                q: 'E se eu nao ficar satisfeito com o servico?',
                a: 'Oferecemos garantia de satisfacao. Se algo der errado, nossa equipe de suporte esta disponivel 7 dias por semana para ajudar a resolver.',
              },
              {
                q: 'Posso cancelar o servico apos contratar?',
                a: 'Sim, voce pode cancelar antes do profissional iniciar o trabalho sem nenhuma cobranca. Apos o inicio, consulte os termos com o profissional.',
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-semibold text-navy-900 pr-4">{faq.q}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL - MOBILE ===== */}
      <section className="lg:hidden py-12 bg-mustard-500">
        <div className="px-5 text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-3">
            Pronto para resolver seu problema?
          </h2>
          <p className="text-sm text-navy-800 mb-6">
            Milhares de pessoas ja encontraram profissionais confiaveis no Repfy.
          </p>

          <Button asChild className="w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold h-14 rounded-2xl mb-3">
            <Link href="/solicitar-servico">
              <Search className="w-5 h-5 mr-2" />
              Solicitar Orcamento Gratis
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full bg-transparent border-2 border-navy-900 text-navy-900 font-semibold h-12 rounded-xl">
            <Link href="/explorar">
              Explorar Profissionais
            </Link>
          </Button>

          <p className="text-navy-700 text-xs mt-4">
            Sem cartao de credito. Sem compromisso.
          </p>
        </div>
      </section>

      {/* ===== CTA FINAL - DESKTOP ===== */}
      <section className="hidden lg:block py-16 lg:py-24 bg-mustard-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-navy-900 mb-6">
            Pronto para resolver seu problema?
          </h2>
          <p className="text-lg lg:text-xl text-navy-800 mb-10 max-w-2xl mx-auto">
            Milhares de pessoas ja encontraram profissionais confiaveis no Repfy. Receba orcamentos em minutos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-navy-900 hover:bg-navy-800 text-white font-semibold h-14 px-10 rounded-xl">
              <Link href="/solicitar-servico">
                <Search className="w-5 h-5 mr-2" />
                Solicitar Orcamento Gratis
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-semibold h-14 px-10 rounded-xl">
              <Link href="/explorar">
                Explorar Profissionais
              </Link>
            </Button>
          </div>

          <p className="text-navy-700 text-sm mt-6">
            Sem cartao de credito. Sem compromisso. Cancele quando quiser.
          </p>
        </div>
      </section>

      {/* ===== FOOTER - MOBILE ===== */}
      <footer className="lg:hidden bg-navy-900 text-white py-10">
        <div className="px-5">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-mustard-500 rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-navy-900" />
            </div>
            <span className="text-xl font-bold">Repfy</span>
          </div>

          {/* Links em Accordion Style */}
          <div className="space-y-4 mb-8">
            <div>
              <h4 className="font-semibold text-sm mb-3">Para Clientes</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/solicitar-servico" className="text-sm text-gray-400 hover:text-white">Solicitar Servico</Link>
                <Link href="/explorar" className="text-sm text-gray-400 hover:text-white">Explorar</Link>
                <Link href="/como-funciona" className="text-sm text-gray-400 hover:text-white">Como Funciona</Link>
                <Link href="/ajuda" className="text-sm text-gray-400 hover:text-white">Ajuda</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Para Profissionais</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/register?tipo=profissional" className="text-sm text-gray-400 hover:text-white">Cadastre-se</Link>
                <Link href="/para-profissionais" className="text-sm text-gray-400 hover:text-white">Como Funciona</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Legal</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/termos" className="text-sm text-gray-400 hover:text-white">Termos</Link>
                <Link href="/privacidade" className="text-sm text-gray-400 hover:text-white">Privacidade</Link>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mb-6">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 py-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Pag. Seguro</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Shield className="w-3.5 h-3.5" />
              <span>Dados Protegidos</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 text-center mt-4">
            2025 Repfy. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* ===== FOOTER - DESKTOP ===== */}
      <footer className="hidden lg:block bg-navy-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Logo e Descricao */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-mustard-500 rounded-xl flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-navy-900" />
                </div>
                <span className="text-xl font-bold">Repfy</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                A maneira mais facil e segura de encontrar profissionais para sua casa.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Para Clientes</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/solicitar-servico" className="hover:text-white transition-colors">Solicitar Servico</Link></li>
                <li><Link href="/explorar" className="hover:text-white transition-colors">Explorar Profissionais</Link></li>
                <li><Link href="/como-funciona" className="hover:text-white transition-colors">Como Funciona</Link></li>
                <li><Link href="/ajuda" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Para Profissionais</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/register?tipo=profissional" className="hover:text-white transition-colors">Cadastre-se</Link></li>
                <li><Link href="/para-profissionais" className="hover:text-white transition-colors">Como Funciona</Link></li>
                <li><Link href="/precos" className="hover:text-white transition-colors">Planos e Precos</Link></li>
                <li><Link href="/sucesso" className="hover:text-white transition-colors">Casos de Sucesso</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre Nos</Link></li>
                <li><Link href="/contato" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-white transition-colors">Politica de Privacidade</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              2025 Repfy. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Lock className="w-4 h-4" />
                <span>Pagamentos seguros</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Dados protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

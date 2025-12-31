'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import Link from 'next/link'
import {
  CheckCircle,
  Clock,
  Bell,
  MessageSquare,
  Home as HomeIcon,
  Sparkles,
  Shield,
  Users,
  Star,
  ArrowRight,
  Zap,
  Gift,
  TrendingUp,
  ChevronRight,
  PartyPopper,
  Rocket
} from 'lucide-react'

export default function ConfirmacaoPage() {
  const [showConfetti, setShowConfetti] = useState(true)
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    // Animate elements sequentially
    const timers = [
      setTimeout(() => setAnimationStep(1), 100),
      setTimeout(() => setAnimationStep(2), 300),
      setTimeout(() => setAnimationStep(3), 500),
      setTimeout(() => setAnimationStep(4), 700),
      setTimeout(() => setAnimationStep(5), 900),
      setTimeout(() => setShowConfetti(false), 3000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const stats = [
    { icon: Users, value: '5-7', label: 'Orçamentos esperados', color: 'from-blue-500 to-cyan-500' },
    { icon: Clock, value: '24h', label: 'Tempo médio', color: 'from-purple-500 to-pink-500' },
    { icon: Star, value: '4.8', label: 'Nota média dos profissionais', color: 'from-yellow-400 to-amber-500' },
  ]

  const timeline = [
    {
      icon: Clock,
      title: 'Aguarde os orçamentos',
      description: 'Em até 24 horas você receberá entre 3 a 7 propostas de profissionais verificados',
      color: 'from-yellow-400 to-amber-500',
      delay: 3
    },
    {
      icon: MessageSquare,
      title: 'Compare e converse',
      description: 'Veja preços, avaliações e tire dúvidas diretamente com os profissionais',
      color: 'from-blue-500 to-cyan-500',
      delay: 4
    },
    {
      icon: CheckCircle,
      title: 'Escolha o melhor',
      description: 'Selecione a proposta ideal e agende o serviço com total segurança',
      color: 'from-green-500 to-emerald-500',
      delay: 5
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 flex flex-col overflow-hidden relative">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: ['#D4A017', '#1A2B4A', '#3B82F6', '#10B981', '#F59E0B'][Math.floor(Math.random() * 5)],
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-mustard-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 lg:p-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            Repfy
          </Link>
          <div className="hidden lg:flex items-center gap-2 text-mustard-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Solicitação #12847</span>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex flex-1 relative z-10">
        <div className="max-w-6xl mx-auto w-full py-12 px-6">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left - Success Message */}
            <div className="lg:col-span-3">
              {/* Success Icon & Message */}
              <div
                className={`transition-all duration-700 ${animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-mustard-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl shadow-mustard-500/50">
                    <CheckCircle className="w-14 h-14 text-navy-900" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                    <PartyPopper className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  Solicitação enviada<br />
                  <span className="text-mustard-400">com sucesso!</span>
                </h1>
                <p className="text-lg text-gray-300 max-w-lg">
                  Seus profissionais qualificados já foram notificados e em breve você receberá os melhores orçamentos da região.
                </p>
              </div>

              {/* Stats */}
              <div
                className={`mt-10 grid grid-cols-3 gap-4 transition-all duration-700 delay-200 ${animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div
                className={`mt-10 transition-all duration-700 delay-300 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-mustard-400" />
                  Próximos passos
                </h2>
                <div className="space-y-4">
                  {timeline.map((step, index) => (
                    <div
                      key={index}
                      className="flex gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all group"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-mustard-400 bg-mustard-500/10 px-2 py-0.5 rounded-full">
                            Passo {index + 1}
                          </span>
                        </div>
                        <h3 className="font-semibold text-white">{step.title}</h3>
                        <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Action Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Notification Card */}
              <div
                className={`bg-gradient-to-br from-mustard-500 to-amber-500 rounded-2xl p-6 shadow-2xl shadow-mustard-500/30 transition-all duration-700 delay-400 ${animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-navy-900/20 rounded-xl flex items-center justify-center">
                    <Bell className="w-6 h-6 text-navy-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900">Notificações ativas</h3>
                    <p className="text-sm text-navy-800">Você será avisado de tudo</p>
                  </div>
                </div>
                <div className="bg-navy-900/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-navy-900">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Email quando chegar orçamento</span>
                  </div>
                  <div className="flex items-center gap-2 text-navy-900">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Push notification no celular</span>
                  </div>
                  <div className="flex items-center gap-2 text-navy-900">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">SMS para urgências</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 transition-all duration-700 delay-500 ${animationStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Garantia Repfy</h3>
                    <p className="text-xs text-gray-400">Sua tranquilidade garantida</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Todos os profissionais são verificados e você tem suporte completo durante todo o processo.
                </p>
              </div>

              {/* Action Buttons */}
              <div
                className={`space-y-3 transition-all duration-700 delay-600 ${animationStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-mustard-500 to-amber-500 hover:from-mustard-600 hover:to-amber-600 text-navy-900 font-semibold h-14 text-base shadow-lg shadow-mustard-500/30"
                >
                  <Link href="/dashboard/cliente/pedidos" className="flex items-center justify-center gap-2">
                    Ver Minhas Solicitações
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className="w-full border-white/20 text-white hover:bg-white/10 h-14 text-base"
                >
                  <Link href="/" className="flex items-center justify-center gap-2">
                    <HomeIcon className="w-5 h-5" />
                    Voltar ao Início
                  </Link>
                </Button>
              </div>

              {/* Bonus Tip */}
              <div
                className={`bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-5 border border-blue-500/20 transition-all duration-700 delay-700 ${animationStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Dica Pro</span>
                </div>
                <p className="text-sm text-gray-300">
                  Responda rápido aos orçamentos! Profissionais priorizam clientes que demonstram interesse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex-1 relative z-10 flex flex-col">
        {/* Success Hero */}
        <div
          className={`text-center px-6 pt-8 pb-6 transition-all duration-700 ${animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-mustard-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl shadow-mustard-500/50">
              <CheckCircle className="w-12 h-12 text-navy-900" />
            </div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <PartyPopper className="w-4 h-4 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            Solicitação enviada!
          </h1>
          <p className="text-gray-400 text-sm">
            Profissionais já foram notificados
          </p>
        </div>

        {/* Stats Row */}
        <div
          className={`px-4 transition-all duration-700 delay-100 ${animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex-shrink-0 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 min-w-[110px]">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Banner */}
        <div
          className={`mx-4 mt-4 transition-all duration-700 delay-200 ${animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-gradient-to-r from-mustard-500 to-amber-500 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-navy-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5 text-navy-900" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-navy-900 text-sm">Notificações ativas</h3>
                <p className="text-xs text-navy-800">Email, push e SMS habilitados</p>
              </div>
              <CheckCircle className="w-6 h-6 text-navy-900 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div
          className={`flex-1 px-4 py-6 transition-all duration-700 delay-300 ${animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-mustard-400" />
            Próximos passos
          </h2>
          <div className="space-y-3">
            {timeline.map((step, index) => (
              <div
                key={index}
                className="flex gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 active:scale-[0.98] transition-transform"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-medium text-mustard-400 bg-mustard-500/10 px-1.5 py-0.5 rounded">
                      {index + 1}
                    </span>
                    <h3 className="font-semibold text-white text-sm truncate">{step.title}</h3>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div
          className={`px-4 pb-4 transition-all duration-700 delay-400 ${animationStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white text-sm">Garantia Repfy</h3>
                <p className="text-xs text-gray-400">Profissionais verificados e suporte completo</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div
          className={`sticky bottom-0 left-0 right-0 bg-gradient-to-t from-navy-900 via-navy-900 to-transparent pt-6 pb-6 px-4 transition-all duration-700 delay-500 ${animationStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Button
            asChild
            size="lg"
            className="w-full bg-gradient-to-r from-mustard-500 to-amber-500 hover:from-mustard-600 hover:to-amber-600 text-navy-900 font-bold h-14 text-base shadow-lg shadow-mustard-500/30 active:scale-[0.98] transition-transform mb-3"
          >
            <Link href="/dashboard/cliente/pedidos" className="flex items-center justify-center gap-2">
              Ver Minhas Solicitações
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            asChild
            className="w-full text-gray-400 hover:text-white h-12"
          >
            <Link href="/" className="flex items-center justify-center gap-2">
              <HomeIcon className="w-4 h-4" />
              Voltar ao Início
            </Link>
          </Button>
        </div>
      </div>

      {/* CSS for confetti animation */}
      <style jsx global>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

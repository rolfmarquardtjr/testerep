'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'
import {
  Check,
  X,
  Star,
  TrendingUp,
  Shield,
  Zap,
  Crown,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Posso mudar de plano a qualquer momento?',
    answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. O ajuste é feito proporcionalmente ao período restante.'
  },
  {
    question: 'Como funciona a taxa de 15%?',
    answer: 'A taxa de 15% é cobrada apenas sobre serviços concluídos. Se você receber R$ 1.000 por um serviço, R$ 150 ficam com a Repfy e R$ 850 vão para você.'
  },
  {
    question: 'Preciso pagar para começar?',
    answer: 'Não! O Plano Básico é 100% gratuito. Você pode começar imediatamente sem fornecer cartão de crédito. Só pague quando quiser recursos avançados.'
  },
  {
    question: 'Posso cancelar minha assinatura?',
    answer: 'Sim, você pode cancelar a qualquer momento. Não há multas ou taxas de cancelamento. Você continuará tendo acesso aos recursos até o final do período pago.'
  },
  {
    question: 'Há desconto para pagamento anual?',
    answer: 'Sim! Assinantes anuais recebem 2 meses grátis (equivalente a 16% de desconto). É a melhor opção para quem quer economizar.'
  },
]

export default function PrecosPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const plans = [
    {
      name: 'Básico',
      subtitle: 'Para começar',
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      features: {
        included: [
          'Perfil profissional completo',
          'Até 5 solicitações por mês',
          'Suporte por email',
          'Taxa de serviço: 15%',
        ],
        excluded: [
          'Prioridade nas buscas',
          'Destaque no perfil',
          'Estatísticas avançadas',
          'Suporte prioritário',
        ]
      },
      cta: 'Começar Grátis',
      ctaVariant: 'outline' as const,
    },
    {
      name: 'Profissional',
      subtitle: 'Mais Popular',
      monthlyPrice: 49.90,
      yearlyPrice: 499,
      popular: true,
      badge: 'MAIS ESCOLHIDO',
      features: {
        included: [
          'Tudo do plano Básico',
          'Solicitações ilimitadas',
          'Prioridade nas buscas',
          'Selo "Profissional Verificado"',
          'Estatísticas detalhadas',
          'Suporte prioritário',
          'Taxa de serviço: 12%',
        ],
        excluded: [
          'Destaque no topo',
          'Gerente de conta dedicado',
        ]
      },
      cta: 'Começar Teste Grátis',
      ctaVariant: 'default' as const,
    },
    {
      name: 'Premium',
      subtitle: 'Para crescer',
      monthlyPrice: 99.90,
      yearlyPrice: 999,
      popular: false,
      icon: Crown,
      features: {
        included: [
          'Tudo do plano Profissional',
          'Destaque no topo das buscas',
          'Selo "Premium"',
          'Gerente de conta dedicado',
          'Acesso antecipado a novos recursos',
          'Análises e relatórios avançados',
          'Treinamento personalizado',
          'Taxa de serviço: 10%',
        ],
        excluded: []
      },
      cta: 'Falar com Vendas',
      ctaVariant: 'outline' as const,
    },
  ]

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return 'Grátis'
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice / 12
    return `R$ ${price.toFixed(2).replace('.', ',')}`
  }

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0 || billingCycle === 'monthly') return null
    const monthlyCost = plan.monthlyPrice * 12
    const yearlyCost = plan.yearlyPrice
    const savings = monthlyCost - yearlyCost
    return `Economize R$ ${savings.toFixed(2).replace('.', ',')}/ano`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-navy-900">
              Repfy
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-navy-900 transition-colors"
              >
                Entrar
              </Link>
              <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                <Link href="/register">Começar Grátis</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Planos Simples e Transparentes
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Escolha o plano perfeito para o seu momento profissional. Sem taxas escondidas, sem surpresas.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white/10 rounded-full p-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-mustard-500 text-navy-900 font-semibold'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-mustard-500 text-navy-900 font-semibold'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Anual
              <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                -16%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 -mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-2xl shadow-lg transition-all hover:shadow-xl ${
                    plan.popular ? 'ring-2 ring-mustard-500 scale-105 md:scale-110' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-mustard-500 text-navy-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                      {Icon && (
                        <div className="w-12 h-12 bg-mustard-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6 text-mustard-600" />
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-navy-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm">{plan.subtitle}</p>
                    </div>

                    {/* Pricing */}
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold text-navy-900">
                          {getPrice(plan)}
                        </span>
                        {plan.monthlyPrice > 0 && (
                          <span className="text-gray-600">/mês</span>
                        )}
                      </div>
                      {getSavings(plan) && (
                        <p className="text-sm text-green-600 font-semibold">{getSavings(plan)}</p>
                      )}
                      {billingCycle === 'yearly' && plan.yearlyPrice > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Cobrado R$ {plan.yearlyPrice.toFixed(2).replace('.', ',')} anualmente
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.included.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.features.excluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 opacity-40">
                          <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-500 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button
                      asChild
                      variant={plan.ctaVariant}
                      className={`w-full h-12 ${
                        plan.popular
                          ? 'bg-mustard-500 hover:bg-mustard-600 text-navy-900'
                          : plan.ctaVariant === 'default'
                          ? 'bg-navy-900 hover:bg-navy-800 text-white'
                          : ''
                      }`}
                    >
                      <Link href={plan.monthlyPrice === 0 ? '/register' : '/register?plan=' + plan.name.toLowerCase()}>
                        {plan.cta}
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Trial Notice */}
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <p className="text-gray-600">
              <Star className="inline w-4 h-4 text-mustard-500 mr-1" />
              Todos os planos pagos incluem <strong>14 dias de teste grátis</strong>. Sem compromisso, cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Comparação Detalhada
            </h2>
            <p className="text-xl text-gray-600">
              Veja todos os recursos lado a lado
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-navy-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left rounded-tl-lg">Recurso</th>
                  <th className="px-6 py-4 text-center">Básico</th>
                  <th className="px-6 py-4 text-center bg-mustard-500 text-navy-900">Profissional</th>
                  <th className="px-6 py-4 text-center rounded-tr-lg">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Solicitações mensais</td>
                  <td className="px-6 py-4 text-center">5</td>
                  <td className="px-6 py-4 text-center bg-mustard-50">Ilimitadas</td>
                  <td className="px-6 py-4 text-center">Ilimitadas</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">Taxa de serviço</td>
                  <td className="px-6 py-4 text-center">15%</td>
                  <td className="px-6 py-4 text-center bg-mustard-50">12%</td>
                  <td className="px-6 py-4 text-center">10%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Prioridade nas buscas</td>
                  <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center bg-mustard-50"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">Destaque no perfil</td>
                  <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center bg-mustard-50"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Estatísticas avançadas</td>
                  <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center bg-mustard-50"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-medium">Suporte prioritário</td>
                  <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center bg-mustard-50"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Gerente de conta</td>
                  <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center bg-mustard-50"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-navy-900 pr-4">{faq.question}</span>
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-mustard-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Ainda tem dúvidas?</p>
              <Button asChild variant="outline">
                <Link href="/ajuda">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Central de Ajuda
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Crescer Seu Negócio?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já estão conquistando novos clientes pela Repfy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 text-lg h-14 px-8"
            >
              <Link href="/register">
                Começar Grátis <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg h-14 px-8"
            >
              <Link href="/para-profissionais">Saber Mais</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Repfy</h3>
              <p className="text-gray-400">
                Conectando profissionais e clientes de forma simples e segura.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Você</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/como-funciona" className="hover:text-mustard-500">Como Funciona</Link></li>
                <li><Link href="/explorar" className="hover:text-mustard-500">Encontrar Profissionais</Link></li>
                <li><Link href="/para-profissionais" className="hover:text-mustard-500">Seja um Profissional</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ajuda" className="hover:text-mustard-500">Central de Ajuda</Link></li>
                <li><Link href="/precos" className="hover:text-mustard-500">Preços</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/termos" className="hover:text-mustard-500">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-mustard-500">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Repfy. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

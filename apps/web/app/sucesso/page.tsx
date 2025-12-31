'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import {
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Briefcase,
  MessageSquare,
  TrendingUp,
  Sparkles,
} from 'lucide-react'

function SucessoContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') || 'cadastro'
  const userRole = searchParams.get('role') || 'CLIENT'
  const userName = searchParams.get('name') || 'Usuário'

  const contentMap: Record<string, {
    title: string
    subtitle: string
    message: string
    nextSteps: Array<{ icon: any; title: string; description: string; link?: string }>
    primaryCTA: { text: string; link: string }
    secondaryCTA?: { text: string; link: string }
  }> = {
    cadastro: {
      title: `Bem-vindo à Repfy, ${userName.split(' ')[0]}!`,
      subtitle: '🎉 Sua conta foi criada com sucesso',
      message: userRole === 'CLIENT'
        ? 'Você está pronto para encontrar os melhores profissionais da sua região!'
        : 'Você está pronto para começar a receber solicitações de clientes!',
      nextSteps: userRole === 'CLIENT' ? [
        {
          icon: Users,
          title: 'Explore Profissionais',
          description: 'Navegue por categorias e encontre o profissional perfeito para seu projeto',
          link: '/explorar'
        },
        {
          icon: Briefcase,
          title: 'Solicite um Serviço',
          description: 'Descreva o que você precisa e receba orçamentos personalizados',
          link: '/solicitar-servico'
        },
        {
          icon: Star,
          title: 'Complete Seu Perfil',
          description: 'Adicione mais informações para uma experiência personalizada',
          link: '/dashboard/cliente/perfil'
        },
      ] : [
        {
          icon: Star,
          title: 'Complete Seu Perfil',
          description: 'Adicione fotos, portfólio e especialidades para atrair mais clientes',
          link: '/dashboard/profissional/perfil'
        },
        {
          icon: Sparkles,
          title: 'Configure Seus Serviços',
          description: 'Defina quais serviços você oferece e seus preços',
          link: '/dashboard/profissional/servicos'
        },
        {
          icon: TrendingUp,
          title: 'Verifique Seu Perfil',
          description: 'Envie documentos para ganhar o selo de verificação',
          link: '/dashboard/profissional/verificacao'
        },
      ],
      primaryCTA: {
        text: userRole === 'CLIENT' ? 'Explorar Profissionais' : 'Ir para o Dashboard',
        link: userRole === 'CLIENT' ? '/explorar' : '/dashboard/profissional'
      },
      secondaryCTA: {
        text: 'Ver Tutorial',
        link: '/como-funciona'
      }
    },
    pagamento: {
      title: 'Pagamento Confirmado!',
      subtitle: '✓ Sua transação foi processada com sucesso',
      message: 'Agradecemos pela sua confiança. O profissional será notificado imediatamente.',
      nextSteps: [
        {
          icon: MessageSquare,
          title: 'Acompanhe o Serviço',
          description: 'Mantenha contato com o profissional através do chat',
        },
        {
          icon: Star,
          title: 'Deixe uma Avaliação',
          description: 'Após a conclusão, avalie o serviço para ajudar outros usuários',
        },
      ],
      primaryCTA: {
        text: 'Ver Meus Pedidos',
        link: '/dashboard/cliente/pedidos'
      },
      secondaryCTA: {
        text: 'Ir para o Dashboard',
        link: '/dashboard/cliente'
      }
    },
    assinatura: {
      title: 'Assinatura Ativada!',
      subtitle: '🚀 Você agora é um membro ' + (searchParams.get('plan') || 'Premium'),
      message: 'Aproveite todos os benefícios do seu plano e impulsione seu negócio!',
      nextSteps: [
        {
          icon: Sparkles,
          title: 'Recursos Desbloqueados',
          description: 'Explore todos os recursos premium disponíveis para você',
        },
        {
          icon: TrendingUp,
          title: 'Análises Avançadas',
          description: 'Acesse estatísticas detalhadas sobre seu desempenho',
        },
        {
          icon: Star,
          title: 'Prioridade nas Buscas',
          description: 'Seu perfil agora aparece primeiro nas pesquisas',
        },
      ],
      primaryCTA: {
        text: 'Ir para o Dashboard',
        link: '/dashboard/profissional'
      },
      secondaryCTA: {
        text: 'Ver Meus Benefícios',
        link: '/dashboard/profissional/assinatura'
      }
    },
    orcamento: {
      title: 'Solicitação Enviada!',
      subtitle: '✓ O profissional recebeu sua solicitação',
      message: 'Você receberá uma notificação assim que o orçamento estiver pronto.',
      nextSteps: [
        {
          icon: MessageSquare,
          title: 'Aguarde o Orçamento',
          description: 'O profissional irá analisar e enviar uma proposta em breve',
        },
        {
          icon: Users,
          title: 'Explore Outros Profissionais',
          description: 'Enquanto isso, você pode solicitar orçamentos de outros profissionais',
          link: '/explorar'
        },
      ],
      primaryCTA: {
        text: 'Ver Minhas Solicitações',
        link: '/dashboard/cliente/pedidos'
      },
      secondaryCTA: {
        text: 'Explorar Mais Profissionais',
        link: '/explorar'
      }
    },
  }

  const content = contentMap[type] || contentMap.cadastro

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-navy-900">
            Repfy
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
              {content.title}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {content.subtitle}
            </p>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.message}
            </p>
          </div>

          {/* Next Steps */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-navy-900 text-center mb-8">
              Próximos Passos
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {content.nextSteps.map((step, index) => {
                const Icon = step.icon
                const CardContent = (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-mustard-500 hover:shadow-lg transition-all h-full">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-mustard-100 rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-mustard-600" />
                      </div>
                      <h3 className="font-semibold text-navy-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {step.description}
                      </p>
                      {step.link && (
                        <div className="mt-4">
                          <ArrowRight className="w-5 h-5 text-mustard-600" />
                        </div>
                      )}
                    </div>
                  </div>
                )

                return step.link ? (
                  <Link key={index} href={step.link}>
                    {CardContent}
                  </Link>
                ) : (
                  <div key={index}>
                    {CardContent}
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              size="lg"
              className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 text-lg h-14 px-8"
            >
              <Link href={content.primaryCTA.link}>
                {content.primaryCTA.text}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            {content.secondaryCTA && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg h-14 px-8"
              >
                <Link href={content.secondaryCTA.link}>
                  {content.secondaryCTA.text}
                </Link>
              </Button>
            )}
          </div>

          {/* Tips */}
          {type === 'cadastro' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
              <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Dica para Começar
              </h3>
              <div className="space-y-3 text-gray-700">
                {userRole === 'CLIENT' ? (
                  <>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Compare vários profissionais antes de decidir</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Verifique as avaliações e portfólios</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Descreva seu projeto com detalhes para receber orçamentos precisos</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Adicione fotos de alta qualidade ao seu portfólio</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Responda rapidamente às solicitações para aumentar sua taxa de conversão</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Mantenha seu perfil sempre atualizado com suas especialidades</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Support */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Precisa de ajuda? Estamos aqui para você!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="outline" size="sm">
                <Link href="/ajuda">
                  Central de Ajuda
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/como-funciona">
                  Como Funciona
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="mailto:suporte@repfy.com">
                  Falar com Suporte
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12 mt-20">
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

export default function SucessoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-mustard-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <SucessoContent />
    </Suspense>
  )
}

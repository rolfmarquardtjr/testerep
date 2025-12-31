'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  CheckCircle,
  Star,
  Calendar,
  CreditCard,
  Shield,
  Users,
  TrendingUp,
  Briefcase,
  MessageSquare,
} from 'lucide-react'

export default function ParaProfissionaisPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
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
                <Link href="/register">Cadastre-se Grátis</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Expanda Seu Negócio com a Repfy
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Conecte-se com milhares de clientes que procuram profissionais qualificados como você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 text-lg h-14 px-8"
              >
                <Link href="/register">
                  Começar Agora <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg h-14 px-8"
              >
                <Link href="#beneficios">Saiba Mais</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-mustard-600 mb-2">10k+</div>
              <div className="text-gray-600">Profissionais Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-mustard-600 mb-2">50k+</div>
              <div className="text-gray-600">Serviços Realizados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-mustard-600 mb-2">4.8</div>
              <div className="text-gray-600">Avaliação Média</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-mustard-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Por Que Escolher a Repfy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para crescer seu negócio em um só lugar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-mustard-500 transition-colors">
              <div className="w-12 h-12 bg-mustard-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-mustard-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                Novos Clientes Todos os Dias
              </h3>
              <p className="text-gray-600">
                Receba solicitações de serviço de clientes verificados prontos para contratar
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-mustard-500 transition-colors">
              <div className="w-12 h-12 bg-mustard-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-mustard-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                Gestão Completa de Agenda
              </h3>
              <p className="text-gray-600">
                Organize seus horários, serviços e compromissos em um único lugar
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-mustard-500 transition-colors">
              <div className="w-12 h-12 bg-mustard-100 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-mustard-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                Pagamentos Seguros
              </h3>
              <p className="text-gray-600">
                Receba seus pagamentos com segurança através da nossa plataforma
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-mustard-500 transition-colors">
              <div className="w-12 h-12 bg-mustard-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-mustard-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                Perfil Verificado
              </h3>
              <p className="text-gray-600">
                Ganhe credibilidade com nosso selo de verificação profissional
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-mustard-500 transition-colors">
              <div className="w-12 h-12 bg-mustard-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-mustard-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                Sistema de Avaliações
              </h3>
              <p className="text-gray-600">
                Construa sua reputação com avaliações reais de clientes satisfeitos
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 hover:border-mustard-500 transition-colors">
              <div className="w-12 h-12 bg-mustard-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-mustard-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                Chat Direto com Clientes
              </h3>
              <p className="text-gray-600">
                Negocie detalhes e tire dúvidas direto pela plataforma
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comece a receber clientes em 3 passos simples
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-mustard-500 text-navy-900 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-navy-900 mb-2">
                    Crie Seu Perfil Grátis
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Cadastre-se em minutos, adicione suas especialidades, portfólio e disponibilidade
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-mustard-500 text-navy-900 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-navy-900 mb-2">
                    Receba Solicitações
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Clientes interessados vão encontrar você e enviar solicitações de serviço
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-mustard-500 text-navy-900 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-navy-900 mb-2">
                    Realize e Receba
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Execute o serviço, receba sua avaliação e o pagamento com segurança
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Crescer Seu Negócio?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de profissionais que já estão conquistando novos clientes pela Repfy
          </p>
          <Button
            asChild
            size="lg"
            className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 text-lg h-14 px-8"
          >
            <Link href="/register">
              Cadastre-se Gratuitamente <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
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
                <li><Link href="/contato" className="hover:text-mustard-500">Contato</Link></li>
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

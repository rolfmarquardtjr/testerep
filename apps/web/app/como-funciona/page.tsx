'use client'

import { Button } from '@/components/ui'
import Link from 'next/link'
import {
  Search,
  MessageSquare,
  FileText,
  CheckCircle,
  Star,
  Shield,
  Clock,
  CreditCard,
  UserCheck,
  ArrowRight,
} from 'lucide-react'

export default function ComoFuncionaPage() {
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
                <Link href="/register">Cadastre-se</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Como Funciona a Repfy</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conectamos você aos melhores profissionais da sua região de forma simples, rápida e segura
          </p>
        </div>
      </section>

      {/* For Clients */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Para Clientes
            </h2>
            <p className="text-xl text-gray-600">
              Encontre o profissional perfeito em 4 passos simples
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="w-16 h-16 bg-mustard-500 text-navy-900 rounded-full flex items-center justify-center font-bold text-2xl mb-4">
                  1
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  <Search className="inline w-6 h-6 mr-2 text-mustard-600" />
                  Busque o Serviço
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Digite o serviço que você precisa ou navegue pelas categorias disponíveis. Temos profissionais de diversas áreas prontos para atender você.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Mais de 100 categorias de serviços</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Busca por localização</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Filtros por avaliação e preço</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                <Search className="w-32 h-32 text-gray-400" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="flex-1">
                <div className="w-16 h-16 bg-mustard-500 text-navy-900 rounded-full flex items-center justify-center font-bold text-2xl mb-4">
                  2
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  <UserCheck className="inline w-6 h-6 mr-2 text-mustard-600" />
                  Escolha o Profissional
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Compare perfis, veja avaliações de outros clientes, portfólios e disponibilidade. Escolha o profissional que melhor atende suas necessidades.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Perfis verificados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Avaliações reais de clientes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Portfólio de trabalhos anteriores</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                <UserCheck className="w-32 h-32 text-gray-400" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <div className="w-16 h-16 bg-mustard-500 text-navy-900 rounded-full flex items-center justify-center font-bold text-2xl mb-4">
                  3
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  <FileText className="inline w-6 h-6 mr-2 text-mustard-600" />
                  Solicite um Orçamento
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Descreva detalhadamente o serviço que você precisa. O profissional irá analisar e enviar um orçamento personalizado para você.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Formulário simples e rápido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Chat direto com o profissional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Sem compromisso até aceitar</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                <FileText className="w-32 h-32 text-gray-400" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="flex-1">
                <div className="w-16 h-16 bg-mustard-500 text-navy-900 rounded-full flex items-center justify-center font-bold text-2xl mb-4">
                  4
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">
                  <CheckCircle className="inline w-6 h-6 mr-2 text-mustard-600" />
                  Aprove e Receba
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Aprove o orçamento, agende o serviço e aguarde o profissional. Após a conclusão, avalie o trabalho realizado.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Agendamento flexível</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Acompanhamento em tempo real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Avalie e ajude outros clientes</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 bg-gray-100 rounded-2xl p-8 h-64 flex items-center justify-center">
                <CheckCircle className="w-32 h-32 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Segurança e Confiança
            </h2>
            <p className="text-xl text-gray-600">
              Sua tranquilidade é nossa prioridade
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
              <div className="w-16 h-16 bg-mustard-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-mustard-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                Profissionais Verificados
              </h3>
              <p className="text-gray-600">
                Todos os profissionais passam por processo de verificação de identidade e qualificações
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
              <div className="w-16 h-16 bg-mustard-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-mustard-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                Pagamento Seguro
              </h3>
              <p className="text-gray-600">
                Sistema de pagamento criptografado e seguro. Pague apenas quando o serviço for concluído
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 text-center">
              <div className="w-16 h-16 bg-mustard-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-mustard-600" />
              </div>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">
                Avaliações Reais
              </h3>
              <p className="text-gray-600">
                Sistema de avaliação verificado. Apenas clientes que contrataram podem avaliar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Encontre o profissional perfeito para o seu projeto em minutos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 text-lg h-14 px-8"
            >
              <Link href="/explorar">
                Encontrar Profissionais <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg h-14 px-8"
            >
              <Link href="/para-profissionais">Sou Profissional</Link>
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

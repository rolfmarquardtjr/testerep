'use client'

import { Button, Input } from '@/components/ui'
import Link from 'next/link'
import { useState } from 'react'
import {
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
  User,
  CreditCard,
  Shield,
  FileText,
  Clock,
} from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqs: FAQItem[] = [
  // Para Clientes
  {
    category: 'clientes',
    question: 'Como faço para contratar um profissional?',
    answer: 'É muito simples! Busque pelo serviço que você precisa, compare os perfis dos profissionais, veja suas avaliações e portfólios. Quando encontrar o profissional ideal, clique em "Solicitar Orçamento", descreva o que você precisa e aguarde a resposta com o orçamento.'
  },
  {
    category: 'clientes',
    question: 'Como funciona o pagamento?',
    answer: 'O pagamento é feito através da plataforma Repfy de forma segura. Você pode pagar com cartão de crédito, débito ou PIX. O pagamento só é liberado para o profissional após a conclusão e aprovação do serviço.'
  },
  {
    category: 'clientes',
    question: 'E se eu não ficar satisfeito com o serviço?',
    answer: 'Sua satisfação é nossa prioridade. Se você não ficar satisfeito com o serviço, entre em contato com nosso suporte dentro de 48h após a conclusão. Analisaremos o caso e buscaremos a melhor solução, que pode incluir reembolso parcial ou total.'
  },
  {
    category: 'clientes',
    question: 'Como sei se um profissional é confiável?',
    answer: 'Todos os profissionais passam por verificação de identidade. Você pode ver as avaliações de outros clientes, o portfólio de trabalhos anteriores, tempo de resposta e taxa de conclusão de serviços. Profissionais com selo "Verificado" passaram por verificação adicional.'
  },
  {
    category: 'clientes',
    question: 'Posso cancelar uma solicitação?',
    answer: 'Sim! Você pode cancelar uma solicitação antes de aceitar o orçamento sem nenhum custo. Após aceitar o orçamento, verifique as condições de cancelamento com o profissional ou entre em contato com nosso suporte.'
  },

  // Para Profissionais
  {
    category: 'profissionais',
    question: 'Como me cadastro como profissional?',
    answer: 'Clique em "Cadastre-se" no topo da página, escolha "Sou Profissional", preencha seus dados, adicione suas especialidades, experiência e portfólio. Após a verificação (que leva até 24h), você poderá começar a receber solicitações.'
  },
  {
    category: 'profissionais',
    question: 'Quanto custa usar a Repfy?',
    answer: 'O cadastro e manutenção do perfil são 100% gratuitos. Cobramos apenas uma pequena taxa de serviço (15%) sobre cada trabalho concluído através da plataforma. Você só paga quando recebe!'
  },
  {
    category: 'profissionais',
    question: 'Como recebo os pagamentos?',
    answer: 'Após a conclusão e aprovação do serviço pelo cliente, o valor fica disponível em até 2 dias úteis. Você pode transferir para sua conta bancária cadastrada a qualquer momento, sem taxa adicional.'
  },
  {
    category: 'profissionais',
    question: 'Posso recusar uma solicitação?',
    answer: 'Sim, você não é obrigado a aceitar todas as solicitações. Avalie cada caso e aceite apenas aqueles que você tem disponibilidade e capacidade de atender com qualidade.'
  },
  {
    category: 'profissionais',
    question: 'Como consigo mais clientes?',
    answer: 'Mantenha seu perfil completo e atualizado, responda rapidamente às solicitações, entregue serviços de qualidade para receber boas avaliações, adicione fotos ao seu portfólio e mantenha sua disponibilidade sempre atualizada.'
  },

  // Pagamentos
  {
    category: 'pagamentos',
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos cartão de crédito (Visa, Mastercard, Elo, Amex), cartão de débito e PIX. Todos os pagamentos são processados de forma segura através da nossa plataforma.'
  },
  {
    category: 'pagamentos',
    question: 'O pagamento é seguro?',
    answer: 'Sim! Utilizamos criptografia de ponta a ponta e parceiros de pagamento certificados PCI-DSS. Seus dados financeiros são protegidos e nunca são compartilhados.'
  },
  {
    category: 'pagamentos',
    question: 'Posso parcelar o pagamento?',
    answer: 'Sim, aceitamos parcelamento em até 12x no cartão de crédito para serviços acima de R$ 100. As condições de parcelamento são definidas pela operadora do seu cartão.'
  },

  // Segurança
  {
    category: 'seguranca',
    question: 'Meus dados estão seguros?',
    answer: 'Absolutamente! Levamos a segurança dos seus dados muito a sério. Utilizamos criptografia SSL, armazenamento seguro em servidores certificados e seguimos todas as normas da LGPD (Lei Geral de Proteção de Dados).'
  },
  {
    category: 'seguranca',
    question: 'Como funciona a verificação de profissionais?',
    answer: 'Verificamos a identidade através de documentos oficiais, confirmamos telefone e e-mail. Profissionais com selo "Verificado" passaram por verificação adicional de qualificações e referências.'
  },
]

export default function AjudaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('todos')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const categories = [
    { id: 'todos', label: 'Todos', icon: HelpCircle },
    { id: 'clientes', label: 'Para Clientes', icon: User },
    { id: 'profissionais', label: 'Para Profissionais', icon: FileText },
    { id: 'pagamentos', label: 'Pagamentos', icon: CreditCard },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'todos' || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

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
      <section className="bg-gradient-to-br from-navy-900 to-navy-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Central de Ajuda</h1>
            <p className="text-xl text-gray-300 mb-8">
              Como podemos ajudar você hoje?
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por palavras-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-base bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:border-mustard-500 transition-colors">
              <MessageCircle className="w-10 h-10 text-mustard-600 mx-auto mb-3" />
              <h3 className="font-semibold text-navy-900 mb-2">Chat Online</h3>
              <p className="text-sm text-gray-600 mb-3">Seg-Sex, 9h-18h</p>
              <Button variant="outline" size="sm" className="w-full">
                Iniciar Chat
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:border-mustard-500 transition-colors">
              <Mail className="w-10 h-10 text-mustard-600 mx-auto mb-3" />
              <h3 className="font-semibold text-navy-900 mb-2">E-mail</h3>
              <p className="text-sm text-gray-600 mb-3">Resposta em até 24h</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="mailto:suporte@repfy.com">Enviar E-mail</a>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 text-center hover:border-mustard-500 transition-colors">
              <Phone className="w-10 h-10 text-mustard-600 mx-auto mb-3" />
              <h3 className="font-semibold text-navy-900 mb-2">Telefone</h3>
              <p className="text-sm text-gray-600 mb-3">0800 123 4567</p>
              <Button variant="outline" size="sm" className="w-full">
                Ligar Agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">
              Perguntas Frequentes
            </h2>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-mustard-500 text-navy-900 font-medium'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Nenhuma pergunta encontrada. Tente outros termos de busca.
                  </p>
                </div>
              ) : (
                filteredFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-mustard-500 transition-colors"
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <span className="font-semibold text-navy-900 pr-4">
                        {faq.question}
                      </span>
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
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            Ainda precisa de ajuda?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nossa equipe de suporte está pronta para ajudar você
          </p>
          <Button
            size="lg"
            className="bg-mustard-500 hover:bg-mustard-600 text-navy-900 text-lg h-14 px-8"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Falar com Suporte
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

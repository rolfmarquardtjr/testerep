'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { ArrowLeft, FileText } from 'lucide-react'

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-navy-900">
              Repfy
            </Link>
            <Button asChild variant="ghost">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="w-16 h-16 bg-mustard-100 rounded-full flex items-center justify-center mb-6">
              <FileText className="w-8 h-8 text-mustard-600" />
            </div>
            <h1 className="text-4xl font-bold text-navy-900 mb-4">Termos de Uso</h1>
            <p className="text-gray-600 text-lg">
              Última atualização: 31 de dezembro de 2025
            </p>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-700 mb-4">
                Ao acessar e usar a plataforma Repfy, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
              </p>
              <p className="text-gray-700">
                A Repfy reserva-se o direito de modificar estes termos a qualquer momento. Alterações substanciais serão notificadas por e-mail ou através da plataforma. O uso continuado dos serviços após tais modificações constitui aceitação dos novos termos.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Definições</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Plataforma:</strong> Refere-se ao site, aplicativos móveis e todos os serviços oferecidos pela Repfy.</li>
                <li><strong>Usuário:</strong> Qualquer pessoa que acesse ou utilize a Plataforma.</li>
                <li><strong>Cliente:</strong> Usuário que busca e contrata serviços através da Plataforma.</li>
                <li><strong>Profissional:</strong> Usuário que oferece e presta serviços através da Plataforma.</li>
                <li><strong>Serviço:</strong> Qualquer trabalho, tarefa ou atividade oferecida por Profissionais e contratada por Clientes.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Cadastro e Conta</h2>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">3.1 Elegibilidade</h3>
              <p className="text-gray-700 mb-4">
                Para usar a Repfy, você deve ter pelo menos 18 anos de idade e capacidade legal para celebrar contratos vinculativos. Ao criar uma conta, você declara e garante que atende a esses requisitos.
              </p>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">3.2 Informações da Conta</h3>
              <p className="text-gray-700 mb-4">
                Você concorda em fornecer informações precisas, atuais e completas durante o processo de registro e em manter essas informações atualizadas. Você é responsável por:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Manter a confidencialidade de sua senha</li>
                <li>Todas as atividades que ocorram em sua conta</li>
                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado</li>
                <li>Garantir que você sai de sua conta ao final de cada sessão</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">3.3 Verificação</h3>
              <p className="text-gray-700">
                A Repfy se reserva o direito de verificar as informações fornecidas e pode solicitar documentação adicional para confirmar sua identidade, qualificações profissionais ou outros dados relevantes.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Uso da Plataforma</h2>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">4.1 Uso Permitido</h3>
              <p className="text-gray-700 mb-4">
                Você concorda em usar a Plataforma apenas para fins legais e de acordo com estes Termos. Você não deve:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Violar quaisquer leis locais, estaduais, nacionais ou internacionais</li>
                <li>Transmitir qualquer material ilegal, difamatório, ofensivo ou prejudicial</li>
                <li>Personificar outra pessoa ou entidade</li>
                <li>Interferir ou interromper a Plataforma ou os servidores conectados a ela</li>
                <li>Coletar ou armazenar dados pessoais de outros usuários sem consentimento</li>
                <li>Usar a Plataforma para spam, phishing ou outras práticas fraudulentas</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">4.2 Conteúdo do Usuário</h3>
              <p className="text-gray-700 mb-4">
                Você é responsável por todo o conteúdo que publicar na Plataforma, incluindo textos, fotos, vídeos e avaliações. Ao publicar conteúdo, você garante que:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Possui todos os direitos necessários sobre o conteúdo</li>
                <li>O conteúdo não viola direitos de terceiros</li>
                <li>O conteúdo é preciso e não é enganoso</li>
                <li>O conteúdo não contém vírus ou códigos maliciosos</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Relação Contratual</h2>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">5.1 Natureza da Plataforma</h3>
              <p className="text-gray-700 mb-4">
                A Repfy é uma plataforma de intermediação que conecta Clientes e Profissionais. A Repfy não é parte do contrato de serviço entre Cliente e Profissional e não é responsável pela execução, qualidade ou resultado dos serviços prestados.
              </p>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">5.2 Responsabilidades dos Profissionais</h3>
              <p className="text-gray-700 mb-4">
                Os Profissionais são responsáveis por:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Possuir todas as licenças, certificações e seguros necessários</li>
                <li>Cumprir todas as leis e regulamentos aplicáveis à sua profissão</li>
                <li>Fornecer serviços de qualidade profissional</li>
                <li>Cumprir prazos e compromissos acordados</li>
                <li>Manter comunicação clara e profissional com os Clientes</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">5.3 Responsabilidades dos Clientes</h3>
              <p className="text-gray-700 mb-4">
                Os Clientes são responsáveis por:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Fornecer informações precisas sobre o serviço necessário</li>
                <li>Pagar pelos serviços conforme acordado</li>
                <li>Fornecer acesso e condições adequadas para execução do serviço</li>
                <li>Avaliar os serviços recebidos de forma justa e honesta</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Pagamentos e Taxas</h2>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">6.1 Taxa de Serviço</h3>
              <p className="text-gray-700 mb-4">
                A Repfy cobra uma taxa de serviço de 15% sobre o valor de cada transação concluída através da plataforma. Esta taxa cobre os custos de operação, manutenção da plataforma, suporte ao cliente e processamento de pagamentos.
              </p>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">6.2 Processamento de Pagamentos</h3>
              <p className="text-gray-700 mb-4">
                Todos os pagamentos são processados através de provedores de pagamento terceirizados certificados. A Repfy não armazena informações completas de cartão de crédito.
              </p>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">6.3 Reembolsos e Disputas</h3>
              <p className="text-gray-700">
                Solicitações de reembolso devem ser feitas dentro de 48 horas após a conclusão do serviço. A Repfy analisará cada caso individualmente e poderá mediar disputas entre Clientes e Profissionais. A decisão final sobre reembolsos é de responsabilidade da Repfy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Propriedade Intelectual</h2>
              <p className="text-gray-700 mb-4">
                Todo o conteúdo da Plataforma, incluindo textos, gráficos, logos, ícones, imagens, clipes de áudio, downloads digitais e compilações de dados, é propriedade da Repfy ou de seus fornecedores de conteúdo e está protegido por leis de direitos autorais brasileiras e internacionais.
              </p>
              <p className="text-gray-700">
                Você concede à Repfy uma licença mundial, não exclusiva, livre de royalties para usar, reproduzir, modificar e exibir o conteúdo que você publica na Plataforma para fins de operação e promoção dos serviços.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Limitação de Responsabilidade</h2>
              <p className="text-gray-700 mb-4">
                Na máxima extensão permitida por lei, a Repfy não será responsável por:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Qualidade, segurança ou legalidade dos serviços oferecidos</li>
                <li>Veracidade das informações fornecidas pelos usuários</li>
                <li>Capacidade dos Profissionais de prestar serviços</li>
                <li>Capacidade dos Clientes de pagar pelos serviços</li>
                <li>Danos diretos, indiretos, incidentais ou consequenciais</li>
                <li>Perda de lucros, receita, dados ou uso</li>
              </ul>
              <p className="text-gray-700">
                Nossa responsabilidade total não excederá o valor da taxa de serviço paga na transação relacionada.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Rescisão</h2>
              <p className="text-gray-700 mb-4">
                Você pode encerrar sua conta a qualquer momento através das configurações da plataforma. A Repfy pode suspender ou encerrar sua conta imediatamente, sem aviso prévio, se:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Você violar estes Termos de Uso</li>
                <li>Você fornecer informações falsas ou enganosas</li>
                <li>Você se envolver em atividades fraudulentas ou ilegais</li>
                <li>Você receber múltiplas avaliações negativas</li>
                <li>Houver suspeita de uso inadequado da plataforma</li>
              </ul>
              <p className="text-gray-700">
                Após o encerramento, você permanece responsável por todas as obrigações contraídas antes do término.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">10. Lei Aplicável e Jurisdição</h2>
              <p className="text-gray-700 mb-4">
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa relacionada a estes termos será resolvida exclusivamente pelos tribunais brasileiros.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">11. Disposições Gerais</h2>
              <h3 className="text-xl font-semibold text-navy-900 mb-3">11.1 Acordo Integral</h3>
              <p className="text-gray-700 mb-4">
                Estes Termos constituem o acordo integral entre você e a Repfy e substituem todos os acordos anteriores.
              </p>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">11.2 Divisibilidade</h3>
              <p className="text-gray-700 mb-4">
                Se qualquer disposição destes Termos for considerada inválida, as demais disposições permanecerão em pleno vigor.
              </p>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">11.3 Renúncia</h3>
              <p className="text-gray-700">
                A falha da Repfy em exercer ou fazer valer qualquer direito ou disposição destes Termos não constituirá uma renúncia a tal direito ou disposição.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">12. Contato</h2>
              <p className="text-gray-700 mb-4">
                Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>E-mail:</strong> legal@repfy.com</li>
                <li><strong>Telefone:</strong> 0800 123 4567</li>
                <li><strong>Endereço:</strong> Av. Paulista, 1000 - São Paulo, SP - CEP 01310-100</li>
              </ul>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Button asChild variant="outline">
                <Link href="/privacidade">Ver Política de Privacidade</Link>
              </Button>
              <Button asChild className="bg-mustard-500 hover:bg-mustard-600 text-navy-900">
                <Link href="/register">Criar Conta na Repfy</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

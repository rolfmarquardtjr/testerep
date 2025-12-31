'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertCircle } from 'lucide-react'

export default function PrivacidadePage() {
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
              <Shield className="w-8 h-8 text-mustard-600" />
            </div>
            <h1 className="text-4xl font-bold text-navy-900 mb-4">Política de Privacidade</h1>
            <p className="text-gray-600 text-lg">
              Última atualização: 31 de dezembro de 2025
            </p>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-900 text-sm">
                <AlertCircle className="inline w-4 h-4 mr-2" />
                Esta Política de Privacidade está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Introdução</h2>
              <p className="text-gray-700 mb-4">
                A Repfy ("nós", "nosso" ou "plataforma") respeita sua privacidade e está comprometida em proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações quando você usa nossa plataforma.
              </p>
              <p className="text-gray-700">
                Ao usar a Repfy, você concorda com a coleta e uso de informações de acordo com esta política. Se você não concordar com qualquer parte desta política, não use nossos serviços.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                <Database className="w-6 h-6 text-mustard-600 mr-3" />
                2. Dados que Coletamos
              </h2>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">2.1 Dados Fornecidos por Você</h3>
              <p className="text-gray-700 mb-4">
                Quando você cria uma conta e usa nossos serviços, coletamos:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Informações de Cadastro:</strong> nome completo, e-mail, telefone, CPF, data de nascimento</li>
                <li><strong>Informações de Perfil:</strong> foto, descrição profissional, especialidades, portfólio, avaliações</li>
                <li><strong>Informações de Localização:</strong> endereço, CEP, cidade, estado</li>
                <li><strong>Informações Financeiras:</strong> dados bancários para recebimento de pagamentos (apenas para profissionais)</li>
                <li><strong>Documentos:</strong> RG, comprovante de residência, certificações profissionais (quando aplicável)</li>
                <li><strong>Comunicações:</strong> mensagens trocadas através da plataforma, avaliações e comentários</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">2.2 Dados Coletados Automaticamente</h3>
              <p className="text-gray-700 mb-4">
                Quando você acessa nossa plataforma, coletamos automaticamente:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Dados de Uso:</strong> páginas visitadas, tempo de permanência, cliques, pesquisas realizadas</li>
                <li><strong>Dados Técnicos:</strong> endereço IP, tipo de navegador, sistema operacional, dispositivo utilizado</li>
                <li><strong>Cookies:</strong> identificadores únicos armazenados em seu dispositivo (veja seção de Cookies)</li>
                <li><strong>Geolocalização:</strong> localização aproximada baseada no IP ou localização precisa (com sua permissão)</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">2.3 Dados de Terceiros</h3>
              <p className="text-gray-700 mb-4">
                Podemos receber informações sobre você de:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provedores de login social (Google, Facebook) quando você escolhe fazer login através deles</li>
                <li>Serviços de verificação de identidade e antecedentes</li>
                <li>Processadores de pagamento</li>
                <li>Fontes públicas disponíveis legalmente</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 text-mustard-600 mr-3" />
                3. Como Usamos Seus Dados
              </h2>
              <p className="text-gray-700 mb-4">
                Utilizamos seus dados pessoais para as seguintes finalidades:
              </p>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">3.1 Prestação de Serviços</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Criar e gerenciar sua conta</li>
                <li>Conectar clientes e profissionais</li>
                <li>Processar transações e pagamentos</li>
                <li>Fornecer suporte ao cliente</li>
                <li>Enviar notificações sobre solicitações, mensagens e atualizações de serviços</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">3.2 Segurança e Prevenção de Fraudes</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Verificar identidade e qualificações</li>
                <li>Detectar e prevenir fraudes, spam e atividades ilegais</li>
                <li>Proteger a segurança da plataforma e dos usuários</li>
                <li>Resolver disputas e fazer cumprir nossos termos</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">3.3 Melhorias e Personalização</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Personalizar sua experiência na plataforma</li>
                <li>Recomendar profissionais ou serviços relevantes</li>
                <li>Analisar tendências e padrões de uso</li>
                <li>Desenvolver novos recursos e melhorar os existentes</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">3.4 Marketing e Comunicação</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Enviar newsletters e ofertas promocionais (você pode cancelar a qualquer momento)</li>
                <li>Comunicar sobre alterações em nossos serviços ou políticas</li>
                <li>Realizar pesquisas de satisfação</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Base Legal para Processamento</h2>
              <p className="text-gray-700 mb-4">
                Processamos seus dados pessoais com base nas seguintes bases legais previstas na LGPD:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Consentimento:</strong> quando você nos fornece permissão explícita</li>
                <li><strong>Execução de Contrato:</strong> para fornecer os serviços que você solicitou</li>
                <li><strong>Obrigações Legais:</strong> para cumprir leis e regulamentações aplicáveis</li>
                <li><strong>Interesses Legítimos:</strong> para melhorar nossos serviços, prevenir fraudes e garantir segurança</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Compartilhamento de Dados</h2>
              <p className="text-gray-700 mb-4">
                Não vendemos seus dados pessoais. Compartilhamos suas informações apenas nas seguintes situações:
              </p>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">5.1 Com Outros Usuários</h3>
              <p className="text-gray-700 mb-4">
                Quando você usa a plataforma, certas informações são visíveis para outros usuários:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Profissionais podem ver: nome, localização aproximada, histórico de avaliações (para clientes)</li>
                <li>Clientes podem ver: perfil completo, portfólio, avaliações, localização (para profissionais)</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">5.2 Com Prestadores de Serviços</h3>
              <p className="text-gray-700 mb-4">
                Compartilhamos dados com empresas terceirizadas que nos ajudam a operar a plataforma:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Processadores de pagamento (para transações financeiras)</li>
                <li>Serviços de hospedagem e armazenamento de dados</li>
                <li>Ferramentas de análise e monitoramento</li>
                <li>Provedores de email e notificações</li>
                <li>Serviços de verificação de identidade</li>
              </ul>
              <p className="text-gray-700 mb-6">
                Todos os prestadores de serviços são obrigados contratualmente a proteger seus dados e usá-los apenas para os fins especificados.
              </p>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">5.3 Por Exigência Legal</h3>
              <p className="text-gray-700 mb-4">
                Podemos divulgar suas informações quando obrigados por lei ou para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>Cumprir ordens judiciais ou requisições legais</li>
                <li>Proteger nossos direitos, propriedade ou segurança</li>
                <li>Prevenir ou investigar fraudes ou violações de nossos termos</li>
                <li>Proteger a segurança de nossos usuários e do público</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">5.4 Transferências Empresariais</h3>
              <p className="text-gray-700">
                Em caso de fusão, aquisição ou venda de ativos, seus dados pessoais podem ser transferidos. Notificaremos você sobre tais mudanças.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 text-mustard-600 mr-3" />
                6. Segurança dos Dados
              </h2>
              <p className="text-gray-700 mb-4">
                Levamos a segurança de seus dados muito a sério e implementamos medidas técnicas e organizacionais apropriadas:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Criptografia:</strong> Usamos SSL/TLS para proteger dados em trânsito</li>
                <li><strong>Armazenamento Seguro:</strong> Dados em repouso são armazenados em servidores seguros com criptografia</li>
                <li><strong>Controle de Acesso:</strong> Acesso restrito apenas a funcionários autorizados</li>
                <li><strong>Autenticação:</strong> Senhas são armazenadas com hash seguro usando bcrypt</li>
                <li><strong>Monitoramento:</strong> Sistemas de detecção de intrusão e monitoramento contínuo</li>
                <li><strong>Atualizações:</strong> Manutenção regular e patches de segurança</li>
                <li><strong>Backup:</strong> Backups regulares para prevenir perda de dados</li>
              </ul>
              <p className="text-gray-700">
                Apesar de nossos esforços, nenhum sistema é 100% seguro. Você também tem responsabilidade em manter suas credenciais de acesso seguras.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Retenção de Dados</h2>
              <p className="text-gray-700 mb-4">
                Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Dados de Conta:</strong> Enquanto sua conta estiver ativa</li>
                <li><strong>Dados Transacionais:</strong> Mínimo de 5 anos (conforme legislação fiscal e contábil)</li>
                <li><strong>Dados de Marketing:</strong> Até você cancelar o recebimento de comunicações</li>
                <li><strong>Logs de Acesso:</strong> 6 meses (conforme Marco Civil da Internet)</li>
              </ul>
              <p className="text-gray-700">
                Após os períodos de retenção, seus dados são deletados ou anonimizados de forma segura.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4 flex items-center">
                <UserCheck className="w-6 h-6 text-mustard-600 mr-3" />
                8. Seus Direitos (LGPD)
              </h2>
              <p className="text-gray-700 mb-4">
                De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                <li><strong>Confirmação e Acesso:</strong> Confirmar se tratamos seus dados e acessá-los</li>
                <li><strong>Correção:</strong> Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li><strong>Anonimização ou Bloqueio:</strong> Solicitar anonimização ou bloqueio de dados desnecessários</li>
                <li><strong>Eliminação:</strong> Excluir dados tratados com seu consentimento (exceto quando houver obrigação legal)</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado e legível</li>
                <li><strong>Informação sobre Compartilhamento:</strong> Saber com quem compartilhamos seus dados</li>
                <li><strong>Revogação de Consentimento:</strong> Retirar seu consentimento a qualquer momento</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento de dados em certas situações</li>
                <li><strong>Revisão de Decisões Automatizadas:</strong> Solicitar revisão de decisões tomadas unicamente por sistemas automatizados</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Para exercer qualquer desses direitos, entre em contato conosco através de:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>E-mail:</strong> privacidade@repfy.com</li>
                <li><strong>Formulário:</strong> Disponível em Configurações {'>'} Privacidade</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Cookies e Tecnologias Similares</h2>
              <p className="text-gray-700 mb-4">
                Usamos cookies e tecnologias similares para melhorar sua experiência:
              </p>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">9.1 Tipos de Cookies</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico da plataforma</li>
                <li><strong>Cookies de Desempenho:</strong> Coletam informações sobre como você usa o site</li>
                <li><strong>Cookies de Funcionalidade:</strong> Lembram suas preferências e configurações</li>
                <li><strong>Cookies de Marketing:</strong> Rastreiam sua atividade para exibir anúncios relevantes</li>
              </ul>

              <h3 className="text-xl font-semibold text-navy-900 mb-3">9.2 Gerenciamento de Cookies</h3>
              <p className="text-gray-700">
                Você pode controlar e gerenciar cookies através das configurações do seu navegador. Note que desabilitar alguns cookies pode afetar a funcionalidade da plataforma.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">10. Privacidade de Menores</h2>
              <p className="text-gray-700">
                Nossa plataforma não é destinada a menores de 18 anos. Não coletamos intencionalmente dados de menores. Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas para deletá-los imediatamente. Se você acredita que temos dados de um menor, entre em contato conosco.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">11. Transferência Internacional de Dados</h2>
              <p className="text-gray-700">
                Seus dados são armazenados em servidores localizados no Brasil. Em alguns casos, podemos usar serviços de terceiros que armazenam dados fora do país. Quando isso ocorrer, garantimos que medidas de proteção adequadas estejam em vigor, como cláusulas contratuais padrão e certificações de privacidade.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">12. Alterações nesta Política</h2>
              <p className="text-gray-700 mb-4">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações significativas através de:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>E-mail para o endereço cadastrado</li>
                <li>Notificação destacada na plataforma</li>
                <li>Atualização da data no topo desta página</li>
              </ul>
              <p className="text-gray-700">
                Recomendamos que você revise esta política periodicamente. O uso continuado da plataforma após alterações constitui aceitação da nova política.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">13. Encarregado de Dados (DPO)</h2>
              <p className="text-gray-700 mb-4">
                Designamos um Encarregado de Proteção de Dados (Data Protection Officer - DPO) para atuar como canal de comunicação entre você, a Repfy e a Autoridade Nacional de Proteção de Dados (ANPD).
              </p>
              <ul className="list-none text-gray-700 space-y-2 mb-4">
                <li><strong>Nome:</strong> Dr. Carlos Silva</li>
                <li><strong>E-mail:</strong> dpo@repfy.com</li>
                <li><strong>Telefone:</strong> 0800 123 4567</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-navy-900 mb-4">14. Contato</h2>
              <p className="text-gray-700 mb-4">
                Para dúvidas, solicitações ou reclamações relacionadas à privacidade:
              </p>
              <ul className="list-none text-gray-700 space-y-2">
                <li><strong>E-mail:</strong> privacidade@repfy.com</li>
                <li><strong>Telefone:</strong> 0800 123 4567</li>
                <li><strong>Endereço:</strong> Av. Paulista, 1000 - São Paulo, SP - CEP 01310-100</li>
                <li><strong>Horário:</strong> Segunda a Sexta, 9h às 18h</li>
              </ul>
            </section>
          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Button asChild variant="outline">
                <Link href="/termos">Ver Termos de Uso</Link>
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

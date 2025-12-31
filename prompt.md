# REPFY - O Melhor Marketplace de Servicos do Brasil

## Objetivo

Criar uma plataforma COMPLETA e FUNCIONAL que supere GetNinjas e Fiverr. Cada feature deve funcionar de verdade. Interface impecavel no mobile e desktop. Experiencia do usuario perfeita.

---

## O Que Ja Existe

### Backend (apps/api)
- Express + Prisma + PostgreSQL
- Autenticacao JWT com refresh tokens
- Rotas: auth, users, professionals, categories, service-requests, reviews, notifications
- Schema completo com todos os models
- Seed com categorias e usuarios de teste
- Rate limiting e seguranca basica

### Frontend (apps/web)
- Next.js 14 com App Router
- Tailwind CSS + shadcn/ui
- Landing page completa
- Login e Register funcionais
- Dashboard Cliente (lista pedidos)
- Dashboard Profissional (stats, oportunidades)
- Formulario de solicitacao multi-step
- Componentes: Button, Input, Card, Label

### Design System
```
CORES PRINCIPAIS (usar em todo o app):
- navy-500: #1A2B4A (titulos, textos principais)
- navy-600: #152338 (hover, secoes escuras)
- navy-900: #070D15 (footer, backgrounds escuros)
- mustard-500: #D4A017 (botoes primarios, destaques)
- mustard-600: #B8860B (hover de botoes)

APLICACAO:
- Titulos: text-navy-600
- Botao primario: bg-mustard-500 hover:bg-mustard-600 text-navy-900
- Botao secundario: border-navy-300 text-navy-600
- Links: text-mustard-600
- Icones destaque: bg-mustard-500 text-navy-900
- Secoes escuras: bg-navy-600 ou bg-navy-900
```

---

## O Que Falta Implementar

### 1. MAPA INTERATIVO (Leaflet)
- [ ] Componente MapView reutilizavel
- [ ] Ver profissionais no mapa por categoria
- [ ] Ver pedidos disponiveis no mapa (para profissionais)
- [ ] Definir area de atuacao do profissional (circulo no mapa)
- [ ] Geolocalizacao automatica do usuario
- [ ] Autocomplete de endereco
- [ ] Marcadores customizados com cores Repfy
- [ ] Popup com info resumida ao clicar

### 2. SISTEMA DE SERVICOS

#### Servicos Padrao (Preco Fixo)
- [ ] Catalogo de servicos com preco tabelado
- [ ] Ex: Instalacao de TV R$69, Montagem movel simples R$79
- [ ] Cliente escolhe, paga, profissional executa
- [ ] Sem negociacao - rapido e direto

#### Servicos Personalizados (Orcamento)
- [ ] Cliente descreve detalhadamente o que precisa
- [ ] Upload de fotos do local/problema
- [ ] Tipo de imovel (casa/apto/comercial)
- [ ] Tamanho/metragem quando aplicavel
- [ ] Profissionais enviam orcamentos personalizados
- [ ] Cliente compara e escolhe

#### Sistema de BID (Leilao)
- [ ] Cliente define orcamento maximo
- [ ] Profissionais dao lances competitivos
- [ ] Timer de 24-48h para lances
- [ ] Ranking por preco e avaliacao
- [ ] Cliente escolhe melhor custo-beneficio

### 3. DASHBOARD CLIENTE COMPLETO

#### Home (/dashboard/cliente)
- [ ] Cards de resumo: pedidos ativos, orcamentos pendentes, mensagens
- [ ] Lista de pedidos recentes
- [ ] Notificacoes

#### Meus Pedidos (/dashboard/cliente/pedidos)
- [ ] Lista com filtros (status, data, categoria)
- [ ] Card: titulo, status badge, categoria, data, num orcamentos
- [ ] Click abre detalhes

#### Detalhes do Pedido (/dashboard/cliente/pedidos/[id])
- [ ] Todas as informacoes do pedido
- [ ] Fotos enviadas
- [ ] Timeline de status
- [ ] Lista de orcamentos recebidos
- [ ] Comparacao lado a lado dos orcamentos
- [ ] Aceitar/recusar orcamento
- [ ] Chat com profissional (apos aceitar)
- [ ] Avaliar apos conclusao

#### Mensagens (/dashboard/cliente/mensagens)
- [ ] Lista de conversas
- [ ] Preview ultima mensagem
- [ ] Badge de nao lidas
- [ ] Tela de chat estilo WhatsApp

#### Perfil (/dashboard/cliente/perfil)
- [ ] Editar dados pessoais
- [ ] Foto de perfil
- [ ] Enderecos salvos
- [ ] Alterar senha
- [ ] Historico de servicos

### 4. DASHBOARD PROFISSIONAL COMPLETO

#### Home (/dashboard/profissional)
- [ ] Stats: avaliacao, trabalhos concluidos, ganhos do mes
- [ ] Grafico de ganhos (ultimos 6 meses)
- [ ] Pedidos recentes na area
- [ ] Alertas de perfil incompleto

#### Oportunidades (/dashboard/profissional/oportunidades)
- [ ] Toggle: Lista / Mapa
- [ ] Filtros: categoria, distancia, urgencia, valor
- [ ] Card: titulo, descricao, local, fotos, valor estimado
- [ ] MAPA com marcadores dos pedidos
- [ ] Click abre detalhes

#### Detalhes da Oportunidade
- [ ] Informacoes completas do pedido
- [ ] Fotos do cliente
- [ ] Distancia ate o local
- [ ] Formulario de orcamento:
  - Valor proposto
  - Descricao do que esta incluso
  - Materiais inclusos ou nao
  - Tempo estimado
  - Validade da proposta
- [ ] Modo BID: campo de lance

#### Meus Orcamentos (/dashboard/profissional/orcamentos)
- [ ] Lista de orcamentos enviados
- [ ] Status: Pendente, Aceito, Recusado, Expirado
- [ ] Filtros por status

#### Agenda (/dashboard/profissional/agenda)
- [ ] Calendario visual
- [ ] Servicos agendados
- [ ] Disponibilidade configuravel
- [ ] Vista dia/semana/mes

#### Portfolio (/dashboard/profissional/portfolio)
- [ ] Grid de fotos de trabalhos
- [ ] Upload com drag & drop
- [ ] Titulo e descricao por item
- [ ] Reordenar arrastando

#### Financeiro (/dashboard/profissional/financeiro)
- [ ] Ganhos totais
- [ ] Ganhos por periodo
- [ ] Grafico de evolucao
- [ ] Lista de pagamentos recebidos
- [ ] Extrato detalhado

#### Perfil (/dashboard/profissional/perfil)
- [ ] Dados pessoais
- [ ] Foto de perfil
- [ ] Bio/descricao
- [ ] Categorias que atende (multi-select)
- [ ] Area de atuacao com MAPA (raio em km)
- [ ] Precos (por hora ou por servico)
- [ ] Documentos para verificacao

### 5. PERFIL PUBLICO DO PROFISSIONAL (/profissional/[id])
- [ ] Header com foto, nome, badge verificado
- [ ] Bio
- [ ] Stats: avaliacao, num reviews, trabalhos concluidos
- [ ] Categorias que atende
- [ ] Portfolio (galeria de fotos)
- [ ] Avaliacoes de clientes
- [ ] MAPA com area de atuacao
- [ ] Botao "Solicitar Orcamento"

### 6. BUSCA DE PROFISSIONAIS (/buscar/[categoria])
- [ ] Toggle: Lista / Mapa
- [ ] Filtros: avaliacao, preco, distancia, verificado
- [ ] Ordenacao: relevancia, preco, avaliacao, distancia
- [ ] Card de profissional: foto, nome, avaliacao, preco, distancia
- [ ] MAPA com marcadores dos profissionais
- [ ] Paginacao ou infinite scroll

### 7. SISTEMA DE CHAT
- [ ] Lista de conversas
- [ ] Tela de chat:
  - Mensagens em bolhas (eu/outro)
  - Timestamp
  - Status: enviado, lido
  - Input fixo no bottom
  - Botao enviar
  - Envio de imagens
- [ ] Polling a cada 5 segundos
- [ ] Notificacao de nova mensagem
- [ ] Marcar como lida

### 8. SISTEMA DE AVALIACOES
- [ ] Formulario apos servico concluido:
  - Rating 1-5 estrelas (clicavel)
  - Comentario
  - Fotos do resultado (opcional)
- [ ] Exibicao no perfil:
  - Media geral
  - Total de avaliacoes
  - Distribuicao (5 estrelas: X%, 4 estrelas: Y%, etc)
  - Lista de comentarios
  - Filtrar por nota

### 9. SISTEMA DE NOTIFICACOES
- [ ] Icone de sino no header
- [ ] Badge com contador
- [ ] Dropdown com lista
- [ ] Tipos:
  - Novo orcamento recebido
  - Orcamento aceito
  - Nova mensagem
  - Servico concluido
  - Nova avaliacao
- [ ] Marcar como lida
- [ ] Marcar todas como lidas
- [ ] Pagina de todas notificacoes

### 10. UPLOAD DE IMAGENS
- [ ] Componente ImageUpload reutilizavel
- [ ] Drag & drop
- [ ] Preview antes de enviar
- [ ] Remover imagem
- [ ] Limite de tamanho (5MB)
- [ ] Multiplas imagens
- [ ] Compressao automatica
- [ ] Salvar em /public/uploads ou S3

### 11. PAGINAS INSTITUCIONAIS
- [ ] /como-funciona - Guia passo a passo
- [ ] /categorias - Todas as categorias com icones
- [ ] /seja-profissional - LP de captacao
- [ ] /sobre - Historia da Repfy
- [ ] /termos - Termos de uso
- [ ] /privacidade - Politica de privacidade
- [ ] /contato - Formulario de contato
- [ ] /ajuda - FAQ expandido

### 12. MELHORIAS NA LANDING PAGE
- [ ] Busca com autocomplete de categorias
- [ ] Animacao nos numeros/stats
- [ ] Carrossel de depoimentos
- [ ] Secao de categorias clicavel

### 13. RESPONSIVIDADE MOBILE-FIRST
Cada pagina deve funcionar perfeitamente em:
- [ ] Mobile (375px)
- [ ] Mobile Large (414px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px+)

Checklist por componente:
- [ ] Header com menu hamburger no mobile
- [ ] Sidebar vira bottom nav no mobile
- [ ] Cards em coluna unica no mobile
- [ ] Formularios full width no mobile
- [ ] Modais full screen no mobile
- [ ] Touch targets minimo 44px
- [ ] Sem scroll horizontal

---

## Estrutura de Pastas Final

```
apps/web/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   └── recuperar-senha/
│   ├── (main)/
│   │   ├── page.tsx (landing)
│   │   ├── como-funciona/
│   │   ├── categorias/
│   │   ├── buscar/[categoria]/
│   │   ├── profissional/[id]/
│   │   ├── solicitar-servico/
│   │   ├── seja-profissional/
│   │   ├── sobre/
│   │   ├── termos/
│   │   ├── privacidade/
│   │   ├── contato/
│   │   └── ajuda/
│   ├── dashboard/
│   │   ├── cliente/
│   │   │   ├── page.tsx
│   │   │   ├── pedidos/
│   │   │   ├── mensagens/
│   │   │   └── perfil/
│   │   └── profissional/
│   │       ├── page.tsx
│   │       ├── oportunidades/
│   │       ├── orcamentos/
│   │       ├── agenda/
│   │       ├── portfolio/
│   │       ├── financeiro/
│   │       ├── mensagens/
│   │       └── perfil/
│   └── api/ (API routes se necessario)
├── components/
│   ├── ui/ (shadcn)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MobileNav.tsx
│   │   └── DashboardLayout.tsx
│   ├── maps/
│   │   ├── MapView.tsx
│   │   ├── MapMarker.tsx
│   │   └── AddressAutocomplete.tsx
│   ├── forms/
│   │   ├── ServiceRequestForm.tsx
│   │   ├── QuoteForm.tsx
│   │   └── ReviewForm.tsx
│   ├── cards/
│   │   ├── ProfessionalCard.tsx
│   │   ├── RequestCard.tsx
│   │   ├── QuoteCard.tsx
│   │   └── ReviewCard.tsx
│   └── shared/
│       ├── ImageUpload.tsx
│       ├── StarRating.tsx
│       ├── StatusBadge.tsx
│       ├── EmptyState.tsx
│       ├── LoadingSpinner.tsx
│       └── NotificationBell.tsx
└── lib/
    ├── api.ts (fetch wrapper)
    ├── auth.ts
    └── utils.ts
```

---

## APIs Necessarias

### Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh
- POST /api/auth/forgot-password
- POST /api/auth/reset-password

### Users
- GET /api/users/me
- PUT /api/users/me
- POST /api/users/me/avatar

### Professionals
- GET /api/professionals (lista com filtros)
- GET /api/professionals/:id
- PUT /api/professionals/me
- POST /api/professionals/me/portfolio
- DELETE /api/professionals/me/portfolio/:id
- PUT /api/professionals/me/availability
- PUT /api/professionals/me/service-area

### Categories
- GET /api/categories
- GET /api/categories/:slug

### Service Requests
- POST /api/service-requests
- GET /api/service-requests (meus pedidos)
- GET /api/service-requests/:id
- PUT /api/service-requests/:id/status
- GET /api/service-requests/available (para profissionais)
- POST /api/service-requests/:id/attachments

### Quotes
- POST /api/quotes
- GET /api/quotes/request/:requestId
- PUT /api/quotes/:id/accept
- PUT /api/quotes/:id/reject

### Messages
- GET /api/conversations
- GET /api/conversations/:id/messages
- POST /api/conversations/:id/messages
- PUT /api/conversations/:id/read

### Reviews
- POST /api/reviews
- GET /api/reviews/professional/:id

### Notifications
- GET /api/notifications
- PUT /api/notifications/:id/read
- PUT /api/notifications/read-all

### Upload
- POST /api/upload

---

## Ordem de Implementacao

### Fase 1: Infraestrutura
1. Layout do Dashboard (sidebar, header, mobile nav)
2. Componente de Loading e Empty states
3. Sistema de notificacoes (frontend)
4. Componente ImageUpload

### Fase 2: Core Cliente
5. Dashboard cliente home completo
6. Lista de pedidos com filtros
7. Detalhes do pedido
8. Visualizacao de orcamentos
9. Aceitar/recusar orcamento

### Fase 3: Core Profissional
10. Dashboard profissional home completo
11. Lista de oportunidades
12. Detalhes da oportunidade
13. Formulario de orcamento/bid
14. Lista de orcamentos enviados

### Fase 4: Mapa
15. Componente MapView com Leaflet
16. Mapa de oportunidades (profissional)
17. Mapa de profissionais (busca)
18. Area de atuacao do profissional
19. Autocomplete de endereco

### Fase 5: Comunicacao
20. Sistema de chat completo
21. Lista de conversas
22. Notificacoes funcionando

### Fase 6: Perfis
23. Perfil publico do profissional
24. Portfolio do profissional
25. Busca de profissionais
26. Filtros e ordenacao

### Fase 7: Finalizacao
27. Sistema de avaliacoes
28. Dashboard financeiro
29. Paginas institucionais
30. Polish de responsividade
31. Testes de fluxos

---

## Regras

1. **Mobile-first**: Sempre comecar pelo mobile
2. **Funcional**: Cada feature deve funcionar de verdade, nao apenas UI
3. **Cores**: Usar navy e mustard conforme design system
4. **Loading states**: Toda acao deve ter feedback visual
5. **Erros**: Mensagens claras quando algo der errado
6. **TypeScript**: Tipagem correta em todo lugar
7. **Componentes**: Reutilizar ao maximo

---

## Completion Promise

Quando TODAS as funcionalidades estiverem implementadas e funcionando:
- Cliente consegue: cadastrar, logar, solicitar servico, receber orcamentos, aceitar, conversar, avaliar
- Profissional consegue: cadastrar, ver oportunidades no mapa, enviar orcamentos/bids, conversar, ver avaliacoes
- Mapa funcionando em todas as telas necessarias
- Chat funcionando
- Notificacoes funcionando
- 100% responsivo mobile e desktop
- Sem erros no console

```
<promise>REPFY_COMPLETE</promise>
```

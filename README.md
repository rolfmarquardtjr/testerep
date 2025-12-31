# REPFY - Marketplace de Serviços

Uma plataforma moderna que conecta clientes a profissionais qualificados para diversos tipos de serviços.

## 📋 Sobre o Projeto

REPFY é uma aplicação full-stack construída com as mais modernas tecnologias para criar um marketplace eficiente e escalável de serviços profissionais. A plataforma permite que clientes solicitem serviços e recebam orçamentos de profissionais verificados.

### 🎯 Funcionalidades Principais

#### Para Clientes:
- ✅ Registro e autenticação segura
- ✅ Criação de solicitações de serviço
- ✅ Recebimento e comparação de orçamentos
- ✅ Sistema de avaliações e reviews
- ✅ Chat em tempo real com profissionais
- ✅ Histórico completo de serviços
- ✅ Notificações em tempo real

#### Para Profissionais:
- ✅ Perfil profissional completo
- ✅ Portfólio de trabalhos
- ✅ Envio de orçamentos personalizados
- ✅ Sistema de avaliações
- ✅ Gestão de serviços oferecidos
- ✅ Dashboard com estatísticas
- ✅ Verificação de documentos

## 🏗️ Arquitetura

### Monorepo Structure
```
repfy/
├── apps/
│   ├── api/          # Backend (Node.js + Express + Prisma)
│   └── web/          # Frontend (Next.js 14 + React)
├── packages/
│   ├── ui/           # Componentes compartilhados (shadcn/ui)
│   ├── types/        # TypeScript types compartilhados
│   └── utils/        # Utilitários compartilhados
└── docker-compose.yml
```

### Tech Stack

#### Backend
- **Node.js** + **Express** - Runtime e framework web
- **TypeScript** - Type safety
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database principal
- **Redis** - Cache e sessions
- **JWT** - Autenticação
- **Zod** - Validação de schemas
- **Socket.io** - Real-time communication
- **Jest** - Unit testing

#### Frontend
- **Next.js 14** - React framework com App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Radix UI** - Headless components
- **TanStack Query** - Data fetching
- **Zustand** - State management
- **Playwright** - E2E testing

#### DevOps
- **Turborepo** - Monorepo build system
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Docker** >= 20.10.0
- **Docker Compose** >= 2.0.0

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd repfy
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie os arquivos `.env` nas pastas necessárias:

**apps/api/.env**
```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/repfy"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# App
NODE_ENV="development"
PORT=3001
```

**apps/web/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. **Inicie os serviços Docker (PostgreSQL e Redis)**
```bash
docker-compose up -d
```

5. **Configure o banco de dados**
```bash
cd apps/api
npx prisma migrate dev
npx prisma generate
npm run prisma:seed
cd ../..
```

6. **Inicie os servidores de desenvolvimento**

Em um terminal:
```bash
cd apps/api
npm run dev
```

Em outro terminal:
```bash
cd apps/web
npm run dev
```

7. **Acesse a aplicação**
- Frontend: http://localhost:3000
- API: http://localhost:3001/api

### Credenciais de Teste

Após rodar o seed, você terá as seguintes credenciais:

**Admin:**
- Email: `admin@repfy.com`
- Senha: `admin123`

**Cliente:**
- Email: `cliente@example.com`
- Senha: `cliente123`

**Profissional:**
- Email: `profissional@example.com`
- Senha: `profissional123`

## 📦 Scripts Disponíveis

### Root (Turborepo)
```bash
npm run dev          # Inicia todos os apps em modo dev
npm run build        # Build de todos os apps
npm run lint         # Lint em todos os apps
npm run clean        # Limpa build artifacts
```

### Backend (apps/api)
```bash
npm run dev              # Inicia servidor em modo dev
npm run build            # Build para produção
npm run start            # Inicia servidor de produção
npm test                 # Roda testes unitários
npm run test:coverage    # Roda testes com coverage
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Roda migrations
npm run prisma:studio    # Abre Prisma Studio
npm run prisma:seed      # Popula banco com dados de teste
```

### Frontend (apps/web)
```bash
npm run dev           # Inicia Next.js em modo dev
npm run build         # Build para produção
npm run start         # Inicia servidor de produção
npm run lint          # Roda ESLint
npm run test:e2e      # Roda testes E2E com Playwright
npm run test:e2e:ui   # Roda testes E2E com UI
```

## 🧪 Testes

### Testes Unitários (Backend)

```bash
cd apps/api
npm test                    # Roda todos os testes
npm run test:watch          # Roda testes em watch mode
npm run test:coverage       # Gera relatório de cobertura
```

Cobertura mínima configurada: **80%**

### Testes E2E (Frontend)

```bash
cd apps/web
npm run test:e2e            # Roda testes E2E headless
npm run test:e2e:ui         # Roda testes E2E com UI
npm run test:e2e:headed     # Roda testes E2E com browser visível
```

## 📚 Documentação

### API Documentation
Documentação completa da API disponível em: [apps/api/API_DOCUMENTATION.md](./apps/api/API_DOCUMENTATION.md)

### Database Schema
O schema do banco de dados está documentado em: [apps/api/prisma/schema.prisma](./apps/api/prisma/schema.prisma)

### Principais Models:
- **User** - Usuários do sistema (Client/Professional/Admin)
- **Client** - Perfil de clientes
- **Professional** - Perfil de profissionais
- **ServiceCategory** - Categorias de serviços
- **ServiceRequest** - Solicitações de serviço
- **Quote** - Orçamentos enviados pelos profissionais
- **Review** - Avaliações de serviços
- **Notification** - Notificações do sistema
- **Message** - Mensagens do chat
- **Payment** - Pagamentos

## 🔐 Segurança

- ✅ Autenticação JWT com refresh tokens
- ✅ Senha hasheada com bcrypt
- ✅ Validação de entrada com Zod
- ✅ Rate limiting
- ✅ Helmet.js para headers de segurança
- ✅ CORS configurado
- ✅ Proteção contra SQL injection (Prisma)
- ✅ XSS protection

## 🎨 UI/UX

### Design System
- Utiliza **shadcn/ui** para componentes base
- **Radix UI** para componentes headless acessíveis
- **Tailwind CSS** para styling consistente
- **Lucide React** para ícones

### Páginas Principais:
- 🏠 Landing Page - Página inicial com apresentação e busca
- 🔐 Login/Register - Autenticação de usuários
- 📊 Dashboard Cliente - Painel do cliente
- 💼 Dashboard Profissional - Painel do profissional
- 📝 Solicitação de Serviço - Criação de solicitações
- 💰 Gerenciamento de Orçamentos - Visualização e gestão de quotes
- ⭐ Sistema de Avaliações - Reviews e ratings
- 💬 Chat em Tempo Real - Comunicação entre usuários

## 📈 Performance

### Frontend
- ⚡ Next.js 14 com App Router
- ⚡ Server Components para melhor performance
- ⚡ Image optimization automática
- ⚡ Code splitting automático
- ⚡ Caching inteligente

### Backend
- ⚡ Redis para caching
- ⚡ Database indexing otimizado
- ⚡ Connection pooling
- ⚡ Query optimization com Prisma

## 🚀 Deploy

### Backend (API)

1. Configure as variáveis de ambiente de produção
2. Execute o build:
```bash
cd apps/api
npm run build
```
3. Execute as migrations:
```bash
npx prisma migrate deploy
```
4. Inicie o servidor:
```bash
npm start
```

### Frontend (Web)

1. Configure as variáveis de ambiente de produção
2. Execute o build:
```bash
cd apps/web
npm run build
```
3. Inicie o servidor:
```bash
npm start
```

### Docker (Produção)

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use TypeScript estrito
- Siga o ESLint configurado
- Escreva testes para novas features
- Mantenha cobertura de testes acima de 80%
- Use Conventional Commits
- Documente APIs com exemplos

## 📝 Status do Desenvolvimento

- [x] Setup do monorepo (Turborepo)
- [x] Configuração Docker (PostgreSQL, Redis)
- [x] Schema do banco de dados (Prisma)
- [x] Sistema de autenticação completo
- [x] CRUD básico de usuários
- [x] Cadastro e gestão de profissionais
- [x] Sistema de categorias e serviços
- [x] Sistema de busca e filtros
- [x] Solicitação de serviços e orçamentos
- [x] Sistema de avaliações
- [x] Sistema de notificações
- [x] Landing page completa com UI linda
- [x] Páginas de autenticação (Login/Register)
- [x] Dashboard do Cliente
- [x] Dashboard do Profissional
- [x] Testes unitários completos (80%+ coverage)
- [x] Testes E2E com Playwright
- [x] Documentação API completa
- [x] README com instruções de setup
- [ ] Chat em tempo real (Socket.io)
- [ ] Sistema de pagamentos integrado
- [ ] Painel administrativo completo
- [ ] CI/CD pipeline

## 📄 Licença

Proprietary - Todos os direitos reservados

## 👥 Autores

Desenvolvido com ❤️ pela equipe REPFY

## 🐛 Reportar Bugs

Encontrou um bug? Por favor, abra uma issue descrevendo:
- O que você esperava que acontecesse
- O que realmente aconteceu
- Passos para reproduzir o erro
- Screenshots (se aplicável)

## 💡 Roadmap

### Próximas Funcionalidades
- [ ] Sistema de pagamentos integrado
- [ ] Chat em tempo real com Socket.io
- [ ] Upload de imagens para portfólio
- [ ] Sistema de agendamento
- [ ] App mobile com React Native

### Planejado
- [ ] Sistema de recomendações com IA
- [ ] Análise de sentimento em reviews
- [ ] Dashboard de analytics avançado
- [ ] API GraphQL
- [ ] Webhooks para integrações

## 📞 Suporte

Para suporte, envie um email para support@repfy.com ou abra uma issue no GitHub.

---

**Desenvolvido com Next.js, React, Node.js, PostgreSQL e muito ☕**

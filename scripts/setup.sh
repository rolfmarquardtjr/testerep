#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}          🚀 REPFY Setup Script                      ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check Node.js version
echo -e "${YELLOW}📋 Checking prerequisites...${NC}"
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo -e "${RED}❌ Node.js 18 or higher is required. Current version: $(node -v)${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"
fi

# Check npm version
NPM_VERSION=$(npm -v | cut -d'.' -f1)
if [ "$NPM_VERSION" -lt 9 ]; then
  echo -e "${RED}❌ npm 9 or higher is required. Current version: $(npm -v)${NC}"
  exit 1
else
  echo -e "${GREEN}✅ npm version: $(npm -v)${NC}"
fi

# Check Docker
if ! command -v docker &> /dev/null; then
  echo -e "${YELLOW}⚠️  Docker not found. Please install Docker to continue.${NC}"
  echo -e "${YELLOW}   Download from: https://www.docker.com/get-started${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Docker version: $(docker --version | cut -d',' -f1)${NC}"
fi

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
  echo -e "${YELLOW}⚠️  Docker Compose not found. Please install Docker Compose to continue.${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Docker Compose version: $(docker-compose --version | cut -d',' -f1)${NC}"
fi

echo ""
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
  echo -e "${RED}❌ Failed to install dependencies${NC}"
  exit 1
fi

echo ""
echo -e "${YELLOW}🔧 Creating environment files...${NC}"

# Create API .env file
if [ ! -f "apps/api/.env" ]; then
  cat > apps/api/.env << 'EOF'
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/repfy"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT Secrets
JWT_SECRET="dev-jwt-secret-change-in-production-$(openssl rand -hex 32)"
JWT_REFRESH_SECRET="dev-refresh-secret-change-in-production-$(openssl rand -hex 32)"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# App Configuration
NODE_ENV="development"
PORT=3001
EOF
  echo -e "${GREEN}✅ Created apps/api/.env${NC}"
else
  echo -e "${BLUE}ℹ️  apps/api/.env already exists, skipping...${NC}"
fi

# Create Web .env.local file
if [ ! -f "apps/web/.env.local" ]; then
  cat > apps/web/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3001/api
EOF
  echo -e "${GREEN}✅ Created apps/web/.env.local${NC}"
else
  echo -e "${BLUE}ℹ️  apps/web/.env.local already exists, skipping...${NC}"
fi

echo ""
echo -e "${YELLOW}🐳 Starting Docker containers...${NC}"
docker-compose up -d
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Docker containers started successfully${NC}"
else
  echo -e "${RED}❌ Failed to start Docker containers${NC}"
  exit 1
fi

# Wait for PostgreSQL to be ready
echo ""
echo -e "${YELLOW}⏳ Waiting for PostgreSQL to be ready...${NC}"
until docker-compose exec -T postgres pg_isready -U postgres > /dev/null 2>&1; do
  echo -e "${BLUE}   Waiting for PostgreSQL...${NC}"
  sleep 2
done
echo -e "${GREEN}✅ PostgreSQL is ready${NC}"

echo ""
echo -e "${YELLOW}🗄️  Running Prisma setup...${NC}"
cd apps/api

# Generate Prisma Client
echo -e "${BLUE}   Generating Prisma Client...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Prisma Client generated${NC}"
else
  echo -e "${RED}❌ Failed to generate Prisma Client${NC}"
  cd ../..
  exit 1
fi

# Run Migrations
echo -e "${BLUE}   Running database migrations...${NC}"
npx prisma migrate dev --name init
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Database migrations completed${NC}"
else
  echo -e "${RED}❌ Failed to run migrations${NC}"
  cd ../..
  exit 1
fi

# Seed Database
echo -e "${BLUE}   Seeding database with test data...${NC}"
npm run prisma:seed
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Database seeded successfully${NC}"
else
  echo -e "${RED}❌ Failed to seed database${NC}"
  cd ../..
  exit 1
fi

cd ../..

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}          ✨ Setup completed successfully! ✨           ${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📝 Test Credentials:${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Admin:${NC}"
echo -e "  Email: ${GREEN}admin@repfy.com${NC}"
echo -e "  Senha: ${GREEN}admin123${NC}"
echo ""
echo -e "${YELLOW}Cliente:${NC}"
echo -e "  Email: ${GREEN}cliente@example.com${NC}"
echo -e "  Senha: ${GREEN}cliente123${NC}"
echo ""
echo -e "${YELLOW}Profissional:${NC}"
echo -e "  Email: ${GREEN}profissional@example.com${NC}"
echo -e "  Senha: ${GREEN}profissional123${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 To start development servers:${NC}"
echo ""
echo -e "  ${YELLOW}Terminal 1 - API:${NC}"
echo -e "  ${GREEN}cd apps/api && npm run dev${NC}"
echo ""
echo -e "  ${YELLOW}Terminal 2 - Web:${NC}"
echo -e "  ${GREEN}cd apps/web && npm run dev${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🌐 URLs:${NC}"
echo -e "  Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "  API:      ${GREEN}http://localhost:3001/api${NC}"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
echo ""

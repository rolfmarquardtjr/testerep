#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}          🚀 REPFY Development Server                 ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if Docker is running
echo -e "${YELLOW}🐳 Checking Docker...${NC}"
if ! docker info > /dev/null 2>&1; then
  echo -e "${RED}❌ Docker is not running. Please start Docker Desktop.${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Docker is running${NC}"
echo ""

# Start Docker containers
echo -e "${YELLOW}📦 Starting Docker containers...${NC}"
docker-compose up -d
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Docker containers started${NC}"
else
  echo -e "${RED}❌ Failed to start Docker containers${NC}"
  exit 1
fi
echo ""

# Wait for PostgreSQL to be ready
echo -e "${YELLOW}⏳ Waiting for PostgreSQL to be ready...${NC}"
sleep 3
echo -e "${GREEN}✅ PostgreSQL is ready${NC}"
echo ""

# Check if database needs setup
echo -e "${YELLOW}🗄️  Checking database...${NC}"
cd apps/api

# Check if migrations are needed
if ! npx prisma db pull --force > /dev/null 2>&1; then
  echo -e "${YELLOW}   Running database migrations...${NC}"
  npx prisma migrate dev --name init

  echo -e "${YELLOW}   Generating Prisma Client...${NC}"
  npx prisma generate

  echo -e "${YELLOW}   Seeding database...${NC}"
  npm run prisma:seed

  echo -e "${GREEN}✅ Database setup completed${NC}"
else
  echo -e "${GREEN}✅ Database is ready${NC}"
fi

cd ../..
echo ""

# TypeScript checks
echo -e "${YELLOW}🔍 Running TypeScript checks...${NC}"

echo -e "${BLUE}   Checking API...${NC}"
cd apps/api
npx tsc --noEmit
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ API TypeScript check passed${NC}"
else
  echo -e "${RED}❌ API has TypeScript errors${NC}"
  cd ../..
  exit 1
fi
cd ../..

echo -e "${BLUE}   Checking Web...${NC}"
cd apps/web
npx tsc --noEmit
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Web TypeScript check passed${NC}"
else
  echo -e "${RED}❌ Web has TypeScript errors${NC}"
  cd ../..
  exit 1
fi
cd ../..

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}          ✨ Ready to start! ✨                       ${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📝 Test Credentials:${NC}"
echo ""
echo -e "${YELLOW}Admin:${NC} admin@repfy.com / admin123"
echo -e "${YELLOW}Cliente:${NC} cliente@example.com / cliente123"
echo -e "${YELLOW}Profissional:${NC} profissional@example.com / profissional123"
echo ""
echo -e "${BLUE}🌐 Starting servers:${NC}"
echo -e "${YELLOW}   API:${NC} http://localhost:3001"
echo -e "${YELLOW}   Web:${NC} http://localhost:3000"
echo ""
echo -e "${YELLOW}💡 Run in separate terminals:${NC}"
echo -e "   ${BLUE}Terminal 1:${NC} cd apps/api && npm run dev"
echo -e "   ${BLUE}Terminal 2:${NC} cd apps/web && npm run dev"
echo ""

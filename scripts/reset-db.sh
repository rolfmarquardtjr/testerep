#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}          🔄 REPFY Database Reset Script             ${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Confirm action
echo -e "${YELLOW}⚠️  WARNING: This will delete all data in the database!${NC}"
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo -e "${BLUE}ℹ️  Operation cancelled${NC}"
  exit 0
fi

echo ""
echo -e "${YELLOW}🗄️  Resetting database...${NC}"

cd apps/api

# Reset database
echo -e "${BLUE}   Resetting Prisma database...${NC}"
npx prisma migrate reset --force
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Database reset successfully${NC}"
else
  echo -e "${RED}❌ Failed to reset database${NC}"
  cd ../..
  exit 1
fi

# Generate Prisma Client
echo -e "${BLUE}   Regenerating Prisma Client...${NC}"
npx prisma generate
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Prisma Client generated${NC}"
else
  echo -e "${RED}❌ Failed to generate Prisma Client${NC}"
  cd ../..
  exit 1
fi

# Seed database
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
echo -e "${GREEN}          ✨ Database reset completed! ✨             ${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📝 Test Credentials:${NC}"
echo ""
echo -e "${YELLOW}Admin:${NC} admin@repfy.com / admin123"
echo -e "${YELLOW}Cliente:${NC} cliente@example.com / cliente123"
echo -e "${YELLOW}Profissional:${NC} profissional@example.com / profissional123"
echo ""

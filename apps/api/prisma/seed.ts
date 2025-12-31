import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data
  await prisma.notification.deleteMany()
  await prisma.message.deleteMany()
  await prisma.conversationParticipant.deleteMany()
  await prisma.conversation.deleteMany()
  await prisma.review.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.requestAttachment.deleteMany()
  await prisma.quote.deleteMany()
  await prisma.serviceRequest.deleteMany()
  await prisma.serviceOffered.deleteMany()
  await prisma.availability.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.portfolioItem.deleteMany()
  await prisma.professional.deleteMany()
  await prisma.client.deleteMany()
  await prisma.serviceCategory.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Existing data cleared')

  // Create Service Categories
  const categories = [
    { name: 'Reformas e Reparos', slug: 'reformas-reparos', icon: 'hammer' },
    { name: 'Limpeza', slug: 'limpeza', icon: 'sparkles' },
    { name: 'Aulas', slug: 'aulas', icon: 'book-open' },
    { name: 'Assistência Técnica', slug: 'assistencia-tecnica', icon: 'wrench' },
    { name: 'Saúde e Bem-estar', slug: 'saude-bem-estar', icon: 'heart-pulse' },
    { name: 'Eventos', slug: 'eventos', icon: 'calendar' },
    { name: 'Design e Tecnologia', slug: 'design-tecnologia', icon: 'code' },
    { name: 'Serviços Domésticos', slug: 'servicos-domesticos', icon: 'home' },
  ]

  const createdCategories = []
  for (const cat of categories) {
    const category = await prisma.serviceCategory.create({
      data: cat,
    })
    createdCategories.push(category)
  }

  console.log(`✅ Created ${createdCategories.length} service categories`)

  // Create Subcategories
  const subcategories = [
    { parentSlug: 'reformas-reparos', name: 'Pintura', slug: 'pintura' },
    { parentSlug: 'reformas-reparos', name: 'Elétrica', slug: 'eletrica' },
    { parentSlug: 'reformas-reparos', name: 'Hidráulica', slug: 'hidraulica' },
    { parentSlug: 'limpeza', name: 'Limpeza Residencial', slug: 'limpeza-residencial' },
    { parentSlug: 'limpeza', name: 'Limpeza Pós-Obra', slug: 'limpeza-pos-obra' },
    { parentSlug: 'aulas', name: 'Aulas de Inglês', slug: 'aulas-ingles' },
    { parentSlug: 'aulas', name: 'Aulas de Matemática', slug: 'aulas-matematica' },
  ]

  for (const subcat of subcategories) {
    const parent = createdCategories.find(c => c.slug === subcat.parentSlug)
    if (parent) {
      await prisma.serviceCategory.create({
        data: {
          name: subcat.name,
          slug: subcat.slug,
          parentId: parent.id,
        },
      })
    }
  }

  console.log(`✅ Created ${subcategories.length} subcategories`)

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@repfy.com',
      password: hashedPassword,
      name: 'Admin Repfy',
      role: UserRole.ADMIN,
      emailVerified: true,
    },
  })

  console.log('✅ Created admin user')

  // Create Test Client
  const clientUser = await prisma.user.create({
    data: {
      email: 'cliente@example.com',
      password: await bcrypt.hash('cliente123', 10),
      name: 'João Silva',
      role: UserRole.CLIENT,
      emailVerified: true,
      client: {
        create: {
          cpf: '123.456.789-00',
          address: 'Rua das Flores, 123',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
        },
      },
    },
  })

  console.log('✅ Created test client')

  // Create Test Professional
  const professionalUser = await prisma.user.create({
    data: {
      email: 'profissional@example.com',
      password: await bcrypt.hash('profissional123', 10),
      name: 'Maria Santos',
      role: UserRole.PROFESSIONAL,
      emailVerified: true,
      professional: {
        create: {
          bio: 'Pintora profissional com 10 anos de experiência',
          pricingType: 'PER_HOUR',
          hourlyRate: 50.00,
          verified: true,
          rating: 4.8,
          totalReviews: 25,
          completedJobs: 50,
          responseTime: 30,
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567',
          cpf: '987.654.321-00',
          documentsVerified: true,
        },
      },
    },
  })

  console.log('✅ Created test professional')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

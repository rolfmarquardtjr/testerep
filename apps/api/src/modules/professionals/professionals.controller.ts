import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../../middleware/auth'
import { z } from 'zod'

const prisma = new PrismaClient()

const updateProfessionalSchema = z.object({
  bio: z.string().optional(),
  pricingType: z.enum(['PER_HOUR', 'PER_SERVICE', 'CUSTOM_QUOTE']).optional(),
  hourlyRate: z.number().positive().optional(),
  serviceRadius: z.number().positive().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

const addServiceSchema = z.object({
  categoryId: z.string().uuid(),
  title: z.string().min(5),
  description: z.string().min(20),
  price: z.number().positive().optional(),
})

const addPortfolioItemSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  imageUrl: z.string().url(),
  order: z.number().int().optional(),
})

const addAvailabilitySchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
})

export class ProfessionalsController {
  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const validation = updateProfessionalSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      // Get user's professional profile
      const user = await prisma.user.findUnique({
        where: { id: req.user?.userId },
        include: { professional: true },
      })

      if (!user?.professional) {
        return res.status(404).json({
          success: false,
          error: 'Professional profile not found',
        })
      }

      const professional = await prisma.professional.update({
        where: { id: user.professional.id },
        data: validation.data,
      })

      return res.json({
        success: true,
        data: professional,
      })
    } catch (error) {
      console.error('Update professional error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async addService(req: AuthRequest, res: Response) {
    try {
      const validation = addServiceSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user?.userId },
        include: { professional: true },
      })

      if (!user?.professional) {
        return res.status(404).json({
          success: false,
          error: 'Professional profile not found',
        })
      }

      const service = await prisma.serviceOffered.create({
        data: {
          ...validation.data,
          professionalId: user.professional.id,
        },
        include: {
          category: true,
        },
      })

      return res.status(201).json({
        success: true,
        data: service,
      })
    } catch (error) {
      console.error('Add service error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async addPortfolioItem(req: AuthRequest, res: Response) {
    try {
      const validation = addPortfolioItemSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user?.userId },
        include: { professional: true },
      })

      if (!user?.professional) {
        return res.status(404).json({
          success: false,
          error: 'Professional profile not found',
        })
      }

      const portfolioItem = await prisma.portfolioItem.create({
        data: {
          ...validation.data,
          professionalId: user.professional.id,
        },
      })

      return res.status(201).json({
        success: true,
        data: portfolioItem,
      })
    } catch (error) {
      console.error('Add portfolio item error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async setAvailability(req: AuthRequest, res: Response) {
    try {
      const validation = z.array(addAvailabilitySchema).safeParse(req.body.availability)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user?.userId },
        include: { professional: true },
      })

      if (!user?.professional) {
        return res.status(404).json({
          success: false,
          error: 'Professional profile not found',
        })
      }

      // Delete existing availability
      await prisma.availability.deleteMany({
        where: { professionalId: user.professional.id },
      })

      // Create new availability
      const availability = await prisma.availability.createMany({
        data: validation.data.map((a) => ({
          ...a,
          professionalId: user.professional!.id,
        })),
      })

      return res.json({
        success: true,
        data: { count: availability.count },
      })
    } catch (error) {
      console.error('Set availability error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async searchProfessionals(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const pageSize = parseInt(req.query.pageSize as string) || 10
      const categoryId = req.query.categoryId as string
      const city = req.query.city as string
      const state = req.query.state as string
      const minRating = parseFloat(req.query.minRating as string) || 0

      const where: any = {
        verified: true,
        rating: { gte: minRating },
      }

      if (city) where.city = city
      if (state) where.state = state

      if (categoryId) {
        where.services = {
          some: {
            categoryId,
            active: true,
          },
        }
      }

      const [professionals, total] = await Promise.all([
        prisma.professional.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
            services: {
              where: { active: true },
              include: { category: true },
            },
          },
          orderBy: [{ rating: 'desc' }, { totalReviews: 'desc' }],
        }),
        prisma.professional.count({ where }),
      ])

      return res.json({
        success: true,
        data: {
          professionals,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      })
    } catch (error) {
      console.error('Search professionals error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getProfessionalById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params

      const professional = await prisma.professional.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              createdAt: true,
            },
          },
          services: {
            where: { active: true },
            include: { category: true },
          },
          portfolio: {
            orderBy: { order: 'asc' },
          },
          certifications: {
            where: { verified: true },
          },
          availability: {
            orderBy: { dayOfWeek: 'asc' },
          },
        },
      })

      if (!professional) {
        return res.status(404).json({
          success: false,
          error: 'Professional not found',
        })
      }

      return res.json({
        success: true,
        data: professional,
      })
    } catch (error) {
      console.error('Get professional error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}

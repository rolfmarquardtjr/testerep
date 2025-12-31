import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../../middleware/auth'
import { z } from 'zod'

const prisma = new PrismaClient()

const createServiceRequestSchema = z.object({
  categoryId: z.string().uuid(),
  title: z.string().min(10),
  description: z.string().min(20),
  city: z.string(),
  state: z.string(),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  preferredDate: z.string().datetime().optional(),
  budget: z.number().positive().optional(),
})

export class ServiceRequestsController {
  async create(req: AuthRequest, res: Response) {
    try {
      const validation = createServiceRequestSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user?.userId },
        include: { client: true },
      })

      if (!user?.client) {
        return res.status(404).json({
          success: false,
          error: 'Client profile not found',
        })
      }

      const serviceRequest = await prisma.serviceRequest.create({
        data: {
          ...validation.data,
          clientId: user.client.id,
          preferredDate: validation.data.preferredDate
            ? new Date(validation.data.preferredDate)
            : undefined,
        },
        include: {
          category: true,
        },
      })

      return res.status(201).json({
        success: true,
        data: serviceRequest,
      })
    } catch (error) {
      console.error('Create service request error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async list(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const pageSize = parseInt(req.query.pageSize as string) || 10
      const status = req.query.status as string

      const user = await prisma.user.findUnique({
        where: { id: req.user?.userId },
        include: { client: true, professional: true },
      })

      let where: any = {}

      if (user?.client) {
        where.clientId = user.client.id
      } else if (user?.professional) {
        where.professionalId = user.professional.id
      }

      if (status) where.status = status

      const [requests, total] = await Promise.all([
        prisma.serviceRequest.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: {
            category: true,
            client: {
              include: {
                user: {
                  select: { id: true, name: true, avatar: true },
                },
              },
            },
            professional: {
              include: {
                user: {
                  select: { id: true, name: true, avatar: true },
                },
              },
            },
            quotes: {
              orderBy: { createdAt: 'desc' },
              take: 5,
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.serviceRequest.count({ where }),
      ])

      return res.json({
        success: true,
        data: {
          requests,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      })
    } catch (error) {
      console.error('List service requests error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params

      const serviceRequest = await prisma.serviceRequest.findUnique({
        where: { id },
        include: {
          category: true,
          client: {
            include: {
              user: {
                select: { id: true, name: true, avatar: true },
              },
            },
          },
          professional: {
            include: {
              user: {
                select: { id: true, name: true, avatar: true, phone: true },
              },
            },
          },
          quotes: {
            include: {
              professional: {
                include: {
                  user: {
                    select: { id: true, name: true, avatar: true },
                  },
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
          attachments: true,
          payment: true,
          review: true,
        },
      })

      if (!serviceRequest) {
        return res.status(404).json({
          success: false,
          error: 'Service request not found',
        })
      }

      return res.json({
        success: true,
        data: serviceRequest,
      })
    } catch (error) {
      console.error('Get service request error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async updateStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params
      const { status } = req.body

      const serviceRequest = await prisma.serviceRequest.update({
        where: { id },
        data: {
          status,
          ...(status === 'IN_PROGRESS' && { startedAt: new Date() }),
          ...(status === 'COMPLETED' && { completedAt: new Date() }),
        },
      })

      return res.json({
        success: true,
        data: serviceRequest,
      })
    } catch (error) {
      console.error('Update status error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async createQuote(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params
      const { message, price, estimatedDuration, validUntil } = req.body

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

      const quote = await prisma.quote.create({
        data: {
          serviceRequestId: id,
          professionalId: user.professional.id,
          message,
          price,
          estimatedDuration,
          validUntil: new Date(validUntil),
        },
        include: {
          professional: {
            include: {
              user: {
                select: { id: true, name: true, avatar: true },
              },
            },
          },
        },
      })

      return res.status(201).json({
        success: true,
        data: quote,
      })
    } catch (error) {
      console.error('Create quote error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async acceptQuote(req: AuthRequest, res: Response) {
    try {
      const { requestId, quoteId } = req.params

      // Update quote status
      const quote = await prisma.quote.update({
        where: { id: quoteId },
        data: { status: 'ACCEPTED' },
      })

      // Reject other quotes for this request
      await prisma.quote.updateMany({
        where: {
          serviceRequestId: requestId,
          id: { not: quoteId },
        },
        data: { status: 'REJECTED' },
      })

      // Update service request
      await prisma.serviceRequest.update({
        where: { id: requestId },
        data: {
          professionalId: quote.professionalId,
          finalPrice: quote.price,
          status: 'IN_PROGRESS',
          startedAt: new Date(),
        },
      })

      return res.json({
        success: true,
        data: quote,
      })
    } catch (error) {
      console.error('Accept quote error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}

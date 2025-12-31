import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../../middleware/auth'
import { z } from 'zod'

const prisma = new PrismaClient()

const createReviewSchema = z.object({
  serviceRequestId: z.string().uuid(),
  targetId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).optional(),
})

export class ReviewsController {
  async create(req: AuthRequest, res: Response) {
    try {
      const validation = createReviewSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const { serviceRequestId, targetId, rating, comment } = validation.data

      // Check if service request exists and is completed
      const serviceRequest = await prisma.serviceRequest.findUnique({
        where: { id: serviceRequestId },
        include: { review: true },
      })

      if (!serviceRequest) {
        return res.status(404).json({
          success: false,
          error: 'Service request not found',
        })
      }

      if (serviceRequest.status !== 'COMPLETED') {
        return res.status(400).json({
          success: false,
          error: 'Cannot review an incomplete service',
        })
      }

      if (serviceRequest.review) {
        return res.status(400).json({
          success: false,
          error: 'This service has already been reviewed',
        })
      }

      // Create review
      const review = await prisma.review.create({
        data: {
          serviceRequestId,
          authorId: req.user!.userId,
          targetId,
          rating,
          comment,
          verified: true, // Verified because it's linked to a completed service
        },
      })

      // Update professional's rating
      const professionalReviews = await prisma.review.findMany({
        where: { targetId, verified: true },
        select: { rating: true },
      })

      const totalRating = professionalReviews.reduce((sum, r) => sum + r.rating, 0)
      const avgRating = totalRating / professionalReviews.length

      await prisma.professional.update({
        where: { userId: targetId },
        data: {
          rating: avgRating,
          totalReviews: professionalReviews.length,
        },
      })

      return res.status(201).json({
        success: true,
        data: review,
      })
    } catch (error) {
      console.error('Create review error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async listByUser(req: AuthRequest, res: Response) {
    try {
      const { userId } = req.params
      const page = parseInt(req.query.page as string) || 1
      const pageSize = parseInt(req.query.pageSize as string) || 10

      const [reviews, total] = await Promise.all([
        prisma.review.findMany({
          where: { targetId: userId, verified: true },
          skip: (page - 1) * pageSize,
          take: pageSize,
          include: {
            author: {
              select: { id: true, name: true, avatar: true },
            },
            serviceRequest: {
              select: { id: true, title: true, category: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.review.count({ where: { targetId: userId, verified: true } }),
      ])

      return res.json({
        success: true,
        data: {
          reviews,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      })
    } catch (error) {
      console.error('List reviews error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}

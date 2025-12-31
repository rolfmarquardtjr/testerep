import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../../middleware/auth'
import { z } from 'zod'
import { hashPassword } from '../../utils/password'

const prisma = new PrismaClient()

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
})

const updatePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
})

export class UsersController {
  async getMe(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user?.userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          avatar: true,
          role: true,
          status: true,
          emailVerified: true,
          phoneVerified: true,
          createdAt: true,
          professional: {
            select: {
              id: true,
              bio: true,
              pricingType: true,
              hourlyRate: true,
              verified: true,
              rating: true,
              totalReviews: true,
              completedJobs: true,
            },
          },
          client: {
            select: {
              id: true,
              address: true,
              city: true,
              state: true,
              zipCode: true,
            },
          },
        },
      })

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        })
      }

      return res.json({
        success: true,
        data: user,
      })
    } catch (error) {
      console.error('Get user error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async updateMe(req: AuthRequest, res: Response) {
    try {
      const validation = updateUserSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const user = await prisma.user.update({
        where: { id: req.user?.userId },
        data: validation.data,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          avatar: true,
          role: true,
          status: true,
          updatedAt: true,
        },
      })

      return res.json({
        success: true,
        data: user,
      })
    } catch (error) {
      console.error('Update user error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async updatePassword(req: AuthRequest, res: Response) {
    try {
      const validation = updatePasswordSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const { currentPassword, newPassword } = validation.data

      // Get current user with password
      const user = await prisma.user.findUnique({
        where: { id: req.user?.userId },
      })

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        })
      }

      // Verify current password
      const bcrypt = require('bcryptjs')
      const passwordValid = await bcrypt.compare(currentPassword, user.password)

      if (!passwordValid) {
        return res.status(401).json({
          success: false,
          error: 'Current password is incorrect',
        })
      }

      // Hash new password
      const hashedPassword = await hashPassword(newPassword)

      // Update password
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      })

      return res.json({
        success: true,
        message: 'Password updated successfully',
      })
    } catch (error) {
      console.error('Update password error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getUserById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params

      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          avatar: true,
          role: true,
          createdAt: true,
          professional: {
            select: {
              bio: true,
              verified: true,
              rating: true,
              totalReviews: true,
              completedJobs: true,
              portfolio: {
                orderBy: { order: 'asc' },
              },
              certifications: {
                where: { verified: true },
              },
            },
          },
        },
      })

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        })
      }

      return res.json({
        success: true,
        data: user,
      })
    } catch (error) {
      console.error('Get user by ID error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async listUsers(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const pageSize = parseInt(req.query.pageSize as string) || 10
      const role = req.query.role as string
      const status = req.query.status as string

      const where: any = {}

      if (role) where.role = role
      if (status) where.status = status

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            status: true,
            emailVerified: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        }),
        prisma.user.count({ where }),
      ])

      return res.json({
        success: true,
        data: {
          users,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      })
    } catch (error) {
      console.error('List users error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}

import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../../middleware/auth'

const prisma = new PrismaClient()

export class NotificationsController {
  async list(req: AuthRequest, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const pageSize = parseInt(req.query.pageSize as string) || 20
      const unreadOnly = req.query.unreadOnly === 'true'

      const where: any = { userId: req.user!.userId }
      if (unreadOnly) where.read = false

      const [notifications, total] = await Promise.all([
        prisma.notification.findMany({
          where,
          skip: (page - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.notification.count({ where }),
      ])

      return res.json({
        success: true,
        data: {
          notifications,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      })
    } catch (error) {
      console.error('List notifications error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async markAsRead(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params

      const notification = await prisma.notification.update({
        where: { id, userId: req.user!.userId },
        data: { read: true },
      })

      return res.json({
        success: true,
        data: notification,
      })
    } catch (error) {
      console.error('Mark as read error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async markAllAsRead(req: AuthRequest, res: Response) {
    try {
      await prisma.notification.updateMany({
        where: { userId: req.user!.userId, read: false },
        data: { read: true },
      })

      return res.json({
        success: true,
        message: 'All notifications marked as read',
      })
    } catch (error) {
      console.error('Mark all as read error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}

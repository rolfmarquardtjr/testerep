import { Router } from 'express'
import { NotificationsController } from './notifications.controller'
import { authMiddleware } from '../../middleware/auth'

const router = Router()
const notificationsController = new NotificationsController()

router.get('/', authMiddleware, (req, res) => notificationsController.list(req, res))
router.patch('/:id/read', authMiddleware, (req, res) => notificationsController.markAsRead(req, res))
router.post('/read-all', authMiddleware, (req, res) => notificationsController.markAllAsRead(req, res))

export default router

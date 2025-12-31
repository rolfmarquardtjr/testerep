import { Router } from 'express'
import { UsersController } from './users.controller'
import { authMiddleware, roleMiddleware } from '../../middleware/auth'

const router = Router()
const usersController = new UsersController()

// Protected routes
router.get('/me', authMiddleware, (req, res) => usersController.getMe(req, res))
router.put('/me', authMiddleware, (req, res) => usersController.updateMe(req, res))
router.put('/me/password', authMiddleware, (req, res) => usersController.updatePassword(req, res))

// Public profile
router.get('/:id', (req, res) => usersController.getUserById(req, res))

// Admin only
router.get('/', authMiddleware, roleMiddleware(['ADMIN']), (req, res) =>
  usersController.listUsers(req, res)
)

export default router

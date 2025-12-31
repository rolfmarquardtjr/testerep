import { Router } from 'express'
import { CategoriesController } from './categories.controller'
import { authMiddleware, roleMiddleware } from '../../middleware/auth'

const router = Router()
const categoriesController = new CategoriesController()

// Public routes
router.get('/', (req, res) => categoriesController.list(req, res))
router.get('/:id', (req, res) => categoriesController.getById(req, res))

// Admin only routes
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  (req, res) => categoriesController.create(req, res)
)

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  (req, res) => categoriesController.update(req, res)
)

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  (req, res) => categoriesController.delete(req, res)
)

export default router

import { Router } from 'express'
import { ReviewsController } from './reviews.controller'
import { authMiddleware } from '../../middleware/auth'

const router = Router()
const reviewsController = new ReviewsController()

router.post('/', authMiddleware, (req, res) => reviewsController.create(req, res))
router.get('/user/:userId', (req, res) => reviewsController.listByUser(req, res))

export default router

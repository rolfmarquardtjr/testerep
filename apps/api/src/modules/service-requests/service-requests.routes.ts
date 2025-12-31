import { Router } from 'express'
import { ServiceRequestsController } from './service-requests.controller'
import { authMiddleware, roleMiddleware } from '../../middleware/auth'

const router = Router()
const serviceRequestsController = new ServiceRequestsController()

// Client routes
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['CLIENT']),
  (req, res) => serviceRequestsController.create(req, res)
)

// Both client and professional can list their requests
router.get(
  '/',
  authMiddleware,
  (req, res) => serviceRequestsController.list(req, res)
)

router.get(
  '/:id',
  authMiddleware,
  (req, res) => serviceRequestsController.getById(req, res)
)

router.patch(
  '/:id/status',
  authMiddleware,
  (req, res) => serviceRequestsController.updateStatus(req, res)
)

// Professional routes - create quote
router.post(
  '/:id/quotes',
  authMiddleware,
  roleMiddleware(['PROFESSIONAL']),
  (req, res) => serviceRequestsController.createQuote(req, res)
)

// Client routes - accept quote
router.post(
  '/:requestId/quotes/:quoteId/accept',
  authMiddleware,
  roleMiddleware(['CLIENT']),
  (req, res) => serviceRequestsController.acceptQuote(req, res)
)

export default router

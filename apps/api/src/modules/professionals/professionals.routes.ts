import { Router } from 'express'
import { ProfessionalsController } from './professionals.controller'
import { authMiddleware, roleMiddleware } from '../../middleware/auth'

const router = Router()
const professionalsController = new ProfessionalsController()

// Public routes
router.get('/search', (req, res) => professionalsController.searchProfessionals(req, res))
router.get('/:id', (req, res) => professionalsController.getProfessionalById(req, res))

// Professional only routes
router.put(
  '/profile',
  authMiddleware,
  roleMiddleware(['PROFESSIONAL']),
  (req, res) => professionalsController.updateProfile(req, res)
)

router.post(
  '/services',
  authMiddleware,
  roleMiddleware(['PROFESSIONAL']),
  (req, res) => professionalsController.addService(req, res)
)

router.post(
  '/portfolio',
  authMiddleware,
  roleMiddleware(['PROFESSIONAL']),
  (req, res) => professionalsController.addPortfolioItem(req, res)
)

router.put(
  '/availability',
  authMiddleware,
  roleMiddleware(['PROFESSIONAL']),
  (req, res) => professionalsController.setAvailability(req, res)
)

export default router

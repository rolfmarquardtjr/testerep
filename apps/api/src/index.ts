import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

// Routes
import authRoutes from './modules/auth/auth.routes'
import usersRoutes from './modules/users/users.routes'
import professionalsRoutes from './modules/professionals/professionals.routes'
import categoriesRoutes from './modules/categories/categories.routes'
import serviceRequestsRoutes from './modules/service-requests/service-requests.routes'
import reviewsRoutes from './modules/reviews/reviews.routes'
import notificationsRoutes from './modules/notifications/notifications.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/', limiter)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Repfy API is running' })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Repfy API',
    version: '1.0.0',
    status: 'development',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users',
    },
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/professionals', professionalsRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/service-requests', serviceRequestsRoutes)
app.use('/api/reviews', reviewsRoutes)
app.use('/api/notifications', notificationsRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  })
})

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Repfy API running on port ${PORT}`)
  console.log(`📚 API Documentation available at http://localhost:${PORT}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app

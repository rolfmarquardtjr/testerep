import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { hashPassword, comparePassword, validatePasswordStrength } from '../../utils/password'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  getRefreshTokenExpiry,
} from '../../utils/jwt'
import { z } from 'zod'

const prisma = new PrismaClient()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['CLIENT', 'PROFESSIONAL']).default('CLIENT'),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

const refreshTokenSchema = z.object({
  refreshToken: z.string(),
})

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8),
})

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const validation = registerSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const { email, password, name, role } = validation.data

      // Validate password strength
      const passwordValidation = validatePasswordStrength(password)
      if (!passwordValidation.valid) {
        return res.status(400).json({
          success: false,
          error: 'Password does not meet requirements',
          details: passwordValidation.errors,
        })
      }

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'User with this email already exists',
        })
      }

      // Hash password
      const hashedPassword = await hashPassword(password)

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role,
          ...(role === 'CLIENT' && {
            client: {
              create: {},
            },
          }),
          ...(role === 'PROFESSIONAL' && {
            professional: {
              create: {},
            },
          }),
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          createdAt: true,
        },
      })

      // Generate tokens
      const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      })

      const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      })

      // Store refresh token
      await prisma.session.create({
        data: {
          userId: user.id,
          refreshToken,
          expiresAt: getRefreshTokenExpiry(),
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        },
      })

      return res.status(201).json({
        success: true,
        data: {
          user,
          accessToken,
          refreshToken,
        },
      })
    } catch (error) {
      console.error('Registration error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validation = loginSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const { email, password } = validation.data

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials',
        })
      }

      // Check password
      const passwordValid = await comparePassword(password, user.password)

      if (!passwordValid) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials',
        })
      }

      // Check if user is active
      if (user.status !== 'ACTIVE') {
        return res.status(403).json({
          success: false,
          error: 'Account is not active',
        })
      }

      // Generate tokens
      const accessToken = generateAccessToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      })

      const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      })

      // Store refresh token
      await prisma.session.create({
        data: {
          userId: user.id,
          refreshToken,
          expiresAt: getRefreshTokenExpiry(),
          ipAddress: req.ip,
          userAgent: req.headers['user-agent'],
        },
      })

      const { password: _, ...userWithoutPassword } = user

      return res.json({
        success: true,
        data: {
          user: userWithoutPassword,
          accessToken,
          refreshToken,
        },
      })
    } catch (error) {
      console.error('Login error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const validation = refreshTokenSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
        })
      }

      const { refreshToken } = validation.data

      // Verify token
      const payload = verifyRefreshToken(refreshToken)

      // Check if session exists
      const session = await prisma.session.findUnique({
        where: { refreshToken },
      })

      if (!session || session.expiresAt < new Date()) {
        return res.status(401).json({
          success: false,
          error: 'Invalid or expired refresh token',
        })
      }

      // Generate new access token
      const accessToken = generateAccessToken({
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      })

      return res.json({
        success: true,
        data: {
          accessToken,
        },
      })
    } catch (error) {
      console.error('Refresh token error:', error)
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token',
      })
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const validation = refreshTokenSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
        })
      }

      const { refreshToken } = validation.data

      // Delete session
      await prisma.session.deleteMany({
        where: { refreshToken },
      })

      return res.json({
        success: true,
        message: 'Logged out successfully',
      })
    } catch (error) {
      console.error('Logout error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const validation = forgotPasswordSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const { email } = validation.data

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
      })

      // Always return success to prevent email enumeration
      if (!user) {
        return res.json({
          success: true,
          message: 'If the email exists, a password reset link has been sent',
        })
      }

      // Generate reset token (valid for 1 hour)
      const resetToken = generateAccessToken(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        '1h'
      )

      // TODO: Send email with reset link
      // For now, we'll just log it (in production, integrate with email service)
      console.log(`Password reset token for ${email}: ${resetToken}`)
      console.log(`Reset link: ${process.env.FRONTEND_URL}/redefinir-senha?token=${resetToken}`)

      return res.json({
        success: true,
        message: 'If the email exists, a password reset link has been sent',
        // TODO: Remove this in production - only for testing
        ...(process.env.NODE_ENV === 'development' && { resetToken }),
      })
    } catch (error) {
      console.error('Forgot password error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const validation = resetPasswordSchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const { token, password } = validation.data

      // Validate password strength
      const passwordValidation = validatePasswordStrength(password)
      if (!passwordValidation.valid) {
        return res.status(400).json({
          success: false,
          error: 'Password does not meet requirements',
          details: passwordValidation.errors,
        })
      }

      // Verify token
      let payload
      try {
        const jwt = await import('jsonwebtoken')
        payload = jwt.verify(token, process.env.JWT_SECRET!) as any
      } catch (error) {
        return res.status(401).json({
          success: false,
          error: 'Invalid or expired reset token',
        })
      }

      // Find user
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
      })

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found',
        })
      }

      // Hash new password
      const hashedPassword = await hashPassword(password)

      // Update password
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      })

      // Invalidate all sessions
      await prisma.session.deleteMany({
        where: { userId: user.id },
      })

      return res.json({
        success: true,
        message: 'Password reset successfully',
      })
    } catch (error) {
      console.error('Reset password error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}

import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken, TokenPayload } from '../utils/jwt'

export interface AuthRequest extends Request {
  user?: TokenPayload
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'No token provided',
      })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    const payload = verifyAccessToken(token)
    req.user = payload

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token',
    })
  }
}

export function roleMiddleware(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      })
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden - Insufficient permissions',
      })
    }

    next()
  }
}

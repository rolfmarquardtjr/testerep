import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AuthRequest } from '../../middleware/auth'
import { z } from 'zod'

const prisma = new PrismaClient()

// Utility function to create slug
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const createCategorySchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  icon: z.string().optional(),
  parentId: z.string().uuid().optional(),
  order: z.number().int().optional(),
})

const updateCategorySchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().int().optional(),
  active: z.boolean().optional(),
})

export class CategoriesController {
  async list(req: AuthRequest, res: Response) {
    try {
      const includeInactive = req.query.includeInactive === 'true'

      const categories = await prisma.serviceCategory.findMany({
        where: includeInactive ? undefined : { active: true },
        include: {
          subcategories: {
            where: includeInactive ? undefined : { active: true },
            orderBy: { order: 'asc' },
          },
          _count: {
            select: {
              servicesOffered: true,
              serviceRequests: true,
            },
          },
        },
        orderBy: { order: 'asc' },
      })

      // Filter top-level categories (no parent)
      const topLevelCategories = categories.filter((c: any) => !c.parentId)

      return res.json({
        success: true,
        data: topLevelCategories,
      })
    } catch (error) {
      console.error('List categories error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async getById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params

      const category = await prisma.serviceCategory.findUnique({
        where: { id },
        include: {
          subcategories: {
            where: { active: true },
            orderBy: { order: 'asc' },
          },
          parent: true,
          _count: {
            select: {
              servicesOffered: true,
              serviceRequests: true,
            },
          },
        },
      })

      if (!category) {
        return res.status(404).json({
          success: false,
          error: 'Category not found',
        })
      }

      return res.json({
        success: true,
        data: category,
      })
    } catch (error) {
      console.error('Get category error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async create(req: AuthRequest, res: Response) {
    try {
      const validation = createCategorySchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const { name, ...rest } = validation.data
      const slug = slugify(name)

      // Check if slug already exists
      const existing = await prisma.serviceCategory.findUnique({
        where: { slug },
      })

      if (existing) {
        return res.status(400).json({
          success: false,
          error: 'Category with this name already exists',
        })
      }

      const category = await prisma.serviceCategory.create({
        data: {
          name,
          slug,
          ...rest,
        },
      })

      return res.status(201).json({
        success: true,
        data: category,
      })
    } catch (error) {
      console.error('Create category error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params
      const validation = updateCategorySchema.safeParse(req.body)

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: validation.error.errors,
        })
      }

      const data: any = { ...validation.data }

      // If name is being updated, update slug as well
      if (data.name) {
        data.slug = slugify(data.name)
      }

      const category = await prisma.serviceCategory.update({
        where: { id },
        data,
      })

      return res.json({
        success: true,
        data: category,
      })
    } catch (error) {
      console.error('Update category error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params

      // Soft delete by setting active to false
      const category = await prisma.serviceCategory.update({
        where: { id },
        data: { active: false },
      })

      return res.json({
        success: true,
        data: category,
      })
    } catch (error) {
      console.error('Delete category error:', error)
      return res.status(500).json({
        success: false,
        error: 'Internal server error',
      })
    }
  }
}

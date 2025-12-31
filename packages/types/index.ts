// User Types
export enum UserRole {
  CLIENT = 'CLIENT',
  PROFESSIONAL = 'PROFESSIONAL',
  ADMIN = 'ADMIN',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
}

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
  createdAt: Date
  updatedAt: Date
}

// Service Types
export enum ServiceStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string
  icon?: string
  parentId?: string
}

export interface Service {
  id: string
  title: string
  description: string
  categoryId: string
  professionalId: string
  status: ServiceStatus
  price?: number
  createdAt: Date
  updatedAt: Date
}

// Professional Types
export enum PricingType {
  PER_HOUR = 'PER_HOUR',
  PER_SERVICE = 'PER_SERVICE',
  CUSTOM_QUOTE = 'CUSTOM_QUOTE',
}

export interface Professional {
  id: string
  userId: string
  bio: string
  pricingType: PricingType
  hourlyRate?: number
  availability: string[]
  verified: boolean
  rating: number
  totalReviews: number
  createdAt: Date
  updatedAt: Date
}

// Request Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

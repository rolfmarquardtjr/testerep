/**
 * Centralized API configuration
 * Uses NEXT_PUBLIC_API_URL environment variable
 * Defaults to http://localhost:3001 for development
 */

export const API_BASE_URL =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

/**
 * Helper function to build API endpoints
 * @param path - The API path (e.g., '/api/users')
 * @returns Full API URL
 */
export const getApiUrl = (path: string): string => {
  const baseUrl = API_BASE_URL
  // Remove trailing slash from base URL if present
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${cleanBase}${cleanPath}`
}

/**
 * Helper for fetch requests with error handling
 */
export const fetchApi = async (
  path: string,
  options?: RequestInit & { body?: Record<string, any> }
) => {
  const url = getApiUrl(path)
  const headers = {
    'Content-Type': 'application/json',
    ...options?.headers,
  }

  const config: RequestInit = {
    ...options,
    headers,
  }

  if (options?.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const error = await response.text().catch(() => 'Unknown error')
    throw new Error(`API error: ${response.status} - ${error}`)
  }

  return response.json()
}

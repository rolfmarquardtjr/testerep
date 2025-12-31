# REPFY API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication

All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

---

## Auth Endpoints

### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Test@123456",
  "name": "John Doe",
  "role": "CLIENT" | "PROFESSIONAL"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "CLIENT",
      "status": "ACTIVE",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Rules:**
- Email must be valid format
- Password must be at least 8 characters
- Password must contain: uppercase, lowercase, number
- Name must be at least 2 characters

---

### POST /auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Test@123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "CLIENT"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### POST /auth/logout
Logout and invalidate refresh token.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## User Endpoints

### GET /users/me
Get current user profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "11987654321",
    "role": "CLIENT",
    "status": "ACTIVE",
    "client": {
      "id": "uuid",
      "cpf": "123.456.789-00",
      "address": "Rua Example, 123"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### GET /users/:id
Get user by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "role": "CLIENT"
  }
}
```

---

### PATCH /users/me
Update current user profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "11999999999"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Updated",
    "phone": "11999999999"
  }
}
```

---

### DELETE /users/me
Delete current user account.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Professional Endpoints

### GET /professionals/:id
Get professional profile by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "bio": "Experienced professional",
    "hourlyRate": 100,
    "rating": 4.8,
    "completedJobs": 50,
    "verified": true,
    "user": {
      "name": "Professional Name",
      "city": "São Paulo",
      "state": "SP"
    },
    "services": [
      {
        "id": "uuid",
        "name": "Plumbing Service",
        "price": 100
      }
    ]
  }
}
```

---

### PATCH /professionals/me
Update professional profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "bio": "Updated bio",
  "hourlyRate": 150,
  "serviceRadius": 50
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "bio": "Updated bio",
    "hourlyRate": 150,
    "serviceRadius": 50
  }
}
```

---

### GET /professionals/search
Search for professionals.

**Query Parameters:**
- `category` (string): Filter by category name
- `city` (string): Filter by city
- `minRating` (number): Minimum rating (1-5)
- `maxPrice` (number): Maximum hourly rate
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "hourlyRate": 100,
      "rating": 4.8,
      "user": {
        "name": "Professional Name",
        "city": "São Paulo"
      }
    }
  ]
}
```

---

## Category Endpoints

### GET /categories
Get all categories.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Home Services",
      "slug": "home-services",
      "icon": "home",
      "subcategories": [
        {
          "id": "uuid",
          "name": "Plumbing"
        }
      ]
    }
  ]
}
```

---

### GET /categories/:id
Get category by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Home Services",
    "description": "All home-related services",
    "subcategories": []
  }
}
```

---

### POST /categories
Create new category (Admin only).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "name": "New Category",
  "description": "Category description",
  "icon": "icon-name",
  "parentId": "uuid" // Optional
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "New Category",
    "slug": "new-category"
  }
}
```

---

## Service Request Endpoints

### POST /service-requests
Create a service request (Client only).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "categoryId": "uuid",
  "title": "Need plumbing service",
  "description": "Kitchen sink is leaking",
  "city": "São Paulo",
  "state": "SP",
  "zipCode": "01000-000",
  "budget": 500,
  "urgency": "MEDIUM"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Need plumbing service",
    "status": "PENDING",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### GET /service-requests
Get service requests with filters.

**Query Parameters:**
- `status` (string): PENDING | IN_PROGRESS | COMPLETED | CANCELLED
- `category` (string): Category ID
- `city` (string): Filter by city
- `page` (number): Page number
- `limit` (number): Items per page

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Service Request",
      "description": "Description",
      "status": "PENDING",
      "budget": 500,
      "city": "São Paulo"
    }
  ]
}
```

---

### GET /service-requests/:id
Get service request by ID.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Service Request",
    "description": "Full description",
    "status": "PENDING",
    "client": {
      "name": "Client Name"
    },
    "quotes": [
      {
        "id": "uuid",
        "price": 500,
        "professional": {
          "user": {
            "name": "Professional Name"
          }
        }
      }
    ]
  }
}
```

---

### PATCH /service-requests/:id/status
Update service request status.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "IN_PROGRESS"
  }
}
```

---

### POST /service-requests/:requestId/quotes
Create a quote for a service request (Professional only).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "price": 500,
  "description": "I can complete this job with high quality",
  "estimatedDuration": 120
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "price": 500,
    "status": "PENDING",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### POST /quotes/:quoteId/accept
Accept a quote (Client only).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Quote accepted successfully"
}
```

---

## Review Endpoints

### POST /reviews
Create a review.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "professionalId": "uuid",
  "serviceRequestId": "uuid",
  "rating": 5,
  "comment": "Excellent service!"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "rating": 5,
    "comment": "Excellent service!",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Validation:**
- Rating must be between 1 and 5
- Can only review completed services
- Must be the client of the service request

---

### GET /professionals/:professionalId/reviews
Get reviews for a professional.

**Query Parameters:**
- `minRating` (number): Filter by minimum rating
- `page` (number): Page number
- `limit` (number): Items per page

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "rating": 5,
      "comment": "Great service!",
      "client": {
        "name": "Client Name"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Notification Endpoints

### GET /notifications
Get user notifications.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `unread` (boolean): Filter unread notifications
- `type` (string): Filter by notification type
- `page` (number): Page number
- `limit` (number): Items per page

**Response (200):**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "NEW_QUOTE",
        "title": "New quote received",
        "message": "A professional sent you a quote",
        "read": false,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "total": 10,
    "unreadCount": 3
  }
}
```

---

### PATCH /notifications/:id/read
Mark notification as read.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "read": true
  }
}
```

---

### POST /notifications/read-all
Mark all notifications as read.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "All notifications marked as read",
  "count": 5
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Rate Limiting

API endpoints are rate limited to:
- 100 requests per 15 minutes per IP for public endpoints
- 1000 requests per 15 minutes per user for authenticated endpoints

When rate limit is exceeded, you'll receive a `429 Too Many Requests` response:
```json
{
  "success": false,
  "error": "Too many requests, please try again later"
}
```

---

## Pagination

List endpoints support pagination with the following query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

Paginated responses include metadata:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

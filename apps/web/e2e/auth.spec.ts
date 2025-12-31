import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.describe('Registration', () => {
    test('should register a new client successfully', async ({ page }) => {
      await page.goto('/register')

      // Wait for page to load
      await expect(page.getByRole('heading', { name: /criar conta/i })).toBeVisible()

      // Fill registration form
      const timestamp = Date.now()
      await page.getByLabel(/nome/i).fill(`Test User ${timestamp}`)
      await page.getByLabel(/e-mail/i).fill(`test${timestamp}@example.com`)
      await page.getByLabel(/^senha$/i).fill('Test@123456')
      await page.getByLabel(/confirmar senha/i).fill('Test@123456')

      // Select CLIENT role
      await page.getByText(/sou cliente/i).click()

      // Submit form
      await page.getByRole('button', { name: /criar conta/i }).click()

      // Should redirect to client dashboard
      await expect(page).toHaveURL(/\/dashboard\/client/)
      await expect(page.getByRole('heading', { name: /olá/i })).toBeVisible()
    })

    test('should register a new professional successfully', async ({ page }) => {
      await page.goto('/register')

      await expect(page.getByRole('heading', { name: /criar conta/i })).toBeVisible()

      const timestamp = Date.now()
      await page.getByLabel(/nome/i).fill(`Test Professional ${timestamp}`)
      await page.getByLabel(/e-mail/i).fill(`prof${timestamp}@example.com`)
      await page.getByLabel(/^senha$/i).fill('Test@123456')
      await page.getByLabel(/confirmar senha/i).fill('Test@123456')

      // Select PROFESSIONAL role
      await page.getByText(/sou profissional/i).click()

      await page.getByRole('button', { name: /criar conta/i }).click()

      // Should redirect to professional dashboard
      await expect(page).toHaveURL(/\/dashboard\/professional/)
      await expect(page.getByRole('heading', { name: /olá/i })).toBeVisible()
    })

    test('should show validation errors for weak password', async ({ page }) => {
      await page.goto('/register')

      await page.getByLabel(/nome/i).fill('Test User')
      await page.getByLabel(/e-mail/i).fill('test@example.com')
      await page.getByLabel(/^senha$/i).fill('weak')
      await page.getByLabel(/confirmar senha/i).fill('weak')

      await page.getByRole('button', { name: /criar conta/i }).click()

      // Should show password requirements error
      await expect(page.getByText(/senha deve ter pelo menos 8 caracteres|password must/i)).toBeVisible()
    })

    test('should show error when passwords do not match', async ({ page }) => {
      await page.goto('/register')

      await page.getByLabel(/nome/i).fill('Test User')
      await page.getByLabel(/e-mail/i).fill('test@example.com')
      await page.getByLabel(/^senha$/i).fill('Test@123456')
      await page.getByLabel(/confirmar senha/i).fill('Test@654321')

      await page.getByRole('button', { name: /criar conta/i }).click()

      // Should show password mismatch error
      await expect(page.getByText(/senhas não coincidem|passwords do not match/i)).toBeVisible()
    })

    test('should show error for duplicate email', async ({ page }) => {
      // First registration
      await page.goto('/register')
      const timestamp = Date.now()
      const email = `duplicate${timestamp}@example.com`

      await page.getByLabel(/nome/i).fill('First User')
      await page.getByLabel(/e-mail/i).fill(email)
      await page.getByLabel(/^senha$/i).fill('Test@123456')
      await page.getByLabel(/confirmar senha/i).fill('Test@123456')
      await page.getByRole('button', { name: /criar conta/i }).click()

      // Wait for successful registration
      await expect(page).toHaveURL(/\/dashboard/)

      // Logout
      await page.getByRole('button', { name: /sair/i }).click()

      // Try to register with same email
      await page.goto('/register')
      await page.getByLabel(/nome/i).fill('Second User')
      await page.getByLabel(/e-mail/i).fill(email)
      await page.getByLabel(/^senha$/i).fill('Test@123456')
      await page.getByLabel(/confirmar senha/i).fill('Test@123456')
      await page.getByRole('button', { name: /criar conta/i }).click()

      // Should show duplicate email error
      await expect(page.getByText(/já existe|already exists/i)).toBeVisible()
    })
  })

  test.describe('Login', () => {
    test('should login as client successfully', async ({ page }) => {
      await page.goto('/login')

      await expect(page.getByRole('heading', { name: /entrar/i })).toBeVisible()

      // Use seeded test client
      await page.getByLabel(/e-mail/i).fill('cliente@example.com')
      await page.getByLabel(/senha/i).fill('cliente123')

      await page.getByRole('button', { name: /entrar/i }).click()

      // Should redirect to client dashboard
      await expect(page).toHaveURL(/\/dashboard\/client/)
      await expect(page.getByRole('heading', { name: /olá/i })).toBeVisible()
    })

    test('should login as professional successfully', async ({ page }) => {
      await page.goto('/login')

      await expect(page.getByRole('heading', { name: /entrar/i })).toBeVisible()

      // Use seeded test professional
      await page.getByLabel(/e-mail/i).fill('profissional@example.com')
      await page.getByLabel(/senha/i).fill('profissional123')

      await page.getByRole('button', { name: /entrar/i }).click()

      // Should redirect to professional dashboard
      await expect(page).toHaveURL(/\/dashboard\/professional/)
      await expect(page.getByRole('heading', { name: /olá/i })).toBeVisible()
    })

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/login')

      await page.getByLabel(/e-mail/i).fill('invalid@example.com')
      await page.getByLabel(/senha/i).fill('wrongpassword')

      await page.getByRole('button', { name: /entrar/i }).click()

      // Should show invalid credentials error
      await expect(page.getByText(/credenciais inválidas|invalid credentials/i)).toBeVisible()
    })

    test('should show validation error for invalid email format', async ({ page }) => {
      await page.goto('/login')

      await page.getByLabel(/e-mail/i).fill('invalid-email')
      await page.getByLabel(/senha/i).fill('password123')

      await page.getByRole('button', { name: /entrar/i }).click()

      // Should show email validation error
      await expect(page.getByText(/e-mail inválido|invalid email/i)).toBeVisible()
    })
  })

  test.describe('Logout', () => {
    test('should logout successfully', async ({ page }) => {
      // Login first
      await page.goto('/login')
      await page.getByLabel(/e-mail/i).fill('cliente@example.com')
      await page.getByLabel(/senha/i).fill('cliente123')
      await page.getByRole('button', { name: /entrar/i }).click()

      await expect(page).toHaveURL(/\/dashboard\/client/)

      // Logout
      await page.getByRole('button', { name: /sair/i }).click()

      // Should redirect to home page
      await expect(page).toHaveURL('/')
    })
  })

  test.describe('Protected Routes', () => {
    test('should redirect to login when accessing protected route without auth', async ({ page }) => {
      await page.goto('/dashboard/client')

      // Should redirect to login
      await expect(page).toHaveURL(/\/login/)
    })

    test('should prevent CLIENT from accessing professional dashboard', async ({ page }) => {
      // Login as client
      await page.goto('/login')
      await page.getByLabel(/e-mail/i).fill('cliente@example.com')
      await page.getByLabel(/senha/i).fill('cliente123')
      await page.getByRole('button', { name: /entrar/i }).click()

      await expect(page).toHaveURL(/\/dashboard\/client/)

      // Try to access professional dashboard
      await page.goto('/dashboard/professional')

      // Should redirect back to client dashboard or show error
      await expect(page).toHaveURL(/\/dashboard\/client/)
    })
  })
})

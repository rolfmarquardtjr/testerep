import { test, expect } from '@playwright/test'

test.describe('Service Request Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as client before each test
    await page.goto('/login')
    await page.getByLabel(/e-mail/i).fill('cliente@example.com')
    await page.getByLabel(/senha/i).fill('cliente123')
    await page.getByRole('button', { name: /entrar/i }).click()
    await expect(page).toHaveURL(/\/dashboard\/client/)
  })

  test.describe('Creating Service Request', () => {
    test('should create a service request successfully', async ({ page }) => {
      // Navigate to create service request
      await page.getByRole('link', { name: /nova solicitação|new request/i }).click()

      // Fill service request form
      await page.getByLabel(/título|title/i).fill('Conserto de encanamento')
      await page.getByLabel(/descrição|description/i).fill('Preciso consertar um vazamento na cozinha')

      // Select category
      await page.getByLabel(/categoria|category/i).click()
      await page.getByRole('option', { name: /encanamento|plumbing/i }).click()

      // Fill location
      await page.getByLabel(/cidade|city/i).fill('São Paulo')
      await page.getByLabel(/estado|state/i).fill('SP')
      await page.getByLabel(/cep|zip/i).fill('01234-567')

      // Set budget
      await page.getByLabel(/orçamento|budget/i).fill('500')

      // Submit form
      await page.getByRole('button', { name: /enviar solicitação|submit request/i }).click()

      // Should show success message
      await expect(page.getByText(/solicitação criada|request created/i)).toBeVisible()

      // Should redirect to service requests list
      await expect(page).toHaveURL(/\/dashboard\/client\/requests/)
    })

    test('should show validation errors for incomplete form', async ({ page }) => {
      await page.getByRole('link', { name: /nova solicitação|new request/i }).click()

      // Try to submit without filling required fields
      await page.getByRole('button', { name: /enviar solicitação|submit request/i }).click()

      // Should show validation errors
      await expect(page.getByText(/campo obrigatório|required field/i)).toBeVisible()
    })

    test('should reject negative budget', async ({ page }) => {
      await page.getByRole('link', { name: /nova solicitação|new request/i }).click()

      await page.getByLabel(/título|title/i).fill('Test Request')
      await page.getByLabel(/orçamento|budget/i).fill('-100')

      await page.getByRole('button', { name: /enviar solicitação|submit request/i }).click()

      // Should show budget validation error
      await expect(page.getByText(/orçamento deve ser positivo|budget must be positive/i)).toBeVisible()
    })
  })

  test.describe('Viewing Service Requests', () => {
    test('should display list of service requests', async ({ page }) => {
      await page.getByRole('link', { name: /minhas solicitações|my requests/i }).click()

      // Should show requests list
      await expect(page.getByRole('heading', { name: /minhas solicitações|my requests/i })).toBeVisible()

      // If there are requests, should display them
      const requestCards = page.locator('[data-testid="request-card"]')
      const count = await requestCards.count()

      if (count > 0) {
        await expect(requestCards.first()).toBeVisible()
      }
    })

    test('should filter requests by status', async ({ page }) => {
      await page.getByRole('link', { name: /minhas solicitações|my requests/i }).click()

      // Filter by PENDING
      await page.getByLabel(/filtrar por status|filter by status/i).click()
      await page.getByRole('option', { name: /pendente|pending/i }).click()

      // URL should contain filter
      await expect(page).toHaveURL(/status=PENDING/)
    })

    test('should view service request details', async ({ page }) => {
      await page.getByRole('link', { name: /minhas solicitações|my requests/i }).click()

      // Click on first request if exists
      const firstRequest = page.locator('[data-testid="request-card"]').first()
      if (await firstRequest.isVisible()) {
        await firstRequest.click()

        // Should navigate to details page
        await expect(page).toHaveURL(/\/requests\//)
        await expect(page.getByRole('heading', { name: /detalhes|details/i })).toBeVisible()
      }
    })
  })

  test.describe('Receiving and Managing Quotes', () => {
    test('should display received quotes', async ({ page }) => {
      // Navigate to a request with quotes
      await page.getByRole('link', { name: /minhas solicitações|my requests/i }).click()

      const requestWithQuotes = page.locator('[data-testid="request-card"]').first()
      if (await requestWithQuotes.isVisible()) {
        await requestWithQuotes.click()

        // Should show quotes section
        await expect(page.getByRole('heading', { name: /orçamentos recebidos|received quotes/i })).toBeVisible()
      }
    })

    test('should accept a quote', async ({ page }) => {
      // Navigate to request details with quotes
      await page.getByRole('link', { name: /minhas solicitações|my requests/i }).click()

      const requestCard = page.locator('[data-testid="request-card"]').first()
      if (await requestCard.isVisible()) {
        await requestCard.click()

        // Accept first quote if exists
        const acceptButton = page.getByRole('button', { name: /aceitar orçamento|accept quote/i }).first()
        if (await acceptButton.isVisible()) {
          await acceptButton.click()

          // Should show confirmation dialog
          await expect(page.getByRole('dialog')).toBeVisible()
          await page.getByRole('button', { name: /confirmar|confirm/i }).click()

          // Should show success message
          await expect(page.getByText(/orçamento aceito|quote accepted/i)).toBeVisible()
        }
      }
    })

    test('should reject a quote', async ({ page }) => {
      await page.getByRole('link', { name: /minhas solicitações|my requests/i }).click()

      const requestCard = page.locator('[data-testid="request-card"]').first()
      if (await requestCard.isVisible()) {
        await requestCard.click()

        const rejectButton = page.getByRole('button', { name: /rejeitar|reject/i }).first()
        if (await rejectButton.isVisible()) {
          await rejectButton.click()

          await expect(page.getByText(/orçamento rejeitado|quote rejected/i)).toBeVisible()
        }
      }
    })
  })

  test.describe('Cancelling Service Request', () => {
    test('should cancel a pending service request', async ({ page }) => {
      await page.getByRole('link', { name: /minhas solicitações|my requests/i }).click()

      const pendingRequest = page.locator('[data-testid="request-card"]').first()
      if (await pendingRequest.isVisible()) {
        await pendingRequest.click()

        // Cancel request
        await page.getByRole('button', { name: /cancelar solicitação|cancel request/i }).click()

        // Confirm cancellation
        await expect(page.getByRole('dialog')).toBeVisible()
        await page.getByRole('button', { name: /confirmar|confirm/i }).click()

        // Should show success message
        await expect(page.getByText(/solicitação cancelada|request cancelled/i)).toBeVisible()
      }
    })

    test('should not allow cancellation of in-progress request', async ({ page }) => {
      await page.getByRole('link', { name: /minhas solicitações|my requests/i }).click()

      // Filter by IN_PROGRESS
      await page.getByLabel(/filtrar|filter/i).click()
      await page.getByRole('option', { name: /em andamento|in progress/i }).click()

      const inProgressRequest = page.locator('[data-testid="request-card"]').first()
      if (await inProgressRequest.isVisible()) {
        await inProgressRequest.click()

        // Cancel button should be disabled or not visible
        const cancelButton = page.getByRole('button', { name: /cancelar|cancel/i })
        await expect(cancelButton).toBeDisabled().catch(() => expect(cancelButton).not.toBeVisible())
      }
    })
  })
})

test.describe('Professional Quote Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as professional before each test
    await page.goto('/login')
    await page.getByLabel(/e-mail/i).fill('profissional@example.com')
    await page.getByLabel(/senha/i).fill('profissional123')
    await page.getByRole('button', { name: /entrar/i }).click()
    await expect(page).toHaveURL(/\/dashboard\/professional/)
  })

  test.describe('Viewing Opportunities', () => {
    test('should display available service requests', async ({ page }) => {
      await page.getByRole('link', { name: /oportunidades|opportunities/i }).click()

      // Should show opportunities list
      await expect(page.getByRole('heading', { name: /oportunidades|opportunities/i })).toBeVisible()

      // Should display request cards
      const opportunityCards = page.locator('[data-testid="opportunity-card"]')
      const count = await opportunityCards.count()

      if (count > 0) {
        await expect(opportunityCards.first()).toBeVisible()
      }
    })

    test('should filter opportunities by category', async ({ page }) => {
      await page.getByRole('link', { name: /oportunidades|opportunities/i }).click()

      // Filter by category
      await page.getByLabel(/categoria|category/i).click()
      await page.getByRole('option', { name: /pintura|painting/i }).first().click()

      // Should show filtered results
      await expect(page).toHaveURL(/category=/)
    })

    test('should view opportunity details', async ({ page }) => {
      await page.getByRole('link', { name: /oportunidades|opportunities/i }).click()

      const firstOpportunity = page.locator('[data-testid="opportunity-card"]').first()
      if (await firstOpportunity.isVisible()) {
        await firstOpportunity.click()

        // Should navigate to details page
        await expect(page).toHaveURL(/\/opportunities\//)
        await expect(page.getByRole('heading', { name: /detalhes|details/i })).toBeVisible()
      }
    })
  })

  test.describe('Sending Quotes', () => {
    test('should send a quote successfully', async ({ page }) => {
      await page.getByRole('link', { name: /oportunidades|opportunities/i }).click()

      const opportunity = page.locator('[data-testid="opportunity-card"]').first()
      if (await opportunity.isVisible()) {
        await opportunity.click()

        // Fill quote form
        await page.getByRole('button', { name: /enviar orçamento|send quote/i }).click()

        await page.getByLabel(/preço|price/i).fill('600')
        await page.getByLabel(/descrição|description/i).fill('Realizarei o serviço com materiais de qualidade')
        await page.getByLabel(/prazo|deadline/i).fill('3')

        await page.getByRole('button', { name: /enviar|submit/i }).click()

        // Should show success message
        await expect(page.getByText(/orçamento enviado|quote sent/i)).toBeVisible()
      }
    })

    test('should show validation errors for invalid quote', async ({ page }) => {
      await page.getByRole('link', { name: /oportunidades|opportunities/i }).click()

      const opportunity = page.locator('[data-testid="opportunity-card"]').first()
      if (await opportunity.isVisible()) {
        await opportunity.click()

        await page.getByRole('button', { name: /enviar orçamento|send quote/i }).click()

        // Submit without filling required fields
        await page.getByRole('button', { name: /enviar|submit/i }).click()

        // Should show validation errors
        await expect(page.getByText(/campo obrigatório|required field/i)).toBeVisible()
      }
    })

    test('should reject negative price in quote', async ({ page }) => {
      await page.getByRole('link', { name: /oportunidades|opportunities/i }).click()

      const opportunity = page.locator('[data-testid="opportunity-card"]').first()
      if (await opportunity.isVisible()) {
        await opportunity.click()

        await page.getByRole('button', { name: /enviar orçamento|send quote/i }).click()
        await page.getByLabel(/preço|price/i).fill('-100')
        await page.getByRole('button', { name: /enviar|submit/i }).click()

        // Should show price validation error
        await expect(page.getByText(/preço deve ser positivo|price must be positive/i)).toBeVisible()
      }
    })
  })

  test.describe('Managing Sent Quotes', () => {
    test('should display list of sent quotes', async ({ page }) => {
      await page.getByRole('link', { name: /meus orçamentos|my quotes/i }).click()

      // Should show quotes list
      await expect(page.getByRole('heading', { name: /meus orçamentos|my quotes/i })).toBeVisible()
    })

    test('should filter quotes by status', async ({ page }) => {
      await page.getByRole('link', { name: /meus orçamentos|my quotes/i }).click()

      // Filter by PENDING
      await page.getByLabel(/filtrar|filter/i).click()
      await page.getByRole('option', { name: /pendente|pending/i }).click()

      // Should show filtered results
      await expect(page).toHaveURL(/status=PENDING/)
    })
  })
})

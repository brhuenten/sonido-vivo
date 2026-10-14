import { test, expect } from '@playwright/test'
import { ir, limpiarAlmacenamiento } from './helpers.js'

test.describe('Autenticación', () => {
  test.beforeEach(async ({ page }) => {
    await limpiarAlmacenamiento(page)
  })

  test('redirige al login si se accede al checkout sin sesión', async ({ page }) => {
    await ir(page, '/checkout')
    await expect(page).toHaveURL(/#\/login/, { timeout: 15_000 })
    await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).toBeVisible()
  })

  test('muestra error con credenciales incorrectas', async ({ page }) => {
    await ir(page, '/login')
    await page.getByRole('textbox', { name: /correo/i }).fill('cliente@sonidovivo.cl')
    await page.getByLabel(/contraseña/i).fill('incorrecta')
    await page.getByRole('button', { name: 'Ingresar' }).click()
    await expect(page.getByRole('alert')).toHaveText(/incorrectos/i)
  })

  test('inicia sesión como cliente y muestra el perfil', async ({ page }) => {
    await ir(page, '/login')
    await page.getByRole('textbox', { name: /correo/i }).fill('cliente@sonidovivo.cl')
    await page.getByLabel(/contraseña/i).fill('cliente')
    await page.getByRole('button', { name: 'Ingresar' }).click()
    await expect(page).toHaveURL(/#\/perfil/)
    await expect(page.getByRole('heading', { name: 'Mi perfil' })).toBeVisible()
    await expect(page.getByText('cliente@sonidovivo.cl')).toBeVisible()
  })
})

import { test, expect } from '@playwright/test'
import { ir, limpiarAlmacenamiento, loginCliente } from './helpers.js'

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await limpiarAlmacenamiento(page)
  })

  test('confirma compra con retiro en tienda y vacía el carrito', async ({ page }) => {
    await loginCliente(page)

    await page.getByRole('link', { name: 'Inicio' }).click()
    await expect(page.getByRole('heading', { name: 'Bienvenido a Sonido Vivo' })).toBeVisible()
    await page.getByRole('button', { name: 'Agregar al Carrito' }).first().click()
    await expect(page.getByRole('dialog', { name: /carrito/i })).toBeVisible()
    await page.getByRole('button', { name: 'Pagar' }).click()
    await expect(page).toHaveURL(/#\/checkout/)

    await page.getByRole('radio', { name: 'Retiro en tienda' }).check()
    await page.getByPlaceholder('+56 9 1234 5678').fill('912345678')
    await page.getByRole('button', { name: 'Revisar y confirmar compra' }).click()

    await expect(page).toHaveURL(/#\/checkout\/confirmacion/)
    await expect(page.getByRole('heading', { name: '¡Compra confirmada!' })).toBeVisible()

    await ir(page, '/checkout')
    await expect(page.getByText(/carrito está vacío/i)).toBeVisible()
  })
})

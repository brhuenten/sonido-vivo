import { test, expect } from '@playwright/test'
import { limpiarAlmacenamiento } from './helpers.js'

test.describe('Catálogo', () => {
  test.beforeEach(async ({ page }) => {
    await limpiarAlmacenamiento(page)
  })

  test('muestra productos en la página de inicio', async ({ page }) => {
    await page.goto('/#/')
    await expect(page.getByRole('heading', { name: 'Bienvenido a Sonido Vivo' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Agregar al Carrito' }).first()).toBeVisible()
  })

  test('abre el detalle de un producto desde el catálogo', async ({ page }) => {
    await page.goto('/#/')
    await page
      .getByRole('link', { name: 'Guitarra Acústica Folk Yamaha' })
      .first()
      .click()
    await expect(page).toHaveURL(/#\/products\/1/)
    await expect(
      page.getByRole('heading', { name: 'Guitarra Acústica Folk Yamaha' }),
    ).toBeVisible()
  })
})

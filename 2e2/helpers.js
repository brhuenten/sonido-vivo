/** @param {import('@playwright/test').Page} page */
export async function limpiarAlmacenamiento(page) {
  await page.goto('/#/', { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'domcontentloaded' })
}

/** @param {import('@playwright/test').Page} page */
export async function loginCliente(page) {
  await page.goto('/#/login')
  await page.getByRole('textbox', { name: /correo/i }).fill('cliente@sonidovivo.cl')
  await page.getByLabel(/contraseña/i).fill('cliente')
  await page.getByRole('button', { name: 'Ingresar' }).click()
  await page.waitForURL(/#\/perfil/)
}

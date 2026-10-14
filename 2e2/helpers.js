/** @param {import('@playwright/test').Page} page */
export async function ir(page, ruta = '/') {
  const path = ruta.startsWith('/') ? ruta : `/${ruta}`
  await page.goto(path === '/' ? '/#/' : `/#${path}`, { waitUntil: 'domcontentloaded' })
}

/** @param {import('@playwright/test').Page} page */
export async function limpiarAlmacenamiento(page) {
  await ir(page, '/')
  await page.evaluate(() => localStorage.clear())
  await page.reload({ waitUntil: 'domcontentloaded' })
}

/** @param {import('@playwright/test').Page} page */
export async function loginCliente(page) {
  await ir(page, '/login')
  await page.getByRole('textbox', { name: /correo/i }).waitFor({ state: 'visible' })
  await page.getByRole('textbox', { name: /correo/i }).fill('cliente@sonidovivo.cl')
  await page.getByLabel(/contraseña/i).fill('cliente')
  await page.getByRole('button', { name: 'Ingresar' }).click()
  await page.waitForURL(/#\/perfil/)
}

import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll } from 'vitest'

function crearAlmacenLocal() {
  const store = new Map()
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => {
      store.set(key, String(value))
    },
    removeItem: (key) => {
      store.delete(key)
    },
    clear: () => {
      store.clear()
    },
  }
}

beforeAll(() => {
  const almacen = crearAlmacenLocal()
  Object.defineProperty(globalThis, 'localStorage', {
    value: almacen,
    writable: true,
    configurable: true,
  })
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

import { useContext } from 'react'
import { CartDrawerContext } from '../context/cart-drawer-context.js'

export function useCartDrawer() {
  const context = useContext(CartDrawerContext)
  if (!context) {
    throw new Error('useCartDrawer debe usarse dentro de CartDrawerProvider')
  }
  return context
}

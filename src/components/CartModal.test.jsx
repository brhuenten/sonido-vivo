import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CartModal from './CartModal.jsx'
import { useCartDrawer } from '../hooks/useCartDrawer.js'
import { renderWithProviders } from '../test/renderWithProviders.jsx'

function AbrirCarritoProbe() {
  const { abrirPanel } = useCartDrawer()
  return (
    <>
      <button type="button" onClick={abrirPanel}>
        Abrir
      </button>
      <CartModal />
    </>
  )
}

describe('CartModal', () => {
  it('no renderiza el modal cuando el drawer está cerrado', () => {
    renderWithProviders(<CartModal />)
    expect(screen.queryByRole('dialog', { name: /carrito/i })).not.toBeInTheDocument()
  })

  it('muestra el modal cuando se abre el panel', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AbrirCarritoProbe />)
    await user.click(screen.getByRole('button', { name: 'Abrir' }))
    expect(screen.getByRole('dialog', { name: /carrito/i })).toBeInTheDocument()
    expect(screen.getByText('Mi Carrito')).toBeInTheDocument()
    expect(screen.getByText('El carrito está vacío.')).toBeInTheDocument()
  })

  it('cierra el carrito al pulsar Cerrar panel', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AbrirCarritoProbe />)
    await user.click(screen.getByRole('button', { name: 'Abrir' }))
    await user.click(screen.getByRole('button', { name: 'Cerrar panel' }))
    expect(screen.queryByRole('dialog', { name: /carrito/i })).not.toBeInTheDocument()
  })
})

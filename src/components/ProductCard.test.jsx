import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from './ProductCard.jsx'
import CartModal from './CartModal.jsx'
import { renderWithProviders } from '../test/renderWithProviders.jsx'
import { productoMock } from '../test/productoMock.js'

describe('ProductCard', () => {
  it('renderiza título y botón de agregar', () => {
    renderWithProviders(<ProductCard producto={productoMock} />)
    expect(screen.getByText('Guitarra de prueba')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /agregar al carrito/i })).toBeInTheDocument()
  })

  it('muestra props del producto (código, stock y precio)', () => {
    renderWithProviders(<ProductCard producto={productoMock} />)
    expect(screen.getByText(/Cód: TEST01/)).toBeInTheDocument()
    expect(screen.getByText(/Stock: 3/)).toBeInTheDocument()
    expect(screen.getByText(/CLP \$100\.000/)).toBeInTheDocument()
  })

  it('al hacer click en Agregar al Carrito abre el panel y agrega el producto', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <>
        <ProductCard producto={productoMock} />
        <CartModal />
      </>,
    )
    await user.click(screen.getByRole('button', { name: /agregar al carrito/i }))
    const dialogo = screen.getByRole('dialog', { name: /carrito/i })
    expect(dialogo).toBeInTheDocument()
    expect(dialogo).toHaveTextContent('Guitarra de prueba')
    expect(dialogo).toHaveTextContent('Cód: TEST01')
  })
})

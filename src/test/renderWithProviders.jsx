import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import CartProviders from '../context/CartProviders.jsx'

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <CartProviders>{ui}</CartProviders>
    </MemoryRouter>,
  )
}

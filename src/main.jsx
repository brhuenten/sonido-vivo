import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CartProviders from './context/CartProviders.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <CartProviders>
        <App />
      </CartProviders>
    </HashRouter>
  </StrictMode>,
)

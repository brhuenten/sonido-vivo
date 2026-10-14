import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CartProviders from './context/CartProviders.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const routerBasename =
  import.meta.env.BASE_URL === './'
    ? undefined
    : import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter basename={routerBasename}>
      <AuthProvider>
        <CartProviders>
          <App />
        </CartProviders>
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
)

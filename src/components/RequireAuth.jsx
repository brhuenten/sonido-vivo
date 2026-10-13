import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function RequireAuth({ adminOnly = false }) {
  const { estaLogueado, cargando, esAdmin } = useAuth()
  const location = useLocation()

  if (cargando) {
    return (
      <div className="flex-grow container mx-auto px-4 py-16 text-center text-scampi font-medium">
        Cargando sesión…
      </div>
    )
  }

  if (!estaLogueado) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (adminOnly && !esAdmin) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

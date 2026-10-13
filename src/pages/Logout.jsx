import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function Logout() {
  const { cerrarSesion } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    cerrarSesion().then(() => {
      navigate('/login', { replace: true })
    })
  }, [cerrarSesion, navigate])

  return (
    <div className="flex-grow container mx-auto px-4 py-16 text-center text-scampi font-medium">
      Cerrando sesión…
    </div>
  )
}

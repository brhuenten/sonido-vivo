import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const inputClass =
  'w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet'

export default function Login() {
  const { estaLogueado, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.from ?? '/perfil'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  if (estaLogueado) return <Navigate to={destino} replace />

  function cambiar(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function enviar(event) {
    event.preventDefault()
    setError(null)
    setEnviando(true)
    try {
      await login(form.email, form.password)
      navigate(destino, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="flex-grow container mx-auto px-4 py-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full max-w-md">
        <h2 className="text-2xl font-bold text-scampi mb-6 text-center border-b pb-3">
          Iniciar Sesión
        </h2>

        <form onSubmit={enviar} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Email
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={cambiar}
                placeholder="ejemplo@dominio.com"
                className={`${inputClass} mt-1`}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Contraseña
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={cambiar}
                placeholder="••••••••"
                className={`${inputClass} mt-1`}
              />
            </label>
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-bittersweet hover:bg-bittersweet/90 disabled:opacity-60 text-white font-bold py-2.5 rounded transition shadow mt-4 cursor-pointer"
          >
            {enviando ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/registro" className="text-bittersweet font-semibold hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}

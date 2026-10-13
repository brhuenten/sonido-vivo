import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const inputClass =
  'w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet'

export default function Registro() {
  const { estaLogueado, registrar } = useAuth()
  const navigate = useNavigate()

  const [run, setRun] = useState('')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [pass, setPass] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  if (estaLogueado) {
    return <Navigate to="/perfil" replace />
  }

  async function handleRegistro(e) {
    e.preventDefault()

    const runLimpio = run.trim()
    const nombreLimpio = nombre.trim()
    const correoLimpio = correo.trim()
    const newErrors = {}

    if (!/^[0-9]{7,8}[0-9kK]{1}$/.test(runLimpio)) {
      newErrors.run =
        'Formato de RUT inválido (entre 7 y 8 dígitos + dígito verificador, sin puntos ni guión).'
    }
    if (nombreLimpio.length < 2) {
      newErrors.nombre = 'Debes ingresar tu nombre completo.'
    }
    if (!/^[\w.-]+@[\w-]+\.[\w-]{2,}$/i.test(correoLimpio)) {
      newErrors.correo =
        'Por favor ingresa un formato de correo electrónico válido (ejemplo@dominio.com).'
    }
    if (pass.length < 4 || pass.length > 10) {
      newErrors.pass = 'La contraseña debe tener entre 4 y 10 caracteres.'
    }
    if (pass !== confirmar) {
      newErrors.confirmar = 'Las contraseñas no coinciden.'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setError(null)
    setEnviando(true)
    try {
      await registrar({
        run: runLimpio,
        nombre: nombreLimpio,
        email: correoLimpio,
        password: pass,
      })
      navigate('/perfil', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="flex-grow container mx-auto px-4 py-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full max-w-lg">
        <h2 className="text-2xl font-bold text-scampi mb-6 text-center border-b pb-3">
          Registro de Usuario
        </h2>

        <form onSubmit={handleRegistro} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">RUT:</label>
            <input
              type="text"
              value={run}
              onChange={(e) => setRun(e.target.value)}
              placeholder="Ej: 19876543k"
              className={inputClass}
            />
            {errors.run && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.run}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Nombre Completo:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu Nombre"
              className={inputClass}
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Correo Electrónico:
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@dominio.com"
              className={inputClass}
            />
            {errors.correo && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.correo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Contraseña:
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
            {errors.pass && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.pass}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Repetir contraseña:
            </label>
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
            {errors.confirmar && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmar}</p>
            )}
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
            {enviando ? 'Creando…' : 'Crear Cuenta'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-bittersweet font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}

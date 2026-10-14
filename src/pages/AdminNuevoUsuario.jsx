import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

const claseInput =
  'w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet'

export default function AdminNuevoUsuario() {
  const { crearUsuarioDesdeAdmin } = useAuth()
  const navigate = useNavigate()

  const [run, setRun] = useState('')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [rol, setRol] = useState('cliente')
  const [pass, setPass] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const [enviando, setEnviando] = useState(false)

  async function enviarFormulario(e) {
    e.preventDefault()

    const runLimpio = run.trim()
    const nombreLimpio = nombre.trim()
    const correoLimpio = correo.trim()
    const erroresValidacion = {}

    if (!/^[0-9]{7,8}[0-9kK]{1}$/.test(runLimpio)) {
      erroresValidacion.run =
        'Formato de RUT inválido (entre 7 y 8 dígitos + dígito verificador, sin puntos ni guión).'
    }
    if (nombreLimpio.length < 2) {
      erroresValidacion.nombre = 'Debes ingresar el nombre completo.'
    }
    if (!/^[\w.-]+@[\w-]+\.[\w-]{2,}$/i.test(correoLimpio)) {
      erroresValidacion.correo =
        'Por favor ingresa un formato de correo electrónico válido (ejemplo@dominio.com).'
    }
    if (!['trabajador', 'cliente'].includes(rol)) {
      erroresValidacion.rol = 'Selecciona un rol válido.'
    }
    if (pass.length < 4 || pass.length > 10) {
      erroresValidacion.pass = 'La contraseña debe tener entre 4 y 10 caracteres.'
    }
    if (pass !== confirmar) {
      erroresValidacion.confirmar = 'Las contraseñas no coinciden.'
    }

    setErrors(erroresValidacion)
    if (Object.keys(erroresValidacion).length > 0) return

    setError(null)
    setEnviando(true)
    try {
      const creado = await crearUsuarioDesdeAdmin({
        run: runLimpio,
        nombre: nombreLimpio,
        email: correoLimpio,
        password: pass,
        rol,
      })
      navigate('/admin', {
        replace: true,
        state: {
          mensajeExito: `Usuario "${creado.nombre}" registrado como ${creado.rol}.`,
        },
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="flex-grow container mx-auto px-4 py-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full max-w-lg">
        <h2 className="text-2xl font-bold text-scampi mb-2 text-center border-b pb-3">
          Nuevo Usuario
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Registra una cuenta de trabajador o cliente y asigna su rol.
        </p>

        <form onSubmit={enviarFormulario} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">RUT:</label>
            <input
              type="text"
              value={run}
              onChange={(e) => setRun(e.target.value)}
              placeholder="Ej: 19876543k"
              className={claseInput}
            />
            {errors.run && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.run}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Nombre completo:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del usuario"
              className={claseInput}
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Correo electrónico:
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@dominio.com"
              className={claseInput}
            />
            {errors.correo && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.correo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">Rol:</label>
            <select
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className={claseInput}
            >
              <option value="cliente">Cliente</option>
              <option value="trabajador">Trabajador</option>
            </select>
            {errors.rol && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.rol}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">Contraseña:</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              className={claseInput}
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
              className={claseInput}
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
            {enviando ? 'Registrando…' : 'Registrar usuario'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          <Link to="/admin" className="text-bittersweet font-semibold hover:underline">
            Volver al panel de administración
          </Link>
        </p>
      </div>
    </div>
  )
}

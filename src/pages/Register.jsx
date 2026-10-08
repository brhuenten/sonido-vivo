import { useState } from 'react'

export default function Register({ onNavigate }) {
  const [run, setRun] = useState('')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [pass, setPass] = useState('')
  const [errors, setErrors] = useState({})

  const handleRegistro = (e) => {
    e.preventDefault()

    const runLimpio = run.trim()
    const nombreLimpio = nombre.trim()
    const correoLimpio = correo.trim()
    const newErrors = {}

    // Validar RUT (7 a 8 dígitos + dígito verificador 0-9 o K)
    if (!/^[0-9]{7,8}[0-9kK]{1}$/.test(runLimpio)) {
      newErrors.run = 'Formato de RUT inválido (entre 7 y 8 dígitos + dígito verificador, sin puntos ni guión).'
    }

    // Validar Nombre Completo (al menos 2 caracteres)
    if (nombreLimpio.length < 2) {
      newErrors.nombre = 'Debes ingresar tu nombre completo.'
    }

    // Validar Correo Electrónico
    if (!/^[\w.-]+@[\w-]+\.[\w-]{2,}$/i.test(correoLimpio)) {
      newErrors.correo = 'Por favor ingresa un formato de correo electrónico válido (ejemplo@dominio.com).'
    }

    // Validar Contraseña (entre 4 y 10 caracteres)
    if (pass.length < 4 || pass.length > 10) {
      newErrors.pass = 'La contraseña debe tener entre 4 y 10 caracteres.'
    }

    setErrors(newErrors)

    // Si no hay errores, se completa el registro
    if (Object.keys(newErrors).length === 0) {
      alert('¡Registro completado con éxito!')
      if (onNavigate) onNavigate('login') // Redirige a la vista de Login
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto my-10">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue">
        <h2 className="text-2xl font-bold text-scampi mb-6 text-center border-b pb-3">
          Registro de Usuario
        </h2>

        <form onSubmit={handleRegistro} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              RUT:
            </label>
            <input
              type="text"
              value={run}
              onChange={(e) => setRun(e.target.value)}
              placeholder="Ej: 19876543k"
              className="w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet"
            />
            {errors.run && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.run}
              </p>
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
              className="w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.nombre}
              </p>
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
              className="w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet"
            />
            {errors.correo && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.correo}
              </p>
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
              className="w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet"
            />
            {errors.pass && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.pass}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-bittersweet hover:bg-bittersweet/90 text-white font-bold py-2.5 rounded transition shadow mt-4 cursor-pointer"
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  )
}
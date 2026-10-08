import { useState } from 'react'

export default function Login({ onNavigate }) {
  const [correo, setCorreo] = useState('')
  const [pass, setPass] = useState('')
  const [errors, setErrors] = useState({})

  const handleLogin = (e) => {
    e.preventDefault()

    const correoLimpio = correo.trim()
    const passLimpia = pass.trim()
    const newErrors = {}

    // Expresión regular exacta de tu JS original
    const regexCorreo = /^[\w-.]+@[\w-]+\.[\w-]{2,}$/i

    // Validar Correo
    if (!regexCorreo.test(correoLimpio)) {
      newErrors.correo = 'Por favor ingresa un formato de correo válido (ejemplo@dominio.com).'
    }

    // Validar Contraseña (entre 4 y 10 caracteres)
    if (passLimpia.length < 4 || passLimpia.length > 10) {
      newErrors.pass = 'La contraseña debe contener entre 4 y 10 caracteres.'
    }

    setErrors(newErrors)

    // Si todo es válido (equivale a esValido === true)
    if (Object.keys(newErrors).length === 0) {
      alert('¡Inicio de sesión exitoso!')
      if (onNavigate) onNavigate('home') // Equivale a window.location.href = 'index.html'
    }
  }

  return (
    <div className="w-full max-w-md mx-auto my-10">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue">
        <h2 className="text-2xl font-bold text-scampi mb-6 text-center border-b pb-3">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin} className="space-y-4" noValidate>
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
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
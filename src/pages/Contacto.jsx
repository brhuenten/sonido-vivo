import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Contacto() {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [asunto, setAsunto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [errors, setErrors] = useState({})

  const handleContacto = (e) => {
    e.preventDefault()

    const nombreLimpio = nombre.trim()
    const correoLimpio = correo.trim()
    const asuntoLimpio = asunto.trim()
    const mensajeLimpio = mensaje.trim()

    const newErrors = {}

    // Validar Nombre (mínimo 3 caracteres)
    if (nombreLimpio.length < 3) {
      newErrors.nombre = 'Por favor ingresa tu nombre (mínimo 3 caracteres).'
    }

    // Validar Correo Electrónico
    if (!/^[\w-.]+@[\w-]+\.[\w-]{2,}$/i.test(correoLimpio)) {
      newErrors.correo = 'Por favor ingresa un correo válido (ejemplo@dominio.com).'
    }

    // Validar Asunto (mínimo 4 caracteres)
    if (asuntoLimpio.length < 4) {
      newErrors.asunto = 'El asunto no puede estar vacío (mínimo 4 caracteres).'
    }

    // Validar Mensaje (mínimo 10 caracteres)
    if (mensajeLimpio.length < 10) {
      newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    }

    setErrors(newErrors)

    // Si no hay errores, enviar formulario
    if (Object.keys(newErrors).length === 0) {
      alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.')
      setNombre('')
      setCorreo('')
      setAsunto('')
      setMensaje('')
      navigate('/') // Redirige al inicio tras enviar
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto my-10">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue">
        <h2 className="text-2xl font-bold text-scampi mb-6 text-center border-b pb-3">
          Contáctanos
        </h2>

        <form onSubmit={handleContacto} className="space-y-4" noValidate>
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
              Asunto:
            </label>
            <input
              type="text"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              placeholder="Motivo de tu consulta"
              className="w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet"
            />
            {errors.asunto && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.asunto}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Mensaje:
            </label>
            <textarea
              rows="4"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              className="w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet"
            ></textarea>
            {errors.mensaje && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {errors.mensaje}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-bittersweet hover:bg-bittersweet/90 text-white font-bold py-2.5 rounded transition shadow mt-4 cursor-pointer"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  )
}
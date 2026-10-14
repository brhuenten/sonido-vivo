import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { USUARIOS_STORAGE_KEY } from '../service/Auth.js'

export default function AdminMostrarUsuario() {
  const { id } = useParams()
  const { obtenerUsuarioPorId } = useAuth()

  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [noEncontrado, setNoEncontrado] = useState(false)

  useEffect(() => {
    let activo = true

    function cargar() {
      setCargando(true)
      obtenerUsuarioPorId(id)
        .then((datos) => {
          if (!activo) return
          if (!datos) {
            setNoEncontrado(true)
            setUsuario(null)
            return
          }
          setNoEncontrado(false)
          setUsuario(datos)
        })
        .finally(() => {
          if (activo) setCargando(false)
        })
    }

    cargar()

    function alCambiarAlmacenamiento(evento) {
      if (evento.key !== USUARIOS_STORAGE_KEY || evento.storageArea !== localStorage) return
      cargar()
    }

    window.addEventListener('storage', alCambiarAlmacenamiento)
    return () => {
      activo = false
      window.removeEventListener('storage', alCambiarAlmacenamiento)
    }
  }, [id, obtenerUsuarioPorId])

  if (noEncontrado) {
    return <Navigate to="/admin/usuarios" replace />
  }

  if (cargando) {
    return (
      <div className="flex-grow container mx-auto px-4 py-10 flex justify-center items-center">
        <p className="text-sm text-gray-600">Cargando ficha del usuario…</p>
      </div>
    )
  }

  if (!usuario) return null

  return (
    <div className="flex-grow container mx-auto px-4 py-10 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full max-w-lg">
        <h2 className="text-2xl font-bold text-scampi mb-2 text-center border-b pb-3">
          Mostrar Usuario
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Detalle del perfil del usuario seleccionado.
        </p>

        <dl className="space-y-4 text-sm">
          <div>
            <dt className="font-semibold text-scampi">ID</dt>
            <dd className="text-gray-700 mt-0.5 font-mono text-xs break-all">{usuario.id}</dd>
          </div>
          <div>
            <dt className="font-semibold text-scampi">Nombre</dt>
            <dd className="text-gray-700 mt-0.5">{usuario.nombre}</dd>
          </div>
          <div>
            <dt className="font-semibold text-scampi">RUT</dt>
            <dd className="text-gray-700 mt-0.5 uppercase">{usuario.run}</dd>
          </div>
          <div>
            <dt className="font-semibold text-scampi">Correo</dt>
            <dd className="text-gray-700 mt-0.5">{usuario.email}</dd>
          </div>
          <div>
            <dt className="font-semibold text-scampi">Rol</dt>
            <dd className="text-gray-700 mt-0.5 capitalize">{usuario.rol}</dd>
          </div>
        </dl>

        <p className="mt-6 text-xs text-gray-500 border-t border-poloblue/40 pt-4">
          El historial de actividad no está disponible en esta versión (requiere backend).
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to={`/admin/usuarios/${usuario.id}/editar`}
            className="flex-1 text-center bg-bittersweet hover:bg-bittersweet/90 text-white font-bold py-2.5 rounded transition shadow"
          >
            Editar usuario
          </Link>
          <Link
            to="/admin/usuarios"
            className="flex-1 text-center border border-scampi text-scampi font-bold py-2.5 rounded hover:bg-scampi/5 transition"
          >
            Volver al listado
          </Link>
        </div>
      </div>
    </div>
  )
}

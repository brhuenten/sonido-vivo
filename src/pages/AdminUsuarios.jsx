import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as auth from '../service/Auth.js'

export default function AdminUsuarios() {
  const location = useLocation()
  const mensajeExito = location.state?.mensajeExito

  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true
    auth
      .listarUsuariosAdmin()
      .then((lista) => {
        if (activo) setUsuarios(lista)
      })
      .catch((err) => {
        if (activo) setError(err.message ?? 'No se pudo cargar la lista.')
      })
      .finally(() => {
        if (activo) setCargando(false)
      })
    return () => {
      activo = false
    }
  }, [])

  return (
    <div className="flex-grow container mx-auto px-4 py-10 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-scampi">Usuarios registrados</h2>
          <Link
            to="/admin/usuarios/nuevo"
            className="text-center bg-scampi hover:bg-scampi/90 text-white font-bold py-2 px-4 rounded transition text-sm"
          >
            Nuevo Usuario
          </Link>
        </div>

        {mensajeExito && (
          <p
            className="mb-6 p-3 rounded border border-green-200 bg-green-50 text-green-800 text-sm"
            role="status"
          >
            {mensajeExito}
          </p>
        )}

        {error && (
          <p className="text-red-500 text-sm font-medium mb-4" role="alert">
            {error}
          </p>
        )}

        {cargando ? (
          <p className="text-sm text-gray-600 text-center py-8">Cargando usuarios…</p>
        ) : usuarios.length === 0 ? (
          <p className="text-sm text-gray-600 text-center py-8">No hay usuarios registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-poloblue text-left text-scampi">
                  <th className="py-2 pr-3 font-semibold">Nombre</th>
                  <th className="py-2 pr-3 font-semibold">Correo</th>
                  <th className="py-2 pr-3 font-semibold">Rol</th>
                  <th className="py-2 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="border-b border-poloblue/40">
                    <td className="py-3 pr-3 text-gray-800">{u.nombre}</td>
                    <td className="py-3 pr-3 text-gray-700">{u.email}</td>
                    <td className="py-3 pr-3 capitalize text-gray-700">{u.rol}</td>
                    <td className="py-3 text-right">
                      <Link
                        to={`/admin/usuarios/${u.id}/editar`}
                        className="text-bittersweet font-semibold hover:underline"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-center text-sm text-gray-600 mt-8">
          <Link to="/admin" className="text-bittersweet font-semibold hover:underline">
            Volver al panel de administración
          </Link>
        </p>
      </div>
    </div>
  )
}

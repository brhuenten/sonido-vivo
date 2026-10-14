import { useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { USUARIOS_STORAGE_KEY, obtenerUsuariosAlmacenados } from '../service/Auth.js'

function sinPassword(usuario) {
  if (!usuario) return null
  const { password: _omit, ...resto } = usuario
  return resto
}

export default function AdminUsuarios() {
  const location = useLocation()
  const mensajeExito = location.state?.mensajeExito

  const [usuariosAlmacenados, , syncFromStorage] = useLocalStorage(
    USUARIOS_STORAGE_KEY,
    obtenerUsuariosAlmacenados,
  )

  useEffect(() => {
    syncFromStorage()
  }, [location.pathname, location.key, syncFromStorage])

  const usuarios = useMemo(() => {
    if (!Array.isArray(usuariosAlmacenados)) return []
    return usuariosAlmacenados.map(sinPassword).filter(Boolean)
  }, [usuariosAlmacenados])

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

        {usuarios.length === 0 ? (
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
                    <td className="py-3 text-right space-x-3">
                      <Link
                        to={`/admin/usuarios/${u.id}`}
                        className="text-scampi font-semibold hover:underline"
                      >
                        Ver
                      </Link>
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

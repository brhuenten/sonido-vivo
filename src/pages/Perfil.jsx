import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Perfil() {
  const { usuario } = useAuth()

  if (!usuario) return null

  return (
    <div className="flex-grow container mx-auto px-4 py-10 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full max-w-lg">
        <h2 className="text-2xl font-bold text-scampi mb-6 text-center border-b pb-3">
          Mi perfil
        </h2>

        <dl className="space-y-4 text-sm">
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

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          {usuario.rol === 'admin' && (
            <Link
              to="/admin"
              className="flex-1 text-center bg-scampi hover:bg-scampi/90 text-white font-bold py-2.5 rounded transition shadow"
            >
              Panel admin
            </Link>
          )}
          <Link
            to="/logout"
            className="flex-1 text-center bg-bittersweet hover:bg-bittersweet/90 text-white font-bold py-2.5 rounded transition shadow"
          >
            Cerrar sesión
          </Link>
        </div>
      </div>
    </div>
  )
}

import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function Admin() {
  const { usuario } = useAuth()
  const location = useLocation()
  const mensajeExito = location.state?.mensajeExito

  return (
    <div className="flex-grow container mx-auto px-4 py-10 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-scampi mb-2 text-center border-b pb-3">
          Panel de administración
        </h2>
        <p className="text-sm text-gray-600 text-center mb-8">
          Bienvenido, {usuario?.nombre}. Desde aquí puedes gestionar la tienda Sonido Vivo.
        </p>

        {mensajeExito && (
          <p
            className="mb-6 p-3 rounded border border-green-200 bg-green-50 text-green-800 text-sm text-center"
            role="status"
          >
            {mensajeExito}
          </p>
        )}

        <ul className="space-y-3 text-sm">
          <li className="p-4 rounded border border-poloblue bg-azalea/20">
            <span className="font-semibold text-scampi">Inventario:</span>{' '}
            revisar stock y productos destacados.
          </li>
          <li className="p-4 rounded border border-poloblue bg-azalea/20">
            <span className="font-semibold text-scampi">Pedidos:</span>{' '}
            consultar compras recientes de clientes.
          </li>
          <li className="p-4 rounded border border-poloblue bg-azalea/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span>
              <span className="font-semibold text-scampi">Usuarios:</span>{' '}
              administrar cuentas registradas en la plataforma.
            </span>
            <Link
              to="/admin/usuarios/nuevo"
              className="shrink-0 text-center bg-scampi hover:bg-scampi/90 text-white font-bold py-2 px-4 rounded transition text-sm"
            >
              Nuevo Usuario
            </Link>
          </li>
        </ul>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to="/perfil"
            className="flex-1 text-center border border-scampi text-scampi font-bold py-2.5 rounded hover:bg-scampi/5 transition"
          >
            Volver al perfil
          </Link>
          <Link
            to="/"
            className="flex-1 text-center bg-bittersweet hover:bg-bittersweet/90 text-white font-bold py-2.5 rounded transition shadow"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

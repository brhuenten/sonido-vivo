import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { validarDatosCheckout } from '../service/checkout.js';

function numeroPedidoSimulado() {
  return `SV-${Date.now().toString(36).toUpperCase().slice(-8)}`;
}

export default function CheckoutConfirmacion() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const pedidoConfirmado = useRef(false);

  const checkout = location.state?.checkout;
  const errores = checkout ? validarDatosCheckout(checkout) : { general: 'No hay datos de checkout.' };
  const esValido = Object.keys(errores).length === 0;

  useEffect(() => {
    if (!esValido || pedidoConfirmado.current) return;
    pedidoConfirmado.current = true;
    clearCart();
  }, [esValido, clearCart]);

  if (!esValido) {
    return (
      <div className="flex-grow container mx-auto px-4 py-10 flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl border border-red-300 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">No se pudo confirmar la compra</h2>
          <p className="text-gray-700 text-sm mb-4 text-center">
            Completa el checkout con tu dirección o retiro en tienda antes de llegar a esta página.
          </p>
          <ul className="text-sm text-red-600 space-y-1 mb-6 list-disc list-inside">
            {Object.entries(errores).map(([key, msg]) => (
              <li key={key}>{msg}</li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/checkout"
              className="flex-1 text-center bg-bittersweet hover:bg-bittersweet/90 text-white font-bold py-2.5 rounded transition shadow"
            >
              Volver al checkout
            </Link>
            <Link
              to="/"
              className="flex-1 text-center bg-poloblue hover:bg-poloblue/80 text-white font-bold py-2.5 rounded transition shadow"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const numeroPedido = numeroPedidoSimulado();
  const esRetiro = checkout.metodoEntrega === 'retiro';

  return (
    <div className="flex-grow container mx-auto px-4 py-10 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full max-w-lg">
        <div className="text-center mb-6">
          <p className="text-4xl mb-2" aria-hidden="true">
            ✓
          </p>
          <h2 className="text-2xl font-bold text-scampi">¡Compra confirmada!</h2>
        </div>

        <dl className="space-y-3 text-sm border border-poloblue rounded-lg p-4 mb-6">
          <div className="flex justify-between gap-4">
            <dt className="font-semibold text-scampi">Nº pedido</dt>
            <dd className="text-gray-800 font-mono">{numeroPedido}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-semibold text-scampi">Cliente</dt>
            <dd className="text-gray-700 text-right">{checkout.cliente}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-semibold text-scampi">Entrega</dt>
            <dd className="text-gray-700 text-right">{esRetiro ? 'Retiro en tienda' : 'Envío a domicilio'}</dd>
          </div>
          <div>
            <dt className="font-semibold text-scampi">{esRetiro ? 'Lugar de retiro' : 'Dirección'}</dt>
            <dd className="text-gray-700 mt-0.5">
              {checkout.direccion}
              {!esRetiro && (
                <>
                  , {checkout.comuna}, {checkout.ciudad}
                </>
              )}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-semibold text-scampi">Teléfono</dt>
            <dd className="text-gray-700">{checkout.telefono}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-poloblue pt-3 font-bold">
            <dt className="text-scampi">Total pagado</dt>
            <dd className="text-bittersweet">${checkout.total.toLocaleString('es-CL')}</dd>
          </div>
        </dl>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-scampi mb-2">Productos</h3>
          <ul className="space-y-2 text-sm">
            {checkout.items.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-700">
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span className="font-medium">${(item.price * item.quantity).toLocaleString('es-CL')}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-scampi hover:bg-scampi/90 text-white font-bold py-2.5 rounded transition shadow"
          >
            Seguir comprando
          </button>
          <Link
            to="/perfil"
            className="flex-1 text-center bg-poloblue hover:bg-poloblue/80 text-white font-bold py-2.5 rounded transition shadow"
          >
            Mi perfil
          </Link>
        </div>
      </div>
    </div>
  );
}

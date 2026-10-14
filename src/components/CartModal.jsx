import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { useCartDrawer } from '../hooks/useCartDrawer.js';

export default function CartModal() {
  const navigate = useNavigate();
  const { articulos, total, quitarDelCarrito, actualizarCantidad } = useCart();
  const { estaAbierto, cerrarPanel } = useCartDrawer();

  if (!estaAbierto) return null;

  function irAPagar() {
    cerrarPanel();
    navigate('/checkout');
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      <button
        type="button"
        aria-label="Cerrar carrito"
        className="absolute inset-0 bg-black/50"
        onClick={cerrarPanel}
      />

      <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl border-l-2 border-scampi">
        <div className="flex items-center justify-between border-b border-poloblue px-6 py-4">
          <h3 className="text-xl font-bold text-scampi">Mi Carrito</h3>
          <button
            type="button"
            onClick={cerrarPanel}
            className="text-scampi hover:text-bittersweet font-bold text-lg leading-none px-2"
            aria-label="Cerrar panel"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {articulos.length === 0 ? (
            <p className="text-gray-500 text-center py-8">El carrito está vacío.</p>
          ) : (
            articulos.map((articulo) => (
              <div key={articulo.id} className="border border-poloblue rounded-lg p-3 space-y-2">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="font-semibold text-scampi text-sm">{articulo.title}</p>
                    <p className="text-xs text-gray-500">Cód: {articulo.code}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => quitarDelCarrito(articulo.id)}
                    className="text-xs text-red-600 hover:underline shrink-0"
                  >
                    Quitar
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => actualizarCantidad(articulo.id, articulo.quantity - 1)}
                      className="w-8 h-8 rounded border border-poloblue text-scampi font-bold hover:bg-poloblue/20"
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold text-scampi w-6 text-center">{articulo.quantity}</span>
                    <button
                      type="button"
                      onClick={() => actualizarCantidad(articulo.id, articulo.quantity + 1)}
                      disabled={articulo.quantity >= articulo.stock}
                      className="w-8 h-8 rounded border border-poloblue text-scampi font-bold hover:bg-poloblue/20 disabled:opacity-40"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-bittersweet text-sm">
                    ${(articulo.price * articulo.quantity).toLocaleString('es-CL')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-poloblue px-6 py-4 space-y-4 bg-azalea/20">
          <div className="flex justify-between items-center font-bold text-lg">
            <span className="text-scampi">Total:</span>
            <span className="text-bittersweet">${total.toLocaleString('es-CL')}</span>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={cerrarPanel}
              className="w-1/2 bg-poloblue text-white py-2.5 rounded font-semibold hover:bg-poloblue/80 transition"
            >
              Seguir comprando
            </button>
            <button
              type="button"
              onClick={irAPagar}
              disabled={articulos.length === 0}
              className="w-1/2 bg-bittersweet text-white py-2.5 rounded font-semibold hover:bg-bittersweet/90 transition disabled:opacity-50"
            >
              Pagar
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCartDrawer } from '../context/CartDrawerContext';

export default function CartModal() {
  const navigate = useNavigate();
  const { items, total, removeFromCart, updateQuantity } = useCart();
  const { isOpen, closeDrawer } = useCartDrawer();

  if (!isOpen) return null;

  function handleCheckout() {
    closeDrawer();
    navigate('/checkout');
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      <button
        type="button"
        aria-label="Cerrar carrito"
        className="absolute inset-0 bg-black/50"
        onClick={closeDrawer}
      />

      <aside className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl border-l-2 border-scampi animate-cart-slide-in">
        <div className="flex items-center justify-between border-b border-poloblue px-6 py-4">
          <h3 className="text-xl font-bold text-scampi">Mi Carrito</h3>
          <button
            type="button"
            onClick={closeDrawer}
            className="text-scampi hover:text-bittersweet font-bold text-lg leading-none px-2"
            aria-label="Cerrar panel"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">El carrito está vacío.</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="border border-poloblue rounded-lg p-3 space-y-2">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="font-semibold text-scampi text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">Cod: {item.code}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-600 hover:underline shrink-0"
                  >
                    Quitar
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded border border-poloblue text-scampi font-bold hover:bg-poloblue/20"
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold text-scampi w-6 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                      className="w-8 h-8 rounded border border-poloblue text-scampi font-bold hover:bg-poloblue/20 disabled:opacity-40"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-bittersweet text-sm">
                    ${(item.price * item.quantity).toLocaleString('es-CL')}
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
              onClick={closeDrawer}
              className="w-1/2 bg-poloblue text-white py-2.5 rounded font-semibold hover:bg-poloblue/80 transition"
            >
              Seguir comprando
            </button>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={items.length === 0}
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

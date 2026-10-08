export default function CartModal({ isOpen, onClose, cartItems, onCheckout }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl border-2 border-scampi">
        <h3 className="text-xl font-bold border-b pb-2 mb-4 text-scampi">Mi Carrito de Compras</h3>
        
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">El carrito está vacío.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2 text-sm">
                <span>{item.title}</span>
                <span className="font-bold text-bittersweet">${item.price.toLocaleString('es-CL')}</span>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 mt-4 flex justify-between items-center font-bold text-lg">
          <span className="text-scampi">Total:</span>
          <span className="text-bittersweet">${total.toLocaleString('es-CL')}</span>
        </div>

        <div className="mt-6 flex space-x-3">
          <button
            onClick={onClose}
            className="w-1/2 bg-poloblue text-white py-2 rounded font-semibold hover:bg-poloblue/80 transition"
          >
            Cerrar
          </button>
          <button
            onClick={onCheckout}
            className="w-1/2 bg-bittersweet text-white py-2 rounded font-semibold hover:bg-bittersweet/90 transition"
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
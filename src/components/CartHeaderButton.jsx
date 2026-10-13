import { useCart } from '../context/CartContext';
import { useCartDrawer } from '../context/CartDrawerContext';

export default function CartHeaderButton() {
  const { itemCount } = useCart();
  const { toggleDrawer } = useCartDrawer();

  return (
    <button
      type="button"
      onClick={toggleDrawer}
      className="relative bg-scampi hover:bg-scampi/90 text-white text-xs font-bold px-3 py-1.5 rounded transition"
      aria-label={`Abrir carrito${itemCount > 0 ? `, ${itemCount} artículos` : ''}`}
    >
      Carrito
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 rounded-full bg-bittersweet text-white text-[10px] font-bold flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}

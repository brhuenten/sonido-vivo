import { useCart } from '../hooks/useCart.js';
import { useCartDrawer } from '../hooks/useCartDrawer.js';

export default function CartHeaderButton() {
  const { cantidadArticulos } = useCart();
  const { alternarPanel } = useCartDrawer();

  return (
    <button
      type="button"
      onClick={alternarPanel}
      className="relative text-white hover:text-azalea transition p-1"
      aria-label={`Abrir carrito${cantidadArticulos > 0 ? `, ${cantidadArticulos} artículos` : ''}`}
    >
      <span className="text-xl" aria-hidden>🛒</span>
      {cantidadArticulos > 0 && (
        <span className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 px-1 rounded-full bg-bittersweet text-white text-[10px] font-bold flex items-center justify-center">
          {cantidadArticulos > 99 ? '99+' : cantidadArticulos}
        </span>
      )}
    </button>
  );
}

import { CartDrawerProvider } from './CartDrawerContext';
import { CartProvider } from './CartContext';

export default function CartProviders({ children }) {
  return (
    <CartProvider>
      <CartDrawerProvider>{children}</CartDrawerProvider>
    </CartProvider>
  );
}

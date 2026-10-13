import { CartDrawerProvider } from './CartDrawerContext.jsx';
import { CartProvider } from './CartContext.jsx';

export default function CartProviders({ children }) {
  return (
    <CartProvider>
      <CartDrawerProvider>{children}</CartDrawerProvider>
    </CartProvider>
  );
}

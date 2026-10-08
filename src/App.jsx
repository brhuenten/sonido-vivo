import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    alert('Pedido completado');
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="bg-azalea/30 text-gray-800 font-sans flex flex-col min-h-screen">
      <Header
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <Outlet context={{ onAddToCart: handleAddToCart }} />

      <Footer />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
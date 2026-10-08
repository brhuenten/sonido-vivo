import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
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
        onNavigate={setCurrentPage}
      />

      <main className="flex-grow">
        {currentPage === 'home' && <Home onAddToCart={handleAddToCart} />}
        {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
        {currentPage === 'register' && <Register onNavigate={setCurrentPage} />}
      </main>

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
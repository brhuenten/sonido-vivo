import { Link } from 'react-router-dom';

export default function Header({ cartCount, onOpenCart }) {
  return (
    <header className="bg-azalea text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-bittersweet tracking-wider">
          SONIDO VIVO
        </Link>
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-azalea">Inicio</Link>
          <Link to="/contacto" className="hover:text-azalea">Contacto</Link>
          <Link to="/nosotros" className="hover:text-azalea">Nosotros</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenCart}
            className="relative bg-scampi border border-poloblue p-2 rounded-full hover:bg-poloblue/30 transition"
          >
            🛒
            <span className="absolute -top-1 -right-1 bg-bittersweet text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </button>
          <Link
            to="/registro"
            className="bg-bittersweet hover:bg-bittersweet/90 text-white text-xs font-bold px-3 py-1.5 rounded transition"
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className="bg-bittersweet hover:bg-bittersweet/90 text-white text-xs font-bold px-3 py-1.5 rounded transition"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </header>
  );
}
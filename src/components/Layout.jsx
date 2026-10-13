import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import CartHeaderButton from './CartHeaderButton';
import CartModal from './CartModal';

export default function Layout() {
  const { estaLogueado, usuario, esAdmin } = useAuth();
  return (
    <>
      <header className="bg-azalea text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-bittersweet tracking-wider">
            SONIDO VIVO
          </Link>
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="text-white hover:text-bittersweet transition-colors">
              Inicio
            </Link>
            <Link to="/contacto" className="text-white hover:text-bittersweet transition-colors">
              Contacto
            </Link>
            <Link to="/nosotros" className="text-white hover:text-bittersweet transition-colors">
              Nosotros
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <CartHeaderButton />
            {estaLogueado ? (
              <>
                {esAdmin && (
                  <Link
                    to="/admin"
                    className="text-white hover:text-bittersweet text-xs font-bold transition hidden sm:inline"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/perfil"
                  className="text-white hover:text-bittersweet text-xs font-medium transition hidden sm:inline max-w-[8rem] truncate"
                  title={usuario?.nombre}
                >
                  {usuario?.nombre}
                </Link>
                <Link
                  to="/logout"
                  className="bg-bittersweet hover:bg-bittersweet/90 text-white text-xs font-bold px-3 py-1.5 rounded transition"
                >
                  Salir
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-scampi text-azalea text-xs py-6 text-center">
        <p>&copy; 2026 Tienda Sonido Vivo. Viña del Mar, Chile.</p>
      </footer>

      <CartModal />
    </>
  );
}

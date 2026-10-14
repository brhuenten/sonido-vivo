import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import CartHeaderButton from './CartHeaderButton';
import CartModal from './CartModal';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/nosotros', label: 'Nosotros' },
];

const navLinkClass =
  'text-white hover:text-bittersweet transition-colors block py-2 lg:py-0 lg:inline';

export default function Layout() {
  const { estaLogueado, usuario, esAdmin } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <header className="w-full shrink-0 bg-azalea text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              className="lg:hidden text-white hover:text-bittersweet p-1 text-xl leading-none"
              aria-expanded={menuAbierto}
              aria-controls="nav-movil"
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setMenuAbierto((abierto) => !abierto)}
            >
              {menuAbierto ? '×' : '☰'}
            </button>
            <Link
              to="/"
              onClick={cerrarMenu}
              className="text-lg lg:text-2xl font-bold text-bittersweet tracking-wider shrink-0"
            >
              SONIDO VIVO
            </Link>
          </div>

          <nav
            className="hidden lg:flex items-center gap-6 text-sm font-medium shrink-0"
            aria-label="Principal"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className={navLinkClass}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
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
                  className="bg-bittersweet hover:bg-bittersweet/90 text-white text-xs font-bold px-3 py-1.5 rounded transition whitespace-nowrap"
                >
                  Salir
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/registro"
                  className="bg-bittersweet hover:bg-bittersweet/90 text-white text-xs font-bold px-3 py-1.5 rounded transition whitespace-nowrap hidden sm:inline-block"
                >
                  Registrarse
                </Link>
                <Link
                  to="/login"
                  className="bg-bittersweet hover:bg-bittersweet/90 text-white text-xs font-bold px-3 py-1.5 rounded transition whitespace-nowrap"
                >
                  Ingresar
                </Link>
              </>
            )}
          </div>
        </div>

        {menuAbierto && (
          <nav
            id="nav-movil"
            className="lg:hidden border-t border-white/20 container mx-auto px-4 py-3 flex flex-col gap-1 text-sm font-medium"
            aria-label="Menú móvil"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className={navLinkClass} onClick={cerrarMenu}>
                {label}
              </Link>
            ))}
            {!estaLogueado && (
              <Link to="/registro" className={navLinkClass} onClick={cerrarMenu}>
                Registrarse
              </Link>
            )}
            {estaLogueado && esAdmin && (
              <Link to="/admin" className={navLinkClass} onClick={cerrarMenu}>
                Admin
              </Link>
            )}
            {estaLogueado && (
              <Link to="/perfil" className={navLinkClass} onClick={cerrarMenu}>
                Mi perfil
              </Link>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1 w-full min-w-0">
        <Outlet />
      </main>

      <footer className="w-full shrink-0 bg-scampi text-azalea text-xs py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2026 Tienda Sonido Vivo. Viña del Mar, Chile.</p>
        </div>
      </footer>

      <CartModal />
    </div>
  );
}

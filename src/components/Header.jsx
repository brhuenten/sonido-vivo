export default function Header({ cartCount, onOpenCart }) {
  return (
    <header className="bg-azalea text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-bittersweet tracking-wider">
          SONIDO VIVO
        </a>
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <a href="/" className="hover:text-azalea">Inicio</a>
          <a href="/contacto" className="hover:text-azalea">Contacto</a>
          <a href="/nosotros" className="hover:text-azalea">Nosotros</a>
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
          <a
            href="/registro"
            className="bg-bittersweet hover:bg-bittersweet/90 text-white text-xs font-bold px-3 py-1.5 rounded transition"
          >
            Registrarse
          </a>
          <a
            href="/login"
            className="bg-bittersweet hover:bg-bittersweet/90 text-white text-xs font-bold px-3 py-1.5 rounded transition"
          >
            Ingresar
          </a>
        </div>
      </div>
    </header>
  );
}
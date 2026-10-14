import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.js';
import { useCartDrawer } from '../hooks/useCartDrawer.js';

export default function ProductCard({ producto }) {
  const rutaDetalle = `/products/${producto.id}`;
  const { agregarAlCarrito } = useCart();
  const { abrirPanel } = useCartDrawer();

  function manejarAgregarAlCarrito() {
    agregarAlCarrito(producto);
    abrirPanel();
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow border border-poloblue flex flex-col justify-between">
      <div>
        <Link to={rutaDetalle}>
          <img
            src={producto.image}
            alt={producto.title}
            className="w-full h-48 object-contain rounded mb-3 border border-azalea hover:opacity-90 transition"
          />
        </Link>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500 font-bold">Cód: {producto.code}</span>
          <span className="bg-chelsea/20 text-chelsea text-xs font-bold px-2 py-0.5 rounded">
            Stock: {producto.stock}
          </span>
        </div>
        <Link to={rutaDetalle} className="font-bold text-scampi hover:text-bittersweet transition text-lg block">
          {producto.title}
        </Link>
        <p className="text-xl font-extrabold text-bittersweet mt-2">
          CLP ${producto.price.toLocaleString('es-CL')}
        </p>
      </div>
      <button
        type="button"
        onClick={manejarAgregarAlCarrito}
        className="mt-4 bg-bittersweet text-white text-sm font-bold py-2 rounded hover:bg-bittersweet/90 transition w-full"
      >
        Agregar al Carrito
      </button>
    </div>
  );
}

import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { CATEGORIAS, filtrarPorCategoria } from '../data/products';

export default function Inicio() {
  const [categoriaActiva, setCategoriaActiva] = useState('todas');
  const productos = filtrarPorCategoria(categoriaActiva);

  const botonFiltro = (valor, etiqueta) => {
    const activo = categoriaActiva === valor;
    return (
      <button
        key={valor}
        type="button"
        onClick={() => setCategoriaActiva(valor)}
        className={`text-sm font-bold px-4 py-1.5 rounded-full transition ${
          activo
            ? 'bg-bittersweet text-white'
            : 'bg-white text-scampi border border-poloblue hover:border-bittersweet'
        }`}
      >
        {etiqueta}
      </button>
    );
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-6 space-y-6">
      <div className="bg-scampi text-white rounded-lg p-8 text-center shadow-lg">
        <h1 className="text-4xl font-extrabold mb-2 text-azalea">Bienvenido a Sonido Vivo</h1>
        <p className="text-gray-100 max-w-xl mx-auto">
          Instrumentos musicales y audio profesional en Viña del Mar.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-scampi border-b-2 border-poloblue pb-2">
        Productos:
      </h2>

      <div className="flex flex-wrap gap-2">
        {botonFiltro('todas', 'Todas')}
        {CATEGORIAS.map((categoria) => botonFiltro(categoria, categoria))}
      </div>

      {productos.length === 0 ? (
        <p className="text-scampi">No hay productos en esta categoría.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </main>
  );
}

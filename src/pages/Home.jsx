import { useOutletContext } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

export default function Home() {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
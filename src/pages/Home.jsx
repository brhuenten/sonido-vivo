import ProductCard from '../components/ProductCard';

// Importación de imágenes desde la carpeta assets
import GuitarraYamaha from '../assets/GuitarraYamaha.png';
import GuitarraDreadnough from '../assets/GuitarraDreadnough.png';
import GuitarraC40 from '../assets/GuitarraC40.png';

const PRODUCTS = [
  {
    id: 1,
    code: 'GA001',
    stock: 8,
    title: 'Guitarra Acústica Folk Yamaha',
    price: 129990,
    image: GuitarraYamaha
  },
  {
    id: 2,
    code: 'GA002',
    stock: 5,
    title: 'Guitarra Acústica Dreadnought Fender',
    price: 189990,
    image: GuitarraDreadnough
  },
  {
    id: 3,
    code: 'GA003',
    stock: 10,
    title: 'Guitarra Acústica Clásica 4/4 Yamaha',
    price: 89990,
    image: GuitarraC40
  }
];

export default function Home({ onAddToCart }) {
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
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </main>
  );
}
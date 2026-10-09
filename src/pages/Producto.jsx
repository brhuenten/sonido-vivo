import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import { getProductById } from '../data/products';

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { onAddToCart } = useOutletContext();
  const product = getProductById(id);

  if (!product) {
    return (
      <main className="flex-grow container mx-auto px-4 py-10 max-w-4xl text-center space-y-4">
        <p className="text-scampi font-semibold">No encontramos ese producto.</p>
        <Link to="/" className="text-bittersweet font-bold hover:underline">
          Volver al inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow container mx-auto px-4 py-10 max-w-4xl">
      <ProductDetail
        product={product}
        onAddToCart={onAddToCart}
        onBuyNow={() => navigate('/')}
      />
    </main>
  );
}

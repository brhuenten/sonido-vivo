export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-poloblue flex flex-col justify-between">
      <div>
        <a href="/producto">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain rounded mb-3 border border-azalea hover:opacity-90 transition"
          />
        </a>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-gray-500 font-bold">Cod: {product.code}</span>
          <span className="bg-chelsea/20 text-chelsea text-xs font-bold px-2 py-0.5 rounded">
            Stock: {product.stock}
          </span>
        </div>
        <a href="/producto" className="font-bold text-scampi hover:text-bittersweet transition text-lg block">
          {product.title}
        </a>
        <p className="text-xl font-extrabold text-bittersweet mt-2">
          CLP ${product.price.toLocaleString('es-CL')}
        </p>
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="mt-4 bg-bittersweet text-white text-sm font-bold py-2 rounded hover:bg-bittersweet/90 transition w-full"
      >
        Agregar al Carrito
      </button>
    </div>
  );
}
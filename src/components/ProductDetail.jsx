export default function ProductDetail({ product, onAddToCart, onBuyNow }) {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-poloblue p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="w-full bg-white rounded-lg border border-poloblue p-4 flex items-center justify-center min-h-80">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-72 w-auto object-contain"
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <span className="text-xs text-gray-500 font-bold">Cod: {product.code}</span>
          <h1 className="text-3xl font-bold text-scampi my-2">{product.title}</h1>
          <p className="text-xl font-bold text-scampi my-4">Modelo: {product.model}</p>
          <p className="text-2xl font-extrabold text-bittersweet mb-4">
            CLP ${product.price.toLocaleString('es-CL')}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>
          <span className="inline-block bg-chelsea/20 text-chelsea text-xs font-bold px-3 py-1 rounded mb-4">
            Stock Disponible: {product.stock} unidades
          </span>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="w-full bg-bittersweet text-white font-bold py-3 rounded-lg hover:bg-bittersweet/90 transition shadow"
            >
              Agregar al Carrito
            </button>
            <button
              type="button"
              onClick={onBuyNow}
              className="w-full bg-scampi text-white font-bold py-3 rounded-lg hover:bg-scampi/90 transition shadow"
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

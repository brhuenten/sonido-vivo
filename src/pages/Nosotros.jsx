import fotoUbicacion from '../assets/FotoReferenciaUbi.jpg' 

export default function Nosotros() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <section className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full space-y-8">
        {}
        <div>
          <h2 className="text-3xl font-bold text-scampi mb-4 border-b pb-2">
            Sobre Sonido Vivo
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            <strong>Sonido Vivo</strong> es una tienda especializada en instrumentos musicales, equipos de sonido y accesorios para músicos, ubicada en Viña del Mar, Región de Valparaíso. Tiene 11 años de funcionamiento y es atendida por su dueño y 2 vendedores.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nuestro catálogo incluye guitarras, bajos, baterías, teclados, amplificadores, micrófonos, pedales de efectos y accesorios. Contamos con una amplia variedad de referencias para todos nuestros clientes.
          </p>
        </div>

        {}
        <div className="h-7"></div>

        {}
        <div>
          <h3 className="text-2xl font-bold text-scampi mb-4 border-b pb-2">
            Nuestra Ubicación
          </h3>

          <div className="space-y-3 mb-4">
            <p className="text-sm text-gray-700">
              <strong>Dirección:</strong> Av. Libertad 1020, Viña del Mar, Chile.
            </p>
            <p className="text-sm text-gray-700">
              Foto de referencia sobre la ubicación:
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-poloblue shadow w-full">
            <img
              src={fotoUbicacion}
              alt="Mapa de ubicación Sonido Vivo"
              className="w-full h-64 object-cover hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
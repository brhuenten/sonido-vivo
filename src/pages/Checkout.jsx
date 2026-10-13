import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext';
import { TIENDA_DIRECCION, validarDatosCheckout } from '../service/checkout.js';

const inputClass =
  'w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet';

export default function Checkout() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { items, total } = useCart();

  const [metodoEntrega, setMetodoEntrega] = useState('envio');
  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errores, setErrores] = useState({});

  if (items.length === 0) {
    return (
      <div className="flex-grow container mx-auto px-4 py-10 flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full max-w-lg text-center">
          <h2 className="text-2xl font-bold text-scampi mb-4">Checkout</h2>
          <p className="text-gray-600 mb-6">Tu carrito está vacío. Agrega productos antes de continuar.</p>
          <Link
            to="/"
            className="inline-block bg-bittersweet hover:bg-bittersweet/90 text-white font-bold py-2.5 px-6 rounded transition shadow"
          >
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  function continuar(event) {
    event.preventDefault();

    const payload = {
      metodoEntrega,
      direccion: metodoEntrega === 'envio' ? direccion : TIENDA_DIRECCION,
      comuna: metodoEntrega === 'envio' ? comuna : 'Viña del Mar',
      ciudad: metodoEntrega === 'envio' ? ciudad : 'Viña del Mar',
      telefono,
      items: items.map(({ id, code, title, price, quantity }) => ({
        id,
        code,
        title,
        price,
        quantity,
      })),
      total,
      cliente: usuario?.nombre ?? '',
      email: usuario?.email ?? '',
    };

    const nextErrores = validarDatosCheckout(payload);
    setErrores(nextErrores);
    if (Object.keys(nextErrores).length > 0) return;

    navigate('/checkout/confirmacion', { state: { checkout: payload } });
  }

  return (
    <div className="flex-grow container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-5">
        <section className="lg:col-span-3 bg-white p-8 rounded-lg shadow-xl border border-poloblue">
          <h2 className="text-2xl font-bold text-scampi mb-2 border-b pb-3">Entrega</h2>


          <form onSubmit={continuar} className="space-y-5" noValidate>
            <fieldset>
              <legend className="text-sm font-semibold text-scampi mb-2">Forma de entrega</legend>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="flex items-center gap-2 cursor-pointer border border-poloblue rounded-lg px-4 py-3 flex-1 has-[:checked]:border-bittersweet has-[:checked]:bg-azalea/20">
                  <input
                    type="radio"
                    name="metodoEntrega"
                    value="envio"
                    checked={metodoEntrega === 'envio'}
                    onChange={() => setMetodoEntrega('envio')}
                  />
                  <span className="text-sm font-medium text-scampi">Envío a domicilio</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer border border-poloblue rounded-lg px-4 py-3 flex-1 has-[:checked]:border-bittersweet has-[:checked]:bg-azalea/20">
                  <input
                    type="radio"
                    name="metodoEntrega"
                    value="retiro"
                    checked={metodoEntrega === 'retiro'}
                    onChange={() => setMetodoEntrega('retiro')}
                  />
                  <span className="text-sm font-medium text-scampi">Retiro en tienda</span>
                </label>
              </div>
              {errores.metodoEntrega && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errores.metodoEntrega}</p>
              )}
            </fieldset>

            {metodoEntrega === 'retiro' ? (
              <div className="rounded-lg bg-poloblue/10 border border-poloblue p-4 text-sm text-gray-700">
                <p className="font-semibold text-scampi mb-1">Retiro presencial</p>
                <p>{TIENDA_DIRECCION}</p>
                <p className="mt-2 text-xs text-gray-500">Horario: lun–vie 10:00–19:00, sáb 10:00–14:00.</p>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-scampi mb-1">Dirección</label>
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Calle, número, depto."
                    className={inputClass}
                  />
                  {errores.direccion && (
                    <p className="text-red-500 text-xs mt-1 font-medium">{errores.direccion}</p>
                  )}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-scampi mb-1">Comuna</label>
                    <input
                      type="text"
                      value={comuna}
                      onChange={(e) => setComuna(e.target.value)}
                      placeholder="Ej. Viña del Mar"
                      className={inputClass}
                    />
                    {errores.comuna && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errores.comuna}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-scampi mb-1">Ciudad</label>
                    <input
                      type="text"
                      value={ciudad}
                      onChange={(e) => setCiudad(e.target.value)}
                      placeholder="Ej. Viña del Mar"
                      className={inputClass}
                    />
                    {errores.ciudad && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errores.ciudad}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-semibold text-scampi mb-1">Teléfono de contacto</label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="+56 9 1234 5678"
                className={inputClass}
              />
              {errores.telefono && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errores.telefono}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-bittersweet hover:bg-bittersweet/90 text-white font-bold py-2.5 rounded transition shadow"
            >
              Revisar y confirmar compra
            </button>
          </form>
        </section>

        <aside className="lg:col-span-2 bg-white p-6 rounded-lg shadow-xl border border-poloblue h-fit">
          <h3 className="text-lg font-bold text-scampi mb-4 border-b pb-2">Resumen del carrito</h3>
          <ul className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-2 text-sm">
                <span className="text-scampi">
                  {item.title}{' '}
                  <span className="text-gray-500">× {item.quantity}</span>
                </span>
                <span className="font-semibold text-bittersweet shrink-0">
                  ${(item.price * item.quantity).toLocaleString('es-CL')}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center font-bold text-lg border-t border-poloblue pt-3">
            <span className="text-scampi">Total</span>
            <span className="text-bittersweet">${total.toLocaleString('es-CL')}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

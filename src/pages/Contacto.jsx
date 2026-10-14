import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const claseInput =
  'w-full p-2 border border-poloblue rounded focus:outline-none focus:ring-2 focus:ring-bittersweet';

export default function Contacto() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});

  function enviar(event) {
    event.preventDefault();

    const next = {};
    if (nombre.trim().length < 3) {
      next.nombre = 'Por favor ingresa tu nombre (mínimo 3 caracteres).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      next.correo = 'Por favor ingresa un correo válido (ejemplo@dominio.com).';
    }
    if (asunto.trim().length < 4) {
      next.asunto = 'El asunto no puede estar vacío (mínimo 4 caracteres).';
    }
    if (mensaje.trim().length < 10) {
      next.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    setErrores(next);
    if (Object.keys(next).length > 0) return;

    navigate('/gracias', { state: { nombre } });
  }

  return (
    <div className="flex-grow container mx-auto px-4 py-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-poloblue w-full max-w-lg">
        <h2 className="text-2xl font-bold text-scampi mb-6 text-center border-b pb-3">
          Contáctanos
        </h2>

        <form onSubmit={enviar} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Nombre Completo:
            </label>
            <input
              type="text"
              id="contactoNombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu Nombre"
              className={claseInput}
            />
            {errores.nombre && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errores.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="contactoCorreo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@dominio.com"
              className={claseInput}
            />
            {errores.correo && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errores.correo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">Asunto:</label>
            <input
              type="text"
              id="contactoAsunto"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              placeholder="Motivo de tu consulta"
              className={claseInput}
            />
            {errores.asunto && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errores.asunto}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-scampi mb-1">Mensaje:</label>
            <textarea
              id="contactoMensaje"
              rows={4}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              className={claseInput}
            />
            {errores.mensaje && (
              <p className="text-red-500 text-xs mt-1 font-medium">{errores.mensaje}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-bittersweet hover:bg-bittersweet/90 text-white font-bold py-2.5 rounded transition shadow mt-4"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}

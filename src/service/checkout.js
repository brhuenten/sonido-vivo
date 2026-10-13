export const TIENDA_DIRECCION = 'Av. Libertad 1020, Viña del Mar, Chile';

export function validarDatosCheckout(datos) {
  const errores = {};

  if (!datos?.metodoEntrega) {
    errores.metodoEntrega = 'Selecciona cómo recibir tu pedido.';
  }

  const telefono = datos?.telefono?.trim() ?? '';
  if (telefono.length < 8) {
    errores.telefono = 'Ingresa un teléfono de contacto válido (mínimo 8 caracteres).';
  }

  if (datos?.metodoEntrega === 'envio') {
    if ((datos.direccion?.trim() ?? '').length < 5) {
      errores.direccion = 'Ingresa la dirección de envío (mínimo 5 caracteres).';
    }
    if ((datos.comuna?.trim() ?? '').length < 3) {
      errores.comuna = 'Ingresa la comuna.';
    }
    if ((datos.ciudad?.trim() ?? '').length < 3) {
      errores.ciudad = 'Ingresa la ciudad.';
    }
  }

  if (!Array.isArray(datos?.items) || datos.items.length === 0) {
    errores.items = 'No hay productos en el pedido.';
  }

  return errores;
}

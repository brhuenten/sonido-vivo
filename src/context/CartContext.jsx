import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext } from './cart-context.js';

const CLAVE_ALMACEN_CARRITO = 'sonido-vivo-cart';

function totalLinea(articulo) {
  return articulo.price * articulo.quantity;
}

function cargarCarritoDesdeAlmacenamiento() {
  try {
    const crudo = localStorage.getItem(CLAVE_ALMACEN_CARRITO);
    if (!crudo) return [];
    const parseado = JSON.parse(crudo);
    if (!Array.isArray(parseado)) return [];
    return parseado.filter(
      (articulo) =>
        articulo &&
        articulo.id != null &&
        typeof articulo.quantity === 'number' &&
        articulo.quantity > 0 &&
        typeof articulo.price === 'number',
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [articulos, setArticulos] = useState(cargarCarritoDesdeAlmacenamiento);

  useEffect(() => {
    localStorage.setItem(CLAVE_ALMACEN_CARRITO, JSON.stringify(articulos));
  }, [articulos]);

  const agregarAlCarrito = useCallback((producto, cantidad = 1) => {
    if (!producto?.id) return;

    setArticulos((prev) => {
      const existente = prev.find((articulo) => articulo.id === producto.id);
      const cantidadSiguiente = (existente?.quantity ?? 0) + cantidad;
      const cantidadTope = Math.min(cantidadSiguiente, producto.stock);

      if (cantidadTope <= 0) return prev;

      if (existente) {
        return prev.map((articulo) =>
          articulo.id === producto.id ? { ...articulo, quantity: cantidadTope } : articulo,
        );
      }

      return [
        ...prev,
        {
          id: producto.id,
          code: producto.code,
          title: producto.title,
          price: producto.price,
          stock: producto.stock,
          quantity: Math.min(cantidad, producto.stock),
        },
      ];
    });
  }, []);

  const quitarDelCarrito = useCallback((idProducto) => {
    setArticulos((prev) => prev.filter((articulo) => articulo.id !== idProducto));
  }, []);

  const actualizarCantidad = useCallback((idProducto, cantidad) => {
    setArticulos((prev) =>
      prev
        .map((articulo) => {
          if (articulo.id !== idProducto) return articulo;
          const siguiente = Math.max(0, Math.min(cantidad, articulo.stock));
          return siguiente === 0 ? null : { ...articulo, quantity: siguiente };
        })
        .filter(Boolean),
    );
  }, []);

  const vaciarCarrito = useCallback(() => setArticulos([]), []);

  const cantidadArticulos = useMemo(
    () => articulos.reduce((acum, articulo) => acum + articulo.quantity, 0),
    [articulos],
  );

  const total = useMemo(
    () => articulos.reduce((acum, articulo) => acum + totalLinea(articulo), 0),
    [articulos],
  );

  const valor = useMemo(
    () => ({
      articulos,
      cantidadArticulos,
      total,
      agregarAlCarrito,
      quitarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
    }),
    [
      articulos,
      cantidadArticulos,
      total,
      agregarAlCarrito,
      quitarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
    ],
  );

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

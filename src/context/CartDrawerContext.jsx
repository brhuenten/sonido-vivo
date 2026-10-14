import { useCallback, useMemo, useState } from 'react';
import { CartDrawerContext } from './cart-drawer-context.js';

export function CartDrawerProvider({ children }) {
  const [estaAbierto, setEstaAbierto] = useState(false);

  const abrirPanel = useCallback(() => setEstaAbierto(true), []);
  const cerrarPanel = useCallback(() => setEstaAbierto(false), []);
  const alternarPanel = useCallback(() => setEstaAbierto((abierto) => !abierto), []);

  const valor = useMemo(
    () => ({ estaAbierto, abrirPanel, cerrarPanel, alternarPanel }),
    [estaAbierto, abrirPanel, cerrarPanel, alternarPanel],
  );

  return <CartDrawerContext.Provider value={valor}>{children}</CartDrawerContext.Provider>;
}

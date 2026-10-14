import { useCallback, useEffect, useState } from 'react'

function resolverInicial(valorInicial) {
  return typeof valorInicial === 'function' ? valorInicial() : valorInicial
}

export function useLocalStorage(clave, valorInicial) {
  const leerValor = useCallback(() => {
    try {
      const crudo = localStorage.getItem(clave)
      if (crudo == null) {
        return resolverInicial(valorInicial)
      }
      return JSON.parse(crudo)
    } catch {
      return resolverInicial(valorInicial)
    }
  }, [clave, valorInicial])

  const [valorAlmacenado, setValorAlmacenado] = useState(leerValor)

  const establecerValor = useCallback(
    (valor) => {
      setValorAlmacenado((previo) => {
        const siguiente = typeof valor === 'function' ? valor(previo) : valor
        localStorage.setItem(clave, JSON.stringify(siguiente))
        return siguiente
      })
    },
    [clave],
  )

  const sincronizarDesdeAlmacenamiento = useCallback(() => {
    setValorAlmacenado(leerValor())
  }, [leerValor])

  useEffect(() => {
    function alCambiarAlmacenamiento(evento) {
      if (evento.key !== clave || evento.storageArea !== localStorage) return
      if (evento.newValue == null) {
        setValorAlmacenado(resolverInicial(valorInicial))
        return
      }
      try {
        setValorAlmacenado(JSON.parse(evento.newValue))
      } catch {
        setValorAlmacenado(resolverInicial(valorInicial))
      }
    }

    window.addEventListener('storage', alCambiarAlmacenamiento)
    return () => window.removeEventListener('storage', alCambiarAlmacenamiento)
  }, [clave, valorInicial])

  return [valorAlmacenado, establecerValor, sincronizarDesdeAlmacenamiento]
}

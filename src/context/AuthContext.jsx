import { useCallback, useEffect, useMemo, useState } from 'react'
import * as auth from '../service/Auth.js'
import { AuthContext } from './auth-context.js'

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let activo = true
    auth
      .obtenerSesion()
      .then((sesion) => {
        if (activo) setUsuario(sesion)
      })
      .finally(() => {
        if (activo) setCargando(false)
      })
    return () => {
      activo = false
    }
  }, [])

  const registrar = useCallback(async (datos) => {
    const sesion = await auth.registrar(datos)
    setUsuario(sesion)
    return sesion
  }, [])

  const login = useCallback(async (email, password) => {
    const sesion = await auth.iniciarSesion({ email, password })
    setUsuario(sesion)
    return sesion
  }, [])

  const cerrarSesion = useCallback(async () => {
    await auth.cerrarSesion()
    setUsuario(null)
  }, [])

  const valor = useMemo(
    () => ({
      usuario,
      estaLogueado: Boolean(usuario),
      cargando,
      esAdmin: usuario?.rol === 'admin',
      registrar,
      login,
      iniciarSesion: login,
      cerrarSesion,
    }),
    [usuario, cargando, registrar, login, cerrarSesion],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

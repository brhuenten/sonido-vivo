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

  const crearUsuarioDesdeAdmin = useCallback(async (datos) => {
    return auth.crearUsuarioDesdeAdmin(datos)
  }, [])

  const obtenerUsuarioPorId = useCallback(async (id) => {
    return auth.obtenerUsuarioPorId(id)
  }, [])

  const actualizarUsuarioDesdeAdmin = useCallback(
    async (id, datos) => {
      const actualizado = await auth.actualizarUsuarioDesdeAdmin(id, datos)
      if (usuario?.id === actualizado.id) {
        setUsuario(actualizado)
      }
      return actualizado
    },
    [usuario?.id],
  )

  const iniciarSesion = useCallback(async (correo, contrasena) => {
    const sesion = await auth.iniciarSesion({ email: correo, password: contrasena })
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
      crearUsuarioDesdeAdmin,
      obtenerUsuarioPorId,
      actualizarUsuarioDesdeAdmin,
      iniciarSesion,
      cerrarSesion,
    }),
    [
      usuario,
      cargando,
      registrar,
      crearUsuarioDesdeAdmin,
      obtenerUsuarioPorId,
      actualizarUsuarioDesdeAdmin,
      iniciarSesion,
      cerrarSesion,
    ],
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

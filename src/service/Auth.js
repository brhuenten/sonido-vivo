const USUARIOS_KEY = 'sonido_vivo_usuarios'
const SESION_KEY = 'sonido_vivo_sesion'

const USUARIO_ADMIN = {
  id: 'admin-1',
  run: '11111111k',
  nombre: 'Administrador',
  email: 'admin@sonidovivo.cl',
  password: 'admin1',
  rol: 'admin',
}

const USUARIO_CLIENTE = {
  id: 'cliente-1',
  run: '19876543k',
  nombre: 'Usuario Demo',
  email: 'cliente@sonidovivo.cl',
  password: 'cliente',
  rol: 'cliente',
}

function leerUsuarios() {
  try {
    const raw = localStorage.getItem(USUARIOS_KEY)
    if (!raw) {
      const iniciales = [USUARIO_ADMIN, USUARIO_CLIENTE]
      localStorage.setItem(USUARIOS_KEY, JSON.stringify(iniciales))
      return iniciales
    }
    return JSON.parse(raw)
  } catch {
    return [USUARIO_ADMIN, USUARIO_CLIENTE]
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios))
}

function usuarioPublico(usuario) {
  if (!usuario) return null
  const { password: _omit, ...resto } = usuario
  return resto
}

function pausa(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function registrar({ run, nombre, email, password }) {
  await pausa()

  const runLimpio = String(run ?? '').trim()
  const nombreLimpio = String(nombre ?? '').trim()
  const emailLimpio = String(email ?? '').trim().toLowerCase()
  const pass = String(password ?? '')

  if (!/^[0-9]{7,8}[0-9kK]{1}$/.test(runLimpio)) {
    throw new Error('Formato de RUT inválido.')
  }
  if (nombreLimpio.length < 2) {
    throw new Error('Debes ingresar tu nombre completo.')
  }
  if (!/^[\w.-]+@[\w-]+\.[\w-]{2,}$/i.test(emailLimpio)) {
    throw new Error('Correo electrónico inválido.')
  }
  if (pass.length < 4 || pass.length > 10) {
    throw new Error('La contraseña debe tener entre 4 y 10 caracteres.')
  }

  const usuarios = leerUsuarios()
  if (usuarios.some((u) => u.email === emailLimpio)) {
    throw new Error('Ya existe una cuenta con ese correo.')
  }

  const nuevo = {
    id: crypto.randomUUID(),
    run: runLimpio.toLowerCase(),
    nombre: nombreLimpio,
    email: emailLimpio,
    password: pass,
    rol: 'cliente',
  }

  guardarUsuarios([...usuarios, nuevo])

  const sesion = usuarioPublico(nuevo)
  localStorage.setItem(SESION_KEY, JSON.stringify(sesion))
  return sesion
}

export async function iniciarSesion({ email, password }) {
  await pausa()

  const emailLimpio = String(email ?? '').trim().toLowerCase()
  const pass = String(password ?? '').trim()

  if (!/^[\w.-]+@[\w-]+\.[\w-]{2,}$/i.test(emailLimpio)) {
    throw new Error('Correo electrónico inválido.')
  }
  if (pass.length < 4 || pass.length > 10) {
    throw new Error('La contraseña debe tener entre 4 y 10 caracteres.')
  }

  const usuarios = leerUsuarios()
  const encontrado = usuarios.find(
    (u) => u.email === emailLimpio && u.password === pass,
  )

  if (!encontrado) {
    throw new Error('Correo o contraseña incorrectos.')
  }

  const sesion = usuarioPublico(encontrado)
  localStorage.setItem(SESION_KEY, JSON.stringify(sesion))
  return sesion
}

export async function cerrarSesion() {
  await pausa(100)
  localStorage.removeItem(SESION_KEY)
}

export async function obtenerSesion() {
  await pausa(50)
  try {
    const raw = localStorage.getItem(SESION_KEY)
    if (!raw) return null
    const sesion = JSON.parse(raw)
    const usuarios = leerUsuarios()
    const actual = usuarios.find((u) => u.id === sesion.id)
    return usuarioPublico(actual) ?? null
  } catch {
    return null
  }
}

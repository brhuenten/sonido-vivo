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

const ROLES_CREACION_ADMIN = ['trabajador', 'cliente']

export async function crearUsuarioDesdeAdmin({ run, nombre, email, password, rol }) {
  await pausa()

  const runLimpio = String(run ?? '').trim()
  const nombreLimpio = String(nombre ?? '').trim()
  const emailLimpio = String(email ?? '').trim().toLowerCase()
  const pass = String(password ?? '')
  const rolLimpio = String(rol ?? '').trim().toLowerCase()

  if (!/^[0-9]{7,8}[0-9kK]{1}$/.test(runLimpio)) {
    throw new Error('Formato de RUT inválido.')
  }
  if (nombreLimpio.length < 2) {
    throw new Error('Debes ingresar el nombre completo.')
  }
  if (!/^[\w.-]+@[\w-]+\.[\w-]{2,}$/i.test(emailLimpio)) {
    throw new Error('Correo electrónico inválido.')
  }
  if (pass.length < 4 || pass.length > 10) {
    throw new Error('La contraseña debe tener entre 4 y 10 caracteres.')
  }
  if (!ROLES_CREACION_ADMIN.includes(rolLimpio)) {
    throw new Error('Debes seleccionar un rol válido (trabajador o cliente).')
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
    rol: rolLimpio,
  }

  guardarUsuarios([...usuarios, nuevo])
  return usuarioPublico(nuevo)
}

function sincronizarSesionSiCoincide(usuarioActualizado) {
  try {
    const raw = localStorage.getItem(SESION_KEY)
    if (!raw) return
    const sesion = JSON.parse(raw)
    if (sesion.id === usuarioActualizado.id) {
      localStorage.setItem(SESION_KEY, JSON.stringify(usuarioPublico(usuarioActualizado)))
    }
  } catch {
    /* ignore */
  }
}

export async function listarUsuariosAdmin() {
  await pausa(50)
  return leerUsuarios().map((u) => usuarioPublico(u))
}

export async function obtenerUsuarioPorId(id) {
  await pausa(50)
  const usuarios = leerUsuarios()
  const encontrado = usuarios.find((u) => u.id === id)
  return usuarioPublico(encontrado) ?? null
}

export async function actualizarUsuarioDesdeAdmin(
  id,
  { run, nombre, email, password, rol },
) {
  await pausa()

  const usuarios = leerUsuarios()
  const indice = usuarios.findIndex((u) => u.id === id)
  if (indice === -1) {
    throw new Error('Usuario no encontrado.')
  }

  const actual = usuarios[indice]

  const runLimpio = String(run ?? '').trim()
  const nombreLimpio = String(nombre ?? '').trim()
  const emailLimpio = String(email ?? '').trim().toLowerCase()
  const rolLimpio = String(rol ?? '').trim().toLowerCase()
  const passNueva = String(password ?? '').trim()

  if (!/^[0-9]{7,8}[0-9kK]{1}$/.test(runLimpio)) {
    throw new Error('Formato de RUT inválido.')
  }
  if (nombreLimpio.length < 2) {
    throw new Error('Debes ingresar el nombre completo.')
  }
  if (!/^[\w.-]+@[\w-]+\.[\w-]{2,}$/i.test(emailLimpio)) {
    throw new Error('Correo electrónico inválido.')
  }

  if (actual.rol === 'admin') {
    if (rolLimpio !== 'admin') {
      throw new Error('No se puede cambiar el rol del administrador.')
    }
  } else if (!ROLES_CREACION_ADMIN.includes(rolLimpio)) {
    throw new Error('Debes seleccionar un rol válido (trabajador o cliente).')
  }

  if (usuarios.some((u) => u.id !== id && u.email === emailLimpio)) {
    throw new Error('Ya existe otra cuenta con ese correo.')
  }

  let passFinal = actual.password
  if (passNueva.length > 0) {
    if (passNueva.length < 4 || passNueva.length > 10) {
      throw new Error('La contraseña debe tener entre 4 y 10 caracteres.')
    }
    passFinal = passNueva
  }

  const actualizado = {
    ...actual,
    run: runLimpio.toLowerCase(),
    nombre: nombreLimpio,
    email: emailLimpio,
    password: passFinal,
    rol: actual.rol === 'admin' ? 'admin' : rolLimpio,
  }

  const copia = [...usuarios]
  copia[indice] = actualizado
  guardarUsuarios(copia)
  sincronizarSesionSiCoincide(actualizado)
  return usuarioPublico(actualizado)
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

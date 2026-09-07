/// Validaciones para la Pagina de Registro
function handleRegistro(e) {
  e.preventDefault();
  let esValido = true;

  const run = document.getElementById('regRun')?.value.trim() || '';
  const errRun = document.getElementById('errRun');
  if (!/^[0-9]{7,8}[0-9kK]{1}$/.test(run)) {
    if (errRun) errRun.classList.remove('hidden');
    esValido = false;
  } else {
    if (errRun) errRun.classList.add('hidden');
  }

  const nombre = document.getElementById('regNombre')?.value.trim() || '';
  const errNombre = document.getElementById('errNombre');
  if (nombre.length < 2) {
    if (errNombre) errNombre.classList.remove('hidden');
    esValido = false;
  } else {
    if (errNombre) errNombre.classList.add('hidden');
  }

  const correo = document.getElementById('regCorreo')?.value.trim() || '';
  const errCorreo = document.getElementById('errCorreo');
  if (!/^[\w-\.]+@[\w-]+\.[\w-]{2,}$/i.test(correo)) {
    if (errCorreo) errCorreo.classList.remove('hidden');
    esValido = false;
  } else {
    if (errCorreo) errCorreo.classList.add('hidden');
  }

  const pass = document.getElementById('regPass')?.value || '';
  const errPass = document.getElementById('errPass');
  if (pass.length < 4 || pass.length > 10) {
    if (errPass) errPass.classList.remove('hidden');
    esValido = false;
  } else {
    if (errPass) errPass.classList.add('hidden');
  }

  if (esValido) {
    alert('¡Registro completado con éxito!');
    window.location.href = 'login.html';
  }
}
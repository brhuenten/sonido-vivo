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

// Validaciones para la Pagina de Login
function handleLogin(event) {
  event.preventDefault();
  let esValido = true;

  const correo = document.getElementById('loginCorreo')?.value.trim() || '';
  const pass = document.getElementById('loginPass')?.value.trim() || '';

  const errCorreo = document.getElementById('errLoginCorreo');
  const errPass = document.getElementById('errLoginPass');

  const regexCorreo = /^[\w-\.]+@[\w-]+\.[\w-]{2,}$/i;


  if (!regexCorreo.test(correo)) {
    if (errCorreo) errCorreo.classList.remove('hidden');
    esValido = false;
  } else {
    if (errCorreo) errCorreo.classList.add('hidden');
  }


  if (pass.length < 4 || pass.length > 10) {
    if (errPass) errPass.classList.remove('hidden');
    esValido = false;
  } else {
    if (errPass) errPass.classList.add('hidden');
  }

  if (esValido) {
    alert('¡Inicio de sesión exitoso!');
    window.location.href = 'index.html';
  }
}

// Validaciones para la Pagina de Contacto
function handleContacto(event) {
  event.preventDefault();
  let esValido = true;

  const nombre = document.getElementById('contactoNombre')?.value.trim() || '';
  const correo = document.getElementById('contactoCorreo')?.value.trim() || '';
  const asunto = document.getElementById('contactoAsunto')?.value.trim() || '';
  const mensaje = document.getElementById('contactoMensaje')?.value.trim() || '';

  const errNombre = document.getElementById('errContactoNombre');
  const errCorreo = document.getElementById('errContactoCorreo');
  const errAsunto = document.getElementById('errContactoAsunto');
  const errMensaje = document.getElementById('errContactoMensaje');

  const regexCorreo = /^[\w-\.]+@[\w-]+\.[\w-]{2,}$/i;

  if (nombre.length < 3) {
    if (errNombre) errNombre.classList.remove('hidden');
    esValido = false;
  } else {
    if (errNombre) errNombre.classList.add('hidden');
  }

  if (!regexCorreo.test(correo)) {
    if (errCorreo) errCorreo.classList.remove('hidden');
    esValido = false;
  } else {
    if (errCorreo) errCorreo.classList.add('hidden');
  }

  if (asunto.length < 4) {
    if (errAsunto) errAsunto.classList.remove('hidden');
    esValido = false;
  } else {
    if (errAsunto) errAsunto.classList.add('hidden');
  }

  if (mensaje.length < 10) {
    if (errMensaje) errMensaje.classList.remove('hidden');
    esValido = false;
  } else {
    if (errMensaje) errMensaje.classList.add('hidden');
  }

  if (esValido) {
    alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
    document.querySelector('form').reset();
  }
}

// Estado en memoria
const productosMock = [
  { 
    id: 1, 
    codigo: "GA001", 
    nombre: "Guitarra Acústica Folk Yamaha", 
    precio: 129990, 
    stock: 8, 
    img: "./assets/img/GuitarraYamaha.png",
    url: "producto.html"
  },
  { 
    id: 2, 
    codigo: "GA002", 
    nombre: "Guitarra Acústica Dreadnought Fender", 
    precio: 189990, 
    stock: 5, 
    img: "./assets/img/GuitarraDreadnough.png",
    url: "producto2.html"
  },
  { 
    id: 3, 
    codigo: "GA003", 
    nombre: "Guitarra Acústica Clásica 4/4 Yamaha", 
    precio: 89990, 
    stock: 10, 
    img: "./assets/img/GuitarraC40.png",
    url: "producto3.html"
  }
];

let carrito = [];

// Renderizado de productos en index
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById('productGrid');
  if (grid) {
    grid.innerHTML = '';
    productosMock.forEach(p => {
      grid.innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow border border-poloblue flex flex-col justify-between">
          <div>
            <a href="${p.url}">
              <img src="${p.img}" alt="${p.nombre}" class="w-full h-48 object-contain rounded mb-3 border border-azalea hover:opacity-90 transition">
            </a>
            
            <div class="flex justify-between items-center mb-1">
              <span class="text-xs text-gray-500 font-bold">Cód: ${p.codigo}</span>
              <span class="bg-chelsea/20 text-chelsea text-xs font-bold px-2 py-0.5 rounded">Stock: ${p.stock}</span>
            </div>
            
            <a href="${p.url}" class="font-bold text-scampi hover:text-bittersweet transition text-lg block mb-2">${p.nombre}</a>
            <p class="text-xl font-extrabold text-bittersweet">$${p.precio.toLocaleString('es-CL')}</p>
          </div>
          <button onclick="addToCart(${p.id})" class="mt-4 w-full bg-bittersweet text-white font-bold py-2 rounded hover:bg-bittersweet/90 transition shadow">
            Agregar al Carrito
          </button>
        </div>
      `;
    });
  }
  
  if (typeof updateCartUI === 'function') {
    updateCartUI();
  }
});

// Logica del carrito de compra
function addToCart(pId) {
  const prod = productosMock.find(p => p.id === pId);
  if (!prod) return;

  const item = carrito.find(i => i.id === pId);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ id: prod.id, nombre: prod.nombre, precio: prod.precio, img: prod.img, cantidad: 1 });
  }
  
  updateCartUI();

  const sidebar = document.getElementById('cart-sidebar');
  if (sidebar && sidebar.style.transform !== 'translateX(0px)') {
    toggleCart();
  }
}

function updateCartUI() {
  const countElem = document.getElementById('cart-count') || document.getElementById('cartCount');
  if (countElem) {
    countElem.innerText = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  }

  const container = document.getElementById('cart-items') || document.getElementById('cartItems');
  if (container) {
    container.innerHTML = '';
    let totalPrecio = 0;

    if (carrito.length === 0) {
      container.innerHTML = `<p class="text-gray-500 text-center text-sm mt-8" style="text-align: center; color: #6b7280; font-size: 0.875rem; margin-top: 2rem;">El carrito está vacío.</p>`;
    } else {
      carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalPrecio += subtotal;
        container.innerHTML += `
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
            <img src="${item.img}" alt="${item.nombre}" style="width: 3rem; height: 3rem; object-fit: contain; border-radius: 0.25rem; border: 1px solid #ccc; background: white;">
            <div style="flex-grow: 1; margin: 0 0.75rem;">
              <h4 style="font-size: 0.75rem; font-weight: bold; margin: 0;" class="text-scampi">${item.nombre}</h4>
              <p style="font-size: 0.75rem; color: #4b5563; margin: 0;">CLP $${item.precio.toLocaleString('es-CL')} x ${item.cantidad}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: #ef4444; font-weight: bold; font-size: 1.25rem; cursor: pointer;">&times;</button>
          </div>
        `;
      });
    }

    const totalElem = document.getElementById('cart-total') || document.getElementById('cartTotal');
    if (totalElem) totalElem.innerText = `CLP $${totalPrecio.toLocaleString('es-CL')}`;
  }
}

function removeFromCart(id) {
  carrito = carrito.filter(item => item.id !== id);
  updateCartUI();
}

function toggleCartModal() {
  const modal = document.getElementById('cartModal');
  if (modal) modal.classList.toggle('hidden');
}
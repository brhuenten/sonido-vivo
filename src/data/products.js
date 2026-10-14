import GuitarraYamaha from '../assets/img/GuitarraYamaha.png';
import GuitarraDreadnough from '../assets/img/GuitarraDreadnough.png';
import GuitarraC40 from '../assets/img/GuitarraC40.png';
import GuitarraStratocaster from '../assets/img/GuitarraStratocaster.png';

export const PRODUCTOS = [
  { id: 1, code: 'GA001', stock: 8, title: 'Guitarra Acústica Folk Yamaha',
    model: 'F310', price: 129990, description: 'Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.',
    image: GuitarraYamaha,
    categoria: 'Guitarras Acústicas',
  },
  { id: 2, code: 'GA002', stock: 5, title: 'Guitarra Acústica Dreadnought Fender',
    model: 'CD-60S', price: 189990, description: 'Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.',
    image: GuitarraDreadnough,
    categoria: 'Guitarras Acústicas',
  },
  { id: 3, code: 'GA003', stock: 10, title: 'Guitarra Acústica Clásica 4/4 Yamaha', model: 'C40', price: 89990, description: 'Nailon, tapa de abeto. Ideal para estudio y flamenco.',
    image: GuitarraC40,
    categoria: 'Guitarras Acústicas',
  },
  { id: 4, code: 'GE001', stock: 5, title: 'Guitarra Eléctrica Stratocaster Squier', model: 'Affinity Strat', price: 249990, description: 'Cuerpo de álamo, mástil de arce, pastillas SSS.', image: GuitarraStratocaster,
    categoria: 'Guitarras Eléctricas',
  },
];

export const CATEGORIAS = [...new Set(PRODUCTOS.map((p) => p.categoria).filter(Boolean))]

export const filtrarPorCategoria = (categoria) => {
  if (!categoria || categoria === 'todas') return PRODUCTOS
  return PRODUCTOS.filter((p) => p.categoria === categoria)
}

export const buscarProducto = (id) => PRODUCTOS.find((p) => p.id === Number(id))

export const formatoPrecio = (valor) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor)

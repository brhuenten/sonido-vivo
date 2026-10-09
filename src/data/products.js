import GuitarraYamaha from '../assets/GuitarraYamaha.png';
import GuitarraDreadnough from '../assets/GuitarraDreadnough.png';
import GuitarraC40 from '../assets/GuitarraC40.png';

export const PRODUCTS = [
  {
    id: 1,
    code: 'GA001',
    stock: 8,
    title: 'Guitarra Acústica Folk Yamaha',
    model: 'F310',
    price: 129990,
    description: 'Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.',
    image: GuitarraYamaha,
  },
  {
    id: 2,
    code: 'GA002',
    stock: 5,
    title: 'Guitarra Acústica Dreadnought Fender',
    model: 'CD-60S',
    price: 189990,
    description: 'Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.',
    image: GuitarraDreadnough,
  },
  {
    id: 3,
    code: 'GA003',
    stock: 10,
    title: 'Guitarra Acústica Clásica 4/4 Yamaha',
    model: 'C40',
    price: 89990,
    description: 'Nailon, tapa de abeto. Ideal para estudio y flamenco.',
    image: GuitarraC40,
  },
];

export function getProductById(id) {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return undefined;
  return PRODUCTS.find((product) => product.id === numericId);
}

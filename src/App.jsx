import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Inicio from './pages/Inicio.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Perfil from './pages/Perfil.jsx'
import Logout from './pages/Logout.jsx'
import Admin from './pages/Admin.jsx'
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import NotFound from './pages/NotFound.jsx'
import Checkout from './pages/Checkout.jsx'
import CheckoutConfirmacion from './pages/CheckoutConfirmacion.jsx'

export default function App() {
   return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />
          <Route path="logout" element={<Logout />} />
          <Route element={<RequireAuth />}>
            <Route path="perfil" element={<Perfil />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout/confirmacion" element={<CheckoutConfirmacion />} />
          </Route>
          <Route element={<RequireAuth adminOnly />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="products/:id" element={<ProductoDetalle />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}
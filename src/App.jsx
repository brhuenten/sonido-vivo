import {} from 'react';
import {  Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
   return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Registro />} />        
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="products/:id" element={<ProductoDetalle />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Facturacion from '../pages/Facturacion';
import Orders from '../pages/Orders';
import Tables from '../pages/Tables';
import Reports from '../pages/Reports';
//import MainLayout from '../layouts/MainLayout';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/facturacion" element={<Facturacion />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/ordenes" element={<Orders />} />
    <Route path="/mesas" element={<Tables />} />
    <Route path="/Reporte" element={<Reports />} />
  </Routes>
);

export default AppRoutes;
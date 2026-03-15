import {Routes, Route } from "react-router-dom";
import { FormularioV } from "./Components/FormularioV";
import { Nav } from "./Components/Nav";
import { Cotizacion } from "./Components/cotizacion";
import { FormularioC } from "./Components/FormulacioC";
import { FormularioU } from "./Components/FormularioU";
import Usuarios from "./Components/usuarios";
import LoginPage from "./Pages/loginPage";
import HomePage from "./Pages/homePage";
import Pedidos from "./Components/pedidos";
import VacacionesPage from "./Pages/vacacionesPage";
import FormularioVacaciones from "./Components/FormularioVacaciones";
import FacturasPage from "./Pages/facturasPage";
import GastosPage from "./Pages/gastosPage";
import VentasPage from "./Pages/ventasPage";
import InventarioPage from "./Pages/inventarioPage";
import CuentasPage from "./Pages/cuentasPage";
import UsuarioPage from "./Pages/usuarioPage";
import SyncPage from "./Pages/SyncPage";

function App() {
  return (


      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/Inicio" element={<HomePage/>}></Route>
        <Route path="/Usuarios" element={<Usuarios/>}></Route>
        <Route path="/formularioPedido" element={<FormularioV/>}></Route>
        <Route path="/Cotizacion" element={<Cotizacion/>}></Route>
        <Route path="/formularioCotizacion" element={<FormularioC/>}></Route>
        <Route path="/formularioUsuario" element={<FormularioU/>}></Route>
        <Route path="/Pedidos" element={<Pedidos/>}></Route>
        <Route path="/Vacaciones" element={<VacacionesPage/>}></Route>
        <Route path="/PeticionVacaciones" element={<FormularioVacaciones/>}></Route>
        <Route path="/Facturas" element={<FacturasPage/>}></Route>
        <Route path="/Gastos" element={<GastosPage/>}></Route>
        <Route path="/Ventas" element={<VentasPage/>}></Route>
        <Route path="/Inventario" element={<InventarioPage/>}></Route>
        <Route path="/Cuentas" element={<CuentasPage/>}></Route>
        <Route path="/Usuario" element={<UsuarioPage/>}></Route>
        <Route path="/Sync" element={<SyncPage/>}></Route>
      </Routes>    

  );
}

export default App;

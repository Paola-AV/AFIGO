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

function App() {
  return (
    <>
    <Nav/>
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
      </Routes>    
    </>
  );
}

export default App;

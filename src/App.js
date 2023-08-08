import {Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";
import { FormularioV } from "./Components/FormularioV";
import { Nav } from "./Components/Nav";
import { Cotizacion } from "./Components/Cotizacion";
import { FormularioC } from "./Components/FormulacioC";

function App() {
  return (
    <>
    <Nav/>
      <Routes>
        <Route path="/Sesion" element={<Login/>}></Route>
        <Route path="/Inicio" element={<Home></Home>}></Route>
        <Route path="/Ventas" element={<FormularioV/>}></Route>
        <Route path="/Cotizacion" element={<Cotizacion/>}></Route>
        <Route path="/formularioCotizacion" element={<FormularioC/>}></Route>
      </Routes>    
    </>
  );
}

export default App;

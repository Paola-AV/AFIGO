import {Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";
<<<<<<< Updated upstream
=======
import { FormularioV } from "./Components/FormularioV";
import { Nav } from "./Components/Nav";
import { Cotizacion } from "./Components/Cotizacion";
import { FormularioC } from "./Components/FormulacioC";
import { FormularioU } from "./Components/FormularioU";
import { Usuarios } from "./Components/Usuarios";
>>>>>>> Stashed changes

function App() {
  return (
    <>
      <Routes>
        <Route path="/Sesion" element={<Login/>}></Route>
        <Route path="/Inicio" element={<Home></Home>}></Route>
<<<<<<< Updated upstream
=======
        <Route path="/Ventas" element={<FormularioV/>}></Route>
        <Route path="/Cotizacion" element={<Cotizacion/>}></Route>
        <Route path="/Usuarios" element={<Usuarios/>}></Route>
        <Route path="/formularioCotizacion" element={<FormularioC/>}></Route>
        <Route path="/formularioUsuario" element={<FormularioU/>}></Route>
>>>>>>> Stashed changes
      </Routes>    
    </>
  );
}

export default App;

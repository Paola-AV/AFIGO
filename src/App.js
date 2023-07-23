import {Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";
import { FormularioV } from "./Components/FormularioV";
import { Nav } from "./Components/Nav";

function App() {
  return (
    <>
    <Nav/>
      <Routes>
        <Route path="/Sesion" element={<Login/>}></Route>
        <Route path="/Inicio" element={<Home></Home>}></Route>
        <Route path="/Ventas" element={<FormularioV/>}></Route>
      </Routes>    
    </>
  );
}

export default App;

import {Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Sesion" element={<Login/>}></Route>
        <Route path="/Inicio" element={<Home></Home>}></Route>
      </Routes>    
    </>
  );
}

export default App;

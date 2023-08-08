import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Sidebar(){
    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "Pedidos", src: "Chart_fill" },
      { title: "Cotizaciones", src: "Chat" },
      { title: "Usuarios", src: "User", gap: true },
      { title: "Configuracion", src: "Calendar" },
      { title: "Search", src: "Search" },
      { title: "Analytics", src: "Chart" },
      { title: "Files ", src: "Folder", gap: true },
      { title: "Setting", src: "Setting" },
    ];
  
    return (
      <div className="flex">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
        >
          <img
            src="./src/assets/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
         
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
              >
                <img src={`./src/assets/${Menu.src}.png`} />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-screen flex-1 p-7">
          <h1 className="text-2xl font-semibold ">Home Page</h1>
        </div>
      </div>
    );
}

/*  const navigate=useNavigate()
    return(
        
        <div class="h-screen w-60 bg-navy p-4 antialiased">
            <ul class="mt-10 flex w-full flex-col gap-3">
                <li>
                    <a href="/Inicio" class="flex items-center gap-2 rounded-md  bg-primary-light/40 px-3 py-2 text-white font-bold">
                        Pedidos
                    </a>
                </li>
                <li>
                    <a href="/Cotizacion" class="flex items-center gap-2 rounded-md px-3 py-2 text-white font-bold">
                        Cotizaciones
                    </a>
                </li> 
                <li>
                    <a href="#" class="flex items-center gap-2 rounded-md px-3 py-2 text-white font-bold">
                        Usuarios
                    </a>
                </li> 
                <li>
                    <a href="#" class="flex items-center gap-2 rounded-md px-3 py-2 text-white font-bold">

                        Settings
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center gap-2 rounded-md px-3 py-2 text-white font-bold">
                        Projects
                    </a>
                </li>
            </ul>
            
        </div>
    )*/
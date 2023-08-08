import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineForm } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { HiMenuAlt3 } from "react-icons/hi";

export function Sidebar(){
  const menus = [
    { name: "Pedidos", link: "/Inicio", icon: AiOutlineShoppingCart },
    { name: "Cotizaciones", link: "/Cotizacion", icon: AiOutlineForm },
    { name: "Usuarios", link: "/Inicio", icon: AiOutlineUser },
    { name: "analytics", link: "/Inicio", icon: AiOutlineUser, margin: true },
    { name: "File Manager", link: "/Inicio", icon: AiOutlineUser },
    { name: "Cart", link: "/Inicio", icon: AiOutlineUser },
    { name: "Saved", link: "/Inicio", icon: AiOutlineUser, margin: true },
    { name: "Setting", link: "/Inicio", icon: AiOutlineUser },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6">
      <div
        className={`bg-navy min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer text-white"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md text-white`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
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
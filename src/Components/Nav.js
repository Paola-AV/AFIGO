import { FiSettings } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";

export function Nav(){
  const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<div class="bg-light rounded-full grid-row grid-rows-2"><img src="afigoL.png" class="w-20 pt-2"/></div>
			<nav ref={navRef}>
		
        <a href="#" class="flex flex-row items-center"><FaRegUserCircle class="mx-1"/> Usuario</a>
        <a href="#" class="flex flex-row items-center"><FiSettings class="mx-1"/> Configuracion</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

/*
  return(
        <header>
        <div class="text-white bg-navy py-5 px-10 md:flex md:items-center md:justify-between md:px-40">
      <div class="flex items-center justify-between">
        <div class="bg-light rounded-full"><img src="afigoL.png" class="w-20 p-1 pt-2"/></div>

      </div>
      <div class="flex flex-row text-left justify-center">
        <a href="#" class=""><FaRegUserCircle class="w-10 h-10 pr-2 mr-4"/></a>
        <a href="#" class=""><FiSettings class="w-10 h-10 pl-2 ml-4"/></a>
  
      </div>
    </div>
      </header>
    )*/
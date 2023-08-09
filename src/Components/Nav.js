import { FiSettings } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";

export function Nav(){

	return (
		<header class="bg-navy w-full">
			<div class="bg-light rounded-full grid-row grid-rows-2"><img src="afigoL.png" class="w-20 pt-2"/></div>
			<div className="w-50 grid">
				<ul className="flex flex-row justify-end">
					<li> <a href="#" class=""><FaRegUserCircle class="w-10 h-10 pr-2 mr-4"/></a></li>
					<li><a href="#" class=""><FiSettings class="w-10 h-10 pl-2 ml-4"/></a></li>
				</ul>
			</div>
		</header>
	);
}

/*
  return(
        <header>
        <div class="text-white bg-royal py-5 px-10 md:flex md:items-center md:justify-between md:px-40">
      <div class="flex items-center justify-between">
        <div class="bg-light rounded-full -translate-x-20"><img src="afigoL.png" class="w-20 pt-2"/></div>

      </div>
      <div class="flex flex-row text-left justify-center">
        <a href="#" class=""><FaRegUserCircle class="w-10 h-10 pr-2 mr-4"/></a>
        <a href="#" class=""><FiSettings class="w-10 h-10 pl-2 ml-4"/></a>
  
      </div> 
    </div>
      </header>
    )*/
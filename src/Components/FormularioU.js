import { IoChevronBackCircleSharp} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function FormularioU(){
    const navigate=useNavigate()
    return (
        <section class="flex flex-col w-full justify-center items-center">
            <div class="self-start ml-20 mt-10">
                <button onClick={() => navigate('/Inicio')}><IoChevronBackCircleSharp class="w-10 h-10 fill-navy"/></button>
            </div>
            <div class="pt-8 ">
                <h1 class="text-4xl font-bold text-royal">Nuevo Usuario</h1>
            </div>
            <div class="flex flex-col w-1/2 justify-center items-center pt-20">
                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Nombre</label>
                    <input class="border border-navy w-1/2"></input>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Direccion</label>
                    <input class="border border-navy w-1/2"></input>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Usuario administrador</label>
                    <select class="border border-navy w-1/2">
                        <option>No</option>
                        <option>Si</option>
                    </select>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Nombre de usuario</label>
                    <input class="border border-navy w-1/2"></input>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Contraseña</label>
                    <input class="border border-navy w-1/2"></input>
                </div>

                <button class="bg-navy text-white font-semibold p-3 pl-4 pr-4 mb-8 rounded-xl">Enviar</button>

            </div>
        </section>
    )
}
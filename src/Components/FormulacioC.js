import { IoChevronBackCircleSharp} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function FormularioC() {
    const navigate=useNavigate()
    return (
        <section class="flex flex-col w-full justify-center items-center">
            <div class="self-start ml-20 mt-10">
                <button onClick={() => navigate('/Cotizacion')}><IoChevronBackCircleSharp class="w-10 h-10 fill-royal"/></button>
            </div>
            <div class="pt-8 ">
                <h1 class="text-4xl font-bold text-royal">Formulario de cotizaciones</h1>
            </div>
            <div class="flex flex-col w-1/2 justify-center items-center pt-20">

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Nombre del cliente</label>
                    <input class="border border-navy w-1/2"></input>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Producto y cantidad</label>
                    <input class="border border-navy w-1/2"></input>
                </div>


                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Descripcion del producto</label>
                    <input class="border border-navy w-1/2"></input>
                </div>

                <div class="flex flex-col m-4 w-full justify-center items-center">
                    <label class="font-semibold">Contacto del cliente</label>
                    <input class="border border-navy w-1/2"></input>
                </div>

                <button class="bg-royal text-white font-semibold p-3 pl-4 pr-4 mb-8 rounded-xl">Enviar</button>

            </div>
        </section>
    )
}
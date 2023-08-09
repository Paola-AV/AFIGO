import { Nav } from "./Nav"
import { Sidebar } from "./Sidebar"
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate=useNavigate()

    return (
        
            <section class="flex flex-row w-full">
                <div>
                    <Sidebar class="w-3/12"/>
                </div>
                <section class="flex flex-col w-9/12">
                    <div class="m-5 p-5 ">
                        <button class="bg-grotto p-5 rounded-full font-bold border-none shadow-md text-royal drop-shadow-2xl" onClick={() => navigate('/Ventas')} >Nuevo Pedido</button>
                    </div>

                    <div class="flex content-center items-center overflow-x-auto overflow-y-auto">

                        <table class="table-auto border-collapse border border-grotto self-center ml-10">

                            <thead >
                                <tr class="border border-royal bg-grotto">
                                    <th class="p-2 border border-mid">Vendendor</th>
                                    <th class="p-2 border border-mid">Cliente</th> 
                                    <th class="p-2 border border-mid">Factura</th>
                                    <th class="p-2 border border-mid">Producto</th>
                                    <th class="p-2 border border-mid">Cantidad</th>
                                    <th class="p-2 border border-mid">Envio</th>
                                    <th class="p-2 border border-mid">Direccion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="even:bg-grotto odd:bg-baby">
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                </tr>
                                <tr class="even:bg-grotto odd:bg-baby">
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th  class="p-2 border border-mid"> </th>
                                </tr>
                                <tr class="even:bg-grotto odd:bg-baby">
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </section>
            </section>

        
    )
}
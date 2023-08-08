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
                <section class="alex flex-col w-11/12">
                    <div class="m-5 p-5 ">
                        <button class="bg-grotto p-5 rounded-xl font-semibold border-2 border-royal" onClick={() => navigate('/Ventas')} >Nuevo Pedido</button>
                    </div>
<<<<<<< Updated upstream
                    <div class="flex content-center items-center">
=======
                    <div class="flex content-center items-center overflow-x-auto overflow-y-auto">
>>>>>>> Stashed changes
                        <table class="table-auto border-collapse border border-grotto self-center ml-10">

                            <thead >
                                <tr class="border border-royal bg-grotto">
                                    <th class="p-2 border border-royal">Vendendor</th>
                                    <th class="p-2 border border-royal">Cliente</th> 
                                    <th class="p-2 border border-royal">Factura</th>
                                    <th class="p-2 border border-royal">Producto</th>
                                    <th class="p-2 border border-royal">Cantidad</th>
                                    <th class="p-2 border border-royal">Envio</th>
                                    <th class="p-2 border border-royal">Direccion</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-baby">
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                </tr>
                                <tr class="bg-baby">
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th  class="p-2 border border-grotto"> </th>
                                </tr>
                                <tr class="bg-baby">
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                    <th class="p-2 border border-grotto"> </th>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </section>
            </section>

        
    )
}
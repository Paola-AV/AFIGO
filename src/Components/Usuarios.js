import { Nav } from "./Nav"
import { Sidebar } from "./Sidebar"
import { useNavigate } from "react-router-dom";

export function Usuarios() {
    const navigate=useNavigate()

    return (
        
            <section class="flex flex-row w-full">
                <div>
                    <Sidebar class="w-3/12"/>
                </div>
                <section class="alex flex-col w-11/12">
                    <div class="m-5 p-5 ">
                        <button class="bg-grotto p-5 rounded-xl font-semibold border-2 border-royal" onClick={() => navigate('/formularioUsuario')}>Nuevo Usuario</button>
                    </div>
                    <div class="flex content-center items-center overflow-x-auto overflow-y-auto">
                        <table class="table-auto border-collapse border border-grotto self-center ml-10">

                            <thead >
                                <tr class="border border-royal bg-grotto">
                                    <th class="p-2 border border-mid">Nombre</th>
                                    <th class="p-2 border border-mid">Direccion</th> 
                                    <th class="p-2 border border-mid">Usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-baby">
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                </tr>
                                <tr class="bg-baby">
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                    <th class="p-2 border border-mid"> </th>
                                </tr>
                                <tr class="bg-baby">
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
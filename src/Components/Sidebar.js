
export function Sidebar(){
    return(
        
        <div class="h-screen w-60 bg-royal p-4 antialiased">
            <ul class="mt-10 flex w-full flex-col gap-3">
                <li>
                    <a href="#" class="flex items-center gap-2 rounded-md  bg-primary-light/40 px-3 py-2 text-white font-bold">
                        Pedidos
                    </a>
                </li>
                <li>
                    <a href="#" class="flex items-center gap-2 rounded-md px-3 py-2 text-white font-bold">
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
    )
}
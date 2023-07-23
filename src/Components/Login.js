

export function Login() {
    return (
        <section class="flex flex-row justify-center ">
            <div class="w-1/2" >
                <img src="/afigoLogo.jpg" class="w-full"></img>
            </div>
            <div class="w-1/2 mt-28">
                <div class="flex flex-col mb-8 mt-10 pl-9 items-center">
                    <h1 class="text-6xl font-bold pb-9">Bienvenido</h1>
                    <h2 class="text-4xl font-bold pb-9">Inicio de Sesión</h2>
                </div>
                <div class="flex flex-col items-center">
                    <div class="flex flex-row p-9">
                        <label class="text-2xl pr-5">Usuario</label>
                        <input class="w-3/5 shadow-lg"></input>
                    </div>
                    <div class="flex flex-row p-9 ">
                        <label class="text-2xl pr-5">Contraseña</label>
                        <input class="w-3/5 shadow-lg "></input>
                    </div>

                    <button class="bg-blue-900 w-40 p-2 text-white font-bold rounded-2xl mt-4 ml-10 text-lg">Iniciar Sesión</button>
                </div>
            </div>

            </section>
            
    )
}
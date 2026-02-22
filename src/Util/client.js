
const API_BASE_URL = "https://localhost:7122/api/";


// 1) Helper para redirigir en 401 o 403
function handle401(status) {
    if (status === 401) {
        // Evita bucle si ya estás en /login
        if (window.location.pathname !== "/") {
            // Guardar returnUrl para volver luego de autenticarse
            const returnUrl = encodeURIComponent(window.location.href);
            window.location.href = `/?returnUrl=${returnUrl}`;
        }
    }
}

function handle403(status) {
    if (status === 403) {
        // Puedes mostrar mensaje o redirigir a "Acceso denegado"
        // window.location.href = "/acceso-denegado";
        alert("No tienes permisos para esta acción.");
    }
}

// 2) Helper para evaluar la respuesta en un solo lugar
async function ensureOk(response) {
    if (response.ok) return response;
    console.log(`HTTP error ${response.status} ${response.statusText}, "response":`, response);
    if (response.status === 401) {
        handle401(response.status);
    } else if (response.status === 403) {
        handle403(response.status);
    }

    // Armar detalle de error
    let detail = "";
    try {
        const contentType = response.headers.get("Content-Type") || "";
        if (contentType.includes("application/json")) {
            const data = await response.json();
            detail = typeof data === "string" ? data : JSON.stringify(data);
        } else {
            detail = await response.text();
        }
    } catch { /* sin-op */ }

    throw new Error(`HTTP ${response.status} ${response.statusText}${detail ? ` – ${detail}` : ""}`);
}

// 3) Helper para parsear respuesta (JSON / texto / 204)
async function parseResponse(response) {
    if (response.status === 204) return null;
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) return response.json();
    return response.text();
}



export class Client {


    static async get(uri) {
        const response = await fetch(API_BASE_URL + uri, {
            method: "GET",
            headers: { "Accept": "application/json" },
            credentials: "include"
        });

        await ensureOk(response);
        return parseResponse(response);
    }

    static async post(uri, body) {
        const response = await fetch(API_BASE_URL + uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify(body),
            credentials: "include"
        });

        await ensureOk(response);
        return parseResponse(response);
    }

    static async put(uri, body) {
        const response = await fetch(API_BASE_URL + uri, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest"
            },
            body: JSON.stringify(body),
            credentials: "include"
        });

        await ensureOk(response);
        return parseResponse(response);
    }

    static async delete(uri) {
        const response = await fetch(API_BASE_URL + uri, {
            method: "DELETE",
            headers: { "X-Requested-With": "XMLHttpRequest" },
            credentials: "include"
        });

        await ensureOk(response);
        return parseResponse(response);
    }


    //urls para usuarios

    static getUsuarios() {
        return this.get(`Usuarios`);
    }

    static getUsuarioById(id) {
        return this.get(`Usuarios/${id}`);
    }

    static createUsuario(usuario) {
        return this.post(`Usuarios`, usuario);
    }

    static updateUsuario(usuario) {
        return this.put(`Usuarios`, usuario);
    }

    static deleteUsuario(id) {
        return this.delete(`Usuarios/${id}`);
    }

    //urls para pedidos

    static getPedidos() {
        return this.get(`Pedido`);
    }

    static getPedidoById(id) {
        return this.get(`Pedido/${id}`);
    }

    static createPedido(pedido) {
        return this.post(`Pedido`, pedido);
    }

    static updatePedido(pedido) {
        return this.put(`Pedido`, pedido);
    }
    static deletePedido(id) {
        return this.delete(`Pedido/${id}`);
    }

    static getPedidoTipo() {
        return this.get(`Pedido/pedido`);
    }

    static getPedidoCotizacion() {
        return this.get(`Pedido/cotizacion`);
    }

    //urls para trabajadores

    static getTrabajadores() {
        return this.get(`Trabajador/vacationdays`);
    }

    static getTrabajadorById(id) {
        return this.get(`Trabajador/${id}`);
    }

    static getTrabajadorByUsuarioId(id) {
        return this.get(`Trabajador/user/${id}`);
    }

    static createTrabajador(trabajador) {
        return this.post(`Trabajador`, trabajador);
    }

    static updateTrabajador(trabajador) {
        return this.put(`Trabajador`, trabajador);
    }

    static deleteTrabajador(id) {
        return this.delete(`Trabajador/${id}`);
    }

    //urls para clientes
    static getClientes() {
        return this.get(`Cliente`);
    }

    static getClienteById(id) {
        return this.get(`Cliente/${id}`);
    }


    //urls para productos

    static getProductos() {
        return this.get(`Producto`);
    }

    static getProductoById(id) {
        return this.get(`Producto/${id}`);
    }


    //urls para proveedores
    static getProveedores() {
        return this.get(`Proveedor`);
    }

    static getProveedorById(id) {
        return this.get(`Proveedor/${id}`);
    }


    //urls para peticion de vacaciones

    static getPeticionesVacaciones() {
        return this.get(`PeticionVacaciones`);
    }

    static getPeticionVacacionesById(id) {
        return this.get(`PeticionVacaciones/${id}`);
    }

    static getPeticionVacacionesByTrabajadorId(id) {
        return this.get(`PeticionVacaciones/trabajador/${id}`);
    }

    static createPeticionVacaciones(peticion) {
        return this.post(`PeticionVacaciones`, peticion);
    }

    static updatePeticionVacaciones(peticion) {
        return this.put(`PeticionVacaciones`, peticion);
    }

    static deletePeticionVacaciones(id) {
        return this.delete(`PeticionVacaciones/${id}`);
    }

    //urls para gastos
    static getGastos() {
        return this.get(`Gasto`);
    }

    //urls para facturas
    static getFacturas() {
        return this.get(`Factura`);
    }

    //urls para ventas
    static getVentas() {
        return this.get(`Venta`);
    }

    getVentaByIdTrabajador(id) {
        return this.get(`Venta/${id}`);
    }
    //urls para detalles de venta
    static getDetallesVenta() {
        return this.get(`VentaDetalle`);
    }

    static getDetallesVentaById(id) {
        return this.get(`VentaDetalle/${id}`);
    }

    //urls para inventario
    static getInventario() {
        return this.get(`Inventario`);
    }

    //urls para cuentas
    static getCuentas() {
        return this.get(`Cuenta`);
    }

    //urls para login

    static async login(correoOUsuario, password) {
        // Tu endpoint: POST /api/auth/login (AllowAnonymous)
        return this.post("Auth/login", { correoOUsuario, password });
    }

    static async logout() {
        // Tu endpoint: POST /api/auth/logout (requiere cookie)
        return this.post("Auth/logout", {}); // backend hace SignOut y devuelve 200
    }
    static async register(usuario) {
        
        return this.post("Auth/register", usuario);
    }


}


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

    static async downloadExcel(uri, suggestedName = "export.xlsx") {
        const response = await fetch(API_BASE_URL + uri, {
            method: "GET",
            // Para Excel el Accept no tiene que ser JSON
            headers: { "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
            credentials: "include" // mantiene cookies/sesión si tu API las usa
        });

        await ensureOk(response); // reutiliza tu manejo 401/403/errores

        // Intenta obtener el nombre de archivo del header Content-Disposition
        const dispo = response.headers.get("Content-Disposition") || "";
        let fileName = suggestedName;
        const match = dispo.match(/filename\*?=([^;]+)$/i);
        if (match) {
            // Soporta filename* con UTF-8 o filename simple
            let raw = match[1].trim();
            // Quita comillas
            raw = raw.replace(/^UTF-8''/, "").replace(/^["']|["']$/g, "");
            // decodeURIComponent si viene percent-encoded
            try { fileName = decodeURIComponent(raw); } catch { fileName = raw; }
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Crea ancla para descargar
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName || suggestedName;
        document.body.appendChild(a);
        a.click();
        a.remove();

        // Limpia el ObjectURL
        window.URL.revokeObjectURL(url);

        // Devuelve info por si quieres notificar/telemetría
        return { ok: true, fileName: a.download, size: blob.size, contentType: blob.type };
    }

    //urls para usuarios

    static getUsuarios() {
        return this.get(`Usuarios/usuariotrabajador`);
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

     static inactivarUsuario(id) {
        return this.put(`Usuarios/inactivo/${id}`, {});
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
        return this.get(`Pedido/pedido/detalles`);
    }

    static getPedidoCotizacion() {
        return this.get(`Pedido/cotizacion/detalles`);
    }

    //urls para detalle de pedidos

    static getPedidosDetalle() {
        return this.get(`DetallePedido`);
    }

    static getDetallePedidoById(id) {
        return this.get(`DetallePedido/${id}`);
    }

    static createDetallePedido(detallePedido) {
        return this.post(`DetallePedido`, detallePedido);
    }

    static updateDetallePedido(detallePedido) {
        return this.put(`DetallePedido`, detallePedido);
    }
    static deleteDetallePedido(id) {
        return this.delete(`DetallePedido/${id}`);
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

    static descargarExcelGastos() {
        return this.downloadExcel(`Gasto/excel`, "gastos.xlsx");
    }

    //urls para facturas
    static getFacturas() {
        return this.get(`Factura`);
    }

    static descargarExcelFacturas() {
        return this.downloadExcel(`Factura/excel`, "facturas.xlsx");
    }

    //urls para ventas
    static getVentas() {
        return this.get(`Venta`);
    }

    static getAllVentasConDetalles(desde, hasta) {
        return this.get(`Venta/detalles?desde=${desde}&hasta=${hasta}`);
    }

    static getAllVentasConDetallesPorVendedor(desde, hasta, nombreVendedor) {
        return this.get(`Venta/detalles/vendedor?desde=${desde}&hasta=${hasta}&nombreVendedor=${nombreVendedor}`);
    } 

    static getVentaByIdTrabajador(id) {
        return this.get(`Venta/${id}`);
    }

    static getAllComisiones() {
        return this.get(`Venta/comision/todas`);
    }

    static getComisionPorVendedor(nombreVendedor) {
        return this.get(`Venta/comision?nombreVendedor=${nombreVendedor}`);
    }

    static descargarExcelVentas(desde, hasta) {
        return this.downloadExcel(`Venta/excel?desde=${desde}&hasta=${hasta}`, "ventas.xlsx");
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

    static descargarExcelInventario() {
        return this.downloadExcel(`Inventario/excel`, "inventario.xlsx");
    }
    //urls para cuentas
    static getCuentas() {
        return this.get(`Cuenta`);
    }

    static descargarExcelCuentas() {
        return this.downloadExcel(`Cuenta/excel`, "cuentas.xlsx");
    }

    //urls para login
    static async login(correoOUsuario, password) {
        return this.post("Auth/login", { correoOUsuario, password });
    }

    static async logout() {
        return this.post("Auth/logout", {});
    }

    static async register(usuario) {
        return this.post("Auth/register", usuario);
    }

    static async cambiarContrasena(userId, currentPassword, newPassword) {
        return this.post("Auth/change-password", { userId, currentPassword, newPassword });
    }

    //urls para sync
    static getSyncStatus() {
        return this.get(`ExternalSync`);
    }

    static async syncAll() {
        return this.post("ExternalSync/sync", {});
    }

    static async syncCuentas() {
        return this.post("ExternalSync/syncCuentas", {});
    }

    static async syncVentas() {
        return this.post("ExternalSync/syncVentas", {});
    }
    static async syncFacturas() {
        return this.post("ExternalSync/syncFacturas", {});
    }

    static async syncInventario() {
        return this.post("ExternalSync/syncInventario", {});
    }

    static async syncGastos() {
        return this.post("ExternalSync/syncGasto", {});
    }

    static async syncProveedor() {
        return this.post("ExternalSync/syncProveedor", {});
    }

    static async syncProducto() {
        return this.post("ExternalSync/syncProducto", {});
    }

    //urls para vendedores
    static getNombreVendedores() {
        return this.get(`Vendedor`);
    }
}

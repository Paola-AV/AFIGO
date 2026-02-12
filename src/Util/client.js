
const API_BASE_URL = "https://localhost:7122/api/";

export class Client {

    static get(uri) {
        return fetch(API_BASE_URL + uri, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.json();
            });
    }

    static post(uri, body) {
        return fetch(API_BASE_URL + uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.json();
            });
    }

    static put(uri, body) {
        return fetch(API_BASE_URL + uri, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {

                if (!response.ok) {

                    let errText = "";
                    try { errText = response.text(); } catch { }
                    throw new Error(`HTTP ${response.status} ${response.statusText}${errText ? ` – ${errText}` : ""}`);
                }
                return response.status;
            });
    }


    static async delete(uri) {
        const response = await fetch(API_BASE_URL + uri, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            let errText = "";
            try { errText = await response.text(); } catch { }
            throw new Error(`HTTP ${response.status}: ${response.statusText}${errText ? ` – ${errText}` : ""}`);
        }

        
        return { ok: true, status: response.status }; 
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

}

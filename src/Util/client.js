
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
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        });
    }

    static delete(uri) {
        return fetch(API_BASE_URL + uri, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json().catch(() => null); 
           
        });
    }

    //urls para usuarios

    static getUsuarios (){
        return this.get(`Usuarios`);
    }

     static getUsuarioById (id){
        return this.get(`Usuarios/${id}`);
    }

    static createUsuario (usuario){
        return this.post(`Usuarios`, usuario);
    }

    static updateUsuario ( usuario){
        return this.put(`Usuarios`, usuario);
    }

    static deleteUsuario (id){
        return this.delete(`Usuarios/${id}`);
    }

    //urls para pedidos

    static getPedidos (){
        return this.get(`Pedido`);
    }

        static getPedidoById (id){
        return this.get(`Pedido/${id}`);
    }

    static createPedido (pedido){
        return this.post(`Pedido`, pedido);    
    }

    static updatePedido ( pedido){
        return this.put(`Pedido`, pedido);
    }
    static deletePedido (id){
        return this.delete(`Pedido/${id}`);
    }

    static getPedidoTipo(){
        return this.get(`Pedido/pedido`);
    }

    static getPedidoCotizacion(){
        return this.get(`Pedido/cotizacion`);
    }
}

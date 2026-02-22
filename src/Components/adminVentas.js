import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";

export default function AdminVentas() {
    const [ventas, setVentas] = useState([]);
    const [detalles, setDetalles] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [rowData, setRowData] = useState([]);


    useEffect(() => {
        Client.getVentas().then(data => {
            setVentas(data);
        }).catch(error => {
            console.error("Error obteniendo ventas:", error);
        });
    }, []);

     useEffect(() => {
        Client.getDetallesVenta().then(data => {
            setDetalles(data);
        }).catch(error => {
            console.error("Error obteniendo ventas:", error);
        });
    }, []);

    useEffect(() => {
        Client.getClientes().then(data => {
            setClientes(data);
        }).catch(error => {
            console.error("Error obteniendo clientes:", error);
        });
    }, []);

    useEffect(() => {
        Client.getTrabajadores().then(data => {
            setTrabajadores(data);
        }).catch(error => {
            console.error("Error obteniendo trabajadores:", error);
        });
    }, []);

    useEffect(() => {
        Client.getProductos().then(data => {
            setProductos(data);
        }).catch(error => {
            console.error("Error obteniendo productos:", error);
        });
    }, []);

    useEffect(() => {
        Client.getUsuarios().then(data => {
            setUsuarios(data);
        }).catch(error => {
            console.error("Error obteniendo usuarios:", error);
        });
    }, []);

 //deberia ser por cada detalle una venta, ventas se repiten
    useEffect(() => {
        if (trabajadores.length > 0 && clientes.length > 0 && detalles.length > 0 && ventas.length > 0 && productos.length > 0 && usuarios.length > 0) {
                const updatedVentas = detalles.map(detalle => {
                    const venta = ventas.find(v => v.idVenta === detalle.idVenta);
                    const cliente = clientes.find(c => c.idCliente === venta.idCliente);
                    const trabajador = trabajadores.find(t => t.idTrabajador === venta.idTrabajador);
                    const user = usuarios.find(u => u.userId === trabajador.idUsuario);
                    const producto = productos.find(p => p.idProducto === detalle.idProducto);
                    return {
                        
                        ...detalle,
                        venta: venta ? venta : "Venta no encontrada",
                        cliente: cliente ? cliente.primerNombre + " " + cliente.primerApellido : "Cliente no encontrado",
                        trabajador: trabajador ? trabajador.primerNombre + " " + trabajador.primerApellido : "Trabajador no encontrado",
                        usuario: user ? user.nombre : "Usuario no encontrado",
                        producto: producto ? producto : "Producto no encontrado"
                    };
                });
                setRowData(updatedVentas);
            }
    }, [ventas, clientes, trabajadores, productos, detalles, usuarios]);

    const colDefs = [
        { headerName: "Producto", field: "producto.nombre", sortable: true, filter: true },
        { headerName: "Familia", field: "producto.familia", sortable: true, filter: true },
        { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
        { headerName: "Numero", field: "venta.numFactura", sortable: true, filter: true },
        { headerName: "Estado", field: "venta.estado", sortable: true, filter: true },
        { headerName: "Sucursal", field: "venta.sucursal", sortable: true, filter: true },
        { headerName: "Fecha", field: "venta.fecha", sortable: true, filter: true },
        { headerName: "Vendedor", field: "usuario", sortable: true, filter: true },
        {headerName: "Cliente", field: "cliente", sortable: true, filter: true,  },

    ];

    const defaultColDef = {
        editable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        filterParams: {
            buttons: ['clear'],
        }
    };

    return (

        <Box sx={{ width: '100%', p: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h1">
                    Ventas
                </Typography>

            </Box>

            <Box sx={{ height: 500, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ width: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        theme={themeQuartz}
                        domLayout='autoHeight'
                    />
                </div>
            </Box>


        </Box>


    );
}

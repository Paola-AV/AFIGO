import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";
import { useAuth } from "../Context/AuthContext"

export default function UserVentas() {
    const { user } = useAuth();
    const [ventas, setVentas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [trabajador, setTrabajador] = useState(null);
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [usuarioTrabajador, setUsuarioTrabajador] = useState(null);


    useEffect(() => {
        if (user) {
            setUsuarioTrabajador(user);
        }
    }, [user]);

    useEffect(() => {
        if (usuarioTrabajador) {
            Client.getTrabajadorByUsuarioId(usuarioTrabajador.userId).then(data => {
                setTrabajador(data);
                console.log("Trabajadores:", data);
            }).catch(error => {
                console.error("Error obteniendo trabajadores:", error);
            });
        }
    }, [usuarioTrabajador]);

    useEffect(() => {
        Client.getProductos().then(data => {
            setProductos(data);
            console.log("Productos:", data);
        }).catch(error => {
            console.error("Error obteniendo productos:", error);
        });
    }, []);

    useEffect(() => {
        if (trabajador && trabajador.idTrabajador) {
            console.log("Trabajador ID:", trabajador.idTrabajador);
            Client.getVentaByIdTrabajador(trabajador.idTrabajador).then(data => {
                setVentas(data);
                console.log("Ventas:", data);
            }).catch(error => {
                console.error("Error obteniendo ventas:", error);
            });
        }
    }, [trabajador]);

    useEffect(() => {
        Client.getClientes().then(data => {
            setClientes(data);
            console.log("Clientes:", data);
        }).catch(error => {
            console.error("Error obteniendo clientes:", error);
        });
    }, []);



    useEffect(() => {
        if (!(trabajador?.idTrabajador && clientes.length && productos.length && ventas.length)) {
            setRowData([]);
            return;
        }

        const vendedor =
            `${trabajador?.primerNombre ?? ""} ${trabajador?.primerApellido ?? ""}`.trim() || "Vendedor";

        const filas = [];

        for (const venta of ventas) {
            const cliente = clientes.find((c) => c.idCliente === venta.idCliente);
            const nombreCliente = cliente
                ? `${cliente.primerNombre ?? ""} ${cliente.primerApellido ?? ""}`.trim()
                : "Cliente no encontrado";

            // Normaliza detalles: soporta venta.detalles (array) o venta.detalle (objeto)
            const detalles = Array.isArray(venta.ventaDetalles)
                ? venta.ventaDetalles
                : venta.ventaDetalles
                    ? [venta.ventaDetalles]
                    : [];

            for (const det of detalles) {
                const producto = productos.find((p) => p.idProducto === det.idProducto);

                filas.push({
                    // campos simples
                    cantidad: det.cantidad ?? 0,
                    usuario: user?.nombre ?? vendedor, // toma del contexto si existe
                    cliente: nombreCliente,

                    // campos anidados para valueGetter
                    producto: producto || null,
                    venta: venta || null,

                    // opcional: id estable por fila (venta + producto)
                    id: `${venta.idVenta ?? venta.numFactura ?? Math.random()}-${det.idProducto}`,
                });
            }
        }

        setRowData(filas);
        console.log("RowData (por detalle):", filas);
    }, [ventas, clientes, productos, trabajador, user]);


    const colDefs = [
        { headerName: "Producto", field: "producto.nombre", sortable: true, filter: true },
        { headerName: "Familia", field: "producto.familia", sortable: true, filter: true },
        { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
        { headerName: "Numero", field: "venta.numFactura", sortable: true, filter: true },
        { headerName: "Estado", field: "venta.estado", sortable: true, filter: true },
        { headerName: "Sucursal", field: "venta.sucursal", sortable: true, filter: true },
        { headerName: "Fecha", field: "venta.fecha", sortable: true, filter: true },
        { headerName: "Vendedor", field: "usuario", sortable: true, filter: true },
        { headerName: "Cliente", field: "cliente", sortable: true, filter: true, },

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

import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "../Components/Nav";
import { Client } from "../Util/client";
import { useAuth } from "../Context/AuthContext"

export default function InventarioPage() {
    const [inventario, setInventario] = useState([]);
    const [inventarioConProductos, setInventarioConProductos] = useState([]);
    const { user, isAdmin, } = useAuth();

    useEffect(() => {
        Client.getInventario().then(data => {
            setInventario(data);
        }).catch(error => {
            console.error("Error obteniendo inventario:", error);
        });
    }, []);

    useEffect(() => {
        if (inventario.length > 0) {
            let inventarioConProductosTemp = [];
            Client.getProductos().then(productos => {
                inventario.forEach(inv => {
                    const producto = productos.find(p => p.idProducto === inv.idProducto);
                    if (producto) {
                        inventarioConProductosTemp.push({ ...inv, producto });
                    }
                });
                setInventarioConProductos(inventarioConProductosTemp);
            });
        }
    }, [inventario]);

    const baseCols = [
        { headerName: "Sucursal", field: "sucursal", sortable: true, filter: true },
        { headerName: "Producto", field: "producto.nombre", sortable: true, filter: true },
        { headerName: "Familia", field: "producto.familia", sortable: true, filter: true },
        { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
        { headerName: "Fecha Ingreso", field: "fechaIngreso", sortable: true, filter: true },
        { headerName: "Precio Venta", field: "producto.precioVenta", sortable: true, filter: true },
    ];

    const adminCols = isAdmin
        ? [
            { headerName: "Precio Costo", field: "producto.precioCosto", sortable: true, filter: true },
        ]
        : [];

    const colDefs = [...baseCols, ...adminCols];

    const defaultColDef = {
        editable: false,
        flex: 1,
        minWidth: 100,
        filter: true,
        filterParams: {
            buttons: ['clear'],
        }
    };

    return (
        <>
            <Nav></Nav>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '90vh', p: 3 }}>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h1">
                        Inventario
                    </Typography>

                </Box>

                <Box sx={{ height: 500, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ width: '100%' }}>
                        <AgGridReact
                            rowData={inventarioConProductos}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz}
                            domLayout='autoHeight' />
                    </div>
                </Box>


            </Box>
        </>

    );
}


import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "../Components/Nav";


export default function InventarioPage() {
    //  public string Sucursal IdProducto Cantidad FechaIngreso
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        setRowData([
            { sucursal: "Sucursal 1", producto: { nombre: "Producto 1", precioCosto: 1000, precioVenta: 5000 }, cantidad: 10, fechaIngreso: "2024-01-01" },
            { sucursal: "Sucursal 2", producto: { nombre: "Producto 2", precioCosto: 2000, precioVenta: 8000 }, cantidad: 20, fechaIngreso: "2024-01-02" },
            { sucursal: "Sucursal 1", producto: { nombre: "Producto 3", precioCosto: 1500, precioVenta: 6500 }, cantidad: 30, fechaIngreso: "2024-01-03" },
            { sucursal: "Sucursal 2", producto: { nombre: "Producto 4", precioCosto: 3500, precioVenta: 12500 }, cantidad: 40, fechaIngreso: "2024-01-04" }
        ]);
    }, []);

    const colDefs = [

        { headerName: "Sucursal", field: "sucursal", sortable: true, filter: true },
        { headerName: "Producto", field: "producto.nombre", sortable: true, filter: true },
        { headerName: "Precio Costo", field: "producto.precioCosto", sortable: true, filter: true },
        { headerName: "Precio Venta", field: "producto.precioVenta", sortable: true, filter: true },
        { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
        { headerName: "Fecha Ingreso", field: "fechaIngreso", sortable: true, filter: true }

    ];

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
                            rowData={rowData}
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


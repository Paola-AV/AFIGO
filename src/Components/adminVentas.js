import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";

export default function AdminVentas() { //Fecha   |   sucursal  | producto  | cantidad | vendedor |Estado de la factura ( cobrado o no cobrado)

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        setRowData([
            { producto: "Producto 1", cantidad: 10, numFactura: "5552965", estado: "Pendiente", sucursal: "Sucursal 1", fecha: "2024-01-01", vendedor: "Empresa A" },
            { producto: "Producto 2", cantidad: 20, numFactura: "5552966", estado: "Pagada", sucursal: "Sucursal 2", fecha: "2024-01-02", vendedor: "Empresa B" },
            { producto: "Producto 3", cantidad: 30, numFactura: "0569874", estado: "Pendiente", sucursal: "Sucursal 1", fecha: "2024-01-01", vendedor: "Empresa A" },
            { producto: "Producto 4", cantidad: 40, numFactura: "7742966", estado: "Pagada", sucursal: "Sucursal 2", fecha: "2024-01-02", vendedor: "Empresa B" }
        ]);
    }, []);

    const colDefs = [
        { headerName: "Producto", field: "producto", sortable: true, filter: true },
        { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
        { headerName: "Numero", field: "numFactura", sortable: true, filter: true },
        { headerName: "Estado", field: "estado", sortable: true, filter: true },
        { headerName: "Sucursal", field: "sucursal", sortable: true, filter: true },
        { headerName: "Fecha", field: "fecha", sortable: true, filter: true },
        { headerName: "Vendedor", field: "vendedor", sortable: true, filter: true },

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

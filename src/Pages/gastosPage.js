import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";


export default function GastosPage() { 

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        setRowData([
            {  sucursal: "Sucursal 1", fecha: "2024-01-01", tipo: "Servicios", monto: 1000, descripcion: "Pago de servicios" },
            {  sucursal: "Sucursal 2", fecha: "2024-01-02", tipo: "Materiales", monto: 1500, descripcion: "Compra de materiales" },
            {  sucursal: "Sucursal 1", fecha: "2024-01-01", tipo: "Servicios", monto: 2000, descripcion: "Pago de servicios" },
            {  sucursal: "Sucursal 2", fecha: "2024-01-02", tipo: "Equipo", monto: 3500, descripcion: "Compra de equipos" }
        ]);
    }, []);

    const colDefs = [
       
        { headerName: "Sucursal", field: "sucursal", sortable: true, filter: true },
        { headerName: "Tipo", field: "tipo", sortable: true, filter: true },
        { headerName: "Monto", field: "monto", sortable: true, filter: true },
        { headerName: "Fecha", field: "fecha", sortable: true, filter: true },
        { headerName: "Descripcion", field: "descripcion",sortable: true, filter: true  }

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
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '90vh', p: 3 }}>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h1">
                    Gastos
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

import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";


export default function CuentasPage() { 
 //proveedor monto/ saldo /estado / factura
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        setRowData([
            {  proveedor: { nombre: "Proveedor 1" }, monto: 1000, saldo: 500, estado: "Pendiente", factura: "FAC-001" },
            {  proveedor: { nombre: "Proveedor 2" }, monto: 1500, saldo: 750, estado: "Pagado", factura: "FAC-002" },
            {  proveedor: { nombre: "Proveedor 3" }, monto: 2000, saldo: 1000, estado: "Pendiente", factura: "FAC-003" },
            {  proveedor: { nombre: "Proveedor 4" }, monto: 3500, saldo: 1750, estado: "Pagado", factura: "FAC-004" }
        ]);
    }, []);

    const colDefs = [
       
        { headerName: "Proveedor", field: "proveedor.nombre", sortable: true, filter: true },
        { headerName: "Monto", field: "monto", sortable: true, filter: true },
        { headerName: "Saldo", field: "saldo", sortable: true, filter: true },
        { headerName: "Estado", field: "estado", sortable: true, filter: true },
        { headerName: "Factura", field: "factura",sortable: true, filter: true  }

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
                    Cuentas por Pagar
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

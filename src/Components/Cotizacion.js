import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "./Nav";



export function Cotizacion() {
    const navigate = useNavigate();

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        setRowData([
            { vendedor: "Juan Perez", cliente: "Empresa A", producto: "Producto 1", cantidad: 10, descripcion: "Descripcion del producto 1", contacto: "Contacto 1" },
            { vendedor: "Maria Lopez", cliente: "Empresa B", producto: "Producto 2", cantidad: 5, descripcion: "Descripcion del producto 2", contacto: "Contacto 2" }
        ]);
    }, []);

    const colDefs = [
        { headerName: "Vendedor", field: "vendedor", sortable: true, filter: true },
        { headerName: "Cliente", field: "cliente", sortable: true, filter: true },
        { headerName: "Producto", field: "producto", sortable: true, filter: true },
        { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
        { headerName: "Descripcion", field: "descripcion", sortable: true, filter: true },
        { headerName: "Contacto", field: "contacto", sortable: true, filter: true }
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
        <>
        <Nav></Nav>
        <Box sx={{ width: '100%', p: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/formularioCotizacion')}
                    sx={{ backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' } }}
                >
                    Nueva Cotización
                </Button>
            </Box>

            <Box sx={{ height: 500, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        theme={themeQuartz} />
                </div>
            </Box>
        </Box>
        </>
    );
}


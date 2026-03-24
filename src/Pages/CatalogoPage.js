import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "../Components/Nav";
import { Client } from "../Util/client";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Fab from '@mui/material/Fab';

export default function CatalogoPage() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        Client.getProductos().then(data => {
            setProductos(data);
            console.log(data)
        }).catch(error => {
            console.error("Error obteniendo inventario:", error);
        });
    }, []);

    const colDefs = [
        { headerName: "Código", field: "descripcion", filter: true },
        { headerName: "Familia", field: "familia", filter: true },
        { headerName: "Nombre", field: "nombre", filter: true,},
        { headerName: "Marca", field: "marca", filter: true },
        { headerName: "Precio Venta", field: "precioVenta", filter: true,valueFormatter: (params) => {
                const value = Number(params.value);
                if (isNaN(value)) return "₡0.00";

                return "₡" + value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }); }
            }
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

    const handleDownload = () => {
        Client.descargarExcelInventario()
    }

    return (
        <>
            <Nav></Nav>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '90vh', p: 3 }}>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h1">
                        Productos
                    </Typography>

                </Box>
                <Fab size="medium" color="secondary" aria-label="add" sx={{ position: 'absolute', top: 100, right: 30, backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' } }} onClick={handleDownload} >
                    <FileDownloadIcon />
                </Fab>
                <Box sx={{ height: 600, width: '100%', borderRadius: 1, overflow: 'hidden' }}>

                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        <AgGridReact
                            rowData={productos}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz}
                            domLayout="normal"
                        />
                    </div>

                </Box>


            </Box>
        </>

    );
}


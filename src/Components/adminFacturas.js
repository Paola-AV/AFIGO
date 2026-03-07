import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Fab from '@mui/material/Fab';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

export default function AdminFacturas() {

    const [rowData, setRowData] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        Client.getFacturas().then(data => {
            setFacturas(data);;
        }).catch(error => {
            console.error("Error obteniendo facturas:", error);
        });
    }, []);

    useEffect(() => {
        if (facturas.length > 0) {
            Client.getProveedores().then(data => {
                setClientes(data);
            }).catch(error => {
                console.error("Error obteniendo proveedores:", error);
            });
        }
    }, [facturas]);


    useEffect(() => {
        if (facturas.length > 0 && clientes.length > 0) {
            const updatedFacturas = facturas.map(factura => {
                const proveedor = clientes.find(c => c.idProveedor === factura.idProveedor);
                return {
                    ...factura,
                    proveedor: proveedor ? proveedor.primerNombre + " " + proveedor.primerApellido : "Proveedor no encontrado"
                };
            });
            setRowData(updatedFacturas);
        }
    }, [facturas, clientes]);

    const colDefs = [
        { headerName: "Numero", field: "numero", sortable: true, filter: true },
        { headerName: "Estado", field: "estado", sortable: true, filter: true },
        { headerName: "Sucursal", field: "sucursal", sortable: true, filter: true },
        {
            headerName: "Fecha", field: "fecha", sortable: true, filter: true,
            valueFormatter: params => {
                if (!params.value) return '';
                return params.value.split('T')[0];
            }
        },
        { headerName: "Proveedor", field: "proveedor", sortable: true, filter: true, },

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

    const handleDownload = () => {
        Client.descargarExcelFacturas()
    }

    return (

        <Box sx={{ width: '100%', p: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h1">
                    Facturas
                </Typography>

            </Box>
        <Fab size="medium" color="secondary" aria-label="add" sx={{position: 'absolute',top: 100,right: 30, backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' }}} onClick={handleDownload} >
          <FileDownloadIcon />
        </Fab>
            <Box sx={{ height: 600, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        theme={themeQuartz}
                        domLayout='normal'
                    />
                </div>
            </Box>
        </Box>


    );
}

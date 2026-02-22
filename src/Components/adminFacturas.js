import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";

export default function AdminFacturas() {

    const [rowData, setRowData] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
            Client.getFacturas().then(data => {
                setFacturas(data);   
            }).catch(error => {
                console.error("Error obteniendo facturas:", error);
            });
        }, []);

     useEffect(() => {
        if (facturas.length > 0) {
            Client.getClientes().then(data => {
                setClientes(data);   
            }).catch(error => {
                console.error("Error obteniendo clientes:", error);
            });
        }
        }, [facturas]);

    useEffect(() => {
        if (facturas.length > 0 && clientes.length > 0) {
            const updatedFacturas = facturas.map(factura => {
                const cliente = clientes.find(c => c.idCliente === factura.idCliente);
                console.log("Factura:", factura, "Cliente encontrado:", cliente);
                return {
                    ...factura,
                    cliente: cliente ? cliente.primerNombre + " " + cliente.primerApellido : "Cliente no encontrado"
                };
            });
            setRowData(updatedFacturas);
        }
    }, [facturas, clientes]);

    const colDefs = [
        { headerName: "Numero", field: "numero", sortable: true, filter: true },
        { headerName: "Estado", field: "estado", sortable: true, filter: true },
        { headerName: "Sucursal", field: "sucursal", sortable: true, filter: true },
        { headerName: "Fecha", field: "fecha", sortable: true, filter: true },
        { headerName: "Cliente", field: "cliente", sortable: true, filter: true,  },

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
                    Facturas
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

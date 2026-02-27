import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "./Nav";
import { Client } from "../Util/client";


export default function Pedidos() {
    const navigate = useNavigate();

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        Client.getPedidoTipo().then(data => {
            setRowData(data);
            console.log("Pedidos fetched successfully:", data);
        }).catch(error => {
            console.error("Error obteniendo pedidos:", error);
        });
    }, []);

    const colDefs = [
        { headerName: "Vendedor", field: "vendedor", sortable: true, filter: true },
        { headerName: "Cliente", field: "nombreCliente", sortable: true, filter: true },
        { headerName: "Factura Electronica", field: "facturaElectronica", sortable: true, filter: true },
        { headerName: "Detalle Factura", field: "detalleFactura", sortable: true, filter: true },
        { headerName: "urgenciaEnvio", field: "urgenciaEnvio", sortable: true, filter: true },
        { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
        { headerName: "Estado", field: "estado", sortable: true, filter: true },
        { headerName: "Metodo Envio", field: "metodoEnvio", sortable: true, filter: true },
        { headerName: "Dirección", field: "direccionEnvio", sortable: true, filter: true },
        { headerName: "Fecha Pedido", field: "fechaPedido", sortable: true, filter: true },
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
                        onClick={() => navigate('/formularioPedido')}
                        sx={{ backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' } }}
                    >
                        Nuevo Pedido
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


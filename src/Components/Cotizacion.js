import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "./Nav";
import { Client } from "../Util/client";

export function Cotizacion() {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        Client.getPedidoCotizacion().then(data => {
            setPedidos(data);
        }).catch(error => {
            console.error("Error obteniendo cotizaciones:", error);
        });
    }, []);

    useEffect(() => {
        if (pedidos.length > 0) {
            const newData = [];
            pedidos.forEach(pedido => {
                const detalles = pedido.detalles || [];
                if (detalles.length === 0) {
                    newData.push({
                        idPedido: pedido.idPedido,
                        fechaPedido: pedido.fechaPedido,
                        estado: pedido.estado,
                        nombreCliente: pedido.nombreCliente,
                        facturaElectronica: pedido.facturaElectronica,
                        detalleFactura: pedido.detalleFactura,
                        metodoEnvio: pedido.metodoEnvio,
                        direccionEnvio: pedido.direccionEnvio,
                        urgenciaEnvio: pedido.urgenciaEnvio,
                        vendedor: pedido.vendedor,
                        producto: '',
                        cantProducto: '',
                        descripcion: '',
                        _isFirstRow: true,
                    });
                } else {
                    detalles.forEach((detalle, idx) => {
                        newData.push({
                            // Datos del pedido solo en primera fila
                            idPedido: idx === 0 ? pedido.idPedido : '',
                            fechaPedido: idx === 0 ? pedido.fechaPedido : '',
                            estado: idx === 0 ? pedido.estado : '',
                            nombreCliente: idx === 0 ? pedido.nombreCliente : '',
                            facturaElectronica: idx === 0 ? pedido.facturaElectronica : '',
                            detalleFactura: idx === 0 ? pedido.detalleFactura : '',
                            metodoEnvio: idx === 0 ? pedido.metodoEnvio : '',
                            direccionEnvio: idx === 0 ? pedido.direccionEnvio : '',
                            urgenciaEnvio: idx === 0 ? pedido.urgenciaEnvio : '',
                            vendedor: idx === 0 ? pedido.vendedor : '',
                            // Detalle siempre visible
                            producto: detalle.nombreProducto,
                            cantProducto: detalle.cantProducto,
                            descripcion: detalle.descripcion,
                            idDetalle: detalle.idDetalle,
                            _isFirstRow: idx === 0,
                        });
                    });
                }

            });
            setRowData(newData);
        }
    }, [pedidos]);

  const colDefs = [
        { headerName: "Vendedor", field: "vendedor", filter: true },
        { headerName: "Cliente", field: "nombreCliente",  filter: true },
        { headerName: "Factura Electronica", field: "facturaElectronica", filter: true },
        { headerName: "Detalle Factura", field: "detalleFactura", filter: true },
        { headerName: "Urgencia Envio", field: "urgenciaEnvio",  filter: true },
        { headerName: "Producto", field: "nombreProducto",  filter: true },
        { headerName: "Cantidad", field: "cantProducto",  filter: true },
        { headerName: "Descripcion", field: "descripcion",  filter: true },
        { headerName: "Estado", field: "estado",  filter: true },
        { headerName: "Metodo Envio", field: "metodoEnvio", filter: true },
        { headerName: "Dirección", field: "direccionEnvio", filter: true },
        { headerName: "Fecha Pedido", field: "fechaPedido", filter: true },
    ];

    const defaultColDef = {
        editable: true,
        sortable:false,
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


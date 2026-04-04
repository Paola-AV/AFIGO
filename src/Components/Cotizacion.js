import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "./Nav";
import { Client } from "../Util/client";
import { useAuth } from "../Context/AuthContext";

export function Cotizacion() {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            Client.getPedidoCotizacion().then(data => {
                let filtered = data;
                const sede = user.sede?.trim().toUpperCase();
                if (sede && sede !== "TODAS") {
                    filtered = data.filter(p =>
                        p.sucursal?.toUpperCase().includes(sede)
                    );
                }
                setPedidos(filtered);
            }).catch(error => {
                console.error("Error obteniendo cotizaciones:", error);
            });
        }
    }, [user]);

    useEffect(() => {
        if (pedidos.length > 0) {
            const newData = [];
            pedidos.forEach(pedido => {
                const detalles = pedido.detalles || [];
                if (detalles.length === 0) {
                    newData.push({
                        nombreVendedor: pedido.nombreVendedor,
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
                        sucursal: pedido.sucursal,
                        producto: '',
                        cantProducto: '',
                        descripcion: '',
                        _isFirstRow: true,
                    });
                } else {
                    detalles.forEach((detalle, idx) => {
                        newData.push({
                            // Datos del pedido solo en primera fila
                            nombreVendedor: idx === 0 ? pedido.nombreVendedor : '',
                            idPedido: idx === 0 ? pedido.idPedido : '',
                            fechaPedido: idx === 0 ? pedido.fechaPedido : '',
                            estado: idx === 0 ? pedido.estado : '',
                            nombreCliente: idx === 0 ? pedido.nombreCliente : '',
                            facturaElectronica: idx === 0 ? pedido.facturaElectronica : 0,
                            detalleFactura: idx === 0 ? pedido.detalleFactura : '',
                            metodoEnvio: idx === 0 ? pedido.metodoEnvio : '',
                            direccionEnvio: idx === 0 ? pedido.direccionEnvio : '',
                            urgenciaEnvio: idx === 0 ? pedido.urgenciaEnvio : '',
                            vendedor: idx === 0 ? pedido.vendedor : '',
                            sucursal: idx === 0 ? pedido.sucursal : '',
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
        {
            headerName: "Sucursal", field: "sucursal", filter: true, valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            }
        },
        { headerName: "Vendedor", field: "nombreVendedor", filter: true },
        { headerName: "Cliente", field: "nombreCliente", filter: true },
        {
            headerName: "Factura Electronica", field: "facturaElectronica", filter: true,
            valueGetter: (params) => {
                if (params.data._isFirstRow) {
                    return (params.data.facturaElectronica === 1 ? 'Sí' : 'No')
                } else {
                    return '';
                }
            }
        },
        { headerName: "Detalle Factura", field: "detalleFactura", filter: true, editable: false },
        { headerName: "Urgencia Envio", field: "urgenciaEnvio", filter: true, editable: false },
        { headerName: "Producto", field: "producto", filter: true, editable: false },
        { headerName: "Cantidad", field: "cantProducto", filter: true, editable: false },
        { headerName: "Descripcion", field: "descripcion", filter: true, editable: false },
        {
            headerName: "Estado", field: "estado", filter: true, editable: (params) => params.data?._isFirstRow === true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ["Pendiente", "Confirmado", "Enviado", "Entregado", "Cancelado"]
            },
            valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            }
        },
        { headerName: "Metodo Envio", field: "metodoEnvio", filter: true, editable: false },
        { headerName: "Dirección", field: "direccionEnvio", filter: true, editable: false },
        { headerName: "Fecha", field: "fechaPedido", filter: true, editable: false },
    ];

    const defaultColDef = {
        sortable: false,
        flex: 1,
        minWidth: 100,
        filter: true,
        filterParams: {
            buttons: ['clear'],
        }
    };

    const onCellValueChanged = (params) => {
        if (params.colDef.field === 'estado' && params.data._isFirstRow && params.data.estado) {
            var pedido = {
                idPedido: params.data.idPedido,
                estado: params.data.estado.toUpperCase(),
            };
            Client.updatePedido(pedido);
        }
    }

    const getRowStyle = (params) => {
        if (params.data?._isFirstRow) {
            return { borderTop: '1px solid #FF5A00' };
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
                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz}
                            getRowStyle={getRowStyle}
                            domLayout='normal'
                            stopEditingWhenCellsLoseFocus={true}
                            onCellValueChanged={onCellValueChanged} />
                    </div>
                </Box>
            </Box>
        </>
    );
}


import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography, Paper } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";
import { useMemo } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import VentasGraficos from "./ventasGraficos";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Fab from '@mui/material/Fab';
import { useAuth } from "../Context/AuthContext";

export default function AdminVentas() {
    const [ventas, setVentas] = useState([]);
    const hoy = dayjs();
    const haceUnMes = dayjs().subtract(1, 'month');
    const [desde, setDesde] = useState(haceUnMes);
    const [hasta, setHasta] = useState(hoy);
    const [rowData, setRowData] = useState([]);
    const [comisiones, setComisiones] = useState([]);
    const [tablaComision, setTablaComision] = useState([]);
    const { user } = useAuth();
    const [sedeFiltro, setSedeFiltro] = useState("TODAS");

    useEffect(() => {
        if (!desde || !hasta || !user) return;

        Client.getAllVentasConDetalles(
            desde.format("YYYY-MM-DD"),
            hasta.format("YYYY-MM-DD")
        )
            .then((data) => {
                let filtered = data;

                const sedeUser = user.sede?.toUpperCase().trim();
                const filtro = sedeFiltro?.toUpperCase().trim();

                // Si el usuario NO ES "TODAS", filtra automáticamente
                if (sedeUser !== "TODAS") {
                    filtered = data.filter((v) =>
                        v.descripcion?.toUpperCase().includes(sedeUser)
                    );
                }
                // Si el usuario ES "TODAS", pero seleccionó una sucursal en el filtro
                else if (filtro !== "TODAS") {
                    filtered = data.filter((v) =>
                        v.descripcion?.toUpperCase().includes(filtro)
                    );
                }

                setVentas(filtered);
            })
            .catch((error) => {
                console.error("Error obteniendo ventas:", error);
            });
    }, [desde, hasta, user, sedeFiltro]);

    useEffect(() => {

        Client.getAllComisiones(
        ).then(data => {
            setComisiones(data);
            let rowData = Object.entries(data.comisiones).sort((a, b) => b[1] - a[1]).map(([nombre, monto]) => ({ vendedor: nombre, comision: monto }))
            setTablaComision(rowData)
        }).catch(error => {
            console.error("Error obteniendo comision:", error);
        });
    }, []);

    useEffect(() => {
        if (ventas.length > 0) {
            const newData = [];
            ventas.forEach(venta => {
                const detalles = venta.ventaDetalles || [];
                if (detalles.length === 0) {
                    newData.push({
                        descripcion: venta.descripcion,
                        estado: venta.estado,
                        fecha: venta.fechaPedido,
                        montoTotal: venta.montoTotal,
                        nombreCliente: venta.nombreCliente,
                        nombreVendor: venta.nombreVendor,
                        numFactura: venta.numFactura,
                        referencia: venta.referencia,
                        cantidad: '',
                        familiaProducto: '',
                        nombreProducto: '',
                        _isFirstRow: true,
                    });
                } else {
                    detalles.forEach((detalle, idx) => {
                        newData.push({
                            descripcion: idx === 0 ? venta.descripcion : '',
                            estado: idx === 0 ? venta.estado : '',
                            fecha: idx === 0 ? venta.fecha : '',
                            montoTotal: idx === 0 ? venta.montoTotal : '',
                            nombreCliente: idx === 0 ? venta.nombreCliente : '',
                            nombreVendor: idx === 0 ? venta.nombreVendor : '',
                            numFactura: idx === 0 ? venta.numFactura : '',
                            referencia: idx === 0 ? venta.referencia : '',
                            // Detalle siempre visible
                            cantidad: detalle.cantidad,
                            familiaProducto: detalle.familiaProducto,
                            nombreProducto: detalle.nombreProducto,
                            _isFirstRow: idx === 0,
                        });
                    });
                }

            });
            setRowData(newData);
        }
    }, [ventas]);


    const colDefs = [
        {
            headerName: "Sucursal", field: "descripcion", sortable: true, filter: true, valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },
        },
        {
            headerName: "Estado", field: "estado", sortable: true, filter: true, valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },
        },
        {
            headerName: "Fecha", field: "fecha", sortable: true, filter: true,
            valueFormatter: params => {
                if (!params.value) return '';
                return params.value.split('T')[0];
            }
        },
        {
            headerName: "Monto Total", field: "montoTotal", sortable: true, filter: true,
            valueGetter: (params) => {
                if (params.data._isFirstRow) {
                    return (params.data.montoTotal);
                } else {
                    return '';
                }
            }, valueFormatter: (params) => {
                const value = Number(params.value);
                if (isNaN(value)) return " ";
                if (params.data._isFirstRow) {
                    return "₡" + value.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                } else {
                    return " ";
                }
            }
        },
        { headerName: "Cliente", field: "nombreCliente", sortable: true, filter: true },
        {
            headerName: "Vendedor", field: "nombreVendor", sortable: true, filter: true, valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },
        },
        {
            headerName: "Referencia", field: "referencia", sortable: true, filter: true, valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },
        },
        { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
        {
            headerName: "Familia de Producto", field: "familiaProducto", sortable: true, filter: true, valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },
        },
        { headerName: "Nombre del Producto", field: "nombreProducto", sortable: true, filter: true, }

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

    const getRowStyle = (params) => {
        if (params.data?._isFirstRow) {
            return { borderTop: '1px solid #FF5A00' };
        }
    };

    const colDefsComision = [
        {
            headerName: "Vendedor", field: "vendedor", filter: true, valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            }
        },
        {
            headerName: "Comision", field: "comision", filter: true, valueFormatter: params =>
                `₡${(params.value ?? 0).toLocaleString('es-CR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`
        },
    ];

    const defaultColDefComision = {
        editable: false,
        sortable: false,
        flex: 1,
        minWidth: 100,
        filter: true,
        filterParams: {
            buttons: ['clear'],
        }
    };

    const handleDownload = () => {
        Client.descargarExcelVentas(desde, hasta)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ width: '100%', p: 3 }}>

                {/* Header con título y date pickers */}
                <Box sx={{
                    mb: 3,
                    display: 'flex',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                }}>
                    <Typography variant="h5" component="h1" sx={{ flexShrink: 0 }}>
                        Ventas
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <DatePicker
                            label="Desde"
                            value={desde}
                            onChange={(val) => setDesde(val)}
                            maxDate={hasta}
                            slotProps={{
                                textField: { size: 'small' }
                            }}
                        />
                        <DatePicker
                            label="Hasta"
                            value={hasta}
                            onChange={(val) => setHasta(val)}
                            minDate={desde}
                            maxDate={hoy}
                            slotProps={{
                                textField: { size: 'small' }
                            }}
                        />
                    </Box>

                    {user.sede === "TODAS" && (
                        <Box sx={{ minWidth: 200 }}>
                            <select
                                value={sedeFiltro}
                                onChange={(e) => setSedeFiltro(e.target.value)}
                                style={{ padding: "8px", borderRadius: "5px" }}
                            >
                                <option value="TODAS">Todas las sucursales</option>
                                <option value="PALMARES">Palmares</option>
                                <option value="COBANO">Cóbano</option>
                                <option value="SARCHI">Sarchí</option>
                                <option value="NICOYA">Nicoya</option>
                            </select>
                        </Box>
                    )}
                </Box>
                <Fab size="medium" color="secondary" aria-label="add" sx={{ position: 'absolute', top: 100, right: 30, backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' } }} onClick={handleDownload} >
                    <FileDownloadIcon />
                </Fab>
                {/* Tabla */}
                <Box sx={{ height: 500, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz}
                            domLayout='normal'
                            getRowStyle={getRowStyle}
                        />
                    </div>
                </Box>



                <VentasGraficos ventas={ventas} />

                <Box sx={{ mt: 3, mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h6" fontWeight={600}>
                        Comisiones
                    </Typography>
                    {comisiones?.mes && (
                        <Typography variant="body2" color="text.secondary">
                            {comisiones.mes} — {comisiones.porcentajeComision}% de comisión
                        </Typography>
                    )}
                </Box>

                <Box sx={{ height: 400, width: '100%', borderRadius: 1, overflow: 'hidden', mb: 3, pb: 3 }}>
                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        <AgGridReact
                            rowData={tablaComision}
                            columnDefs={colDefsComision}
                            defaultColDef={defaultColDefComision}
                            theme={themeQuartz}
                            domLayout='normal'
                        />
                    </div>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

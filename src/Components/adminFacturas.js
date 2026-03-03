import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

export default function AdminFacturas() {

    const [rowData, setRowData] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [grafico1Data, setGrafico1Data] = useState([]);
    const [graficoData, setGraficoData] = useState([]);
    const [dateFilter, setDateFilter] = useState(null);

    useEffect(() => {
        Client.getFacturas().then(data => {
            setFacturas(data);
            setGraficoData(data);
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
        if (!dateFilter) return;
        if (dateFilter) {
            setGraficoData(prev => filtrarDesde(prev, dateFilter));
        }
    }, [dateFilter]);


    const filtrarDesde = (data, dateFilter) => {
        const from = dayjs(dateFilter).startOf('day');
        return (Array.isArray(data) ? data : []).filter(item => {
            if (!item?.fecha) return false;
            const d = dayjs(item.fecha);
            return d.isValid() && (d.isAfter(from) || d.isSame(from, 'day'));
        });
    };


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

    useEffect(() => {
        if (graficoData.length > 0) {
            // 1) Agrupar por sucursal y contar por estado
            const agregados = graficoData.reduce((acc, item) => {
                const sucursal = item?.sucursal ?? 'Sin Sucursal';
                const estado = item?.estado ?? 'Sin Estado';

                if (!acc[sucursal]) acc[sucursal] = {};
                if (!acc[sucursal][estado]) acc[sucursal][estado] = 0;

                acc[sucursal][estado] += 1; // contar
                return acc;
            }, {}); // { [sucursal]: { [estado]: cantidad } }

            // 2) Aplanar a una lista con { id, sucursal, estado, cantidad }
            const resultado = Object.entries(agregados).flatMap(([sucursal, estados]) =>
                Object.entries(estados).map(([estado, cantidad]) => ({
                    id: `${sucursal}-${estado}`,
                    label: `${sucursal} - ${estado}`,
                    value: cantidad,
                }))
            );

            setGrafico1Data(resultado);
            console.log("Conteo de facturas por Sucursal y Estado:", resultado);
        }
    }, [graficoData]);


    return (

        <Box sx={{ width: '100%', p: 3 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h1">
                    Facturas
                </Typography>

            </Box>

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

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap', mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2, width: { xs: '50%', md: '30%' } }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                        <DatePicker
                            label="Mostrar desde:"
                            value={dateFilter}
                            onChange={setDateFilter}
                            format="DD/MM/YYYY"
                            slotProps={{
                                textField: { fullWidth: true, required: true },
                            }}
                        />
                    </LocalizationProvider>
                </Box>
                {/* total gastos by sucursal */}
                <Box sx={{ mt: 3 }}>
                    <PieChart
                        series={[
                            {
                                data: [...grafico1Data],
                            },
                        ]}
                        width={200}
                        height={360}
                    />
                </Box>


            </Box>
        </Box>


    );
}

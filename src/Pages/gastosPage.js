
import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "../Components/Nav";
import { Client } from "../Util/client";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Fab from '@mui/material/Fab';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');


export default function GastosPage() {
    const [rowData, setRowData] = useState([]);
    const [graficoData, setGraficoData] = useState([]);
    const [totalGastos, setTotalGastos] = useState([]);
    const [gastosPorTipo, setGastosPorTipo] = useState([]);
    const [dateFilter, setDateFilter] = useState(null);
    const [dateFilterTo, setDateFilterTo] = useState(null);

    useEffect(() => {
        Client.getGastos().then(data => {
            setRowData(data);
            setGraficoData(data);
        });
    }, []);

    useEffect(() => {
        if (!rowData.length) return;

        if (dateFilter || dateFilterTo) {
            setGraficoData(filtrarRango(rowData, dateFilter, dateFilterTo));
        } else {
            setGraficoData(rowData); // sin filtro, muestra todo
        }
    }, [rowData, dateFilter, dateFilterTo]);


    const filtrarRango = (data, desde, hasta) => {
        return (Array.isArray(data) ? data : []).filter(item => {
            if (!item?.fecha) return false;
            const d = dayjs(item.fecha);
            if (!d.isValid()) return false;

            const despuesDeDesde = desde
                ? (d.isAfter(dayjs(desde).startOf('day')) || d.isSame(dayjs(desde), 'day'))
                : true;

            const antesDeHasta = hasta
                ? (d.isBefore(dayjs(hasta).endOf('day')) || d.isSame(dayjs(hasta), 'day'))
                : true;

            return despuesDeDesde && antesDeHasta;
        });
    };

    useEffect(() => {
        if (graficoData.length > 0) {

            const agregados = graficoData.reduce((acc, item) => {
                const nombre = item?.sucursal ?? 'Sin Sucursal';
                const monto = Number(item?.monto) || 0;

                if (!acc[nombre]) acc[nombre] = 0;
                acc[nombre] += monto;
                return acc;
            }, {});

            const resultado = Object.entries(agregados).map(([nombre, total], idx) => ({
                id: idx,
                label: nombre,
                value: Number(total.toFixed(2)),
            }));

            setTotalGastos(resultado);
        }

    }, [graficoData]);

    useEffect(() => {
        if (!graficoData?.length) {
            setGastosPorTipo([]);
            return;
        }

        // Agrupar por sucursal y tipo
        const totales = graficoData.reduce((acc, item) => {
            const sucursal = item?.sucursal ?? 'Sin Sucursal';
            const tipo = item?.tipo ?? 'Sin Tipo';
            const monto = Number(item?.monto) || 0;

            if (!acc[sucursal]) acc[sucursal] = {};
            if (!acc[sucursal][tipo]) acc[sucursal][tipo] = 0;

            acc[sucursal][tipo] += monto;
            return acc;
        }, {});

        // Si aún quieres mantener un estado con la forma plana:
        const plano = Object.entries(totales).flatMap(([sucursal, tiposObj]) =>
            Object.entries(tiposObj).map(([tipo, total]) => ({
                sucursal,
                tipo,
                total: Number(total.toFixed(2))
            }))
        );
        setGastosPorTipo(totales);
    }, [graficoData]);


    const { xAxisData, series } = useMemo(() => {
        if (!graficoData?.length) return { xAxisData: [], series: [] };

        // 1) sucursal -> tipo -> total
        const map = graficoData.reduce((acc, item) => {
            const sucursal = item?.sucursal ?? 'Sin Sucursal';
            const tipo = item?.tipo ?? 'Sin Tipo';
            const monto = Number(item?.monto) || 0;
            if (!acc[sucursal]) acc[sucursal] = {};
            acc[sucursal][tipo] = (acc[sucursal][tipo] || 0) + monto;
            return acc;
        }, {});

        // 2) eje X
        const sucursales = Object.keys(map);

        // 3) tipos únicos
        const tiposSet = new Set();
        sucursales.forEach(s => Object.keys(map[s]).forEach(t => tiposSet.add(t)));
        const tipos = Array.from(tiposSet);

        const valueFormatter = (v) => `₡${Number(v || 0).toLocaleString('es-CR')}`;

        // 4) series SIN dataKey
        const series = tipos.map((tipo) => ({
            label: tipo,
            data: sucursales.map((s) => Number((map[s][tipo] || 0).toFixed(2))),
            valueFormatter,
        }));

        return { xAxisData: sucursales, series };
    }, [graficoData]);

    const colDefs = [

        {
            headerName: "Sucursal", field: "sucursal", sortable: true, filter: true, valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },
        },
        {
            headerName: "Tipo", field: "tipo", sortable: true, filter: true, valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },
        },
        {
            headerName: "Monto", field: "monto", sortable: true, filter: true, valueFormatter: (params) => {
                const value = Number(params.value);
                if (isNaN(value)) return "₡0.00";

                return "₡" + value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
        },
        {
            headerName: "Fecha", field: "fecha", sortable: true, sort: 'desc', filter: true, valueFormatter: params => {
                if (!params.value) return '';
                return params.value.split('T')[0];
            }
        },
        {
            headerName: "Descripcion", field: "descripcion", sortable: true, filter: true, valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },
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
        Client.descargarExcelGastos()
    }

    return (
        <><Nav></Nav>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', p: 3 }}>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h1">
                        Gastos
                    </Typography>

                </Box>
                <Fab size="medium" color="secondary" aria-label="add" sx={{ position: 'absolute', top: 100, right: 30, backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' } }} onClick={handleDownload} >
                    <FileDownloadIcon />
                </Fab>
                <Box sx={{ height: 600, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz}
                            domLayout="normal"
                        />
                    </div>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', flexWrap: 'wrap', mt: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'flex-start', mb: 2, width: '100%' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">


                            <Box sx={{ width: { xs: '100%', md: '30%' } }}>
                                <DatePicker
                                    label="Mostrar desde:"
                                    value={dateFilter}
                                    onChange={setDateFilter}
                                    format="DD/MM/YYYY"
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </Box>

                            <Box sx={{ width: { xs: '100%', md: '30%' }, mt: { xs: 2, md: 0 }, ml: { md: 2 } }}>
                                <DatePicker
                                    label="Mostrar hasta:"
                                    value={dateFilterTo}
                                    onChange={setDateFilterTo}
                                    format="DD/MM/YYYY"
                                    minDate={dateFilter ?? undefined}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </Box>

                        </LocalizationProvider>
                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'space-around', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: 4, width: '100%' }}>

                        {/* tipo gasto by sucursal barra combinado */}

                        <Box sx={{ mt: 3, width: { xs: '100%', md: '70%' }, height: 360 }}>
                            <BarChart
                                xAxis={[{ data: xAxisData, scaleType: 'band' }]}
                                series={series}
                                height={360}
                                // width={'100%'}

                                yAxis={[{ width: 60 }]}
                            />
                        </Box>
                    </Box>
                </Box>

            </Box>
        </>
    );
}

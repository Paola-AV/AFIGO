import React, { useEffect, useState, useMemo } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "../Components/Nav";
import { Client } from "../Util/client";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

export default function GastosPage() {
    const [rowData, setRowData] = useState([]);
    const [totalGastos, setTotalGastos] = useState([]);
    const [gastosPorTipo, setGastosPorTipo] = useState([]);

    useEffect(() => {
        Client.getGastos().then(data => {
            setRowData(data);
        });
    }, []);

    useEffect(() => {
        if (rowData.length > 0) {

            const agregados = rowData.reduce((acc, item) => {
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

    }, [rowData]);

    useEffect(() => {
        if (!rowData?.length) {
            setGastosPorTipo([]);
            return;
        }

        // Agrupar por sucursal y tipo
        const totales = rowData.reduce((acc, item) => {
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
    }, [rowData]);


    const { xAxisData, series } = useMemo(() => {
        if (!rowData?.length) return { xAxisData: [], series: [] };

        // 1) sucursal -> tipo -> total
        const map = rowData.reduce((acc, item) => {
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
    }, [rowData]);

    const colDefs = [

        { headerName: "Sucursal", field: "sucursal", sortable: true, filter: true },
        { headerName: "Tipo", field: "tipo", sortable: true, filter: true },
        { headerName: "Monto", field: "monto", sortable: true, filter: true },
        { headerName: "Fecha", field: "fecha", sortable: true, filter: true },
        { headerName: "Descripcion", field: "descripcion", sortable: true, filter: true }

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

    return (
        <><Nav></Nav>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '90vh', p: 3 }}>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h1">
                        Gastos
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
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    {/* total gastos by sucursal */}
                    <Box sx={{ mt: 3 }}>
                        <PieChart
                            series={[
                                {
                                    data: [...totalGastos],
                                },
                            ]}
                            width={200}
                            height={360}
                        />
                    </Box>
                    {/* tipo gasto by sucursal barra combinado */}

                    <Box sx={{ mt: 3 }}>
                        <BarChart
                            xAxis={[{ data: xAxisData, scaleType: 'band' }]}
                            series={series}
                            height={360}
                            width={600}

                            yAxis={[{ width: 60 }]}
                        />
                    </Box>
                </Box>

            </Box>
        </>
    );
}

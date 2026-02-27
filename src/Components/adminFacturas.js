import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

export default function AdminFacturas() {

    const [rowData, setRowData] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [grafico1Data, setGrafico1Data] = useState([]);

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
        { headerName: "Cliente", field: "cliente", sortable: true, filter: true, },

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
        if (rowData.length > 0) {
            // 1) Agrupar por sucursal y contar por estado
            const agregados = rowData.reduce((acc, item) => {
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
    }, [rowData]);

    
    useEffect(() => {
        if (rowData.length > 0) {
            // 1) Agrupar por sucursal y contar por estado
            
            console.log("Conteo de facturas por Sucursal y Estado:", rowData);
        }
    }, [rowData]);

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

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
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

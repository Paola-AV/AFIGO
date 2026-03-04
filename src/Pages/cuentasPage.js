import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "../Components/Nav";
import { Client } from "../Util/client";

export default function CuentasPage() {
    const [rowData, setRowData] = useState([]);
    const [cuentas, setCuentas] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        Client.getCuentas().then(data => {
            setCuentas(data);
            console.log("Cuentas fetched successfully:", data);
        }).catch(error => {
            console.error("Error obteniendo cuentas:", error);
        });
    }, []);

    useEffect(() => {
        Client.getFacturas().then(data => {
            setFacturas(data);
        }).catch(error => {
            console.error("Error obteniendo facturas:", error);
        });
    }, []);

    useEffect(() => {
        Client.getProveedores().then(data => {
            setProveedores(data);
        }).catch(error => {
            console.error("Error obteniendo proveedores:", error);
        });

    }, []);

    useEffect(() => {
        if (cuentas.length > 0 && proveedores.length > 0 && facturas.length > 0) {
            const updatedCuentas = cuentas.map(cuenta => {
                const proveedor = proveedores.find(p => p.idProveedor === cuenta.idProveedor);
                const factura = facturas.find(f => f.idFactura === cuenta.idFactura);
                return {
                    ...cuenta,
                    proveedor: proveedor ? proveedor.primerNombre + " " + proveedor.primerApellido : "Proveedor no encontrado",
                    factura: factura ? factura.numero : "Factura no encontrada"
                };
            });
            setRowData(updatedCuentas);
        }
    }, [cuentas, proveedores, facturas]);

    const colDefs = [

        { headerName: "Proveedor", field: "proveedor", sortable: true, filter: true },
        {
            headerName: "Monto", field: "monto", sortable: true, filter: true,
            valueFormatter: (params) => {
                const value = Number(params.value);
                if (isNaN(value)) return "₡0.00";

                return "₡" + value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
        },
        {
            headerName: "Saldo", field: "saldo", sortable: true, filter: true,
            valueFormatter: (params) => {
                const value = Number(params.value);
                if (isNaN(value)) return "₡0.00";

                return "₡" + value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
        },
        {
            headerName: "Estado", field: "estado", sortable: true, filter: true,
            valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },
        },
        { headerName: "Factura", field: "factura", sortable: true, filter: true }

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
                        Cuentas por Pagar
                    </Typography>

                </Box>

                <Box sx={{ height: 600, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz}
                             domLayout="normal"/>
                    </div>
                </Box>


            </Box></>

    );
}

import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import { Box, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Nav } from "../Components/Nav";
import { Client } from "../Util/client";
import { useAuth } from "../Context/AuthContext"
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Fab from '@mui/material/Fab';

export default function InventarioPage() {
    const [inventario, setInventario] = useState([]);
    const [inventarioConProductos, setInventarioConProductos] = useState([]);
    const { user, isAdmin, } = useAuth();

    useEffect(() => {
        if (user) {
            Client.getInventario().then(data => {
                let filtered = data;
                const sede = user.sede?.trim().toUpperCase();
                if (sede && sede !== "TODAS") {
                    filtered = data.filter(p =>
                        p.sucursal?.toUpperCase().includes(sede)
                    );
                }
                setInventario(filtered);
            }).catch(error => {
                console.error("Error obteniendo inventario:", error);
            });
        }
    }, [user]);

    useEffect(() => {
        if (inventario.length > 0) {
            let inventarioConProductosTemp = [];
            Client.getProductos().then(productos => {
                inventario.forEach(inv => {
                    const producto = productos.find(p => p.idProducto === inv.idProducto);
                    if (producto) {
                        inventarioConProductosTemp.push({ ...inv, producto });
                    }
                });
                setInventarioConProductos(inventarioConProductosTemp);
            });
        }
    }, [inventario]);

    const baseCols = [
        {
            headerName: "Sucursal", field: "sucursal", sortable: true, filter: true, valueFormatter: params => {
                if (!params.value) return '';
                const val = params.value.toLowerCase();
                return val.charAt(0).toUpperCase() + val.slice(1);
            }
        },
        { headerName: "Producto", field: "producto.nombre", sortable: true, filter: true },
        {
            headerName: "Familia", field: "producto.familia", sortable: true, filter: true, valueFormatter: params => {
                if (!params.value) return '';
                const val = params.value.toLowerCase();
                return val.charAt(0).toUpperCase() + val.slice(1);
            }
        },
        { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
        {
            headerName: "Fecha Ingreso", field: "fechaIngreso", sortable: true, sort: 'desc', filter: true,
            valueFormatter: params => {
                if (!params.value) return '';
                return params.value.split('T')[0];
            }
        },
        {
            headerName: "Precio Venta", field: "producto.precioVenta", sortable: true, filter: true, valueFormatter: (params) => {
                const value = Number(params.value);
                if (isNaN(value)) return "₡0.00";

                return "₡" + value.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
            }
        },
    ];

    const adminCols = isAdmin
        ? [
            {
                headerName: "Precio Costo", field: "producto.precioCosto", sortable: true, filter: true, valueFormatter: (params) => {
                    const value = Number(params.value);
                    if (isNaN(value)) return "₡0.00";

                    return "₡" + value.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
                }
            },
        ]
        : [];

    const colDefs = [...baseCols, ...adminCols];

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
        Client.descargarExcelInventario()
    }

    return (
        <>
            <Nav></Nav>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '90vh', p: 3 }}>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h1">
                        Inventario
                    </Typography>

                </Box>
                <Fab size="medium" color="secondary" aria-label="add" sx={{ position: 'absolute', top: 100, right: 30, backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' } }} onClick={handleDownload} >
                    <FileDownloadIcon />
                </Fab>
                <Box sx={{ height: 600, width: '100%', borderRadius: 1, overflow: 'hidden' }}>

                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        <AgGridReact
                            rowData={inventarioConProductos}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz}
                            // IMPORTANTE: no usar 'autoHeight' si se necesita scrollbar
                            // domLayout='autoHeight'
                            domLayout="normal"
                        />
                    </div>

                </Box>


            </Box>
        </>

    );
}


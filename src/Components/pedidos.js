import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { themeQuartz } from "ag-grid-community";



export default function Pedidos() {
    const navigate = useNavigate();
    
        const [rowData, setRowData] = useState([]);
    
        useEffect(() => {
            setRowData([
                { vendedor: "Juan Perez", cliente: "Empresa A", producto: "Producto 1", factura:"5552965", cantidad: 10, envio:"Encomienda", direccion:"Direccion 1" },
                { vendedor: "Maria Lopez", cliente: "Empresa B", producto: "Producto 2", factura:"5552966", cantidad: 5, envio:"Encomienda", direccion:"Direccion 2" }
            ]);
        }, []);
    
        const colDefs = [
            { headerName: "Vendedor", field: "vendedor", sortable: true, filter: true },
            { headerName: "Cliente", field: "cliente", sortable: true, filter: true },
            { headerName: "Factura", field: "factura", sortable: true, filter: true },
            { headerName: "Producto", field: "producto", sortable: true, filter: true },
            { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
            { headerName: "Envio", field: "envio", sortable: true, filter: true },
            { headerName: "Dirección", field: "direccion", sortable: true, filter: true }
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
                        theme={themeQuartz}
                    />
                </div>
            </Box>
        </Box>

       
    );
}

//  <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
//             {/* Sidebar */}
//             <Box sx={{ width: '25%', flexShrink: 0 }}>
//                 <Sidebar />
//             </Box>

//             {/* Main Content */}
//             <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column', p: 3, backgroundColor: '#f5f5f5' }}>
//                 {/* Button Section */}
//                 <Box sx={{ mb: 3 }}>
//                     <Button
//                         variant="contained"
//                         startIcon={<AddIcon />}
//                         onClick={() => navigate('/Ventas')}
//                         sx={{ backgroundColor: '#29335c', '&:hover': { backgroundColor: '#1e2540' } }}
//                     >
//                         Nuevo Pedido
//                     </Button>
//                 </Box>

//                 {/* Table Section */}
//                 <TableContainer component={Paper} sx={{ flex: 1 }}>
//                     <Table sx={{ minWidth: 650 }} aria-label="pedidos table">
//                         <TableHead sx={{ backgroundColor: '#29335c' }}>
//                             <TableRow>
//                                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Vendedor</TableCell>
//                                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cliente</TableCell>
//                                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Factura</TableCell>
//                                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Producto</TableCell>
//                                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cantidad</TableCell>
//                                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Envío</TableCell>
//                                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Dirección</TableCell>
//                             </TableRow>
//                         </TableHead>
                       
//                     </Table>
//                 </TableContainer>
//             </Box>
//         </Box>
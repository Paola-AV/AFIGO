import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { themeQuartz } from "ag-grid-community";



export function Cotizacion() {
    const navigate = useNavigate();

    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        setRowData([
            { vendedor: "Juan Perez", cliente: "Empresa A", producto: "Producto 1", cantidad: 10, descripcion: "Descripcion del producto 1", contacto: "Contacto 1" },
            { vendedor: "Maria Lopez", cliente: "Empresa B", producto: "Producto 2", cantidad: 5, descripcion: "Descripcion del producto 2", contacto: "Contacto 2" }
        ]);
    }, []);

    const colDefs = [
        { headerName: "Vendedor", field: "vendedor", sortable: true, filter: true },
        { headerName: "Cliente", field: "cliente", sortable: true, filter: true },
        { headerName: "Producto", field: "producto", sortable: true, filter: true },
        { headerName: "Cantidad", field: "cantidad", sortable: true, filter: true },
        { headerName: "Descripcion", field: "descripcion", sortable: true, filter: true },
        { headerName: "Contacto", field: "contacto", sortable: true, filter: true }
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
                        theme={themeQuartz}
                    />
                </div>
            </Box>
        </Box>
    );
}

// //   <section class="flex flex-row w-full">
               
//                 <section class="alex flex-col w-9/12">
//                     <div class="m-5 p-5 ">
//                         <button class="bg-grotto p-5 rounded-full font-bold border-none shadow-md text-royal drop-shadow-2xl" onClick={() => navigate('/formularioCotizacion')}>Nueva Cotizacion</button>
//                     </div>
//                     <div class="flex content-center items-center overflow-x-auto overflow-y-auto">
//                         <table class="table-auto border-collapse border border-grotto self-center ml-10">

//                             <thead >
//                                 <tr class="border border-royal bg-royal text-white">
//                                     <th class="p-2 border border-mid">Vendendor</th>
//                                     <th class="p-2 border border-mid">Cliente</th> 
//                                     <th class="p-2 border border-mid">Producto</th>
//                                     <th class="p-2 border border-mid">Cantidad</th>
//                                     <th class="p-2 border border-mid">Descripcion</th>
//                                     <th class="p-2 border border-mid">Contacto</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr class="even:bg-grotto odd:bg-baby">
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                 </tr>
//                                 <tr class="even:bg-grotto odd:bg-baby">
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                 </tr>
//                                 <tr class="even:bg-grotto odd:bg-baby">
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                     <th class="p-2 border border-mid"> </th>
//                                 </tr>
//                             </tbody>

//                         </table>
//                     </div>
//                 </section>
//             </section>
    
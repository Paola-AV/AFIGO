import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { themeQuartz } from "ag-grid-community";
import  {Client}  from "../Util/client";
import { useAuth } from "../Context/AuthContext"
import { Nav } from "./Nav";

export default function Usuarios() {
    const navigate = useNavigate()
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        Client.getUsuarios().then(data => {
            setRowData(data);
        });
    }, []);

    const colDefs = [
        { headerName: "Nombre", field: "nombre", sortable: true, filter: true },
        { headerName: "Correo Electrónico", field: "correo", sortable: true, filter: true },
        { headerName: "Usuario", field: "nombreDeUsuario", sortable: true, filter: true },
         { headerName: "Admin", field: "usuarioAdmin", sortable: true, filter: true, valueFormatter: params => params.value === 1 ? 'Sí' : 'No' },
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
        <>
            <Nav></Nav>
            <Box sx={{ width: '100%', p: 3 }}>
                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/formularioUsuario')}
                        sx={{ backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' } }}
                    >
                        Nuevo Usuario
                    </Button>
                </Box>

                <Box sx={{ height: 500, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '100%' }}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz} />
                    </div>
                </Box>
            </Box>
        </>


    )
}
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";
import DeleteIcon from '@mui/icons-material/Delete';
import { use } from "react";

export default function UserPeticionVacaciones(props) {
    const navigate = useNavigate();
    const [peticionVacaciones, setPeticionVacaciones] = useState([]);
    const [trabajador, setTrabajador] = useState(null);
    const userId = props.user?.userId;

    useEffect(() => {
        if(userId){
        Client.getTrabajadorByUsuarioId(props.user.userId).then(data => {
            setTrabajador(data);
        }).catch(error => {
            console.error("Error obteniendo trabajadores:", error);
        });
    }
    }, [userId]);

    useEffect(() => {
        if(trabajador){
        Client.getPeticionVacacionesByTrabajadorId(trabajador.idTrabajador).then(data => {
            setPeticionVacaciones(data);
        }).catch(error => {
            console.error("Error obteniendo vacaciones:", error);
        });
    }
    }, [trabajador]);

    

    const colDefs = [
        { headerName: "Inicio", field: "fechaInicio", sortable: true, filter: true, editable: false },
        { headerName: "Fin", field: "fechaFin", sortable: true, filter: true, editable: false },
        {
            headerName: "Estado", field: "estado", sortable: true, filter: true, editable: false,

            valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },

        },
        {
            headerName: "Eliminar",
            colId: "eliminar",
            sortable: false,
            filter: false,
            editable: false,
            width: 110,
            cellRenderer: (params) => {
                const handleDelete = async (e) => {
                    e?.stopPropagation?.(); 

                    try {
                        Client.deletePeticionVacaciones(params.data.idPeticion).then(result => {
                            setPeticionVacaciones(prev => prev.filter(p => p.idPeticion !== params.data.idPeticion));
                        }).catch(error => {
                            console.error("Error deleting vacation request:", error);
                        });

                    } catch (error) {
                        console.error("Error deleting vacation request:", error);
                    }
                };

                return (
                    <Button
                        variant="text"
                        size="small"
                        onClick={handleDelete}
                    >
                        <DeleteIcon fontSize="small" sx={{ color: '#505050' }} />
                    </Button>
                );
            },
        }
    ];

    const defaultColDef = {
        flex: 1,
        minWidth: 100,
        filter: true,
        filterParams: {
            buttons: ['clear'],
        }
    };

    return (

        <Box sx={{ width: '100%', p: 3 }}>
            <Paper elevation={3} sx={{ p: 2, mb: 3, width:'70%', justifyContent: 'center', display: 'flex',flexDirection:'column', alignItems: 'center', justifySelf: 'center' }}>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>Bienvenido, {trabajador ? trabajador.nombre : "Cargando..."}</Typography>
                
                <Typography variant="body1" component="h4" sx={{ mb: 2 }}>Inicio de labores: {trabajador ? trabajador.fechaInicio : "Cargando..."}</Typography>
               
                <Typography variant="body1" component="h4" sx={{ mb: 2 }}>Días de Vacaciones Disponibles {trabajador ? trabajador.vacacionesDisponibles : "Cargando..."}</Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/PeticionVacaciones')}
                    sx={{ backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' } }}
                >
                    Agregar solicitud de vacaciones
                </Button>
            </Paper>

            <Box sx={{ height: '40vh', width: '100%', borderRadius: 1, overflow: 'hidden', mt: 3 }}>
                <Typography variant="body1" component="h4" sx={{ mb: 2 }}>Peticiones de Vacaciones</Typography>
                <div style={{ width: '100%' }}>
                    <AgGridReact
                        rowData={peticionVacaciones}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        theme={themeQuartz}
                        
                        domLayout='autoHeight'
                        getRowId={(params) => String(params.data.idPeticion)}
                    />
                </div>
            </Box>
        </Box>


    );
}

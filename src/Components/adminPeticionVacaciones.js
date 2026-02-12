import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/Client";
import CellEditor from "./cellEditor";
import { ResetTvOutlined } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminPeticionVacaciones() {
    const navigate = useNavigate();
    const [rowData, setRowData] = useState([]);
    const [peticionVacaciones, setPeticionVacaciones] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        Client.getPeticionesVacaciones().then(data => {
            setPeticionVacaciones(data);
            console.log("Vacation requests fetched successfully:", data);
        }).catch(error => {
            console.error("Error obteniendo vacaciones:", error);
        });
    }, []);

    useEffect(() => {
        Client.getUsuarios().then(data => {
            setUsers(data);
            console.log("Usuarios fetched successfully:", data);
        }).catch(error => {
            console.error("Error obteniendo usuarios:", error);
        });
    }, []);

    useEffect(() => {
        if (peticionVacaciones && peticionVacaciones.length > 0 && users && users.length > 0) {
            Client.getTrabajadores().then(data => {
                data.forEach(trabajador => {
                    const user = users ? users.find(u => u.id === trabajador.usuarioId) : null;
                    trabajador.usuario = user;
                });
                setTrabajadores(data);
                console.log("Trabajadores fetched successfully:", data);
            }).catch(error => {
                console.error("Error obteniendo trabajadores:", error);
            });
        }
    }, [peticionVacaciones, users]);

    useEffect(() => {
        if (peticionVacaciones && peticionVacaciones.length > 0 && trabajadores && trabajadores.length > 0) {
            const rowData = peticionVacaciones.map(peticion => {
                const trabajador = trabajadores.find(t => t.id === peticion.trabajadorId);
                return {
                    ...peticion,
                    trabajador: trabajador ? trabajador : "Desconocido"
                };
            });
            setRowData(rowData);
            console.log("Row data set successfully:", rowData);
        }
    }, [peticionVacaciones, trabajadores]);

    const colDefs = [
        { headerName: "Trabajador", field: "trabajador.usuario.nombre", sortable: true, filter: true, editable: false },
        { headerName: "Inicio", field: "fechaInicio", sortable: true, filter: true, editable: false },
        { headerName: "Fin", field: "fechaFin", sortable: true, filter: true, editable: false },
        {
            headerName: "Estado", field: "estado", sortable: true, filter: true, editable: true,

            valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },

            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: ["Pendiente", "Aprobada", "Rechazada"]
            }

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
                    e?.stopPropagation?.(); // evita seleccionar la fila al hacer click

                    try {
                        console.log("Attempting to delete vacation request with ID:", params);
                        Client.deletePeticionVacaciones(params.data.idPeticion).then(result => {
                            console.log("Vacation request deleted successfully:", result);
                            if (result.ok || result === 204) {
                                console.log("Removing vacation request from UI with ID:", params.data.idPeticion);
                                setPeticionVacaciones(prev => prev.filter(p => p.idPeticion !== params.data.idPeticion));
                            }
                            
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

    const colDefsDias = [
        { headerName: "Trabajador", field: "usuario.nombre", sortable: true, filter: true, editable: false },
        { headerName: "Dias disponibles", field: "vacacionesDisponibles", sortable: true, filter: true, editable: false },
    ];

    const onCellValueChanged = (params) => {
        const updatedPeticion = {
            ...params.data,
            estado: params.newValue.toUpperCase()
        };
        Client.updatePeticionVacaciones(updatedPeticion).then(result => {

        }).catch(error => {
            console.error("Error updating vacation request:", error);
        });
    };

    return (

        <Box sx={{ width: '100%', p: 3 }}>

            <Box sx={{ height: '40vh', width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                <Typography variant="h5" component="h4" sx={{ mb: 2 }}>Peticiones de Vacaciones</Typography>
                <div style={{ width: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        theme={themeQuartz}
                        onCellValueChanged={onCellValueChanged}
                        domLayout='autoHeight'
                        getRowId={(params) => String(params.data.idPeticion)}
                    />
                </div>
            </Box>

            <Box sx={{ height: '30vh', width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                <Typography variant="h5" component="h4" sx={{ mb: 2 }}>Dias Disponibles</Typography>
                <div style={{ width: '100%' }}>
                    <AgGridReact
                        rowData={trabajadores}
                        columnDefs={colDefsDias}
                        defaultColDef={defaultColDef}
                        theme={themeQuartz}
                        onCellValueChanged={onCellValueChanged}
                        domLayout='autoHeight'
                        getRowId={(params) => String(params.data.idTrabajador)}
                    />
                </div>
            </Box>
        </Box>


    );
}

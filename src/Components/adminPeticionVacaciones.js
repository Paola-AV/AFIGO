import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button, Typography } from '@mui/material';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';

export default function AdminPeticionVacaciones(props) {
    const [rowData, setRowData] = useState([]);
    const [rowDataPasadas, setRowDataPasadas] = useState([]);
    const [peticionVacaciones, setPeticionVacaciones] = useState([]);
    const [peticionVacacionesPasadas, setPeticionVacacionesPasadas] = useState([]);
    const [trabajadores, setTrabajadores] = useState([]);
    const [users, setUsers] = useState(null);
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    useEffect(() => {
        Client.getPeticionesVacacionesFuturas().then(data => {
            setPeticionVacaciones(data);
        }).catch(error => {
            console.error("Error obteniendo vacaciones:", error);
        });
    }, []);

    useEffect(() => {
        Client.getPeticionesVacacionesPasadas().then(data => {
            setPeticionVacacionesPasadas(data);
        }).catch(error => {
            console.error("Error obteniendo vacaciones:", error);
        });
    }, []);

    useEffect(() => {
        Client.getUsuarios().then(data => {
            setUsers(data);
        }).catch(error => {
            console.error("Error obteniendo usuarios:", error);
        });
    }, []);

    useEffect(() => {
        if (users && users.length > 0) {
            Client.getTrabajadores().then(data => {
                data.forEach(trabajador => {
                    const user = users ? users.find(u => u.userId === trabajador.idUsuario) : null;
                    trabajador.usuario = user;
                });
                setTrabajadores(data);
            }).catch(error => {
                console.error("Error obteniendo trabajadores:", error);
            });
        }
    }, [ users]);

    useEffect(() => {
        if (peticionVacacionesPasadas && peticionVacacionesPasadas.length > 0 && trabajadores && trabajadores.length > 0) {
            const rowData = peticionVacacionesPasadas.map(peticion => {
                const trabajador = trabajadores.find(t => t.idTrabajador === peticion.idTrabajador);
                return {
                    ...peticion,
                    trabajador: trabajador ? trabajador : "Desconocido"
                };
            });
            setRowDataPasadas(rowData);
        }
    }, [peticionVacacionesPasadas, trabajadores]);

      useEffect(() => {
        if (peticionVacaciones && peticionVacaciones.length > 0 && trabajadores && trabajadores.length > 0) {
            const rowData = peticionVacaciones.map(peticion => {
                const trabajador = trabajadores.find(t => t.idTrabajador === peticion.idTrabajador);
                return {
                    ...peticion,
                    trabajador: trabajador ? trabajador : "Desconocido"
                };
            });
            setRowData(rowData);
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

        }, {
            headerName: "Medio dia", field: "medioDia", sortable: true, filter: true, editable: false,
            cellRenderer: (params) => (
                params.value ? "Sí" : "No"
            )
        },
        {
            headerName: "Creado en", field: "fechaCreado", sortable: true, filter: true, editable: false, sort: 'desc',
            valueFormatter: params => {
                if (!params.value) return '';
                // Forzar UTC agregando Z si no la tiene
                const raw = params.value.endsWith('Z') ? params.value : params.value + 'Z';
                const date = new Date(raw);
                return date.toLocaleString(navigator.language, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                     hour12: true,
                });
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
                 if (params.data.estado == "APROBADO" ||params.data.estado ==  "APROBADA") {
                    return null
                }
                const handleDelete = async (e) => {
                    e?.stopPropagation?.(); // evita seleccionar la fila al hacer click

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

    const colDefsPasadas = [
        { headerName: "Trabajador", field: "trabajador.usuario.nombre", sortable: true, filter: true, editable: false },
        { headerName: "Inicio", field: "fechaInicio", sortable: true, filter: true, editable: false },
        { headerName: "Fin", field: "fechaFin", sortable: true, filter: true, editable: false },
        {
            headerName: "Estado", field: "estado", sortable: true, filter: true, editable: false,

            valueFormatter: params => {
                if (!params.value) return "";
                const v = params.value.toString();
                return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
            },

            cellEditor: "agSelectCellEditor",
            cellEditorParams: {
                values: ["Pendiente", "Aprobada", "Rechazada"]
            }

        }, {
            headerName: "Medio dia", field: "medioDia", sortable: true, filter: true, editable: false,
            cellRenderer: (params) => (
                params.value ? "Sí" : "No"
            )
        },
        {
            headerName: "Creado en", field: "fechaCreado", sortable: true, filter: true, editable: false, sort: 'desc',
            valueFormatter: params => {
                if (!params.value) return '';
                // Forzar UTC agregando Z si no la tiene
                const raw = params.value.endsWith('Z') ? params.value : params.value + 'Z';
                const date = new Date(raw);
                return date.toLocaleString(navigator.language, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                     hour12: true,
                });
            }
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
        if (params.data.trabajador.idUsuario == props.user.userId) {
            console.warn("No puedes cambiar el estado de tu propia solicitud de vacaciones.");
            setSnackbar({ open: true, message: 'No puede cambiar el estado de su propia solicitud.' });
            setRowData(prev => prev.map(row =>
                row === params.data
                    ? { ...row, estado: params.oldValue }
                    : row
            ));
            return;
        } else {
            const updatedPeticion = {
                ...params.data,
                estado: params.newValue.toUpperCase()
            };
            Client.updatePeticionVacaciones(updatedPeticion).then(result => {

            }).catch(error => {
                console.error("Error updating vacation request:", error);
            });
        }

    };

    return (

        <><Box sx={{ width: '100%', p: 3 }}>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/PeticionVacaciones')}
                sx={{ backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' }, mb: 3 }}
            >
                Agregar solicitud de vacaciones
            </Button>

            <Box sx={{ height: 400, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                <Typography variant="h5" component="h4" sx={{ mb: 2 }}>Peticiones de Vacaciones</Typography>
                <Box sx={{ height: 300, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz}
                            onCellValueChanged={onCellValueChanged}
                            domLayout='normal'
                            getRowId={(params) => String(params.data.idPeticion)} />
                    </div>
                </Box>

            </Box>

            <Box sx={{ height: 400, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                <Typography variant="h5" component="h4" sx={{ mb: 2 }}>Historial de Peticiones</Typography>
                <Box sx={{ height: 300, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        <AgGridReact
                            rowData={rowDataPasadas}
                            columnDefs={colDefsPasadas}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz}
                            onCellValueChanged={onCellValueChanged}
                            domLayout='normal'
                            getRowId={(params) => String(params.data.idPeticion)} />
                    </div>
                </Box>

            </Box>

            <Box sx={{ height: 400, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                <Typography variant="h5" component="h4" sx={{ mb: 2 }}>Dias Disponibles</Typography>
                <Box sx={{ height: 300, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
                    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                        <AgGridReact
                            rowData={trabajadores}
                            columnDefs={colDefsDias}
                            defaultColDef={defaultColDef}
                            theme={themeQuartz}
                            onCellValueChanged={onCellValueChanged}
                            domLayout='normal'
                            getRowId={(params) => String(params.data.idTrabajador)} />
                    </div>
                </Box>

            </Box>
        </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ open: false, message: '' })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                ContentProps={{ sx: { backgroundColor: '#ED6C02' } }} // color warning
                message={snackbar.message} />
        </>
    );
}

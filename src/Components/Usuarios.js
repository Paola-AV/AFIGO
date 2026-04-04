import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";
import { useAuth } from "../Context/AuthContext";
import { Nav } from "./Nav";
import EditarUsuario from "./editarUsuario";

export default function Usuarios() {
    const navigate = useNavigate();
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const [rowData, setRowData] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [usuarioADesactivar, setUsuarioADesactivar] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [desactivando, setDesactivando] = useState(false);

    useEffect(() => {
        Client.getUsuarios().then(data => { setRowData(data) });
    }, []);

    const handleEditar = (data) => {
        setUsuarioSeleccionado(data);
        setDialogOpen(true);
    };

    const handleGuardado = () => {
        setDialogOpen(false);
        setUsuarioSeleccionado(null);
        Client.getUsuarios().then(data => setRowData(data));
    };

    const handleCancelar = () => {
        setDialogOpen(false);
        setUsuarioSeleccionado(null);
    };

    const handleDesactivarClick = (data) => {
        setUsuarioADesactivar(data);
        setConfirmOpen(true);
    };

    const handleConfirmarDesactivar = async () => {
        setDesactivando(true);
        try {
            await Client.inactivarUsuario(usuarioADesactivar.userId);
            Client.getUsuarios().then(data => setRowData(data));
        } catch (err) {
            console.error("Error desactivando usuario:", err);
        } finally {
            setDesactivando(false);
            setConfirmOpen(false);
            setUsuarioADesactivar(null);
        }
    };

    const EditarCellRenderer = ({ data }) => {
        if (!user) return null;
        const isSelf = user.userId === data.userId;

        return (
            <Button
                size="small"
                startIcon={<EditIcon fontSize="small" />}
                onClick={() => !isSelf && handleEditar(data)}
                disabled={isSelf}
                sx={{
                    color: isSelf ? '#9e9e9e' : '#FF5A00',
                    textTransform: 'none',
                    fontWeight: 600,
                    cursor: isSelf ? 'not-allowed' : 'pointer',
                    '&:hover': !isSelf ? { backgroundColor: '#FF5A0015' } : {}
                }}
            >
                {isSelf ? "No permitido" : "Editar"}
            </Button>
        );
    };


    const DesactivarCellRenderer = ({ data }) => (
        <Button
            size="small"
            startIcon={<BlockIcon fontSize="small" />}
            onClick={() => handleDesactivarClick(data)}
            sx={{
                color: '#d32f2f',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#d32f2f15' }
            }}
        >
            Desactivar
        </Button>
    );

    const colDefs = [
        { headerName: "Nombre", field: "nombre", sortable: true, filter: true },
        { headerName: "Correo Electrónico", field: "correo", sortable: true, filter: true },
        { headerName: "Usuario", field: "nombreDeUsuario", sortable: true, filter: true },
        {
            headerName: "Admin", field: "usuarioAdmin", sortable: true, filter: true,
            valueFormatter: params => params.value === 1 ? 'Si' : 'No'
        },
        { headerName: "Sede", field: "trabajador.sede", sortable: true, filter: true },
        {
            headerName: "Activo", field: "activo", sortable: true, filter: true,
            valueFormatter: params => params.value === 1 ? 'Si' : 'No'
        },
        {
            headerName: "", field: "acciones", sortable: false, filter: false,
            cellRenderer: EditarCellRenderer, width: 110, flex: 0
        },
        {
            headerName: "", field: "desactivar", sortable: false, filter: false,
            cellRenderer: DesactivarCellRenderer, width: 130, flex: 0
        },
    ];

    const defaultColDef = {
        editable: false,
        flex: 1,
        minWidth: 100,
        filter: true,
        filterParams: { buttons: ['clear'] }
    };

    return (
        <>
            <Nav />
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

                <Box sx={{ height: 500, borderRadius: 1, overflow: 'hidden' }}>
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

            <EditarUsuario
                open={dialogOpen}
                usuario={usuarioSeleccionado}
                onGuardado={handleGuardado}
                onCancelar={handleCancelar}
            />

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle fontWeight={600}>Desactivar usuario</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro que deseas desactivar a <strong>{usuarioADesactivar?.nombre}</strong>? El usuario no podrá iniciar sesión.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                    <Button
                        variant="outlined"
                        onClick={() => setConfirmOpen(false)}
                        sx={{ textTransform: 'none' }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleConfirmarDesactivar}
                        disabled={desactivando}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            backgroundColor: '#d32f2f',
                            '&:hover': { backgroundColor: '#b71c1c' }
                        }}
                    >
                        {desactivando ? 'Desactivando...' : 'Desactivar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
import React, { useEffect, useState } from "react";
import {
    Box, Typography, TextField, Switch, FormControlLabel,
    Button, Autocomplete, Divider, CircularProgress,
    Dialog, DialogTitle, DialogContent, DialogActions, IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Client } from "../Util/client";

export default function EditarUsuario({ usuario, open, onGuardado, onCancelar }) {
    const [form, setForm] = useState({
        userId: usuario?.userId || null,
        trabajadorId: usuario?.trabajador?.idTrabajador || null,
        nombre: '',
        correo: '',
        nombreDeUsuario: '',
        usuarioAdmin: false,
        vendedor: false,
        nombreVendedor: null,
        sede: ''
    });

    const [nombresVendedor, setNombresVendedor] = useState([]);
    const [loading, setLoading] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const sedes = [
        "NICOYA",
        "PALMARES",
        "COBANO",
        "SARCHI",
        "TODAS"
    ];

    // Resetea el form cuando cambia el usuario
    useEffect(() => {
        if (usuario) {
            setForm({
                userId: usuario?.userId || null,
                trabajadorId: usuario?.trabajador?.idTrabajador || null,
                nombre: usuario?.nombre || '',
                correo: usuario?.correo || '',
                nombreDeUsuario: usuario?.nombreDeUsuario || '',
                usuarioAdmin: usuario?.usuarioAdmin || false,
                vendedor: usuario?.trabajador?.vendedor || false,
                nombreVendedor: usuario?.trabajador?.nombreVendedor || null,
                sede: usuario?.trabajador?.sede || "",
            });
        }
    }, [usuario]);

    useEffect(() => {
        if (form.vendedor && nombresVendedor.length === 0) {
            setLoading(true);
            Client.getNombreVendedores()
                .then(data => setNombresVendedor(data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [form.vendedor]);

    const handleChange = (field) => (e) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSwitch = (field) => (e) => {
        setForm(prev => ({
            ...prev,
            [field]: e.target.checked,
            ...(field === 'vendedor' && !e.target.checked ? { nombreVendedor: null } : {})
        }));
    };

    const handleGuardar = async () => {
        setGuardando(true);
        try {
            if(form.usuarioAdmin==1){form.usuarioAdmin=true}else if (form.usuarioAdmin==0){form.usuarioAdmin=false}
            if(form.vendedor==1){form.vendedor=true}else if (form.vendedor==0){form.vendedor=false}
            await Client.updateUsuario(form);
            onGuardado?.();
        } catch (err) {
            console.error("Error guardando usuario:", err);
        } finally {
            setGuardando(false);
        }
    };

    return (
        <Dialog open={open} onClose={onCancelar} maxWidth="sm" fullWidth>

            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography fontWeight={600}>Editar usuario</Typography>
                <IconButton onClick={onCancelar} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        DATOS GENERALES
                    </Typography>

                    <TextField
                        label="Nombre"
                        value={form.nombre}
                        onChange={handleChange('nombre')}
                        size="small"
                        fullWidth
                    />
                    <TextField
                        label="Dirección"
                        value={form.correo}
                        onChange={handleChange('direccion')}
                        size="small"
                        fullWidth
                    />
                    <TextField
                        label="Nombre de usuario"
                        value={form.nombreDeUsuario}
                        onChange={handleChange('nombreDeUsuario')}
                        size="small"
                        fullWidth
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={form.usuarioAdmin}
                                onChange={handleSwitch('usuarioAdmin')}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF5A00' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF5A00' },
                                }}
                            />
                        }
                        label="Administrador"
                    />

                    <Divider />

                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        ROL DE VENDEDOR
                    </Typography>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={form.vendedor}
                                onChange={handleSwitch('vendedor')}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF5A00' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF5A00' },
                                }}
                            />
                        }
                        label="Es vendedor"
                    />

                    {form.vendedor && (
                        <Autocomplete
                            options={nombresVendedor}
                            value={form.nombreVendedor}
                            onChange={(_, newValue) =>
                                setForm(prev => ({ ...prev, nombreVendedor: newValue }))
                            }
                            loading={loading}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Vendedor asignado"
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loading && <CircularProgress size={16} />}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />
                    )}


                    <Autocomplete
                        options={sedes}
                        value={form.sede}
                        onChange={(_, newValue) =>
                            setForm(prev => ({ ...prev, sede: newValue }))
                        }
                        getOptionLabel={(option) =>
                            option ? option.charAt(0) + option.slice(1).toLowerCase() : ""
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Sede"
                                size="small"
                                fullWidth
                            />
                        )}
                    />

                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button
                    variant="outlined"
                    onClick={onCancelar}
                    sx={{ textTransform: 'none', color: '#FF5A00', borderColor: '#FF5A00' }}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    onClick={handleGuardar}
                    disabled={guardando || (form.vendedor && !form.nombreVendedor)}
                    sx={{
                        backgroundColor: '#FF5A00',
                        '&:hover': { backgroundColor: '#CF4C05' },
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    {guardando
                        ? <CircularProgress size={20} sx={{ color: 'white' }} />
                        : 'Guardar cambios'
                    }
                </Button>
            </DialogActions>

        </Dialog>
    );
}
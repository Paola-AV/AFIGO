import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Client } from "../Util/client";
import { Nav } from "./Nav";



export function FormularioU() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        isAdmin: '',
        nombreUsuario: '',
        password: '',
        fechaInicio: '',
        vacacionesDisponibles: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
            if (!formData.nombre || !formData.correo || !formData.nombreUsuario || !formData.password) {
            alert('Por favor, complete todos los campos obligatorios.');
            
            return;
            }
            if (formData.isAdmin === 'Si'){
                formData.isAdmin = true;
            }else{
                formData.isAdmin = false;
            }

        Client.register(formData).then(result => {
            e.preventDefault()
            if (result ) {
                navigate('/Usuarios');
            }
        }).catch(error => {
            console.error('Error creating user:', error);
        });

    };

    return (
        <><Nav></Nav>
        <Container maxWidth="sm">
            <Box sx={{ py: 4 }}>
                {/* Botón regresar */}
                <Box sx={{ mb: 3 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/Usuarios')}
                        sx={{ color: '#13191D', textTransform: 'none', fontSize: '1rem' }}
                    >
                        Atrás
                    </Button>
                </Box>

                {/* Título */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#13191D' }}>
                        Nuevo Usuario
                    </Typography>
                </Box>

                {/* Formulario */}
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            variant="outlined" />

                        <TextField
                            fullWidth
                            label="Correo Electrónico"
                            name="correo"
                            value={formData.correo}
                            onChange={handleChange}
                            variant="outlined" />

                        <FormControl fullWidth>
                            <InputLabel>Usuario administrador</InputLabel>
                            <Select
                                name="isAdmin"
                                value={formData.isAdmin}
                                onChange={handleSelectChange}
                                label="Usuario administrador"
                            >
                                <MenuItem value="No">No</MenuItem>
                                <MenuItem value="Si">Sí</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Nombre de usuario"
                            name="nombreUsuario"
                            value={formData.nombreUsuario}
                            onChange={handleChange}
                            variant="outlined" />

                        <TextField
                            fullWidth
                            label="Contraseña"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            variant="outlined" />

                         <TextField
                            fullWidth
                            label="Fecha de inicio"
                            name="fechaInicio"
                            type="date"
                            value={formData.fechaInicio}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }} />

                         <TextField
                            fullWidth
                            label="Vacaciones disponibles"
                            name="vacacionesDisponibles"
                            type="number"
                            value={formData.vacacionesDisponibles}
                            onChange={handleChange}
                            variant="outlined" />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#FF5A00',
                                '&:hover': { backgroundColor: '#CF4C05' },
                                py: 1.5,
                                fontWeight: 'bold',
                                mt: 2
                            }}
                        >
                            Enviar
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container></>
    );
}
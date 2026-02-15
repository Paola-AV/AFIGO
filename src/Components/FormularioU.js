import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Client } from "../Util/Client";
import { Nav } from "./Nav";


export function FormularioU() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId:3,
        nombre: '',
        direccion: '',
        usuarioAdmin: 'No',
        nombreDeUsuario: '',
        contrasenia: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {console.log("Form data updated:", formData);}, [formData]);

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
            if (!formData.nombre || !formData.direccion || !formData.nombreDeUsuario || !formData.contrasenia) {
            alert('Por favor, complete todos los campos obligatorios.');
            
            return;
            }
            if (formData.usuarioAdmin === 'Si'){
                formData.usuarioAdmin = 0;
            }else{
                formData.usuarioAdmin = 1;
            }
        Client.createUsuario(formData).then(result => {
            e.preventDefault()
            console.log('User creation result:', result);
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
                            label="Dirección"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            variant="outlined" />

                        <FormControl fullWidth>
                            <InputLabel>Usuario administrador</InputLabel>
                            <Select
                                name="usuarioAdmin"
                                value={formData.usuarioAdmin}
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
                            name="nombreDeUsuario"
                            value={formData.nombreDeUsuario}
                            onChange={handleChange}
                            variant="outlined" />

                        <TextField
                            fullWidth
                            label="Contraseña"
                            name="contrasenia"
                            type="password"
                            value={formData.contrasenia}
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
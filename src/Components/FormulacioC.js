import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Nav } from "./Nav";

export function FormularioC() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cliente: '',
        productoQty: '',
        descripcion: '',
        contacto: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        // Aquí irá la lógica para enviar los datos
    };

    return (
        <><Nav></Nav>
        <Container maxWidth="sm">
            <Box sx={{ py: 4 }}>
                {/* Botón regresar */}
                <Box sx={{ mb: 3 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/Cotizacion')}
                        sx={{ color: '#13191D', textTransform: 'none', fontSize: '1rem' }}
                    >
                        Atrás
                    </Button>
                </Box>

                {/* Título */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#13191D' }}>
                        Formulario de Cotizaciones
                    </Typography>
                </Box>

                {/* Formulario */}
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            fullWidth
                            label="Nombre del cliente"
                            name="cliente"
                            value={formData.cliente}
                            onChange={handleChange}
                            variant="outlined" />

                        <TextField
                            fullWidth
                            label="Producto y cantidad"
                            name="productoQty"
                            value={formData.productoQty}
                            onChange={handleChange}
                            variant="outlined" />

                        <TextField
                            fullWidth
                            label="Descripción del producto"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            variant="outlined"
                            multiline
                            rows={3} />

                        <TextField
                            fullWidth
                            label="Contacto del cliente"
                            name="contacto"
                            value={formData.contacto}
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
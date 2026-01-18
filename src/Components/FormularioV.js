import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container, Paper, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function FormularioV() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vendedor: '',
        cliente: '',
        tipoFactura: 'Factura electrónica',
        cedula: '',
        correo: '',
        metodoEnvio: 'Express',
        direccion: '',
        productoQty: '',
        descripcion: '',
        fecha: '',
        urgencia: 'Leve'
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
        console.log('Formulario enviado:', formData);
        // Aquí irá la lógica para enviar los datos
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ py: 4 }}>
       
                <Box sx={{ mb: 3 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/Pedidos')}
                        sx={{ color: '#13191D', textTransform: 'none', fontSize: '1rem' }}
                    >
                        Atrás
                    </Button>
                </Box>

                {/* Título */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#13191D' }}>
                        Formulario de Pedidos
                    </Typography>
                </Box>

                {/* Formulario */}
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            fullWidth
                            label="Nombre del vendedor"
                            name="vendedor"
                            value={formData.vendedor}
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Nombre del cliente"
                            name="cliente"
                            value={formData.cliente}
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <FormControl fullWidth>
                            <InputLabel>Tipo de factura</InputLabel>
                            <Select
                                name="tipoFactura"
                                value={formData.tipoFactura}
                                onChange={handleSelectChange}
                                label="Tipo de factura"
                            >
                                <MenuItem value="Factura electrónica">Factura electrónica</MenuItem>
                                <MenuItem value="Factura física">Factura física</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Cédula"
                            name="cedula"
                            value={formData.cedula}
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            name="correo"
                            type="email"
                            value={formData.correo}
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <FormControl fullWidth>
                            <InputLabel>Método de envío</InputLabel>
                            <Select
                                name="metodoEnvio"
                                value={formData.metodoEnvio}
                                onChange={handleSelectChange}
                                label="Método de envío"
                            >
                                <MenuItem value="Express">Express</MenuItem>
                                <MenuItem value="Encomienda">Encomienda</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Dirección"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Producto y cantidad"
                            name="productoQty"
                            value={formData.productoQty}
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <TextField
                            fullWidth
                            label="Descripción del producto"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            variant="outlined"
                            multiline
                            rows={3}
                        />

                        <TextField
                            fullWidth
                            label="Fecha"
                            name="fecha"
                            type="date"
                            value={formData.fecha}
                            onChange={handleChange}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                        />

                        <FormControl fullWidth>
                            <InputLabel>Urgencia</InputLabel>
                            <Select
                                name="urgencia"
                                value={formData.urgencia}
                                onChange={handleSelectChange}
                                label="Urgencia"
                            >
                                <MenuItem value="Leve">Leve</MenuItem>
                                <MenuItem value="Moderado">Moderado</MenuItem>
                                <MenuItem value="Urgente">Urgente</MenuItem>
                            </Select>
                        </FormControl>

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
        </Container>
    );
}
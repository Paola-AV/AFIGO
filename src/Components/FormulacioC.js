import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container, Paper, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Nav } from "./Nav";
import { Client } from "../Util/client";
import { useAuth } from "../Context/AuthContext"

export function FormularioC() {
    const navigate = useNavigate();
    const { user  } = useAuth();
    
    const [formData, setFormData] = useState({
        IdUsuario: '',
        NombreCliente: '',
        FechaPedido: '',
        Estado: 'Pendiente',
        FacturaElectronica: 0,
        DetalleFactura: '',
        MetodoEnvio: 'Express',
        DireccionEnvio: '',
        UrgenciaEnvio: 'Leve',
        TipoPedido: 'COTIZACION'
    });

    // Actualizar IdUsuario cuando el usuario carga
    useEffect(() => {
        if (user?.userId) {
            setFormData(prev => ({
                ...prev,
                IdUsuario: user.userId
            }));
        }
    }, [user]);

    const [detalles, setDetalles] = useState([]);

    const [detalleTemp, setDetalleTemp] = useState({
        NombreProducto: '',
        CantProducto: '',
        Descripcion: ''
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

    const handleDetalleChange = (e) => {
        const { name, value } = e.target;
        setDetalleTemp(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddDetalle = () => {
        if (!detalleTemp.NombreProducto || !detalleTemp.CantProducto) {
            alert('Por favor completa nombre del producto y cantidad');
            return;
        }
        
        setDetalles(prev => [
            ...prev,
            { ...detalleTemp, CantProducto: parseInt(detalleTemp.CantProducto) }
        ]);
        
        // Limpiar campos
        setDetalleTemp({
            NombreProducto: '',
            CantProducto: '',
            Descripcion: ''
        });
    };

    const handleRemoveDetalle = (index) => {
        setDetalles(prev => prev.filter((_, i) => i !== index));
    };

    const validarFormulario = () => {
        const errores = [];

        // Validar datos del pedido
        if (!formData.IdUsuario || parseInt(formData.IdUsuario) <= 0) {
            errores.push('ID Usuario es requerido y debe ser válido');
        }
        if (!formData.NombreCliente.trim()) {
            errores.push('Nombre del cliente es requerido');
        }
        if (!formData.FechaPedido) {
            errores.push('Fecha del pedido es requerida');
        }
        if (!formData.DireccionEnvio.trim()) {
            errores.push('Dirección de envío es requerida');
        }
        if (!formData.TipoPedido.trim()) {
            errores.push('Tipo de pedido es requerido');
        }

        // Validar detalles
        if (detalles.length === 0) {
            errores.push('Debes agregar al menos un detalle de producto');
        }

        // Validar que cada detalle tenga datos
        detalles.forEach((detalle, index) => {
            if (!detalle.NombreProducto.trim()) {
                errores.push(`Detalle ${index + 1}: Nombre del producto es requerido`);
            }
            if (!detalle.CantProducto || detalle.CantProducto <= 0) {
                errores.push(`Detalle ${index + 1}: Cantidad debe ser mayor a 0`);
            }
        });

        return errores;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar formulario
        const errores = validarFormulario();
        if (errores.length > 0) {
            alert('Por favor corrige los siguientes errores:\n\n' + errores.join('\n'));
            return;
        }

        try {
            // 1. Crear el pedido
            const pedidoData = {
                IdUsuario: parseInt(formData.IdUsuario),
                NombreCliente: formData.NombreCliente.trim(),
                FechaPedido: formData.FechaPedido,
                Estado: formData.Estado,
                FacturaElectronica: parseInt(formData.FacturaElectronica),
                DetalleFactura: formData.DetalleFactura.trim(),
                MetodoEnvio: formData.MetodoEnvio,
                DireccionEnvio: formData.DireccionEnvio.trim(),
                UrgenciaEnvio: formData.UrgenciaEnvio,
                TipoPedido: formData.TipoPedido
            };

            const responsePedido = await Client.createPedido(pedidoData);
            const idPedidoCreado = responsePedido.idPedido;

            // 2. Crear los detalles uno a uno
            for (const detalle of detalles) {
                const detalleData = {
                    ...detalle,
                    PedidoId: idPedidoCreado
                };
                const responseDetalle = await Client.createDetallePedido(detalleData);
            }

            alert('Cotizacion creada exitosamente');
            navigate('/Cotizacion');

        } catch (error) {
            console.error('Error al crear cotizacion:', error);
            alert('Error al crear la cotizacion. Intenta de nuevo.');
        }
    };

    return (
        <>
            <Nav />
            <Container maxWidth="md">
                <Box sx={{ py: 4 }}>
                    <Box sx={{ mb: 3 }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/Cotizacion')}
                            sx={{ color: '#13191D', textTransform: 'none', fontSize: '1rem' }}
                        >
                            Atrás
                        </Button>
                    </Box>

                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#13191D' }}>
                            Formulario de Cotización
                        </Typography>
                    </Box>

                    <Paper elevation={3} sx={{ p: 4 }}>
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            
                            {/* SECCIÓN: DATOS DEL PEDIDO */}
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#13191D', mt: 2 }}>
                                Datos de la cotización
                            </Typography>

                            <TextField
                                fullWidth
                                label="Nombre del cliente"
                                name="NombreCliente"
                                value={formData.NombreCliente}
                                onChange={handleChange}
                                variant="outlined"
                                required />

                            <TextField
                                fullWidth
                                label="Fecha del pedido"
                                name="FechaPedido"
                                type="date"
                                value={formData.FechaPedido}
                                onChange={handleChange}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                required />

                            <FormControl fullWidth>
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    name="Estado"
                                    value={formData.Estado}
                                    onChange={handleSelectChange}
                                    label="Estado"
                                >
                                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                                    <MenuItem value="Confirmado">Confirmado</MenuItem>
                                    <MenuItem value="Enviado">Enviado</MenuItem>
                                    <MenuItem value="Entregado">Entregado</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Factura Electrónica</InputLabel>
                                <Select
                                    name="FacturaElectronica"
                                    value={formData.FacturaElectronica}
                                    onChange={handleSelectChange}
                                    label="Factura Electrónica"
                                >
                                    <MenuItem value={1}>Sí</MenuItem>
                                    <MenuItem value={0}>No</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Detalle de la factura"
                                name="DetalleFactura"
                                value={formData.DetalleFactura}
                                onChange={handleChange}
                                variant="outlined"
                                multiline
                                rows={3} />

                            <FormControl fullWidth>
                                <InputLabel>Método de envío</InputLabel>
                                <Select
                                    name="MetodoEnvio"
                                    value={formData.MetodoEnvio}
                                    onChange={handleSelectChange}
                                    label="Método de envío"
                                >
                                    <MenuItem value="Express">Express</MenuItem>
                                    <MenuItem value="Encomienda">Encomienda</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="Dirección de envío"
                                name="DireccionEnvio"
                                value={formData.DireccionEnvio}
                                onChange={handleChange}
                                variant="outlined"
                                required />

                            <FormControl fullWidth>
                                <InputLabel>Urgencia de envío</InputLabel>
                                <Select
                                    name="UrgenciaEnvio"
                                    value={formData.UrgenciaEnvio}
                                    onChange={handleSelectChange}
                                    label="Urgencia de envío"
                                >
                                    <MenuItem value="Leve">Leve</MenuItem>
                                    <MenuItem value="Moderado">Moderado</MenuItem>
                                    <MenuItem value="Urgente">Urgente</MenuItem>
                                </Select>
                            </FormControl>

                            {/* SECCIÓN: AGREGAR DETALLES */}
                            <Box sx={{ borderTop: '2px solid #e0e0e0', pt: 3, mt: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#13191D', mb: 2 }}>
                                    Detalles del Producto
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Nombre del producto"
                                        name="NombreProducto"
                                        value={detalleTemp.NombreProducto}
                                        onChange={handleDetalleChange}
                                        variant="outlined" />

                                    <TextField
                                        fullWidth
                                        label="Cantidad"
                                        name="CantProducto"
                                        type="number"
                                        value={detalleTemp.CantProducto}
                                        onChange={handleDetalleChange}
                                        variant="outlined" />

                                    <TextField
                                        fullWidth
                                        label="Descripción del producto"
                                        name="Descripcion"
                                        value={detalleTemp.Descripcion}
                                        onChange={handleDetalleChange}
                                        variant="outlined"
                                        multiline
                                        rows={2} />

                                    <Button
                                        variant="outlined"
                                        onClick={handleAddDetalle}
                                        sx={{ 
                                            textTransform: 'none', 
                                            fontSize: '1rem',
                                            borderColor: '#FF5A00',
                                            color: '#FF5A00',
                                            '&:hover': { 
                                                backgroundColor: 'rgba(255, 90, 0, 0.05)',
                                                borderColor: '#CF4C05'
                                            }
                                        }}
                                    >
                                        + Agregar Producto
                                    </Button>
                                </Box>
                            </Box>

                            {/* SECCIÓN: TABLA DE DETALLES */}
                            {detalles.length > 0 && (
                                <Box sx={{ borderTop: '2px solid #e0e0e0', pt: 3 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#13191D', mb: 2 }}>
                                        Productos Agregados ({detalles.length})
                                    </Typography>

                                    <TableContainer component={Paper} sx={{ mb: 3 }}>
                                        <Table>
                                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                                <TableRow>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Producto</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                                                    <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                                                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acción</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {detalles.map((detalle, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{detalle.NombreProducto}</TableCell>
                                                        <TableCell align="center">{detalle.CantProducto}</TableCell>
                                                        <TableCell>{detalle.Descripcion || '-'}</TableCell>
                                                        <TableCell align="center">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleRemoveDetalle(index)}
                                                                sx={{ color: '#FF5A00' }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            )}

                            {/* BOTÓN ENVIAR */}
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
                                Enviar Cotización
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}
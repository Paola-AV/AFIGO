import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Client } from "../Util/Client";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Nav } from "./Nav";
import { useAuth } from "../Context/AuthContext"

export default function FormularioVacaciones() {
    const navigate = useNavigate();
     const { user  } = useAuth();
     console.log("User in FormularioVacaciones:", user);

    const [formData, setFormData] = useState({
        estado: "PENDIENTE",
        fechaInicio: null,
        fechaFin: null,
        idTrabajador: user.idTrabajador,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const minFechaFin = useMemo(
        () => formData.fechaInicio ? formData.fechaInicio : null,
        [formData.fechaInicio]
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.fechaInicio || !formData.fechaFin) {
            alert("Debes seleccionar ambas fechas.");
            return;
        }
        if (formData.fechaFin.isBefore(formData.fechaInicio, "day")) {
            alert("La fecha de fin no puede ser anterior a la fecha de inicio.");
            return;
        }

        const payload = {
            estado: formData.estado,
            idTrabajador: formData.idTrabajador,
            fechaInicio: formData.fechaInicio.format('YYYY-MM-DD'),
            fechaFin: formData.fechaFin.format('YYYY-MM-DD'),

        };

        console.log("Formulario enviado:", payload);
        Client.createPeticionVacaciones(payload).then(result => {
            e.preventDefault()

            if (result) {
                navigate('/Vacaciones');
            }
        }).catch(error => {
            console.error('Error creating user:', error);
        });

    };

    return (
        <><Nav></Nav>
            <Container maxWidth="sm">
                <Box sx={{ py: 4 }}>
                    {/* Atrás */}
                    <Box sx={{ mb: 3 }}>
                        <Button
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/Vacaciones')}
                            sx={{ color: '#13191D', textTransform: 'none', fontSize: '1rem' }}
                        >
                            Atrás
                        </Button>
                    </Box>

                    {/* Título */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#13191D' }}>
                            Formulario de Vacaciones
                        </Typography>
                    </Box>

                    {/* Formulario */}
                    <Paper elevation={3} sx={{ p: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                            >

                                <DatePicker
                                    label="Fecha de Inicio"
                                    value={formData.fechaInicio}
                                    onChange={(newValue) => setFormData(prev => ({ ...prev, fechaInicio: newValue }))}

                                    format="DD/MM/YYYY"
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            required: true
                                        }
                                    }}
                                    disablePast />

                                <DatePicker
                                    label="Fecha de Fin"
                                    value={formData.fechaFin}
                                    onChange={(newValue) => setFormData(prev => ({ ...prev, fechaFin: newValue }))}
                                    format="DD/MM/YYYY"
                                    minDate={minFechaFin}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            required: true
                                        }
                                    }}
                                    disablePast />

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
                        </LocalizationProvider>
                    </Paper>
                </Box>
            </Container></>
    );
}
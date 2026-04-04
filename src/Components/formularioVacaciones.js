import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, Paper, Checkbox } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Client } from "../Util/client";
import 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Nav } from "./Nav";
import { useAuth } from "../Context/AuthContext";
import dayjs from 'dayjs';
dayjs.locale('es');


export default function FormularioVacaciones() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [medioDia, setMedioDia] = useState(false);
  const userId = user?.userId;

  const [trabajador, setTrabajador] = useState(null);

  const [formData, setFormData] = useState({
    estado: "PENDIENTE",
    fechaInicio: null,
    fechaFin: null,
    idTrabajador: null,
  });


  useEffect(() => {
    if (userId) {
      Client.getTrabajadorByUsuarioId(userId)
        .then((data) => {
          setTrabajador(data);
        })
        .catch((error) => {
          console.error("Error obteniendo trabajadores:", error);
        });
    }
  }, [userId]);


  useEffect(() => {
    if (trabajador?.idTrabajador) {
      setFormData((prev) => ({ ...prev, idTrabajador: trabajador.idTrabajador }));
    }
  }, [trabajador]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const minFechaFin = useMemo(
    () => formData.fechaInicio ?? null,
    [formData.fechaInicio]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    let fechaInicio = formData.fechaInicio;
    let fechaFin = formData.fechaFin;

    if (medioDia) {
      if (!fechaInicio) {
        alert("Debes seleccionar la fecha de inicio.");
        return;
      }
      fechaFin = fechaInicio;
    }

    if (!fechaInicio || !fechaFin) {
      alert("Debes seleccionar ambas fechas.");
      return;
    }

    if (!medioDia && fechaFin.isBefore(fechaInicio, "day")) {
      alert("La fecha de fin no puede ser anterior a la fecha de inicio.");
      return;
    }

    if (!formData.idTrabajador) {
      alert("No se pudo establecer el trabajador. Intenta nuevamente.");
      return;
    }

    const payload = {
      estado: formData.estado,
      idTrabajador: formData.idTrabajador,
      fechaInicio: fechaInicio.format("YYYY-MM-DD"),
      fechaFin: fechaFin.format("YYYY-MM-DD"),
      medioDia: medioDia
    };
   
    Client.createPeticionVacaciones(payload)
      .then((result) => {
        if (result) {
          navigate("/Vacaciones");
        }
      })
      .catch((error) => {
        console.error("Error creando petición de vacaciones:", error);
      });
  };

  return trabajador ? (
    <>
      <Nav />
      <Container maxWidth="sm">
        <Box sx={{ py: 4 }}>
          {/* Atrás */}
          <Box sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/Vacaciones")}
              sx={{ color: "#13191D", textTransform: "none", fontSize: "1rem" }}
            >
              Atrás
            </Button>
          </Box>

          {/* Título */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#13191D" }}>
              Formulario de Vacaciones
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography>Medio día</Typography>
            <Checkbox
              checked={medioDia}
              onChange={(e) => setMedioDia(e.target.checked)}
            ></Checkbox>
          </Box>

          {/* Formulario */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <DatePicker
                  label="Fecha de Inicio"
                  value={formData.fechaInicio}
                  onChange={(newValue) => setFormData((prev) => ({ ...prev, fechaInicio: newValue }))}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: { fullWidth: true, required: true },
                  }}
                  disablePast
                />
                {!medioDia ?
                  <DatePicker
                    label="Fecha de Fin"
                    value={formData.fechaFin}
                    onChange={(newValue) => setFormData((prev) => ({ ...prev, fechaFin: newValue }))}
                    format="DD/MM/YYYY"
                    minDate={minFechaFin}
                    slotProps={{
                      textField: { fullWidth: true, required: true },
                    }}
                    disablePast
                  /> : <span></span>
                }


                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF5A00",
                    "&:hover": { backgroundColor: "#CF4C05" },
                    py: 1.5,
                    fontWeight: "bold",
                    mt: 2,
                  }}
                >
                  Enviar
                </Button>
              </Box>
            </LocalizationProvider>
          </Paper>
        </Box>
      </Container>
    </>
  ) : (
    <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
      Cargando...
    </Typography>
  );
}

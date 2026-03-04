import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, InputAdornment, Snackbar, Alert, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Client } from "../Util/client";
import { useAuth } from "../Context/AuthContext";
import { Nav } from '../Components/Nav';

export default function UsuarioPage(props) {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [peticionVacaciones, setPeticionVacaciones] = useState([]);
  const [trabajador, setTrabajador] = useState(null);
  const userId = user;

  // === Estados para el modal de contraseña ===
  const [openModal, setOpenModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (userId) {
      console.log("Obteniendo trabajador para usuarioId:", userId);
      Client.getTrabajadorByUsuarioId(userId.userId)
        .then(data => {
          setTrabajador(data);
          console.log("Trabajadores fetched successfully:", data);
        })
        .catch(error => {
          console.error("Error obteniendo trabajadores:", error);
        });
    }
  }, [userId]);

  const handleOpenModal = () => {
    setFormError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    if (!loading) setOpenModal(false);
  };

  // Validación básica de la contraseña
  const validate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return "Por favor completa todos los campos.";
    }
    if (newPassword.length < 8) {
      return "La nueva contraseña debe tener al menos 8 caracteres.";
    }
    // Puedes reforzar con regex: mayúscula, minúscula, número, símbolo
    // const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    // if (!strongRegex.test(newPassword)) return "La contraseña debe incluir mayúsculas, minúsculas, número y símbolo.";
    if (newPassword !== confirmPassword) {
      return "La confirmación no coincide con la nueva contraseña.";
    }
    if (currentPassword === newPassword) {
      return "La nueva contraseña no puede ser igual a la actual.";
    }
    return "";
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) {
      setFormError(err);
      return;
    }
    try {
      setLoading(true);
      setFormError("");

      // 🔁 Ajusta esta llamada según tu API
      // Ejemplo: Client.cambiarContrasena({ userId: userId.userId, actual: currentPassword, nueva: newPassword })
      await Client.cambiarContrasena(userId.userId, currentPassword, newPassword);

      setSnack({ open: true, message: "Contraseña actualizada correctamente.", severity: "success" });
      setOpenModal(false);
    } catch (e) {
      console.error("Error cambiando contraseña:", e);
      const msg = e?.response?.data?.message || e?.message || "No se pudo cambiar la contraseña. Intenta nuevamente.";
      setFormError(msg);
      setSnack({ open: true, message: "Error al cambiar contraseña.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav></Nav>
      <Box sx={{ width: '100%', p: 3 }}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 3,
            width: '70%',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifySelf: 'center'
          }}
        >
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
            Bienvenido, {userId ? userId.nombre : "Cargando..."}
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            sx={{ backgroundColor: '#FF5A00', '&:hover': { backgroundColor: '#CF4C05' } }}
          >
            Cambiar contraseña
          </Button>
        </Paper>
      </Box>

      {/* Modal para cambiar contraseña */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Cambiar contraseña</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Contraseña actual"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showCurrent ? "Ocultar contraseña" : "Mostrar contraseña"}
                      onClick={() => setShowCurrent(s => !s)}
                      edge="end"
                    >
                      {showCurrent ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Nueva contraseña"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
              helperText="Mínimo 8 caracteres (recomendado incluir mayúsculas, minúsculas, número y símbolo)."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showNew ? "Ocultar contraseña" : "Mostrar contraseña"}
                      onClick={() => setShowNew(s => !s)}
                      edge="end"
                    >
                      {showNew ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Confirmar nueva contraseña"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
              error={!!formError && formError.toLowerCase().includes("confirm")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}
                      onClick={() => setShowConfirm(s => !s)}
                      edge="end"
                    >
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {formError && (
              <Alert severity="error">{formError}</Alert>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseModal} disabled={loading}>Cancelar</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar de feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnack(s => ({ ...s, open: false }))} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Container, TextField, Button, Typography, Paper, Grid, Alert } from '@mui/material';
import { useAuth } from "../Context/AuthContext";

export default function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setLoading(true);
    try {
      await login(usuario, password); // Guarda { userId, nombre, usuarioAdmin } en Context y sessionStorage

      // Soporte para returnUrl (opcional)
      const returnUrl = params.get("returnUrl");
      
        navigate("/Inicio"); // o "/dashboard"
      
    } catch (err) {
      setLocalError("Credenciales inválidas o error de servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={4} sx={{ width: '100%' }}>
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* tu imagen */}
          <Box component="img" src="/LogoAfigoNaranja.PNG" alt="AFIGO Logo" sx={{ width: '100%', maxWidth: 500, borderRadius: 2 }} />
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Bienvenido</Typography>
              <Typography variant="h6" sx={{ color: '#666' }}>Inicio de Sesión</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {localError && <Alert severity="error">{localError}</Alert>}

              <TextField
                fullWidth
                label="Usuario o Correo"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                autoComplete="username"
              />
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                variant="contained"
                sx={{ backgroundColor: '#FF5A00', color: 'white', py: 1.5, fontWeight: 'bold', mt: 2, '&:hover': { backgroundColor: '#CF4C05' } }}
              >
                {loading ? "Ingresando..." : "Iniciar Sesión"}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
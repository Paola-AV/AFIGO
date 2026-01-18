

import { Box, Container, TextField, Button, Typography, Paper, Grid } from '@mui/material';

export default function LoginPage() {
    return (
        <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Grid container spacing={4} sx={{ width: '100%' }}>
                {/* Imagen */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        src="/LogoAfigoNaranja.PNG"
                        alt="AFIGO Logo"
                        sx={{ width: '100%', maxWidth: '500px', borderRadius: 2 }}
                    />
                </Grid>

                {/* Formulario */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: '400px' }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Bienvenido
                            </Typography>
                            <Typography variant="h6" component="h2" sx={{ color: '#666' }}>
                                Inicio de Sesión
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Usuario"
                                variant="outlined"
                                placeholder="Ingrese su usuario"
                            />
                            <TextField
                                fullWidth
                                label="Contraseña"
                                type="password"
                                variant="outlined"
                                placeholder="Ingrese su contraseña"
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: '#FF5A00',
                                    color: 'white',
                                    padding: '12px',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    marginTop: 2,
                                    '&:hover': { backgroundColor: '#CF4C05' }
                                }}
                            >
                                Iniciar Sesión
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
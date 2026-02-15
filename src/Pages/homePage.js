import { useNavigate } from "react-router-dom";
import { Box, Container, Button } from '@mui/material';

export default function HomePage() {
    return (
        <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>

            <Container maxWidth="lg" sx={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    src="/LogoAfigoNaranja.PNG"
                    alt="Logo AFIGO"
                    style={{ maxWidth: '40%', height: 'auto' }}
                />
            </Container>
        </Box>
    );
}

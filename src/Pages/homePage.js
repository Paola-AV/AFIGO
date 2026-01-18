import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { Box, Container, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function HomePage() {
    const navigate = useNavigate();

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

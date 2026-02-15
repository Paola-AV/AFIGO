import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import AdminVentas from "../Components/adminVentas";
import { Nav } from "../Components/Nav";

export default function VentasPage() {
    const navigate = useNavigate();

    return (
        <>
            <Nav></Nav>
            <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>

                <AdminVentas></AdminVentas>
            </Box>
        </>
    );
}

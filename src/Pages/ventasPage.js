import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import AdminVentas from "../Components/adminVentas";

export default function VentasPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>

            <AdminVentas></AdminVentas>
        </Box>
    );
}

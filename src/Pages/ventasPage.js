import { useNavigate } from "react-router-dom";
import { Box } from '@mui/material';
import AdminVentas from "../Components/adminVentas";
import UserVentas from "../Components/userVentas";
import { Nav } from "../Components/Nav";
import { useAuth } from "../Context/AuthContext"

export default function VentasPage() {
    const navigate = useNavigate();
    const { user,  isAdmin,  } = useAuth();

    return (
        <>
            <Nav></Nav>
            <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>

                {isAdmin ? <AdminVentas></AdminVentas> : <UserVentas></UserVentas>}
            </Box>
        </>
    );
}

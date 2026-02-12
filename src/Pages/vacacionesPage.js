import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { Box, Container, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AdminPeticionVacaciones from "../Components/adminPeticionVacaciones";
import UserPeticionVacaciones from "../Components/userPeticionVacaciones";

export default function VacacionesPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>

            {/*<AdminPeticionVacaciones></AdminPeticionVacaciones>*/}

            <UserPeticionVacaciones></UserPeticionVacaciones>
        </Box>
    );
}

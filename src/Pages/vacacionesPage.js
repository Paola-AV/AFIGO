
import { Box } from '@mui/material';
import UserPeticionVacaciones from "../Components/userPeticionVacaciones";
import AdminPeticionVacaciones from "../Components/adminPeticionVacaciones";
import { Nav } from '../Components/Nav';
import { useAuth } from "../Context/AuthContext"

export default function VacacionesPage() {
    const { user,  isAdmin,  } = useAuth();
    return (
        <>
            <Nav></Nav>
            <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>
                {isAdmin ? <AdminPeticionVacaciones></AdminPeticionVacaciones> : <UserPeticionVacaciones user={user}></UserPeticionVacaciones>}

            </Box>
        </>
    );
}

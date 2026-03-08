
import { Box } from '@mui/material';
import UserPeticionVacaciones from "../Components/userPeticionVacaciones";
import AdminPeticionVacaciones from "../Components/adminPeticionVacaciones";
import { Nav } from '../Components/Nav';
import { useAuth } from "../Context/AuthContext"
import { Client } from "../Util/client";

export default function SyncPage() {
    const { user,  isAdmin,  } = useAuth();
    return (
        <>
            <Nav></Nav>
            <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>
                {isAdmin ? <AdminPeticionVacaciones  user={user}></AdminPeticionVacaciones> : <UserPeticionVacaciones user={user}></UserPeticionVacaciones>}

            </Box>
        </>
    );
}

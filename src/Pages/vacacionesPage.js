
import { Box} from '@mui/material';
import UserPeticionVacaciones from "../Components/userPeticionVacaciones";

export default function VacacionesPage() {

    return (
        <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>

            {/*<AdminPeticionVacaciones></AdminPeticionVacaciones>*/}

            <UserPeticionVacaciones></UserPeticionVacaciones>
        </Box>
    );
}

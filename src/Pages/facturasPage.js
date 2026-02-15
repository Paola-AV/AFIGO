
import { Box } from '@mui/material';
import AdminFacturas from "../Components/adminFacturas";

export default function FacturasPage() {

    return (
        <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>

            <AdminFacturas></AdminFacturas>
        </Box>
    );
}

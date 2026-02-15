
import { Box } from '@mui/material';
import AdminFacturas from "../Components/adminFacturas";
import { Nav } from '../Components/Nav';

export default function FacturasPage() {

    return (
        <><Nav></Nav>
        <Box sx={{ display: 'flex', width: '100%', height: '90vh' }}>

            <AdminFacturas></AdminFacturas>
        </Box></>
    );
}

import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import { FiSettings } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Sidebar from './Sidebar';

export function Nav(){
	return (
		<AppBar position="static" sx={{ backgroundColor: '#505254' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: 0, height:'100%' }}>
				
        <Box sx={{ display: 'flex'}}>
          <Sidebar/>
        </Box>

				<Box sx={{ display: 'flex'}}>
          <IconButton color="inherit" sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
						<FaRegUserCircle style={{ fontSize: '24px' }} />
					</IconButton>
				</Box>

			</Toolbar>
		</AppBar>
	);
}


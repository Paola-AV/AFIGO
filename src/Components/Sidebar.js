import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { label: 'Inicio', icon: <HomeIcon />, path: '/Inicio' },
    { label: 'Cotizaciones', icon: <RequestQuoteIcon />, path: '/Cotizacion' },
    { label: 'Cuentas Por Pagar', icon: <PaymentIcon />, path: '/cuentas-por-pagar' },
    { label: 'Facturas', icon: <ReceiptIcon />, path: '/facturas' },
    { label: 'Gastos', icon: <AttachMoneyIcon />, path: '/gastos' },
    { label: 'Inventario', icon: <InventoryIcon />, path: '/inventario' },
    { label: 'Pedidos', icon: <LocalShippingIcon />, path: '/Pedidos' },
    { label: 'Usuarios', icon: <AccountCircleIcon />, path: '/Usuarios' },
    { label: 'Vacaciones', icon: <EventNoteIcon />, path: '/vacaciones' },
    { label: 'Ventas', icon: <PointOfSaleIcon />, path: '/Ventas' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    toggleDrawer(false)();
  };

  const DrawerList = (
    <Box sx={{ width: 280, backgroundColor: '#505254', height: '100%', display: 'flex', flexDirection: 'column' }} role="presentation">
      <Box sx={{ p: 2, backgroundColor: '#505254', color: 'white' }}>
        <h3 style={{ margin: 0 }}>AFIGO</h3>
      </Box>
      
      <List sx={{ flex: 1, backgroundColor: '#505254' }}>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton 
              onClick={() => handleNavigation(item.path)}
              sx={{ 
                backgroundColor: '#505254',
                color: 'white',
                '&:hover': { backgroundColor: '#3d3f40' }
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.label}
                sx={{ '& .MuiTypography-root': { fontWeight: 500, color: 'white' } }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ backgroundColor: '#3d3f40' }} />

      <List sx={{ backgroundColor: '#505254' }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={() => {
              navigate('/');
              toggleDrawer(false)();
            }}
            sx={{ 
              backgroundColor: '#505254',
              color: 'white',
              '&:hover': { backgroundColor: '#3d3f40' }
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Cerrar Sesión"
              sx={{ '& .MuiTypography-root': { fontWeight: 500, color: 'white' } }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} sx={{ color: 'white' }}>
        <MenuIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}


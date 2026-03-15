import React, { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress, Chip } from '@mui/material';
import { Nav } from '../Components/Nav';
import { useAuth } from "../Context/AuthContext";
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz } from "ag-grid-community";
import { Client } from "../Util/client";

const syncButtons = [
  { label: "Ventas", handler: "syncVentas" },
  { label: "Proveedores", handler: "syncProveedor" },
  { label: "Facturas y Cuentas", handler: "syncCuentas" },
  { label: "Inventario", handler: "syncInventario"},
  { label: "Productos", handler: "syncProducto" },
  { label: "Gastos", handler: "syncGastos" },
];

export default function SyncPage() {
  const { user, isAdmin } = useAuth();
  const [rowData, setRowData] = useState([]);
  const [loadingMap, setLoadingMap] = useState({});
  const [successMap, setSuccessMap] = useState({});

  const fetchStatus = () => {
    Client.getSyncStatus()
      .then(data => setRowData(data))
      .catch(err => console.error("Error obteniendo estado sync:", err));
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSync = (handlerName, label) => {
    setLoadingMap(prev => ({ ...prev, [label]: true }));
    setSuccessMap(prev => ({ ...prev, [label]: false }));

    Client[handlerName]()
      .then(() => {
        setSuccessMap(prev => ({ ...prev, [label]: true }));
        fetchStatus();
        setTimeout(() => setSuccessMap(prev => ({ ...prev, [label]: false })), 3000);
      })
      .catch(err => console.error(`Error en ${handlerName}:`, err))
      .finally(() => setLoadingMap(prev => ({ ...prev, [label]: false })));
  };

  const colDefs = [
    { headerName: "Tipo", field: "tipo", filter: true,valueFormatter: params => {
    if (!params.value) return '';
    const val = params.value.toLowerCase();
    return val.charAt(0).toUpperCase() + val.slice(1);
  } },
    { headerName: "Mensaje", field: "mensaje", filter: true },
    {
      headerName: "Última Fecha", field: "ultimaFecha", filter: true,
      valueFormatter: params => {
        if (!params.value) return '';
        const raw = params.value.endsWith('Z') ? params.value : params.value + 'Z';
        return new Date(raw).toLocaleString(navigator.language, {
          day: '2-digit', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit', hour12: true,
        });
      }
    },
  ];

  const defaultColDef = {
    editable: false, sortable: true, flex: 1,
    minWidth: 100, filter: true,
    filterParams: { buttons: ['clear'] }
  };

  return (
    <>
      <Nav />

      <Box sx={{px: { xs: 2, sm: 4 },mt: 4,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
        <Box sx={{ width: '100%', maxWidth: 900, height: 430 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
            theme={themeQuartz}
            domLayout='normal'
          />
        </Box>
      </Box>

      <Box sx={{mt: 5,mb: 6,px: { xs: 2, sm: 4 },display: 'flex',flexDirection: 'column',alignItems: 'center',gap: 2,}}>
        <Typography variant="h6" fontWeight={600} color="text.secondary" gutterBottom>
          Sincronizar datos
        </Typography>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 1.5, sm: 2 },
          width: '100%',
          maxWidth: 700,
        }}>
          {syncButtons.map(({ label, handler, icon }) => {
            const isLoading = loadingMap[label];
            const isDone = successMap[label];

            return (
              <Button
                key={label}
                variant="contained"
                onClick={() => handleSync(handler, label)}
                disabled={isLoading}
                startIcon={
                  isLoading
                    ? <CircularProgress size={16} sx={{ color: 'white' }} />
                    : <span style={{ fontSize: 16 }}>{icon}</span>
                }
                sx={{
                  backgroundColor: isDone ? '#2e7d32' : '#FF5A00',
                  '&:hover': {
                    backgroundColor: isDone ? '#1b5e20' : '#CF4C05',
                  },
                  '&:disabled': {
                    backgroundColor: '#FF5A0099',
                    color: 'white',
                  },
                  borderRadius: 2,
                  py: { xs: 1.2, sm: 1.5 },
                  px: { xs: 1.5, sm: 2.5 },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  fontWeight: 600,
                  textTransform: 'none',
                  transition: 'background-color 0.3s ease',
                  whiteSpace: 'nowrap',
                  width: '100%',
                }}
              >
                {isLoading ? 'Sincronizando...' : isDone ? '¡Listo!' : label}
              </Button>
            );
          })}
        </Box>

      </Box>
    </>
  );
}
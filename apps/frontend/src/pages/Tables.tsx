import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CancelIcon from '@mui/icons-material/Cancel';
import ListIcon from '@mui/icons-material/ListAlt';

const tables = [
  { id: 1, name: 'Mesa 1', status: 'available', capacity: 4, time: null },
  { id: 2, name: 'Mesa 2', status: 'occupied', capacity: 2, time: '12:30' },
  { id: 3, name: 'Mesa 3', status: 'occupied', capacity: 6, time: '13:15' },
  { id: 4, name: 'Mesa 4', status: 'reserved', capacity: 4, time: '14:00' },
  { id: 5, name: 'Mesa 5', status: 'occupied', capacity: 8, time: '12:45' },
  { id: 6, name: 'Mesa 6', status: 'available', capacity: 2, time: null },
  { id: 7, name: 'Mesa 7', status: 'available', capacity: 4, time: null },
  { id: 8, name: 'Mesa 8', status: 'occupied', capacity: 4, time: '13:30' },
  { id: 9, name: 'Mesa 9', status: 'reserved', capacity: 6, time: '15:00' },
  { id: 10, name: 'Mesa 10', status: 'available', capacity: 2, time: null },
  { id: 11, name: 'Mesa 11', status: 'available', capacity: 4, time: null },
  { id: 12, name: 'Mesa 12', status: 'occupied', capacity: 8, time: '13:00' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'success';
    case 'occupied':
      return 'error';
    case 'reserved':
      return 'warning';
    default:
      return 'default';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'available':
      return 'Disponible';
    case 'occupied':
      return 'Ocupada';
    case 'reserved':
      return 'Reservada';
    default:
      return status;
  }
};

export const Tables: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  

  const filteredTables = tables.filter((table) => {
    const matchesSearch = table.name.toLowerCase().includes(searchValue.toLowerCase());
    const matchesFilter = filterStatus === 'all' || table.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box p={2}>
      {/* Encabezado */}
      <Box mb={4} display="flex" flexDirection="column" gap={2}>
        <Typography variant="h5" fontWeight={600}>
          Gestión de Mesas
        </Typography>

        <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Buscar mesa..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select
              value={filterStatus}
              label="Estado"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">Todos</MenuItem>
              <MenuItem value="available">Disponible</MenuItem>
              <MenuItem value="occupied">Ocupada</MenuItem>
              <MenuItem value="reserved">Reservada</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Tarjetas de mesas */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent={{ xs: 'center', md: 'flex-start' }}
      >
        {filteredTables.map((table) => (
          <Box key={table.id} flex="1 1 260px" maxWidth="300px">
            <Card elevation={3} sx={{ borderRadius: 3 }}>
              <CardHeader
                title={
                  <Typography fontWeight={600} variant="h6">
                    {table.name}
                  </Typography>
                }
                action={
                  <Chip
                    label={getStatusText(table.status)}
                    color={getStatusColor(table.status)}
                    size="small"
                  />
                }
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Capacidad: {table.capacity} personas
                </Typography>
                {table.time && (
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Desde: {table.time}
                  </Typography>
                )}

                <Stack spacing={1} mt={2}>
                  {table.status === 'available' && (
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<AddIcon />}
                      sx={{ textTransform: 'none' }}
                    >
                      Nuevo Pedido
                    </Button>
                  )}
                  {table.status === 'occupied' && (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        startIcon={<ListIcon />}
                        sx={{ textTransform: 'none' }}
                      >
                        Ver Pedido
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        startIcon={<ReceiptIcon />}
                        sx={{ textTransform: 'none' }}
                      >
                        Facturar
                      </Button>
                    </>
                  )}
                  {table.status === 'reserved' && (
                    <>
                      <Button
                        variant="outlined"
                        color="warning"
                        fullWidth
                        startIcon={<CalendarTodayIcon />}
                        sx={{ textTransform: 'none' }}
                      >
                        Ver Reserva
                      </Button>
                      <Box display="flex" justifyContent="center">
                        <IconButton color="error">
                          <CancelIcon />
                        </IconButton>
                      </Box>
                    </>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Tables;
// src/pages/Orders.tsx
import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { Search, Visibility, Edit, Delete } from '@mui/icons-material';

const orders = [
  { id: "ORD-001", table: "Mesa 5", items: 4, total: "$124.50", status: "completed", time: "12:30" },
  { id: "ORD-002", table: "Mesa 8", items: 3, total: "$78.25", status: "in-progress", time: "12:45" },
  { id: "ORD-003", table: "Mesa 3", items: 5, total: "$96.00", status: "pending", time: "13:05" },
  { id: "ORD-004", table: "Mesa 12", items: 6, total: "$145.75", status: "completed", time: "13:15" },
  { id: "ORD-005", table: "Mesa 2", items: 2, total: "$42.00", status: "in-progress", time: "13:20" },
  { id: "ORD-006", table: "Mesa 7", items: 4, total: "$87.50", status: "pending", time: "13:30" },
  { id: "ORD-007", table: "Mesa 10", items: 3, total: "$63.25", status: "completed", time: "13:45" },
  { id: "ORD-008", table: "Mesa 1", items: 5, total: "$112.00", status: "in-progress", time: "14:00" },
];

const getStatusChip = (status: string) => {
  switch (status) {
    case 'completed':
      return <Chip label="Completado" color="success" size="small" />;
    case 'in-progress':
      return <Chip label="En Progreso" color="warning" size="small" />;
    case 'pending':
      return <Chip label="Pendiente" color="default" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

const Orders: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.table.toLowerCase().includes(searchValue.toLowerCase());

    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {/* Título */}
      <Typography variant="h4" fontWeight="bold">
        Pedidos
      </Typography>

      {/* Filtros debajo del título */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} maxWidth={600}>
        <TextField
          variant="outlined"
          placeholder="Buscar pedido..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />
          }}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Estado</InputLabel>
          <Select
            value={filterStatus}
            label="Estado"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value="pending">Pendiente</MenuItem>
            <MenuItem value="in-progress">En Progreso</MenuItem>
            <MenuItem value="completed">Completado</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Tabla de pedidos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID PEDIDO</TableCell>
              <TableCell>MESA</TableCell>
              <TableCell>ITEMS</TableCell>
              <TableCell>HORA</TableCell>
              <TableCell>TOTAL</TableCell>
              <TableCell>ESTADO</TableCell>
              <TableCell>ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.table}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>{getStatusChip(order.status)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <IconButton color="primary"><Visibility fontSize="small" /></IconButton>
                    <IconButton color="warning"><Edit fontSize="small" /></IconButton>
                    <IconButton color="error"><Delete fontSize="small" /></IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;

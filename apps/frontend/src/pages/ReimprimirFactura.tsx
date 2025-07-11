import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import dayjs, { Dayjs } from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";

const ReimprimirFactura: React.FC = () => {
  const [periodFilter, setPeriodFilter] = useState("Día");
  const [showDateRange, setShowDateRange] = useState(false);
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [searchName, setSearchName] = useState("");

  const fakeResults = [
    { id: "FAC-001", cliente: "Juan Pérez", fecha: "2025-06-05", total: 35.5 },
    { id: "FAC-002", cliente: "Carlos Ruiz", fecha: "2025-06-11", total: 22.0 },
    { id: "FAC-004", cliente: "Laura Gómez", fecha: "2025-06-13", total: 12.9 },
    { id: "FAC-005", cliente: "Laura Gómez", fecha: "2025-06-15", total: 12.9 },
    { id: "FAC-006", cliente: "Carlos Ruiz", fecha: "2025-07-01", total: 22.0 },
  ];

  const handlePrint = (id: string) => {
    console.log("Reimprimiendo factura:", id);
  };

  // Función de filtrado por período
  const isWithinPeriod = (fecha: string) => {
    const today = dayjs();
    const facturaFecha = dayjs(fecha);

    switch (periodFilter) {
      case "Día":
        return facturaFecha.isSame(today, "day");
      case "Semana":
        return facturaFecha.isSame(today, "week");
      case "Mes":
        return facturaFecha.isSame(today, "month");
      default:
        return true;
    }
  };

  // Función de filtrado por rango personalizado
  const isWithinRange = (fecha: string) => {
    if (!dateRange[0] || !dateRange[1]) return true;
    const facturaFecha = dayjs(fecha);
    return (
      facturaFecha.isAfter(dateRange[0].subtract(1, "day")) &&
      facturaFecha.isBefore(dateRange[1].add(1, "day"))
    );
  };

  const filteredResults = fakeResults.filter(
    (factura) =>
      isWithinPeriod(factura.fecha) &&
      isWithinRange(factura.fecha) &&
      factura.cliente.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <Box p={3}>
      <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
        Reimprimir Factura
      </Typography>

      {/* Filtros arriba */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        flexWrap="wrap"
        gap={2}
        mb={3}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Filtro por periodo */}
        <TextField
          select
          label="Periodo"
          value={periodFilter}
          onChange={(e) => setPeriodFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          {["Día", "Semana", "Mes"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Botón para rango personalizado */}
        <Button variant="outlined" onClick={() => setShowDateRange(!showDateRange)}>
          {showDateRange ? "Ocultar rango" : "Elegir rango de fecha"}
        </Button>

        {/* Buscador por nombre */}
        <TextField
          label="Buscar por nombre"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Calendario de rango de fechas */}
      {showDateRange && (
        <Box mb={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangeCalendar
              value={dateRange}
              onChange={(newRange) => setDateRange(newRange)}
            />
          </LocalizationProvider>
        </Box>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* Resultados */}
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={2}>
        {filteredResults.map((factura) => (
          <Card key={factura.id} elevation={3}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={600}>
                {factura.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cliente: {factura.cliente}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fecha: {factura.fecha}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                Total: ${factura.total.toFixed(2)}
              </Typography>
              <Box mt={2} textAlign="right">
                <IconButton color="primary" onClick={() => handlePrint(factura.id)}>
                  <PrintIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ReimprimirFactura;
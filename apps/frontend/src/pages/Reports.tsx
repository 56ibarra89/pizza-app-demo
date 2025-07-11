import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";
import React from "react";
import TopSellingProducts from "../components/reports/TopSellingProducts";
import SalesByCategory from "../components/reports/SalesByCategory";
import ReportCard from "../components/reports/ReportCard";
import { useSalesContext } from "../context/SalesContext";

const timeRanges = [
  { key: "day", label: "Hoy" },
  { key: "week", label: "Esta Semana" },
  { key: "month", label: "Este Mes" },
  { key: "year", label: "Este Año" },
];

const Reports = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRange, setSelectedRange] = React.useState("week");

  const { sales } = useSalesContext();

  const totalVentas = sales.reduce((sum, item) => sum + item.price, 0);
  const pedidosTotales = sales.length;
  const ticketPromedio = pedidosTotales > 0 ? totalVentas / pedidosTotales : 0;
  const productosVendidos = pedidosTotales;

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (range?: string) => {
    if (range) setSelectedRange(range);
    setAnchorEl(null);
  };

  const getTimeRangeLabel = () => {
    return timeRanges.find((item) => item.key === selectedRange)?.label ?? "";
  };

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {/* Encabezado */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <Typography variant="h5" fontWeight={600}>
          Reportes
        </Typography>

        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            endIcon={<ArrowDropDownIcon />}
            onClick={handleMenuClick}
          >
            {getTimeRangeLabel()}
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenuClose()}>
            {timeRanges.map((range) => (
              <MenuItem key={range.key} onClick={() => handleMenuClose(range.key)}>
                {range.label}
              </MenuItem>
            ))}
          </Menu>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Exportar
          </Button>
        </Box>
      </Box>

      {/* Métricas dinámicas */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        <ReportCard
          title="Ventas Totales"
          value={`$${totalVentas.toFixed(2)}`}
          change="+0%"
          Icon={AttachMoneyIcon}
        />
        <ReportCard
          title="Pedidos Totales"
          value={pedidosTotales.toString()}
          change="+0%"
          Icon={ShoppingBagIcon}
        />
        <ReportCard
          title="Ticket Promedio"
          value={`$${ticketPromedio.toFixed(2)}`}
          change="+0%"
          Icon={ReceiptIcon}
        />
        <ReportCard
          title="Productos Vendidos"
          value={productosVendidos.toString()}
          change="+0%"
          Icon={InventoryIcon}
        />
      </Box>

      {/* Gráficos */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box sx={{ flexBasis: { xs: "100%", md: "48%" } }}>
          <SalesByCategory />
        </Box>
        <Box sx={{ flexBasis: { xs: "100%", md: "48%" } }}>
          <TopSellingProducts />
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
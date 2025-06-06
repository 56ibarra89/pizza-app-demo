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

const timeRanges = [
  { key: "day", label: "Hoy" },
  { key: "week", label: "Esta Semana" },
  { key: "month", label: "Este Mes" },
  { key: "year", label: "Este Año" },
];

const Reports = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRange, setSelectedRange] = React.useState("week");

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

      {/* Métricas */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        <ReportCard
          title="Ventas Totales"
          value="$12,540.00"
          change="+15.3%"
          Icon={AttachMoneyIcon}
        />
        <ReportCard
          title="Pedidos Totales"
          value="245"
          change="+5.2%"
          Icon={ShoppingBagIcon}
        />
        <ReportCard
          title="Ticket Promedio"
          value="$51.18"
          change="+2.3%"
          Icon={ReceiptIcon}
        />
        <ReportCard
          title="Productos Vendidos"
          value="1,245"
          change="+8.7%"
          Icon={InventoryIcon}
        />
      </Box>

      {/* Sección inferior */}
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
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { PointOfSale, Lock, History } from "@mui/icons-material";

const AdminCaja = () => {
  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Administración de Caja
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap">
        <Card sx={{ width: 260, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <PointOfSale color="info" />
              <Typography fontWeight="bold">Apertura / Cierre</Typography>
            </Box>
            <Typography variant="body2" mb={2}>
              Registrar la apertura o cierre de caja con su respectivo monto.
            </Typography>
            <Button fullWidth variant="outlined" color="info">
              Ir a caja
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ width: 260, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Lock color="error" />
              <Typography fontWeight="bold">Control de Acceso</Typography>
            </Box>
            <Typography variant="body2" mb={2}>
              Establece quién puede acceder a caja y cuándo.
            </Typography>
            <Button fullWidth variant="outlined" color="error">
              Configurar
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ width: 260, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <History color="warning" />
              <Typography fontWeight="bold">Historial de Caja</Typography>
            </Box>
            <Typography variant="body2" mb={2}>
              Revisa los movimientos realizados en caja.
            </Typography>
            <Button fullWidth variant="outlined" color="warning">
              Ver historial
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminCaja;
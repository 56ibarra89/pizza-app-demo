import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { Person, Group, Settings } from "@mui/icons-material";

const Admin = () => {
  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Panel de Administración
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap">
        <Card sx={{ width: 260, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Person color="primary" />
              <Typography fontWeight="bold">Gestión de Usuarios</Typography>
            </Box>
            <Typography variant="body2" mb={2}>
              Crear, editar o eliminar cuentas de usuario.
            </Typography>
            <Button fullWidth variant="outlined" color="primary">
              Administrar
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ width: 260, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Group color="success" />
              <Typography fontWeight="bold">Roles del Sistema</Typography>
            </Box>
            <Typography variant="body2" mb={2}>
              Gestiona los permisos y accesos de los usuarios.(en un futuro)
            </Typography>
            <Button fullWidth variant="outlined" color="success">
              Configurar
            </Button>
          </CardContent>
        </Card>

        <Card sx={{ width: 260, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Settings color="secondary" />
              <Typography fontWeight="bold">Configuración General</Typography>
            </Box>
            <Typography variant="body2" mb={2}>
              No se que poner aqui.
            </Typography>
            <Button fullWidth variant="outlined" color="secondary">
              Ajustes
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Admin;
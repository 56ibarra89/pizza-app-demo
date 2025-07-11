// src/pages/Users.tsx
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Stack,
} from "@mui/material";
import { Edit, Delete, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type UserStatus = "Activo" | "Inactivo";

const users: { name: string; role: string; status: UserStatus }[] = [
  { name: "Tony Reichert", role: "Administrador", status: "Activo" },
  { name: "Zoey Lang", role: "Cajero", status: "Inactivo" },
  { name: "Jane Fisher", role: "Mesero", status: "Activo" },
];

const statusColor: Record<UserStatus, "success" | "error"> = {
  Activo: "success",
  Inactivo: "error",
};

const Users = () => {
  const navigate = useNavigate();

  return (
    <Box p={4} maxWidth={900} mx="auto">
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <Box
          px={4}
          pt={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Sistema de Facturación de Pizzería
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gestione sus operaciones de facturación y caja
            </Typography>
          </Box>

          <Button variant="contained" color="primary">
            + Agregar Usuario
          </Button>
        </Box>

        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Gestión de Cuentas
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NOMBRE</TableCell>
                <TableCell>ROL</TableCell>
                <TableCell>ESTADO</TableCell>
                <TableCell align="center">ACCIONES</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Person color="action" />
                      <Typography>{user.name}</Typography>
                    </Stack>
                  </TableCell>

                  <TableCell>{user.role}</TableCell>

                  <TableCell>
                    <Chip
                      label={user.status}
                      color={statusColor[user.status] as "success" | "error"}
                      size="small"
                      variant="filled"
                      sx={{ fontWeight: "bold" }}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <IconButton>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton>
                      <Delete color="error" fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            variant="text"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={() => navigate("/home")}
            startIcon={<span style={{ fontSize: "1.2rem" }}>←</span>}
          >
            Volver al Menú Principal
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Users;
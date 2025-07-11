// src/pages/ChangePassword.tsx
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Las nuevas contraseñas no coinciden.");
      return;
    }

    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setSuccess(true);
    setError(null);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Box p={4} display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 400, width: "100%", p: 3, borderRadius: 4, boxShadow: 4 }}>
        <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
          Cambiar Clave
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mb={2}>
          Actualice su contraseña de acceso
        </Typography>

        <CardContent>
          <Stack spacing={2}>
            {/* Contraseña actual */}
            <TextField
              label="Contraseña Actual"
              type={showCurrentPassword ? "text" : "password"}
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Ingrese su contraseña actual"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowCurrentPassword((prev) => !prev)} edge="end">
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Nueva contraseña */}
            <TextField
              label="Nueva Contraseña"
              type={showNewPassword ? "text" : "password"}
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Ingrese su nueva contraseña"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowNewPassword((prev) => !prev)} edge="end">
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {newPassword && (
              <FormHelperText sx={{ ml: 1 }} error={newPassword.length < 6}>
                {newPassword.length >= 6
                  ? "Contraseña válida ✔"
                  : "Debe tener al menos 6 caracteres"}
              </FormHelperText>
            )}

            {/* Confirmar nueva contraseña */}
            <TextField
              label="Confirmar Nueva Contraseña"
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme su nueva contraseña"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword((prev) => !prev)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <Button color="error" onClick={() => console.log("Cancelar")}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Cambiar Clave
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Mensaje de éxito */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccess(false)}>
          ¡Contraseña cambiada con éxito!
        </Alert>
      </Snackbar>

      {/* Mensaje de error */}
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChangePassword;
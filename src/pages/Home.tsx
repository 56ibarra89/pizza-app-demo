// /src/pages/Home.tsx
import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const goToFacturacion = () => {
    navigate('/facturacion');
  };
  const goToOrders = () => {
    navigate('/ordenes');
  };
  const goToTables = () => {
    navigate('/mesas');
  };
  const goToReports = () => {
    navigate('/reporte');
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Bienvenido a la Pizzería
      </Typography>
      <Typography variant="h6" component="p" sx={{ mb: 2 }}>
        Disfruta de nuestras deliciosas pizzas y lleva el control de tus compras aquí.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={goToFacturacion}
      >
        Ir a Facturación
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        onClick={goToOrders}
        sx={{ mt: 2 }}
      >
        Ver ordernes de mesa
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        onClick={goToTables}
        sx={{ mt: 2 }}
      >
        Ver Mesas
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        size="large"
        onClick={goToReports}
        sx={{ mt: 2 }}
      >
        Ver Reportes
      </Button>
      
    </Container>
  );
};

export default Home;
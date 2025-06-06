import React from 'react';
import { Container } from '@mui/material';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
      {/* Aquí puedes agregar un Navbar */}
      {children}
    </Container>
  );
};

export default MainLayout;

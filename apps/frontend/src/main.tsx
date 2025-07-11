import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/assets/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import App from './App'

// 👉 Importa el Provider
import { ProductProvider } from './context/ProductContext'
import { SalesProvider } from './context/SalesContext';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* 👉 Envuelve la app */}
        <ProductProvider>
          <SalesProvider>
            <App />
          </SalesProvider>
        </ProductProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
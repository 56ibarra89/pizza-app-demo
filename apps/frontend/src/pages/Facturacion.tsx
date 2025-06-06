import { Box, Typography, Button, Tabs, Tab, Divider } from "@mui/material";
import {
  LocalPizza,
  Fastfood,
  LunchDining,
  Restaurant,
  LocalDrink,
  Cake,
} from "@mui/icons-material";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import CartItem from "../components/CartItem";
import ExtrasDialog from "../components/ExtrasDialog";

const extras = ["Queso extra", "Pepperoni", "Jamón", "Bacon"];

const categories = [
  {
    label: "Pizzas",
    icon: <LocalPizza fontSize="large" />,
    extras: true,
    items: [
      { name: "Solo Queso", price: 8.99 },
      { name: "Especial To Go", price: 9.99 },
      { name: "Suprema", price: 10.99 },
      { name: "Especial de carne", price: 9.49 },
      { name: "Vegetariana", price: 11.49 },
      { name: "Hawaiana", price: 10.49 },
      { name: "Super hwawiana", price: 10.99 },
      { name: "Blanca", price: 9.99 },
      { name: "Trozo To Go", price: 9.99 },
    ],
  },
  {
    label: "Mexicanos",
    icon: <Fastfood fontSize="large" />,
    items: [
      { name: "Quesadillas", price: 6.99 },
      { name: "Nachos", price: 5.49 },
      { name: "Tacos", price: 7.25 },
    ],
  },
  {
    label: "Submarinos",
    icon: <LunchDining fontSize="large" />,
    items: [
      { name: "Clásico", price: 7.99 },
      { name: "Pollo BBQ", price: 8.49 },
    ],
  },
  {
    label: "Alitas",
    icon: <Restaurant fontSize="large" />,
    items: [
      { name: "Buffalo", price: 6.5 },
      { name: "BBQ", price: 6.75 },
    ],
  },
  {
    label: "Postres",
    icon: <Cake fontSize="large" />,
    items: [
      { name: "Brownie", price: 3.5 },
      { name: "Pie de limón", price: 4.25 },
    ],
  },
  {
    label: "Bebidas",
    icon: <LocalDrink fontSize="large" />,
    items: [
      { name: "Agua", price: 1.5 },
      { name: "Refresco", price: 2.0 },
    ],
  },
];

export const Facturacion = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openExtras, setOpenExtras] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  const handleAddToCart = (item: any, category: any) => {
    if (category.extras) setOpenExtras(true);

    setCart((prev) => [...prev, item]);
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box display="flex" height="100vh" overflow="hidden">
      {/* Tabs verticales */}
      <Box
        width="120px"
        bgcolor="#f0f0f0"
        borderRadius={2}
        p={1}
        sx={{
          overflowY: "auto",
          maxHeight: "100%",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: "4px",
          },
        }}
      >
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          sx={{ height: "100%" }}
        >
          {categories.map((cat, i) => (
            <Tab
              key={i}
              icon={cat.icon}
              label={cat.label}
              sx={{
                alignItems: "center",
                justifyContent: "center",
                textTransform: "none",
                minHeight: 100,
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Productos */}
      <Box
        flex={1}
        p={3}
        sx={{
          maxHeight: "100%", // Limita la altura total del área de productos
          overflowY: "auto", // Permite scroll si hay muchos productos
        }}
      >
        <Box display="flex" flexWrap="wrap" gap={2}>
          {categories[selectedTab].items.map((item, idx) => (
            <ProductCard
              key={idx}
              name={item.name}
              price={item.price}
              onClick={() => handleAddToCart(item, categories[selectedTab])}
            />
          ))}
        </Box>
      </Box>

      {/* Carrito */}
      <Box
        width="300px"
        p={2}
        bgcolor="#f9f9f9"
        borderRadius={2}
        display="flex"
        flexDirection="column"
        maxHeight="100%" // controla la altura máxima del carrito
        boxShadow={2}
      >
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Tu pedido
        </Typography>
        <Divider />

        {/* Lista scrollable */}
        <Box flex={1} overflow="auto" pr={1} my={1}>
          {cart.map((item, i) => (
            <CartItem
              key={i}
              name={item.name}
              price={item.price}
              onRemove={() => handleRemoveItem(i)}
            />
          ))}
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Total y botón sticky */}
        <Box position="sticky" bottom={0} bgcolor="#f9f9f9" pt={1}>
          <Typography fontWeight="bold" mb={1}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={cart.length === 0}
          >
            Finalizar compra
          </Button>
        </Box>
      </Box>

      {/* Modal de extras */}
      <ExtrasDialog
        open={openExtras}
        extras={extras}
        onClose={() => setOpenExtras(false)}
      />
    </Box>
  );
};

export default Facturacion;

// src/pages/Facturacion.tsx
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
import SelectSizeDialog from "../components/SelectSizeDialog";
import { useProductContext } from "../context/ProductContext";
import { Product, ProductPrice, ProductSize } from "../context/ProductContext";
import { useSalesContext } from "../context/SalesContext";
import { useNavigate } from "react-router-dom";
import FacturaPreviewDialog from "../context/FacturaPreviewDialog";

const iconMap: Record<string, JSX.Element> = {
  Pizzas: <LocalPizza fontSize="large" />,
  Mexicanos: <Fastfood fontSize="large" />,
  Submarinos: <LunchDining fontSize="large" />,
  Alitas: <Restaurant fontSize="large" />,
  Postres: <Cake fontSize="large" />,
  Bebidas: <LocalDrink fontSize="large" />,
};

const extras = ["Queso extra", "Pepperoni", "Jamón", "Bacon"];

export const Facturacion = () => {
  const { categories } = useProductContext();
  const [selectedTab, setSelectedTab] = useState(0);
  const [openExtras, setOpenExtras] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [cart, setCart] = useState<
    { name: string; price: number; size: ProductSize; quantity: number }[]
  >([]);

  const handleChangeQuantity = (index: number, quantity: number) => {
  setCart((prev: typeof cart) => {
    const updated = [...prev];
    updated[index] = {
      ...updated[index],
      quantity: Math.max(1, quantity), // evita cantidades menores a 1
    };
    return updated;
  });
};


  const [selectedProduct, setSelectedProduct] = useState<null | {
    name: string;
    prices: ProductPrice[];
  }>(null);

  const navigate = useNavigate();
  const { addSale } = useSalesContext();

  const handleAddToCartItem = (newItem: {
    name: string;
    price: number;
    size: ProductSize;
  }) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.name === newItem.name && item.size === newItem.size
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1 ,
        };
        return updated;
      }

      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const handleAddToCart = (item: Product) => {
    if (item?.prices?.length) {
      const isUniquePrice =
        item.prices.length === 1 && item.prices[0].size === "único";
      if (isUniquePrice) {
        handleAddToCartItem({
          name: item.name,
          price: item.prices[0].price,
          size: "único",
        });
      } else {
        const validPrices = item.prices.filter((p) =>
          ["familiar", "mediana", "personal"].includes(p.size)
        );
        setSelectedProduct({ name: item.name, prices: validPrices });
      }
    }
  };

  const handleSelectSize = (selected: {
    name: string;
    price: number;
    size: ProductSize;
  }) => {
    handleAddToCartItem(selected);
    addSale(selected);
    setSelectedProduct(null);
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => {
      const updated = [...prev];
      if (updated[index].quantity > 1) {
        updated[index].quantity -= 1;
        return updated;
      }
      return updated.filter((_, i) => i !== index);
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box display="flex" height="100vh" overflow="hidden">
      {/* Tabs de categorías */}
      <Box
        width="120px"
        bgcolor="#f0f0f0"
        borderRadius={2}
        p={1}
        sx={{
          overflowY: "auto",
          maxHeight: "100%",
          "&::-webkit-scrollbar": { width: "6px" },
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
              icon={iconMap[cat.label] ?? null}
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
      <Box flex={1} p={3} sx={{ maxHeight: "100%", overflowY: "auto" }}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {categories[selectedTab]?.items.map((item, idx) => (
            <ProductCard
              key={idx}
              name={item.name}
              price={item.prices?.[0]?.price || 0}
              onClick={() => handleAddToCart(item)}
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
        maxHeight="100%"
        boxShadow={2}
      >
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Tu pedido
        </Typography>
        <Divider />

        <Box flex={1} overflow="auto" pr={1} my={1}>
          {cart.map((item, i) => (
           <CartItem
  key={i}
  name={`${item.name} (${item.size})`}
  price={item.price}
  quantity={item.quantity}
  onAdd={() => handleAddToCartItem({
    name: item.name,
    price: item.price,
    size: item.size
  })}
  onRemove={() => handleRemoveItem(i)}
  onChangeQuantity={(qty) => handleChangeQuantity(i, qty)}
/>

          ))}
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box position="sticky" bottom={0} bgcolor="#f9f9f9" pt={1}>
          <Typography fontWeight="bold" mb={1}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={cart.length === 0}
            onClick={() => setPreviewOpen(true)}
          >
            Vista previa
          </Button>
        </Box>
      </Box>

      {/* Diálogos */}
      <ExtrasDialog
        open={openExtras}
        extras={extras}
        onClose={() => setOpenExtras(false)}
      />

      {selectedProduct && (
        <SelectSizeDialog
          open={!!selectedProduct}
          productName={selectedProduct.name}
          prices={selectedProduct.prices}
          onClose={() => setSelectedProduct(null)}
          onSelect={handleSelectSize}
        />
      )}

      {/* Vista previa de factura */}
      <FacturaPreviewDialog
        open={previewOpen}
        cart={cart}
        total={total}
        onClose={() => setPreviewOpen(false)}
        onConfirm={() => {
          cart.forEach((item) => addSale(item));
          setCart([]);
          setPreviewOpen(false);
          navigate("/home");
        }}
      />
    </Box>
  );
};

export default Facturacion;

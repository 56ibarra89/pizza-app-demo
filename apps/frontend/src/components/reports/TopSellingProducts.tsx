// src/components/reports/TopSellingProducts.tsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSalesContext } from "../../context/SalesContext";
import { useProductContext } from "../../context/ProductContext";

interface ProductSummary {
  name: string;
  category: string;
  units: number;
  amount: number;
}

const TopSellingProducts = () => {
  const { sales } = useSalesContext();
  const { categories } = useProductContext();

  // Relacionar productos vendidos con su categoría
  const grouped: Record<string, ProductSummary> = {};

  sales.forEach(({ name, price }) => {
    // Buscar la categoría correspondiente
    const found = categories.find((cat) =>
      cat.items.some((item) => item.name === name)
    );
    const categoryLabel = found?.label || "Sin categoría";

    const key = `${name}-${categoryLabel}`; // Clave única

    if (!grouped[key]) {
      grouped[key] = {
        name,
        category: categoryLabel,
        units: 0,
        amount: 0,
      };
    }

    grouped[key].units += 1;
    grouped[key].amount += price;
  });

  const sorted = Object.values(grouped)
    .sort((a, b) => b.units - a.units)
    .slice(0, 5); // Top 5

  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Productos Más Vendidos
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {sorted.map((product, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={index !== sorted.length - 1 ? 2 : 0}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar>
                <ShoppingCartIcon />
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>
              </Box>
            </Box>
            <Box textAlign="right">
              <Typography variant="body2">${product.amount.toFixed(2)}</Typography>
              <Typography variant="caption" color="text.secondary">
                {product.units} unidades
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default TopSellingProducts;
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Avatar,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const topProducts = [
  {
    name: "Pasta Carbonara",
    category: "Platos Principales",
    amount: "$1,631.25",
    units: 87,
  },
  {
    name: "Filete de Salmón",
    category: "Platos Principales",
    amount: "$1,560.00",
    units: 65,
  },
  {
    name: "Agua Mineral",
    category: "Bebidas",
    amount: "$420.00",
    units: 120,
  },
  {
    name: "Ensalada César",
    category: "Entrantes",
    amount: "$725.00",
    units: 58,
  },
  {
    name: "Tiramisú",
    category: "Postres",
    amount: "$393.75",
    units: 45,
  },
];

const TopSellingProducts = () => {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Productos Más Vendidos
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {topProducts.map((product, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={index !== topProducts.length - 1 ? 2 : 0}
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
              <Typography variant="body2">{product.amount}</Typography>
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
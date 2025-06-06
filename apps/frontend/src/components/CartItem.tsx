// src/components/CartItem.tsx
import { Box, IconButton, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

interface CartItemProps {
  name: string;
  price: number;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, price, onRemove }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={1}
    >
      <Typography>{name}</Typography>
      <Box display="flex" gap={1} alignItems="center">
        <Typography>${price.toFixed(2)}</Typography>
        <IconButton onClick={onRemove} size="small">
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
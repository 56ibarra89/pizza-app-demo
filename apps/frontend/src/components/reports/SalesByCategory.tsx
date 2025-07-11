// src/components/reports/SalesByCategory.tsx
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useProductContext } from "../../context/ProductContext";
import { useSalesContext } from "../../context/SalesContext";

const COLORS = ["#1976d2", "#2e7d32", "#fbc02d", "#7b1fa2", "#ff7043", "#26c6da"];

const SalesByCategory = () => {
  const { sales } = useSalesContext();
  const { categories } = useProductContext();

  const categoryMap: Record<string, string> = {};
  categories.forEach((cat) => {
    cat.items.forEach((item) => {
      categoryMap[item.name] = cat.label;
    });
  });

  const grouped: Record<string, number> = {};
  sales.forEach(({ name }) => {
    const category = categoryMap[name] || "Otros";
    grouped[category] = (grouped[category] || 0) + 1;
  });

  const data = Object.entries(grouped).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length],
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card sx={{ flex: 1, minHeight: 300 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Ventas por Categoría
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={45}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value} ventas`} />
            </PieChart>
          </ResponsiveContainer>

          <Box mt={2} width="100%">
            {data.map((item, idx) => (
              <Box
                key={idx}
                display="flex"
                justifyContent="space-between"
                px={1}
                py={0.5}
                sx={{
                  backgroundColor: `${item.color}20`,
                  borderRadius: 1,
                  mb: 0.5,
                }}
              >
                <Typography variant="body2" fontWeight={500}>
                  {item.name}
                </Typography>
                <Typography variant="body2">
                  {((item.value / total) * 100).toFixed(1)}%
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesByCategory;
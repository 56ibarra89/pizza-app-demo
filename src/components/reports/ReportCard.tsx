// src/components/reports/ReportCard.tsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import React from "react";

type ReportCardProps = {
  title: string;
  value: string;
  change: string;
  Icon: React.ElementType;
};

const ReportCard = ({ title, value, change, Icon }: ReportCardProps) => {
  return (
    <Card sx={{ minWidth: 250, flex: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h6">{value}</Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <TrendingUpIcon color="success" fontSize="small" />
              <Typography variant="body2" color="success.main" ml={0.5}>
                {change}
              </Typography>
            </Box>
          </Box>
          <IconButton sx={{ backgroundColor: "primary.light", color: "primary.main" }}>
            <Icon fontSize="medium" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
// src/components/reports/ReportCard.tsx
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
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
    <Card
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 250,
        borderRadius: 3,
        p: 2,
        backgroundColor: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: 500 }}
          >
            {title}
          </Typography>

          <Avatar
            sx={{
              bgcolor: "primary.light",
              width: 40,
              height: 40,
            }}
          >
            <Icon fontSize="small" />
          </Avatar>
        </Box>

        <Typography variant="h5" fontWeight="bold" mb={1}>
          {value}
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <TrendingUpIcon fontSize="small" color="success" />
          <Typography variant="body2" color="success.main">
            {change}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportCard;
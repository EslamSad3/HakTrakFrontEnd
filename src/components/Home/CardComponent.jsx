import React from "react";
import { Box, Card, Typography, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const CardComponent = ({ label, count, subCounts, path, icon, theme }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        cursor: "pointer",
        position: "relative",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        justifyContent: subCounts.length === 0 ? "center" : "flex-start",
        textAlign: subCounts.length === 0 ? "center" : "left",
      }}
      onClick={() => path && navigate(path)}
    >
      <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
        {icon}
        <Typography variant="h6" align="center" ml={1}>
          {label}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        color={theme.palette.secondary[200]}
        sx={{
          mt: subCounts.length === 0 ? 1 : 0,
        }}
      >
        {count}
      </Typography>
      {subCounts.length > 0 && (
        <Box mt={2} width="100%">
          {subCounts.map((subCount, index) => (
            <React.Fragment key={subCount.label}>
              {index > 0 && <Divider sx={{ my: 1 }} />}
              <Box display="flex" justifyContent="space-between" px={2}>
                <Box display="flex" alignItems="center">
                  {subCount.icon}
                  <Typography
                    variant="body2"
                    component={Link}
                    to={subCount.path}
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      ml: 1,
                    }}
                  >
                    {subCount.label}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color={theme.palette.secondary[200]}
                >
                  {subCount.count}
                </Typography>
              </Box>
            </React.Fragment>
          ))}
        </Box>
      )}
    </Card>
  );
};

export default CardComponent;

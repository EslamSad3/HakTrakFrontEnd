import React, { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Context } from "../../context";

export default function AtoBarChart() {
  const { atos } = useContext(Context);
  const theme = useTheme();

  // Group by `bu` property
  const buCounts = atos.reduce((acc, ato) => {
    acc[ato.bu] = (acc[ato.bu] || 0) + 1;
    return acc;
  }, {});


  const buData = Object.keys(buCounts).map((bu, index) => ({
    label: bu,
    value: buCounts[bu], // Correctly set the value to the count of the bu
  }));

  const buLabels = buData.map((item) => item.label);
  const buValues = buData.map((item) => item.value);

  return (
    <Box
      sx={{
        borderRadius: "0.55rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="h6" align="center" mb={1}>
        ATOs by Business Unit
      </Typography>
      <BarChart
        width={500}
        height={300}
        series={[
          {
            data: buValues,
            label: "ATOs",
            id: "atoId",
          },
        ]}
        xAxis={[
          {
            data: buLabels,
            scaleType: "band",
          },
        ]}
      />
    </Box>
  );
}

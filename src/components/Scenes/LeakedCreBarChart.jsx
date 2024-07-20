import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Context } from "../../context";

export default function LeakedCreBarChart() {
  const { leakedCredentials } = useContext(Context);

  if (!leakedCredentials || leakedCredentials.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No leaked credentials available
      </Typography>
    );
  }

  // Group by `bu` property
  const buCounts = leakedCredentials.reduce((acc, { bu }) => {
    acc[bu] = (acc[bu] || 0) + 1;
    return acc;
  }, {});

  const buData = Object.entries(buCounts).map(([bu, value]) => ({
    label: bu,
    value,
  }));

  const buLabels = buData.map(({ label }) => label);
  const buValues = buData.map(({ value }) => value);

  // Generate a list of colors
  const colors = [
    "#4caf50",
    "#2196f3",
    "#ff9800",

  ];

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
        Leaked Credentials by Business Unit
      </Typography>
      <BarChart
        width={500}
        height={300}
        series={buLabels.map((label, index) => ({
          data: [buValues[index]],
          label: label,
          id: `leakedCreId-${index}`,
          color: colors[index % colors.length], // Assign a color to each bar
        }))}
        xAxis={[
          {
            data: buLabels,
            scaleType: "band",
          },
        ]}
        yAxis={[
          {
            min: 0,
            tickCount: Math.max(...buValues) + 1, // Ensure there are enough ticks to cover the range
            tickFormat: (value) => value, // Ensure the ticks increment by 1
          },
        ]}
      />
    </Box>
  );
}

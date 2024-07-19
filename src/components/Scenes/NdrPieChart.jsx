import React, { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { pieArcLabelClasses, PieChart } from "@mui/x-charts/PieChart";
import { Context } from "../../context";

export default function NdrPieChart() {
  const { ndrs } = useContext(Context);
  const theme = useTheme();

  const severityOptions = ["low", "medium", "high", "critical"];
  const colors = ["#4caf50", "#ffeb3b", "#ff9800", "#f44336"]; // Custom colors for each severity level

  // Count the occurrences of each severity level
  const severityCounts = severityOptions.map((severity, index) => ({
    label: severity,
    value: ndrs.filter((ndr) => ndr.severity === severity).length,
    color: colors[index], // Assign corresponding color
  }));

  return (
    <>
      <Typography variant="h6" align="center" mb={1}>
        NDRs
      </Typography>
      <PieChart
        series={[
          {
            data: severityCounts.map((item, index) => ({
              id: index,
              value: item.value,
              label: `${item.label} (${item.value})`,
              color: item.color, // Set the color for each slice
              arcLabel: (item) => `${item.label} (${item.value})`,
              arcLabelMinAngle: 45,
            })),
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        width={400}
        height={200}
      />
    </>
  );
}

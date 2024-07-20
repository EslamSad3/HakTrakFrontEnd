import React, { useContext } from "react";
import { Box, Typography, useTheme, styled } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { Context } from "../../context";

// Styled text for center label
const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function ExdrPieChart() {
  const { edrXdrs } = useContext(Context);
  const theme = useTheme();

  const severityOptions = ["low", "medium", "high", "critical"];
  const colors = ["#4caf50", "#ffeb3b", "#ff9800", "#f44336"]; // Custom colors for each severity level

  // Count the occurrences of each severity level
  const severityCounts = severityOptions.map((severity, index) => ({
    label: severity,
    value: edrXdrs.filter((ndr) => ndr.severity === severity).length,
    color: colors[index], // Assign corresponding color
  }));

  const size = {
    width: 400,
    height: 200,
  };

  return (
    <>
      <PieChart
        series={[
          {
            data: severityCounts.map((item, index) => ({
              id: index,
              value: item.value,
              label: `${item.label} (${item.value})`,
              color: item.color, // Set the color for each slice
            })),
            innerRadius: 80,
          },
        ]}
        {...size}
      >
        <PieCenterLabel>EDR / XDR</PieCenterLabel>
      </PieChart>
    </>
  );
}

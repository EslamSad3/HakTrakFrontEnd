import React from "react";
import { useTheme, styled } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";

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

export default function ExdrPieChart({ edrXdrs }) {
  const theme = useTheme();

  const severityOptions = ["Low", "Medium", "High", "Critical"];
  const colors = ["#4caf50", "#ffeb3b", "#ff9800", "#f44336"]; // Custom colors for each severity level

  // Count the occurrences of each severity level
  const severityCounts = severityOptions.map((severity, index) => ({
    label: severity,
    value: edrXdrs.filter(
      (edrXdr) =>
        edrXdr.severity === severity.toLowerCase() &&
        edrXdr.status !== "resolved"
    ).length,
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

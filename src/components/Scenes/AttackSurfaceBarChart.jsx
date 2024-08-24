import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { BarChart } from "@mantine/charts";
import { Context } from "../../context";

// Function to generate a unique color

export const colors = [
  "#f3a",
  "#f93",
  "#3af",
  "#0f0",
  "#f0f",
  "#ff0",
  "#0ff",
  "#f00",
];
export default function AttackSurfaceBarChart({ attackSurfaces }) {

  // Group data by 'openPorts'
  const groupByOpenPorts = attackSurfaces.reduce((acc, surface) => {
    surface.openPorts.forEach((port) => {
      if (!acc[port]) {
        acc[port] = 0;
      }
      acc[port]++;
    });
    return acc;
  }, {});

  // Convert grouped data to the format expected by BarChart
  const chartData = Object.keys(groupByOpenPorts).map((port, index) => ({
    openPort: port,
    count: groupByOpenPorts[port],
    color: colors[index % colors.length], // Assign a unique color
  }));

  console.log(chartData, "chartData attack");

  return (
    <>
      <Typography variant="h6" align="center" mb={1}>
        Attack Surface by Open Ports
      </Typography>

      <BarChart
        h={300}
        data={chartData}
        dataKey="openPort"
        series={chartData.map((item) => ({
          name: "count",
          color: item.color,
        }))}
        tickLine="x"
        type="stacked"
      />
    </>
  );
}

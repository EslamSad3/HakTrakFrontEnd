import { BarChart } from "@mantine/charts";
import { useContext } from "react";
import { Context } from "../../context";
import { Box, Typography } from "@mui/material";

// Function to generate a unique color
const colors = [
  "#fc7978",
  "#ffafb0",
  "#35d0ba",
  "#eff669",
  "#f29f3d",
  "#cf3333",
  "#ff6464",
  "#5eb7b7",
  "#96d1c7",
];

export default function NdrBuBarChart({ ndrs }) {

  // Group data by 'bu'
  const groupByBu = ndrs.reduce((acc, ndr) => {
    (acc[ndr.bu] = acc[ndr.bu] || []).push(ndr);
    return acc;
  }, {});

  // Convert grouped data to the format expected by BarChart
  const chartData = Object.keys(groupByBu).map((bu, index) => ({
    bu,
    count: groupByBu[bu].length,
    color: colors[index % colors.length], // Assign a unique color
  }));

  return (
    <>
      <Typography variant="h6" align="center" mb={3}>
        NDR Detections by Business Unit
      </Typography>

      <BarChart
        h={300}
        data={chartData}
        dataKey="bu"
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

import { BarChart } from "@mantine/charts";
import { useContext } from "react";
import { Context } from "../../context";
import { Box, Typography } from "@mui/material";

// Function to generate a unique color
const colors = [
  "#f95959",
  "#f29f3d",
  "#cf3333",
  "#ff6464",
  "#5eb7b7",
  "#96d1c7",
  "#fc7978",
  "#ffafb0",
  "#35d0ba",
];

export default function ExdrBuBarChart() {
  const { edrXdrs } = useContext(Context);

  // Group data by 'bu'
  const groupByBu = edrXdrs.reduce((acc, edrXdr) => {
    (acc[edrXdr.bu] = acc[edrXdr.bu] || []).push(edrXdr);
    return acc;
  }, {});

  // Convert grouped data to the format expected by BarChart
  const chartData = Object.keys(groupByBu).map((bu, index) => ({
    bu,
    count: groupByBu[bu].length,
    color: colors[index % colors.length], // Assign a unique color
  }));

  console.log(chartData, "chartData");
  return (
    <>
      <Typography variant="h6" align="center" mb={3}>
        EDR / XDR by Business Unit
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

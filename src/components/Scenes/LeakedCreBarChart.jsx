import { BarChart } from "@mantine/charts";
import { useContext } from "react";
import { Context } from "../../context";
import { Box, Typography } from "@mui/material";

// Function to generate a unique color
const colors = [
  "#eff669",
  "#f29f3d",
  "#cf3333",
  "#ff6464",
  "#5eb7b7",
  "#96d1c7",
  "#fc7978",
  "#ffafb0",
  "#35d0ba",
];

export default function LeakedCreBarChart() {
  const { leakedCredentials } = useContext(Context);

  // Group data by 'bu'
  const groupByBu = leakedCredentials.reduce((acc, leakedCredential) => {
    (acc[leakedCredential.bu] = acc[leakedCredential.bu] || []).push(leakedCredential);
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
        Leaked Credential by Business Unit
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

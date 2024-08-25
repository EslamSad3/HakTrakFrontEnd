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

export default function MitreAttacksBarChart() {
  const { cyberKillChains } = useContext(Context);

  // Group data by 'killChainStage'
  const groupBykillChainStage = cyberKillChains.reduce((acc, mitreAttack) => {
    (acc[mitreAttack.killChainStage] = acc[mitreAttack.killChainStage] || []).push(mitreAttack);
    return acc;
  }, {});

  // Convert grouped data to the format expected by BarChart
  const chartData = Object.keys(groupBykillChainStage).map((killChainStage, index) => ({
    killChainStage,
    count: groupBykillChainStage[killChainStage].length,
    color: colors[index % colors.length], // Assign a unique color
  }));

  console.log(chartData, "chartData");
  return (
    <>
      <Typography variant="h6" align="center" mb={3}>
        kill Chain By Stage
      </Typography>

      <BarChart
        h={300}
        data={chartData}
        dataKey="killChainStage"
        series={chartData.map((item) => ({
          name: "count",
          color: item.color,
        }))}
        tickLine="x"
        // type="stacked"
      />
    </>
  );
}

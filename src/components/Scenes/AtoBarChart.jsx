import { BarChart } from "@mantine/charts";
import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { Box, Typography } from "@mui/material";

// Function to generate a unique color
const colors = ["#f3a", "#f93", "#3af", "#0f0", "#f0f", "#ff0", "#0ff", "#f00"];

export default function AtoBarChart({ atos }) {
  console.log(atos, "AtoBarChart");
  // Group data by 'bu'
  const groupByBu = atos.reduce((acc, ato) => {
    (acc[ato.bu] = acc[ato.bu] || []).push(ato);
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
        ATOs by Business Unit
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

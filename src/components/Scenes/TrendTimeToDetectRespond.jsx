import React, { useContext, useMemo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Context } from "../../context";

export default function TrendTimeToDetectRespond() {
  const { TtdTtrs } = useContext(Context);

  // Define the order of the months
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Transform and sort the TtdTtrs data into the format needed for the chart
  const chartData = useMemo(() => {
    const dataMap = {};

    TtdTtrs.forEach(({ month, score, indicator }) => {
      if (!dataMap[month]) {
        dataMap[month] = { name: month };
      }
      dataMap[month][indicator] = parseFloat(score);
    });

    // Sort the data by monthOrder
    return Object.values(dataMap).sort(
      (a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name)
    );
  }, [TtdTtrs]);

  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#393e46",
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center">
          Trend of Time to Detect (TTD) & Time to Respond (TTR)
        </Typography>
        <Box mt={4}>
          <LineChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="TTD"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="TTR"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Box>
      </CardContent>
    </Card>
  );
}

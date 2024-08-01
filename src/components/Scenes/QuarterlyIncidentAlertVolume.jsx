import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { BarChart } from "recharts";

const pieData = [
  { label: "January", value: 21, color: "#FF6384" },
  { label: "February", value: 39, color: "#36A2EB" },
  { label: "March", value: 40, color: "#FFCE56" },
];

const barData = [
  { label: "January", incidents: 0 },
  { label: "February", incidents: 0 },
  { label: "March", incidents: 34 },
];

const TOTAL = pieData.map((item) => item.value).reduce((a, b) => a + b, 0);

const getArcLabel = (params) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

const sizing = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  legend: { hidden: true },
};

const QuarterlyIncidentAlertVolume = () => {
  return (
    <Card
      sx={{
        backgroundColor: "#0d9155",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6">
          Quarterly Incident and Alert Volume
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box width="50%">
            <PieChart
              series={[
                {
                  outerRadius: 80,
                  data: pieData,
                  arcLabel: getArcLabel,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontSize: 14,
                },
              }}
              {...sizing}
            />
            <Typography variant="body2">Total Alerts: {TOTAL}</Typography>
          </Box>
          <Box>
            <BarChart
              data={barData}
              xKey="label"
              yKey="incidents"
              colorScheme={["#FF6384"]}
            />
            <Typography variant="body2">Incident Percentages</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuarterlyIncidentAlertVolume;

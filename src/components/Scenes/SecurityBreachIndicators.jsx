import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function SecurityBreachIndicators() {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3e4a61",
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center" mb={2}>
          Security Breach Indicators
        </Typography>
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["January", "February", "March"] },
          ]}
          series={[
            {
              label: "Account Take Over",
              data: [21, 15, 43],
              color: "#1e88e5",
            },
            {
              label: "Compromised Employees",
              data: [2, 2, 3],
              color: "#d32f2f",
            },
            {
              label: "3rd Party Leaked Credentials",
              data: [5, 0, 3],
              color: "#388e3c",
            },
          ]}
          width={500}
          height={300}
        />
        <Box mt={2}>
          <Typography variant="body2" align="center">
            The chart quantifies key security breach indicators such as account
            takeovers and compromised credentials detected in the quarter.
          </Typography>
          <Typography variant="body2" align="center" mt={1}>
            <strong>Impact on Brand Reputation:</strong> High
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

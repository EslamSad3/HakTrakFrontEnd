import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function ThreatCompositionOverview() {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#118a7e",
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center">
          Threat Composition Overview
        </Typography>
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["January", "February", "March"] },
          ]}
          series={[
            {
              label: "Brute Force Attacks",
              data: [15, 14, 20],
              color: "#FF0000",
            },
            { label: "Insider Threats", data: [3, 4, 11], color: "#FFA500" },
            {
              label: "Malware/other Attacks",
              data: [13, 15, 5],
              color: "#808080",
            },
          ]}
          height={300}
          width={500}
        />
      </CardContent>
    </Card>
  );
}

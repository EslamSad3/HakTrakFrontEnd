import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function NonComplianceGapsOverview() {
  return (
    <Card
      style={{
        backgroundColor: "#ff895d",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center">
          Non-Compliance Gaps Overview
        </Typography>
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["January", "February", "March"] },
          ]}
          series={[
            { label: "MITRE ATT&CK", data: [5, 12, 12], color: "#1e88e5" },
            { label: "ISO 27001", data: [5, 12, 12], color: "#d32f2f" },
            { label: "NIST CSF", data: [5, 12, 12], color: "#388e3c" },
            { label: "PDPL", data: [5, 12, 12], color: "#fbc02d" },
            { label: "SAMA", data: [5, 12, 12], color: "#ff5722" },
          ]}
          width={500}
          height={300}
        />
        <Box mt={2}>
          <Typography variant="body2" align="center">
            The chart details the levels of non-compliance and gaps in
            regulatory controls.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

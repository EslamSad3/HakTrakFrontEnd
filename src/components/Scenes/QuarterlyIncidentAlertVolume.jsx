import React, { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Context } from "../../context";

const colorPalette = {
  January: "#FF6384",
  February: "#36A2EB",
  March: "#FFCE56",
  // Add more months and colors if needed
};

const QuarterlyIncidentAlertVolume = () => {
  const { quarterlyIncident } = useContext(Context);

  // Convert quarterlyIncident to the structure needed for charts
  const pieData = quarterlyIncident.map((item) => ({
    label: item.month,
    value: parseInt(item.score, 10), // Convert score to integer
    color: colorPalette[item.month] || "#888888", // Use unique color or default
  }));

  const TOTAL = pieData.map((item) => item.value).reduce((a, b) => a + b, 0);

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
        <Box display="flex" flexDirection="column" alignItems="center">
          <PieChart
            series={[
              {
                outerRadius: 80,
                data: pieData,
                arcLabel: (params) => {
                  const percent = params.value / TOTAL;
                  return `${(percent * 100).toFixed(0)}%`;
                },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontSize: 14,
              },
            }}
            {...{
              margin: { right: 5 },
              width: 200,
              height: 200,
              legend: { hidden: true },
            }}
          />
          <Typography variant="body2">Total Alerts: {TOTAL}</Typography>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Color</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pieData.map((item) => (
                  <TableRow key={item.label}>
                    <TableCell>{item.label}</TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          backgroundColor: item.color,
                          borderRadius: "50%",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuarterlyIncidentAlertVolume;

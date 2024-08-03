import React, { useContext, useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Context } from "../../context";

export default function NonComplianceGapsOverview() {
  const { noncompliancegapsoverview } = useContext(Context);
  const [chartData, setChartData] = useState({
    xAxis: [],
    series: [],
  });

  useEffect(() => {
    // Assuming the response has a key 'data' that contains the array of objects
    const data = noncompliancegapsoverview.data || noncompliancegapsoverview;

    if (Array.isArray(data)) {
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
      const uniqueMonths = [...new Set(data.map((item) => item.month))].sort(
        (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
      );

      const seriesData = {};

      data.forEach((item) => {
        if (!seriesData[item.compliance]) {
          seriesData[item.compliance] = Array(uniqueMonths.length).fill(0);
        }

        const monthIndex = uniqueMonths.indexOf(item.month);
        seriesData[item.compliance][monthIndex] = Number(item.score);
      });

      const series = Object.keys(seriesData).map((key) => ({
        label: key,
        data: seriesData[key],
        color: getColorForCompliance(key), // A function to get color for each compliance
      }));

      setChartData({
        xAxis: [{ scaleType: "band", data: uniqueMonths }],
        series: series,
      });
    } else {
      console.error("Data fetched is not an array", data);
    }
  }, [noncompliancegapsoverview]);

  const getColorForCompliance = (compliance) => {
    const colors = {
      "MITRE ATT&CK": "#1e88e5",
      "ISO 27001": "#d32f2f",
      "NIST CSF": "#388e3c",
      "PDPL": "#fbc02d",
      "SAMA": "#ff5722",
    };
    return colors[compliance] || "#000000"; // default color
  };

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
          xAxis={chartData.xAxis}
          series={chartData.series}
          width={700}
          height={300}
        />
        <Box mt={2}>
          <Typography variant="body2" align="center">
            The chart details the levels of non-compliance and gaps <br /> in
            regulatory controls.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

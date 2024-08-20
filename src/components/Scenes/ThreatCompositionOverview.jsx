import React, { useContext, useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Context } from "../../context";

export default function ThreatCompositionOverview() {
  const { threatCompositionOverview } = useContext(Context);
  const [chartData, setChartData] = useState({
    xAxis: [],
    series: [],
  });

  useEffect(() => {
    // Assuming the response has a key 'data' that contains the array of objects
    const data = threatCompositionOverview.data || threatCompositionOverview;

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
        if (!seriesData[item.threatType]) {
          seriesData[item.threatType] = Array(uniqueMonths.length).fill(0);
        }

        const monthIndex = uniqueMonths.indexOf(item.month);
        seriesData[item.threatType][monthIndex] = Number(item.score);
      });

      const series = Object.keys(seriesData).map((key) => ({
        label: key,
        data: seriesData[key],
        color: getColorForthreatType(key), // A function to get color for each threatType
      }));

      setChartData({
        xAxis: [{ scaleType: "band", data: uniqueMonths }],
        series: series,
      });
    } else {
      console.error("Data fetched is not an array", data);
    }
  }, [threatCompositionOverview]);

  const getColorForthreatType = (threatType) => {
    const colors = {
      "Brute Force Attacks": "#1e88e5",
      "Insider Threats": "#d32f2f",
      "Malware/other Attacks": "#388e3c",
    };
    return colors[threatType] || "#000000"; // default color
  };

  return (
    <Card
      style={{
        backgroundColor: "#118a7e",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center">
          Threat Composition Overview{" "}
        </Typography>
        <Box my={2}>
          <Typography variant="body2" align="center">
            The chart visualizes the proportion of different threat types <br />
            encountered over a period (January, February, March).
          </Typography>
        </Box>
        <BarChart
          xAxis={chartData.xAxis}
          series={chartData.series}
          width={500}
          height={300}
          margin={{ top: 100, bottom: 100, left: 100, right: 100 }}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: 0,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}

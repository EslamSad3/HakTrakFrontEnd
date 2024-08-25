import React, { useContext, useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Context } from "../../context";

export default function SecurityBreachIndicators() {
  const { securityBreachIndicators } = useContext(Context);
  const [chartData, setChartData] = useState({
    xAxis: [],
    series: [],
  });

  useEffect(() => {
    // Assuming the response has a key 'data' that contains the array of objects
    const data = securityBreachIndicators.data || securityBreachIndicators;

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
        if (!seriesData[item.indicator]) {
          seriesData[item.indicator] = Array(uniqueMonths.length).fill(0);
        }

        const monthIndex = uniqueMonths.indexOf(item.month);
        seriesData[item.indicator][monthIndex] = Number(item.score);
      });

      const series = Object.keys(seriesData).map((key) => ({
        label: key,
        data: seriesData[key],
        color: getColorForindicator(key), // A function to get color for each indicator
      }));

      setChartData({
        xAxis: [{ scaleType: "band", data: uniqueMonths }],
        series: series,
      });
    } else {
      console.error("Data fetched is not an array", data);
    }
  }, [securityBreachIndicators]);

  const getColorForindicator = (indicator) => {
    const colors = {
      "Compromised Employees": "#1e88e5",
      "Account Take Over": "#d32f2f",
      "3rd Party Leaked Credentials": "#388e3c",
      "Brand Reputation": "#399e3c",
    };
    return colors[indicator] || "#000000"; // default color
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
          Security Breach Indicators
        </Typography>
        <Box my={2}>
          <Typography variant="body2" align="center">
            The chart quantifies key security breach indicators <br /> such as
            account takeovers and compromised credentials detected in the
            quarter
          </Typography>
        </Box>
        <BarChart
          xAxis={chartData.xAxis}
          series={chartData.series}
          width={600}
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

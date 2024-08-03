// import * as React from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
// import { Box, Card, CardContent, Typography } from "@mui/material";

// export default function SecurityBreachIndicators() {
//   return (
//     <Card
//       sx={{
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#3e4a61",
//       }}
//     >
//       <CardContent>
//         <Typography variant="h6" align="center" mb={2}>
//           Security Breach Indicators
//         </Typography>
//         <BarChart
//           xAxis={[
//             { scaleType: "band", data: ["January", "February", "March"] },
//           ]}
//           series={[
//             {
//               label: "Account Take Over",
//               data: [21, 15, 43],
//               color: "#1e88e5",
//             },
//             {
//               label: "Compromised Employees",
//               data: [2, 2, 3],
//               color: "#d32f2f",
//             },
//             {
//               label: "3rd Party Leaked Credentials",
//               data: [5, 0, 3],
//               color: "#388e3c",
//             },
//           ]}
//           width={500}
//           height={300}
//         />
//         <Box mt={2}>
//           <Typography variant="body2" align="center">
//             The chart quantifies key security breach indicators such as account
//             takeovers and compromised credentials detected in the quarter.
//           </Typography>
//           <Typography variant="body2" align="center" mt={1}>
//             <strong>Impact on Brand Reputation:</strong> High
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }




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
        <BarChart
          xAxis={chartData.xAxis}
          series={chartData.series}
          width={700}
          height={300}
        />
        <Box mt={2}>
          <Typography variant="body2" align="center">
            The chart quantifies key security breach indicators <br /> such as account
            takeovers and compromised credentials detected in the quarter
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

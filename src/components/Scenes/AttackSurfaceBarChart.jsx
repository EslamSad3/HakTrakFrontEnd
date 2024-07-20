import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Context } from "../../context";

export default function AttackSurfaceBarChart() {
  const { attackSurfaces } = useContext(Context);

  // Group by openPorts property
  const portCounts = attackSurfaces.reduce((acc, attack) => {
    attack.openPorts.forEach((port) => {
      acc[port] = (acc[port] || 0) + 1;
    });
    return acc;
  }, {});

  const portData = Object.keys(portCounts).map((port) => ({
    label: port,
    value: portCounts[port],
  }));

  const portLabels = portData.map((item) => item.label);
  const portValues = portData.map((item) => item.value);

  return (
    <Box
      sx={{
        borderRadius: "0.55rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="h6" align="center" mb={1}>
        Attack Surface by Open Ports
      </Typography>
      <BarChart
        width={500}
        height={300}
        series={[
          {
            data: portValues,
            label: "Attack Surface by Open Ports",
            id: "attackId",
            color: "#fff333"
          },
        ]}
        xAxis={[
          {
            data: portLabels,
            scaleType: "band",
          },
        ]}
      />
    </Box>
  );
}

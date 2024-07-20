import React from "react";
import { Box, Card, Divider } from "@mui/material";
import NdrPieChart from "../Scenes/NdrPieChart";
import ExdrPieChart from "../Scenes/ExdrPieChart";
import AtoBarChart from "../Scenes/AtoBarChart";
import LeakedCreBarChart from "../Scenes/LeakedCreBarChart";
import VulnsPieChart from "../Scenes/VulnsPieChart";
import EdrXdrBuBarChart from "../Scenes/ExdrBuBarChart.jsx";
import NdrBuBarChart from "../Scenes/NdrBuBarChart.jsx";
import AttackSurfaceBarChart from "../Scenes/AttackSurfaceBarChart.jsx";
import Header from "../Header/index.js";

const Charts = ({ theme, isNonMobile }) => (
  <Box mt="5rem">
    <Divider mt="2rem" />
    <Box textAlign={"center"}>
      <Header title="Charts" />
    </Box>
    <Box
      mt="3rem"
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      justifyContent="space-between"
      rowGap="3rem"
      columnGap="3rem"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
        width: "100%",
        height: "auto",
      }}
    >
      <ChartCard theme={theme}>
        <NdrPieChart />
      </ChartCard>
      <ChartCard theme={theme}>
        <ExdrPieChart />
      </ChartCard>
      <ChartCard theme={theme}>
        <VulnsPieChart />
      </ChartCard>
      <ChartCard theme={theme}>
        <AtoBarChart />
      </ChartCard>
      <ChartCard theme={theme}>
        <LeakedCreBarChart />
      </ChartCard>
      <ChartCard theme={theme}>
        <EdrXdrBuBarChart />
      </ChartCard>
      <ChartCard theme={theme}>
        <NdrBuBarChart />
      </ChartCard>
      <ChartCard theme={theme}>
        <AttackSurfaceBarChart />
      </ChartCard>
    </Box>
  </Box>
);

const ChartCard = ({ children, theme }) => (
  <Card
    sx={{
      backgroundImage: "none",
      backgroundColor: theme.palette.background.alt,
      borderRadius: "0.55rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem",
    }}
  >
    {children}
  </Card>
);

export default Charts;

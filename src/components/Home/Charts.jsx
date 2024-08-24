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

const Charts = ({
  theme,
  isNonMobile,
  edrXdrs,
  ndrs,
  atos,
  vulnerabilities,
  attackSurfaces,
  leakedCredentials,
}) => (
  <Box>
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
        <NdrPieChart ndrs={ndrs} />
      </ChartCard>
      <ChartCard theme={theme}>
        <ExdrPieChart edrXdrs={edrXdrs} />
      </ChartCard>
      <ChartCard theme={theme}>
        <VulnsPieChart vulnerabilities={vulnerabilities} />
      </ChartCard>
      <ChartCard theme={theme}>
        <AtoBarChart atos={atos} />
      </ChartCard>
      <ChartCard theme={theme}>
        <LeakedCreBarChart leakedCredentials={leakedCredentials} />
      </ChartCard>
      <ChartCard theme={theme}>
        <EdrXdrBuBarChart />
      </ChartCard>
      <ChartCard theme={theme}>
        <NdrBuBarChart />
      </ChartCard>
      <ChartCard theme={theme}>
        <AttackSurfaceBarChart attackSurfaces={attackSurfaces} />
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

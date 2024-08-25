import React from "react";
import ExcutiveDashboard from "../ExcutiveDashbaord/ExcutiveDashboard";
import MitreAttacksBarChart from "../Scenes/MitreAttacksBarChart";
import CyberKillChainBarChart from "../Scenes/CyberKillChainBarChart";
import { Box } from "@mui/material";

function Reports() {
  return (
    <Box m={"2rem"}>
      <ExcutiveDashboard />
      <Box
        sx={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap:"2rem"
        }}
      >
        <MitreAttacksBarChart />
        <CyberKillChainBarChart />
      </Box>
    </Box>
  );
}

export default Reports;

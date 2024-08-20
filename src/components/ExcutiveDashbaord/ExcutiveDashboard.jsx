

import React from "react";
import { Box, Grid } from "@mui/material";
import SecurityPostureScore from "../Scenes/SecurityPostureScore";
import QuarterlyIncidentAlertVolume from "../Scenes/QuarterlyIncidentAlertVolume";
import ThreatCompositionOverview from "../Scenes/ThreatCompositionOverview";
import SecurityBreachIndicators from "../Scenes/SecurityBreachIndicators";
import NonComplianceGapsOverview from "../Scenes/NonComplianceGapsOverview";
import CybersecurityTrends from "../Scenes/CybersecurityTrends";
import DigitalRiskIntelligence from "../Scenes/DigitalRiskIntelligence";
import TrendTimeToDetectRespond from "../Scenes/TrendTimeToDetectRespond";

const ExcutiveDashboard = () => (
  <Box sx={{ flexGrow: 1, padding: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <SecurityPostureScore />
      </Grid>
      <Grid item xs={12} md={8}>
        <QuarterlyIncidentAlertVolume />
      </Grid>
      <Grid item xs={12} md={6}>
        <ThreatCompositionOverview />
      </Grid>
      <Grid item xs={12} md={6}>
        <SecurityBreachIndicators />
      </Grid>
      <Grid item xs={12}>
        <NonComplianceGapsOverview />
      </Grid>
      <Grid item xs={12}>
        <CybersecurityTrends />
      </Grid>
      <Grid item xs={3}>
        <DigitalRiskIntelligence />
      </Grid>

      <Grid item xs={9}>
        <TrendTimeToDetectRespond />
      </Grid>
    </Grid>
  </Box>
);

export default ExcutiveDashboard;

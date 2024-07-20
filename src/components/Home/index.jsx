import {
  Box,
  Card,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import NdrPieChart from "../Scenes/NdrPieChart";
import { Context } from "../../context";
import ExdrPieChart from "../Scenes/ExdrPieChart";
import AtoBarChart from "../Scenes/AtoBarChart";
import LeakedCreBarChart from "../Scenes/LeakedCreBarChart";

function Home() {
  const {
    ips,
    domains,
    portals,
    iocs,
    suspiciousIps,
    aptFeeds,
    threatIntelligenceFeeds,
    darkWebMentions,
    leakedCredentials,
    edrXdrs,
    ndrs,
    atos,
    attackSurfaces,
    brandReputations,
    vulnerabilitiesIntelligences,
    isLoading,
  } = useContext(Context);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const navigate = useNavigate();

  const severityOptions = ["low", "medium", "high", "critical"];

  const vulnerabilitySeverities = severityOptions.map((severity) => ({
    label: severity.charAt(0).toUpperCase() + severity.slice(1),
    count:
      vulnerabilitiesIntelligences?.filter((vuln) => vuln.severity === severity)
        .length || 0,
  }));

  const combinedCardsData = [
    {
      label: "Assets",
      count:
        (ips?.length || 0) + (domains?.length || 0) + (portals?.length || 0),
      subCounts: [
        { label: "IPs", count: ips?.length },
        { label: "Domains", count: domains?.length },
        { label: "Portals", count: portals?.length },
      ],
      path: "/assets/ips",
    },
    {
      label: "Threat Intelligence",
      count:
        (suspiciousIps?.length || 0) +
        (iocs?.length || 0) +
        (aptFeeds?.length || 0) +
        (threatIntelligenceFeeds?.length || 0),
      subCounts: [
        { label: "Suspicious IPs", count: suspiciousIps?.length },
        { label: "IOCs", count: iocs?.length },
        { label: "APT Feeds", count: aptFeeds?.length },
        {
          label: "Threat Intelligence Feeds",
          count: threatIntelligenceFeeds?.length,
        },
      ],
      path: "/threat-intelligence/iocs",
    },
    {
      label: "Detections",
      count: (edrXdrs?.length || 0) + (ndrs?.length || 0),
      subCounts: [
        { label: "EDR/XDR Detections", count: edrXdrs?.length },
        { label: "NDR Detections", count: ndrs?.length },
      ],
      path: "/detections/ndr-detections",
    },
    {
      label: "Dark Web Monitoring",
      count: (darkWebMentions?.length || 0) + (leakedCredentials?.length || 0),
      subCounts: [
        { label: "Dark Web Mentions", count: darkWebMentions?.length },
        { label: "Leaked Credentials", count: leakedCredentials?.length },
      ],
      path: "/dark-web-monitoring/dark-web-mentions",
    },
    {
      label: "ATOs",
      count: atos?.length,
      subCounts: [],
      path: "/account-take-over",
    },
    {
      label: "Attack Surfaces",
      count: attackSurfaces?.length,
      subCounts: [],
      path: "/attack-surface",
    },
    {
      label: "Brand Reputations",
      count: brandReputations?.length,
      subCounts: [],
      path: "/brand-reputation",
    },
    {
      label: "Vulnerabilities",
      count: vulnerabilitiesIntelligences?.length || 0,
      subCounts: vulnerabilitySeverities.map(({ label, count }) => ({
        label,
        count,
        path: `/vulnerabilities/${label.toLowerCase()}`,
      })),
      path: "/vulnerabilities",
    },
  ];

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Box textAlign={"center"}>
          <Header title="Summary" />
        </Box>
        {!isLoading ? (
          <>
            <Box
              mt="5rem"
              display="grid"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              justifyContent="space-between"
              rowGap="3rem"
              columnGap="3rem"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                width: "100%",
                height: "auto",
              }}
            >
              {combinedCardsData.map(({ label, count, subCounts, path }) => (
                <Card
                  key={label}
                  sx={{
                    backgroundImage: "none",
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: "0.55rem",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "1rem",
                  }}
                  onClick={() => navigate(path)}
                >
                  <Typography variant="h6" align="center" mb={1}>
                    {label}
                  </Typography>
                  <Typography variant="h4" color={theme.palette.secondary[200]}>
                    {count}
                  </Typography>
                  <Box mt={2} width="100%">
                    {subCounts.map((subCount, index) => (
                      <React.Fragment key={subCount.label}>
                        {index > 0 && <Divider sx={{ my: 1 }} />}
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          px={2}
                        >
                          <Typography
                            variant="body2"
                            component={Link}
                            to={subCount.path}
                            sx={{ textDecoration: "none", color: "inherit" }}
                          >
                            {subCount.label}
                          </Typography>
                          <Typography
                            variant="body2"
                            color={theme.palette.secondary[200]}
                          >
                            {subCount.count}
                          </Typography>
                        </Box>
                      </React.Fragment>
                    ))}
                  </Box>
                </Card>
              ))}
            </Box>

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
                  <NdrPieChart />
                </Card>
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
                  <ExdrPieChart />
                </Card>
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
                  <AtoBarChart />
                </Card>
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
                  <LeakedCreBarChart />
                </Card>
              </Box>
            </Box>
          </>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </>
  );
}

export default Home;

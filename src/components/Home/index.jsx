import {
  Box,
  Card,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {
  Public,
  Language,
  Dns,
  Policy,
  ReportProblem,
  Info,
} from "@mui/icons-material";
import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import NdrPieChart from "../Scenes/NdrPieChart";
import { Context } from "../../context";
import ExdrPieChart from "../Scenes/ExdrPieChart";
import AtoBarChart from "../Scenes/AtoBarChart";
import LeakedCreBarChart from "../Scenes/LeakedCreBarChart";
import VulnsPieChart from "../Scenes/VulnsPieChart";
import EdrXdrBuBarChart from "../Scenes/ExdrBuBarChart.jsx";
import NdrBuBarChart from "../Scenes/NdrBuBarChart.jsx";
import AttackSurfaceBarChart from "../Scenes/AttackSurfaceBarChart.jsx";

import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import BugReportIcon from "@mui/icons-material/BugReport";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ApprovalIcon from "@mui/icons-material/Approval";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import LanIcon from "@mui/icons-material/Lan";
import FolderSharedIcon from "@mui/icons-material/FolderShared";

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
        {
          label: "IPs",
          count: ips?.length,
          path: "/assets/ips",
          icon: <ApprovalIcon fontSize="small" />,
        },
        {
          label: "Domains",
          count: domains?.length,
          path: "/assets/domains",
          icon: <Language fontSize="small" />,
        },
        {
          label: "Portals",
          count: portals?.length,
          path: "/assets/portals",
          icon: <Dns fontSize="small" />,
        },
      ],
      icon: <Public fontSize="small" />,
    },
    {
      label: "Threat Intelligence",
      count:
        (suspiciousIps?.length || 0) +
        (iocs?.length || 0) +
        (aptFeeds?.length || 0) +
        (threatIntelligenceFeeds?.length || 0),
      subCounts: [
        {
          label: "Suspicious IPs",
          count: suspiciousIps?.length,
          path: "/threat-intelligence/suspicious-ips",
          icon: <FmdBadIcon fontSize="small" />,
        },
        {
          label: "IOCs",
          count: iocs?.length,
          path: "/threat-intelligence/iocs",
          icon: <Policy fontSize="small" />,
        },
        {
          label: "APT Feeds",
          count: aptFeeds?.length,
          path: "/threat-intelligence/apt-feeds",
          icon: <ReportProblem fontSize="small" />,
        },
        {
          label: "Threat Intelligence Feeds",
          count: threatIntelligenceFeeds?.length,
          path: "/threat-intelligence/threat-intelligence-feeds",
          icon: <Info fontSize="small" />,
        },
      ],
      icon: <EngineeringOutlinedIcon fontSize="small" />,
    },
    {
      label: "Detections",
      count: (edrXdrs?.length || 0) + (ndrs?.length || 0),
      subCounts: [
        {
          label: "EDR / XDR Detections",
          count: edrXdrs?.length,
          path: "/detections/edr-xdr-detections",
          icon: <ScreenSearchDesktopIcon fontSize="small" />,
        },
        {
          label: "NDR Detections",
          count: ndrs?.length,
          path: "/detections/ndr-detections",
          icon: <LanIcon fontSize="small" />,
        },
      ],
      icon: <CrisisAlertIcon fontSize="small" />,
    },
    {
      label: "Dark Web Monitoring",
      count: (darkWebMentions?.length || 0) + (leakedCredentials?.length || 0),
      subCounts: [
        {
          label: "Dark Web Mentions",
          count: darkWebMentions?.length,
          path: "/dark-web-monitoring/dark-web-mentions",
          icon: <FindInPageIcon fontSize="small" />,
        },
        {
          label: "Leaked Credentials",
          count: leakedCredentials?.length,
          path: "/dark-web-monitoring/leaked-credentials",
          icon: <PersonSearchIcon fontSize="small" />,
        },
      ],
      icon: <TravelExploreIcon fontSize="small" />,
    },
    {
      label: "ATOs",
      count: atos?.length,
      subCounts: [],
      path: "/account-take-over",
      icon: <FolderSharedIcon fontSize="small" />,
    },
    {
      label: "Attack Surface",
      count: attackSurfaces?.length,
      subCounts: [],
      path: "/attack-surface",
      icon: <LocalOfferIcon fontSize="small" />,
    },
    {
      label: "Brand Reputation",
      count: brandReputations?.length,
      subCounts: [],
      path: "/brand-reputation",
      icon: <BrandingWatermarkIcon fontSize="small" />,
    },
    {
      label: "Vulnerabilities",
      count: vulnerabilitiesIntelligences?.length || 0,
      subCounts: vulnerabilitySeverities.map(({ label, count }) => ({
        label,
        count,
        path: `/vulnerabilities/${label.toLowerCase()}`,
        icon: <BugReportIcon fontSize="small" />,
      })),
      path: "/vulnerabilities-intelligences",
      icon: <BugReportIcon fontSize="small" />,
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
              {combinedCardsData.map(
                ({ label, count, subCounts, path, icon }) => (
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
                    onClick={() => path && navigate(path)}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mb={1}
                    >
                      {icon}
                      <Typography variant="h6" align="center" ml={1}>
                        {label}
                      </Typography>
                    </Box>
                    <Typography
                      variant="h4"
                      color={theme.palette.secondary[200]}
                    >
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
                            <Box display="flex" alignItems="center">
                              {subCount.icon}
                              <Typography
                                variant="body2"
                                component={Link}
                                to={subCount.path}
                                sx={{
                                  textDecoration: "none",
                                  color: "inherit",
                                  ml: 1,
                                }}
                              >
                                {subCount.label}
                              </Typography>
                            </Box>
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
                )
              )}
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
                  <VulnsPieChart />
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
                  <EdrXdrBuBarChart />
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
                  <NdrBuBarChart />
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
                  <AttackSurfaceBarChart />
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

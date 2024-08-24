import React, { useContext, useState } from "react";
import moment from "moment";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  useTheme,
  TextField,
  Button,
} from "@mui/material";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { Context } from "../../context";
import CardComponent from "./CardComponent";
import Charts from "./Charts";
import {
  Public,
  Language,
  Dns,
  Policy,
  ReportProblem,
  Info,
} from "@mui/icons-material";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import BugReportIcon from "@mui/icons-material/BugReport";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ApprovalIcon from "@mui/icons-material/Approval";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import LanIcon from "@mui/icons-material/Lan";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import useDateFilter from "../../hooks/useDateFilter";

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
  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    filterMultipleDataSets,
  } = useDateFilter();

  // Pass multiple datasets to the hook for filtering
  const [
    filteredEdrXdrs,
    filteredNdrs,
    filteredAtos,
    filteredAttackSurfaces,
    filteredVulnerabilities,
    filteredLeakedCredentials,
  ] = filterMultipleDataSets([
    { data: edrXdrs, dateKey: "detectionTime" },
    { data: ndrs, dateKey: "detectionTime" },
    { data: atos, dateKey: "detectionTime" },
    { data: attackSurfaces, dateKey: "detectionTime" },
    { data: vulnerabilitiesIntelligences, dateKey: "detectionTime" },
    { data: leakedCredentials, dateKey: "detectionTime" },
  ]);

  console.log(filteredNdrs, "filteredNdrs");

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
          icon: <ApprovalIcon fontSize="small" />,
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
          path: "/detections/edrxdr-detections",
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
    <Box m="1.5rem 2.5rem">
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
            {combinedCardsData.map((cardData) => (
              <CardComponent key={cardData.label} {...cardData} theme={theme} />
            ))}
          </Box>
          <Box
            sx={{
              marginTop: "5rem",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              height: "auto",
              marginBottom: "3rem",
            }}
          >
            {/* Date Picker for filtering */}
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Box display="flex" justifyContent="space-between" mb="1.5rem">
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ marginInline: "1rem" }}
                />
                {/* Clear Filter Button */}
                <Button onClick={clearFilters} variant="outlined">
                  Clear Filter
                </Button>
              </Box>
            </LocalizationProvider>
            <Charts
              theme={theme}
              isNonMobile={isNonMobile}
              edrXdrs={filteredEdrXdrs}
              ndrs={filteredNdrs}
              vulnerabilities={filteredVulnerabilities}
              atos={filteredAtos}
              attackSurfaces={filteredAttackSurfaces}
              leakedCredentials={filteredLeakedCredentials}
            />
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress size={100} />
        </Box>
      )}
    </Box>
  );
}

export default Home;

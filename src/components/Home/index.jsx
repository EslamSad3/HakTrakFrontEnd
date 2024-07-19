import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "../Header";
import { useContext } from "react";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";
import NdrPieChart from "../Scenes/NdrPieChart";

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
      path: "/assets",
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
      path: "/threat-intelligence",
    },
    {
      label: "Detections",
      count: (edrXdrs?.length || 0) + (ndrs?.length || 0),
      subCounts: [
        { label: "EDR/XDR Detections", count: edrXdrs?.length },
        { label: "NDR Detections", count: ndrs?.length },
      ],
      path: "/detections",
    },
    {
      label: "Dark Web Monitoring",
      count: (darkWebMentions?.length || 0) + (leakedCredentials?.length || 0),
      subCounts: [
        { label: "Dark Web Mentions", count: darkWebMentions?.length },
        { label: "Leaked Credentials", count: leakedCredentials?.length },
      ],
      path: "/dark-web-monitoring",
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
      label: "Vulnerabilities Intelligences",
      count: vulnerabilitiesIntelligences?.length,
      subCounts: [],
      path: "/vulnerabilities-intelligences",
    },
  ];

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Summary" />
        {!isLoading ? (
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
                      <Box display="flex" justifyContent="space-between" px={2}>
                        <Typography variant="body2">
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

            <Box><NdrPieChart/></Box>
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </>
  );
}

export default Home;

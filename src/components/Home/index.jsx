import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "../Header";
import { useContext } from "react";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";

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
    language,
  } = useContext(Context);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const navigate = useNavigate();

  const cardsData = [
    { label: "Ips", count: ips?.length, path: "/assets/ips" },
    { label: "Domains", count: domains?.length, path: "/assets/domains" },
    { label: "Portals", count: portals?.length, path: "/assets/portals" },
    { label: "IOCs", count: iocs?.length, path: "/threat-intelligence/iocs" },
    {
      label: "APT Feeds",
      count: aptFeeds?.length,
      path: "/threat-intelligence/apt-feeds",
    },
    {
      label: "Threat Intelligence Feeds",
      count: threatIntelligenceFeeds?.length,
      path: "/threat-intelligence/threat-intelligence-feeds",
    },
    {
      label: "Suspicious IPs",
      count: suspiciousIps?.length,
      path: "/threat-intelligence/suspicious-ips",
    },
    {
      label: "Dark Web Mentions",
      count: darkWebMentions?.length,
      path: "/dark-web-monitoring/dark-web-mentions",
    },
    {
      label: "Leaked Credentials",
      count: leakedCredentials?.length,
      path: "/dark-web-monitoring/leaked-credentials",
    },
    {
      label: "EDR/XDR Detections",
      count: edrXdrs?.length,
      path: "/detections/drxdr-detections",
    },
    {
      label: "NDR Detections",
      count: ndrs?.length,
      path: "/detections/ndr-detections",
    },
    { label: "ATOs", count: atos?.length, path: "/account-take-over" },
    {
      label: "Attack Surfaces",
      count: attackSurfaces?.length,
      path: "/attack-surface",
    },
    {
      label: "Brand Reputations",
      count: brandReputations?.length,
      path: "/brand-reputation",
    },
    {
      label: "Vulnerabilities Intelligences",
      count: vulnerabilitiesIntelligences?.length,
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
              height: "15rem",
            }}
          >
            {cardsData.map(({ label, count, path }) => {
              const isLongLabel = label.split(" ").length > 1;
              return (
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
                    justifyContent: "center",
                    alignItems: "center",
                    
                  }}
                  onClick={() => navigate(path)}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-1.5rem",
                      left: "0.25rem",
                      minWidth: isLongLabel ? "100%" : "90%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding:"15px"
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: theme.palette.neutral.main,
                        boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                        borderRadius: "0.55rem",
                        width: isLongLabel ? "100%" : "5rem",
                        height: "3rem",
                        display: "flex",
                        marginRight: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 16,
                        }}
                        color={theme.palette.secondary[200]}
                      >
                        {label}
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ marginTop: "4rem" }}>
                    <Typography variant="h3" textAlign={"center"}>
                      {count}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </>
  );
}

export default Home;

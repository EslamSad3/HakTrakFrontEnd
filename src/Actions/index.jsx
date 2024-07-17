import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import {
  Box,
  Typography,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";

import {
  ExpandMore,
  Public,
  Language,
  Dns,
  Policy,
  ReportProblem,
  Info,
  Warning,
  ChevronRightOutlined,
} from "@mui/icons-material";

import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import BugReportIcon from "@mui/icons-material/BugReport";
import PinchIcon from "@mui/icons-material/Pinch";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import { useNavigate } from "react-router-dom";
import { Context } from "../context";

function AdminActions() {
  const [active, setActive] = useState("");
  const { isLoading } = useContext(Context);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setActive(path);
  };

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Admin Actions" />

        {!isLoading ? (
          <Box mt="5rem">
            {/* Assets */}
            <Accordion
              sx={{
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                "&.Mui-expanded": {
                  backgroundColor: theme.palette.background.alt,
                },
                "& .MuiAccordionSummary-root": {
                  padding: "0 2rem",
                },
                "& .MuiAccordionDetails-root": {
                  padding: 0,
                },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <ListItemIcon
                  sx={{
                    color: theme.palette.secondary[200],
                    ml: "1rem",
                  }}
                >
                  <Public />
                </ListItemIcon>
                <Typography>Assets</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate("/admin/actions/assets/ips")
                      }
                      sx={{
                        backgroundColor:
                          active === "assets/ips"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === "assets/ips"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active === "assets/ips"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <Dns />
                      </ListItemIcon>
                      <ListItemText primary="IPs" sx={{ pl: 2 }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate("/admin/actions/assets/domains")
                      }
                      sx={{
                        backgroundColor:
                          active === "assets/domains"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === "assets/domains"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active === "assets/domains"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <Language />
                      </ListItemIcon>
                      <ListItemText primary="Domains" sx={{ pl: 2 }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate("/admin/actions/assets/portals")
                      }
                      sx={{
                        backgroundColor:
                          active === "assets/portals"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === "assets/portals"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active === "assets/portals"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <Dns />
                      </ListItemIcon>
                      <ListItemText primary="Portals" sx={{ pl: 2 }} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <br />

            {/* Threat Intelligence */}
            <Accordion
              sx={{
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                "&.Mui-expanded": {
                  backgroundColor: theme.palette.background.alt,
                },
                "& .MuiAccordionSummary-root": {
                  padding: "0 2rem",
                },
                "& .MuiAccordionDetails-root": {
                  padding: 0,
                },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <ListItemIcon
                  sx={{
                    color: theme.palette.secondary[200],
                    ml: "1rem",
                  }}
                >
                  <EngineeringOutlinedIcon />
                </ListItemIcon>
                <Typography>Threat Intelligence</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate(
                          "/admin/actions/threat-intelligence/iocs"
                        )
                      }
                      sx={{
                        backgroundColor:
                          active === "threatintelligence/iocs"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === "threatintelligence/iocs"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active === "threatintelligence/iocs"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <Policy />
                      </ListItemIcon>
                      <ListItemText primary="IOCs" sx={{ pl: 2 }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate(
                          "/admin/actions/threat-intelligence/apt-feeds"
                        )
                      }
                      sx={{
                        backgroundColor:
                          active === "threatintelligence/aptsfeeds"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === "threatintelligence/aptsfeeds"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active === "threatintelligence/aptsfeeds"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <ReportProblem />
                      </ListItemIcon>
                      <ListItemText primary="APTs Feeds" sx={{ pl: 2 }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate(
                          "/admin/actions/threat-intelligence/threat-intelligence-feeds"
                        )
                      }
                      sx={{
                        backgroundColor:
                          active ===
                          "threatintelligence/threatintelligencefeeds"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active ===
                          "threatintelligence/threatintelligencefeeds"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active ===
                            "threatintelligence/threatintelligencefeeds"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <Info />
                      </ListItemIcon>
                      <ListItemText
                        primary="Threat Intelligence Feeds"
                        sx={{ pl: 2 }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate(
                          "/admin/actions/threat-intelligence/suspicious-ips"
                        )
                      }
                      sx={{
                        backgroundColor:
                          active === "threatintelligence/suspiciousips"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === "threatintelligence/suspiciousips"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active === "threatintelligence/suspiciousips"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <Warning />
                      </ListItemIcon>
                      <ListItemText primary="Suspicious IPs" sx={{ pl: 2 }} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <br />

            {/* Dark Web Monitoring */}
            <Accordion
              sx={{
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                "&.Mui-expanded": {
                  backgroundColor: theme.palette.background.alt,
                },
                "& .MuiAccordionSummary-root": {
                  padding: "0 2rem",
                },
                "& .MuiAccordionDetails-root": {
                  padding: 0,
                },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <ListItemIcon
                  sx={{
                    color: theme.palette.secondary[200],
                    ml: "1rem",
                  }}
                >
                  <TravelExploreIcon />
                </ListItemIcon>
                <Typography>Dark Web Monitoring</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate(
                          "/admin/actions/dark-web-monitoring/dark-web-mentions"
                        )
                      }
                      sx={{
                        backgroundColor:
                          active === "dark-web-monitoring/dark-web-mentions"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === "dark-web-monitoring/dark-web-mentions"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active === "dark-web-monitoring/dark-web-mentions"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <Policy />
                      </ListItemIcon>
                      <ListItemText
                        primary="Dark Web Mentions"
                        sx={{ pl: 2 }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate(
                          "/admin/actions/dark-web-monitoring/leaked-credentials"
                        )
                      }
                      sx={{
                        backgroundColor:
                          active === "dark-web-monitoring/leaked-credentials"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === "dark-web-monitoring/leaked-credentials"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active === "dark-web-monitoring/leaked-credentials"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <ReportProblem />
                      </ListItemIcon>
                      <ListItemText
                        primary="leaked Credentials"
                        sx={{ pl: 2 }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <br />

            {/* Detections */}
            <Accordion
              sx={{
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                "&.Mui-expanded": {
                  backgroundColor: theme.palette.background.alt,
                },
                "& .MuiAccordionSummary-root": {
                  padding: "0 2rem",
                },
                "& .MuiAccordionDetails-root": {
                  padding: 0,
                },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <ListItemIcon
                  sx={{
                    color: theme.palette.secondary[200],
                    ml: "1rem",
                  }}
                >
                  <PinchIcon />
                </ListItemIcon>
                <Typography>Detections</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate(
                          "/admin/actions/detections/drxdr-detections"
                        )
                      }
                      sx={{
                        backgroundColor:
                          active === "detections/drxdr-detections"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === "detections/drxdr-detections"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active === "detections/drxdr-detections"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <Policy />
                      </ListItemIcon>
                      <ListItemText
                        primary="EDR / XDR Detections"
                        sx={{ pl: 2 }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() =>
                        handleNavigate(
                          "/admin/actions/detections/ndr-detections"
                        )
                      }
                      sx={{
                        backgroundColor:
                          active === "detections/ndr-detections"
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === "detections/ndr-detections"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "3rem",
                          color:
                            active === "detections/ndr-detections"
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        <ReportProblem />
                      </ListItemIcon>
                      <ListItemText primary="NDR Detections" sx={{ pl: 2 }} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
            <br />

            {/* Account Take Over */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  handleNavigate("/admin/actions/account-take-over")
                }
                sx={{
                  backgroundColor:
                    active === "account-take-over"
                      ? theme.palette.secondary[300]
                      : "transparent",
                  color:
                    active === "account-take-over"
                      ? theme.palette.primary[600]
                      : theme.palette.secondary[100],
                }}
              >
                <ListItemIcon
                  sx={{
                    ml: "2rem",
                    color:
                      active === "account-take-over"
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[200],
                  }}
                >
                  <BorderColorOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Account take over"
                  sx={{ textAlign: "start" }}
                />
                {active === "account-take-over" && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                )}
              </ListItemButton>
            </ListItem>
            <br />

            {/* Attack Surface */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigate("/attack-surface")}
                sx={{
                  backgroundColor:
                    active === "Attack Surface"
                      ? theme.palette.secondary[300]
                      : "transparent",
                  color:
                    active === "Attack Surface"
                      ? theme.palette.primary[600]
                      : theme.palette.secondary[100],
                }}
              >
                <ListItemIcon
                  sx={{
                    ml: "2rem",
                    color:
                      active === "Attack Surface"
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[200],
                  }}
                >
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Attack Surface"
                  sx={{ textAlign: "start" }}
                />
                {active === "Attack Surface" && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                )}
              </ListItemButton>
            </ListItem>
            <br />

            {/* Brand Reputation */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  handleNavigate("/admin/actions/brand-reputation")
                }
                sx={{
                  backgroundColor:
                    active === "Brand Reputation"
                      ? theme.palette.secondary[300]
                      : "transparent",
                  color:
                    active === "Brand Reputation"
                      ? theme.palette.primary[600]
                      : theme.palette.secondary[100],
                }}
              >
                <ListItemIcon
                  sx={{
                    ml: "2rem",
                    color:
                      active === "Brand Reputation"
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[200],
                  }}
                >
                  <BrandingWatermarkIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Brand Reputation"
                  sx={{ textAlign: "start" }}
                />
                {active === "Brand Reputation" && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                )}
              </ListItemButton>
            </ListItem>
            <br />

            {/* Vulnerabilities Intelligences */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() =>
                  handleNavigate("/admin/actions/vulnerabilities-intelligences")
                }
                sx={{
                  backgroundColor:
                    active === "Vulnerabilities Intelligences"
                      ? theme.palette.secondary[300]
                      : "transparent",
                  color:
                    active === "Vulnerabilities Intelligences"
                      ? theme.palette.primary[600]
                      : theme.palette.secondary[100],
                }}
              >
                <ListItemIcon
                  sx={{
                    ml: "2rem",
                    color:
                      active === "Vulnerabilities Intelligences"
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[200],
                  }}
                >
                  <BugReportIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Vulnerabilities Intelligences"
                  sx={{ textAlign: "start" }}
                />
                {active === "Vulnerabilities Intelligences" && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                )}
              </ListItemButton>
            </ListItem>
            <br />
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </>
  );
}

export default AdminActions;

import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Drawer,
  IconButton,
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
} from "@mui/material";

import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ExpandMore,
  Public,
  Language,
  Dns,
  Policy,
  ReportProblem,
  Info,
  Warning,
} from "@mui/icons-material";
import profileImage from "../../assets/images/logo.png";

import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import BugReportIcon from "@mui/icons-material/BugReport";
import PinchIcon from "@mui/icons-material/Pinch";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

import { useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import { Context } from "../../context";

const SideBar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const { adminToken } = useContext(Context);

  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];
    setActive(pathname);
  }, [window.location.pathname, adminToken]);

  const handleNavigate = (path) => {
    navigate(path);
    setActive(path);
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              boxShadow: "0 0 4px rgba(0,0,0,0.5)",
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center">
                  <Box
                    component="img"
                    alt="profile"
                    src={profileImage}
                    height="50px"
                    sx={{ objectFit: "cover" }}
                  />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate("/dashboard")}
                  sx={{
                    backgroundColor:
                      active === "dashboard"
                        ? theme.palette.secondary[300]
                        : "transparent",
                    color:
                      active === "dashboard"
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[100],
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                      color:
                        active === "dashboard"
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[200],
                    }}
                  >
                    <HomeOutlined />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dashboard"
                    sx={{ textAlign: "start" }}
                  />
                  {active === "dashboard" && (
                    <ChevronRightOutlined sx={{ ml: "auto" }} />
                  )}
                </ListItemButton>
              </ListItem>

              {/* Assetes */}
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
                        onClick={() => handleNavigate("/assets/ips")}
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
                        onClick={() => handleNavigate("/assets/domains")}
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
                        onClick={() => handleNavigate("/assets/portals")}
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
                          handleNavigate("/threat-intelligence/iocs")
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
                          handleNavigate("/threat-intelligence/apt-feeds")
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
                            "/threat-intelligence/threat-intelligence-feeds"
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
                          handleNavigate("/threat-intelligence/suspicious-ips")
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
                            "/dark-web-monitoring/dark-web-mentions"
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
                            "/dark-web-monitoring/leaked-credentials"
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
                              active ===
                              "dark-web-monitoring/leaked-credentials"
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
                          handleNavigate("/detections/drxdr-detections")
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
                          primary="EDRXDR Detections"
                          sx={{ pl: 2 }}
                        />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() =>
                          handleNavigate("/detections/ndr-detections")
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

              {/* Account Take Over */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate("/account-take-over")}
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

              {/* Brand Reputation */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleNavigate("/brand-reputation")}
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

              {/* Vulnerabilities Intelligences */}
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() =>
                    handleNavigate("/vulnerabilities-intelligences")
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

              {adminToken && (
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigate("/admin/actions")}
                    sx={{
                      backgroundColor:
                        active === "Actions"
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === "Actions"
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === "Actions"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      <ToggleOnOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Actions"
                      sx={{ textAlign: "start" }}
                    />
                    {active === "Actions" && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;

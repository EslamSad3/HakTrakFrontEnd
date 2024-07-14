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
} from "@mui/icons-material";

import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";

import { useNavigate } from "react-router-dom";
import { Context } from "../context";

function AdminActions() {
  const [active, setActive] = useState("");
  const { isLoading } = useContext(Context);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
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
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </>
  );
}

export default AdminActions;

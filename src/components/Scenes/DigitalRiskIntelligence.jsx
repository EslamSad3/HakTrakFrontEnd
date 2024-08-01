import * as React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PublicIcon from "@mui/icons-material/Public";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ShareIcon from "@mui/icons-material/Share";

const data = [
  {
    icon: <StarBorderIcon />,
    title: "Executive Protection",
    status: "NO RISK",
    color: "green",
  },
  {
    icon: <PublicIcon />,
    title: "Situational Awareness*",
    status: "MEDIUM",
    color: "#f8b400",
  },
  {
    icon: <FingerprintIcon />,
    title: "Impersonations",
    status: "NO RISK",
    color: "green",
  },
  {
    icon: <ShareIcon />,
    title: "Social Media",
    status: "NO RISK",
    color: "green",
  },
];

export default function DigitalRiskIntelligence() {
  return (
    <Card
      style={{
        backgroundColor: "#004445",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center">
          Digital Risk Intelligence
        </Typography>
        {data.map((item, index) => (
          <Box key={index} display="flex" alignItems="center" mt={2}>
            {item.icon}
            <Box
              ml={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                color: "#fff",
              }}
            >
              <Typography variant="body1">{item.title}</Typography>
              <Chip
                label={item.status}
                style={{ backgroundColor: item.color, color: "#fff" }}
              />
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

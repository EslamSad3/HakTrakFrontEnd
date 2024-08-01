import * as React from "react";
import { Box, Paper, Typography } from "@mui/material";

const data = [
  {
    percentage: "59%",
    description: "Cybersecurity Trends And Recommendations",
    color: "#d32f2f",
  },
  {
    percentage: "53%",
    description: "Mitigate Legacy Infrastructure Vulnerabilities",
    color: "#e57373",
  },
  {
    percentage: "62%",
    description: "Transparency, Culture Building, and Insider Threats",
    color: "#ffb74d",
  },
  {
    percentage: "68%",
    description: "Compliance and Privacy Regulatory Alignment",
    color: "#ff8a65",
  },
  {
    percentage: "90%",
    description: "Enhance Network Segmentation",
    color: "#ff7043",
  },
];

export default function CybersecurityTrends() {
  return (
    <Box
      p={2}
      sx={{
        padding: "24px",
        backgroundColor: "#247291",
        borderRadius: 4,
        boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Cybersecurity Trends And Recommendations
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          padding: "24px",
        }}
      >
        {data.map((item, index) => (
          <Paper
            key={index}
            style={{
              backgroundColor: item.color,
              padding: "16px",
              flex: 1,
              margin: "0 8px",
            }}
          >
            <Typography variant="h4" style={{ color: "#fff" }}>
              {item.percentage}
            </Typography>
            <Typography variant="body1" style={{ color: "#000" }}>
              {item.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

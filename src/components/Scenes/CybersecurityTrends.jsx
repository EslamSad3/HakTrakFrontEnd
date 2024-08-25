import * as React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";

const data = [
  {
    percentage: "59%",
    description: "Cybersecurity Trends And Recommendations",
    color: "#d32f2f",
    details: "Details about cybersecurity trends and recommendations.",
  },
  {
    percentage: "53%",
    description: "Mitigate Legacy Infrastructure Vulnerabilities",
    color: "#e57373",
    details: "Steps to mitigate vulnerabilities in legacy infrastructure.",
  },
  {
    percentage: "62%",
    description: "Transparency, Culture Building, and Insider Threats",
    color: "#ffb74d",
    details:
      "The importance of transparency and building a culture to prevent insider threats.",
  },
  {
    percentage: "68%",
    description: "Compliance and Privacy Regulatory Alignment",
    color: "#ff8a65",
    details: "Aligning compliance and privacy with regulatory requirements.",
  },
  {
    percentage: "90%",
    description: "Enhance Network Segmentation",
    color: "#ff7043",
    details: "Enhancing network segmentation to improve security.",
  },
];

export default function CybersecurityTrends() {
  const theme = useTheme();

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
      <Typography variant="h5" align="center" mb={"2rem"}>
        Cybersecurity Trends And Recommendations
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {data.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column", // Stacks items vertically on extra-small screens
                sm: "row", // Aligns items horizontally on small and larger screens
              },
              alignItems: "stretch",
            }}
          >
            <Paper
              sx={{
                backgroundColor: item.color,
                padding: "16px",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                marginRight: {
                  xs: 0, // No margin on extra-small screens
                  sm: "16px", // Margin on small and larger screens
                },
                marginBottom: {
                  xs: "16px", // Margin bottom on extra-small screens
                  sm: 0, // No margin bottom on small and larger screens
                },
              }}
            >
              <Typography variant="h4" style={{ color: "#fff" }}>
                {item.percentage}
              </Typography>
              <Typography variant="body1" style={{ color: "#000" }}>
                {item.description}
              </Typography>
            </Paper>
            <Paper
              sx={{
                padding: "16px",
                backgroundColor: item.color,
                flex: {
                  xs: "1 1 100%", // Takes full width on extra-small screens
                  sm: "2", // Takes 2 parts of the available space on small and larger screens
                },
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1">{item.details}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

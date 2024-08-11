import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PublicIcon from "@mui/icons-material/Public";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ShareIcon from "@mui/icons-material/Share";
import { useContext } from "react";
import { Context } from "../../context";

// Define a mapping of indicators to icons
const iconMapping = {
  "executive protection": <StarBorderIcon />,
  "situational awareness": <PublicIcon />,
  impersonations: <FingerprintIcon />,
  "social media": <ShareIcon />,
};

// Define a function to determine the color based on the risk level
const getColorByLevel = (level) => {
  switch (level) {
    case "no risk":
      return "green";
    case "medium":
      return "#f8b400"; // Amber color for medium risk
    case "high":
      return "orange"; // Orange color for high risk
    case "critical":
      return "red"; // Red color for critical risk
    default:
      return "#ccc"; // Default color if none of the levels match
  }
};

export default function DigitalRiskIntelligence() {
  const { digitalRiskIntelligences } = useContext(Context);

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
        {digitalRiskIntelligences.map((item) => (
          <Box key={item._id} display="flex" alignItems="center" mt={2}>
            {iconMapping[item.indicator.toLowerCase()] || <ShareIcon />}
            <Box
              ml={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                color: "#fefefe",
              }}
            >
              <Typography variant="body1">
                {item.indicator.charAt(0).toUpperCase() +
                  item.indicator.slice(1)}
              </Typography>
              <Chip
                label={item.level.toUpperCase()}
                style={{
                  backgroundColor: getColorByLevel(item.level),
                  color: "#fff",
                }}
              />
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  CircularProgress,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const SecurityPostureScore = () => {
  const currentScore = 83;
  const previousScore = 78;
  const isIncrease = currentScore > previousScore;

  return (
    <Card
      sx={{
        backgroundColor: "#c5bdbd",
        color: "#160736",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6">Security Posture Score</Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="h4">{currentScore}%</Typography>
          {isIncrease ? (
            <ArrowUpwardIcon color="success" />
          ) : (
            <ArrowDownwardIcon color="error" />
          )}
          <Typography
            variant="body2"
            color={isIncrease ? "success.main" : "error.main"}
          >
            {isIncrease ? "+" : ""}
          </Typography>
        </Box>
        <CircularProgress
          color="primary"
          determinate
          size="lg"
          value={currentScore}
          variant="outlined"
        />
      </CardContent>
    </Card>
  );
};

export default SecurityPostureScore;

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const SecurityPostureScore = () => {
  const currentScore = 70;
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
        <Box position="relative" display="flex" justifyContent="center" mt={2}>
          <CircularProgress
            color="primary"
            variant="determinate"
            value={currentScore}
            size={250}
            thickness={8}
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
              fontSize: "3rem",
            }}
          >
            B
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SecurityPostureScore;

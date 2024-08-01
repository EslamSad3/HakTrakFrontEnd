import * as React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import PublicIcon from "@mui/icons-material/Public";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ShareIcon from "@mui/icons-material/Share";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "January", TTD: 5, TTR: 8 },
  { name: "February", TTD: 3, TTR: 2.2 },
  { name: "March", TTD: 1, TTR: 1.8 },
];

export default function TrendTimeToDetectRespond() {
  return (
    <Card
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#346357",
      }}
    >
      <CardContent>
        <Typography variant="h6" align="center">
          Digital Risk Intelligence
        </Typography>
        <Box mt={4}>
          <Typography variant="h6" align="center">
            Trend of Time to Detect (TTD) & Time to Respond (TTR)
          </Typography>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="TTD"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="TTR"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Box>
      </CardContent>
    </Card>
  );
}

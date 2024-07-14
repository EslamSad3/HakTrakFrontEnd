import React, { useContext } from "react";
import Header from "../components/Header";
import { Box, Card, CardContent, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Context } from "../context";

function AdminAcions() {
  const { isLoading } = useContext(Context);
const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Admin Actions" />

        {!isLoading ? (
          <Box
            mt="5rem"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="3rem"
            columnGap="3rem"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              width: "100%",
              height: "15rem",
            }}
          >
            {/* Add New Ips */}
            <Card
              sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                cursor: "pointer",
                position: "relative",
                overflow: "visible",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => navigate("/admin/actions/assets/ips")}
            >
              <CardContent>
                <Typography variant="h6" textalign={"center"}>
                  Add New Ips
                </Typography>
              </CardContent>
            </Card>
            {/* Add New Domains */}
            <Card
              sx={{
                backgroundImage: "none",
                backgroundColor: theme.palette.background.alt,
                borderRadius: "0.55rem",
                cursor: "pointer",
                position: "relative",
                overflow: "visible",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => navigate("/admin/actions/assets/domains")}
            >
              <CardContent>
                <Typography variant="h6" textalign={"center"}>
                  Add New Domains
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </>
  );
}

export default AdminAcions;

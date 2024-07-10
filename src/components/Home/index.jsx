import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "../Header";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
function Home() {
  const { ips, isLoading, language } = useContext(Context);

  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header title="Summary" />
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
            {/* assets/ips */}
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
              onClick={() => navigate("/assets/ips")}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "1rem",
                  minWidth: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.neutral.main,
                    boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                    borderRadius: "0.55rem",
                    width: "4rem",
                    height: "4rem",
                    display: "flex",
                    marginRight: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EmojiPeopleOutlinedIcon />
                </Box>

                <Typography
                  sx={{
                    fontSize: 22,
                    position: "absolute",
                  }}
                  top="2rem"
                  right={language === "en" ? "1rem" : ""}
                  left={language === "ar" ? "1rem" : ""}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  Ips
                </Typography>
              </Box>
              <CardContent sx={{ marginTop: "4rem" }}>
                <Typography variant="h3" textalign={"center"}>
                  {ips && ips?.length}
                </Typography>
              </CardContent>
            </Card>

            {/* techs */}

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
              onClick={() => navigate("/technicians")}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "1rem",
                  minWidth: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.success.main,
                    boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                    borderRadius: "0.55rem",
                    width: "4rem",
                    height: "4rem",
                    display: "flex",
                    marginRight: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EngineeringOutlinedIcon />
                </Box>

                <Typography
                  sx={{
                    fontSize: 22,
                    position: "absolute",
                  }}
                  top="2rem"
                  right={language === "en" ? "1rem" : ""}
                  left={language === "ar" ? "1rem" : ""}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  "Technicians"
                </Typography>
              </Box>
              <CardContent sx={{ marginTop: "4rem" }}>
                <Typography variant="h3" textalign={"center"}>
                  test
                </Typography>
              </CardContent>
            </Card>

            {/* Orders */}

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
              onClick={() => navigate("/orders")}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "1rem",
                  minWidth: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.warning.main,
                    boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                    borderRadius: "0.55rem",
                    width: "4rem",
                    height: "4rem",
                    display: "flex",
                    marginRight: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <BorderColorOutlinedIcon />
                </Box>

                <Typography
                  sx={{
                    fontSize: 22,
                    position: "absolute",
                  }}
                  top="2rem"
                  right={language === "en" ? "1rem" : ""}
                  left={language === "ar" ? "1rem" : ""}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  Orders
                </Typography>
              </Box>
              <CardContent textalign="start" sx={{ marginTop: "4rem" }}>
                <Typography variant="h5">test</Typography>
                <Typography variant="h5">test</Typography>
                <Typography variant="h5">test</Typography>
              </CardContent>
            </Card>

            {/* profit */}
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
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "-1.5rem",
                  left: "1rem",
                  minWidth: "80%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.info.main,
                    boxShadow: "1px 1px 5px rgba(0,0,0,1)",
                    borderRadius: "0.55rem",
                    width: "4rem",
                    height: "4rem",
                    display: "flex",
                    marginRight: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AttachMoneyIcon />
                </Box>

                <Typography
                  sx={{
                    fontSize: 22,
                    position: "absolute",
                  }}
                  top="2rem"
                  right={language === "en" ? "1rem" : ""}
                  left={language === "ar" ? "1rem" : ""}
                  color={theme.palette.secondary[200]}
                  gutterBottom
                >
                  profit
                </Typography>
              </Box>
              <CardContent textalign="start" sx={{ marginTop: "4rem" }}>
                <Typography variant="h5">test</Typography>
                <Typography variant="h5">test</Typography>
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

export default Home;

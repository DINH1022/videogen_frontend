import React, { useState } from "react";
import { Box, Typography, Button, Card, Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SmartToyIcon from "@mui/icons-material/SmartToy";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4f46e5",
    },
    background: {
      default: "#faf5ff",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function AIVideoMaker() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 30%, #e0e7ff 100%)",
          py: 8,
          px: 2,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} lg={6}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  {/* Main video preview card */}
                  <Card
                    sx={{
                      width: 600,
                      height: 500,
                      borderRadius: 6,
                      overflow: "hidden",
                      boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                      position: "relative",
                    }}
                  >
                    <Box
                      component="img"
                      src="https://imgv3.clipfly.ai/clipfly/images/side/generate-a-short-video-of-a-boy-skateboarding-with-ai.png"
                      alt="Boy skateboarding"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "transparent",
                      }}
                    />

                    {/* AI Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        left: 16,
                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                        borderRadius: 3,
                        px: 2,
                        py: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        boxShadow: "0 8px 16px rgba(99, 102, 241, 0.4)",
                      }}
                    >
                      <SmartToyIcon sx={{ fontSize: 18, color: "white" }} />
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{ color: "white" }}
                      >
                        AI
                      </Typography>
                    </Box>
                  </Card>
                </Box>

                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      pl: { lg: 4 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h2"
                      component="h1"
                      fontWeight="800"
                      sx={{
                        mb: 4,
                        color: "#0f172a",
                        lineHeight: 1.1,
                        fontSize: { xs: "2.5rem", md: "3rem", lg: "3.5rem" },
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Simple and Automatic AI Short Video Maker
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        mb: 5,
                        color: "#64748b",
                        lineHeight: 1.6,
                        fontSize: "1.125rem",
                        fontWeight: "normal",
                      }}
                    >
                      Clipfly allows you to create captivating short videos with
                      AI. Simply use our{" "}
                      <Typography
                        component="span"
                        sx={{
                          color: "#4f46e5",
                          textDecoration: "underline",
                          fontWeight: "medium",
                          textDecorationColor: "#4f46e5",
                        }}
                      >
                        AI video generator
                      </Typography>{" "}
                      to automatically turn text into short videos or transform
                      your static images into dynamic videos. With a variety of
                      video styles to choose from, your creation process becomes
                      smarter and more convenient.
                    </Typography>

                    <Button
                      variant="contained"
                      sx={{
                        background: "#0f172a",
                        color: "white",
                        px: 6,
                        py: 2.5,
                        borderRadius: 3,
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "1.125rem",
                        boxShadow: "0 12px 24px rgba(15, 23, 42, 0.25)",
                        "&:hover": {
                          background: "#1e293b",
                          boxShadow: "0 16px 32px rgba(15, 23, 42, 0.35)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Make Your Short Video
                    </Button>
                  </Box>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

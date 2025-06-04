import React from "react";
import { Card, CardContent, Typography, Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#e91e63",
    },
    secondary: {
      main: "#f8bbd9",
    },
    background: {
      default: "#fdf2f8",
    },
  },
});

const AIYouTubeShortsSteps = () => {
  const steps = [
    {
      title: "Select Your Content",
      description:
        "Uploading your media assets directly and providing a concise description of your YouTube content.",
      image:
        "https://d1735p3aqhycef.cloudfront.net/topview_blog/replicate-prediction-1a9wxfs1chrga0cjkvnbshdf9g-d5a20fe3.webp",
    },
    {
      title: "Customize with AI Magic",
      description:
        "Utilize AI-powered features like avatars, viral scripts, and smart captions, all based on insights from YouTube ads library.",
      image:
        "https://d1735p3aqhycef.cloudfront.net/topview_blog/replicate-prediction-1h8f6peg7hrgc0cjkvnbj9g3s8-24b893df.webp",
    },
    {
      title: "Edit, Style, and Share",
      description:
        "Topview organizes your clips to fit your chosen script's narrative. Trim, style, and finalize your videos tailored for YouTube.",
      image:
        "https://d1735p3aqhycef.cloudfront.net/topview_blog/replicate-prediction-vnvf2j6wmnrg80cjkvpakgqyr0-8319944c.webp",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "#FFF9F0",
          minHeight: "100vh",
          py: 6,
          px: 2,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              textAlign: "center",
              mb: 6,
              fontWeight: "bold",
              color: "#1a1a1a",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            How to Create Your AI Video Shorts?
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: 4,
              justifyContent: "center",
              alignItems: "stretch",
            }}
          >
            {steps.map((step, index) => (
              <Card
                key={index}
                sx={{
                  flex: 1,
                  maxWidth: { xs: "100%", lg: "400px" },
                  backgroundColor: "#FFFFFF",
                  color: "white",
                  borderRadius: 3,
                  overflow: "hidden",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 40px rgba(233, 30, 99, 0.3)",
                  },
                  border: "2px solid rgba(248, 187, 217, 0.3)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: "bold",
                      mb: 3,
                      textAlign: "center",
                      color: "#f8bbd9",
                    }}
                  >
                    {step.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      lineHeight: 1.6,
                      textAlign: "center",
                      color: "#888888",
                    }}
                  >
                    {step.description}
                  </Typography>

                  <Box
                    sx={{
                      width: "100%",
                      height: 250,
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <Box
                      sx={{
                        display: "none",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        p: 2,
                      }}
                    >
                      {step.title}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AIYouTubeShortsSteps;

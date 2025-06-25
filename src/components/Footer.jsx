import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const GradientBackground = styled(Box)({
  background: "linear-gradient(to right, #fcd5f7, #cfd9ff)",
  minHeight: "30vh",
  height: "5000px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "2rem 10rem",
});

const GradientButton = styled(Button)({
  background: "linear-gradient(to right, #a046ff, #ff3cac)",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "8px",
  fontWeight: "bold",
  marginTop: "2rem",
  textTransform: "none",
  fontSize: "1rem",
  "&:hover": {
    background: "linear-gradient(to right, #8e2de2, #ff3cac)",
  },
});

export default function ClipflyHero() {
  return (
    <GradientBackground>
      <Box maxWidth="md">
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#111111" }}
          gutterBottom
        >
          Try Easy, Smart, and Feature-Rich <br /> Short Video Maker in Clipfly!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Easily create stunning short videos for your various social media
          platforms without any professional skills <br /> or complicated steps.
          Anyone can quickly start their journey of short video creation!
        </Typography>
        <GradientButton>Make Your Short Video</GradientButton>
      </Box>
    </GradientBackground>
  );
}

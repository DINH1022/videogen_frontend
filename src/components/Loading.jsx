import React from "react";
import { Box, CircularProgress, Fade } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";

/**
 * LoadingSpinner component displays a full-screen animated loading indicator
 * with a gradient background, animated dots, and two spinning CircularProgress elements.
 * Used to indicate loading state for the entire application or a major section.
 */

// Animation for the surrounding dots
const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.6;
  }
`;

// Animation for the gradient background
const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Styled components
const LoadingContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f0f4ec",
  backgroundSize: "400% 400%",
  animation: `${gradientShift} 8s ease infinite`,
  zIndex: 9999,
}));

const LoadingContent = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// Dot styled component for animated dots around the spinner
const Dot = styled(Box)(({ delay }) => ({
  position: "absolute",
  width: 12,
  height: 12,
  borderRadius: "50%",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  animation: `${pulse} 2s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}));

const LoadingSpinner = () => {
  // Generate 8 animated dots around the main spinner
  const dots = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 360) / 8;
    const radius = 60;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    return (
      <Dot
        key={i}
        delay={i * 0.2}
        sx={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  });

  return (
    <Fade in={true} timeout={600}>
      <LoadingContainer>
        <LoadingContent>
          {/* Main spinner */}
          <CircularProgress
            size={80}
            thickness={2}
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />

          {/* Secondary spinner rotating in the opposite direction */}
          <CircularProgress
            size={60}
            thickness={3}
            sx={{
              position: "absolute",
              color: "rgba(255, 255, 255, 0.6)",
              transform: "rotate(180deg)",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />

          {/* Animated dots around the spinner */}
          {dots}

          {/* Center dot */}
          <Box
            sx={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
            }}
          />
        </LoadingContent>
      </LoadingContainer>
    </Fade>
  );
};

export default LoadingSpinner;

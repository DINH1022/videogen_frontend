import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/**
 * ScrollingGradientComponent (NightSkyScroll) displays a multi-section scrollable page
 * with a dynamic background gradient that darkens as the user scrolls, and animated stars
 * that appear and move with parallax effect. The final section features a glowing title,
 * subtitle, and a call-to-action button, all animated based on scroll progress.
 *
 * - Star: Renders a single star with custom style.
 * - StarField: Renders multiple stars with parallax and twinkle animation.
 * - NightSkyScroll: Main component handling scroll, background, and content sections.
 */
const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Component for rendering a single star
const Star = ({ style }) => (
  <div
    style={{
      position: "absolute",
      width: "2px",
      height: "2px",
      backgroundColor: "white",
      borderRadius: "50%",
      ...style,
    }}
  />
);

// Component for rendering multiple stars with parallax and twinkle
const StarField = ({ scrollProgress, opacity, scrollY }) => {
  const stars = [];
  for (let i = 0; i < 80; i++) {
    const delay = Math.random() * 3;
    const duration = 2 + Math.random() * 3;
    const size = Math.random() * 3 + 1;
    // Parallax speed for each star
    const parallaxSpeed = 0.2 + Math.random() * 0.1; // From 0.2 to 0.3

    stars.push(
      <Star
        key={i}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: opacity * (0.4 + Math.random() * 0.6),
          animation: `twinkle ${duration}s infinite ${delay}s`,
          // Parallax movement based on scroll
          transform: `translateY(${scrollY * parallaxSpeed * 0.5}px)`,
          transition: "transform 0.1s linear", // Smooth transition for parallax
        }}
      />
    );
  }
  return <>{stars}</>;
};

export default function NightSkyScroll() {
  // Track scroll progress (0 to 1)
  const [scrollProgress, setScrollProgress] = useState(0);
  // Track vertical scroll position
  const [scrollY, setScrollY] = useState(0);

  // Update scroll progress and Y position on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;

      setScrollProgress(Math.min(progress, 1));
      setScrollY(scrollTop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute background gradient based on scroll progress
  const getBackgroundGradient = () => {
    const darknessProgress = Math.pow(scrollProgress, 1.5);

    // Calculate RGB values for gradient
    const r = Math.floor(255 * (1 - darknessProgress));
    const g = Math.floor(255 * (1 - darknessProgress));
    const b = Math.floor(255 * (1 - darknessProgress * 0.8));

    return `
      radial-gradient(ellipse at center top, 
        rgb(${Math.min(r + 20, 255)}, ${Math.min(g + 20, 255)}, ${Math.min(
      b + 40,
      255
    )}) 0%,
        rgb(${r}, ${g}, ${b}) 50%,
        rgb(${Math.max(r - 10, 0)}, ${Math.max(g - 10, 0)}, ${Math.max(
      b - 5,
      0
    )}) 100%
      )
    `;
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "400vh",
          background: getBackgroundGradient(),
          transition: "background 0.1s ease-out",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* CSS Animation for stars and text */}
        <style>
          {`
            @keyframes twinkle {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes glow {
              0%, 100% { 
                text-shadow: 0 0 20px rgba(255,255,255,0.3);
              }
              50% { 
                text-shadow: 0 0 30px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4);
              }
            }
          `}
        </style>

        {/* Star Field appears as user scrolls down */}
        {scrollProgress > 0.2 && (
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              zIndex: 1,
              willChange: "transform",
            }}
          >
            <StarField
              scrollProgress={scrollProgress}
              scrollY={scrollY}
              opacity={Math.min((scrollProgress - 0.2) * 1.5, 1)}
            />
          </Box>
        )}

        {/* Main scrollable content sections */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          {/* Section 1: White */}
          <Box sx={{ height: "100vh" }}></Box>
          {/* Section 2: Transition */}
          <Box sx={{ height: "100vh" }}></Box>
          {/* Section 3: Night sky */}
          <Box sx={{ height: "100vh" }}></Box>
          <Box sx={{ height: "100vh" }}></Box>
          {/* Section 4: Ending with call-to-action */}
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              position: "relative",
            }}
          >
            {/* Background Radial Gradient Effect */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 50% 50%, 
                  rgba(63, 81, 181, 0.15) 0%, 
                  rgba(25, 25, 112, 0.25) 50%, 
                  rgba(0, 0, 0, 0.4) 100%)`,
                opacity: Math.max(0, (scrollProgress - 0.6) * 2.5),
                transition: "opacity 0.3s ease",
                zIndex: -1,
              }}
            />

            <Box
              sx={{
                animation:
                  scrollProgress > 0.85
                    ? "float 4s ease-in-out infinite"
                    : "none",
                opacity: Math.max(0, (scrollProgress - 0.7) * 3),
                transform: `translateY(${Math.max(
                  0,
                  (0.8 - scrollProgress) * 80
                )}px)`,
                transition: "all 0.3s ease",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  mb: 4,
                  background: "linear-gradient(45deg, #fff, #e3f2fd, #bbdefb)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation:
                    scrollProgress > 0.9
                      ? "glow 3s ease-in-out infinite"
                      : "none",
                }}
              >
                ✨ Short video AI ✨
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  color: "#e1f5fe",
                  fontWeight: 300,
                  mb: 4,
                  fontStyle: "italic",
                  opacity: Math.max(0, (scrollProgress - 0.75) * 4),
                }}
              >
                "Where technology meets dreams"
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.25))",
                  backdropFilter: "blur(10px)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  color: "white",
                  px: 4,
                  py: 2,
                  borderRadius: "30px",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "0 8px 32px rgba(255,255,255,0.1)",
                  opacity: Math.max(0, (scrollProgress - 0.8) * 5),
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.35))",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 40px rgba(255,255,255,0.2)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                GET STARTED
              </Button>
            </Box>

            {/* Decorative footer text */}
            <Box
              sx={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                opacity: Math.max(0, (scrollProgress - 0.9) * 10),
                transition: "opacity 0.3s ease",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.9rem",
                }}
              >
                🌙 Start your journey with Adaline 🌙
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

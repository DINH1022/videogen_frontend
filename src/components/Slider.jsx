// import React from "react";
// import {
//   Box,
//   Typography,
//   Container,
//   ThemeProvider,
//   createTheme,
//   CssBaseline,
// } from "@mui/material";

// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#6366f1",
//     },
//     background: {
//       default: "#ffffff",
//       paper: "#1a1a1a",
//     },
//     text: {
//       primary: "#ffffff",
//       secondary: "#rgba(234, 229, 229, 0.97)",
//     },
//   },
//   typography: {
//     fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
//     h1: {
//       fontSize: "4rem",
//       fontWeight: 800,
//       letterSpacing: "-0.02em",
//       lineHeight: 1.1,
//       "@media (max-width:960px)": {
//         fontSize: "3rem",
//       },
//       "@media (max-width:600px)": {
//         fontSize: "2.5rem",
//       },
//     },
//     h2: {
//       fontSize: "1.5rem",
//       fontWeight: 400,
//       lineHeight: 1.4,
//       "@media (max-width:600px)": {
//         fontSize: "1.25rem",
//       },
//     },
//   },
// });

// export default function AIVideoGeneratorPage() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         sx={{
//           borderRadius: "0 0 40px 40px",
//           position: "relative",
//           width: "100%",
//           minHeight: "100vh",
//           overflow: "hidden",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         {/* Background Video */}
//         <Box
//           component="video"
//           autoPlay
//           muted
//           loop
//           playsInline
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             zIndex: -2,
//           }}
//         >
//           <source
//             src="https://cdn-site-assets.veed.io/TTV_All_Desktop_31c1f2b433/TTV_All_Desktop_31c1f2b433.mp4"
//             type="video/mp4"
//           />
//         </Box>

//         {/* Overlay */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.3)",
//             zIndex: -1,
//           }}
//         />

//         {/* Content */}
//         <Container maxWidth="lg">
//           <Box
//             sx={{
//               textAlign: "center",
//               zIndex: 1,
//               position: "relative",
//             }}
//           >
//             <Typography
//               variant="h1"
//               sx={{
//                 mb: 3,
//                 background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
//               }}
//             >
//               AI VIDEO GENERATOR
//             </Typography>

//             <Typography
//               variant="h2"
//               sx={{
//                 maxWidth: "800px",
//                 mx: "auto",
//                 color: "rgba(255, 255, 255, 0.9)",
//                 textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
//                 px: 2,
//               }}
//             >
//               Turn text into video in seconds. Customize your video using our
//               online editor
//             </Typography>
//           </Box>
//         </Container>

//         {/* Animated Elements */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: "20%",
//             left: "10%",
//             width: "60px",
//             height: "60px",
//             background:
//               "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
//             borderRadius: "50%",
//             animation: "float 6s ease-in-out infinite",
//             "@keyframes float": {
//               "0%, 100%": {
//                 transform: "translateY(0px)",
//               },
//               "50%": {
//                 transform: "translateY(-20px)",
//               },
//             },
//           }}
//         />

//         <Box
//           sx={{
//             position: "absolute",
//             top: "60%",
//             right: "15%",
//             width: "40px",
//             height: "40px",
//             background:
//               "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
//             borderRadius: "50%",
//             animation: "float 4s ease-in-out infinite 2s",
//             "@keyframes float": {
//               "0%, 100%": {
//                 transform: "translateY(0px)",
//               },
//               "50%": {
//                 transform: "translateY(-15px)",
//               },
//             },
//           }}
//         />

//         <Box
//           sx={{
//             position: "absolute",
//             bottom: "20%",
//             left: "20%",
//             width: "80px",
//             height: "80px",
//             background:
//               "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)",
//             borderRadius: "50%",
//             animation: "float 5s ease-in-out infinite 1s",
//             "@keyframes float": {
//               "0%, 100%": {
//                 transform: "translateY(0px)",
//               },
//               "50%": {
//                 transform: "translateY(-25px)",
//               },
//             },
//           }}
//         />
//       </Box>
//     </ThemeProvider>
//   );
// }

import React from "react";
import {
  Box,
  Typography,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Grow,
  Button,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6366f1",
    },
    background: {
      default: "#ffffff",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#rgba(234, 229, 229, 0.97)",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: "4rem",
      fontWeight: 800,
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
      "@media (max-width:960px)": {
        fontSize: "3rem",
      },
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.4,
      "@media (max-width:600px)": {
        fontSize: "1.25rem",
      },
    },
  },
});

export default function AIVideoGeneratorPage() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          borderRadius: "0 0 40px 40px",
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background Video */}
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -2,
            filter: "brightness(1.3) contrast(1.1)",
          }}
        >
          <source
            src="https://cdn-site-assets.veed.io/TTV_All_Desktop_31c1f2b433/TTV_All_Desktop_31c1f2b433.mp4"
            type="video/mp4"
          />
        </Box>

        {/* Light Overlay - reduced opacity for brighter effect */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.15)",
            background:
              "linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%)",
            zIndex: -1,
          }}
        />

        {/* Content */}
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: "center",
              zIndex: 1,
              position: "relative",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 3,
                background: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))",
              }}
            >
              AI VIDEO GENERATOR
            </Typography>

            <Typography
              variant="h2"
              sx={{
                maxWidth: "800px",
                mx: "auto",
                color: "rgba(255, 255, 255, 0.95)",
                textShadow:
                  "0 2px 10px rgba(0, 0, 0, 0.6), 0 1px 5px rgba(255, 255, 255, 0.1)",
                px: 2,
                filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))",
              }}
            >
              Turn text into video in seconds. Customize your video using our
              online editor
            </Typography>

            <Grow in timeout={1600}>
              <Box mb={6} mt={6}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/create-video")}
                  startIcon={<PlayArrow />}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: "1.2rem",
                    borderRadius: "50px",
                    background:
                      "linear-gradient(45deg,rgb(139, 157, 236),rgb(145, 74, 216))",
                    boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                      background: "linear-gradient(45deg, #764ba2, #667eea)",
                    },
                  }}
                >
                  Bắt đầu tạo video
                </Button>
              </Box>
            </Grow>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

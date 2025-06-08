import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import { ArrowBack, ArrowForward, Folder, Save } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Resource from "../components/Resource";
import ScriptGenerator from "../components/ScriptGenerator";
import VoiceGenerator from "../components/VoiceGenerator";
import Navigation from "../components/Navigation";
// Styled components for gradient background
const GradientCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
  border: "1px solid #bbdefb",
  marginBottom: theme.spacing(3),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  textTransform: "none",
  borderRadius: theme.spacing(1),
}));

const CreateVideo = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState("content");
  const { id: workspace_id } = useParams();

  const scriptRef = useRef(null);
  const voiceRef = useRef(null);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
      <Navigation />
      {activeStep === "content" && (
        <Container
          maxWidth="lg"
          sx={{ py: 3, px: { xs: 2, md: 3, lg: 3 }, mt: 10 }}
        >
          <GradientCard>
            <CardHeader
              sx={{ pb: 1 }}
              title={
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() => navigate("/homepage")}
                      sx={{ mr: 1, p: 0.5 }}
                      size="small"
                    >
                      <ArrowBack />
                    </IconButton>
                    <Box>
                      <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontWeight: 600,
                        }}
                      >
                        <Folder sx={{ color: "#9c27b0" }} />
                        Tạo Video Mới
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        Tạo kịch bản và cấu hình giọng nói cho video của bạn
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <StyledButton
                    variant="outlined"
                    fullWidth
                    onClick={() => scrollToSection(scriptRef)}
                    sx={{
                      color: "#1976d2",
                      borderColor: "#1976d2",
                      "&:hover": {
                        borderColor: "#1565c0",
                        bgcolor: "rgba(25, 118, 210, 0.04)",
                      },
                    }}
                  >
                    Kịch bản
                  </StyledButton>
                </Grid>
                <Grid item xs={6}>
                  <StyledButton
                    variant="outlined"
                    fullWidth
                    onClick={() => scrollToSection(voiceRef)}
                    sx={{
                      color: "#1976d2",
                      borderColor: "#1976d2",
                      "&:hover": {
                        borderColor: "#1565c0",
                        bgcolor: "rgba(25, 118, 210, 0.04)",
                      },
                    }}
                  >
                    Giọng nói
                  </StyledButton>
                </Grid>
              </Grid>
            </CardContent>
          </GradientCard>

          <Box sx={{ mb: 4 }}>
            <Box ref={scriptRef}>
              <Card sx={{ boxShadow: 2 }}>
                <CardHeader
                  title={
                    <Typography
                      variant="h6"
                      component="h2"
                      fontWeight={600}
                      ml={2}
                    >
                      Tạo kịch bản
                    </Typography>
                  }
                  subheader={
                    <Typography variant="body2" color="text.secondary" ml={2}>
                      Nhập chủ đề khoa học hoặc chọn từ danh sách gợi ý
                    </Typography>
                  }
                />
                <CardContent>
                  <Box
                    sx={{
                      borderRadius: 1,
                      textAlign: "center",
                    }}
                  >
                    <Typography color="text.secondary">
                      <ScriptGenerator />
                    </Typography>
                  </Box>
                  {/* <ScriptGenerator workspace_id={workspace_id ?? ""} /> */}
                </CardContent>
              </Card>
            </Box>

            <Box ref={voiceRef} sx={{ mt: 4 }}>
              <Card sx={{ boxShadow: 2 }}>
                <CardHeader
                  title={
                    <Typography
                      variant="h6"
                      component="h2"
                      fontWeight={600}
                      ml={2}
                    >
                      Cấu hình giọng nói
                    </Typography>
                  }
                  subheader={
                    <Typography variant="body2" color="text.secondary" ml={2}>
                      Lựa chọn và tùy chỉnh giọng nói cho video của bạn
                    </Typography>
                  }
                />
                <CardContent>
                  <Box
                    sx={{
                      px: 2,
                    }}
                  >
                    <Typography color="text.secondary">
                      <VoiceGenerator />
                    </Typography>
                  </Box>
                  {/* <VoiceConfig workspace_id={workspace_id ?? ""} /> */}
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => setActiveStep("generate")}
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: "#1976d2",
                  "&:hover": {
                    bgcolor: "#1565c0",
                  },
                  px: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                Tiếp tục
              </Button>
            </Box>
          </Box>
        </Container>
      )}

      {activeStep === "generate" && (
        <Container
          maxWidth="xl"
          sx={{
            maxWidth: "1200px",
            textAlign: "center",
            bgcolor: "white",
            mt: 10,
          }}
        >
          <Resource />

          {/* <Resource workspace_id={workspace_id} /> */}
        </Container>
      )}
    </Box>
  );
};

export default CreateVideo;

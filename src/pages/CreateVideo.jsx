import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Divider,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Tooltip,
  Container,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Avatar,
  Fab,
  AppBar,
  Toolbar,
} from "@mui/material";
import {
  TrendingUp,
  AutoAwesome,
  RecordVoiceOver,
  ImageSearch,
  Subtitles,
  PlayArrow,
  CheckCircleOutline,
  Download,
  Edit,
  Save,
  Refresh,
  InsertEmoticon,
  MusicNote,
  TextFields,
  Close,
  Add,
  HelpOutline,
} from "@mui/icons-material";
import Navigation from "../components/Navigation";
import ScriptGenerator from "../components/ScriptGenerator";
import VoiceGenerator from "../components/VoiceGenerator";
import ImageGenerator from "../components/ImageGenerator";
// Mock data for voice options
// Steps in the video creation workflow
const steps = [
  { label: "Kịch bản", icon: <TrendingUp /> },
  { label: "Sinh kịch bản từ AI", icon: <AutoAwesome /> },
  { label: "Tạo giọng đọc", icon: <RecordVoiceOver /> },
  { label: "Chọn hình nền", icon: <ImageSearch /> },
  { label: "Chèn phụ đề", icon: <Subtitles /> },
  { label: "Xem trước và tải video", icon: <PlayArrow /> },
];

export default function VideoCreator() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [selectedBackground, setSelectedBackground] = useState(null);

  // Preview video state
  const [previewReady, setPreviewReady] = useState(false);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Render different content based on current step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        // return <ScriptGenerator />;
        // return <VoiceGenerator />;
        return <ImageGenerator />;

      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Kịch bản được tạo bởi AI
            </Typography>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Chọn giọng đọc
            </Typography>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Chọn hình nền cho video
            </Typography>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Tùy chỉnh phụ đề
            </Typography>
          </Box>
        );

      case 5:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Xem trước và tải video
            </Typography>
          </Box>
        );

      default:
        return "Bước không xác định";
    }
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 4, mt: "40px", bgcolor: "#f5f5f5" }}>
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          sx={{ mb: 4 }}
        >
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              <MusicNote sx={{ mr: 1, verticalAlign: "middle" }} />
              AI Short Video Creator
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button startIcon={<Save />}>Lưu dự án</Button>
              <Tooltip title="Trợ giúp">
                <IconButton>
                  <HelpOutline />
                </IconButton>
              </Tooltip>
            </Stack>
          </Toolbar>
        </AppBar>

        <Paper elevation={3} sx={{ px: 4, py: 3, mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel
                  StepIconComponent={() => (
                    <Avatar
                      sx={{
                        bgcolor:
                          activeStep === index
                            ? "primary.main"
                            : activeStep > index
                            ? "success.main"
                            : "grey.300",
                        width: 40,
                        height: 40,
                      }}
                    >
                      {step.icon}
                    </Avatar>
                  )}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          {getStepContent(activeStep)}

          {isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0 || isLoading}
              onClick={handleBack}
            >
              Quay lại
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleOutline />}
                onClick={() => {
                  // Handle completion
                }}
                disabled={isLoading || !previewReady}
              >
                Hoàn thành
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled={
                  isLoading ||
                  (activeStep === 0 && !keyword && !selectedTrend) ||
                  (activeStep === 2 && !selectedVoice) ||
                  (activeStep === 3 && !selectedBackground)
                }
              >
                {activeStep === steps.length - 2 ? "Tạo video" : "Tiếp theo"}
              </Button>
            )}
          </Box>
        </Paper>

        {/* Video History Section */}
        {activeStep === steps.length - 1 && previewReady && (
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Video đã tạo gần đây
            </Typography>

            <Grid container spacing={2}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="240"
                      image={`/api/placeholder/240/420`}
                      alt={`Video ${item}`}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {item === 1 ? keyword : `Video mẫu ${item}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date().toLocaleDateString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Fab button for help */}
        <Fab color="primary" sx={{ position: "fixed", bottom: 20, right: 20 }}>
          <HelpOutline />
        </Fab>
      </Container>
    </>
  );
}

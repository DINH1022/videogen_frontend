import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Add this import
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Chip,
} from "@mui/material";
import {
  ArrowBack,
  PlayCircle,
  Folder,
  Description,
  Schedule,
  Image as ImageIcon,
} from "@mui/icons-material";

const Resource = ({ workspace_id = "sample-89sdfukshdf" }) => {
  const navigate = useNavigate(); // Add this hook

  const audioRef = useRef(null);
  const [images, setImages] = useState([]);
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [imageTimings, setImageTimings] = useState([]);

  // Simulate API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock data - 5 sample images
        const mockImages = [
          "https://th.bing.com/th/id/OIP.y7t2x8MCNy1gBCGd7UAqkAHaEK?rs=1&pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.W2cHfeMBthAIh26hFV_sswHaFj?w=1681&h=1261&rs=1&pid=ImgDetMain",
          "https://th.bing.com/th/id/R.1b53fdf36f8bd376916821e3cce7528d?rik=5BBNceKgjdNNuw&pid=ImgRaw&r=0",
          "https://th.bing.com/th/id/OIP.DRstJ2S75KhAniwDSRFh8AHaFj?w=1920&h=1440&rs=1&pid=ImgDetMain",
          "https://th.bing.com/th/id/OIP.wpiMpWT8tPG7uu2cZW8xDwAAAA?w=474&h=315&rs=1&pid=ImgDetMain",
        ];

        // Mock audio URL
        const mockAudioUrl =
          "https://res.cloudinary.com/dpystprxq/video/upload/v1749478605/ttsmaker-file-2025-6-9-21-15-49_pfhyut.mp3";

        setImages(mockImages);
        setAudioUrl(mockAudioUrl);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workspace_id]);

  // Calculate image timings based on actual audio duration
  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      setAudioDuration(duration);

      // Divide audio duration equally among images
      const timePerImage = duration / images.length;
      const timings = images.map((_, index) => ({
        startTime: index * timePerImage,
        endTime: (index + 1) * timePerImage,
        imageIndex: index,
      }));

      setImageTimings(timings);
      console.log("Audio duration:", duration);
      console.log("Image timings:", timings);
    }
  };

  const handleNavigateBack = () => {
    console.log("Navigate back to homepage");
  };

  const handleGenerateVideo = () => {
    // Navigate to editor with state similar to your example
    navigate(`/workspace/${workspace_id}/editor`, {
      state: {
        resourceList: images, // Pass the images array as resourceList
        timing: imageTimings, // Pass the calculated timings
        audioUrl: audioUrl, // Pass the audio URL
        workspaceId: workspace_id, // Pass the workspace ID
      },
    });
  };

  const handleGenerateResource = () => {
    console.log("Generate additional resources");
  };

  if (loading) {
    return (
      <Container
        maxWidth={false}
        sx={{ py: 6, display: "flex", justifyContent: "center", px: 2 }}
      >
        <CircularProgress size={48} sx={{ color: "#7c3aed" }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth={false} sx={{ py: 6, px: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Error</Typography>
          <Typography>{error}</Typography>
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={handleNavigateBack}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 3,
        mt: 4,
        px: 3,
        width: "100%",
      }}
    >
      {/* Header Card */}
      <Card
        sx={{
          background: "linear-gradient(to right, #dbeafe, #f3e8ff)",
          border: "1px solid #93c5fd",
          mb: 5,
          width: "100%",
          maxWidth: "none",
        }}
      >
        <CardHeader
          title={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="text"
                  onClick={handleNavigateBack}
                  sx={{ mr: 1, minWidth: "auto", p: 0.5 }}
                >
                  <ArrowBack />
                </Button>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Folder sx={{ color: "#7c3aed" }} />
                    Quản lý tài nguyên
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Xem và chỉnh sửa tài nguyên cho video này
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<PlayCircle />}
                onClick={handleGenerateVideo}
                sx={{
                  bgcolor: "#2563eb",
                  "&:hover": { bgcolor: "#1d4ed8" },
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                Generate video
              </Button>
            </Box>
          }
          sx={{ pb: 3 }}
        />
        <CardContent sx={{ pt: 0 }}>
          {audioUrl && (
            <audio
              ref={audioRef}
              controls
              style={{ width: "100%" }}
              onLoadedMetadata={handleAudioLoadedMetadata}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}
        </CardContent>
      </Card>

      {/* Main Content Card */}
      <Card sx={{ width: "100%", maxWidth: "none" }}>
        <CardHeader
          title="Danh sách tài nguyên"
          subheader={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Xem các hình ảnh được chia theo timeline của audio
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Description />}
                onClick={handleGenerateResource}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                Generate resource
              </Button>
            </Box>
          }
        />
        <CardContent sx={{ p: 2 }}>
          {images.length > 0 ? (
            <Box sx={{ width: "100%" }}>
              {images.map((imageUrl, index) => {
                const timing = imageTimings[index];
                return (
                  <Paper
                    key={index}
                    elevation={2}
                    sx={{
                      p: 4,
                      mb: 10,
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "stretch",
                        gap: 7,
                        width: "100%",
                        flexDirection: { xs: "column", lg: "row" },
                      }}
                    >
                      {/* Image Section - Larger and more prominent */}
                      <Box
                        sx={{
                          flex: { xs: "1 1 100%", lg: "1 1 60%" },
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          minHeight: { xs: "300px", md: "500px" },
                          maxHeight: "600px",
                          overflow: "hidden",
                          borderRadius: 2,
                          border: "2px solid #e5e7eb",
                          bgcolor: "#f8fafc",
                        }}
                      >
                        <Box
                          component="img"
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 1,
                            objectFit: "cover",
                            cursor: "pointer",
                            transition: "transform 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.02)",
                            },
                          }}
                          onError={(e) => {
                            console.error(`Failed to load image ${index + 1}`);
                            e.target.style.display = "none";
                          }}
                        />
                      </Box>

                      {/* Info Section - Optimized width */}
                      <Box
                        sx={{
                          flex: { xs: "1 1 100%", lg: "1 1 40%" },
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          minHeight: { xs: "auto", lg: "500px" },
                          width: "100%",
                        }}
                      >
                        {/* Image Title */}
                        <Box
                          sx={{
                            mb: 4,
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 2,
                              color: "#1976d2",
                              fontWeight: "bold",
                            }}
                          >
                            <ImageIcon sx={{ fontSize: 32 }} />
                            Hình ảnh {index + 1}
                          </Typography>
                          <Chip
                            label={`Slide ${index + 1}/${images.length}`}
                            size="large"
                            color="primary"
                            variant="outlined"
                            sx={{ fontSize: "1rem", px: 2, py: 1 }}
                          />
                        </Box>

                        {/* Timeline Section */}
                        {audioDuration > 0 && timing && (
                          <Box
                            sx={{
                              p: 3,
                              bgcolor: "#f8fafc",
                              borderRadius: 3,
                              border: "2px solid #e2e8f0",
                              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                              width: "100%",
                            }}
                          >
                            <Typography
                              variant="h5"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 4,
                                color: "#475569",
                                fontWeight: 600,
                              }}
                            >
                              <Schedule fontSize="large" />
                              Timeline
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                              <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ mb: 1, fontWeight: 500 }}
                              >
                                Thời gian bắt đầu:
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ fontWeight: 700, color: "#059669" }}
                              >
                                {timing.startTime.toFixed(1)}s
                              </Typography>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                              <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ mb: 1, fontWeight: 500 }}
                              >
                                Thời gian kết thúc:
                              </Typography>
                              <Typography
                                variant="h4"
                                sx={{ fontWeight: 700, color: "#dc2626" }}
                              >
                                {timing.endTime.toFixed(1)}s
                              </Typography>
                            </Box>

                            <Box
                              sx={{
                                p: 2,
                                bgcolor: "#dbeafe",
                                borderRadius: 2,
                                border: "2px solid #93c5fd",
                              }}
                            >
                              <Typography
                                variant="h6"
                                color="text.secondary"
                                sx={{ mb: 1, fontWeight: 500 }}
                              >
                                Thời lượng hiển thị:
                              </Typography>
                              <Typography
                                variant="h3"
                                sx={{ fontWeight: 700, color: "#1976d2" }}
                              >
                                {(timing.endTime - timing.startTime).toFixed(1)}
                                s
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: 12,
                border: "2px dashed #d1d5db",
                borderRadius: 2,
              }}
            >
              <Folder sx={{ fontSize: 48, color: "#9ca3af", mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Không tìm thấy tài nguyên
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Hãy tạo tài nguyên để bắt đầu
              </Typography>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={handleNavigateBack}
              >
                Quay lại trang chủ
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Debug Info */}
      {audioDuration > 0 && (
        <Box sx={{ mt: 2, p: 2, bgcolor: "#f3f4f6", borderRadius: 1 }}>
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
            Debug: Audio Duration = {audioDuration.toFixed(2)}s | Images ={" "}
            {images.length} | Time per image ={" "}
            {(audioDuration / images.length).toFixed(2)}s
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Resource;

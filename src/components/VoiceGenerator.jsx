import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Tabs,
  Tab,
  Paper,
  Alert,
  CircularProgress,
  IconButton,
  LinearProgress,
  Chip,
  Stack,
  Fade,
  Zoom,
} from "@mui/material";
import {
  VolumeUp,
  Upload,
  Close,
  CloudUpload,
  AudioFile,
  Settings,
  PlayArrow,
  Download,
  CheckCircle,
  Mic,
  SmartToy,
} from "@mui/icons-material";

const voiceProviders = [
  {
    id: "edge_tts",
    name: "Edge TTS",
    voices: [
      { id: "female", name: "Nữ" },
      { id: "male", name: "Nam" },
    ],
  },
  {
    id: "gtts",
    name: "Google TTS",
    voices: [{ id: "default", name: "Mặc định" }],
  },
];

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`voice-tabpanel-${index}`}
      aria-labelledby={`voice-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Fade in={value === index} timeout={300}>
          <Box sx={{ p: 3 }}>{children}</Box>
        </Fade>
      )}
    </div>
  );
}

export default function VoiceGenerator({ workspace_id }) {
  const [provider, setProvider] = useState("gtts");
  const [voice, setVoice] = useState("default");
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [intensity, setIntensity] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showAudioPreview, setShowAudioPreview] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [selectedVoiceFile, setSelectedVoiceFile] = useState(null);
  const [isUploadingVoice, setIsUploadingVoice] = useState(false);
  const [uploadVoiceError, setUploadVoiceError] = useState(null);
  const [uploadedVoiceUrl, setUploadedVoiceUrl] = useState(null);
  const [audioTimestamp, setAudioTimestamp] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef(null);
  const scriptId = "demo-script-id";

  const selectedProvider = voiceProviders.find((p) => p.id === provider);

  useEffect(() => {
    const fetchAudioData = async () => {
      try {
        setLoading(true);
        setError(null);

        setTimeout(() => {
          const mockData = {
            audio_url:
              "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
          };

          if (mockData && mockData.audio_url) {
            setUploadedVoiceUrl(mockData.audio_url);
            setActiveTab(1);
            setAudioTimestamp(Date.now());
          }
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (workspace_id) {
      fetchAudioData();
    }
  }, [workspace_id]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCreateAudio = async () => {
    if (!scriptId) {
      alert("Vui lòng tạo kịch bản trước khi tạo âm thanh.");
      return;
    }

    setIsGeneratingAudio(true);

    try {
      setTimeout(() => {
        const volume = (intensity - 0.5) * 24;
        const engine = provider;
        const gender = voice === "default" ? "female" : voice;

        const mockResponse = {
          status: 201,
          data: {
            audio_url:
              "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
          },
        };

        if (mockResponse.status === 201 && mockResponse.data?.audio_url) {
          setAudioUrl(mockResponse.data.audio_url);
          setAudioTimestamp(Date.now());
          setShowAudioPreview(true);
        }
        setIsGeneratingAudio(false);
      }, 2000);
    } catch (error) {
      alert("Đã xảy ra lỗi khi tạo âm thanh.");
      setIsGeneratingAudio(false);
    }
  };

  const handleVoiceFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileExt = file.name.split(".").pop()?.toLowerCase();
      if (fileExt === "mp3" || fileExt === "wav" || fileExt === "m4a") {
        setSelectedVoiceFile(file);
        setUploadVoiceError(null);
      } else {
        alert("Chỉ chấp nhận file .mp3, .wav hoặc .m4a");
        e.target.value = "";
      }
    }
  };

  const removeSelectedVoiceFile = () => {
    setSelectedVoiceFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadVoiceFile = async () => {
    if (!selectedVoiceFile) {
      alert("Vui lòng chọn tệp âm thanh và tạo kịch bản trước");
      return;
    }

    if (!workspace_id) {
      alert("Không tìm thấy workspace ID");
      return;
    }

    setIsUploadingVoice(true);
    setUploadVoiceError(null);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);

        const mockResponse = {
          data: {
            audio_url: URL.createObjectURL(selectedVoiceFile),
            script_id: "new-script-id",
          },
        };

        if (mockResponse.data && mockResponse.data.audio_url) {
          setUploadedVoiceUrl(mockResponse.data.audio_url);
          setAudioTimestamp(Date.now());
        }
        setIsUploadingVoice(false);
      }, 2000);
    } catch (error) {
      clearInterval(progressInterval);
      setUploadVoiceError("Đã xảy ra lỗi khi xử lý tệp âm thanh");
      setIsUploadingVoice(false);
      setUploadProgress(0);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const CustomSlider = ({
    label,
    value,
    onChange,
    min = 0,
    max = 2,
    step = 0.1,
    unit = "x",
  }) => (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="body2"
          fontWeight="600"
          sx={{ color: "text.primary" }}
        >
          {label}
        </Typography>
        <Chip
          label={`${value}${unit}`}
          size="small"
          sx={{
            bgcolor: "grey.100",
            color: "text.secondary",
            fontWeight: "500",
          }}
        />
      </Box>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        sx={{
          color: "primary.main",
          height: 6,
          "& .MuiSlider-thumb": {
            height: 20,
            width: 20,
            backgroundColor: "#fff",
            border: "3px solid currentColor",
            "&:hover": {
              boxShadow: "0px 0px 0px 8px rgba(25, 118, 210, 0.16)",
            },
          },
          "& .MuiSlider-track": {
            height: 6,
            borderRadius: 3,
          },
          "& .MuiSlider-rail": {
            height: 6,
            borderRadius: 3,
            backgroundColor: "grey.200",
          },
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
      {loading && (
        <Fade in={loading}>
          <Card sx={{ mb: 3, textAlign: "center", py: 4, bgcolor: "grey.50" }}>
            <CircularProgress size={40} thickness={4} sx={{ mb: 2 }} />
            <Typography variant="body1" color="text.secondary" fontWeight="500">
              Đang tải dữ liệu âm thanh...
            </Typography>
          </Card>
        </Fade>
      )}

      {error && (
        <Zoom in={!!error}>
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              "& .MuiAlert-icon": { fontSize: 24 },
            }}
          >
            {error}
          </Alert>
        </Zoom>
      )}

      <Card
        sx={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            bgcolor: "grey.50",
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              py: 2,
              color: "text.secondary",
              "&.Mui-selected": {
                color: "primary.main",
              },
            },
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
          }}
        >
          <Tab
            icon={<SmartToy sx={{ mb: 0.5 }} />}
            label="Giọng nói AI"
            iconPosition="start"
          />
          <Tab
            icon={<Mic sx={{ mb: 0.5 }} />}
            label="Giọng thu có sẵn"
            iconPosition="start"
          />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <Stack spacing={3}>
            {/* Header */}
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Typography
                variant="h5"
                fontWeight="700"
                color="text.primary"
                sx={{ mb: 1 }}
              >
                Tạo giọng nói AI
              </Typography>
            </Box>

            {/* Provider Selection */}
            <Card
              sx={{ bgcolor: "grey.50", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <CardContent>
                <FormControl fullWidth>
                  <InputLabel sx={{ fontWeight: 500 }}>
                    Nhà cung cấp giọng nói
                  </InputLabel>
                  <Select
                    value={provider}
                    label="Nhà cung cấp giọng nói"
                    onChange={(e) => setProvider(e.target.value)}
                    sx={{
                      bgcolor: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    {voiceProviders.map((p) => (
                      <MenuItem key={p.id} value={p.id}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Settings sx={{ color: "primary.main" }} />
                          {p.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            {/* Voice Selection */}
            <Card
              sx={{ bgcolor: "grey.50", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <CardContent>
                <FormControl fullWidth>
                  <InputLabel sx={{ fontWeight: 500 }}>Giọng nói</InputLabel>
                  <Select
                    value={voice}
                    label="Giọng nói"
                    onChange={(e) => setVoice(e.target.value)}
                    sx={{
                      bgcolor: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    {selectedProvider?.voices.map((v) => (
                      <MenuItem key={v.id} value={v.id}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <VolumeUp sx={{ color: "primary.main" }} />
                          {v.name}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            {/* Sliders */}
            <Card
              sx={{ bgcolor: "grey.50", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <CardHeader
                title={
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Settings color="primary" />
                    Tùy chỉnh giọng nói
                  </Typography>
                }
              />
              <CardContent>
                <CustomSlider
                  label="Tốc độ đọc"
                  value={speed}
                  onChange={(e, newValue) => setSpeed(newValue)}
                  min={0.5}
                  max={2}
                  step={0.1}
                />

                <CustomSlider
                  label="Âm điệu"
                  value={pitch}
                  onChange={(e, newValue) => setPitch(newValue)}
                  min={0.5}
                  max={1.5}
                  step={0.1}
                />

                <CustomSlider
                  label="Cường độ"
                  value={intensity}
                  onChange={(e, newValue) => setIntensity(newValue)}
                  min={0}
                  max={1}
                  step={0.01}
                  unit="%"
                />
              </CardContent>
            </Card>

            {/* Audio Info Card */}
            <Card
              sx={{
                bgcolor: showAudioPreview ? "success.50" : "grey.50",
                border: `1px solid ${
                  showAudioPreview ? "success.200" : "rgba(0,0,0,0.06)"
                }`,
                transition: "all 0.3s ease",
              }}
            >
              <CardHeader
                avatar={
                  showAudioPreview ? (
                    <CheckCircle color="success" sx={{ fontSize: 28 }} />
                  ) : (
                    <AudioFile color="action" sx={{ fontSize: 28 }} />
                  )
                }
                title={
                  <Typography variant="h6" fontWeight="600">
                    Thông tin âm thanh
                  </Typography>
                }
                subheader={
                  <Chip
                    label={
                      showAudioPreview
                        ? "Âm thanh đã được tạo"
                        : "Chưa có âm thanh"
                    }
                    size="small"
                    color={showAudioPreview ? "success" : "default"}
                    sx={{ mt: 0.5 }}
                  />
                }
              />
              <CardContent>
                {showAudioPreview && (
                  <Box
                    sx={{
                      mb: 2,
                      p: 2,
                      bgcolor: "white",
                      borderRadius: 2,
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1, display: "block" }}
                    >
                      URL âm thanh:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        wordBreak: "break-all",
                        color: "primary.main",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                      }}
                    >
                      {audioUrl}
                    </Typography>
                  </Box>
                )}

                <Box
                  sx={{
                    mb: 2,
                    p: 2,
                    bgcolor: "white",
                    borderRadius: 2,
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    <strong>Nhà cung cấp:</strong> {selectedProvider?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Giọng nói:</strong>{" "}
                    {selectedProvider?.voices.find((v) => v.id === voice)?.name}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCreateAudio}
                  disabled={isGeneratingAudio}
                  startIcon={
                    isGeneratingAudio ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <PlayArrow />
                    )
                  }
                  sx={{
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: "1rem",
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                    },
                  }}
                >
                  {isGeneratingAudio ? "Đang tạo âm thanh..." : "Tạo âm thanh"}
                </Button>
              </CardContent>
            </Card>

            {/* Audio Preview */}
            {showAudioPreview && audioUrl && (
              <Fade in={showAudioPreview}>
                <Card
                  sx={{
                    bgcolor: "primary.50",
                    border: "1px solid rgba(25, 118, 210, 0.2)",
                    boxShadow: "0 4px 20px rgba(25, 118, 210, 0.1)",
                  }}
                >
                  <CardHeader
                    avatar={<PlayArrow color="primary" sx={{ fontSize: 28 }} />}
                    title={
                      <Typography
                        variant="h6"
                        fontWeight="600"
                        color="primary.main"
                      >
                        Xem trước âm thanh
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Box
                      sx={{
                        p: 3,
                        bgcolor: "white",
                        borderRadius: 2,
                        border: "1px solid rgba(25, 118, 210, 0.1)",
                      }}
                    >
                      <audio
                        key={`${audioUrl}-${audioTimestamp}`}
                        src={audioUrl}
                        controls
                        style={{
                          width: "100%",
                          height: "54px",
                          borderRadius: "8px",
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 2, display: "block", textAlign: "center" }}
                      >
                        🎵 Bạn có thể nghe thử âm thanh được tạo từ kịch bản đã
                        phê duyệt
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            )}
          </Stack>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Stack spacing={3}>
            {/* Header */}
            <Box sx={{ textAlign: "center", py: 2 }}>
              <Typography
                variant="h5"
                fontWeight="700"
                color="text.primary"
                sx={{ mb: 1 }}
              >
                Tải lên giọng thu sẵn
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sử dụng file âm thanh của riêng bạn để tạo nội dung
              </Typography>
            </Box>

            {/* File Upload Area */}
            <Card sx={{ overflow: "hidden" }}>
              <CardContent sx={{ p: 0 }}>
                <Paper
                  sx={{
                    border: selectedVoiceFile ? "2px solid" : "2px dashed",
                    borderColor: selectedVoiceFile
                      ? "success.main"
                      : "grey.300",
                    bgcolor: selectedVoiceFile ? "success.50" : "grey.50",
                    p: 4,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: selectedVoiceFile ? "success.100" : "grey.100",
                      borderColor: selectedVoiceFile
                        ? "success.dark"
                        : "grey.400",
                    },
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleVoiceFileChange}
                    accept=".mp3,.wav,.m4a"
                    style={{ display: "none" }}
                  />

                  {!selectedVoiceFile ? (
                    <Stack spacing={2} alignItems="center">
                      <CloudUpload
                        sx={{
                          fontSize: 64,
                          color: "primary.main",
                          opacity: 0.7,
                        }}
                      />
                      <Typography
                        variant="h6"
                        fontWeight="600"
                        color="text.primary"
                      >
                        Nhấp để tải lên hoặc kéo và thả
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Hỗ trợ file .mp3, .wav, .m4a
                      </Typography>
                      <Chip
                        label="Kích thước tối đa: 50MB"
                        size="small"
                        variant="outlined"
                        sx={{ bgcolor: "white" }}
                      />
                    </Stack>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        bgcolor: "white",
                        p: 2,
                        borderRadius: 2,
                        maxWidth: 400,
                        mx: "auto",
                      }}
                    >
                      <AudioFile sx={{ color: "success.main", fontSize: 28 }} />
                      <Box sx={{ flex: 1, textAlign: "left" }}>
                        <Typography
                          variant="body1"
                          fontWeight="600"
                          color="text.primary"
                        >
                          {selectedVoiceFile.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {(selectedVoiceFile.size / (1024 * 1024)).toFixed(2)}{" "}
                          MB
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelectedVoiceFile();
                        }}
                        sx={{
                          bgcolor: "error.50",
                          "&:hover": { bgcolor: "error.100" },
                        }}
                      >
                        <Close sx={{ color: "error.main" }} />
                      </IconButton>
                    </Box>
                  )}
                </Paper>

                {selectedVoiceFile && (
                  <Box sx={{ p: 3, bgcolor: "grey.50" }}>
                    {isUploadingVoice && (
                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Đang xử lý tệp...
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {uploadProgress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={uploadProgress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "grey.200",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 3,
                            },
                          }}
                        />
                      </Box>
                    )}

                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleUploadVoiceFile}
                      disabled={isUploadingVoice}
                      startIcon={
                        isUploadingVoice ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Upload />
                        )
                      }
                      sx={{
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                        fontSize: "1rem",
                        borderRadius: 2,
                        boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                        "&:hover": {
                          boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                        },
                      }}
                    >
                      {isUploadingVoice
                        ? "Đang xử lý tệp..."
                        : "Tải lên giọng nói"}
                    </Button>

                    {uploadVoiceError && (
                      <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                        {uploadVoiceError}
                      </Alert>
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Uploaded Voice Preview */}
            {uploadedVoiceUrl && (
              <Fade in={!!uploadedVoiceUrl}>
                <Card
                  sx={{
                    bgcolor: "success.50",
                    border: "1px solid rgba(76, 175, 80, 0.2)",
                    boxShadow: "0 4px 20px rgba(76, 175, 80, 0.1)",
                  }}
                >
                  <CardHeader
                    avatar={
                      <CheckCircle color="success" sx={{ fontSize: 28 }} />
                    }
                    title={
                      <Typography
                        variant="h6"
                        fontWeight="600"
                        color="success.main"
                      >
                        Giọng nói đã tải lên
                      </Typography>
                    }
                    action={
                      <Chip
                        label="Sẵn sàng sử dụng"
                        color="success"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    }
                  />
                  <CardContent>
                    <Box
                      sx={{
                        p: 3,
                        bgcolor: "white",
                        borderRadius: 2,
                        border: "1px solid rgba(76, 175, 80, 0.1)",
                      }}
                    >
                      <audio
                        key={`${uploadedVoiceUrl}-${audioTimestamp}`}
                        src={uploadedVoiceUrl}
                        controls
                        style={{
                          width: "100%",
                          height: "54px",
                          borderRadius: "8px",
                        }}
                      />
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 2, display: "block", textAlign: "center" }}
                      >
                        ✅ Giọng nói đã tải lên sẽ được sử dụng cho kịch bản của
                        bạn
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            )}

            {/* Notes */}
            <Card
              sx={{
                bgcolor: "info.50",
                border: "1px solid rgba(2, 136, 209, 0.2)",
              }}
            >
              <CardHeader
                avatar={<Settings color="info" />}
                title={
                  <Typography variant="h6" fontWeight="600" color="info.main">
                    Hướng dẫn và lưu ý
                  </Typography>
                }
              />
              <CardContent>
                <Stack spacing={2}>
                  {[
                    { icon: "🎵", text: "Hỗ trợ định dạng MP3, WAV, M4A" },
                    { icon: "📏", text: "Kích thước tối đa: 50MB" },
                    { icon: "⏱️", text: "Thời lượng tối đa: 30 phút" },
                    {
                      icon: "💡",
                      text: "Âm thanh rõ ràng, không nhiễu sẽ cho kết quả tốt nhất",
                    },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        bgcolor: "white",
                        borderRadius: 2,
                        border: "1px solid rgba(2, 136, 209, 0.1)",
                      }}
                    >
                      <Typography sx={{ fontSize: "1.2rem" }}>
                        {item.icon}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </TabPanel>
      </Card>
    </Box>
  );
}

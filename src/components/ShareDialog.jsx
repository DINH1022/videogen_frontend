import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Tab,
  Tabs,
  TextField,
  Button,
  IconButton,
  Typography,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  YouTube as YouTubeIcon,
  Facebook as FacebookIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  Fullscreen as FullscreenIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

/**
 * VideoShareDialog component provides a dialog UI for previewing a video and preparing content
 * for sharing to multiple platforms (YouTube, TikTok, Facebook). It allows editing titles/descriptions,
 * auto-generating captions, and quick sharing. Includes a nested AutoCaptionDialog for AI-generated captions.
 */

// TikTok icon component
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.39z" />
  </svg>
);

/**
 * AutoCaptionDialog handles AI caption generation for video sharing.
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onClose - Callback when dialog is closed or caption is confirmed
 */
const AutoCaptionDialog = ({ open, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState(null);

  // Simulate API call to generate caption
  const handleGenerateCaption = () => {
    setIsGenerating(true);
    setGeneratedCaption(null);

    // Simulate a API call with a timeout
    setTimeout(() => {
      setGeneratedCaption({
        title: "NÚI LỬA: SỰ HÌNH THÀNH, HOẠT ĐỘNG VÀ ẢNH HƯỞNG ĐẾN TRÁI ĐẤT",
        description:
          "Núi lửa: Cấu trúc địa chất hùng vĩ, hình thành từ áp lực nội tại Trái Đất.\nNghiên cứu phun trào để hiểu rõ hơn về hành tinh chúng ta.\n#NuiLuaHocThuat",
      });
      setIsGenerating(false);
    }, 3000);
  };

  // Confirm and return generated caption
  const handleConfirm = () => {
    onClose(generatedCaption);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(null)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: "300px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Caption được tạo
        </Typography>
        <IconButton onClick={() => onClose(null)} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Nhấn "Xác nhận" để áp dụng caption cho tất cả nền tảng.
        </Typography>

        {!generatedCaption && !isGenerating && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Button
              variant="contained"
              onClick={handleGenerateCaption}
              sx={{
                textTransform: "none",
                py: 1.5,
                px: 3,
              }}
            >
              Tạo Caption
            </Button>
          </Box>
        )}

        {isGenerating && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Đang tạo caption...
            </Typography>
          </Box>
        )}

        {generatedCaption && (
          <Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                Tiêu đề
              </Typography>
              <TextField
                fullWidth
                value={generatedCaption.title}
                variant="outlined"
                size="small"
                multiline
                rows={2}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                Mô tả
              </Typography>
              <TextField
                fullWidth
                value={generatedCaption.description}
                variant="outlined"
                size="small"
                multiline
                rows={4}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                onClick={handleConfirm}
                sx={{
                  textTransform: "none",
                  py: 1,
                  px: 3,
                  backgroundColor: "#1976d2",
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              >
                Xác nhận
              </Button>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

/**
 * VideoShareDialog main component for sharing and previewing video.
 * @param {boolean} open - Whether the dialog is open
 * @param {function} onClose - Callback when dialog is closed
 * @param {string} videoSrc - Video source URL for preview
 */
const VideoShareDialog = ({
  open,
  onClose,
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState("Kênh Hàm Học");
  const [captionDialogOpen, setCaptionDialogOpen] = useState(false);
  const videoRef = useRef(null);
  const [formData, setFormData] = useState({
    youtube: { title: "", description: "" },
    tiktok: { title: "", description: "" },
    facebook: {
      title: "",
      description: "",
    },
  });

  // Handle tab change for platform selection
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle caption generated from AutoCaptionDialog
  const handleCaptionGenerated = (caption) => {
    setCaptionDialogOpen(false);
    if (caption) {
      setFormData({
        youtube: { title: caption.title, description: caption.description },
        tiktok: { title: caption.title, description: caption.description },
        facebook: { title: caption.title, description: caption.description },
      });
    }
  };

  // Handle input changes for each platform's title/description
  const handleInputChange = (platform, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value,
      },
    }));
  };

  // TabPanel helper for rendering tab content
  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 1,
            width: "60vw",
            height: "90vh",
            maxWidth: "1200px",
            maxHeight: "800px",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pt: 3,
            px: 3,
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                textTransform: "none",
                color: "#333",
                fontWeight: "700",
                borderColor: "#e0e0e0",
                "&:hover": {
                  borderColor: "#ccc",
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              Xuất video
            </Button>
            <Button
              variant="contained"
              startIcon={<ShareIcon />}
              sx={{
                textTransform: "none",
                backgroundColor: "#4285f4",
                "&:hover": { backgroundColor: "#3367d6" },
              }}
            >
              Xem trước & Chia sẻ
            </Button>
          </Box>
          <IconButton onClick={onClose} sx={{ color: "#666" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{ p: 0, display: "flex", flex: 1, overflow: "hidden" }}
        >
          {/* Left side - Video preview */}
          <Box
            sx={{
              width: "55%",
              px: 3,
              pt: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                flex: 1,
                mb: 3.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 1, fontWeight: 600, fontSize: "18px", ml: 2, mt: 2 }}
              >
                Xem trước video
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, fontSize: "14px", ml: 2 }}
              >
                Kiểm tra video trước khi xuất bản
              </Typography>

              <Box
                sx={{
                  position: "relative",
                  backgroundColor: "#000",
                  overflow: "hidden",
                  aspectRatio: "16/9",
                  mb: 2,
                }}
              >
                <video
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  controls={true}
                  style={{
                    display: "block",
                    objectFit: "cover",
                  }}
                >
                  <source src={videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "55%",
              display: "flex",
              flexDirection: "column",
              ml: 1,
              mr: 3,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                flexShrink: 0,
                "& .MuiTab-root": {
                  textTransform: "none",
                  minHeight: 48,
                  fontSize: "14px",
                },
              }}
            >
              <Tab
                icon={<YouTubeIcon sx={{ color: "#FF0000", fontSize: 20 }} />}
                label="YouTube"
                iconPosition="start"
              />
              <Tab icon={<TikTokIcon />} label="TikTok" iconPosition="start" />
              <Tab
                icon={<FacebookIcon sx={{ color: "#1877F2", fontSize: 20 }} />}
                label="Facebook"
                iconPosition="start"
              />
            </Tabs>

            <Box sx={{ pt: 2, flex: 1, overflow: "auto" }}>
              {/* YouTube Tab */}
              <TabPanel value={activeTab} index={0}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Kênh
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        backgroundColor: "#e5dede",
                        borderRadius: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: "40px",
                          height: "40px",
                          bgcolor: "#FF69B4",
                        }}
                      >
                        T
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: "600" }}>
                        Ty Nguyen Chanel
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Tiêu đề video
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Nhập tiêu đề video..."
                      variant="outlined"
                      size="small"
                      value={formData.youtube.title}
                      onChange={(e) =>
                        handleInputChange("youtube", "title", e.target.value)
                      }
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Mô tả
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Nhập mô tả video..."
                      variant="outlined"
                      size="small"
                      value={formData.youtube.description}
                      onChange={(e) =>
                        handleInputChange(
                          "youtube",
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#FF0000",
                      "&:hover": { backgroundColor: "#CC0000" },
                      textTransform: "none",
                      py: 1.5,
                      mt: 0.5,
                    }}
                  >
                    Chia sẻ lên YouTube
                  </Button>
                </Box>
              </TabPanel>

              {/* TikTok Tab */}
              <TabPanel value={activeTab} index={1}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Kênh
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 1,
                        backgroundColor: "#e5dede",
                        borderRadius: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: "40px",
                          height: "40px",
                          bgcolor: "#000",
                        }}
                      >
                        <TikTokIcon />
                      </Avatar>
                      <Typography variant="body2">
                        cr7 (cristiano ronaldo)
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Tiêu đề video
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Nhập tiêu đề cho video TikTok..."
                      variant="outlined"
                      size="small"
                      value={formData.tiktok.title}
                      onChange={(e) =>
                        handleInputChange("tiktok", "title", e.target.value)
                      }
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Mô tả
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Nhập mô tả cho video TikTok..."
                      variant="outlined"
                      size="small"
                      value={formData.tiktok.description}
                      onChange={(e) =>
                        handleInputChange(
                          "tiktok",
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#000",
                      "&:hover": { backgroundColor: "#333" },
                      textTransform: "none",
                      py: 1.5,
                      mt: 0.5,
                    }}
                  >
                    Chia sẻ lên TikTok
                  </Button>
                </Box>
              </TabPanel>

              {/* Facebook Tab */}
              <TabPanel value={activeTab} index={2}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Chọn Trang
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        value={selectedChannel}
                        onChange={(e) => setSelectedChannel(e.target.value)}
                      >
                        <MenuItem value="Kênh Hàm Học">Kênh Hàm Học</MenuItem>
                        <MenuItem value="Trang khác">Trang khác</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Tiêu đề bài đăng
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Nhập tiêu đề bài đăng..."
                      variant="outlined"
                      size="small"
                      value={formData.facebook.title}
                      onChange={(e) =>
                        handleInputChange("facebook", "title", e.target.value)
                      }
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 0.5, fontWeight: 600 }}
                    >
                      Nội dung
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      placeholder="Nhập nội dung bài đăng..."
                      variant="outlined"
                      size="small"
                      value={formData.facebook.description}
                      onChange={(e) =>
                        handleInputChange(
                          "facebook",
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#1877F2",
                      "&:hover": { backgroundColor: "#166FE5" },
                      textTransform: "none",
                      py: 1.5,
                      mt: 0.5,
                    }}
                  >
                    Chia sẻ lên facebook
                  </Button>
                </Box>
              </TabPanel>
            </Box>
          </Box>
        </DialogContent>

        {/* Footer section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1.5,
            borderRadius: 2,
            mx: 3,
            mb: 2,
            border: "1px solid #e0e0e0",

            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, mb: 1, fontSize: "20px" }}
            >
              Tạo nội dung cho tất cả nền tảng
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sử dụng các chức năng sau để xuất bản nhanh chóng hơn
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              px: 1,
            }}
          >
            <Button
              variant="contained"
              startIcon={
                <Box component="span" sx={{ fontSize: "18px" }}>
                  📝
                </Box>
              }
              sx={{
                textTransform: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                fontWeight: 600,
                px: 3,
                borderRadius: 2,
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                },
              }}
              onClick={() => setCaptionDialogOpen(true)}
            >
              Tạo caption tự động
            </Button>

            <Button
              variant="contained"
              startIcon={<ShareIcon />}
              sx={{
                textTransform: "none",
                flex: 1,
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "white",
                fontWeight: 600,
                px: 2,
                borderRadius: 2,
                boxShadow: "0 4px 15px rgba(245, 87, 108, 0.4)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #e881f9 0%, #e8455a 100%)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(245, 87, 108, 0.6)",
                },
              }}
            >
              Chia sẻ nhanh
            </Button>
          </Box>
        </Box>
      </Dialog>

      <AutoCaptionDialog
        open={captionDialogOpen}
        onClose={handleCaptionGenerated}
      />
    </>
  );
};

export default VideoShareDialog;

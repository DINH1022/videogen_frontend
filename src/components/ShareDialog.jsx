import React, { useState, useRef, useEffect } from "react";
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
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  YouTube as YouTubeIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { uploadVideoToYoutube } from "../services/uploadYoutube";
import { checkLoginSocialAccount } from "../services/status";
import { uploadVideoToTiktok } from "../services/uploadTiktok";
import Swal from "sweetalert2";
import { generateCaption } from "../services/script";
import showToast from "./ShowToast";
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.39z" />
  </svg>
);

const AutoCaptionDialog = ({ open, onClose, script, language }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCaption, setGeneratedCaption] = useState(null);
  const handleGenerateCaption = async () => {
    setIsGenerating(true);
    setGeneratedCaption(null);
    const title1 = await generateCaption(
      "SOCIAL_MEDIA_TITLE",
      script,
      language
    );
    const description1 = await generateCaption("CAPTION", script, language);
    setGeneratedCaption({
      title: title1.slice(0, -2),
      description: description1.slice(0, -2),
    });

    setIsGenerating(false);
  };

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

const TabPanel = ({ children, value, index }) => (
  <Box hidden={value !== index} key={index}>
    {value === index && <Box>{children}</Box>}
  </Box>
);

const VideoShareDialog = ({
  open,
  onClose,
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  language = "vietnamese",
  script = "Video Description",
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [captionDialogOpen, setCaptionDialogOpen] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [statusAccountSocial, setStatusAccountSocial] = useState({
    youtube_status: false,
    tiktok_status: false,
  });
  const [uploadLoading, setUploadLoading] = useState({
    youtube: false,
    tiktok: false,
  });
  // const handleYoutubeUpload = async () => {
  //   setUploadLoading((prev) => ({ ...prev, youtube: true }));
  //   try {
  //     const response = await uploadVideoToYoutube(
  //       videoSrc,
  //       formData.youtube.title,
  //       formData.youtube.description
  //     );
  //     alert("Upload successful: " + response);
  //     showToast("Upload video to Youtube successfull", "success");
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //   } finally {
  //     setUploadLoading((prev) => ({ ...prev, youtube: false }));
  //   }
  // };

  // // 3. Thêm hàm xử lý upload với loading cho TikTok
  // const handleTiktokUpload = async () => {
  //   setUploadLoading((prev) => ({ ...prev, tiktok: true }));
  //   try {
  //     await uploadVideoToTiktok(
  //       videoSrc,
  //       formData.tiktok.title,
  //       formData.tiktok.description
  //     );
  //     // Có thể thêm thông báo thành công ở đây
  //     showToast("Upload video to Tiktok successfull", "success");
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     // Có thể thêm thông báo lỗi ở đây
  //   } finally {
  //     setUploadLoading((prev) => ({ ...prev, tiktok: false }));
  //   }
  // };
  // const handleQuickShare = async () => {
  //   if (
  //     !statusAccountSocial.youtube_status &&
  //     !statusAccountSocial.tiktok_status
  //   ) {
  //     showToast(
  //       "Bạn cần đăng nhập vào ít nhất một tài khoản để chia sẻ video",
  //       "warning"
  //     );
  //     return;
  //   }
  //   if (statusAccountSocial.youtube_status) {
  //     await handleYoutubeUpload();
  //   }
  //   if (statusAccountSocial.tiktok_status) {
  //     await handleTiktokUpload();
  //   }
  //   showToast("Chia sẻ video thành công", "success");
  //   onClose();
  // };
  const handleQuickShare = async () => {
    // Kiểm tra điều kiện ban đầu
    if (
      !statusAccountSocial.youtube_status &&
      !statusAccountSocial.tiktok_status
    ) {
      showToast(
        "Bạn cần đăng nhập vào ít nhất một tài khoản để chia sẻ video",
        "warning"
      );
      return;
    }

    // Tạo array các promises để xử lý đồng thời
    const uploadPromises = [];

    if (statusAccountSocial.youtube_status) {
      uploadPromises.push(
        handleYoutubeUpload().catch((error) => ({
          platform: "YouTube",
          success: false,
          error: error.message,
        }))
      );
    }

    if (statusAccountSocial.tiktok_status) {
      uploadPromises.push(
        handleTiktokUpload().catch((error) => ({
          platform: "TikTok",
          success: false,
          error: error.message,
        }))
      );
    }

    try {
      // Thực hiện upload đồng thời
      const results = await Promise.allSettled(uploadPromises);

      // Phân tích kết quả
      let successCount = 0;
      let failCount = 0;
      const failedPlatforms = [];

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          if (result.value && result.value.success === false) {
            failCount++;
            failedPlatforms.push(result.value.platform);
          } else {
            successCount++;
          }
        } else {
          failCount++;
        }
      });

      // Hiển thị thông báo phù hợp
      if (successCount > 0 && failCount === 0) {
        showToast("Chia sẻ video thành công trên tất cả nền tảng!", "success");
      } else if (successCount > 0 && failCount > 0) {
        showToast(
          `Chia sẻ thành công một phần. Thất bại: ${failedPlatforms.join(
            ", "
          )}`,
          "warning"
        );
      } else {
        showToast("Chia sẻ video thất bại trên tất cả nền tảng", "error");
      }

      // Đóng dialog nếu có ít nhất một upload thành công
      if (successCount > 0) {
        onClose();
      }
    } catch (error) {
      console.error("Unexpected error in quick share:", error);
      showToast("Có lỗi không mong muốn xảy ra", "error");
    }
  };

  // Cũng cần cập nhật các hàm upload để return kết quả
  const handleYoutubeUpload = async () => {
    setUploadLoading((prev) => ({ ...prev, youtube: true }));
    try {
      const response = await uploadVideoToYoutube(
        videoSrc,
        formData.youtube.title,
        formData.youtube.description
      );

      showToast("Upload video to Youtube successful", "success");
      return { platform: "YouTube", success: true, response };
    } catch (error) {
      console.error("YouTube upload failed:", error);
      showToast("Upload video to Youtube failed", "error");
      throw error; // Re-throw để Promise.allSettled có thể catch
    } finally {
      setUploadLoading((prev) => ({ ...prev, youtube: false }));
    }
  };

  const handleTiktokUpload = async () => {
    setUploadLoading((prev) => ({ ...prev, tiktok: true }));
    try {
      const response = await uploadVideoToTiktok(
        videoSrc,
        formData.tiktok.title,
        formData.tiktok.description
      );

      showToast("Upload video to TikTok successful", "success");
      return { platform: "TikTok", success: true, response };
    } catch (error) {
      console.error("TikTok upload failed:", error);
      showToast("Upload video to TikTok failed", "error");
      throw error; // Re-throw để Promise.allSettled có thể catch
    } finally {
      setUploadLoading((prev) => ({ ...prev, tiktok: false }));
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await checkLoginSocialAccount();
      setStatusAccountSocial(response);
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    youtube: { title: "", description: "" },
    tiktok: { title: "", description: "" },
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCaptionGenerated = (caption) => {
    setCaptionDialogOpen(false);
    if (caption) {
      setFormData({
        youtube: { title: caption.title, description: caption.description },
        tiktok: { title: caption.title, description: caption.description },
      });
    }
  };

  const handleInputChange = (platform, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value,
      },
    }));
  };

  const handleLoginRedirect = async (platform) => {
    // Redirect to login for specific platform
    if (platform === "youtube") {
      window.location.href = `http://localhost:8080/connect/youtube?user-id=${user.id}`;
    } else if (platform === "tiktok") {
      window.location.href = `http://localhost:8080/connect/tiktok?user-id=${user.id}`;
    }
  };

  const renderLoginRequired = (platform, platformName, color, icon) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        py: 4,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {platformName}
        </Typography>
      </Box>

      <Alert severity="warning" sx={{ width: "100%", mb: 2 }}>
        <Typography variant="body2">
          Bạn cần đăng nhập vào tài khoản {platformName} để share video
        </Typography>
      </Alert>

      <Button
        variant="contained"
        startIcon={<LoginIcon />}
        onClick={() => handleLoginRedirect(platform)}
        sx={{
          textTransform: "none",
          backgroundColor: color,
          "&:hover": {
            backgroundColor: platform === "youtube" ? "#CC0000" : "#333",
          },
          py: 1.5,
          px: 4,
          borderRadius: 2,
          fontWeight: 600,
        }}
      >
        Đăng nhập {platformName}
      </Button>
    </Box>
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
            </Tabs>

            <Box sx={{ pt: 2, flex: 1, overflow: "auto" }}>
              {/* YouTube Tab */}
              <TabPanel value={activeTab} index={0}>
                {!statusAccountSocial.youtube_status ? (
                  renderLoginRequired(
                    "youtube",
                    "YouTube",
                    "#FF0000",
                    <YouTubeIcon sx={{ color: "#FF0000", fontSize: 24 }} />
                  )
                ) : (
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
                      onClick={handleYoutubeUpload}
                      fullWidth
                      disabled={uploadLoading.youtube}
                      sx={{
                        backgroundColor: "#FF0000",
                        "&:hover": { backgroundColor: "#CC0000" },
                        "&:disabled": { backgroundColor: "#ffcccc" },
                        textTransform: "none",
                        py: 1.5,
                        mt: 0.5,
                      }}
                    >
                      {uploadLoading.youtube ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CircularProgress size={16} sx={{ color: "white" }} />
                          Đang tải lên YouTube...
                        </Box>
                      ) : (
                        "Chia sẻ lên YouTube"
                      )}
                    </Button>
                  </Box>
                )}
              </TabPanel>

              {/* TikTok Tab */}
              <TabPanel value={activeTab} index={1}>
                {!statusAccountSocial.tiktok_status ? (
                  renderLoginRequired(
                    "tiktok",
                    "TikTok",
                    "#000",
                    <TikTokIcon />
                  )
                ) : (
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
                      onClick={handleTiktokUpload}
                      disabled={uploadLoading.tiktok}
                      sx={{
                        backgroundColor: "#000",
                        "&:hover": { backgroundColor: "#333" },
                        "&:disabled": { backgroundColor: "#cccccc" },
                        textTransform: "none",
                        py: 1.5,
                        mt: 0.5,
                      }}
                    >
                      {uploadLoading.tiktok ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <CircularProgress size={16} sx={{ color: "white" }} />
                          Đang tải lên TikTok...
                        </Box>
                      ) : (
                        "Chia sẻ lên TikTok"
                      )}
                    </Button>
                  </Box>
                )}
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
              onClick={handleQuickShare}
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
        script={script}
        language={language}
      />
    </>
  );
};

export default VideoShareDialog;

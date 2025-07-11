import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Typography,
  Box,
  Paper,
  Chip,
  Stack,
  Card,
  CardContent,
  Divider,
  IconButton,
  Fade,
  Slide,
  styled,
} from "@mui/material";
import {
  CloudDownload,
  VideoSettings,
  HighQuality,
  Speed,
  Movie,
  Close,
  PlayArrow,
  GetApp,
} from "@mui/icons-material";
import VideoShareDialog from "./ShareDialog";
import { saveScript } from "../services/script";
import { uploadVideo } from "../services/video";
import { getAccessToken } from "../utils/localstorage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedWorkspace } from "../redux/workspaceSlice";

/**
 * ExportDialog component provides a dialog for exporting a video with configurable settings.
 * Users can select quality, format, and frame rate, see export progress, and preview/share the exported video.
 *
 * Props:
 * - open: (boolean) Whether the dialog is open
 * - onClose: (function) Callback to close the dialog
 * - onExport: (function) Optional callback after export
 * - mainEngine: (object) Main video engine for export
 * - workspaceId: (string) Workspace ID for saving/exporting
 */

// Styled components for enhanced visual appeal
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: 20,
    background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "white",
  textAlign: "center",
  position: "relative",
  "& .MuiTypography-root": {
    fontWeight: 600,
    fontSize: "1.5rem",
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    background: "rgba(255,255,255,0.8)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(255,255,255,1)",
      transform: "translateY(-1px)",
    },
    "&.Mui-focused": {
      background: "rgba(255,255,255,1)",
      boxShadow: "0 4px 20px rgba(102,126,234,0.2)",
    },
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  "&.MuiButton-contained": {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 4px 20px rgba(102,126,234,0.3)",
    "&:hover": {
      background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 30px rgba(102,126,234,0.4)",
    },
    "&:disabled": {
      background: "linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)",
      transform: "none",
      boxShadow: "none",
    },
  },
  "&.MuiButton-outlined": {
    border: "2px solid #e2e8f0",
    color: "#4a5568",
    "&:hover": {
      border: "2px solid #667eea",
      background: "rgba(102,126,234,0.05)",
      transform: "translateY(-1px)",
    },
  },
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(145deg, #f7fafc 0%, #edf2f7 100%)",
  borderRadius: 16,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  border: "1px solid rgba(0,0,0,0.06)",
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  background: "rgba(102,126,234,0.1)",
  "& .MuiLinearProgress-bar": {
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    borderRadius: 4,
  },
}));

const SettingCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderRadius: 12,
  background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
  transition: "all 0.3s ease",
}));

export default function ExportDialog({
  open,
  onClose,
  onExport,
  mainEngine,
  workspaceId,
}) {
  // State for export settings and progress
  const [quality, setQuality] = useState("1080p");
  const [format, setFormat] = useState("mp4");
  const [fps, setFps] = useState("30");
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportedVideoUrl, setExportedVideoUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Redux workspace state
  const workspace = useSelector((state) => state.workspace.selectedWorkspace);
  const dispatch = useDispatch();

  /**
   * handleExport triggers the video export process with selected settings.
   * Shows progress and preview after export.
   */
  const handleExport = async () => {
    if (!mainEngine || !workspaceId) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      const scene = mainEngine.scene.get();
      const page = mainEngine.scene.getCurrentPage();

      console.log("Exporting video with settings:", {
        height: quality,
        format: format,
        fps: fps,
      });

      // Validate and process parameters
      let processedFormat = format.toLowerCase();
      if (processedFormat !== "mp4" && processedFormat !== "mov") {
        processedFormat = "mp4";
      }

      let processedFps = fps;
      const testFps = parseInt(fps);
      if (isNaN(testFps) || testFps < 24 || testFps > 60) {
        processedFps = "30";
      }

      let height = quality;
      if (height === "4k") {
        height = "2160";
      } else if (height === "720p") {
        height = "720";
      } else if (height === "1080p") {
        height = "1080";
      } else {
        height = "720";
      }

      const width = Math.round((16 / 9) * parseInt(height)) + "";

      // Progress callback for export
      const progressCallback = (renderedFrames, encodedFrames, totalFrames) => {
        const progress = Math.round((renderedFrames / totalFrames) * 100);
        setExportProgress(progress);
      };

      const videoOptions = {
        h264Profile: 77,
        h264Level: 52,
        videoBitrate: 0,
        audioBitrate: 0,
        timeOffset: 0,
        framerate: processedFps,
        targetWidth: width,
        targetHeight: height,
      };

      // Export video using mainEngine
      const videoBlob = await mainEngine.block.exportVideo(
        page,
        `video/${processedFormat}`,
        progressCallback,
        videoOptions
      );

      // Upload video and save script
      const multipartForm = new FormData();
      multipartForm.append("video", videoBlob);

      const response = await uploadVideo(multipartForm);
      const res = await saveScript({ videoUrl: response }, workspace.id);
      dispatch(setSelectedWorkspace(res));
      // const videoUrl = URL.createObjectURL(videoBlob);
      // console.log("tesst2: ", videoUrl);
      setExportedVideoUrl(response);
      setShowPreview(true);
    } catch (error) {
      console.error("Error exporting video:", error);
    } finally {
      setIsExporting(false);
    }
  };

  /**
   * handleDownload allows user to download the exported video file.
   */
  const handleDownload = () => {
    if (exportedVideoUrl) {
      const link = document.createElement("a");
      link.href = exportedVideoUrl;
      link.download = `video_${workspaceId || "export"}_${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  /**
   * handleClose resets dialog state and closes the dialog.
   */
  const handleClose = () => {
    setShowPreview(false);
    setExportedVideoUrl("");
    setExportProgress(0);
    setIsExporting(false);
    onClose();
  };

  return (
    <>
      <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <StyledDialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <VideoSettings />
            {showPreview ? "Xem trước video" : "Cấu hình xuất video"}
          </Box>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "white",
              backgroundColor: "rgba(255,255,255,0.1)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <Close />
          </IconButton>
        </StyledDialogTitle>

        {/* Export settings and progress */}
        {!showPreview ? (
          <Fade in={!showPreview}>
            <div>
              <DialogContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  {/* Quality setting */}
                  <SettingCard elevation={0}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <HighQuality color="primary" />
                      <Typography variant="h7" fontWeight={600}>
                        Chất lượng video
                      </Typography>
                    </Box>
                    <StyledFormControl fullWidth>
                      <Select
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                      >
                        <MenuItem value="720p">
                          <Box display="flex" alignItems="center" gap={1}>
                            📹 HD (720p) - Nhanh
                          </Box>
                        </MenuItem>
                        <MenuItem value="1080p">
                          <Box display="flex" alignItems="center" gap={1}>
                            🎥 Full HD (1080p) - Khuyến nghị
                          </Box>
                        </MenuItem>
                        <MenuItem value="4k">
                          <Box display="flex" alignItems="center" gap={1}>
                            🎬 4K (2160p) - Chất lượng cao
                          </Box>
                        </MenuItem>
                      </Select>
                    </StyledFormControl>
                  </SettingCard>

                  {/* Format setting */}
                  <SettingCard elevation={0}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Movie color="primary" />
                      <Typography variant="h7" fontWeight={600}>
                        Định dạng xuất
                      </Typography>
                    </Box>
                    <StyledFormControl fullWidth>
                      <Select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                      >
                        <MenuItem value="mp4">
                          <Box display="flex" alignItems="center" gap={1}>
                            🎞️ MP4 - Tương thích cao
                          </Box>
                        </MenuItem>
                        <MenuItem value="mov">
                          <Box display="flex" alignItems="center" gap={1}>
                            🎬 MOV - Chất lượng cao
                          </Box>
                        </MenuItem>
                      </Select>
                    </StyledFormControl>
                  </SettingCard>

                  {/* FPS setting */}
                  <SettingCard elevation={0}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <Speed color="primary" />
                      <Typography variant="h7" fontWeight={600}>
                        Tốc độ khung hình
                      </Typography>
                    </Box>
                    <StyledFormControl fullWidth>
                      <Select
                        value={fps}
                        onChange={(e) => setFps(e.target.value)}
                      >
                        <MenuItem value="24">
                          <Box display="flex" alignItems="center" gap={1}>
                            🎭 24fps - Điện ảnh
                          </Box>
                        </MenuItem>
                        <MenuItem value="30">
                          <Box display="flex" alignItems="center" gap={1}>
                            📺 30fps - Chuẩn
                          </Box>
                        </MenuItem>
                        <MenuItem value="60">
                          <Box display="flex" alignItems="center" gap={1}>
                            ⚡ 60fps - Mượt mà
                          </Box>
                        </MenuItem>
                      </Select>
                    </StyledFormControl>
                  </SettingCard>

                  {/* Export progress bar */}
                  {isExporting && (
                    <Slide direction="up" in={isExporting}>
                      <ProgressContainer>
                        <Box display="flex" alignItems="center" gap={2} mb={2}>
                          <PlayArrow color="primary" />
                          <Typography variant="h6" fontWeight={600}>
                            Đang xử lý video...
                          </Typography>
                          <Chip
                            label={`${exportProgress}%`}
                            color="primary"
                            size="small"
                            sx={{ ml: "auto" }}
                          />
                        </Box>
                        <StyledLinearProgress
                          variant="determinate"
                          value={exportProgress}
                        />
                      </ProgressContainer>
                    </Slide>
                  )}
                </Stack>
              </DialogContent>

              <Divider />

              <DialogActions sx={{ p: 3, gap: 2 }}>
                <StyledButton
                  onClick={handleClose}
                  variant="outlined"
                  size="large"
                >
                  Hủy
                </StyledButton>
                <StyledButton
                  onClick={handleExport}
                  variant="contained"
                  disabled={isExporting}
                  startIcon={isExporting ? <Speed /> : <CloudDownload />}
                  size="large"
                  sx={{ minWidth: 140 }}
                >
                  {isExporting ? "Đang xuất..." : "Xuất video"}
                </StyledButton>
              </DialogActions>
            </div>
          </Fade>
        ) : (
          // Preview and share exported video
          <VideoShareDialog
            open={showPreview}
            onClose={() => setShowPreview(false)}
            videoSrc={exportedVideoUrl}
            language={workspace?.language || "english"}
            script={workspace?.script || ""}
          />
        )}
      </StyledDialog>
    </>
  );
}
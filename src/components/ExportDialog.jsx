// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   LinearProgress,
//   Typography,
//   Box,
// } from "@mui/material";
// import { CloudDownload } from "@mui/icons-material";
// import VideoShareDialog from "./ShareDialog";

// export default function ExportDialog({
//   open,
//   onClose,
//   onExport,
//   mainEngine,
//   workspaceId,
// }) {
//   const [quality, setQuality] = useState("1080p");
//   const [format, setFormat] = useState("mp4");
//   const [fps, setFps] = useState("30");
//   const [isExporting, setIsExporting] = useState(false);
//   const [exportProgress, setExportProgress] = useState(0);
//   const [exportedVideoUrl, setExportedVideoUrl] = useState("");
//   const [showPreview, setShowPreview] = useState(false);

//   const handleExport = async () => {
//     if (!mainEngine || !workspaceId) return;

//     setIsExporting(true);
//     setExportProgress(0);

//     try {
//       // Export video logic (similar to original ExportVid function)
//       const scene = mainEngine.scene.get();
//       const page = mainEngine.scene.getCurrentPage();

//       console.log("Exporting video with settings:", {
//         height: quality,
//         format: format,
//         fps: fps,
//       });

//       // Validate and process parameters
//       let processedFormat = format.toLowerCase();
//       if (processedFormat !== "mp4" && processedFormat !== "mov") {
//         processedFormat = "mp4";
//       }

//       let processedFps = fps;
//       const testFps = parseInt(fps);
//       if (isNaN(testFps) || testFps < 24 || testFps > 60) {
//         processedFps = "30";
//       }

//       let height = quality;
//       if (height === "4k") {
//         height = "2160";
//       } else if (height === "720p") {
//         height = "720";
//       } else if (height === "1080p") {
//         height = "1080";
//       } else {
//         height = "720";
//       }

//       const width = Math.round((16 / 9) * parseInt(height)) + "";

//       // Progress callback
//       const progressCallback = (renderedFrames, encodedFrames, totalFrames) => {
//         const progress = Math.round((renderedFrames / totalFrames) * 100);
//         setExportProgress(progress);
//       };

//       const videoOptions = {
//         h264Profile: 77,
//         h264Level: 52,
//         videoBitrate: 0,
//         audioBitrate: 0,
//         timeOffset: 0,
//         framerate: processedFps,
//         targetWidth: width,
//         targetHeight: height,
//       };

//       const videoBlob = await mainEngine.block.exportVideo(
//         page,
//         `video/${processedFormat}`,
//         progressCallback,
//         videoOptions
//       );

//       // Create preview URL
//       const videoUrl = URL.createObjectURL(videoBlob);
//       setExportedVideoUrl(videoUrl);
//       setShowPreview(true);

//       console.log("Video exported successfully");
//     } catch (error) {
//       console.error("Error exporting video:", error);
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   const handleDownload = () => {
//     if (exportedVideoUrl) {
//       const link = document.createElement("a");
//       link.href = exportedVideoUrl;
//       link.download = `video_${
//         workspaceId || "export"
//       }_${Date.now()}.${format}`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   const handleClose = () => {
//     setShowPreview(false);
//     setExportedVideoUrl("");
//     setExportProgress(0);
//     setIsExporting(false);
//     onClose();
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           {showPreview ? "Xem trước video" : "Cấu hình xuất video"}
//         </DialogTitle>

//         {!showPreview ? (
//           <>
//             <DialogContent>
//               <Typography variant="subtitle1" gutterBottom>
//                 Chọn chất lượng và định dạng xuất video
//               </Typography>

//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Chất lượng video</InputLabel>
//                 <Select
//                   value={quality}
//                   onChange={(e) => setQuality(e.target.value)}
//                   label="Chất lượng video"
//                 >
//                   <MenuItem value="720p">HD (720p)</MenuItem>
//                   <MenuItem value="1080p">Full HD (1080p)</MenuItem>
//                   <MenuItem value="4k">4K (2160p)</MenuItem>
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Định dạng</InputLabel>
//                 <Select
//                   value={format}
//                   onChange={(e) => setFormat(e.target.value)}
//                   label="Định dạng"
//                 >
//                   <MenuItem value="mp4">MP4</MenuItem>
//                   <MenuItem value="mov">MOV</MenuItem>
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Tốc độ khung hình (FPS)</InputLabel>
//                 <Select
//                   value={fps}
//                   onChange={(e) => setFps(e.target.value)}
//                   label="Tốc độ khung hình (FPS)"
//                 >
//                   <MenuItem value="24">24fps</MenuItem>
//                   <MenuItem value="30">30fps</MenuItem>
//                   <MenuItem value="60">60fps</MenuItem>
//                 </Select>
//               </FormControl>

//               {isExporting && (
//                 <Box sx={{ mt: 3 }}>
//                   <Typography variant="body2" gutterBottom>
//                     Đang xử lý... {exportProgress}%
//                   </Typography>
//                   <LinearProgress
//                     variant="determinate"
//                     value={exportProgress}
//                   />
//                 </Box>
//               )}
//             </DialogContent>

//             <DialogActions>
//               <Button onClick={handleClose}>Hủy</Button>
//               <Button
//                 onClick={handleExport}
//                 variant="contained"
//                 disabled={isExporting}
//                 startIcon={<CloudDownload />}
//               >
//                 {isExporting ? "Đang xuất..." : "Xuất video"}
//               </Button>
//             </DialogActions>
//           </>
//         ) : (
//           <VideoShareDialog
//             open={showPreview}
//             onClose={() => setShowPreview(false)}
//             videoSrc={exportedVideoUrl}
//           />
//         )}
//       </Dialog>
//     </>
//   );
// }

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

/**
 * ExportDialog component provides a dialog UI for configuring and exporting videos,
 * including quality, format, framerate selection, progress display, and preview after export.
 */

// Styled components for enhanced visual appeal
const StyledDialog = styled(Dialog)(({ theme }) => ({
  // Custom dialog style
  "& .MuiDialog-paper": {
    borderRadius: 20,
    background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  // Custom title style
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
  // Custom select style
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
  // Custom button style
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
  // Progress bar container style
  background: "linear-gradient(145deg, #f7fafc 0%, #edf2f7 100%)",
  borderRadius: 16,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  border: "1px solid rgba(0,0,0,0.06)",
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  // Custom progress bar style
  height: 8,
  borderRadius: 4,
  background: "rgba(102,126,234,0.1)",
  "& .MuiLinearProgress-bar": {
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    borderRadius: 4,
  },
}));

const SettingCard = styled(Paper)(({ theme }) => ({
  // Card for each setting option
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
  // State for export settings
  const [quality, setQuality] = useState("1080p");
  const [format, setFormat] = useState("mp4");
  const [fps, setFps] = useState("30");
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportedVideoUrl, setExportedVideoUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Handle export video logic
  const handleExport = async () => {
    if (!mainEngine || !workspaceId) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      // Get scene and current page from mainEngine
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

      // Progress callback for updating progress bar
      const progressCallback = (renderedFrames, encodedFrames, totalFrames) => {
        const progress = Math.round((renderedFrames / totalFrames) * 100);
        setExportProgress(progress);
      };

      // Video export options
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
      console.log("tesst: ", videoBlob);
      // Create preview URL for exported video
      const videoUrl = URL.createObjectURL(videoBlob);
      console.log("tesst2: ", videoUrl);
      setExportedVideoUrl(videoUrl);
      setShowPreview(true);

      console.log("Video exported successfully");
    } catch (error) {
      // Handle export error
      console.error("Error exporting video:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle download exported video
  const handleDownload = () => {
    if (exportedVideoUrl) {
      const link = document.createElement("a");
      link.href = exportedVideoUrl;
      link.download = `video_${
        workspaceId || "export"
      }_${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle dialog close and reset state
  const handleClose = () => {
    setShowPreview(false);
    setExportedVideoUrl("");
    setExportProgress(0);
    setIsExporting(false);
    onClose();
  };

  // Get icon for video quality
  const getQualityIcon = (quality) => {
    switch (quality) {
      case "4k":
        return "🎬";
      case "1080p":
        return "🎥";
      case "720p":
        return "📹";
      default:
        return "🎥";
    }
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

        {/* Show export settings or preview dialog */}
        {!showPreview ? (
          <Fade in={!showPreview}>
            <div>
              <DialogContent sx={{ p: 3 }}>
                <Stack spacing={3}>
                  {/* Video quality setting */}
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

                  {/* Video format setting */}
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

                  {/* Video framerate setting */}
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

                  {/* Show progress bar when exporting */}
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

              {/* Action buttons */}
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
          // Show video preview dialog after export
          <VideoShareDialog
            open={showPreview}
            onClose={() => setShowPreview(false)}
            videoSrc={exportedVideoUrl}
          />
        )}
      </StyledDialog>
    </>
  );
}

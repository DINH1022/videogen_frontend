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
} from "@mui/material";
import { CloudDownload } from "@mui/icons-material";
import VideoShareDialog from "./ShareDialog";

export default function ExportDialog({
  open,
  onClose,
  onExport,
  mainEngine,
  workspaceId,
}) {
  const [quality, setQuality] = useState("1080p");
  const [format, setFormat] = useState("mp4");
  const [fps, setFps] = useState("30");
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportedVideoUrl, setExportedVideoUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleExport = async () => {
    if (!mainEngine || !workspaceId) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      // Export video logic (similar to original ExportVid function)
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

      // Progress callback
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

      const videoBlob = await mainEngine.block.exportVideo(
        page,
        `video/${processedFormat}`,
        progressCallback,
        videoOptions
      );

      // Create preview URL
      const videoUrl = URL.createObjectURL(videoBlob);
      setExportedVideoUrl(videoUrl);
      setShowPreview(true);

      console.log("Video exported successfully");
    } catch (error) {
      console.error("Error exporting video:", error);
    } finally {
      setIsExporting(false);
    }
  };

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

  const handleClose = () => {
    setShowPreview(false);
    setExportedVideoUrl("");
    setExportProgress(0);
    setIsExporting(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {showPreview ? "Xem trước video" : "Cấu hình xuất video"}
        </DialogTitle>

        {!showPreview ? (
          <>
            <DialogContent>
              <Typography variant="subtitle1" gutterBottom>
                Chọn chất lượng và định dạng xuất video
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel>Chất lượng video</InputLabel>
                <Select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  label="Chất lượng video"
                >
                  <MenuItem value="720p">HD (720p)</MenuItem>
                  <MenuItem value="1080p">Full HD (1080p)</MenuItem>
                  <MenuItem value="4k">4K (2160p)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Định dạng</InputLabel>
                <Select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  label="Định dạng"
                >
                  <MenuItem value="mp4">MP4</MenuItem>
                  <MenuItem value="mov">MOV</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Tốc độ khung hình (FPS)</InputLabel>
                <Select
                  value={fps}
                  onChange={(e) => setFps(e.target.value)}
                  label="Tốc độ khung hình (FPS)"
                >
                  <MenuItem value="24">24fps</MenuItem>
                  <MenuItem value="30">30fps</MenuItem>
                  <MenuItem value="60">60fps</MenuItem>
                </Select>
              </FormControl>

              {isExporting && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" gutterBottom>
                    Đang xử lý... {exportProgress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={exportProgress}
                  />
                </Box>
              )}
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button
                onClick={handleExport}
                variant="contained"
                disabled={isExporting}
                startIcon={<CloudDownload />}
              >
                {isExporting ? "Đang xuất..." : "Xuất video"}
              </Button>
            </DialogActions>
          </>
        ) : (
          <VideoShareDialog
            open={showPreview}
            onClose={() => setShowPreview(false)}
            videoSrc={exportedVideoUrl}
          />
        )}
      </Dialog>
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
} from "@mui/material";
import { Image as ImageIcon, CloudDownload } from "@mui/icons-material";
const ExportDialog = ({ open, onClose, onExport }) => {
  const [exportSettings, setExportSettings] = useState({
    quality: "1080p",
    format: "mp4",
    fps: "30",
  });
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExport = async () => {
    setExporting(true);
    setProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setExporting(false);
          onClose();
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Call actual export function
    await onExport(
      exportSettings.quality,
      exportSettings.format,
      exportSettings.fps,
      setProgress
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Export Video</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Quality</InputLabel>
            <Select
              value={exportSettings.quality}
              label="Quality"
              onChange={(e) =>
                setExportSettings((prev) => ({
                  ...prev,
                  quality: e.target.value,
                }))
              }
            >
              <MenuItem value="720p">720p HD</MenuItem>
              <MenuItem value="1080p">1080p Full HD</MenuItem>
              <MenuItem value="4k">4K Ultra HD</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Format</InputLabel>
            <Select
              value={exportSettings.format}
              label="Format"
              onChange={(e) =>
                setExportSettings((prev) => ({
                  ...prev,
                  format: e.target.value,
                }))
              }
            >
              <MenuItem value="mp4">MP4</MenuItem>
              <MenuItem value="mov">MOV</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Frame Rate</InputLabel>
            <Select
              value={exportSettings.fps}
              label="Frame Rate"
              onChange={(e) =>
                setExportSettings((prev) => ({ ...prev, fps: e.target.value }))
              }
            >
              <MenuItem value="24">24 FPS</MenuItem>
              <MenuItem value="30">30 FPS</MenuItem>
              <MenuItem value="60">60 FPS</MenuItem>
            </Select>
          </FormControl>

          {exporting && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Exporting... {progress}%
              </Typography>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={exporting}>
          Cancel
        </Button>
        <Button
          onClick={handleExport}
          variant="contained"
          disabled={exporting}
          startIcon={
            exporting ? <CircularProgress size={20} /> : <CloudDownload />
          }
        >
          {exporting ? "Exporting..." : "Export"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ExportDialog;

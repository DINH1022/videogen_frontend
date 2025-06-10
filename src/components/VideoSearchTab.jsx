import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Tabs,
  Tab,
  Paper,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import { Image as ImageIcon, VideoLibrary } from "@mui/icons-material";
const VideoSearchTab = () => {
  const [keyword, setKeyword] = useState("");
  const [foundVideo, setFoundVideo] = useState("");
  const [loading, setLoading] = useState(false);

  const searchVideo = async () => {
    if (!keyword.trim()) return;

    setLoading(true);

    // Simulate API call - replace with actual implementation
    setTimeout(() => {
      // Use a sample video URL for demo
      const sampleVideo =
        "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4";
      setFoundVideo(sampleVideo);
      setLoading(false);
    }, 1500);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Search Videos
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Enter keywords to search videos..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={searchVideo}
        disabled={loading || !keyword.trim()}
        startIcon={loading ? <CircularProgress size={20} /> : <VideoLibrary />}
        sx={{ mb: 3 }}
      >
        {loading ? "Searching..." : "Search Videos"}
      </Button>

      <Typography variant="h6" gutterBottom>
        Result
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Click and drag to timeline to use
      </Typography>

      {foundVideo ? (
        <Card>
          <Box
            component="video"
            src={foundVideo}
            controls
            draggable
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Card>
      ) : (
        <Paper sx={{ p: 3, textAlign: "center", bgcolor: "grey.50" }}>
          <VideoLibrary sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
          <Typography color="text.secondary">No videos found yet</Typography>
        </Paper>
      )}
    </Box>
  );
};
export default VideoSearchTab;

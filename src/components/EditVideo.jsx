import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Paper,
  IconButton,
  Slider,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  SkipPrevious,
  SkipNext,
  Image,
  Movie,
  MusicNote,
  Add,
  Delete,
  KeyboardArrowUp,
  KeyboardArrowDown,
  DragIndicator,
  Edit,
  Timer,
} from "@mui/icons-material";

const VideoEditor = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const [transition, setTransition] = useState("fade");
  const [currentPreviewItem, setCurrentPreviewItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editDuration, setEditDuration] = useState(0);
  const playIntervalRef = useRef(null);

  const [timelineItems, setTimelineItems] = useState([
    {
      id: "1",
      type: "image",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
      duration: 10,
      start: 0,
      title: "Sunset Beach",
    },
    {
      id: "2",
      type: "image",
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop",
      duration: 8,
      start: 10,
      title: "Forest Path",
    },
    {
      id: "3",
      type: "image",
      src: "https://images.unsplash.com/photo-1464822759844-d150baac0dc8?w=800&h=450&fit=crop",
      duration: 12,
      start: 18,
      title: "Mountain View",
    },
    {
      id: "4",
      type: "audio",
      src: "background-music.mp3",
      duration: 30,
      start: 0,
      title: "Background Music",
    },
  ]);

  // Tìm item hiện tại dựa trên currentTime
  const getCurrentPreviewItem = (time) => {
    const visualItems = timelineItems.filter(
      (item) => item.type === "image" || item.type === "video"
    );
    return visualItems.find(
      (item) => time >= item.start && time < item.start + item.duration
    );
  };

  // Effect để cập nhật preview khi currentTime thay đổi
  useEffect(() => {
    const currentItem = getCurrentPreviewItem(currentTime);
    setCurrentPreviewItem(currentItem);
  }, [currentTime, timelineItems]);

  // Effect để handle auto-play
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 0.1;
        });
      }, 100);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimelineClick = (event, newValue) => {
    setCurrentTime(newValue);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleTransitionChange = (event) => {
    setTransition(event.target.value);
  };

  const handleAddMedia = (type) => {
    const imageUrls = [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop",
    ];

    const lastItem = timelineItems
      .filter((item) => item.type === type)
      .reduce(
        (latest, item) =>
          item.start + item.duration > latest
            ? item.start + item.duration
            : latest,
        0
      );

    const newItem = {
      id: Date.now().toString(),
      type: type,
      src:
        type === "audio"
          ? "new-audio.mp3"
          : imageUrls[Math.floor(Math.random() * imageUrls.length)],
      duration: 5,
      start: lastItem,
      title: `New ${type} ${
        timelineItems.filter((item) => item.type === type).length + 1
      }`,
    };

    setTimelineItems([...timelineItems, newItem]);
    setDuration(Math.max(duration, newItem.start + newItem.duration));
  };

  const handleDeleteItem = (id) => {
    setTimelineItems(timelineItems.filter((item) => item.id !== id));
  };

  const handleMoveItem = (id, direction) => {
    const currentIndex = timelineItems.findIndex((item) => item.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === timelineItems.length - 1)
    ) {
      return;
    }

    const newItems = [...timelineItems];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    [newItems[currentIndex], newItems[targetIndex]] = [
      newItems[targetIndex],
      newItems[currentIndex],
    ];
    setTimelineItems(newItems);
  };

  const handleEditDuration = (item) => {
    setEditingItem(item);
    setEditDuration(item.duration);
    setEditDialogOpen(true);
  };

  const handleSaveDuration = () => {
    if (editingItem && editDuration > 0) {
      const updatedItems = timelineItems.map((item) =>
        item.id === editingItem.id ? { ...item, duration: editDuration } : item
      );

      // Cập nhật lại start time cho các items sau
      const visualItems = updatedItems.filter(
        (item) => item.type === "image" || item.type === "video"
      );
      visualItems.sort((a, b) => a.start - b.start);

      let currentStart = 0;
      visualItems.forEach((item) => {
        item.start = currentStart;
        currentStart += item.duration;
      });

      setTimelineItems(updatedItems);
      setDuration(
        Math.max(...visualItems.map((item) => item.start + item.duration))
      );
    }
    setEditDialogOpen(false);
    setEditingItem(null);
  };

  const getMediaIcon = (type) => {
    switch (type) {
      case "image":
        return <Image />;
      case "video":
        return <Movie />;
      case "audio":
        return <MusicNote />;
      default:
        return <Image />;
    }
  };

  const getMediaTypeText = (type) => {
    switch (type) {
      case "image":
        return "Hình ảnh";
      case "video":
        return "Video";
      case "audio":
        return "Âm thanh";
      default:
        return "Hình ảnh";
    }
  };

  const skipToPrevious = () => {
    const visualItems = timelineItems
      .filter((item) => item.type === "image" || item.type === "video")
      .sort((a, b) => a.start - b.start);

    const currentIndex = visualItems.findIndex(
      (item) =>
        currentTime >= item.start && currentTime < item.start + item.duration
    );

    if (currentIndex > 0) {
      setCurrentTime(visualItems[currentIndex - 1].start);
    } else if (visualItems.length > 0) {
      setCurrentTime(0);
    }
  };

  const skipToNext = () => {
    const visualItems = timelineItems
      .filter((item) => item.type === "image" || item.type === "video")
      .sort((a, b) => a.start - b.start);

    const currentIndex = visualItems.findIndex(
      (item) =>
        currentTime >= item.start && currentTime < item.start + item.duration
    );

    if (currentIndex < visualItems.length - 1) {
      setCurrentTime(visualItems[currentIndex + 1].start);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      {/* Video Preview Area */}
      <Box
        sx={{
          backgroundColor: "#000",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          minHeight: "400px",
          p: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "800px",
            aspectRatio: "16/9",
            backgroundColor: "#1a1a1a",
            borderRadius: 2,
            overflow: "hidden",
            border: "2px solid #333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {currentPreviewItem ? (
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#000",
                  overflow: "hidden", // Thêm overflow hidden
                }}
              >
                <img
                  src={currentPreviewItem.src}
                  alt={currentPreviewItem.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Thay đổi từ contain sang cover
                    transition:
                      transition === "fade"
                        ? "opacity 0.5s ease-in-out"
                        : "none",
                  }}
                />
              </Box>

              {/* Overlay thông tin */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
                  color: "white",
                  p: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {currentPreviewItem.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {formatTime(currentTime - currentPreviewItem.start)} /{" "}
                  {formatTime(currentPreviewItem.duration)}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#666",
              }}
            >
              <Movie sx={{ fontSize: 64, mb: 2 }} />
              <Typography variant="h6">Preview Area</Typography>
              <Typography variant="body2">
                Thêm hình ảnh hoặc video vào timeline
              </Typography>
            </Box>
          )}

          {/* Play overlay khi pause */}
          {!isPlaying && currentPreviewItem && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
              onClick={togglePlayPause}
            >
              <IconButton
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                  width: 80,
                  height: 80,
                }}
              >
                <PlayArrow sx={{ fontSize: 40, color: "#1976d2" }} />
              </IconButton>
            </Box>
          )}

          {/* Playing indicator */}
          {isPlaying && (
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                backgroundColor: "rgba(244, 67, 54, 0.9)",
                color: "white",
                px: 2,
                py: 1,
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  backgroundColor: "white",
                  borderRadius: "50%",
                  animation: "blink 1s infinite",
                }}
              />
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                LIVE
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Controls Area */}
      <Paper sx={{ p: 3, borderRadius: 0 }}>
        {/* Playback Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={skipToPrevious}
              sx={{
                backgroundColor: "#f5f5f5",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <SkipPrevious />
            </IconButton>
            <IconButton
              onClick={togglePlayPause}
              sx={{
                backgroundColor: isPlaying ? "#f44336" : "#4caf50",
                color: "white",
                "&:hover": {
                  backgroundColor: isPlaying ? "#d32f2f" : "#388e3c",
                },
              }}
            >
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              onClick={skipToNext}
              sx={{
                backgroundColor: "#f5f5f5",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <SkipNext />
            </IconButton>
            <Typography variant="body1" sx={{ ml: 2, fontWeight: "medium" }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" fontWeight="medium">
              Hiệu ứng chuyển cảnh:
            </Typography>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                value={transition}
                onChange={handleTransitionChange}
                displayEmpty
              >
                <MenuItem value="fade">Mờ dần</MenuItem>
                <MenuItem value="slide">Trượt</MenuItem>
                <MenuItem value="zoom">Phóng to</MenuItem>
                <MenuItem value="none">Không có</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Timeline Slider */}
        <Box sx={{ mb: 3 }}>
          <Slider
            value={currentTime}
            min={0}
            max={duration}
            onChange={handleTimelineClick}
            sx={{
              color: "#4caf50",
              height: 8,
              "& .MuiSlider-thumb": {
                width: 20,
                height: 20,
                backgroundColor: "white",
                border: "3px solid #4caf50",
                "&:hover": {
                  boxShadow: "0 0 0 8px rgba(76, 175, 80, 0.16)",
                },
              },
              "& .MuiSlider-track": {
                backgroundColor: "#4caf50",
                height: 8,
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#e0e0e0",
                height: 8,
              },
            }}
          />
        </Box>

        {/* Add Media Buttons */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<Image />}
            onClick={() => handleAddMedia("image")}
            sx={{ backgroundColor: "#2196f3" }}
          >
            Thêm hình ảnh
          </Button>
          <Button
            variant="contained"
            startIcon={<Movie />}
            onClick={() => handleAddMedia("video")}
            sx={{ backgroundColor: "#9c27b0" }}
          >
            Thêm video
          </Button>
          <Button
            variant="contained"
            startIcon={<MusicNote />}
            onClick={() => handleAddMedia("audio")}
            sx={{ backgroundColor: "#ff9800" }}
          >
            Thêm nhạc nền
          </Button>
        </Box>

        {/* Timeline Panel */}
        <Paper variant="outlined" sx={{ borderRadius: 2 }}>
          <Box
            sx={{
              p: 2,
              backgroundColor: "#f8f9fa",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "8px 8px 0 0",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Timeline
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Add />}
              size="small"
              onClick={() => handleAddMedia("image")}
            >
              Thêm mục
            </Button>
          </Box>

          <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
            {timelineItems.map((item, index) => (
              <Box key={item.id}>
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    backgroundColor:
                      currentPreviewItem?.id === item.id
                        ? "#e8f5e8"
                        : "transparent",
                    borderLeft:
                      currentPreviewItem?.id === item.id
                        ? "4px solid #4caf50"
                        : "none",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton size="small" sx={{ cursor: "grab" }}>
                      <DragIndicator sx={{ color: "grey.400" }} />
                    </IconButton>

                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt="Timeline item"
                        style={{
                          width: 80,
                          height: 45,
                          objectFit: "cover",
                          borderRadius: 8,
                          border:
                            currentPreviewItem?.id === item.id
                              ? "2px solid #4caf50"
                              : "1px solid #ddd",
                        }}
                      />
                    ) : item.type === "audio" ? (
                      <Avatar
                        sx={{
                          width: 80,
                          height: 45,
                          backgroundColor: "#e3f2fd",
                          borderRadius: 2,
                        }}
                      >
                        <MusicNote sx={{ color: "#2196f3" }} />
                      </Avatar>
                    ) : (
                      <Avatar
                        sx={{
                          width: 80,
                          height: 45,
                          backgroundColor: "#f3e5f5",
                          borderRadius: 2,
                        }}
                      >
                        <Movie sx={{ color: "#9c27b0" }} />
                      </Avatar>
                    )}

                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {getMediaTypeText(item.type)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(item.start)} -{" "}
                        {formatTime(item.start + item.duration)} (
                        {formatTime(item.duration)})
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="small"
                      onClick={() => handleEditDuration(item)}
                      sx={{ color: "#1976d2" }}
                      title="Chỉnh sửa thời lượng"
                    >
                      <Timer />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleMoveItem(item.id, "up")}
                      disabled={index === 0}
                    >
                      <KeyboardArrowUp />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleMoveItem(item.id, "down")}
                      disabled={index === timelineItems.length - 1}
                    >
                      <KeyboardArrowDown />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteItem(item.id)}
                      sx={{ color: "#f44336" }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                {index < timelineItems.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        </Paper>
      </Paper>

      {/* Edit Duration Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Timer />
            Chỉnh sửa thời lượng
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Thời lượng hiển thị cho: <strong>{editingItem?.title}</strong>
            </Typography>
            <TextField
              label="Thời lượng (giây)"
              type="number"
              value={editDuration}
              onChange={(e) => setEditDuration(Number(e.target.value))}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">giây</InputAdornment>
                ),
              }}
              inputProps={{
                min: 0.1,
                step: 0.1,
              }}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              Thời lượng hiện tại: {formatTime(editingItem?.duration || 0)}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleSaveDuration} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <style jsx>{`
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0.3;
          }
        }
      `}</style>
    </Box>
  );
};

export default VideoEditor;

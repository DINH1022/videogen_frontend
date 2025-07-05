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
import { Image as ImageIcon, Add, AutoAwesome } from "@mui/icons-material";

const ImageGenTab = ({ mainEngine, resourceList }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState();
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    setTimeout(() => {
      // Use resourceList if available, otherwise fallback
      const imagesToUse =
        resourceList && resourceList.length > 0 ? resourceList : fallbackImages;
      const randomImage =
        imagesToUse[Math.floor(Math.random() * imagesToUse.length)];
      setGeneratedImage(randomImage);
      setLoading(false);
    }, 2000);
  };

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, "_blank", "width=800,height=600");
  };

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        overflow: "auto",
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <AutoAwesome
          sx={{
            fontSize: 28,
            color: "primary.main",
            mb: 1,
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
        />
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #2196F3, #21CBF3)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
            fontSize: "1.3rem",
          }}
        >
          AI Image Generator
        </Typography>
      </Box>

      {/* Input Section */}
      <Card
        elevation={6}
        sx={{
          mb: 3,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "primary.main",
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "1rem",
            }}
          >
            <Add sx={{ fontSize: 18 }} />
            Create Your Vision
          </Typography>

          <TextField
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            placeholder="Describe your image..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                fontSize: "0.875rem",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
                "&.Mui-focused": {
                  backgroundColor: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                    borderWidth: 2,
                  },
                },
              },
              "& .MuiInputBase-input": {
                fontSize: "0.875rem",
                lineHeight: 1.5,
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            startIcon={
              loading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <AutoAwesome />
              )
            }
            sx={{
              py: 1,
              fontSize: "0.9rem",
              fontWeight: 600,
              borderRadius: 2,
              background: loading
                ? "linear-gradient(45deg, #ccc, #999)"
                : "linear-gradient(45deg, #2196F3, #21CBF3)",
              boxShadow: loading
                ? "none"
                : "0 3px 10px rgba(33, 150, 243, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: loading
                  ? "linear-gradient(45deg, #ccc, #999)"
                  : "linear-gradient(45deg, #1976D2, #1CB5E0)",
                boxShadow: loading
                  ? "none"
                  : "0 4px 15px rgba(33, 150, 243, 0.4)",
                transform: loading ? "none" : "translateY(-1px)",
              },
              "&:disabled": {
                background: "linear-gradient(45deg, #e0e0e0, #bdbdbd)",
                color: "rgba(0, 0, 0, 0.4)",
              },
            }}
          >
            {loading ? "Generating..." : "Generate Image"}
          </Button>
        </Box>
      </Card>

      {/* Results Section */}
      <Card
        elevation={6}
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <ImageIcon sx={{ color: "primary.main", fontSize: 20 }} />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: "primary.main", fontSize: "1rem" }}
            >
              Generated Images
            </Typography>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              mb: 1,
              fontStyle: "italic",
              textAlign: "center",
              display: "block",
              fontSize: "0.75rem",
            }}
          >
            💡 Click to view • Drag to timeline
          </Typography>

          {generatedImage ? (
            <Card
              elevation={3}
              sx={{
                cursor: "pointer",
                borderRadius: 2,
                overflow: "hidden",
                transition: "all 0.3s ease",
                position: "relative",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 203, 243, 0.1))",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 1,
                },
                "&:hover:before": {
                  opacity: 1,
                },
              }}
              onClick={() => handleImageClick(generatedImage)}
            >
              <Box
                component="img"
                src={generatedImage}
                alt="Generated image"
                draggable
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  position: "relative",
                  zIndex: 0,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(5px)",
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "primary.main",
                  zIndex: 2,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  ".MuiCard-root:hover &": {
                    opacity: 1,
                  },
                }}
              >
                Click to expand
              </Box>
            </Card>
          ) : (
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 2,
                background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                border: "2px dashed #dee2e6",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "primary.main",
                  background: "linear-gradient(135deg, #f0f8ff, #e3f2fd)",
                },
              }}
            >
              <ImageIcon
                sx={{
                  fontSize: 40,
                  color: "grey.400",
                  mb: 1,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                }}
              />
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ fontWeight: 500, mb: 0.5 }}
              >
                No image yet
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontStyle: "italic", fontSize: "0.75rem" }}
              >
                Generate your first image above
              </Typography>
            </Paper>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default ImageGenTab;
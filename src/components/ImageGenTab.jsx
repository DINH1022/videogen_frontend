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
import { Image as ImageIcon, Add } from "@mui/icons-material";

const ImageGenTab = ({ mainEngine, resourceList }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(
    resourceList && resourceList.length > 0
      ? resourceList[0]
      : "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
  );
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
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Generate Image
      </Typography>

      <TextField
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        placeholder="Describe the image you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={generateImage}
        disabled={loading || !prompt.trim()}
        startIcon={loading ? <CircularProgress size={20} /> : <Add />}
        sx={{ mb: 3 }}
      >
        {loading ? "Generating..." : "Generate Image"}
      </Button>

      <Typography variant="h6" gutterBottom>
        Current Images ({resourceList ? resourceList.length : 0})
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Click to view in popup, drag to timeline to use
      </Typography>

      {generatedImage ? (
        <Card
          sx={{ cursor: "pointer", "&:hover": { boxShadow: 6 } }}
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
            }}
          />
        </Card>
      ) : (
        <Paper sx={{ p: 3, textAlign: "center", bgcolor: "grey.50" }}>
          <ImageIcon sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
          <Typography color="text.secondary">No image generated yet</Typography>
        </Paper>
      )}
    </Box>
  );
};
export default ImageGenTab;

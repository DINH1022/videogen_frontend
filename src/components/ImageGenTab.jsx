// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   Box,
// //   Button,
// //   TextField,
// //   Typography,
// //   Card,
// //   Tabs,
// //   Tab,
// //   Paper,
// //   Toolbar,
// //   CircularProgress,
// // } from "@mui/material";
// // import { Image as ImageIcon, Add, AutoAwesome } from "@mui/icons-material";

// // const ImageGenTab = ({ mainEngine, resourceList }) => {
// //   const [prompt, setPrompt] = useState("");
// //   const [generatedImage, setGeneratedImage] = useState();
// //   const [loading, setLoading] = useState(false);

// //   const generateImage = async () => {
// //     if (!prompt.trim()) return;

// //     setLoading(true);

// //     setTimeout(() => {
// //       // Use resourceList if available, otherwise fallback
// //       const imagesToUse =
// //         resourceList && resourceList.length > 0 ? resourceList : fallbackImages;
// //       const randomImage =
// //         imagesToUse[Math.floor(Math.random() * imagesToUse.length)];
// //       setGeneratedImage(randomImage);
// //       setLoading(false);
// //     }, 2000);
// //   };

// //   const handleImageClick = (imageUrl) => {
// //     window.open(imageUrl, "_blank", "width=800,height=600");
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         p: 2,
// //         height: "100%",
// //         background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
// //         overflow: "auto",
// //       }}
// //     >
// //       {/* Header Section */}
// //       <Box sx={{ mb: 3, textAlign: "center" }}>
// //         <AutoAwesome
// //           sx={{
// //             fontSize: 28,
// //             color: "primary.main",
// //             mb: 1,
// //             filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
// //           }}
// //         />
// //         <Typography
// //           variant="h6"
// //           gutterBottom
// //           sx={{
// //             fontWeight: "bold",
// //             background: "linear-gradient(45deg, #2196F3, #21CBF3)",
// //             backgroundClip: "text",
// //             WebkitBackgroundClip: "text",
// //             WebkitTextFillColor: "transparent",
// //             mb: 1,
// //             fontSize: "1.3rem",
// //           }}
// //         >
// //           AI Image Generator
// //         </Typography>
// //       </Box>

// //       {/* Input Section */}
// //       <Card
// //         elevation={6}
// //         sx={{
// //           mb: 3,
// //           background: "rgba(255, 255, 255, 0.95)",
// //           backdropFilter: "blur(10px)",
// //           border: "1px solid rgba(255, 255, 255, 0.2)",
// //           borderRadius: 2,
// //           overflow: "hidden",
// //         }}
// //       >
// //         <Box sx={{ p: 2 }}>
// //           <Typography
// //             variant="subtitle1"
// //             gutterBottom
// //             sx={{
// //               fontWeight: 600,
// //               color: "primary.main",
// //               mb: 2,
// //               display: "flex",
// //               alignItems: "center",
// //               gap: 1,
// //               fontSize: "1rem",
// //             }}
// //           >
// //             <Add sx={{ fontSize: 18 }} />
// //             Create Your Vision
// //           </Typography>

// //           <TextField
// //             multiline
// //             rows={3}
// //             fullWidth
// //             variant="outlined"
// //             placeholder="Describe your image..."
// //             value={prompt}
// //             onChange={(e) => setPrompt(e.target.value)}
// //             sx={{
// //               mb: 2,
// //               "& .MuiOutlinedInput-root": {
// //                 borderRadius: 2,
// //                 backgroundColor: "rgba(255, 255, 255, 0.8)",
// //                 fontSize: "0.875rem",
// //                 "&:hover": {
// //                   backgroundColor: "rgba(255, 255, 255, 0.9)",
// //                 },
// //                 "&.Mui-focused": {
// //                   backgroundColor: "white",
// //                   "& .MuiOutlinedInput-notchedOutline": {
// //                     borderColor: "primary.main",
// //                     borderWidth: 2,
// //                   },
// //                 },
// //               },
// //               "& .MuiInputBase-input": {
// //                 fontSize: "0.875rem",
// //                 lineHeight: 1.5,
// //               },
// //             }}
// //           />

// //           <Button
// //             fullWidth
// //             variant="contained"
// //             onClick={generateImage}
// //             disabled={loading || !prompt.trim()}
// //             startIcon={
// //               loading ? (
// //                 <CircularProgress size={16} color="inherit" />
// //               ) : (
// //                 <AutoAwesome />
// //               )
// //             }
// //             sx={{
// //               py: 1,
// //               fontSize: "0.9rem",
// //               fontWeight: 600,
// //               borderRadius: 2,
// //               background: loading
// //                 ? "linear-gradient(45deg, #ccc, #999)"
// //                 : "linear-gradient(45deg, #2196F3, #21CBF3)",
// //               boxShadow: loading
// //                 ? "none"
// //                 : "0 3px 10px rgba(33, 150, 243, 0.3)",
// //               transition: "all 0.3s ease",
// //               "&:hover": {
// //                 background: loading
// //                   ? "linear-gradient(45deg, #ccc, #999)"
// //                   : "linear-gradient(45deg, #1976D2, #1CB5E0)",
// //                 boxShadow: loading
// //                   ? "none"
// //                   : "0 4px 15px rgba(33, 150, 243, 0.4)",
// //                 transform: loading ? "none" : "translateY(-1px)",
// //               },
// //               "&:disabled": {
// //                 background: "linear-gradient(45deg, #e0e0e0, #bdbdbd)",
// //                 color: "rgba(0, 0, 0, 0.4)",
// //               },
// //             }}
// //           >
// //             {loading ? "Generating..." : "Generate Image"}
// //           </Button>
// //         </Box>
// //       </Card>

// //       {/* Results Section */}
// //       <Card
// //         elevation={6}
// //         sx={{
// //           background: "rgba(255, 255, 255, 0.95)",
// //           backdropFilter: "blur(10px)",
// //           border: "1px solid rgba(255, 255, 255, 0.2)",
// //           borderRadius: 2,
// //           overflow: "hidden",
// //         }}
// //       >
// //         <Box sx={{ p: 2 }}>
// //           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
// //             <ImageIcon sx={{ color: "primary.main", fontSize: 20 }} />
// //             <Typography
// //               variant="subtitle1"
// //               sx={{ fontWeight: 600, color: "primary.main", fontSize: "1rem" }}
// //             >
// //               Generated Images
// //             </Typography>
// //           </Box>

// //           <Typography
// //             variant="caption"
// //             color="text.secondary"
// //             sx={{
// //               mb: 1,
// //               fontStyle: "italic",
// //               textAlign: "center",
// //               display: "block",
// //               fontSize: "0.75rem",
// //             }}
// //           >
// //             💡 Click to view • Drag to timeline
// //           </Typography>

// //           {generatedImage ? (
// //             <Card
// //               elevation={3}
// //               sx={{
// //                 cursor: "pointer",
// //                 borderRadius: 2,
// //                 overflow: "hidden",
// //                 transition: "all 0.3s ease",
// //                 position: "relative",
// //                 "&:hover": {
// //                   transform: "scale(1.02)",
// //                   boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
// //                 },
// //                 "&:before": {
// //                   content: '""',
// //                   position: "absolute",
// //                   top: 0,
// //                   left: 0,
// //                   right: 0,
// //                   bottom: 0,
// //                   background:
// //                     "linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 203, 243, 0.1))",
// //                   opacity: 0,
// //                   transition: "opacity 0.3s ease",
// //                   zIndex: 1,
// //                 },
// //                 "&:hover:before": {
// //                   opacity: 1,
// //                 },
// //               }}
// //               onClick={() => handleImageClick(generatedImage)}
// //             >
// //               <Box
// //                 component="img"
// //                 src={generatedImage}
// //                 alt="Generated image"
// //                 draggable
// //                 sx={{
// //                   width: "100%",
// //                   height: "auto",
// //                   display: "block",
// //                   position: "relative",
// //                   zIndex: 0,
// //                 }}
// //               />
// //               <Box
// //                 sx={{
// //                   position: "absolute",
// //                   bottom: 8,
// //                   right: 8,
// //                   backgroundColor: "rgba(255, 255, 255, 0.9)",
// //                   backdropFilter: "blur(5px)",
// //                   borderRadius: 1,
// //                   px: 1,
// //                   py: 0.5,
// //                   fontSize: "0.75rem",
// //                   fontWeight: 500,
// //                   color: "primary.main",
// //                   zIndex: 2,
// //                   opacity: 0,
// //                   transition: "opacity 0.3s ease",
// //                   ".MuiCard-root:hover &": {
// //                     opacity: 1,
// //                   },
// //                 }}
// //               >
// //                 Click to expand
// //               </Box>
// //             </Card>
// //           ) : (
// //             <Paper
// //               sx={{
// //                 p: 3,
// //                 textAlign: "center",
// //                 borderRadius: 2,
// //                 background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
// //                 border: "2px dashed #dee2e6",
// //                 transition: "all 0.3s ease",
// //                 "&:hover": {
// //                   borderColor: "primary.main",
// //                   background: "linear-gradient(135deg, #f0f8ff, #e3f2fd)",
// //                 },
// //               }}
// //             >
// //               <ImageIcon
// //                 sx={{
// //                   fontSize: 40,
// //                   color: "grey.400",
// //                   mb: 1,
// //                   filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
// //                 }}
// //               />
// //               <Typography
// //                 variant="subtitle2"
// //                 color="text.secondary"
// //                 sx={{ fontWeight: 500, mb: 0.5 }}
// //               >
// //                 No image yet
// //               </Typography>
// //               <Typography
// //                 variant="caption"
// //                 color="text.secondary"
// //                 sx={{ fontStyle: "italic", fontSize: "0.75rem" }}
// //               >
// //                 Generate your first image above
// //               </Typography>
// //             </Paper>
// //           )}
// //         </Box>
// //       </Card>
// //     </Box>
// //   );
// // };

// // export default ImageGenTab;

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
import {
  Image as ImageIcon,
  Add,
  AutoAwesome,
  DragIndicator,
} from "@mui/icons-material";

const ImageGenTab = ({ mainEngine, resourceList }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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

  // Drag and Drop handlers
  const handleDragStart = (e, imageUrl) => {
    console.log("Drag started for image:", imageUrl);
    setIsDragging(true);

    // Store image data for drop handling
    e.dataTransfer.setData("text/plain", imageUrl);
    e.dataTransfer.setData("application/x-image-url", imageUrl);

    // Set drag effect
    e.dataTransfer.effectAllowed = "copy";

    // Optional: Create custom drag preview
    const dragPreview = document.createElement("div");
    dragPreview.innerHTML = "📸 Adding image to timeline...";
    dragPreview.style.cssText = `
      position: absolute;
      top: -1000px;
      background: rgba(33, 150, 243, 0.9);
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
    `;
    document.body.appendChild(dragPreview);
    e.dataTransfer.setDragImage(dragPreview, 0, 0);

    // Clean up drag preview
    setTimeout(() => {
      document.body.removeChild(dragPreview);
    }, 100);
  };

  const handleDragEnd = (e) => {
    console.log("Drag ended");
    setIsDragging(false);
  };

  // Add image to timeline function
  const addImageToTimeline = async (imageUrl) => {
    if (!mainEngine) {
      console.error("Main engine not available");
      return;
    }

    try {
      console.log("Adding image to timeline:", imageUrl);

      const page = mainEngine.scene.getCurrentPage();
      const tracks = mainEngine.block.findByType("track");

      if (tracks.length === 0) {
        console.error("No tracks found");
        return;
      }

      // Use the first track (main image track)
      const track = tracks[0];

      // Get page dimensions
      const pageWidth = mainEngine.block.getWidth(page);
      const pageHeight = mainEngine.block.getHeight(page);

      // Create new image block
      const block = mainEngine.block.create("graphic");
      mainEngine.block.setShape(block, mainEngine.block.createShape("rect"));

      // Set block size to match page
      mainEngine.block.setWidth(block, pageWidth);
      mainEngine.block.setHeight(block, pageHeight);
      mainEngine.block.setPositionX(block, 0);
      mainEngine.block.setPositionY(block, 0);

      // Create image fill
      const fill = mainEngine.block.createFill("image");
      mainEngine.block.setString(fill, "fill/image/imageFileURI", imageUrl);

      // Set fill mode to cover
      try {
        mainEngine.block.setEnum(fill, "fill/image/fillMode", "Cover");
      } catch (fillModeError) {
        console.warn("Could not set fill mode:", fillModeError);
      }

      mainEngine.block.setFill(block, fill);
      mainEngine.block.setDuration(block, 3); // Default 3 seconds

      // Add animations
      try {
        const zoomAnimation = mainEngine.block.createAnimation("zoom");
        const fadeOutAnimation = mainEngine.block.createAnimation("fade");
        mainEngine.block.setDuration(zoomAnimation, 1.2);
        mainEngine.block.setInAnimation(block, zoomAnimation);
        mainEngine.block.setOutAnimation(block, fadeOutAnimation);
      } catch (animError) {
        console.warn("Could not add animations:", animError);
      }

      // Add to track
      mainEngine.block.appendChild(track, block);

      console.log("Image added to timeline successfully");

      // Optional: Show success notification
      // You can add a toast notification here
    } catch (error) {
      console.error("Error adding image to timeline:", error);
    }
  };

  // Double-click to add to timeline
  const handleDoubleClick = (imageUrl) => {
    addImageToTimeline(imageUrl);
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
            💡 Click to view • Double-click or drag to timeline
          </Typography>

          {generatedImage ? (
            <Card
              elevation={3}
              sx={{
                cursor: isDragging ? "grabbing" : "grab",
                borderRadius: 2,
                overflow: "hidden",
                transition: "all 0.3s ease",
                position: "relative",
                border: isDragging
                  ? "2px dashed #2196F3"
                  : "2px solid transparent",
                "&:hover": {
                  transform: isDragging ? "none" : "scale(1.02)",
                  boxShadow: isDragging
                    ? "0 8px 25px rgba(33, 150, 243, 0.3)"
                    : "0 6px 20px rgba(0,0,0,0.15)",
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: isDragging
                    ? "linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 203, 243, 0.2))"
                    : "linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 203, 243, 0.1))",
                  opacity: isDragging ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  zIndex: 1,
                },
                "&:hover:before": {
                  opacity: 1,
                },
              }}
              onClick={() => handleImageClick(generatedImage)}
              onDoubleClick={() => handleDoubleClick(generatedImage)}
            >
              <Box
                component="img"
                src={generatedImage}
                alt="Generated image"
                draggable
                onDragStart={(e) => handleDragStart(e, generatedImage)}
                onDragEnd={handleDragEnd}
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  position: "relative",
                  zIndex: 0,
                  userSelect: "none",
                }}
              />

              {/* Drag indicator */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(33, 150, 243, 0.9)",
                  color: "white",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                  opacity: isDragging ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  ".MuiCard-root:hover &": {
                    opacity: 1,
                  },
                }}
              >
                <DragIndicator sx={{ fontSize: 14 }} />
              </Box>

              {/* Action hint */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: 8,
                  right: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(5px)",
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  color: "primary.main",
                  zIndex: 2,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  textAlign: "center",
                  ".MuiCard-root:hover &": {
                    opacity: 1,
                  },
                }}
              >
                {isDragging
                  ? "Drop on timeline"
                  : "Drag to timeline or double-click"}
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
// 2. Cập nhật ImageGenTab.js để hỗ trợ drag and drop tốt hơn
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Card,
//   Tabs,
//   Tab,
//   Paper,
//   Toolbar,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Image as ImageIcon,
//   Add,
//   AutoAwesome,
//   DragIndicator,
// } from "@mui/icons-material";

// const ImageGenTab = ({ mainEngine, resourceList, cesdkInstance }) => {
//   const [prompt, setPrompt] = useState("");
//   const [generatedImage, setGeneratedImage] = useState();
//   const [loading, setLoading] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);

//   const generateImage = async () => {
//     if (!prompt.trim()) return;

//     setLoading(true);

//     setTimeout(() => {
//       // Use resourceList if available, otherwise fallback
//       const imagesToUse =
//         resourceList && resourceList.length > 0 ? resourceList : fallbackImages;
//       const randomImage =
//         imagesToUse[Math.floor(Math.random() * imagesToUse.length)];
//       setGeneratedImage(randomImage);
//       setLoading(false);
//     }, 2000);
//   };

//   const handleImageClick = (imageUrl) => {
//     window.open(imageUrl, "_blank", "width=800,height=600");
//   };

//   // Cải thiện drag and drop handlers
//   const handleDragStart = (e, imageUrl) => {
//     console.log("Drag started for image:", imageUrl);
//     setIsDragging(true);

//     // Thiết lập data transfer với nhiều formats
//     e.dataTransfer.setData("text/plain", imageUrl);
//     e.dataTransfer.setData("application/x-image-url", imageUrl);
//     e.dataTransfer.setData("text/uri-list", imageUrl);

//     // Thiết lập drag effect
//     e.dataTransfer.effectAllowed = "copy";

//     // Tạo custom drag image
//     const dragPreview = document.createElement("div");
//     dragPreview.innerHTML = `
//       <div style="
//         background: linear-gradient(45deg, #2196F3, #21CBF3);
//         color: white;
//         padding: 12px 16px;
//         border-radius: 8px;
//         font-size: 14px;
//         font-weight: 600;
//         box-shadow: 0 4px 16px rgba(33, 150, 243, 0.4);
//         display: flex;
//         align-items: center;
//         gap: 8px;
//       ">
//         <span>📸</span>
//         <span>Drag to add image</span>
//       </div>
//     `;
//     dragPreview.style.cssText = `
//       position: absolute;
//       top: -1000px;
//       left: -1000px;
//       pointer-events: none;
//     `;
//     document.body.appendChild(dragPreview);
//     e.dataTransfer.setDragImage(dragPreview.firstChild, 0, 0);

//     // Cleanup drag preview
//     setTimeout(() => {
//       if (document.body.contains(dragPreview)) {
//         document.body.removeChild(dragPreview);
//       }
//     }, 100);
//   };

//   const handleDragEnd = (e) => {
//     console.log("Drag ended");
//     setIsDragging(false);
//   };

//   // Cải thiện function thêm ảnh vào timeline
//   const addImageToTimeline = async (imageUrl, position = null) => {
//     if (!mainEngine) {
//       console.error("Main engine not available");
//       return;
//     }

//     try {
//       console.log("Adding image to timeline:", imageUrl);

//       const page = mainEngine.scene.getCurrentPage();
//       const tracks = mainEngine.block.findByType("track");

//       if (tracks.length === 0) {
//         console.error("No tracks found");
//         return;
//       }

//       // Sử dụng track đầu tiên
//       const track = tracks[0];

//       // Tạo block mới
//       const block = mainEngine.block.create("graphic");
//       mainEngine.block.setShape(block, mainEngine.block.createShape("rect"));

//       // Lấy kích thước page
//       const pageWidth = mainEngine.block.getWidth(page);
//       const pageHeight = mainEngine.block.getHeight(page);

//       // Thiết lập kích thước và vị trí
//       if (position) {
//         // Nếu có vị trí cụ thể (từ drag and drop)
//         const blockWidth = Math.min(pageWidth * 0.4, 400);
//         const blockHeight = Math.min(pageHeight * 0.4, 300);

//         mainEngine.block.setWidth(block, blockWidth);
//         mainEngine.block.setHeight(block, blockHeight);

//         // Đặt vị trí tại điểm drop
//         const posX = Math.max(
//           0,
//           Math.min(position.x - blockWidth / 2, pageWidth - blockWidth)
//         );
//         const posY = Math.max(
//           0,
//           Math.min(position.y - blockHeight / 2, pageHeight - blockHeight)
//         );

//         mainEngine.block.setPositionX(block, posX);
//         mainEngine.block.setPositionY(block, posY);
//       } else {
//         // Nếu không có vị trí (double click), đặt full size
//         mainEngine.block.setWidth(block, pageWidth);
//         mainEngine.block.setHeight(block, pageHeight);
//         mainEngine.block.setPositionX(block, 0);
//         mainEngine.block.setPositionY(block, 0);
//       }

//       // Tạo image fill
//       const fill = mainEngine.block.createFill("image");
//       mainEngine.block.setString(fill, "fill/image/imageFileURI", imageUrl);

//       // Thiết lập fill mode
//       try {
//         mainEngine.block.setEnum(fill, "fill/image/fillMode", "Cover");
//       } catch (fillModeError) {
//         console.warn("Could not set fill mode:", fillModeError);
//       }

//       mainEngine.block.setFill(block, fill);
//       mainEngine.block.setDuration(block, 3);

//       // Thêm animations
//       try {
//         const zoomAnimation = mainEngine.block.createAnimation("zoom");
//         const fadeOutAnimation = mainEngine.block.createAnimation("fade");
//         mainEngine.block.setDuration(zoomAnimation, 1.2);
//         mainEngine.block.setInAnimation(block, zoomAnimation);
//         mainEngine.block.setOutAnimation(block, fadeOutAnimation);
//       } catch (animError) {
//         console.warn("Could not add animations:", animError);
//       }

//       // Thêm vào track
//       mainEngine.block.appendChild(track, block);

//       console.log("Image added to timeline successfully");

//       // Hiển thị success notification (có thể thêm toast)
//       showSuccessNotification("Image added to timeline!");
//     } catch (error) {
//       console.error("Error adding image to timeline:", error);
//       showErrorNotification("Failed to add image to timeline");
//     }
//   };

//   // Helper functions cho notifications
//   const showSuccessNotification = (message) => {
//     // Tạo temporary notification
//     const notification = document.createElement("div");
//     notification.innerHTML = `
//       <div style="
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         background: linear-gradient(45deg, #4CAF50, #45a049);
//         color: white;
//         padding: 12px 20px;
//         border-radius: 8px;
//         font-weight: 600;
//         box-shadow: 0 4px 16px rgba(76, 175, 80, 0.3);
//         z-index: 9999;
//         animation: slideIn 0.3s ease;
//       ">
//         ✅ ${message}
//       </div>
//     `;
//     document.body.appendChild(notification);

//     setTimeout(() => {
//       if (document.body.contains(notification)) {
//         document.body.removeChild(notification);
//       }
//     }, 3000);
//   };

//   const showErrorNotification = (message) => {
//     const notification = document.createElement("div");
//     notification.innerHTML = `
//       <div style="
//         position: fixed;
//         top: 20px;
//         right: 20px;
//         background: linear-gradient(45deg, #f44336, #d32f2f);
//         color: white;
//         padding: 12px 20px;
//         border-radius: 8px;
//         font-weight: 600;
//         box-shadow: 0 4px 16px rgba(244, 67, 54, 0.3);
//         z-index: 9999;
//       ">
//         ❌ ${message}
//       </div>
//     `;
//     document.body.appendChild(notification);

//     setTimeout(() => {
//       if (document.body.contains(notification)) {
//         document.body.removeChild(notification);
//       }
//     }, 3000);
//   };

//   // Double-click để thêm vào timeline
//   const handleDoubleClick = (imageUrl) => {
//     addImageToTimeline(imageUrl);
//   };

//   // Fallback images
//   const fallbackImages = [
//     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
//     "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
//     "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop",
//     "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
//   ];

//   return (
//     <Box
//       sx={{
//         p: 2,
//         height: "100%",
//         background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
//         overflow: "auto",
//       }}
//     >
//       {/* Header Section */}
//       <Box sx={{ mb: 3, textAlign: "center" }}>
//         <AutoAwesome
//           sx={{
//             fontSize: 28,
//             color: "primary.main",
//             mb: 1,
//             filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
//           }}
//         />
//         <Typography
//           variant="h6"
//           gutterBottom
//           sx={{
//             fontWeight: "bold",
//             background: "linear-gradient(45deg, #2196F3, #21CBF3)",
//             backgroundClip: "text",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             mb: 1,
//             fontSize: "1.3rem",
//           }}
//         >
//           AI Image Generator
//         </Typography>
//       </Box>

//       {/* Input Section */}
//       <Card
//         elevation={6}
//         sx={{
//           mb: 3,
//           background: "rgba(255, 255, 255, 0.95)",
//           backdropFilter: "blur(10px)",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           borderRadius: 2,
//           overflow: "hidden",
//         }}
//       >
//         <Box sx={{ p: 2 }}>
//           <Typography
//             variant="subtitle1"
//             gutterBottom
//             sx={{
//               fontWeight: 600,
//               color: "primary.main",
//               mb: 2,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               fontSize: "1rem",
//             }}
//           >
//             <Add sx={{ fontSize: 18 }} />
//             Create Your Vision
//           </Typography>

//           <TextField
//             multiline
//             rows={3}
//             fullWidth
//             variant="outlined"
//             placeholder="Describe your image..."
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             sx={{
//               mb: 2,
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 2,
//                 backgroundColor: "rgba(255, 255, 255, 0.8)",
//                 fontSize: "0.875rem",
//               },
//             }}
//           />

//           <Button
//             fullWidth
//             variant="contained"
//             onClick={generateImage}
//             disabled={loading || !prompt.trim()}
//             startIcon={
//               loading ? (
//                 <CircularProgress size={16} color="inherit" />
//               ) : (
//                 <AutoAwesome />
//               )
//             }
//             sx={{
//               py: 1,
//               fontSize: "0.9rem",
//               fontWeight: 600,
//               borderRadius: 2,
//               background: loading
//                 ? "linear-gradient(45deg, #ccc, #999)"
//                 : "linear-gradient(45deg, #2196F3, #21CBF3)",
//             }}
//           >
//             {loading ? "Generating..." : "Generate Image"}
//           </Button>
//         </Box>
//       </Card>

//       {/* Results Section */}
//       <Card
//         elevation={6}
//         sx={{
//           background: "rgba(255, 255, 255, 0.95)",
//           backdropFilter: "blur(10px)",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           borderRadius: 2,
//           overflow: "hidden",
//         }}
//       >
//         <Box sx={{ p: 2 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
//             <ImageIcon sx={{ color: "primary.main", fontSize: 20 }} />
//             <Typography
//               variant="subtitle1"
//               sx={{ fontWeight: 600, color: "primary.main", fontSize: "1rem" }}
//             >
//               Generated Images
//             </Typography>
//           </Box>

//           <Typography
//             variant="caption"
//             color="text.secondary"
//             sx={{
//               mb: 2,
//               fontStyle: "italic",
//               textAlign: "center",
//               display: "block",
//               fontSize: "0.75rem",
//             }}
//           >
//             💡 Click to view • Double-click to add • Drag to position on canvas
//           </Typography>

//           {generatedImage ? (
//             <Card
//               elevation={3}
//               sx={{
//                 cursor: isDragging ? "grabbing" : "grab",
//                 borderRadius: 2,
//                 overflow: "hidden",
//                 transition: "all 0.3s ease",
//                 position: "relative",
//                 border: isDragging
//                   ? "2px dashed #2196F3"
//                   : "2px solid transparent",
//                 "&:hover": {
//                   transform: isDragging ? "none" : "scale(1.02)",
//                   boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
//                 },
//               }}
//               onClick={() => handleImageClick(generatedImage)}
//               onDoubleClick={() => handleDoubleClick(generatedImage)}
//             >
//               <Box
//                 component="img"
//                 src={generatedImage}
//                 alt="Generated image"
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, generatedImage)}
//                 onDragEnd={handleDragEnd}
//                 sx={{
//                   width: "100%",
//                   height: "auto",
//                   display: "block",
//                   userSelect: "none",
//                 }}
//               />

//               {/* Drag indicator */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 8,
//                   right: 8,
//                   backgroundColor: "rgba(33, 150, 243, 0.9)",
//                   color: "white",
//                   borderRadius: "50%",
//                   width: 28,
//                   height: 28,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   opacity: isDragging ? 1 : 0,
//                   transition: "opacity 0.3s ease",
//                   ".MuiCard-root:hover &": {
//                     opacity: 1,
//                   },
//                 }}
//               >
//                 <DragIndicator sx={{ fontSize: 16 }} />
//               </Box>

//               {/* Action hint */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   bottom: 8,
//                   left: 8,
//                   right: 8,
//                   backgroundColor: "rgba(255, 255, 255, 0.95)",
//                   backdropFilter: "blur(5px)",
//                   borderRadius: 1,
//                   px: 1,
//                   py: 0.5,
//                   fontSize: "0.7rem",
//                   fontWeight: 500,
//                   color: "primary.main",
//                   opacity: 0,
//                   transition: "opacity 0.3s ease",
//                   textAlign: "center",
//                   ".MuiCard-root:hover &": {
//                     opacity: 1,
//                   },
//                 }}
//               >
//                 {isDragging
//                   ? "Drop on canvas to position"
//                   : "Drag to canvas • Double-click to add"}
//               </Box>
//             </Card>
//           ) : (
//             <Paper
//               sx={{
//                 p: 3,
//                 textAlign: "center",
//                 borderRadius: 2,
//                 background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
//                 border: "2px dashed #dee2e6",
//               }}
//             >
//               <ImageIcon sx={{ fontSize: 40, color: "grey.400", mb: 1 }} />
//               <Typography variant="subtitle2" color="text.secondary">
//                 No image yet
//               </Typography>
//               <Typography variant="caption" color="text.secondary">
//                 Generate your first image above
//               </Typography>
//             </Paper>
//           )}
//         </Box>
//       </Card>
//     </Box>
//   );
// };

// export default ImageGenTab;

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
import { Image as ImageIcon, Share } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import ExportDialog from "../components/ExportDialog";
import ImageGenTab from "../components/ImageGenTab";
import VideoSearchTab from "../components/VideoSearchTab";
import { useSelector } from "react-redux";

// Fallback sample resources (only used if no data is passed)
const fallbackImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
];

export default function CesdkMuiEditor() {
  const containerRef = useRef(null);
  const [mainEngine, setMainEngine] = useState(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const location = useLocation();
  const workspace = useSelector((state) => state.selectedWorkspace);

  // Extract parameters from navigation state
  const workspaceId = location.state?.workspaceId ?? null;
  const resourceList = location.state?.resourceList ?? [];
  const timing = location.state?.timing ?? [];
  const audioUrl = location.state?.audioUrl ?? null;

  console.log("Editor parameters:", {
    workspaceId,
    resourceCount: resourceList.length,
    timingCount: timing.length,
    hasAudio: !!audioUrl,
    timingData: timing,
  });

  const cesdkInstanceRef = useRef(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const initializationAttempted = useRef(false);

  // Helper function to add image to timeline
  const addImageToTimeline = async (imageUrl, position = null) => {
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

      // Use the first track
      const track = tracks[0];

      // Create new block
      const block = mainEngine.block.create("graphic");
      mainEngine.block.setShape(block, mainEngine.block.createShape("rect"));

      // Get page dimensions
      const pageWidth = mainEngine.block.getWidth(page);
      const pageHeight = mainEngine.block.getHeight(page);

      // Set size and position
      if (position) {
        // If specific position (from drag and drop)
        const blockWidth = Math.min(pageWidth * 0.4, 400);
        const blockHeight = Math.min(pageHeight * 0.4, 300);

        mainEngine.block.setWidth(block, blockWidth);
        mainEngine.block.setHeight(block, blockHeight);

        // Position at drop point
        const posX = Math.max(
          0,
          Math.min(position.x - blockWidth / 2, pageWidth - blockWidth)
        );
        const posY = Math.max(
          0,
          Math.min(position.y - blockHeight / 2, pageHeight - blockHeight)
        );

        mainEngine.block.setPositionX(block, posX);
        mainEngine.block.setPositionY(block, posY);
      } else {
        // If no position (double click), set full size
        mainEngine.block.setWidth(block, pageWidth);
        mainEngine.block.setHeight(block, pageHeight);
        mainEngine.block.setPositionX(block, 0);
        mainEngine.block.setPositionY(block, 0);
      }

      // Create image fill
      const fill = mainEngine.block.createFill("image");
      mainEngine.block.setString(fill, "fill/image/imageFileURI", imageUrl);

      // Set fill mode
      try {
        mainEngine.block.setEnum(fill, "fill/image/fillMode", "Cover");
      } catch (fillModeError) {
        console.warn("Could not set fill mode:", fillModeError);
      }

      mainEngine.block.setFill(block, fill);
      mainEngine.block.setDuration(block, 3);

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
      return true;
    } catch (error) {
      console.error("Error adding image to timeline:", error);
      return false;
    }
  };

  // Setup drag and drop handlers for the editor container
  const setupDragAndDrop = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Prevent default drag behavior
    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = "copy";
    };

    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Add visual feedback
      container.style.filter = "brightness(0.95)";
      container.style.border = "2px dashed #2196F3";
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Remove visual feedback
      container.style.filter = "none";
      container.style.border = "none";
    };

    const handleDrop = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Remove visual feedback
      container.style.filter = "none";
      container.style.border = "none";

      // Get dropped image URL
      const imageUrl =
        e.dataTransfer.getData("text/plain") ||
        e.dataTransfer.getData("application/x-image-url") ||
        e.dataTransfer.getData("text/uri-list");

      if (!imageUrl) {
        console.warn("No image URL found in drop data");
        return;
      }

      // Get drop position relative to the editor canvas
      const rect = container.getBoundingClientRect();
      const position = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Add image to timeline
      const success = await addImageToTimeline(imageUrl, position);

      // if (success) {
      //   // Show success notification
      //   showNotification("Image added to timeline!", "success");
      // } else {
      //   showNotification("Failed to add image to timeline", "error");
      // }
    };

    // Add event listeners
    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("dragenter", handleDragEnter);
    container.addEventListener("dragleave", handleDragLeave);
    container.addEventListener("drop", handleDrop);

    // Return cleanup function
    return () => {
      container.removeEventListener("dragover", handleDragOver);
      container.removeEventListener("dragenter", handleDragEnter);
      container.removeEventListener("dragleave", handleDragLeave);
      container.removeEventListener("drop", handleDrop);
    };
  };

  // Show notification helper
  const showNotification = (message, type = "info") => {
    const notification = document.createElement("div");
    const colors = {
      success: "linear-gradient(45deg, #4CAF50, #45a049)",
      error: "linear-gradient(45deg, #f44336, #d32f2f)",
      info: "linear-gradient(45deg, #2196F3, #21CBF3)",
    };

    const icons = {
      success: "✅",
      error: "❌",
      info: "ℹ️",
    };

    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-size: 14px;
      ">
        ${icons[type]} ${message}
      </div>
    `;

    // Add CSS animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }, 3000);
  };

  useEffect(() => {
    if (
      cesdkInstanceRef.current ||
      isInitializing ||
      initializationAttempted.current ||
      !containerRef.current
    ) {
      return;
    }

    const loadCesdk = async () => {
      initializationAttempted.current = true;
      setIsInitializing(true);

      try {
        console.log("Starting CE.SDK initialization...");

        if (!containerRef.current) {
          console.error(
            "Container ref became unavailable during initialization"
          );
          return;
        }

        const CreativeEditorSDK = await import(
          "https://cdn.img.ly/packages/imgly/cesdk-js/1.52.0/index.js"
        ).then((mod) => mod.default || mod);

        if (cesdkInstanceRef.current) {
          console.log("Instance already exists, aborting initialization");
          return;
        }

        const config = {
          license:
            "D9F4Q8oTmX1GIKddna5yTSzuE0FgT7rxGu-Ye4WiYJ6QEseUInIAyPpqyqzZoQAv",
          userId: workspaceId || "USER_ID",
          theme: "light",
          baseURL: "https://cdn.img.ly/packages/imgly/cesdk-js/1.52.0/assets",
          ui: {
            elements: {
              view: "default",
              panels: {
                settings: true,
              },
              navigation: {
                position: "top",
                action: {
                  save: true,
                  load: true,
                  download: true,
                  export: true,
                },
              },
            },
          },
          callbacks: {
            onUpload: "local",
            onSave: (scene) => {
              const element = document.createElement("a");
              const base64Data = btoa(unescape(encodeURIComponent(scene)));
              element.setAttribute(
                "href",
                `data:application/octet-stream;base64,${base64Data}`
              );
              element.setAttribute(
                "download",
                `cesdk-${
                  workspaceId || "scene"
                }-${new Date().toISOString()}.scene`
              );
              element.style.display = "none";
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            },
            onLoad: "upload",
            onDownload: "download",
            onExport: "download",
          },
        };

        console.log("Creating CE.SDK instance...");
        const instance = await CreativeEditorSDK.create(
          containerRef.current,
          config
        );

        cesdkInstanceRef.current = instance;
        console.log("CE.SDK instance created and stored");

        instance.addDefaultAssetSources();
        instance.addDemoAssetSources({ sceneMode: "Video" });
        instance.ui.setBackgroundTrackAssetLibraryEntries([
          "ly.img.image",
          "ly.img.video",
        ]);

        await instance.createVideoScene();

        const engine = instance.engine;
        const page = engine.scene.getCurrentPage();

        engine.block.setWidth(page, 1280);
        engine.block.setHeight(page, 720);

        const track = engine.block.create("track");
        engine.block.appendChild(page, track);
        engine.block.fillParent(track);

        const imagesToUse =
          resourceList.length > 0 ? resourceList : fallbackImages;

        const processedTimings =
          timing.length > 0
            ? timing.map((t) => {
                if (typeof t === "object" && t !== null) {
                  if (t.startTime !== undefined && t.endTime !== undefined) {
                    return t.endTime - t.startTime;
                  }
                  return t.duration || t.time || t.value || 3;
                }
                if (typeof t === "number") return t;
                if (typeof t === "string") {
                  const parsed = parseFloat(t);
                  return isNaN(parsed) ? 3 : parsed;
                }
                return 3;
              })
            : imagesToUse.map(() => 3);

        console.log("FIXED Timing calculation:", {
          originalTiming: timing.slice(0, 2),
          processedTimings: processedTimings,
          totalDuration: processedTimings.reduce((sum, t) => sum + t, 0),
        });

        const pageWidth = engine.block.getWidth(page);
        const pageHeight = engine.block.getHeight(page);

        console.log("Page dimensions:", { pageWidth, pageHeight });

        for (let i = 0; i < imagesToUse.length; i++) {
          const url = imagesToUse[i];
          const duration = processedTimings[i] || 3;

          const block = engine.block.create("graphic");
          engine.block.setShape(block, engine.block.createShape("rect"));

          engine.block.setWidth(block, pageWidth);
          engine.block.setHeight(block, pageHeight);
          engine.block.setPositionX(block, 0);
          engine.block.setPositionY(block, 0);

          const fill = engine.block.createFill("image");
          engine.block.setString(fill, "fill/image/imageFileURI", url);

          try {
            engine.block.setEnum(fill, "fill/image/fillMode", "Cover");
          } catch (fillModeError) {
            console.warn("Could not set fill mode:", fillModeError);
          }

          engine.block.setFill(block, fill);
          engine.block.setDuration(block, duration);

          try {
            const zoomAnimation = engine.block.createAnimation("zoom");
            const fadeOutAnimation = engine.block.createAnimation("fade");
            engine.block.setDuration(zoomAnimation, 1.2);
            engine.block.setInAnimation(block, zoomAnimation);
            engine.block.setOutAnimation(block, fadeOutAnimation);
          } catch (animError) {
            console.warn("Could not add animations:", animError);
          }

          engine.block.appendChild(track, block);
        }

        // Add audio if available
        if (audioUrl) {
          console.log("Adding background audio:", audioUrl);
          try {
            const audioTrack = engine.block.create("track");
            engine.block.appendChild(page, audioTrack);
            engine.block.fillParent(audioTrack);

            const audioBlock = engine.block.create("audio");
            const totalDuration = processedTimings.reduce(
              (sum, time) => sum + time,
              0
            );
            engine.block.setString(audioBlock, "audio/fileURI", audioUrl);
            engine.block.setDuration(audioBlock, totalDuration);
            engine.block.setPositionX(audioBlock, 0);
            engine.block.setPositionY(audioBlock, 0);

            try {
              engine.block.setFloat(audioBlock, "audio/volume", 1.0);
            } catch (volumeError) {
              console.warn("Could not set audio volume:", volumeError);
            }

            engine.block.appendChild(audioTrack, audioBlock);
          } catch (audioError) {
            console.error("Error adding audio:", audioError);
          }
        }

        setMainEngine(engine);
        setEditorReady(true);
        console.log("CE.SDK initialization completed successfully");

        // Setup drag and drop after editor is ready
        const cleanupDragAndDrop = setupDragAndDrop();

        // Store cleanup function for later use
        instance._cleanupDragAndDrop = cleanupDragAndDrop;
      } catch (error) {
        console.error("Error loading CE.SDK:", error);
        initializationAttempted.current = false;
        cesdkInstanceRef.current = null;
      } finally {
        setIsInitializing(false);
      }
    };

    loadCesdk();

    return () => {
      console.log("Cleanup function called");
      if (cesdkInstanceRef.current) {
        try {
          console.log("Disposing CE.SDK instance...");

          // Cleanup drag and drop
          if (cesdkInstanceRef.current._cleanupDragAndDrop) {
            cesdkInstanceRef.current._cleanupDragAndDrop();
          }

          if (typeof cesdkInstanceRef.current.dispose === "function") {
            cesdkInstanceRef.current.dispose();
          }
        } catch (error) {
          console.error("Error disposing CE.SDK:", error);
        } finally {
          cesdkInstanceRef.current = null;
          setMainEngine(null);
          setEditorReady(false);
          initializationAttempted.current = false;
        }
      }
    };
  }, []);

  const drawerWidth = 350;

  return (
    <Box sx={{ display: "flex", maxHeight: "100vh" }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Box
          ref={containerRef}
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            transition: "all 0.3s ease",
            // Add visual feedback styles for drag and drop
            "&.drag-over": {
              filter: "brightness(0.95)",
              border: "2px dashed #2196F3",
            },
          }}
        />

        {(isInitializing || !editorReady) && (
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
              bgcolor: "rgba(255, 255, 255, 0.9)",
              zIndex: 1000,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography>
                {isInitializing
                  ? "Initializing Video Editor..."
                  : "Loading Editor..."}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Loading {resourceList.length} images
                {audioUrl && " with background audio"}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar
          sx={{
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(102, 126, 234, 0.1)",
            padding: "16px 24px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 6px 24px rgba(102, 126, 234, 0.15)",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: "#5f6b8a",
              fontWeight: 600,
              fontSize: "1.25rem",
              letterSpacing: "0.5px",
            }}
          >
            Tools
          </Typography>
          <Button
            variant="contained"
            startIcon={<Share />}
            onClick={() => setExportDialogOpen(true)}
            disabled={!editorReady}
            size="small"
            sx={{
              background: "rgba(102, 126, 234, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(102, 126, 234, 0.2)",
              borderRadius: "25px",
              padding: "8px 20px",
              color: "#667eea",
              fontWeight: 500,
              textTransform: "none",
              fontSize: "0.875rem",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "rgba(102, 126, 234, 0.15)",
                transform: "scale(1.02)",
                boxShadow: "0 4px 16px rgba(102, 126, 234, 0.2)",
              },
              "&:disabled": {
                background: "rgba(102, 126, 234, 0.05)",
                color: "rgba(102, 126, 234, 0.4)",
                border: "1px solid rgba(102, 126, 234, 0.1)",
              },
              "& .MuiButton-startIcon": {
                marginRight: "8px",
                transition: "transform 0.3s ease",
              },
              "&:hover .MuiButton-startIcon": {
                transform: "rotate(10deg)",
              },
            }}
          >
            Export
          </Button>
        </Toolbar>

        <Box sx={{ flex: 1, overflow: "auto" }}>
          <ImageGenTab
            mainEngine={mainEngine}
            resourceList={resourceList}
            addImageToTimeline={addImageToTimeline}
          />
        </Box>
      </Box>

      <ExportDialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        mainEngine={mainEngine}
        workspaceId={workspaceId}
      />
    </Box>
  );
}

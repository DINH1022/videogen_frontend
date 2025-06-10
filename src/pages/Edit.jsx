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
  VideoLibrary,
  Share,
  CloudDownload,
  Add,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import ExportDialog from "../components/ExportDialog";
import ImageGenTab from "../components/ImageGenTab";
import VideoSearchTab from "../components/VideoSearchTab";

// Fallback sample resources (only used if no data is passed)
const fallbackImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
];

export default function CesdkMuiEditor() {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const [mainEngine, setMainEngine] = useState(null);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const location = useLocation();

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
    timingData: timing, // Debug timing structure
  });

  const cesdkInstanceRef = useRef(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const initializationAttempted = useRef(false);

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
            "sTjOpvmvcA8xu3AxiP31kgtQzRmoQjTCDlIdOEeoCjNL-XPM89OtHv4ZaadOWluJ",
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
                  // Calculate duration from startTime and endTime
                  if (t.startTime !== undefined && t.endTime !== undefined) {
                    return t.endTime - t.startTime;
                  }
                  // Fallback for other object structures
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
          originalTiming: timing.slice(0, 2), // Show first 2 for debug
          processedTimings: processedTimings,
          totalDuration: processedTimings.reduce((sum, t) => sum + t, 0),
        });

        // FIXED IMAGE SIZING
        const pageWidth = engine.block.getWidth(page);
        const pageHeight = engine.block.getHeight(page);

        console.log("Page dimensions:", { pageWidth, pageHeight });

        for (let i = 0; i < imagesToUse.length; i++) {
          const url = imagesToUse[i];
          const duration = processedTimings[i] || 3;

          const block = engine.block.create("graphic");
          engine.block.setShape(block, engine.block.createShape("rect"));

          // SET BLOCK SIZE TO MATCH PAGE
          engine.block.setWidth(block, pageWidth);
          engine.block.setHeight(block, pageHeight);
          engine.block.setPositionX(block, 0);
          engine.block.setPositionY(block, 0);

          const fill = engine.block.createFill("image");
          engine.block.setString(fill, "fill/image/imageFileURI", url);

          // Set fill mode to cover for better image display
          try {
            engine.block.setEnum(fill, "fill/image/fillMode", "Cover");
          } catch (fillModeError) {
            console.warn("Could not set fill mode:", fillModeError);
          }

          engine.block.setFill(block, fill);
          engine.block.setDuration(block, duration);

          // Animations
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

        // FIXED AUDIO IMPLEMENTATION
        if (audioUrl) {
          console.log("Adding background audio:", audioUrl);
          try {
            // Create audio track
            const audioTrack = engine.block.create("track");
            engine.block.appendChild(page, audioTrack);
            engine.block.fillParent(audioTrack);

            // Create audio block
            const audioBlock = engine.block.create("audio");

            const totalDuration = processedTimings.reduce(
              (sum, time) => sum + time,
              0
            );
            engine.block.setString(audioBlock, "audio/fileURI", audioUrl);

            engine.block.setDuration(audioBlock, totalDuration);
            engine.block.setPositionX(audioBlock, 0);
            engine.block.setPositionY(audioBlock, 0);

            // Set volume (optional)
            try {
              engine.block.setFloat(audioBlock, "audio/volume", 1.0);
            } catch (volumeError) {
              console.warn("Could not set audio volume:", volumeError);
            }

            // Add to track
            engine.block.appendChild(audioTrack, audioBlock);
          } catch (audioError) {
            console.error("Error adding audio:", audioError);
          }
        }

        setMainEngine(engine);
        setEditorReady(true);
        console.log("CE.SDK initialization completed successfully");
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
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Tools
          </Typography>
          <Button
            variant="contained"
            startIcon={<Share />}
            onClick={() => setExportDialogOpen(true)}
            disabled={!editorReady}
            size="small"
          >
            Export
          </Button>
        </Toolbar>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
          >
            <Tab icon={<ImageIcon />} label="Images" />
            <Tab icon={<VideoLibrary />} label="Videos" />
          </Tabs>
        </Box>

        <Box sx={{ flex: 1, overflow: "auto" }}>
          {activeTab === 0 && (
            <ImageGenTab mainEngine={mainEngine} resourceList={resourceList} />
          )}
          {activeTab === 1 && <VideoSearchTab />}
        </Box>
      </Box>

      {/* Updated ExportDialog props to match the new component interface */}
      <ExportDialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        mainEngine={mainEngine}
        workspaceId={workspaceId}
      />
    </Box>
  );
}

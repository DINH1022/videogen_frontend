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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   LinearProgress,
// } from "@mui/material";
// import {
//   Image as ImageIcon,
//   VideoLibrary,
//   Share,
//   CloudDownload,
//   Add,
// } from "@mui/icons-material";
// import { useLocation } from "react-router-dom";

// // Sample resources for demonstration (only for main editor)
// const sampleImages = [
//   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
//   "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
//   "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop",
//   "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
// ];

// const ExportDialog = ({ open, onClose, onExport }) => {
//   const [exportSettings, setExportSettings] = useState({
//     quality: "1080p",
//     format: "mp4",
//     fps: "30",
//   });
//   const [exporting, setExporting] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const handleExport = async () => {
//     setExporting(true);
//     setProgress(0);

//     // Simulate export progress
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setExporting(false);
//           onClose();
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 300);

//     // Call actual export function
//     await onExport(
//       exportSettings.quality,
//       exportSettings.format,
//       exportSettings.fps,
//       setProgress
//     );
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Export Video</DialogTitle>
//       <DialogContent>
//         <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
//           <FormControl fullWidth>
//             <InputLabel>Quality</InputLabel>
//             <Select
//               value={exportSettings.quality}
//               label="Quality"
//               onChange={(e) =>
//                 setExportSettings((prev) => ({
//                   ...prev,
//                   quality: e.target.value,
//                 }))
//               }
//             >
//               <MenuItem value="720p">720p HD</MenuItem>
//               <MenuItem value="1080p">1080p Full HD</MenuItem>
//               <MenuItem value="4k">4K Ultra HD</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel>Format</InputLabel>
//             <Select
//               value={exportSettings.format}
//               label="Format"
//               onChange={(e) =>
//                 setExportSettings((prev) => ({
//                   ...prev,
//                   format: e.target.value,
//                 }))
//               }
//             >
//               <MenuItem value="mp4">MP4</MenuItem>
//               <MenuItem value="mov">MOV</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth>
//             <InputLabel>Frame Rate</InputLabel>
//             <Select
//               value={exportSettings.fps}
//               label="Frame Rate"
//               onChange={(e) =>
//                 setExportSettings((prev) => ({ ...prev, fps: e.target.value }))
//               }
//             >
//               <MenuItem value="24">24 FPS</MenuItem>
//               <MenuItem value="30">30 FPS</MenuItem>
//               <MenuItem value="60">60 FPS</MenuItem>
//             </Select>
//           </FormControl>

//           {exporting && (
//             <Box sx={{ mt: 2 }}>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 Exporting... {progress}%
//               </Typography>
//               <LinearProgress variant="determinate" value={progress} />
//             </Box>
//           )}
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} disabled={exporting}>
//           Cancel
//         </Button>
//         <Button
//           onClick={handleExport}
//           variant="contained"
//           disabled={exporting}
//           startIcon={
//             exporting ? <CircularProgress size={20} /> : <CloudDownload />
//           }
//         >
//           {exporting ? "Exporting..." : "Export"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const ImageGenTab = ({ mainEngine }) => {
//   const [prompt, setPrompt] = useState("");
//   const [generatedImage, setGeneratedImage] = useState(
//     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
//   );
//   const [loading, setLoading] = useState(false);

//   const generateImage = async () => {
//     if (!prompt.trim()) return;

//     setLoading(true);

//     setTimeout(() => {
//       const randomImage =
//         sampleImages[Math.floor(Math.random() * sampleImages.length)];
//       setGeneratedImage(randomImage);
//       setLoading(false);
//     }, 2000);
//   };

//   const handleImageClick = (imageUrl) => {
//     window.open(imageUrl, "_blank", "width=800,height=600");
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Generate Image
//       </Typography>

//       <TextField
//         multiline
//         rows={4}
//         fullWidth
//         variant="outlined"
//         placeholder="Describe the image you want to generate..."
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         sx={{ mb: 2 }}
//       />

//       <Button
//         fullWidth
//         variant="contained"
//         onClick={generateImage}
//         disabled={loading || !prompt.trim()}
//         startIcon={loading ? <CircularProgress size={20} /> : <Add />}
//         sx={{ mb: 3 }}
//       >
//         {loading ? "Generating..." : "Generate Image"}
//       </Button>

//       <Typography variant="h6" gutterBottom>
//         Result
//       </Typography>
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//         Click to view in popup, drag to timeline to use
//       </Typography>

//       {generatedImage ? (
//         <Card
//           sx={{ cursor: "pointer", "&:hover": { boxShadow: 6 } }}
//           onClick={() => handleImageClick(generatedImage)}
//         >
//           <Box
//             component="img"
//             src={generatedImage}
//             alt="Generated image"
//             draggable
//             sx={{
//               width: "100%",
//               height: "auto",
//               display: "block",
//             }}
//           />
//         </Card>
//       ) : (
//         <Paper sx={{ p: 3, textAlign: "center", bgcolor: "grey.50" }}>
//           <ImageIcon sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
//           <Typography color="text.secondary">No image generated yet</Typography>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// const VideoSearchTab = () => {
//   const [keyword, setKeyword] = useState("");
//   const [foundVideo, setFoundVideo] = useState("");
//   const [loading, setLoading] = useState(false);

//   const searchVideo = async () => {
//     if (!keyword.trim()) return;

//     setLoading(true);

//     // Simulate API call - replace with actual implementation
//     setTimeout(() => {
//       // Use a sample video URL for demo
//       const sampleVideo =
//         "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4";
//       setFoundVideo(sampleVideo);
//       setLoading(false);
//     }, 1500);
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Search Videos
//       </Typography>

//       <TextField
//         fullWidth
//         variant="outlined"
//         placeholder="Enter keywords to search videos..."
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//         sx={{ mb: 2 }}
//       />

//       <Button
//         fullWidth
//         variant="contained"
//         onClick={searchVideo}
//         disabled={loading || !keyword.trim()}
//         startIcon={loading ? <CircularProgress size={20} /> : <VideoLibrary />}
//         sx={{ mb: 3 }}
//       >
//         {loading ? "Searching..." : "Search Videos"}
//       </Button>

//       <Typography variant="h6" gutterBottom>
//         Result
//       </Typography>
//       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//         Click and drag to timeline to use
//       </Typography>

//       {foundVideo ? (
//         <Card>
//           <Box
//             component="video"
//             src={foundVideo}
//             controls
//             draggable
//             sx={{
//               width: "100%",
//               height: "auto",
//               display: "block",
//             }}
//           />
//         </Card>
//       ) : (
//         <Paper sx={{ p: 3, textAlign: "center", bgcolor: "grey.50" }}>
//           <VideoLibrary sx={{ fontSize: 48, color: "grey.400", mb: 1 }} />
//           <Typography color="text.secondary">No videos found yet</Typography>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default function CesdkMuiEditor() {
//   const containerRef = useRef(null);
//   const [activeTab, setActiveTab] = useState(0);
//   const [mainEngine, setMainEngine] = useState(null);
//   const [exportDialogOpen, setExportDialogOpen] = useState(false);
//   const [editorReady, setEditorReady] = useState(false);
//   const location = useLocation();
//   const workspaceId = location.state?.workspaceId ?? null;
//   console.log("1000");
//   console.log("location: ", location.state);
//   // IMPROVED FIX: Sử dụng useRef để lưu instance và prevent duplicate
//   const cesdkInstanceRef = useRef(null);
//   const [isInitializing, setIsInitializing] = useState(false);
//   const initializationAttempted = useRef(false); //

//   useEffect(() => {
//     // MAIN FIX: Kiểm tra tất cả conditions để prevent duplicate initialization
//     if (
//       cesdkInstanceRef.current ||
//       isInitializing ||
//       initializationAttempted.current ||
//       !containerRef.current
//     ) {
//       return;
//     }

//     const loadCesdk = async () => {
//       // CRITICAL: Mark initialization as attempted immediately
//       initializationAttempted.current = true;
//       setIsInitializing(true);

//       try {
//         console.log("Starting CE.SDK initialization...");

//         // Double check container is still available
//         if (!containerRef.current) {
//           console.error(
//             "Container ref became unavailable during initialization"
//           );
//           return;
//         }

//         const CreativeEditorSDK = await import(
//           "https://cdn.img.ly/packages/imgly/cesdk-js/1.52.0/index.js"
//         ).then((mod) => mod.default || mod);

//         //  Final check before creating instance
//         if (cesdkInstanceRef.current) {
//           console.log("Instance already exists, aborting initialization");
//           return;
//         }

//         const config = {
//           license:
//             "sTjOpvmvcA8xu3AxiP31kgtQzRmoQjTCDlIdOEeoCjNL-XPM89OtHv4ZaadOWluJ",
//           userId: "USER_ID",
//           theme: "light",
//           baseURL: "https://cdn.img.ly/packages/imgly/cesdk-js/1.52.0/assets",
//           ui: {
//             elements: {
//               view: "default",
//               panels: {
//                 settings: true,
//               },
//               navigation: {
//                 position: "top",
//                 action: {
//                   save: true,
//                   load: true,
//                   download: true,
//                   export: true,
//                 },
//               },
//             },
//           },
//           callbacks: {
//             onUpload: "local",
//             onSave: (scene) => {
//               const element = document.createElement("a");
//               const base64Data = btoa(unescape(encodeURIComponent(scene)));
//               element.setAttribute(
//                 "href",
//                 `data:application/octet-stream;base64,${base64Data}`
//               );
//               element.setAttribute(
//                 "download",
//                 `cesdk-${new Date().toISOString()}.scene`
//               );
//               element.style.display = "none";
//               document.body.appendChild(element);
//               element.click();
//               document.body.removeChild(element);
//             },
//             onLoad: "upload",
//             onDownload: "download",
//             onExport: "download",
//           },
//         };

//         // Create instance and immediately store in ref
//         console.log("Creating CE.SDK instance...");
//         const instance = await CreativeEditorSDK.create(
//           containerRef.current,
//           config
//         );

//         // CRITICAL: Store instance immediately after creation
//         cesdkInstanceRef.current = instance;
//         console.log("CE.SDK instance created and stored");

//         instance.addDefaultAssetSources();
//         instance.addDemoAssetSources({ sceneMode: "Video" });
//         instance.ui.setBackgroundTrackAssetLibraryEntries([
//           "ly.img.image",
//           "ly.img.video",
//         ]);

//         await instance.createVideoScene();

//         const engine = instance.engine;
//         const page = engine.scene.getCurrentPage();

//         // Set up default scene
//         engine.block.setWidth(page, 1280);
//         engine.block.setHeight(page, 720);

//         // Create main track
//         const track = engine.block.create("track");
//         engine.block.appendChild(page, track);
//         engine.block.fillParent(track);

//         // Add sample images to main editor
//         for (let i = 0; i < sampleImages.length; i++) {
//           const url = sampleImages[i];

//           const block = engine.block.create("graphic");
//           engine.block.setShape(block, engine.block.createShape("rect"));

//           const fill = engine.block.createFill("image");
//           engine.block.setString(fill, "fill/image/imageFileURI", url);
//           engine.block.setFill(block, fill);
//           engine.block.setDuration(block, 3);

//           const zoomAnimation = engine.block.createAnimation("zoom");
//           const fadeOutAnimation = engine.block.createAnimation("fade");
//           engine.block.setDuration(zoomAnimation, 1.2);
//           engine.block.setInAnimation(block, zoomAnimation);
//           engine.block.setOutAnimation(block, fadeOutAnimation);

//           engine.block.appendChild(track, block);
//         }

//         setMainEngine(engine);
//         setEditorReady(true);
//         console.log("CE.SDK initialization completed successfully");
//       } catch (error) {
//         console.error("Error loading CE.SDK:", error);
//         initializationAttempted.current = false;
//         cesdkInstanceRef.current = null;
//       } finally {
//         setIsInitializing(false);
//       }
//     };

//     loadCesdk();

//     return () => {
//       console.log("Cleanup function called");
//       if (cesdkInstanceRef.current) {
//         try {
//           console.log("Disposing CE.SDK instance...");
//           if (typeof cesdkInstanceRef.current.dispose === "function") {
//             cesdkInstanceRef.current.dispose();
//           }
//         } catch (error) {
//           console.error("Error disposing CE.SDK:", error);
//         } finally {
//           cesdkInstanceRef.current = null;
//           setMainEngine(null);
//           setEditorReady(false);
//           // Reset initialization flag for potential re-mount
//           initializationAttempted.current = false;
//         }
//       }
//     };
//   }, []); // Empty dependency array - only run once

//   const handleExport = async (quality, format, fps, updateProgress) => {
//     if (!mainEngine) return;

//     console.log("Exporting with settings:", { quality, format, fps });

//     // Simulate export process
//     for (let i = 0; i <= 100; i += 10) {
//       updateProgress(i);
//       await new Promise((resolve) => setTimeout(resolve, 200));
//     }

//     // Here you would implement actual video export
//     // using mainEngine.block.exportVideo()
//   };

//   const drawerWidth = 350;

//   return (
//     <Box sx={{ display: "flex", maxHeight: "100vh" }}>
//       {/* Main Editor Area */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//         }}
//       >
//         <Box
//           ref={containerRef}
//           sx={{
//             width: "100%",
//             height: "100%",
//             position: "relative",
//           }}
//         />

//         {(isInitializing || !editorReady) && (
//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               bgcolor: "rgba(255, 255, 255, 0.9)",
//               zIndex: 1000,
//             }}
//           >
//             <Box sx={{ textAlign: "center" }}>
//               <CircularProgress sx={{ mb: 2 }} />
//               <Typography>
//                 {isInitializing
//                   ? "Initializing Video Editor..."
//                   : "Loading Editor..."}
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                 This may take a few moments
//               </Typography>
//             </Box>
//           </Box>
//         )}
//       </Box>

//       {/* Side Drawer */}
//       <Box
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Tools
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<Share />}
//             onClick={() => setExportDialogOpen(true)}
//             disabled={!editorReady}
//             size="small"
//           >
//             Export
//           </Button>
//         </Toolbar>

//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <Tabs
//             value={activeTab}
//             onChange={(e, newValue) => setActiveTab(newValue)}
//             variant="fullWidth"
//           >
//             <Tab icon={<ImageIcon />} label="Images" />
//             <Tab icon={<VideoLibrary />} label="Videos" />
//           </Tabs>
//         </Box>

//         <Box sx={{ flex: 1, overflow: "auto" }}>
//           {activeTab === 0 && <ImageGenTab mainEngine={mainEngine} />}
//           {activeTab === 1 && <VideoSearchTab />}
//         </Box>
//       </Box>

//       {/* Export Dialog */}
//       <ExportDialog
//         open={exportDialogOpen}
//         onClose={() => setExportDialogOpen(false)}
//         onExport={handleExport}
//       />
//     </Box>
//   );
// }
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
import {
  Image as ImageIcon,
  VideoLibrary,
  Share,
  CloudDownload,
  Add,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import ExportDialog from "../components/ExportDialog";

// Fallback sample resources (only used if no data is passed)
const fallbackImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&fit=crop",
];

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

        // Set up scene dimensions
        engine.block.setWidth(page, 1280);
        engine.block.setHeight(page, 720);

        // Create main track
        const track = engine.block.create("track");
        engine.block.appendChild(page, track);
        engine.block.fillParent(track);

        const imagesToUse =
          resourceList.length > 0 ? resourceList : fallbackImages;

        // FIXED TIMING CALCULATION
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

            // Set audio source directly using the asset API
            const totalDuration = processedTimings.reduce(
              (sum, time) => sum + time,
              0
            );

            // Try different methods to set audio source
            try {
              // Method 1: Direct URI setting (most common)
              engine.block.setString(audioBlock, "audio/fileURI", audioUrl);
            } catch (e1) {
              try {
                // Method 2: Using asset system
                engine.asset.addAsset("ly.img.audio", audioUrl);
                engine.block.setString(audioBlock, "audio/fileURI", audioUrl);
              } catch (e2) {
                try {
                  // Method 3: Create fill and apply
                  const audioFill = engine.block.createFill("color");
                  engine.block.setFill(audioBlock, audioFill);
                  engine.block.setString(audioBlock, "audio/fileURI", audioUrl);
                } catch (e3) {
                  console.error("All audio methods failed:", { e1, e2, e3 });
                  throw new Error("Could not set audio source");
                }
              }
            }

            // Set duration and other properties
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

            console.log("Audio added successfully:", {
              audioUrl,
              duration: totalDuration,
              blockId: audioBlock,
            });
          } catch (audioError) {
            console.error("Error adding audio:", audioError);

            // Fallback: Try adding audio through asset library
            try {
              console.log("Attempting fallback audio method...");
              const audioAsset = await engine.asset.addAsset(
                "ly.img.audio",
                audioUrl
              );
              console.log("Audio asset added:", audioAsset);
            } catch (fallbackError) {
              console.error(
                "Fallback audio method also failed:",
                fallbackError
              );
            }
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

  const handleExport = async (quality, format, fps, updateProgress) => {
    if (!mainEngine) return;

    console.log("Exporting with settings:", { quality, format, fps });
    console.log("Project info:", {
      workspaceId,
      resourceCount: resourceList.length,
      hasAudio: !!audioUrl,
    });

    for (let i = 0; i <= 100; i += 10) {
      updateProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  };

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

      <ExportDialog
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
        onExport={handleExport}
      />
    </Box>
  );
}

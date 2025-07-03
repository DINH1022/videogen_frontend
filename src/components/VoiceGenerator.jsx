// import React, { useState, useRef, useEffect } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   Typography,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Slider,
//   Tabs,
//   Tab,
//   Paper,
//   Alert,
//   CircularProgress,
//   IconButton,
//   LinearProgress,
//   Chip,
//   Stack,
//   Fade,
//   Zoom,
// } from "@mui/material";
// import {
//   VolumeUp,
//   Upload,
//   Close,
//   CloudUpload,
//   AudioFile,
//   Settings,
//   PlayArrow,
//   Download,
//   CheckCircle,
//   Mic,
//   SmartToy,
// } from "@mui/icons-material";
// import { uploadAudio } from "../services/audio";
// import { getAccessToken } from "../utils/localstorage";
// import { saveScript } from "../services/script";
// const voiceProviders = [
//   {
//     id: "edge_tts",
//     name: "Edge TTS",
//     voices: [
//       { id: "female", name: "Nữ" },
//       { id: "male", name: "Nam" },
//     ],
//   },
//   {
//     id: "gtts",
//     name: "Google TTS",
//     voices: [{ id: "default", name: "Mặc định" }],
//   },
// ];

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`voice-tabpanel-${index}`}
//       aria-labelledby={`voice-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Fade in={value === index} timeout={300}>
//           <Box sx={{ p: 3 }}>{children}</Box>
//         </Fade>
//       )}
//     </div>
//   );
// }

// export default function VoiceGenerator({ workspace }) {
//   const [provider, setProvider] = useState("gtts");
//   const [voice, setVoice] = useState("default");
//   const [speed, setSpeed] = useState(1);
//   const [pitch, setPitch] = useState(1);
//   const [intensity, setIntensity] = useState(0.5);
//   const [activeTab, setActiveTab] = useState(0);
//   const [showAudioPreview, setShowAudioPreview] = useState(false);
//   const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [selectedVoiceFile, setSelectedVoiceFile] = useState(null);
//   const [isUploadingVoice, setIsUploadingVoice] = useState(false);
//   const [uploadVoiceError, setUploadVoiceError] = useState(null);
//   const [uploadedVoiceUrl, setUploadedVoiceUrl] = useState(null);
//   const [audioTimestamp, setAudioTimestamp] = useState(Date.now());
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const fileInputRef = useRef(null);
//   const scriptId = "demo-script-id";

//   const selectedProvider = voiceProviders.find((p) => p.id === provider);

//   useEffect(() => {
//     const fetchAudioData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         setTimeout(() => {
//           const mockData = {
//             audio_url: "",
//           };

//           if (mockData && mockData.audio_url) {
//             setUploadedVoiceUrl(mockData.audio_url);
//             setActiveTab(1);
//             setAudioTimestamp(Date.now());
//           }
//           setLoading(false);
//         }, 1000);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchAudioData();
//   }, []);

//   const handleCreateAudio = async () => {
//     if (!scriptId) {
//       alert("Vui lòng tạo kịch bản trước khi tạo âm thanh.");
//       return;
//     }

//     setIsGeneratingAudio(true);

//     try {
//       setTimeout(() => {
//         const volume = (intensity - 0.5) * 24;
//         const engine = provider;
//         const gender = voice === "default" ? "female" : voice;

//         const mockResponse = {
//           status: 201,
//           data: {
//             audio_url:
//               "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
//           },
//         };

//         if (mockResponse.status === 201 && mockResponse.data?.audio_url) {
//           setAudioUrl(mockResponse.data.audio_url);
//           setAudioTimestamp(Date.now());
//           setShowAudioPreview(true);
//         }
//         setIsGeneratingAudio(false);
//       }, 2000);
//     } catch (error) {
//       alert("Đã xảy ra lỗi khi tạo âm thanh.");
//       setIsGeneratingAudio(false);
//     }
//   };

//   const handleVoiceFileChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       console.log("file: ", file);
//       const multipartForm = new FormData();
//       multipartForm.append("video", file);

//       // const response = await fetch(
//       //   `http://localhost:8080/utils/upload-video-to-cloudinary`,
//       //   {
//       //     method: "POST",
//       //     body: multipartForm,
//       //     headers: {
//       //       Authorization: `Bearer ${getAccessToken()}`,
//       //     },
//       //   }
//       // );
//       // console.log("resonse: >>>", response);
//       const fileExt = file.name.split(".").pop()?.toLowerCase();
//       if (fileExt === "mp3" || fileExt === "wav" || fileExt === "m4a") {
//         setSelectedVoiceFile(file);
//         setUploadVoiceError(null);
//       } else {
//         alert("Chỉ chấp nhận file .mp3, .wav hoặc .m4a");
//         e.target.value = "";
//       }
//     }
//   };

//   const removeSelectedVoiceFile = () => {
//     setSelectedVoiceFile(null);
//     setUploadProgress(0);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleUploadVoiceFile = async () => {
//     if (!selectedVoiceFile) {
//       alert("Vui lòng chọn tệp âm thanh và tạo kịch bản trước");
//       return;
//     }

//     setIsUploadingVoice(true);
//     setUploadVoiceError(null);
//     setUploadProgress(0);

//     const progressInterval = setInterval(() => {
//       setUploadProgress((prev) => {
//         if (prev >= 90) {
//           clearInterval(progressInterval);
//           return 99;
//         }
//         return prev + 7;
//       });
//     }, 200);

//     try {
//       // setTimeout(() => {
//       //   clearInterval(progressInterval);
//       //   setUploadProgress(100);

//       //   const mockResponse = {
//       //     data: {
//       //       audio_url: URL.createObjectURL(selectedVoiceFile),
//       //       script_id: "new-script-id",
//       //     },
//       //   };

//       //   if (mockResponse.data && mockResponse.data.audio_url) {
//       //     setUploadedVoiceUrl(mockResponse.data.audio_url);
//       //     setAudioTimestamp(Date.now());
//       //   }
//       //   setIsUploadingVoice(false);
//       // }, 2000);

//       const audioData = new FormData();
//       audioData.append("audio", selectedVoiceFile);
//       const response = await uploadAudio(audioData);
//       await saveScript({ audioUrl: response }, workspace.id);
//       setUploadedVoiceUrl(response);
//       setIsUploadingVoice(false);
//       setAudioTimestamp(Date.now());
//     } catch (error) {
//       clearInterval(progressInterval);
//       setUploadVoiceError("Đã xảy ra lỗi khi xử lý tệp âm thanh");
//       setIsUploadingVoice(false);
//       setUploadProgress(0);
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const CustomSlider = ({
//     label,
//     value,
//     onChange,
//     min = 0,
//     max = 2,
//     step = 0.1,
//     unit = "x",
//   }) => (
//     <Box sx={{ mb: 3 }}>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 2,
//         }}
//       >
//         <Typography
//           variant="body2"
//           fontWeight="600"
//           sx={{ color: "text.primary" }}
//         >
//           {label}
//         </Typography>
//         <Chip
//           label={`${value}${unit}`}
//           size="small"
//           sx={{
//             bgcolor: "grey.100",
//             color: "text.secondary",
//             fontWeight: "500",
//           }}
//         />
//       </Box>
//       <Slider
//         value={value}
//         min={min}
//         max={max}
//         step={step}
//         onChange={onChange}
//         sx={{
//           color: "primary.main",
//           height: 6,
//           "& .MuiSlider-thumb": {
//             height: 20,
//             width: 20,
//             backgroundColor: "#fff",
//             border: "3px solid currentColor",
//             "&:hover": {
//               boxShadow: "0px 0px 0px 8px rgba(25, 118, 210, 0.16)",
//             },
//           },
//           "& .MuiSlider-track": {
//             height: 6,
//             borderRadius: 3,
//           },
//           "& .MuiSlider-rail": {
//             height: 6,
//             borderRadius: 3,
//             backgroundColor: "grey.200",
//           },
//         }}
//       />
//     </Box>
//   );

//   return (
//     <Box sx={{ maxWidth: "lg" }}>
//       {loading && (
//         <Fade in={loading}>
//           <Card sx={{ mb: 3, textAlign: "center", py: 4, bgcolor: "grey.50" }}>
//             <CircularProgress size={40} thickness={4} sx={{ mb: 2 }} />
//             <Typography variant="body1" color="text.secondary" fontWeight="500">
//               Đang tải dữ liệu âm thanh...
//             </Typography>
//           </Card>
//         </Fade>
//       )}

//       {error && (
//         <Zoom in={!!error}>
//           <Alert
//             severity="error"
//             sx={{
//               mb: 3,
//               borderRadius: 2,
//               "& .MuiAlert-icon": { fontSize: 24 },
//             }}
//           >
//             {error}
//           </Alert>
//         </Zoom>
//       )}

//       <Card
//         sx={{
//           borderRadius: 2,
//           overflow: "hidden",
//           border: "1px solid rgba(0,0,0,0.06)",
//         }}
//       >
//         <Tabs
//           value={activeTab}
//           onChange={handleTabChange}
//           variant="fullWidth"
//           sx={{
//             bgcolor: "grey.50",
//             "& .MuiTab-root": {
//               textTransform: "none",
//               fontWeight: 600,
//               fontSize: "0.95rem",
//               py: 2,
//               color: "text.secondary",
//               "&.Mui-selected": {
//                 color: "primary.main",
//               },
//             },
//             "& .MuiTabs-indicator": {
//               height: 3,
//               borderRadius: "3px 3px 0 0",
//             },
//           }}
//         >
//           <Tab
//             icon={<SmartToy sx={{ mb: 0.5 }} />}
//             label="Giọng nói AI"
//             iconPosition="start"
//           />
//           <Tab
//             icon={<Mic sx={{ mb: 0.5 }} />}
//             label="Giọng thu có sẵn"
//             iconPosition="start"
//           />
//         </Tabs>

//         <TabPanel value={activeTab} index={0}>
//           <Stack spacing={3}>
//             {/* Header */}
//             <Box sx={{ textAlign: "center", py: 2 }}>
//               <Typography
//                 variant="h5"
//                 fontWeight="700"
//                 color="text.primary"
//                 sx={{ mb: 1 }}
//               >
//                 Tạo giọng nói AI
//               </Typography>
//             </Box>

//             {/* Provider Selection */}
//             <Card
//               sx={{ bgcolor: "grey.50", border: "1px solid rgba(0,0,0,0.06)" }}
//             >
//               <CardContent>
//                 <FormControl fullWidth>
//                   <InputLabel sx={{ fontWeight: 500 }}>
//                     Nhà cung cấp giọng nói
//                   </InputLabel>
//                   <Select
//                     value={provider}
//                     label="Nhà cung cấp giọng nói"
//                     onChange={(e) => setProvider(e.target.value)}
//                     sx={{
//                       bgcolor: "white",
//                       "& .MuiOutlinedInput-notchedOutline": {
//                         borderColor: "rgba(0,0,0,0.1)",
//                       },
//                     }}
//                   >
//                     {voiceProviders.map((p) => (
//                       <MenuItem key={p.id} value={p.id}>
//                         <Box
//                           sx={{ display: "flex", alignItems: "center", gap: 2 }}
//                         >
//                           <Settings sx={{ color: "primary.main" }} />
//                           {p.name}
//                         </Box>
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </CardContent>
//             </Card>

//             {/* Voice Selection */}
//             <Card
//               sx={{ bgcolor: "grey.50", border: "1px solid rgba(0,0,0,0.06)" }}
//             >
//               <CardContent>
//                 <FormControl fullWidth>
//                   <InputLabel sx={{ fontWeight: 500 }}>Giọng nói</InputLabel>
//                   <Select
//                     value={voice}
//                     label="Giọng nói"
//                     onChange={(e) => setVoice(e.target.value)}
//                     sx={{
//                       bgcolor: "white",
//                       "& .MuiOutlinedInput-notchedOutline": {
//                         borderColor: "rgba(0,0,0,0.1)",
//                       },
//                     }}
//                   >
//                     {selectedProvider?.voices.map((v) => (
//                       <MenuItem key={v.id} value={v.id}>
//                         <Box
//                           sx={{ display: "flex", alignItems: "center", gap: 2 }}
//                         >
//                           <VolumeUp sx={{ color: "primary.main" }} />
//                           {v.name}
//                         </Box>
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </CardContent>
//             </Card>

//             {/* Sliders */}
//             <Card
//               sx={{ bgcolor: "grey.50", border: "1px solid rgba(0,0,0,0.06)" }}
//             >
//               <CardHeader
//                 title={
//                   <Typography
//                     variant="h6"
//                     fontWeight="600"
//                     sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                   >
//                     <Settings color="primary" />
//                     Tùy chỉnh giọng nói
//                   </Typography>
//                 }
//               />
//               <CardContent>
//                 <CustomSlider
//                   label="Tốc độ đọc"
//                   value={speed}
//                   onChange={(e, newValue) => setSpeed(newValue)}
//                   min={0.5}
//                   max={2}
//                   step={0.1}
//                 />

//                 <CustomSlider
//                   label="Âm điệu"
//                   value={pitch}
//                   onChange={(e, newValue) => setPitch(newValue)}
//                   min={0.5}
//                   max={1.5}
//                   step={0.1}
//                 />

//                 <CustomSlider
//                   label="Cường độ"
//                   value={intensity}
//                   onChange={(e, newValue) => setIntensity(newValue)}
//                   min={0}
//                   max={1}
//                   step={0.01}
//                   unit="%"
//                 />
//               </CardContent>
//             </Card>

//             {/* Audio Info Card */}
//             <Card
//               sx={{
//                 bgcolor: showAudioPreview ? "success.50" : "grey.50",
//                 border: `1px solid ${
//                   showAudioPreview ? "success.200" : "rgba(0,0,0,0.06)"
//                 }`,
//                 transition: "all 0.3s ease",
//               }}
//             >
//               <CardHeader
//                 avatar={
//                   showAudioPreview ? (
//                     <CheckCircle color="success" sx={{ fontSize: 28 }} />
//                   ) : (
//                     <AudioFile color="action" sx={{ fontSize: 28 }} />
//                   )
//                 }
//                 title={
//                   <Typography variant="h6" fontWeight="600">
//                     Thông tin âm thanh
//                   </Typography>
//                 }
//                 subheader={
//                   <Chip
//                     label={
//                       showAudioPreview
//                         ? "Âm thanh đã được tạo"
//                         : "Chưa có âm thanh"
//                     }
//                     size="small"
//                     color={showAudioPreview ? "success" : "default"}
//                     sx={{ mt: 0.5 }}
//                   />
//                 }
//               />
//               <CardContent>
//                 {showAudioPreview && (
//                   <Box
//                     sx={{
//                       mb: 2,
//                       p: 2,
//                       bgcolor: "white",
//                       borderRadius: 2,
//                       border: "1px solid rgba(0,0,0,0.06)",
//                     }}
//                   >
//                     <Typography
//                       variant="caption"
//                       color="text.secondary"
//                       sx={{ mb: 1, display: "block" }}
//                     >
//                       URL âm thanh:
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       sx={{
//                         wordBreak: "break-all",
//                         color: "primary.main",
//                         fontFamily: "monospace",
//                         fontSize: "0.8rem",
//                       }}
//                     >
//                       {audioUrl}
//                     </Typography>
//                   </Box>
//                 )}

//                 <Box
//                   sx={{
//                     mb: 2,
//                     p: 2,
//                     bgcolor: "white",
//                     borderRadius: 2,
//                     border: "1px solid rgba(0,0,0,0.06)",
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ mb: 1 }}
//                   >
//                     <strong>Nhà cung cấp:</strong> {selectedProvider?.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     <strong>Giọng nói:</strong>{" "}
//                     {selectedProvider?.voices.find((v) => v.id === voice)?.name}
//                   </Typography>
//                 </Box>

//                 <Button
//                   variant="contained"
//                   fullWidth
//                   size="large"
//                   onClick={handleCreateAudio}
//                   disabled={isGeneratingAudio}
//                   startIcon={
//                     isGeneratingAudio ? (
//                       <CircularProgress size={20} color="inherit" />
//                     ) : (
//                       <PlayArrow />
//                     )
//                   }
//                   sx={{
//                     py: 1.5,
//                     textTransform: "none",
//                     fontWeight: 600,
//                     fontSize: "1rem",
//                     borderRadius: 2,
//                     boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
//                     "&:hover": {
//                       boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
//                     },
//                   }}
//                 >
//                   {isGeneratingAudio ? "Đang tạo âm thanh..." : "Tạo âm thanh"}
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Audio Preview */}
//             {showAudioPreview && audioUrl && (
//               <Fade in={showAudioPreview}>
//                 <Card
//                   sx={{
//                     bgcolor: "primary.50",
//                     border: "1px solid rgba(25, 118, 210, 0.2)",
//                     boxShadow: "0 4px 20px rgba(25, 118, 210, 0.1)",
//                   }}
//                 >
//                   <CardHeader
//                     avatar={<PlayArrow color="primary" sx={{ fontSize: 28 }} />}
//                     title={
//                       <Typography
//                         variant="h6"
//                         fontWeight="600"
//                         color="primary.main"
//                       >
//                         Xem trước âm thanh
//                       </Typography>
//                     }
//                   />
//                   <CardContent>
//                     <Box
//                       sx={{
//                         p: 3,
//                         bgcolor: "white",
//                         borderRadius: 2,
//                         border: "1px solid rgba(25, 118, 210, 0.1)",
//                       }}
//                     >
//                       <audio
//                         key={`${audioUrl}-${audioTimestamp}`}
//                         src={audioUrl}
//                         controls
//                         style={{
//                           width: "100%",
//                           height: "54px",
//                           borderRadius: "8px",
//                         }}
//                       />
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{ mt: 2, display: "block", textAlign: "center" }}
//                       >
//                         🎵 Bạn có thể nghe thử âm thanh được tạo từ kịch bản đã
//                         phê duyệt
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             )}
//           </Stack>
//         </TabPanel>

//         <TabPanel value={activeTab} index={1}>
//           <Stack spacing={3}>
//             {/* Header */}
//             <Box sx={{ textAlign: "center", py: 2 }}>
//               <Typography
//                 variant="h5"
//                 fontWeight="700"
//                 color="text.primary"
//                 sx={{ mb: 1 }}
//               >
//                 Tải lên giọng thu sẵn
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Sử dụng file âm thanh của riêng bạn để tạo nội dung
//               </Typography>
//             </Box>

//             {/* File Upload Area */}
//             <Card sx={{ overflow: "hidden" }}>
//               <CardContent sx={{ p: 0 }}>
//                 <Paper
//                   sx={{
//                     border: selectedVoiceFile ? "2px solid" : "2px dashed",
//                     borderColor: selectedVoiceFile
//                       ? "success.main"
//                       : "grey.300",
//                     bgcolor: selectedVoiceFile ? "success.50" : "grey.50",
//                     p: 4,
//                     textAlign: "center",
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       bgcolor: selectedVoiceFile ? "success.100" : "grey.100",
//                       borderColor: selectedVoiceFile
//                         ? "success.dark"
//                         : "grey.400",
//                     },
//                   }}
//                   onClick={() => fileInputRef.current?.click()}
//                 >
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleVoiceFileChange}
//                     accept=".mp3,.wav,.m4a"
//                     style={{ display: "none" }}
//                   />

//                   {!selectedVoiceFile ? (
//                     <Stack spacing={2} alignItems="center">
//                       <CloudUpload
//                         sx={{
//                           fontSize: 64,
//                           color: "primary.main",
//                           opacity: 0.7,
//                         }}
//                       />
//                       <Typography
//                         variant="h6"
//                         fontWeight="600"
//                         color="text.primary"
//                       >
//                         Nhấp để tải lên hoặc kéo và thả
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Hỗ trợ file .mp3, .wav, .m4a
//                       </Typography>
//                       <Chip
//                         label="Kích thước tối đa: 50MB"
//                         size="small"
//                         variant="outlined"
//                         sx={{ bgcolor: "white" }}
//                       />
//                     </Stack>
//                   ) : (
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         gap: 2,
//                         bgcolor: "white",
//                         p: 2,
//                         borderRadius: 2,
//                         maxWidth: 400,
//                         mx: "auto",
//                       }}
//                     >
//                       <AudioFile sx={{ color: "success.main", fontSize: 28 }} />
//                       <Box sx={{ flex: 1, textAlign: "left" }}>
//                         <Typography
//                           variant="body1"
//                           fontWeight="600"
//                           color="text.primary"
//                         >
//                           {selectedVoiceFile.name}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {(selectedVoiceFile.size / (1024 * 1024)).toFixed(2)}{" "}
//                           MB
//                         </Typography>
//                       </Box>
//                       <IconButton
//                         size="small"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           removeSelectedVoiceFile();
//                         }}
//                         sx={{
//                           bgcolor: "error.50",
//                           "&:hover": { bgcolor: "error.100" },
//                         }}
//                       >
//                         <Close sx={{ color: "error.main" }} />
//                       </IconButton>
//                     </Box>
//                   )}
//                 </Paper>

//                 {selectedVoiceFile && (
//                   <Box sx={{ p: 3, bgcolor: "grey.50" }}>
//                     {isUploadingVoice && (
//                       <Box sx={{ mb: 2 }}>
//                         <Box
//                           sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             mb: 1,
//                           }}
//                         >
//                           <Typography variant="body2" color="text.secondary">
//                             Đang xử lý tệp...
//                           </Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {uploadProgress}%
//                           </Typography>
//                         </Box>
//                         <LinearProgress
//                           variant="determinate"
//                           value={uploadProgress}
//                           sx={{
//                             height: 6,
//                             borderRadius: 3,
//                             bgcolor: "grey.200",
//                             "& .MuiLinearProgress-bar": {
//                               borderRadius: 3,
//                             },
//                           }}
//                         />
//                       </Box>
//                     )}

//                     <Button
//                       variant="contained"
//                       fullWidth
//                       size="large"
//                       onClick={handleUploadVoiceFile}
//                       disabled={isUploadingVoice}
//                       startIcon={
//                         isUploadingVoice ? (
//                           <CircularProgress size={20} color="inherit" />
//                         ) : (
//                           <Upload />
//                         )
//                       }
//                       sx={{
//                         py: 1.5,
//                         textTransform: "none",
//                         fontWeight: 600,
//                         fontSize: "1rem",
//                         borderRadius: 2,
//                         boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
//                         "&:hover": {
//                           boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
//                         },
//                       }}
//                     >
//                       {isUploadingVoice
//                         ? "Đang xử lý tệp..."
//                         : "Tải lên giọng nói"}
//                     </Button>

//                     {uploadVoiceError && (
//                       <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
//                         {uploadVoiceError}
//                       </Alert>
//                     )}
//                   </Box>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Uploaded Voice Preview */}
//             {uploadedVoiceUrl && (
//               <Fade in={!!uploadedVoiceUrl}>
//                 <Card
//                   sx={{
//                     bgcolor: "success.50",
//                     border: "1px solid rgba(76, 175, 80, 0.2)",
//                     boxShadow: "0 4px 20px rgba(76, 175, 80, 0.1)",
//                   }}
//                 >
//                   <CardHeader
//                     avatar={
//                       <CheckCircle color="success" sx={{ fontSize: 28 }} />
//                     }
//                     title={
//                       <Typography
//                         variant="h6"
//                         fontWeight="600"
//                         color="success.main"
//                       >
//                         Giọng nói đã tải lên
//                       </Typography>
//                     }
//                     action={
//                       <Chip
//                         label="Sẵn sàng sử dụng"
//                         color="success"
//                         size="small"
//                         sx={{ fontWeight: 500 }}
//                       />
//                     }
//                   />
//                   <CardContent>
//                     <Box
//                       sx={{
//                         p: 3,
//                         bgcolor: "white",
//                         borderRadius: 2,
//                         border: "1px solid rgba(76, 175, 80, 0.1)",
//                       }}
//                     >
//                       <audio
//                         key={`${uploadedVoiceUrl}-${audioTimestamp}`}
//                         src={uploadedVoiceUrl}
//                         controls
//                         style={{
//                           width: "100%",
//                           height: "54px",
//                           borderRadius: "8px",
//                         }}
//                       />
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                         sx={{ mt: 2, display: "block", textAlign: "center" }}
//                       >
//                         ✅ Giọng nói đã tải lên sẽ được sử dụng cho kịch bản của
//                         bạn
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Fade>
//             )}

//             {/* Notes */}
//             <Card
//               sx={{
//                 bgcolor: "info.50",
//                 border: "1px solid rgba(2, 136, 209, 0.2)",
//               }}
//             >
//               <CardHeader
//                 avatar={<Settings color="info" />}
//                 title={
//                   <Typography variant="h6" fontWeight="600" color="info.main">
//                     Hướng dẫn và lưu ý
//                   </Typography>
//                 }
//               />
//               <CardContent>
//                 <Stack spacing={2}>
//                   {[
//                     { icon: "🎵", text: "Hỗ trợ định dạng MP3, WAV, M4A" },
//                     { icon: "📏", text: "Kích thước tối đa: 50MB" },
//                     { icon: "⏱️", text: "Thời lượng tối đa: 30 phút" },
//                     {
//                       icon: "💡",
//                       text: "Âm thanh rõ ràng, không nhiễu sẽ cho kết quả tốt nhất",
//                     },
//                   ].map((item, index) => (
//                     <Box
//                       key={index}
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 2,
//                         p: 2,
//                         bgcolor: "white",
//                         borderRadius: 2,
//                         border: "1px solid rgba(2, 136, 209, 0.1)",
//                       }}
//                     >
//                       <Typography sx={{ fontSize: "1.2rem" }}>
//                         {item.icon}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {item.text}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </Stack>
//               </CardContent>
//             </Card>
//           </Stack>
//         </TabPanel>
//       </Card>
//     </Box>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  IconButton,
  Chip,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Avatar,
  Fade,
  Slide,
  Zoom,
  useTheme,
  CardHeader,
  alpha,
} from "@mui/material";
import {
  PlayArrow,
  Stop,
  VolumeUp,
  Settings,
  RecordVoiceOver,
  Male,
  Female,
  Equalizer,
  GraphicEq,
  VolumeDown,
  VolumeOff,
  Check,
  StarBorder,
  Star,
} from "@mui/icons-material";
import { createAudio } from "../services/audio";
import { saveScript } from "../services/script";

const VoiceConfigComponent = ({ workspace }) => {
  const theme = useTheme();
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingVoice, setCurrentPlayingVoice] = useState("");
  const [playProgress, setPlayProgress] = useState(0);
  const [favoriteVoices, setFavoriteVoices] = useState([]);
  const [showAppliedSuccess, setShowAppliedSuccess] = useState(false);
  const [showAudioPreview, setShowAudioPreview] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  // Ref để quản lý audio element
  const audioRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const allVoices = [
    "Arista-PlayAI",
    "Atlas-PlayAI",
    "Basil-PlayAI",
    "Briggs-PlayAI",
    "Calum-PlayAI",
    "Celeste-PlayAI",
    "Cheyenne-PlayAI",
    "Chip-PlayAI",
    "Cillian-PlayAI",
    "Deedee-PlayAI",
    "Fritz-PlayAI",
    "Gail-PlayAI",
    "Indigo-PlayAI",
    "Mason-PlayAI",
    "Mikail-PlayAI",
    "Mitch-PlayAI",
    "Quinn-PlayAI",
    "Thunder-PlayAI",
  ];

  const maleVoices = [
    "Atlas-PlayAI",
    "Basil-PlayAI",
    "Briggs-PlayAI",
    "Calum-PlayAI",
    "Chip-PlayAI",
    "Cillian-PlayAI",
    "Fritz-PlayAI",
    "Mason-PlayAI",
    "Mikail-PlayAI",
    "Mitch-PlayAI",
    "Quinn-PlayAI",
    "Thunder-PlayAI",
  ];
  const femaleVoices = [
    "Arista-PlayAI",
    "Celeste-PlayAI",
    "Cheyenne-PlayAI",
    "Deedee-PlayAI",
    "Fritz-PlayAI",
    "Gail-PlayAI",
    "Indigo-PlayAI",
  ];

  const getPreview = (voiceName) => {
    const voiceUrls = {
      "Amira-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751547700/Amira-PlayAI_f2anii.wav",
      "Arista-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751547814/Arista-PlayAI_wvlq2c.wav",
      "Atlas-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751547890/Atlas-PlayAI_zxr18v.wav",
      "Basil-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751547908/Basil-PlayAI_vud9u8.wav",
      "Briggs-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751547927/Briggs-PlayAI_fd6mtu.wav",
      "Calum-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751547946/Calum-PlayAI_zxatm9.wav",
      "Cillian-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751547957/Cillian-PlayAI_csd9rl.wav",
      "Celeste-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548579/Celeste-PlayAI_xgoxxn.wav",
      "Cheyenne-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751547980/Cheyenne-PlayAI_pqktiz.wav",
      "Chip-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751547999/Chip-PlayAI_q3g2vv.wav",
      "Deedee-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548017/Deedee-PlayAI_r5xjmr.wav",
      "Fritz-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548040/Fritz-PlayAI_znwdzd.wav",
      "Gail-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548058/Gail-PlayAI_s3hgbe.wav",
      "Indigo-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548440/Indigo-PlayAI_gpgjgz.wav",
      "Khalid-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548088/Khalid-PlayAI_quiuns.wav",
      "Mason-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548110/Mason-PlayAI_ycq7qp.wav",
      "Quinn-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548134/Quinn-PlayAI_pbhkne.wav",
      "Mikail-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548267/Mikail-PlayAI_hjt1rm.wav",
      "Mitch-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548288/Mitch-PlayAI_zixvza.wav",
      "Thunder-PlayAI":
        "https://res.cloudinary.com/dpystprxq/video/upload/v1751548295/Thunder-PlayAI_ratihd.wav",
    };
    return (
      voiceUrls[voiceName] ||
      "https://res.cloudinary.com/dpystprxq/video/upload/v1751547700/Amira-PlayAI_f2anii.wav"
    );
  };

  // Cleanup audio khi component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const getAvailableVoices = () => {
    if (selectedGender === "male") return maleVoices;
    if (selectedGender === "female") return femaleVoices;
    return [];
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setSelectedVoice("");
    // Dừng audio nếu đang phát
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentPlayingVoice("");
      setPlayProgress(0);
    }
  };

  const handleVoiceChange = (event) => {
    setSelectedVoice(event.target.value);
  };

  const handlePlayPreview = async (voice) => {
    try {
      // Nếu đang phát cùng giọng, thì dừng
      if (isPlaying && currentPlayingVoice === voice) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
        setCurrentPlayingVoice("");
        setPlayProgress(0);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        return;
      }

      // Dừng audio hiện tại nếu có
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Lấy URL preview
      const audioUrl = getPreview(voice);

      // Tạo audio element mới
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // Set trạng thái phát
      setIsPlaying(true);
      setCurrentPlayingVoice(voice);
      setPlayProgress(0);

      // Xử lý sự kiện audio
      audio.addEventListener("loadeddata", () => {
        console.log(`Đang phát giọng: ${voice}`);
        audio.play().catch((error) => {
          console.error("Lỗi phát audio:", error);
          setIsPlaying(false);
          setCurrentPlayingVoice("");
          setPlayProgress(0);
        });
      });

      audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
          const progress = (audio.currentTime / audio.duration) * 100;
          setPlayProgress(progress);
        }
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentPlayingVoice("");
        setPlayProgress(0);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      });

      audio.addEventListener("error", (error) => {
        console.error("Lỗi tải audio:", error);
        setIsPlaying(false);
        setCurrentPlayingVoice("");
        setPlayProgress(0);
        // Fallback: dùng progress bar giả nếu audio thật không hoạt động
        simulateProgress();
      });

      // Load audio
      audio.load();
    } catch (error) {
      console.error("Lỗi xử lý audio:", error);
      // Fallback: dùng progress bar giả
      simulateProgress();
    }
  };

  // Hàm mô phỏng progress bar (fallback)
  const simulateProgress = () => {
    setIsPlaying(true);
    setCurrentPlayingVoice(voice);
    setPlayProgress(0);

    progressIntervalRef.current = setInterval(() => {
      setPlayProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressIntervalRef.current);
          setIsPlaying(false);
          setCurrentPlayingVoice("");
          return 0;
        }
        return prev + 3.33; // 100/30 = 3.33 để hoàn thành trong 3 giây
      });
    }, 100);
  };

  const toggleFavorite = (voice) => {
    setFavoriteVoices((prev) =>
      prev.includes(voice) ? prev.filter((v) => v !== voice) : [...prev, voice]
    );
  };

  const handleCreateAudio = async () => {
    // const response = await createAudio(workspace.script, selectedVoice);
    // const response = await createAudio(
    //   "Cristiano Ronaldo clutched his heavily bandaged knee, a grimace etched on his face as he watched the tense Euro 2016 final unfold from the bench. He rose with every attack, a whirlwind of frantic gestures and fervent shouts aimed at spurring on his Portuguese teammates. When Éder’s stunning strike found the net in extra time, an uncontrollable wave of emotion washed over Ronaldo. Ignoring the throbbing pain, he hobbled onto the pitch, tears blurring his vision as he embraced his fellow countrymen, celebrating their astounding victory forged through sheer resilience and belief.",
    //   selectedVoice
    // );
    // await saveScript({ audioUrl: response }, workspace.id);
    const response =
      "https://res.cloudinary.com/db1pazhew/video/upload/v1751555334/yh0myf88bzmiopsunlt7.mp3";
    setAudioUrl(response);
    setShowAudioPreview(true);
  };

  const getVoiceAvatar = (voice, gender) => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E9",
    ];
    const colorIndex = voice.length % colors.length;
    return colors[colorIndex];
  };

  return (
    <Box>
      <Paper
        elevation={12}
        sx={{
          p: 4,
          mx: "auto",
          borderRadius: 2,
          background: "rgba(255, 255, 255, 0.95)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gender Selection với animation */}
        <Slide direction="up" in={true} timeout={800}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontWeight: "bold",
              }}
            >
              <Settings sx={{ color: theme.palette.primary.main }} />
              Chọn loại giọng nói
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={selectedGender}
                onChange={handleGenderChange}
                sx={{ marginLeft: "70px" }}
              >
                <FormControlLabel
                  value="male"
                  sx={{ marginRight: "40px" }}
                  control={<Radio sx={{ color: "#2196f3" }} />}
                  label={
                    <Paper
                      elevation={2}
                      sx={{
                        marginLeft: "10px",
                        p: 2,
                        borderRadius: 3,
                        background:
                          selectedGender === "male"
                            ? alpha("#2196f3", 0.1)
                            : "white",
                        border:
                          selectedGender === "male"
                            ? "2px solid #2196f3"
                            : "1px solid #e0e0e0",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: 4,
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Male sx={{ color: "#2196f3", fontSize: 28 }} />
                        <Box sx={{ width: "300px" }}>
                          <Typography fontWeight="bold">Giọng nam</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {maleVoices.length} giọng khả dụng
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  }
                />
                <FormControlLabel
                  value="female"
                  control={<Radio sx={{ color: "#e91e63" }} />}
                  label={
                    <Paper
                      elevation={2}
                      sx={{
                        marginLeft: "10px",
                        p: 2,
                        borderRadius: 3,
                        background:
                          selectedGender === "female"
                            ? alpha("#e91e63", 0.1)
                            : "white",
                        border:
                          selectedGender === "female"
                            ? "2px solid #e91e63"
                            : "1px solid #e0e0e0",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: 4,
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Female sx={{ color: "#e91e63", fontSize: 28 }} />
                        <Box sx={{ width: "300px" }}>
                          <Typography fontWeight="bold">Giọng nữ</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {femaleVoices.length} giọng khả dụng
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Slide>

        {/* Voice Preview Grid */}
        {selectedGender && (
          <Slide direction="up" in={true} timeout={1000}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: "bold",
                }}
              >
                <VolumeUp sx={{ color: theme.palette.primary.main }} />
                Nghe thử các giọng nói
              </Typography>
              <Grid container spacing={3}>
                {getAvailableVoices().map((voice, index) => (
                  <Grid item xs={12} sm={6} md={4} key={voice}>
                    <Zoom in={true} timeout={500 + index * 100}>
                      <Card
                        variant="outlined"
                        sx={{
                          cursor: "pointer",
                          borderRadius: 2,
                          border: selectedVoice === voice ? 3 : 1,
                          borderColor:
                            selectedVoice === voice
                              ? "primary.main"
                              : "divider",
                          background:
                            selectedVoice === voice
                              ? alpha(theme.palette.primary.main, 0.05)
                              : "white",
                          transition: "all 0.3s ease",
                          position: "relative",
                          overflow: "hidden",
                          "&:hover": {
                            boxShadow: 3,
                            transform: "translateY(-4px)",
                            borderColor: "primary.main",
                          },
                          "&::before":
                            selectedVoice === voice
                              ? {
                                  content: '""',
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  height: "3px",
                                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                }
                              : {},
                        }}
                        onClick={() => setSelectedVoice(voice)}
                      >
                        <CardContent sx={{ p: 2, width: "235px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mb: 2,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                bgcolor: getVoiceAvatar(voice, selectedGender),
                                fontSize: 16,
                                fontWeight: "bold",
                              }}
                            >
                              {voice.charAt(0)}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {voice.replace("-PlayAI", "")}
                              </Typography>
                            </Box>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(voice);
                              }}
                              sx={{
                                color: favoriteVoices.includes(voice)
                                  ? "#ffc107"
                                  : "grey.400",
                              }}
                            >
                              {favoriteVoices.includes(voice) ? (
                                <Star />
                              ) : (
                                <StarBorder />
                              )}
                            </IconButton>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePlayPreview(voice);
                              }}
                              sx={{
                                bgcolor:
                                  isPlaying && currentPlayingVoice === voice
                                    ? alpha(theme.palette.error.main, 0.1)
                                    : alpha(theme.palette.primary.main, 0.1),
                                color:
                                  isPlaying && currentPlayingVoice === voice
                                    ? "error.main"
                                    : "primary.main",
                                "&:hover": {
                                  bgcolor:
                                    isPlaying && currentPlayingVoice === voice
                                      ? alpha(theme.palette.error.main, 0.2)
                                      : alpha(theme.palette.primary.main, 0.2),
                                },
                              }}
                            >
                              {isPlaying && currentPlayingVoice === voice ? (
                                <Stop />
                              ) : (
                                <PlayArrow />
                              )}
                            </IconButton>

                            {isPlaying && currentPlayingVoice === voice && (
                              <Box sx={{ flexGrow: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={playProgress}
                                  sx={{
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: alpha(
                                      theme.palette.primary.main,
                                      0.2
                                    ),
                                    "& .MuiLinearProgress-bar": {
                                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                      borderRadius: 3,
                                    },
                                  }}
                                />
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    mt: 0.5,
                                  }}
                                >
                                  <Equalizer
                                    sx={{ fontSize: 12, color: "primary.main" }}
                                  />
                                  <Typography
                                    variant="caption"
                                    color="primary.main"
                                  >
                                    Đang phát...
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Slide>
        )}

        {/* Apply Button */}
        {selectedVoice && (
          <Fade in={true} timeout={800}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCreateAudio}
                disabled={showAppliedSuccess}
                sx={{
                  px: 6,
                  py: 2,
                  borderRadius: 4,
                  fontSize: 16,
                  fontWeight: "bold",
                  background: showAppliedSuccess
                    ? `linear-gradient(45deg, #4caf50, #66bb6a)`
                    : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: 6,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 12,
                    transform: "translateY(-2px)",
                  },
                }}
                startIcon={showAppliedSuccess ? <Check /> : <GraphicEq />}
              >
                {showAppliedSuccess ? "Đã áp dụng thành công!" : `Tạo âm thanh`}
              </Button>
            </Box>
          </Fade>
        )}
      </Paper>
      {showAudioPreview && audioUrl && (
        <Fade in={showAudioPreview}>
          <Card
            sx={{
              bgcolor: "primary.50",
              border: "1px solid rgba(25, 118, 210, 0.2)",
              boxShadow: "0 4px 20px rgba(25, 118, 210, 0.1)",
              marginTop: "40px",
            }}
          >
            <CardHeader
              avatar={<PlayArrow color="primary" sx={{ fontSize: 28 }} />}
              title={
                <Typography variant="h6" fontWeight="600" color="primary.main">
                  Xem trước âm thanh
                </Typography>
              }
            />
            <CardContent>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "white",
                  borderRadius: 2,
                  border: "1px solid rgba(25, 118, 210, 0.1)",
                }}
              >
                <audio
                  // key={`${audioUrl}-${audioTimestamp}`}
                  key={`${audioUrl}`}
                  src={audioUrl}
                  controls
                  style={{
                    width: "100%",
                    height: "54px",
                    borderRadius: "8px",
                  }}
                />
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 2, display: "block", textAlign: "center" }}
                >
                  🎵 Bạn có thể nghe thử âm thanh được tạo từ kịch bản đã phê
                  duyệt
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Fade>
      )}
    </Box>
  );
};

export default VoiceConfigComponent;

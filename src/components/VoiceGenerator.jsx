// import React, { useState, useRef, useEffect } from "react";
// import {
//   Box,
//   FormControl,
//   Paper,
//   Typography,
//   IconButton,
//   Chip,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   Divider,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   LinearProgress,
//   Avatar,
//   Fade,
//   Slide,
//   Zoom,
//   useTheme,
//   CardHeader,
//   alpha,
// } from "@mui/material";
// import {
//   PlayArrow,
//   Stop,
//   VolumeUp,
//   Settings,
//   RecordVoiceOver,
//   Male,
//   Female,
//   Equalizer,
//   GraphicEq,
//   VolumeDown,
//   VolumeOff,
//   Check,
//   StarBorder,
//   Star,
// } from "@mui/icons-material";
// import { createAudio } from "../services/audio";
// import { saveScript } from "../services/script";
// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedWorkspace } from "../redux/workspaceSlice";

// const VoiceConfigComponent = ({}) => {
//   const theme = useTheme();
//   const workspace = useSelector((state) => state.workspace.selectedWorkspace);
//   const dispatch = useDispatch();
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedVoice, setSelectedVoice] = useState("");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentPlayingVoice, setCurrentPlayingVoice] = useState("");
//   const [playProgress, setPlayProgress] = useState(0);
//   const [favoriteVoices, setFavoriteVoices] = useState([]);
//   const [showAppliedSuccess, setShowAppliedSuccess] = useState(false);
//   const [showAudioPreview, setShowAudioPreview] = useState(false);
//   const [audioUrl, setAudioUrl] = useState("");
//   // Ref để quản lý audio element
//   const audioRef = useRef(null);
//   const progressIntervalRef = useRef(null);

//   const allVoices = [
//     "Arista-PlayAI",
//     "Atlas-PlayAI",
//     "Basil-PlayAI",
//     "Briggs-PlayAI",
//     "Calum-PlayAI",
//     "Celeste-PlayAI",
//     "Cheyenne-PlayAI",
//     "Chip-PlayAI",
//     "Cillian-PlayAI",
//     "Deedee-PlayAI",
//     "Fritz-PlayAI",
//     "Gail-PlayAI",
//     "Indigo-PlayAI",
//     "Mason-PlayAI",
//     "Mikail-PlayAI",
//     "Mitch-PlayAI",
//     "Quinn-PlayAI",
//     "Thunder-PlayAI",
//   ];

//   const maleVoices = [
//     "Atlas-PlayAI",
//     "Basil-PlayAI",
//     "Briggs-PlayAI",
//     "Calum-PlayAI",
//     "Chip-PlayAI",
//     "Cillian-PlayAI",
//     "Fritz-PlayAI",
//     "Mason-PlayAI",
//     "Mikail-PlayAI",
//     "Mitch-PlayAI",
//     "Quinn-PlayAI",
//     "Thunder-PlayAI",
//   ];
//   const femaleVoices = [
//     "Arista-PlayAI",
//     "Celeste-PlayAI",
//     "Cheyenne-PlayAI",
//     "Deedee-PlayAI",
//     "Fritz-PlayAI",
//     "Gail-PlayAI",
//     "Indigo-PlayAI",
//   ];

//   const getPreview = (voiceName) => {
//     const voiceUrls = {
//       "Amira-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751547700/Amira-PlayAI_f2anii.wav",
//       "Arista-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751547814/Arista-PlayAI_wvlq2c.wav",
//       "Atlas-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751547890/Atlas-PlayAI_zxr18v.wav",
//       "Basil-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751547908/Basil-PlayAI_vud9u8.wav",
//       "Briggs-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751547927/Briggs-PlayAI_fd6mtu.wav",
//       "Calum-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751547946/Calum-PlayAI_zxatm9.wav",
//       "Cillian-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751547957/Cillian-PlayAI_csd9rl.wav",
//       "Celeste-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548579/Celeste-PlayAI_xgoxxn.wav",
//       "Cheyenne-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751547980/Cheyenne-PlayAI_pqktiz.wav",
//       "Chip-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751547999/Chip-PlayAI_q3g2vv.wav",
//       "Deedee-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548017/Deedee-PlayAI_r5xjmr.wav",
//       "Fritz-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548040/Fritz-PlayAI_znwdzd.wav",
//       "Gail-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548058/Gail-PlayAI_s3hgbe.wav",
//       "Indigo-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548440/Indigo-PlayAI_gpgjgz.wav",
//       "Khalid-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548088/Khalid-PlayAI_quiuns.wav",
//       "Mason-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548110/Mason-PlayAI_ycq7qp.wav",
//       "Quinn-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548134/Quinn-PlayAI_pbhkne.wav",
//       "Mikail-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548267/Mikail-PlayAI_hjt1rm.wav",
//       "Mitch-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548288/Mitch-PlayAI_zixvza.wav",
//       "Thunder-PlayAI":
//         "https://res.cloudinary.com/dpystprxq/video/upload/v1751548295/Thunder-PlayAI_ratihd.wav",
//     };
//     return (
//       voiceUrls[voiceName] ||
//       "https://res.cloudinary.com/dpystprxq/video/upload/v1751547700/Amira-PlayAI_f2anii.wav"
//     );
//   };

//   // Cleanup audio khi component unmount
//   useEffect(() => {
//     return () => {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//       if (progressIntervalRef.current) {
//         clearInterval(progressIntervalRef.current);
//       }
//     };
//   }, []);

//   const getAvailableVoices = () => {
//     if (selectedGender === "male") return maleVoices;
//     if (selectedGender === "female") return femaleVoices;
//     return [];
//   };

//   const handleGenderChange = (event) => {
//     setSelectedGender(event.target.value);
//     setSelectedVoice("");
//     // Dừng audio nếu đang phát
//     if (audioRef.current) {
//       audioRef.current.pause();
//       setIsPlaying(false);
//       setCurrentPlayingVoice("");
//       setPlayProgress(0);
//     }
//   };

//   const handleVoiceChange = (event) => {
//     setSelectedVoice(event.target.value);
//   };

//   const handlePlayPreview = async (voice) => {
//     try {
//       // Nếu đang phát cùng giọng, thì dừng
//       if (isPlaying && currentPlayingVoice === voice) {
//         if (audioRef.current) {
//           audioRef.current.pause();
//         }
//         setIsPlaying(false);
//         setCurrentPlayingVoice("");
//         setPlayProgress(0);
//         if (progressIntervalRef.current) {
//           clearInterval(progressIntervalRef.current);
//         }
//         return;
//       }

//       // Dừng audio hiện tại nếu có
//       if (audioRef.current) {
//         audioRef.current.pause();
//       }

//       // Lấy URL preview
//       const audioUrl = getPreview(voice);

//       // Tạo audio element mới
//       const audio = new Audio(audioUrl);
//       audioRef.current = audio;

//       // Set trạng thái phát
//       setIsPlaying(true);
//       setCurrentPlayingVoice(voice);
//       setPlayProgress(0);

//       // Xử lý sự kiện audio
//       audio.addEventListener("loadeddata", () => {
//         console.log(`Đang phát giọng: ${voice}`);
//         audio.play().catch((error) => {
//           console.error("Lỗi phát audio:", error);
//           setIsPlaying(false);
//           setCurrentPlayingVoice("");
//           setPlayProgress(0);
//         });
//       });

//       audio.addEventListener("timeupdate", () => {
//         if (audio.duration) {
//           const progress = (audio.currentTime / audio.duration) * 100;
//           setPlayProgress(progress);
//         }
//       });

//       audio.addEventListener("ended", () => {
//         setIsPlaying(false);
//         setCurrentPlayingVoice("");
//         setPlayProgress(0);
//         if (progressIntervalRef.current) {
//           clearInterval(progressIntervalRef.current);
//         }
//       });

//       audio.addEventListener("error", (error) => {
//         console.error("Lỗi tải audio:", error);
//         setIsPlaying(false);
//         setCurrentPlayingVoice("");
//         setPlayProgress(0);
//         // Fallback: dùng progress bar giả nếu audio thật không hoạt động
//         simulateProgress();
//       });

//       // Load audio
//       audio.load();
//     } catch (error) {
//       console.error("Lỗi xử lý audio:", error);
//       // Fallback: dùng progress bar giả
//       simulateProgress();
//     }
//   };

//   // Hàm mô phỏng progress bar (fallback)
//   const simulateProgress = () => {
//     setIsPlaying(true);
//     setCurrentPlayingVoice(voice);
//     setPlayProgress(0);

//     progressIntervalRef.current = setInterval(() => {
//       setPlayProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(progressIntervalRef.current);
//           setIsPlaying(false);
//           setCurrentPlayingVoice("");
//           return 0;
//         }
//         return prev + 3.33; // 100/30 = 3.33 để hoàn thành trong 3 giây
//       });
//     }, 100);
//   };

//   const toggleFavorite = (voice) => {
//     setFavoriteVoices((prev) =>
//       prev.includes(voice) ? prev.filter((v) => v !== voice) : [...prev, voice]
//     );
//   };

//   const handleCreateAudio = async () => {
//     const response = await createAudio(workspace.script, selectedVoice);

//     const response2 = await saveScript({ audioUrl: response }, workspace.id);
//     dispatch(setSelectedWorkspace(response2));
//     setAudioUrl(response);
//     setShowAudioPreview(true);
//   };

//   const getVoiceAvatar = (voice, gender) => {
//     const colors = [
//       "#FF6B6B",
//       "#4ECDC4",
//       "#45B7D1",
//       "#96CEB4",
//       "#FFEAA7",
//       "#DDA0DD",
//       "#98D8C8",
//       "#F7DC6F",
//       "#BB8FCE",
//       "#85C1E9",
//     ];
//     const colorIndex = voice.length % colors.length;
//     return colors[colorIndex];
//   };

//   return (
//     <Box>
//       <Paper
//         elevation={12}
//         sx={{
//           p: 4,
//           mx: "auto",
//           borderRadius: 2,
//           background: "rgba(255, 255, 255, 0.95)",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         {/* Gender Selection với animation */}
//         <Slide direction="up" in={true} timeout={800}>
//           <Box sx={{ mb: 4 }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 mb: 3,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 fontWeight: "bold",
//               }}
//             >
//               <Settings sx={{ color: theme.palette.primary.main }} />
//               Chọn loại giọng nói
//             </Typography>
//             <FormControl component="fieldset">
//               <RadioGroup
//                 row
//                 value={selectedGender}
//                 onChange={handleGenderChange}
//                 sx={{ marginLeft: "70px" }}
//               >
//                 <FormControlLabel
//                   value="male"
//                   sx={{ marginRight: "40px" }}
//                   control={<Radio sx={{ color: "#2196f3" }} />}
//                   label={
//                     <Paper
//                       elevation={2}
//                       sx={{
//                         marginLeft: "10px",
//                         p: 2,
//                         borderRadius: 3,
//                         background:
//                           selectedGender === "male"
//                             ? alpha("#2196f3", 0.1)
//                             : "white",
//                         border:
//                           selectedGender === "male"
//                             ? "2px solid #2196f3"
//                             : "1px solid #e0e0e0",
//                         transition: "all 0.3s ease",
//                         "&:hover": {
//                           boxShadow: 4,
//                           transform: "translateY(-2px)",
//                         },
//                       }}
//                     >
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Male sx={{ color: "#2196f3", fontSize: 28 }} />
//                         <Box sx={{ width: "300px" }}>
//                           <Typography fontWeight="bold">Giọng nam</Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {maleVoices.length} giọng khả dụng
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Paper>
//                   }
//                 />
//                 <FormControlLabel
//                   value="female"
//                   control={<Radio sx={{ color: "#e91e63" }} />}
//                   label={
//                     <Paper
//                       elevation={2}
//                       sx={{
//                         marginLeft: "10px",
//                         p: 2,
//                         borderRadius: 3,
//                         background:
//                           selectedGender === "female"
//                             ? alpha("#e91e63", 0.1)
//                             : "white",
//                         border:
//                           selectedGender === "female"
//                             ? "2px solid #e91e63"
//                             : "1px solid #e0e0e0",
//                         transition: "all 0.3s ease",
//                         "&:hover": {
//                           boxShadow: 4,
//                           transform: "translateY(-2px)",
//                         },
//                       }}
//                     >
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Female sx={{ color: "#e91e63", fontSize: 28 }} />
//                         <Box sx={{ width: "300px" }}>
//                           <Typography fontWeight="bold">Giọng nữ</Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {femaleVoices.length} giọng khả dụng
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Paper>
//                   }
//                 />
//               </RadioGroup>
//             </FormControl>
//           </Box>
//         </Slide>

//         {/* Voice Preview Grid */}
//         {selectedGender && (
//           <Slide direction="up" in={true} timeout={1000}>
//             <Box sx={{ mb: 4 }}>
//               <Typography
//                 variant="h6"
//                 sx={{
//                   mb: 3,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   fontWeight: "bold",
//                 }}
//               >
//                 <VolumeUp sx={{ color: theme.palette.primary.main }} />
//                 Nghe thử các giọng nói
//               </Typography>
//               <Grid container spacing={3}>
//                 {getAvailableVoices().map((voice, index) => (
//                   <Grid item xs={12} sm={6} md={4} key={voice}>
//                     <Zoom in={true} timeout={500 + index * 100}>
//                       <Card
//                         variant="outlined"
//                         sx={{
//                           cursor: "pointer",
//                           borderRadius: 2,
//                           border: selectedVoice === voice ? 3 : 1,
//                           borderColor:
//                             selectedVoice === voice
//                               ? "primary.main"
//                               : "divider",
//                           background:
//                             selectedVoice === voice
//                               ? alpha(theme.palette.primary.main, 0.05)
//                               : "white",
//                           transition: "all 0.3s ease",
//                           position: "relative",
//                           overflow: "hidden",
//                           "&:hover": {
//                             boxShadow: 3,
//                             transform: "translateY(-4px)",
//                             borderColor: "primary.main",
//                           },
//                           "&::before":
//                             selectedVoice === voice
//                               ? {
//                                   content: '""',
//                                   position: "absolute",
//                                   top: 0,
//                                   left: 0,
//                                   right: 0,
//                                   height: "3px",
//                                   background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                                 }
//                               : {},
//                         }}
//                         onClick={() => setSelectedVoice(voice)}
//                       >
//                         <CardContent sx={{ p: 2, width: "235px" }}>
//                           <Box
//                             sx={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 2,
//                               mb: 2,
//                             }}
//                           >
//                             <Avatar
//                               sx={{
//                                 width: 40,
//                                 height: 40,
//                                 bgcolor: getVoiceAvatar(voice, selectedGender),
//                                 fontSize: 16,
//                                 fontWeight: "bold",
//                               }}
//                             >
//                               {voice.charAt(0)}
//                             </Avatar>
//                             <Box sx={{ flexGrow: 1 }}>
//                               <Typography variant="subtitle1" fontWeight="bold">
//                                 {voice.replace("-PlayAI", "")}
//                               </Typography>
//                             </Box>
//                             <IconButton
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 toggleFavorite(voice);
//                               }}
//                               sx={{
//                                 color: favoriteVoices.includes(voice)
//                                   ? "#ffc107"
//                                   : "grey.400",
//                               }}
//                             >
//                               {favoriteVoices.includes(voice) ? (
//                                 <Star />
//                               ) : (
//                                 <StarBorder />
//                               )}
//                             </IconButton>
//                           </Box>

//                           <Box
//                             sx={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: 1,
//                             }}
//                           >
//                             <IconButton
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 handlePlayPreview(voice);
//                               }}
//                               sx={{
//                                 bgcolor:
//                                   isPlaying && currentPlayingVoice === voice
//                                     ? alpha(theme.palette.error.main, 0.1)
//                                     : alpha(theme.palette.primary.main, 0.1),
//                                 color:
//                                   isPlaying && currentPlayingVoice === voice
//                                     ? "error.main"
//                                     : "primary.main",
//                                 "&:hover": {
//                                   bgcolor:
//                                     isPlaying && currentPlayingVoice === voice
//                                       ? alpha(theme.palette.error.main, 0.2)
//                                       : alpha(theme.palette.primary.main, 0.2),
//                                 },
//                               }}
//                             >
//                               {isPlaying && currentPlayingVoice === voice ? (
//                                 <Stop />
//                               ) : (
//                                 <PlayArrow />
//                               )}
//                             </IconButton>

//                             {isPlaying && currentPlayingVoice === voice && (
//                               <Box sx={{ flexGrow: 1 }}>
//                                 <LinearProgress
//                                   variant="determinate"
//                                   value={playProgress}
//                                   sx={{
//                                     height: 6,
//                                     borderRadius: 3,
//                                     bgcolor: alpha(
//                                       theme.palette.primary.main,
//                                       0.2
//                                     ),
//                                     "& .MuiLinearProgress-bar": {
//                                       background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                                       borderRadius: 3,
//                                     },
//                                   }}
//                                 />
//                                 <Box
//                                   sx={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     gap: 0.5,
//                                     mt: 0.5,
//                                   }}
//                                 >
//                                   <Equalizer
//                                     sx={{ fontSize: 12, color: "primary.main" }}
//                                   />
//                                   <Typography
//                                     variant="caption"
//                                     color="primary.main"
//                                   >
//                                     Đang phát...
//                                   </Typography>
//                                 </Box>
//                               </Box>
//                             )}
//                           </Box>
//                         </CardContent>
//                       </Card>
//                     </Zoom>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           </Slide>
//         )}

//         {/* Apply Button */}
//         {selectedVoice && (
//           <Fade in={true} timeout={800}>
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 onClick={handleCreateAudio}
//                 disabled={showAppliedSuccess}
//                 sx={{
//                   px: 6,
//                   py: 2,
//                   borderRadius: 4,
//                   fontSize: 16,
//                   fontWeight: "bold",
//                   background: showAppliedSuccess
//                     ? `linear-gradient(45deg, #4caf50, #66bb6a)`
//                     : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   boxShadow: 6,
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: 12,
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//                 startIcon={showAppliedSuccess ? <Check /> : <GraphicEq />}
//               >
//                 {showAppliedSuccess ? "Đã áp dụng thành công!" : `Tạo âm thanh`}
//               </Button>
//             </Box>
//           </Fade>
//         )}
//       </Paper>
//       {showAudioPreview && audioUrl && (
//         <Fade in={showAudioPreview}>
//           <Card
//             sx={{
//               bgcolor: "primary.50",
//               border: "1px solid rgba(25, 118, 210, 0.2)",
//               boxShadow: "0 4px 20px rgba(25, 118, 210, 0.1)",
//               marginTop: "40px",
//             }}
//           >
//             <CardHeader
//               avatar={<PlayArrow color="primary" sx={{ fontSize: 28 }} />}
//               title={
//                 <Typography variant="h6" fontWeight="600" color="primary.main">
//                   Xem trước âm thanh
//                 </Typography>
//               }
//             />
//             <CardContent>
//               <Box
//                 sx={{
//                   p: 3,
//                   bgcolor: "white",
//                   borderRadius: 2,
//                   border: "1px solid rgba(25, 118, 210, 0.1)",
//                 }}
//               >
//                 <audio
//                   // key={`${audioUrl}-${audioTimestamp}`}
//                   key={`${audioUrl}`}
//                   src={audioUrl}
//                   controls
//                   style={{
//                     width: "100%",
//                     height: "54px",
//                     borderRadius: "8px",
//                   }}
//                 />
//                 <Typography
//                   variant="caption"
//                   color="text.secondary"
//                   sx={{ mt: 2, display: "block", textAlign: "center" }}
//                 >
//                   🎵 Bạn có thể nghe thử âm thanh được tạo từ kịch bản đã phê
//                   duyệt
//                 </Typography>
//               </Box>
//             </CardContent>
//           </Card>
//         </Fade>
//       )}
//     </Box>
//   );
// };

// export default VoiceConfigComponent;
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  FormControl,
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
  CircularProgress,
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
import { useDispatch, useSelector } from "react-redux";
import { setSelectedWorkspace } from "../redux/workspaceSlice";

const VoiceConfigComponent = ({}) => {
  const theme = useTheme();
  const workspace = useSelector((state) => state.workspace.selectedWorkspace);
  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingVoice, setCurrentPlayingVoice] = useState("");
  const [playProgress, setPlayProgress] = useState(0);
  const [favoriteVoices, setFavoriteVoices] = useState([]);
  const [showAppliedSuccess, setShowAppliedSuccess] = useState(false);
  const [showAudioPreview, setShowAudioPreview] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [isCreatingAudio, setIsCreatingAudio] = useState(false); // Thêm state loading
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
    try {
      setIsCreatingAudio(true); // Bắt đầu loading

      const response = await createAudio(workspace.script, selectedVoice);
      const response2 = await saveScript({ audioUrl: response }, workspace.id);

      dispatch(setSelectedWorkspace(response2));
      setAudioUrl(response);
      setShowAudioPreview(true);
      setShowAppliedSuccess(true);

      // Tự động ẩn trạng thái success sau 3 giây
      setTimeout(() => {
        setShowAppliedSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Lỗi tạo âm thanh:", error);
      // Có thể thêm thông báo lỗi tại đây
    } finally {
      setIsCreatingAudio(false); // Kết thúc loading
    }
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

        {/* Apply Button với loading state */}
        {selectedVoice && (
          <Fade in={true} timeout={800}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleCreateAudio}
                disabled={isCreatingAudio || showAppliedSuccess}
                sx={{
                  px: 6,
                  py: 2,
                  borderRadius: 4,
                  fontSize: 16,
                  fontWeight: "bold",
                  minWidth: 200,
                  background: showAppliedSuccess
                    ? `linear-gradient(45deg, #4caf50, #66bb6a)`
                    : isCreatingAudio
                    ? `linear-gradient(45deg, #9e9e9e, #bdbdbd)`
                    : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: 6,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: isCreatingAudio ? 6 : 12,
                    transform: isCreatingAudio ? "none" : "translateY(-2px)",
                  },
                  "&:disabled": {
                    color: "white",
                  },
                }}
                startIcon={
                  isCreatingAudio ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : showAppliedSuccess ? (
                    <Check />
                  ) : (
                    <GraphicEq />
                  )
                }
              >
                {isCreatingAudio
                  ? "Đang tạo âm thanh..."
                  : showAppliedSuccess
                  ? "Đã áp dụng thành công!"
                  : "Tạo âm thanh"}
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

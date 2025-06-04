// import React, { useState } from "react";
// import {
//   Box,
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Typography,
//   Paper,
//   TextField,
//   Card,
//   CardMedia,
//   CardContent,
//   Grid,
//   Divider,
//   Chip,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Stack,
//   IconButton,
//   Tooltip,
//   Container,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Slider,
//   Avatar,
//   Fab,
//   AppBar,
//   Toolbar,
// } from "@mui/material";
// import {
//   TrendingUp,
//   AutoAwesome,
//   RecordVoiceOver,
//   ImageSearch,
//   Subtitles,
//   PlayArrow,
//   CheckCircleOutline,
//   Download,
//   Edit,
//   Save,
//   Refresh,
//   InsertEmoticon,
//   MusicNote,
//   TextFields,
//   Close,
//   Add,
//   HelpOutline,
// } from "@mui/icons-material";
// import Navigation from "../components/Navigation";
// import ScriptGenerator from "../components/ScriptGenerator";

// // Mock data for voice options
// const voiceOptions = [
//   { id: 1, name: "Nam giọng Bắc", gender: "male", sample: "sample1.mp3" },
//   { id: 2, name: "Nữ giọng Bắc", gender: "female", sample: "sample2.mp3" },
//   { id: 3, name: "Nam giọng Nam", gender: "male", sample: "sample3.mp3" },
//   { id: 4, name: "Nữ giọng Nam", gender: "female", sample: "sample4.mp3" },
// ];

// // Mock data for background options
// const backgroundOptions = [
//   {
//     id: 1,
//     name: "Công nghệ 1",
//     url: "https://cdn.oneesports.gg/cdn-data/2024/11/LeagueOfLegends_Worlds2024_MediaDay_T1_Sitting.jpg",
//     category: "Công nghệ",
//   },
//   {
//     id: 2,
//     name: "Công nghệ 2",
//     url: "https://cdn.oneesports.gg/cdn-data/2024/11/LeagueOfLegends_Worlds2024_MediaDay_T1_Sitting.jpg",
//     category: "Công nghệ",
//   },
//   {
//     id: 3,
//     name: "Giáo dục 1",
//     url: "https://cdn.oneesports.gg/cdn-data/2024/11/LeagueOfLegends_Worlds2024_MediaDay_T1_Sitting.jpg",
//     category: "Giáo dục",
//   },
//   {
//     id: 4,
//     name: "Thiên nhiên 1",
//     url: "https://cdn.oneesports.gg/cdn-data/2024/11/LeagueOfLegends_Worlds2024_MediaDay_T1_Sitting.jpg",
//     category: "Thiên nhiên",
//   },
//   {
//     id: 5,
//     name: "Thành phố 1",
//     url: "https://cdn.oneesports.gg/cdn-data/2024/11/LeagueOfLegends_Worlds2024_MediaDay_T1_Sitting.jpg",
//     category: "Đô thị",
//   },
//   {
//     id: 6,
//     name: "Trừu tượng 1",
//     url: "https://cdn.oneesports.gg/cdn-data/2024/11/LeagueOfLegends_Worlds2024_MediaDay_T1_Sitting.jpg",
//     category: "Trừu tượng",
//   },
//   {
//     id: 7,
//     name: "Trừu tượng 1",
//     url: "https://cdn.oneesports.gg/cdn-data/2024/11/LeagueOfLegends_Worlds2024_MediaDay_T1_Sitting.jpg",
//     category: "Trừu tượng",
//   },
//   {
//     id: 8,
//     name: "Trừu tượng 1",
//     url: "https://cdn.oneesports.gg/cdn-data/2024/11/LeagueOfLegends_Worlds2024_MediaDay_T1_Sitting.jpg",
//     category: "Trừu tượng",
//   },
// ];

// // Steps in the video creation workflow
// const steps = [
//   { label: "Kịch bản", icon: <TrendingUp /> },
//   { label: "Sinh kịch bản từ AI", icon: <AutoAwesome /> },
//   { label: "Tạo giọng đọc", icon: <RecordVoiceOver /> },
//   { label: "Chọn hình nền", icon: <ImageSearch /> },
//   { label: "Chèn phụ đề", icon: <Subtitles /> },
//   { label: "Xem trước và tải video", icon: <PlayArrow /> },
// ];

// export default function VideoCreator() {
//   const [activeStep, setActiveStep] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [keyword, setKeyword] = useState("");
//   const [selectedTrend, setSelectedTrend] = useState(null);
//   const [generatedScript, setGeneratedScript] = useState("");
//   const [selectedVoice, setSelectedVoice] = useState("");
//   const [audioPreview, setAudioPreview] = useState(null);
//   const [selectedBackground, setSelectedBackground] = useState(null);
//   const [subtitleStyle, setSubtitleStyle] = useState({
//     fontSize: 16,
//     color: "#ffffff",
//     background: "rgba(0, 0, 0, 0.5)",
//     position: "bottom",
//   });

//   // Preview video state
//   const [previewReady, setPreviewReady] = useState(false);
//   const [finalVideoUrl, setFinalVideoUrl] = useState(null);
//   const [openPreview, setOpenPreview] = useState(false);

//   // Handle next step in workflow
//   const handleNext = () => {
//     setIsLoading(true);
//     // Simulate processing time
//     setTimeout(() => {
//       setIsLoading(false);
//       if (activeStep === 0) {
//         // Generate fake script after selecting topic
//         setGeneratedScript(`# ${
//           keyword || (selectedTrend ? selectedTrend.name : "Chủ đề mới")
//         }

// ## Giới thiệu
// Chào mọi người! Hôm nay chúng ta sẽ tìm hiểu về ${
//           keyword || (selectedTrend ? selectedTrend.name : "chủ đề thú vị này")
//         }.

// ## Nội dung chính
// Đây là một xu hướng đang được nhiều người quan tâm vì những lợi ích thiết thực mà nó mang lại trong cuộc sống hàng ngày.

// ## Các điểm chính
// - Điểm quan trọng thứ nhất về chủ đề này
// - Lợi ích thứ hai mà bạn có thể nhận được
// - Thông tin thú vị thứ ba mà không phải ai cũng biết

// ## Kết luận
// Hy vọng qua video ngắn này, bạn đã có thêm kiến thức mới. Đừng quên like và share nếu bạn thấy hữu ích nhé!`);
//       } else if (activeStep === 2) {
//         // Simulate generating audio
//         setAudioPreview("demo_audio.mp3");
//       } else if (activeStep === 5) {
//         // Final video preview
//         setPreviewReady(true);
//         setFinalVideoUrl("/api/placeholder/480/854");
//       }
//       setActiveStep((prevStep) => prevStep + 1);
//     }, 1500);
//   };

//   // Handle going back a step
//   const handleBack = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   // Handle generating audio preview
//   const handleGenerateAudio = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setAudioPreview("demo_audio.mp3");
//     }, 1500);
//   };

//   // Handle opening video preview
//   const handleOpenPreview = () => {
//     setOpenPreview(true);
//   };

//   // Render different content based on current step
//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return <ScriptGenerator />;

//       case 1:
//         return (
//           <Box sx={{ mt: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Kịch bản được tạo bởi AI
//             </Typography>

//             <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: "#f9f9f9" }}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={12}
//                 value={generatedScript}
//                 onChange={(e) => setGeneratedScript(e.target.value)}
//                 variant="outlined"
//               />
//             </Paper>

//             <Stack direction="row" spacing={2}>
//               <Button
//                 startIcon={<Refresh />}
//                 variant="outlined"
//                 onClick={() => {
//                   setIsLoading(true);
//                   setTimeout(() => {
//                     setIsLoading(false);
//                     // Simulate regenerating content
//                     setGeneratedScript(`# ${
//                       keyword ||
//                       (selectedTrend ? selectedTrend.name : "Chủ đề mới")
//                     } - Phiên bản mới

// ## Mở đầu hấp dẫn
// Bạn đã bao giờ tự hỏi về ${
//                       keyword ||
//                       (selectedTrend ? selectedTrend.name : "chủ đề này")
//                     }? Hôm nay chúng ta sẽ khám phá những điều thú vị.

// ## Thực trạng
// Hiện nay, đây là một trong những xu hướng được quan tâm nhất với hàng triệu lượt tìm kiếm mỗi tháng.

// ## Ba lý do nên quan tâm
// - Giúp bạn tiết kiệm thời gian và công sức
// - Cải thiện chất lượng cuộc sống hàng ngày
// - Tạo cơ hội mới trong công việc và học tập

// ## Lời kết
// Hãy thử áp dụng những điều này và chia sẻ kết quả của bạn nhé! Cảm ơn đã theo dõi.`);
//                   }, 1500);
//                 }}
//               >
//                 Tạo lại
//               </Button>
//               <Button
//                 startIcon={<Edit />}
//                 variant="outlined"
//                 onClick={() => {
//                   // Open edit dialog (not implemented)
//                 }}
//               >
//                 Chỉnh sửa
//               </Button>
//             </Stack>
//           </Box>
//         );

//       case 2:
//         return (
//           <Box sx={{ mt: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Chọn giọng đọc
//             </Typography>

//             <Grid container spacing={3} sx={{ mb: 4 }}>
//               {voiceOptions.map((voice) => (
//                 <Grid item xs={12} sm={6} md={3} key={voice.id}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       border:
//                         selectedVoice === voice.id
//                           ? "2px solid #1976d2"
//                           : "none",
//                       cursor: "pointer",
//                     }}
//                     onClick={() => setSelectedVoice(voice.id)}
//                   >
//                     <CardContent>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", mb: 2 }}
//                       >
//                         <Avatar
//                           sx={{
//                             bgcolor:
//                               voice.gender === "male" ? "#1976d2" : "#d81b60",
//                           }}
//                         >
//                           <RecordVoiceOver />
//                         </Avatar>
//                         <Typography variant="h6" sx={{ ml: 1 }}>
//                           {voice.name}
//                         </Typography>
//                       </Box>

//                       <Box sx={{ display: "flex", justifyContent: "center" }}>
//                         <IconButton color="primary">
//                           <PlayArrow />
//                         </IconButton>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>

//             <Divider sx={{ my: 2 }} />

//             <Box sx={{ mt: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Tùy chỉnh giọng đọc
//               </Typography>

//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography gutterBottom>Tốc độ đọc</Typography>
//                   <Slider
//                     defaultValue={1}
//                     step={0.1}
//                     marks
//                     min={0.5}
//                     max={2}
//                     valueLabelDisplay="auto"
//                   />
//                 </Grid>

//                 <Grid item xs={12} sm={6}>
//                   <Typography gutterBottom>Cao độ</Typography>
//                   <Slider
//                     defaultValue={0}
//                     step={0.1}
//                     marks
//                     min={-1}
//                     max={1}
//                     valueLabelDisplay="auto"
//                   />
//                 </Grid>
//               </Grid>

//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 2 }}
//                 startIcon={<RecordVoiceOver />}
//                 onClick={handleGenerateAudio}
//                 disabled={!selectedVoice}
//               >
//                 Tạo bản xem trước
//               </Button>

//               {audioPreview && (
//                 <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Bản xem trước
//                   </Typography>
//                   <audio controls style={{ width: "100%" }}>
//                     <source src={audioPreview} type="audio/mpeg" />
//                     Trình duyệt của bạn không hỗ trợ phát audio.
//                   </audio>
//                 </Box>
//               )}
//             </Box>
//           </Box>
//         );

//       case 3:
//         return (
//           <Box sx={{ mt: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Chọn hình nền cho video
//             </Typography>

//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 label="Tìm kiếm hình nền"
//                 variant="outlined"
//                 fullWidth
//                 sx={{ mb: 2 }}
//                 InputProps={{
//                   endAdornment: (
//                     <IconButton>
//                       <ImageSearch />
//                     </IconButton>
//                   ),
//                 }}
//               />
//             </Box>

//             <Grid container spacing={2} sx={{ maxWidth: "100%" }}>
//               {backgroundOptions.map((bg) => (
//                 <Grid item xs={6} sm={4} md={3} key={bg.id}>
//                   <Card
//                     sx={{
//                       cursor: "pointer",
//                       border:
//                         selectedBackground?.id === bg.id
//                           ? "2px solid #1976d2"
//                           : "none",
//                       position: "relative",
//                       maxWidth: "100%",
//                       height: "100%",
//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                     onClick={() => setSelectedBackground(bg)}
//                   >
//                     <CardMedia
//                       component="img"
//                       sx={{
//                         height: { xs: 100, sm: 120, md: 140 },
//                         objectFit: "cover",
//                         objectPosition: "center",
//                       }}
//                       image={bg.url}
//                       alt={bg.name}
//                     />
//                     {selectedBackground?.id === bg.id && (
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           top: 8,
//                           right: 8,
//                           bgcolor: "primary.main",
//                           borderRadius: "50%",
//                           color: "white",
//                           padding: "2px",
//                         }}
//                       >
//                         <CheckCircleOutline fontSize="small" />
//                       </Box>
//                     )}
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>

//             <Button variant="outlined" startIcon={<Add />} sx={{ mt: 2 }}>
//               Tải lên hình nền tùy chỉnh
//             </Button>
//           </Box>
//         );

//       case 4:
//         return (
//           <Box sx={{ mt: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Tùy chỉnh phụ đề
//             </Typography>

//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 3, height: "100%" }}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Kiểu phụ đề
//                   </Typography>

//                   <FormControl fullWidth sx={{ mb: 3 }}>
//                     <InputLabel id="font-family-label">Font chữ</InputLabel>
//                     <Select
//                       labelId="font-family-label"
//                       value="roboto"
//                       label="Font chữ"
//                     >
//                       <MenuItem value="roboto">Roboto</MenuItem>
//                       <MenuItem value="arial">Arial</MenuItem>
//                       <MenuItem value="montserrat">Montserrat</MenuItem>
//                       <MenuItem value="opensans">Open Sans</MenuItem>
//                     </Select>
//                   </FormControl>

//                   <Typography gutterBottom>Cỡ chữ</Typography>
//                   <Slider
//                     value={subtitleStyle.fontSize}
//                     min={12}
//                     max={32}
//                     step={1}
//                     onChange={(e, value) =>
//                       setSubtitleStyle({ ...subtitleStyle, fontSize: value })
//                     }
//                     valueLabelDisplay="auto"
//                     sx={{ mb: 3 }}
//                   />

//                   <Typography gutterBottom>Màu chữ</Typography>
//                   <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
//                     {[
//                       "#ffffff",
//                       "#000000",
//                       "#ff0000",
//                       "#00ff00",
//                       "#0000ff",
//                       "#ffff00",
//                     ].map((color) => (
//                       <Box
//                         key={color}
//                         onClick={() =>
//                           setSubtitleStyle({ ...subtitleStyle, color })
//                         }
//                         sx={{
//                           width: 36,
//                           height: 36,
//                           bgcolor: color,
//                           border:
//                             subtitleStyle.color === color
//                               ? "3px solid #1976d2"
//                               : "1px solid #ccc",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                         }}
//                       />
//                     ))}
//                   </Stack>

//                   <Typography gutterBottom>Màu nền</Typography>
//                   <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
//                     {[
//                       "rgba(0,0,0,0.5)",
//                       "rgba(0,0,0,0)",
//                       "rgba(255,255,255,0.5)",
//                       "rgba(0,0,255,0.3)",
//                     ].map((bgColor) => (
//                       <Box
//                         key={bgColor}
//                         onClick={() =>
//                           setSubtitleStyle({
//                             ...subtitleStyle,
//                             background: bgColor,
//                           })
//                         }
//                         sx={{
//                           width: 36,
//                           height: 36,
//                           bgcolor: bgColor,
//                           border:
//                             subtitleStyle.background === bgColor
//                               ? "3px solid #1976d2"
//                               : "1px solid #ccc",
//                           borderRadius: "4px",
//                           cursor: "pointer",
//                         }}
//                       />
//                     ))}
//                   </Stack>

//                   <Typography gutterBottom>Vị trí</Typography>
//                   <Stack direction="row" spacing={1}>
//                     {["top", "center", "bottom"].map((position) => (
//                       <Chip
//                         key={position}
//                         label={
//                           position === "top"
//                             ? "Trên"
//                             : position === "center"
//                             ? "Giữa"
//                             : "Dưới"
//                         }
//                         variant={
//                           subtitleStyle.position === position
//                             ? "filled"
//                             : "outlined"
//                         }
//                         color={
//                           subtitleStyle.position === position
//                             ? "primary"
//                             : "default"
//                         }
//                         onClick={() =>
//                           setSubtitleStyle({ ...subtitleStyle, position })
//                         }
//                       />
//                     ))}
//                   </Stack>
//                 </Paper>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Paper sx={{ p: 3 }}>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Xem trước phụ đề
//                   </Typography>

//                   <Box
//                     sx={{
//                       bgcolor: "#000",
//                       height: 400,
//                       width: "100%",
//                       position: "relative",
//                       borderRadius: 1,
//                       overflow: "hidden",
//                       display: "flex",
//                       flexDirection: "column",
//                       justifyContent:
//                         subtitleStyle.position === "top"
//                           ? "flex-start"
//                           : subtitleStyle.position === "center"
//                           ? "center"
//                           : "flex-end",
//                       alignItems: "center",
//                       p: 2,
//                     }}
//                   >
//                     {selectedBackground && (
//                       <Box
//                         component="img"
//                         src={selectedBackground.url}
//                         sx={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                           zIndex: 0,
//                         }}
//                       />
//                     )}

//                     <Box
//                       sx={{
//                         p: 2,
//                         backgroundColor: subtitleStyle.background,
//                         borderRadius: 1,
//                         maxWidth: "90%",
//                         zIndex: 1,
//                       }}
//                     >
//                       <Typography
//                         align="center"
//                         sx={{
//                           color: subtitleStyle.color,
//                           fontSize: subtitleStyle.fontSize,
//                           textShadow:
//                             subtitleStyle.background === "rgba(0,0,0,0)"
//                               ? "1px 1px 2px rgba(0,0,0,0.8)"
//                               : "none",
//                         }}
//                       >
//                         Đây là nội dung phụ đề mẫu
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Box sx={{ mt: 2 }}>
//                     <Typography variant="subtitle2" gutterBottom>
//                       Tuỳ chọn nâng cao
//                     </Typography>

//                     <Stack direction="row" spacing={1}>
//                       <Button
//                         startIcon={<TextFields />}
//                         size="small"
//                         variant="outlined"
//                       >
//                         Hiệu ứng văn bản
//                       </Button>
//                       <Button
//                         startIcon={<InsertEmoticon />}
//                         size="small"
//                         variant="outlined"
//                       >
//                         Thêm sticker
//                       </Button>
//                     </Stack>
//                   </Box>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </Box>
//         );

//       case 5:
//         return (
//           <Box sx={{ mt: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Xem trước và tải video
//             </Typography>

//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 {!previewReady ? (
//                   <Box
//                     sx={{
//                       bgcolor: "#f5f5f5",
//                       height: 480,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       flexDirection: "column",
//                       borderRadius: 2,
//                     }}
//                   >
//                     <CircularProgress sx={{ mb: 2 }} />
//                     <Typography>Đang tạo video...</Typography>
//                   </Box>
//                 ) : (
//                   <Box
//                     sx={{
//                       position: "relative",
//                       borderRadius: 2,
//                       overflow: "hidden",
//                     }}
//                   >
//                     <img
//                       src={finalVideoUrl}
//                       alt="Video Preview"
//                       style={{
//                         width: "100%",
//                         aspectRatio: "9/16",
//                         objectFit: "cover",
//                       }}
//                     />
//                     <Box
//                       sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                       }}
//                     >
//                       <IconButton
//                         sx={{
//                           bgcolor: "rgba(0, 0, 0, 0.5)",
//                           "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
//                         }}
//                         onClick={handleOpenPreview}
//                       >
//                         <PlayArrow sx={{ color: "white", fontSize: 60 }} />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 )}
//               </Grid>

//               <Grid item xs={12} md={4}>
//                 <Paper sx={{ p: 3, height: "100%" }}>
//                   <Typography variant="h6" gutterBottom>
//                     Thông tin video
//                   </Typography>

//                   <Box sx={{ mb: 3 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                       Chủ đề
//                     </Typography>
//                     <Typography variant="body1">
//                       {keyword ||
//                         (selectedTrend ? selectedTrend.name : "Chưa xác định")}
//                     </Typography>
//                   </Box>

//                   <Box sx={{ mb: 3 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                       Thời lượng
//                     </Typography>
//                     <Typography variant="body1">00:47</Typography>
//                   </Box>

//                   <Box sx={{ mb: 3 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                       Giọng đọc
//                     </Typography>
//                     <Typography variant="body1">
//                       {voiceOptions.find((v) => v.id === selectedVoice)?.name ||
//                         "Chưa chọn"}
//                     </Typography>
//                   </Box>

//                   <Box sx={{ mb: 3 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                       Định dạng
//                     </Typography>
//                     <Typography variant="body1">MP4 (1080x1920)</Typography>
//                   </Box>

//                   <Divider sx={{ my: 2 }} />

//                   <Typography variant="subtitle1" gutterBottom>
//                     Tuỳ chọn xuất video
//                   </Typography>

//                   <FormControl fullWidth sx={{ mb: 2 }}>
//                     <InputLabel id="quality-label">Chất lượng</InputLabel>
//                     <Select
//                       labelId="quality-label"
//                       value="high"
//                       label="Chất lượng"
//                     >
//                       <MenuItem value="low">Thấp (360p)</MenuItem>
//                       <MenuItem value="medium">Trung bình (720p)</MenuItem>
//                       <MenuItem value="high">Cao (1080p)</MenuItem>
//                     </Select>
//                   </FormControl>

//                   <Button
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     startIcon={<Download />}
//                     disabled={!previewReady}
//                     sx={{ mb: 2 }}
//                   >
//                     Tải video về máy
//                   </Button>

//                   <Button fullWidth variant="outlined" startIcon={<Edit />}>
//                     Chỉnh sửa video
//                   </Button>
//                 </Paper>
//               </Grid>
//             </Grid>

//             <Dialog
//               open={openPreview}
//               onClose={() => setOpenPreview(false)}
//               maxWidth="md"
//               fullWidth
//             >
//               <DialogTitle>
//                 Xem trước video
//                 <IconButton
//                   onClick={() => setOpenPreview(false)}
//                   sx={{ position: "absolute", right: 8, top: 8 }}
//                 >
//                   <Close />
//                 </IconButton>
//               </DialogTitle>
//               <DialogContent>
//                 <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
//                   <Box sx={{ width: "50%", aspectRatio: "9/16" }}>
//                     <img
//                       src={finalVideoUrl}
//                       alt="Video Preview"
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={() => setOpenPreview(false)}>Đóng</Button>
//                 <Button startIcon={<Download />} variant="contained">
//                   Tải xuống
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           </Box>
//         );

//       default:
//         return "Bước không xác định";
//     }
//   };

//   return (
//     <>
//       <Navigation />
//       <Container maxWidth="lg" sx={{ py: 4, mt: "40px", bgcolor: "#f5f5f5" }}>
//         <AppBar
//           position="static"
//           color="transparent"
//           elevation={0}
//           sx={{ mb: 4 }}
//         >
//           <Toolbar>
//             <Typography
//               variant="h5"
//               component="div"
//               sx={{ flexGrow: 1, fontWeight: "bold" }}
//             >
//               <MusicNote sx={{ mr: 1, verticalAlign: "middle" }} />
//               AI Short Video Creator
//             </Typography>

//             <Stack direction="row" spacing={2}>
//               <Button startIcon={<Save />}>Lưu dự án</Button>
//               <Tooltip title="Trợ giúp">
//                 <IconButton>
//                   <HelpOutline />
//                 </IconButton>
//               </Tooltip>
//             </Stack>
//           </Toolbar>
//         </AppBar>

//         <Paper elevation={3} sx={{ px: 4, py: 3, mb: 4 }}>
//           <Stepper activeStep={activeStep} alternativeLabel>
//             {steps.map((step, index) => (
//               <Step key={index}>
//                 <StepLabel
//                   StepIconComponent={() => (
//                     <Avatar
//                       sx={{
//                         bgcolor:
//                           activeStep === index
//                             ? "primary.main"
//                             : activeStep > index
//                             ? "success.main"
//                             : "grey.300",
//                         width: 40,
//                         height: 40,
//                       }}
//                     >
//                       {step.icon}
//                     </Avatar>
//                   )}
//                 >
//                   {step.label}
//                 </StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </Paper>

//         <Paper elevation={3} sx={{ p: 4 }}>
//           {getStepContent(activeStep)}

//           {isLoading && (
//             <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
//               <CircularProgress />
//             </Box>
//           )}

//           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//             <Button
//               variant="outlined"
//               disabled={activeStep === 0 || isLoading}
//               onClick={handleBack}
//             >
//               Quay lại
//             </Button>

//             {activeStep === steps.length - 1 ? (
//               <Button
//                 variant="contained"
//                 color="success"
//                 startIcon={<CheckCircleOutline />}
//                 onClick={() => {
//                   // Handle completion
//                 }}
//                 disabled={isLoading || !previewReady}
//               >
//                 Hoàn thành
//               </Button>
//             ) : (
//               <Button
//                 variant="contained"
//                 onClick={handleNext}
//                 disabled={
//                   isLoading ||
//                   (activeStep === 0 && !keyword && !selectedTrend) ||
//                   (activeStep === 2 && !selectedVoice) ||
//                   (activeStep === 3 && !selectedBackground)
//                 }
//               >
//                 {activeStep === steps.length - 2 ? "Tạo video" : "Tiếp theo"}
//               </Button>
//             )}
//           </Box>
//         </Paper>

//         {/* Video History Section */}
//         {activeStep === steps.length - 1 && previewReady && (
//           <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
//             <Typography variant="h6" gutterBottom>
//               Video đã tạo gần đây
//             </Typography>

//             <Grid container spacing={2}>
//               {[1, 2, 3].map((item) => (
//                 <Grid item xs={12} sm={6} md={4} key={item}>
//                   <Card>
//                     <CardMedia
//                       component="img"
//                       height="240"
//                       image={`/api/placeholder/240/420`}
//                       alt={`Video ${item}`}
//                     />
//                     <CardContent>
//                       <Typography variant="subtitle1" gutterBottom>
//                         {item === 1 ? keyword : `Video mẫu ${item}`}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {new Date().toLocaleDateString()}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Paper>
//         )}

//         {/* Fab button for help */}
//         <Fab color="primary" sx={{ position: "fixed", bottom: 20, right: 20 }}>
//           <HelpOutline />
//         </Fab>
//       </Container>
//     </>
//   );
// }

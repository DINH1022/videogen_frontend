// // import React, { useEffect, useState } from "react";
// // import { Box, Typography, Tabs, Tab, Grid, Chip, Stack } from "@mui/material";
// // import VideoCard from "./VideoCard";
// // import VideoShareDialog from "./ShareDialog";
// // import { getAllVideosUploadToYoutube } from "../services/youtube";
// // // Dữ liệu mẫu với video đang xử lý
// // const sampleVideos = [
// //   {
// //     id: 1,
// //     topic: "Mẹo Ba Tư: Nguồn gốc, Đặc điểm và Chăm sóc toàn diện",
// //     state: "complete",
// //     published: ["facebook"],
// //     dateCreate: "7 thg 5, 2025",
// //     views: "3 lượt xem",
// //     thumbnail:
// //       "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
// //   },
// //   {
// //     id: 2,
// //     topic: "Vòng Đời Tuyệt Diệu Của Bướm: Từ Trứng Đến Khi Vút Bay",
// //     state: "complete",
// //     published: ["youtube"],
// //     dateCreate: "7 thg 5, 2025",
// //     views: "7 lượt xem",
// //     thumbnail:
// //       "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop",
// //   },
// //   {
// //     id: 3,
// //     topic:
// //       "Vòng Đời Tuyệt Diệu Của Bướm: Từ Trứng Đến Khi Vút Bay Hành trình kỳ diệu từ trứng bé nhỏ, qua...",
// //     state: "complete",
// //     published: ["tiktok"],
// //     dateCreate: "7 thg 5, 2025",
// //     views: "2 lượt xem",
// //     thumbnail:
// //       "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=200&fit=crop",
// //   },
// //   {
// //     id: 4,
// //     topic: "Vòng Đời Tuyệt Diệu Của Bướm: Từ Trứng Đến Khi Vút Bay",
// //     state: "complete",
// //     published: ["facebook"],
// //     dateCreate: "7 thg 5, 2025",
// //     views: "5 lượt xem",
// //     thumbnail:
// //       "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
// //   },
// //   {
// //     id: 5,
// //     topic: "Mẹo ba tư - Video đang được xử lý",
// //     state: "processing",
// //     published: [],
// //     dateCreate: "7 thg 5, 2025",
// //     views: "0 lượt xem",
// //     progress: 65,
// //     thumbnail:
// //       "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop",
// //   },
// //   {
// //     id: 6,
// //     topic: "Quá trình phát triển của bướm",
// //     state: "complete",
// //     published: [],
// //     dateCreate: "7 thg 5, 2025",
// //     views: "0 lượt xem",
// //     thumbnail:
// //       "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop",
// //   },
// //   {
// //     id: 7,
// //     topic: "Sa mạc cát",
// //     state: "processing",
// //     published: [],
// //     dateCreate: "8 thg 5, 2025",
// //     views: "0 lượt xem",
// //     progress: 30,
// //   },
// //   {
// //     id: 8,
// //     topic: "Sự phát triển của cây bắt đầu từ hạt mầm",
// //     state: "complete",
// //     published: [],
// //     dateCreate: "8 thg 5, 2025",
// //     views: "0 lượt xem",
// //     thumbnail:
// //       "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
// //   },
// // ];

// // const VideoSection = ({ workspaces }) => {
// //   const [activeTab, setActiveTab] = useState(0);

// //   const handleTabChange = (event, newValue) => {
// //     setActiveTab(newValue);
// //   };
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const response = await getAllVideosUploadToYoutube();
// //       console.log("response>> ", response);
// //     };
// //     fetchData();
// //   }, []);
// //   const getFilteredVideos = () => {
// //     switch (activeTab) {
// //       case 0:
// //         return sampleVideos;
// //       case 1:
// //         return sampleVideos.filter((video) => video.state === "complete");
// //       case 2:
// //         return sampleVideos.filter((video) => video.state === "processing");
// //       case 3:
// //         return sampleVideos.filter((video) => video.published.length > 0);
// //       default:
// //         return sampleVideos;
// //     }
// //   };

// //   const tabs = [
// //     { label: "Tất cả", count: sampleVideos.length },
// //     {
// //       label: "Video từ Workspace",
// //       count: sampleVideos.filter((v) => v.state === "complete").length,
// //     },
// //     {
// //       label: "Video đang xử lý",
// //       count: sampleVideos.filter((v) => v.state === "processing").length,
// //     },
// //     {
// //       label: "Video đã xuất bản",
// //       count: sampleVideos.filter((v) => v.published.length > 0).length,
// //     },
// //   ];

// //   const isPublishedTab = activeTab === 3;

// //   return (
// //     <Box>
// //       <Box sx={{ borderBottom: 1, borderColor: "#e5e7eb", mb: 4 }}>
// //         <Tabs
// //           value={activeTab}
// //           onChange={handleTabChange}
// //           variant="scrollable"
// //           scrollButtons="auto"
// //           sx={{
// //             "& .MuiTab-root": {
// //               textTransform: "none",
// //               fontSize: "0.95rem",
// //               fontWeight: 500,
// //               color: "#6b7280",
// //               "&.Mui-selected": {
// //                 color: "#3b82f6",
// //                 fontWeight: 600,
// //               },
// //             },
// //             "& .MuiTabs-indicator": {
// //               backgroundColor: "#3b82f6",
// //               height: 3,
// //               borderRadius: 1.5,
// //             },
// //           }}
// //         >
// //           {tabs.map((tab, index) => (
// //             <Tab
// //               key={index}
// //               label={
// //                 <Stack direction="row" alignItems="center" spacing={1.5}>
// //                   <span>{tab.label}</span>
// //                   <Chip
// //                     label={tab.count}
// //                     size="small"
// //                     variant="outlined"
// //                     sx={{
// //                       height: 20,
// //                       fontSize: "0.75rem",
// //                       fontWeight: 500,
// //                       borderColor: activeTab === index ? "#3b82f6" : "#d1d5db",
// //                       color: activeTab === index ? "#3b82f6" : "#6b7280",
// //                       "& .MuiChip-label": { px: 1 },
// //                     }}
// //                   />
// //                 </Stack>
// //               }
// //             />
// //           ))}
// //         </Tabs>
// //       </Box>

// //       {/* Video Grid */}
// //       <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
// //         {getFilteredVideos().map((video) => (
// //           <Grid
// //             item
// //             xs={12}
// //             sm={6}
// //             md={4}
// //             lg={3}
// //             xl={3}
// //             key={video.id}
// //             sx={{
// //               display: "flex",
// //               justifyContent: "center",
// //             }}
// //           >
// //             <VideoCard video={video} isPublishedTab={isPublishedTab} />
// //           </Grid>
// //         ))}
// //       </Grid>

// //       {/* Empty state cho videos */}
// //       {getFilteredVideos().length === 0 && (
// //         <Box
// //           sx={{
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             minHeight: 400,
// //             textAlign: "center",
// //             backgroundColor: "#fff",
// //             borderRadius: 3,
// //             border: "1px solid #e5e7eb",
// //             mb: 6,
// //           }}
// //         >
// //           <Typography
// //             variant="h6"
// //             sx={{
// //               mb: 1,
// //               color: "#374151",
// //               fontWeight: 600,
// //             }}
// //           >
// //             Không có video nào
// //           </Typography>
// //           <Typography
// //             variant="body2"
// //             sx={{
// //               color: "#6b7280",
// //               fontSize: "0.9rem",
// //             }}
// //           >
// //             Chưa có video nào trong danh mục này
// //           </Typography>
// //         </Box>
// //       )}
// //     </Box>
// //   );
// // };

// // export default VideoSection;
// import React, { useEffect, useState } from "react";
// import { Box, Typography, Tabs, Tab, Grid, Chip, Stack } from "@mui/material";
// import VideoCard from "./VideoCard";
// import VideoShareDialog from "./ShareDialog";
// import { getAllVideosUploadToYoutube } from "../services/youtube";

// // Sample 1: Video từ Workspace (complete, chưa publish)
// const workspaceVideos1 = [
//   {
//     id: 1,
//     topic: "Mẹo Ba Tư: Nguồn gốc, Đặc điểm và Chăm sóc toàn diện",
//     state: "complete",
//     published: [],
//     dateCreate: "7 thg 5, 2025",
//     views: "0 lượt xem",
//     thumbnail:
//       "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
//   },
//   {
//     id: 2,
//     topic: "Vòng Đời Tuyệt Diệu Của Bướm: Từ Trứng Đến Khi Vút Bay",
//     state: "complete",
//     published: [],
//     dateCreate: "7 thg 5, 2025",
//     views: "0 lượt xem",
//     thumbnail:
//       "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop",
//   },
//   {
//     id: 3,
//     topic: "Sự phát triển của cây bắt đầu từ hạt mầm",
//     state: "complete",
//     published: [],
//     dateCreate: "8 thg 5, 2025",
//     views: "0 lượt xem",
//     thumbnail:
//       "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
//   },
// ];

// // Sample 2: Video đang xử lý
// const processingVideos = [
//   {
//     id: 4,
//     topic: "Mẹo ba tư - Video đang được xử lý",
//     state: "processing",
//     published: [],
//     dateCreate: "7 thg 5, 2025",
//     views: "0 lượt xem",
//     progress: 65,
//     thumbnail:
//       "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop",
//   },
//   {
//     id: 5,
//     topic: "Sa mạc cát",
//     state: "processing",
//     published: [],
//     dateCreate: "8 thg 5, 2025",
//     views: "0 lượt xem",
//     progress: 30,
//   },
// ];

// // Sample 3: Video đã xuất bản
// const publishedVideos1 = [
//   {
//     id: 6,
//     topic: "Khám phá thế giới động vật hoang dã",
//     state: "complete",
//     published: ["facebook"],
//     dateCreate: "6 thg 5, 2025",
//     views: "15 lượt xem",
//     thumbnail:
//       "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=200&fit=crop",
//   },
//   {
//     id: 7,
//     topic: "Hướng dẫn trồng cây trong nhà",
//     state: "complete",
//     published: ["youtube"],
//     dateCreate: "5 thg 5, 2025",
//     views: "8 lượt xem",
//     thumbnail:
//       "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
//   },
//   {
//     id: 8,
//     topic: "Bí quyết chăm sóc cây cảnh",
//     state: "complete",
//     published: ["tiktok"],
//     dateCreate: "4 thg 5, 2025",
//     views: "25 lượt xem",
//     thumbnail:
//       "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=300&h=200&fit=crop",
//   },
// ];

// const VideoSection = ({ workspaces }) => {
//   const [activeTab, setActiveTab] = useState(2);
//   const getVideoWorkspace = (data) => {
//     const videos = data?.map((item, index) => {
//       if (item.videoUrl) {
//         return {
//           id: index,
//           url: item.videoUrl,
//           dateCreate: item.createAt,
//           topic: item.title,
//           thumbnail: item.imagesSet ? item?.imagesSet[0] : "",
//           state: "complete",
//         };
//       }
//     });
//     return videos || [];
//   };
//   const configVideosPublishedYoutube = (data) => {
//     const videos = data.map((item, index) => {
//       return {
//         id: index,
//         topic: item.title,
//         url: item.url,
//         thumbnail: item.thumb_nail,
//         dateCreate: item.published_at,
//         views: `${item.number_of_views || 0} lượt xem`,
//       };
//     });
//     return videos || [];
//   };
//   const [workspaceVideos, setWorkspaceVideos] = useState([]);
//   useEffect(() => {
//     const data = getVideoWorkspace(workspaces);
//     setWorkspaceVideos(data);
//   }, [workspaces]);
//   const [publishedVideos, setPublishedVideos] = useState([]);
//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await getAllVideosUploadToYoutube();
//       console.log("reps: >", response);
//       const videos = configVideosPublishedYoutube(response);
//       console.log("video: >", videos);

//       setPublishedVideos(videos);
//     };
//     fetchData();
//   }, []);

//   const getFilteredVideos = () => {
//     switch (activeTab) {
//       case 0:
//         console.log("workspaceVideos", workspaceVideos);
//         return workspaceVideos;
//       case 1:
//         console.log("processingVideos", processingVideos);
//         return processingVideos;
//       case 2:
//         console.log("publishedVideos", publishedVideos);
//         return publishedVideos;
//       default:
//         return workspaceVideos;
//     }
//   };

//   const tabs = [
//     {
//       label: "Video từ Workspace",
//       count: workspaceVideos?.length || 0,
//     },
//     {
//       label: "Video đang xử lý",
//       count: processingVideos.length,
//     },
//     {
//       label: "Video đã xuất bản",
//       count: publishedVideos.length,
//     },
//   ];

//   const isPublishedTab = activeTab === 2;

//   return (
//     <Box>
//       <Box sx={{ borderBottom: 1, borderColor: "#e5e7eb", mb: 4 }}>
//         <Tabs
//           value={activeTab}
//           onChange={handleTabChange}
//           variant="scrollable"
//           scrollButtons="auto"
//           sx={{
//             "& .MuiTab-root": {
//               textTransform: "none",
//               fontSize: "0.95rem",
//               fontWeight: 500,
//               color: "#6b7280",
//               "&.Mui-selected": {
//                 color: "#3b82f6",
//                 fontWeight: 600,
//               },
//             },
//             "& .MuiTabs-indicator": {
//               backgroundColor: "#3b82f6",
//               height: 3,
//               borderRadius: 1.5,
//             },
//           }}
//         >
//           {tabs.map((tab, index) => (
//             <Tab
//               key={index}
//               label={
//                 <Stack direction="row" alignItems="center" spacing={1.5}>
//                   <span>{tab.label}</span>
//                   <Chip
//                     label={tab.count}
//                     size="small"
//                     variant="outlined"
//                     sx={{
//                       height: 20,
//                       fontSize: "0.75rem",
//                       fontWeight: 500,
//                       borderColor: activeTab === index ? "#3b82f6" : "#d1d5db",
//                       color: activeTab === index ? "#3b82f6" : "#6b7280",
//                       "& .MuiChip-label": { px: 1 },
//                     }}
//                   />
//                 </Stack>
//               }
//             />
//           ))}
//         </Tabs>
//       </Box>

//       {/* Video Grid */}
//       <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
//         {getFilteredVideos()?.map((video, index) => (
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             md={4}
//             lg={3}
//             xl={3}
//             key={index}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <VideoCard video={video} isPublishedTab={isPublishedTab} />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Empty state cho videos */}
//       {getFilteredVideos()?.length === 0 && (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             minHeight: 400,
//             textAlign: "center",
//             backgroundColor: "#fff",
//             borderRadius: 3,
//             border: "1px solid #e5e7eb",
//             mb: 6,
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{
//               mb: 1,
//               color: "#374151",
//               fontWeight: 600,
//             }}
//           >
//             Không có video nào
//           </Typography>
//           <Typography
//             variant="body2"
//             sx={{
//               color: "#6b7280",
//               fontSize: "0.9rem",
//             }}
//           >
//             Chưa có video nào trong danh mục này
//           </Typography>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default VideoSection;
import React, { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab, Grid, Chip, Stack } from "@mui/material";
import VideoCard from "./VideoCard";
import VideoShareDialog from "./ShareDialog";
import { getAllVideosUploadToYoutube } from "../services/youtube";
import {
  getAllVideosUploadToTiktok,
  getAllVideosUploadToTiktokStore,
} from "../services/tiktok";

// Sample 2: Video đang xử lý
const processingVideos = [
  {
    id: 4,
    topic: "Mẹo ba tư - Video đang được xử lý",
    state: "processing",
    published: [],
    dateCreate: "7 thg 5, 2025",
    views: "0 lượt xem",
    progress: 65,
    thumbnail:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    topic: "Sa mạc cát",
    state: "processing",
    published: [],
    dateCreate: "8 thg 5, 2025",
    views: "0 lượt xem",
    progress: 30,
  },
];

const VideoSection = ({ workspaces }) => {
  const [activeTab, setActiveTab] = useState(2);
  const [workspaceVideos, setWorkspaceVideos] = useState([]);
  const [publishedVideos, setPublishedVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fix function getVideoWorkspace
  const getVideoWorkspace = (data) => {
    if (!data || !Array.isArray(data)) return [];

    const videos = data
      .map((item, index) => {
        if (item?.videoUrl) {
          return {
            id: index,
            url: item.videoUrl,
            dateCreate: item.createAt || new Date().toISOString(),
            topic: item.title || "Untitled Video",
            thumbnail:
              item.imagesSet && item.imagesSet.length > 0
                ? item.imagesSet[0]
                : "",
            state: "complete",
            published: [], // Thêm field này
            views: "0 lượt xem", // Thêm field này
            language: item.language || "vietnamese", // Thêm field này
            script: item.script || "",
          };
        }
        return null;
      })
      .filter(Boolean); // Loại bỏ các giá trị null/undefined

    return videos;
  };

  // Fix function configVideosPublishedYoutube
  const configVideosPublishedYoutube = (data) => {
    if (!data || !Array.isArray(data)) return [];

    const videos = data.map((item, index) => {
      return {
        id: index,
        topic: item?.title || "Untitled Video",
        url: item?.url || "",
        thumbnail: item?.thumb_nail || "",
        dateCreate: item?.published_at || new Date().toISOString(),
        views: `${item?.number_of_views || 0} lượt xem`,
        state: "complete", // Thêm field này
        published: ["youtube"], // Thêm field này
      };
    });
    return videos;
  };
  const configVideosPublishedTiktok = (data) => {
    if (!data || !Array.isArray(data)) return [];

    const videos = data.map((item, index) => {
      return {
        id: index + 10,
        topic: item?.title || "Untitled Video",
        url: item?.url || "",
        thumbnail: item?.thumbnail || "",
        dateCreate: item?.publishedAt || new Date().toISOString(),
        views: `${item?.numOfViews || 0} lượt xem`,
        state: "complete", // Thêm field này
        published: ["tiktok"], // Thêm field này
      };
    });
    return videos;
  };
  // Update workspaceVideos when workspaces prop changes
  useEffect(() => {
    try {
      const data = getVideoWorkspace(workspaces);
      console.log("Processed workspace videos:", data);
      setWorkspaceVideos(data);
    } catch (error) {
      console.error("Error processing workspace videos:", error);
      setWorkspaceVideos([]);
    }
  }, [workspaces]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllVideosUploadToYoutube();
        const response2 = await getAllVideosUploadToTiktokStore();

        const videosYoutube = configVideosPublishedYoutube(response);
        const videosTiktok = configVideosPublishedTiktok(response2);
        // Gộp 2 mảng và sắp xếp theo dateCreate (mới nhất đến cũ nhất)
        const allVideos = [...videosYoutube, ...videosTiktok].sort((a, b) => {
          return new Date(b.dateCreate) - new Date(a.dateCreate);
        });

        setPublishedVideos(allVideos);
      } catch (error) {
        console.error("Error fetching published videos:", error);
        setPublishedVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getFilteredVideos = () => {
    switch (activeTab) {
      case 0:
        console.log("Current workspaceVideos:", workspaceVideos);
        return workspaceVideos || [];
      case 1:
        console.log("Current processingVideos:", processingVideos);
        return processingVideos || [];
      case 2:
        console.log("Current publishedVideos:", publishedVideos);
        return publishedVideos || [];
      default:
        return workspaceVideos || [];
    }
  };

  const tabs = [
    {
      label: "Video từ Workspace",
      count: workspaceVideos?.length || 0,
    },
    {
      label: "Video đang xử lý",
      count: processingVideos?.length || 0,
    },
    {
      label: "Video đã xuất bản",
      count: publishedVideos?.length || 0,
    },
  ];

  const isPublishedTab = activeTab === 2;
  const currentVideos = getFilteredVideos();

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "#e5e7eb", mb: 4 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "0.95rem",
              fontWeight: 500,
              color: "#6b7280",
              "&.Mui-selected": {
                color: "#3b82f6",
                fontWeight: 600,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#3b82f6",
              height: 3,
              borderRadius: 1.5,
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <span>{tab.label}</span>
                  <Chip
                    label={tab.count}
                    size="small"
                    variant="outlined"
                    sx={{
                      height: 20,
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      borderColor: activeTab === index ? "#3b82f6" : "#d1d5db",
                      color: activeTab === index ? "#3b82f6" : "#6b7280",
                      "& .MuiChip-label": { px: 1 },
                    }}
                  />
                </Stack>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Loading state */}
      {loading && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography>Đang tải...</Typography>
        </Box>
      )}

      {/* Video Grid */}
      {!loading && (
        <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
          {currentVideos.map((video, index) => {
            // Kiểm tra video object trước khi render
            if (!video || typeof video !== "object") {
              console.warn("Invalid video object at index:", index, video);
              return null;
            }

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                key={video.id || index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <VideoCard video={video} isPublishedTab={isPublishedTab} />
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Empty state cho videos */}
      {!loading && currentVideos.length === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 400,
            textAlign: "center",
            backgroundColor: "#fff",
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            mb: 6,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              color: "#374151",
              fontWeight: 600,
            }}
          >
            Không có video nào
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#6b7280",
              fontSize: "0.9rem",
            }}
          >
            Chưa có video nào trong danh mục này
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default VideoSection;
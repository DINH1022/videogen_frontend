import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Chip,
  Stack,
  Pagination,
} from "@mui/material";
import VideoCard from "./VideoCard";
import { getAllVideosUploadToYoutube } from "../services/youtube";
import {
  getAllVideosUploadToTiktok,
  getAllVideosUploadToTiktokStore,
} from "../services/tiktok";

const VideoSection = ({ workspaces }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [workspaceVideos, setWorkspaceVideos] = useState([]);
  const [publishedVideos, setPublishedVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const VIDEOS_PER_PAGE = 8;

  // Fix function getVideoWorkspace
  const getVideoWorkspace = (data) => {
    if (!data || !Array.isArray(data)) return [];

    const videos = data
      .map((item, index) => {
        if (item?.videoUrl) {
          return {
            id: `workspace_${index}`, // Sử dụng prefix để tránh trùng lặp
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
        id: `youtube_${index}`, // Sử dụng prefix để tránh trùng lặp
        topic: item?.title || "Untitled Video",
        url: item?.url || "",
        thumbnail:
          item?.thumb_nail ||
          "https://as1.ftcdn.net/v2/jpg/02/68/55/60/1000_F_268556011_PlbhKss0alfFmzNuqXdE3L0OfkHQ1rHH.jpg",
        dateCreate: item?.published_at || new Date().toISOString(),
        views: `${item?.number_of_views || 0} lượt xem`,
        state: "complete",
        published: ["youtube"],
      };
    });
    return videos;
  };

  const configVideosPublishedTiktok = (data) => {
    if (!data || !Array.isArray(data)) return [];

    const videos = data.map((item, index) => {
      return {
        id: `tiktok_${index}`,
        topic: item?.title || "Untitled Video",
        url: item?.url || "",
        thumbnail:
          item?.thumbnail ||
          "https://as1.ftcdn.net/v2/jpg/02/68/55/60/1000_F_268556011_PlbhKss0alfFmzNuqXdE3L0OfkHQ1rHH.jpg",
        dateCreate: item?.publishedAt || new Date().toISOString(),
        views: `${item?.numOfViews || 0} lượt xem`,
        state: "complete",
        published: ["tiktok"],
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
      setCurrentPage(1); // Reset to first page when data changes
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
        setCurrentPage(1); // Reset to first page when data changes
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
    setCurrentPage(1); // Reset to first page when tab changes
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getFilteredVideos = () => {
    switch (activeTab) {
      case 0:
        console.log("Current workspaceVideos:", workspaceVideos);
        return workspaceVideos || [];
      case 1:
        console.log("Current publishedVideos:", publishedVideos);
        return publishedVideos || [];
      default:
        return workspaceVideos || [];
    }
  };

  // Get paginated videos
  const getPaginatedVideos = () => {
    const allVideos = getFilteredVideos();
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    const endIndex = startIndex + VIDEOS_PER_PAGE;
    return allVideos.slice(startIndex, endIndex);
  };

  // Calculate total pages
  const getTotalPages = () => {
    const allVideos = getFilteredVideos();
    return Math.ceil(allVideos.length / VIDEOS_PER_PAGE);
  };

  const tabs = [
    {
      label: "Video từ Workspace",
      count: workspaceVideos?.length || 0,
    },
    {
      label: "Video đã xuất bản",
      count: publishedVideos?.length || 0,
    },
  ];

  const isPublishedTab = activeTab === 1; // Changed from 2 to 1
  const currentVideos = getPaginatedVideos();
  const totalPages = getTotalPages();
  const totalVideos = getFilteredVideos().length;

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
        <>
          <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
            {currentVideos.map((video, index) => {
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

          {/* Pagination */}
          {totalPages > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 4,
                mb: 2,
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                sx={{
                  order: { xs: 1, sm: 2 },
                  "& .MuiPaginationItem-root": {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    "&.Mui-selected": {
                      backgroundColor: "#3b82f6",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#2563eb",
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
        </>
      )}

      {/* Empty state cho videos */}
      {!loading && totalVideos === 0 && (
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

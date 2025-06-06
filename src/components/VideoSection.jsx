import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Grid, Chip, Stack } from "@mui/material";
import VideoCard from "./VideoCard";

// Dữ liệu mẫu với video đang xử lý
const sampleVideos = [
  {
    id: 1,
    topic: "Mẹo Ba Tư: Nguồn gốc, Đặc điểm và Chăm sóc toàn diện",
    state: "complete",
    published: ["facebook"],
    dateCreate: "7 thg 5, 2025",
    views: "3 lượt xem",
    thumbnail:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    topic: "Vòng Đời Tuyệt Diệu Của Bướm: Từ Trứng Đến Khi Vút Bay",
    state: "complete",
    published: ["youtube"],
    dateCreate: "7 thg 5, 2025",
    views: "7 lượt xem",
    thumbnail:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    topic:
      "Vòng Đời Tuyệt Diệu Của Bướm: Từ Trứng Đến Khi Vút Bay Hành trình kỳ diệu từ trứng bé nhỏ, qua...",
    state: "complete",
    published: ["tiktok"],
    dateCreate: "7 thg 5, 2025",
    views: "2 lượt xem",
    thumbnail:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    topic: "Vòng Đời Tuyệt Diệu Của Bướm: Từ Trứng Đến Khi Vút Bay",
    state: "complete",
    published: ["facebook"],
    dateCreate: "7 thg 5, 2025",
    views: "5 lượt xem",
    thumbnail:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
  },
  {
    id: 5,
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
    id: 6,
    topic: "Quá trình phát triển của bướm",
    state: "complete",
    published: [],
    dateCreate: "7 thg 5, 2025",
    views: "0 lượt xem",
    thumbnail:
      "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=200&fit=crop",
  },
  {
    id: 7,
    topic: "Sa mạc cát",
    state: "processing",
    published: [],
    dateCreate: "8 thg 5, 2025",
    views: "0 lượt xem",
    progress: 30,
  },
  {
    id: 8,
    topic: "Sự phát triển của cây bắt đầu từ hạt mầm",
    state: "complete",
    published: [],
    dateCreate: "8 thg 5, 2025",
    views: "0 lượt xem",
    thumbnail:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop",
  },
];

const VideoSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getFilteredVideos = () => {
    switch (activeTab) {
      case 0:
        return sampleVideos;
      case 1:
        return sampleVideos.filter((video) => video.state === "complete");
      case 2:
        return sampleVideos.filter((video) => video.state === "processing");
      case 3:
        return sampleVideos.filter((video) => video.published.length > 0);
      default:
        return sampleVideos;
    }
  };

  const tabs = [
    { label: "Tất cả", count: sampleVideos.length },
    {
      label: "Video từ Workspace",
      count: sampleVideos.filter((v) => v.state === "complete").length,
    },
    {
      label: "Video đang xử lý",
      count: sampleVideos.filter((v) => v.state === "processing").length,
    },
    {
      label: "Video đã xuất bản",
      count: sampleVideos.filter((v) => v.published.length > 0).length,
    },
  ];

  const isPublishedTab = activeTab === 3;

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

      {/* Video Grid */}
      <Grid container spacing={2} sx={{ justifyContent: "flex-start" }}>
        {getFilteredVideos().map((video) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            key={video.id}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <VideoCard video={video} isPublishedTab={isPublishedTab} />
          </Grid>
        ))}
      </Grid>

      {/* Empty state cho videos */}
      {getFilteredVideos().length === 0 && (
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

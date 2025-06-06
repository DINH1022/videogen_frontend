import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Chip,
  Container,
  Stack,
  Button,
  Divider,
} from "@mui/material";

import VideoCard from "../components/VideoCard";
import WorkspaceCard from "../components/WorkspaceCard";

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

// Dữ liệu mẫu cho workspaces
const sampleWorkspaces = [
  {
    id: 1,
    name: "Dự án Nội dung Giáo dục",
    description:
      "Tạo video giáo dục về khoa học tự nhiên, bao gồm các chủ đề về động vật, thực vật và môi trường sống.",
    dateCreate: "15 thg 4, 2025",
  },
  {
    id: 2,
    name: "Marketing Sản phẩm 2025",
    description:
      "Workspace dành cho việc tạo content marketing cho các sản phẩm mới trong năm 2025. Bao gồm video quảng cáo và content social media.",
    dateCreate: "22 thg 4, 2025",
  },
  {
    id: 3,
    name: "Hướng dẫn Thực hành",
    description:
      "Tập hợp các video hướng dẫn và tutorial cho người dùng mới bắt đầu.",
    dateCreate: "5 thg 5, 2025",
  },
  {
    id: 4,
    name: "Nội dung Giải trí",
    description:
      "Workspace cho các video giải trí, funny clips và nội dung nhẹ nhàng để thu hút audience.",
    dateCreate: "10 thg 5, 2025",
  },
];

const VideoDashboard = () => {
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

  const handleViewResources = (workspace) => {
    console.log("Xem tài nguyên cho workspace:", workspace);
    // Implement logic để xem tài nguyên
  };

  const handleCreateNewWorkspace = () => {
    console.log("Tạo workspace mới");
    // Implement logic để tạo workspace mới
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
    <Container
      maxWidth="xl"
      sx={{
        py: 5,
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          color: "#1f2937",
          fontSize: "2rem",
        }}
      >
        Video Dashboard
      </Typography>

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
      <Grid container spacing={3} sx={{ justifyContent: "flex-start" }}>
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

      {/* Divider */}
      <Divider sx={{ my: 6, borderColor: "#e5e7eb" }} />

      {/* Workspace Section */}
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: "#1f2937",
          fontSize: "1.5rem",
        }}
      >
        Workspace
      </Typography>

      {/* Workspace Grid */}
      {/* Main Container với khung trắng */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: 3,
          margin: 2,
          minHeight: "600px",
          position: "relative",
        }}
      >
        {/* Header với buttons ở góc trên phải */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 3,
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleViewResources}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Xem tài nguyên
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewWorkspace}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Tạo workspace mới
          </Button>
        </Box>

        {/* Workspace Grid */}
        <Grid container spacing={3} sx={{ justifyContent: "flex-start" }}>
          {sampleWorkspaces.map((workspace) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              key={workspace.id}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <WorkspaceCard
                workspace={workspace}
                onViewResources={handleViewResources}
                onCreateNew={handleCreateNewWorkspace}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default VideoDashboard;

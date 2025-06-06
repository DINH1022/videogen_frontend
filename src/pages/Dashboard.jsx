import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Grid,
  Chip,
  IconButton,
  Container,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Share as ShareIcon,
  PlayCircleOutline as PlayIcon,
  Facebook as FacebookIcon,
  YouTube as YouTubeIcon,
  MusicNote as TikTokIcon,
  Visibility as VisibilityIcon,
  FileDownload as DownloadIcon,
  CalendarToday,
  LinkOutlined,
  InsertLink,
  Event,
  DateRange,
} from "@mui/icons-material";

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
    thumbnail:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=300&h=200&fit=crop",
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

// Component Video Card
const VideoCard = ({ video, isPublishedTab }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPlatformChip = (platform) => {
    const configs = {
      facebook: {
        label: "Facebook",
        icon: <FacebookIcon sx={{ fontSize: 14 }} />,
        color: "#1877F2",
      },
      youtube: {
        label: "YouTube",
        icon: <YouTubeIcon sx={{ fontSize: 14 }} />,
        color: "#FF0000",
      },
      tiktok: {
        label: "TikTok",
        icon: <TikTokIcon sx={{ fontSize: 14 }} />,
        color: "#000000",
      },
    };
    return configs[platform];
  };

  return (
    <Card
      sx={{
        width: 350,
        height: 320,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: 2,
        mx: "auto",
        backgroundColor: "#fff",
        border: "1px solid rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box sx={{ position: "relative", height: 180 }}>
        <CardMedia
          component="img"
          height="180"
          image={video.thumbnail}
          alt={video.topic}
          sx={{
            objectFit: "cover",
            backgroundColor: "#f8f9fa",
            height: "180px",
          }}
        />

        {isPublishedTab && video.published.length > 0 ? (
          <Box sx={{ position: "absolute", top: 12, right: 12 }}>
            {video.published.map((platform) => {
              const config = getPlatformChip(platform);
              return (
                <Chip
                  key={platform}
                  icon={config.icon}
                  label={config.label}
                  size="small"
                  sx={{
                    backgroundColor: config.color,
                    color: "white",
                    fontSize: "0.75rem",
                    height: 28,
                    fontWeight: 500,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    "& .MuiChip-icon": {
                      color: "inherit",
                    },
                  }}
                />
              );
            })}
          </Box>
        ) : (
          <IconButton
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(8px)",
              opacity: isHovered ? 1 : 0,
              visibility: isHovered ? "visible" : "hidden",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,1)",
                transform: "scale(1.1)",
              },
              width: 36,
              height: 36,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
            size="small"
          >
            <ShareIcon sx={{ fontSize: 18, color: "#374151" }} />
          </IconButton>
        )}

        {/* Processing overlay - Cleaner design */}
        {video.state === "processing" && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
            }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(255,255,255,0.98)",
                borderRadius: 4,
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                minWidth: 120,
              }}
            >
              <CircularProgress
                size={48}
                thickness={3}
                sx={{
                  color: "#3b82f6",
                  mb: 2,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#1f2937",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                Đang xử lý...
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "#6b7280",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                }}
              >
                {video.progress || 0}%
              </Typography>
            </Box>
          </Box>
        )}

        {/* Status chip - Clean minimal design */}
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "2rem",
            lineHeight: "1.4rem ",
            fontSize: "0.95rem",
            color: "#1f2937",
          }}
        >
          {video.topic}
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1, mt: 1 }}
        >
          <Stack direction="row" spacing={0.8} alignItems="center">
            <CalendarToday
              sx={{
                fontSize: 13,
                color: "#9ca3af",
                transform: "translateY(-1.5px)",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.8rem",
                color: "#6b7280",
                fontWeight: 500,
              }}
            >
              {video.dateCreate}
            </Typography>
          </Stack>

          {!isPublishedTab && (
            <Chip
              label={video.state === "processing" ? "Đang xử lý" : "Hoàn thành"}
              sx={{
                fontSize: "0.75rem",
                height: 24,
                backgroundColor:
                  video.state === "processing" ? "#f59e0b" : "#10b981",
                color: "white",
                fontWeight: 500,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
              size="small"
            />
          )}

          {isPublishedTab && (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <VisibilityIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.8rem",
                  color: "#6b7280",
                  fontWeight: 500,
                }}
              >
                {video.views}
              </Typography>
            </Stack>
          )}
        </Stack>

        {/* Action Button - Clean design */}
        {video.state === "processing" ? (
          <Typography
            variant="caption"
            sx={{
              fontSize: "0.8rem",
              color: "#9ca3af",
              fontStyle: "italic",
            }}
          >
            Video đang được xử lý...
          </Typography>
        ) : isPublishedTab && video.published.length > 0 ? (
          <Button
            startIcon={<LinkOutlined sx={{ transform: "rotate(45deg)" }} />}
            size="small"
            sx={{
              textTransform: "none",
              fontSize: "0.85rem",
              color: "#3b82f6",
              p: 0,
              minWidth: 0,
              justifyContent: "flex-start",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#1d4ed8",
              },
            }}
          >
            Xem trên {getPlatformChip(video.published[0]).label}
          </Button>
        ) : (
          <Button
            size="small"
            startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              fontSize: "0.85rem",
              color: "#3b82f6",
              p: 0,
              minWidth: 0,
              justifyContent: "flex-start",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "transparent",
                color: "#1d4ed8",
              },
            }}
          >
            Tải video
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

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

      {/* Empty state */}
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
    </Container>
  );
};

export default VideoDashboard;

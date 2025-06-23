import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  ButtonGroup,
  Divider,
  Stack,
} from "@mui/material";
import {
  YouTube,
  Login,
  Refresh,
  PlayArrow,
  Visibility,
  ThumbUp,
  Comment,
  Person,
  TrendingUp,
  BarChart,
  TableChart,
  VideoLibrary,
  Update,
  Analytics,
} from "@mui/icons-material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from "recharts";
import { useMemo } from "react";
import Navigation from "../components/Navigation";
// TikTok icon component
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.39z" />
  </svg>
);

const Statistics = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("youtube");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [videoFilter, setVideoFilter] = useState("latest");
  // Xử lý data để chỉ hiển thị top 5 và gộp phần còn lại thành "Khác"

  // Sample data based on the structure you provided
  const sampleData = [
    {
      title: "Video không có tiêu đề",
      url: "https://youtube.com/watch?v=1",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
      numOfViews: 1250,
      numOfLikes: 89,
      numOfComments: 12,
      publishedAt: "2025-05-03T10:30:00Z",
    },
    {
      title: "Demo chức năng của Chat Application  MeTalk",
      url: "https://youtube.com/watch?v=2",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
      numOfViews: 2840,
      numOfLikes: 156,
      numOfComments: 23,
      publishedAt: "2024-12-17T14:20:00Z",
    },
    {
      title: "THE MATCHING GAME HCMUS",
      url: "https://youtube.com/watch?v=3",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
      numOfViews: 8900,
      numOfLikes: 445,
      numOfComments: 67,
      publishedAt: "2023-04-15T09:15:00Z",
    },
    {
      title: "STREET FOOD FOR SWEET TOOTH",
      url: "https://youtube.com/watch?v=4",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
      numOfViews: 15600,
      numOfLikes: 892,
      numOfComments: 134,
      publishedAt: "2021-02-27T16:45:00Z",
    },
    {
      title: "Studentsdf sdf - v3",
      url: "https://youtube.com/watch?v=5",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
      numOfViews: 520,
      numOfLikes: 28,
      numOfComments: 45,
      publishedAt: "2024-08-10T11:30:00Z",
    },

    {
      title: "STREETT TOOTH",
      url: "https://youtube.com/watch?v=4",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
      numOfViews: 100,
      numOfLikes: 82,
      numOfComments: 14,
      publishedAt: "2021-02-27T16:45:00Z",
    },
    {
      title: "Student App dfs sdf sdf dsf - v3",
      url: "https://youtube.com/watch?v=5",
      thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/default.jpg",
      numOfViews: 50,
      numOfLikes: 29,
      numOfComments: 45,
      publishedAt: "2024-08-10T11:30:00Z",
    },
  ];

  const totalViews = sampleData.reduce(
    (sum, video) => sum + video.numOfViews,
    0
  );
  const totalLikes = sampleData.reduce(
    (sum, video) => sum + video.numOfLikes,
    0
  );
  const totalComments = sampleData.reduce(
    (sum, video) => sum + video.numOfComments,
    0
  );

  // Prepare data for pie chart (top 5 videos + others)
  const pieData = useMemo(() => {
    if (!sampleData || sampleData.length === 0) return [];

    return sampleData.map((video, index) => ({
      name:
        video.title.length > 25
          ? video.title.substring(0, 25) + "..."
          : video.title, // Rút ngắn tên để tránh tràn
      fullName: video.title, // Giữ tên đầy đủ cho tooltip
      value: video.numOfViews,
      color: [
        "#8B5FBF",
        "#6B8DD6",
        "#8FBC8F",
        "#DDA0DD",
        "#87CEEB",
        "#FFB6C1",
        "#FFA07A",
        "#98FB98",
        "#F0E68C",
        "#DEB887",
      ][index % 10],
    }));
  }, [sampleData]);
  const processedPieData = useMemo(() => {
    if (!pieData || pieData.length === 0) return [];
    if (pieData.length <= 5) return pieData;

    // Sắp xếp theo value giảm dần
    const sortedData = [...pieData].sort((a, b) => b.value - a.value);

    // Lấy top 5
    const top5 = sortedData.slice(0, 5);

    // Tính tổng của phần còn lại
    const othersTotal = sortedData
      .slice(5)
      .reduce((sum, item) => sum + item.value, 0);

    // Thêm mục "Khác" nếu có
    if (othersTotal > 0) {
      top5.push({
        name: "Khác",
        value: othersTotal,
        color: "#C0C0C0", // Màu xám cho mục "Khác"
      });
    }

    return top5;
  }, [pieData]);
  // Prepare data for bar chart - Video performance over time
  const barData = sampleData
    .sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
    .map((video) => ({
      name:
        video.title.length > 15
          ? video.title.substring(0, 15) + "..."
          : video.title,
      views: video.numOfViews,
      likes: video.numOfLikes,
      comments: video.numOfComments,
      date: new Date(video.publishedAt).getFullYear(),
    }));

  const COLORS = ["#8B5FBF", "#6B8DD6", "#8FBC8F", "#DDA0DD", "#87CEEB"];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const getSortedVideos = () => {
    const sorted = [...sampleData];
    switch (videoFilter) {
      case "popular":
        return sorted.sort((a, b) => b.numOfViews - a.numOfViews);
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
        );
      default: // latest
        return sorted.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Card
          sx={{
            p: 4,
            maxWidth: 400,
            textAlign: "center",
            borderRadius: 4,
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Analytics sx={{ fontSize: 48, color: "#8B5FBF", mb: 2 }} />
            <Typography
              variant="h4"
              gutterBottom
              sx={{ color: "#2c3e50", fontWeight: 600 }}
            >
              Đăng nhập để xem thống kê
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Kết nối với tài khoản{" "}
              {selectedPlatform === "youtube" ? "YouTube" : "TikTok"} của bạn
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Login />}
              onClick={() => setIsLoggedIn(true)}
              sx={{
                backgroundColor:
                  selectedPlatform === "youtube" ? "#8B5FBF" : "#6B8DD6",
                borderRadius: 3,
                py: 1.5,
                px: 4,
                "&:hover": {
                  backgroundColor:
                    selectedPlatform === "youtube" ? "#7A4FA8" : "#5A7BC4",
                },
              }}
            >
              Đăng nhập
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8fafc", p: 4 }}>
      {/* Enhanced Header */}
      <Navigation />
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mt: 8,
          mb: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #8B9AFF 0%, #A8B5FF 100%)",
          color: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header Section */}
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 2 }}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: 3,
                backdropFilter: "blur(10px)",
              }}
            >
              <Analytics sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #fff, #e3f2fd)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Thống kê theo nền tảng
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Controls Section */}
        <Box>
          <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
            Chọn nền tảng
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <FormControl sx={{ minWidth: 160 }}>
              <Select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                sx={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.3)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.5)",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
              >
                <MenuItem value="youtube">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <YouTube sx={{ color: "#FF0000" }} />
                    <Typography>YouTube</Typography>
                  </Stack>
                </MenuItem>
                <MenuItem value="tiktok">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TikTokIcon />
                    <Typography>TikTok</Typography>
                  </Stack>
                </MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={<Update />}
              sx={{
                borderColor: "rgba(255,255,255,0.3)",
                color: "white",
                borderRadius: 2,
                "&:hover": {
                  borderColor: "rgba(255,255,255,0.5)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
              onClick={() => window.location.reload()}
            >
              Làm mới
            </Button>
          </Stack>
        </Box>
      </Paper>
      <Box>
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#222222",
            mb: 3,
          }}
        >
          Số liệu tổng thể
        </Typography>
      </Box>
      {/* Stats Cards with softer colors */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3} sx={{ width: "24%" }}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)",
              borderRadius: 2,
              border: "1px solid rgba(156, 39, 176, 0.1)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 0 }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#6c757d", fontWeight: 500 }}
                >
                  Tổng Video
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    backgroundColor: "#8B5FBF",
                    borderRadius: 2,
                    color: "white",
                  }}
                >
                  <VideoLibrary sx={{ fontSize: 24 }} />
                </Box>
              </Stack>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#2c3e50" }}
              >
                {sampleData.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ width: "24%" }}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
              borderRadius: 2,
              border: "1px solid rgba(33, 150, 243, 0.1)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#6c757d", fontWeight: 500 }}
                >
                  Tổng Lượt Xem
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    backgroundColor: "#6B8DD6",
                    borderRadius: 2,
                    color: "white",
                  }}
                >
                  <Visibility sx={{ fontSize: 24 }} />
                </Box>
              </Stack>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#2c3e50" }}
              >
                {formatNumber(totalViews)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} width={"24%"}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
              borderRadius: 2,
              border: "1px solid rgba(156, 39, 176, 0.1)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#6c757d", fontWeight: 500 }}
                >
                  Tổng Lượt Thích
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    backgroundColor: "#DDA0DD",
                    borderRadius: 2,
                    color: "white",
                  }}
                >
                  <ThumbUp sx={{ fontSize: 24 }} />
                </Box>
              </Stack>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#2c3e50", mb: 0.5 }}
              >
                {formatNumber(totalLikes)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3} width={"24%"}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
              borderRadius: 2,
              border: "1px solid rgba(76, 175, 80, 0.1)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#6c757d", fontWeight: 500 }}
                >
                  Tổng Bình Luận
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    backgroundColor: "#8FBC8F",
                    borderRadius: 2,
                    color: "white",
                  }}
                >
                  <Comment sx={{ fontSize: 24 }} />
                </Box>
              </Stack>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, color: "#2c3e50", mb: 0.5 }}
              >
                {formatNumber(totalComments)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box>
        <Typography
          sx={{
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#222222",
            mb: 3,
          }}
        >
          Thông số chi tiết
        </Typography>
      </Box>
      {/* Main Content */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
          mb: 4,
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "#fafbfc",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                minHeight: 72,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                color: "#6c757d",
                "&.Mui-selected": {
                  color: "#8B5FBF",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#8B5FBF",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab
              icon={<BarChart />}
              label="Biểu đồ"
              iconPosition="start"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<TableChart />}
              label="Thống kê"
              iconPosition="start"
              sx={{ gap: 1 }}
            />
            <Tab
              icon={<VideoLibrary />}
              label="Videos"
              iconPosition="start"
              sx={{ gap: 1 }}
            />
          </Tabs>
        </Box>

        {/* Charts Tab */}
        {activeTab === 0 && (
          <Box sx={{ p: 4, backgroundColor: "#ffffff" }}>
            <Grid container spacing={5}>
              <Grid item xs={12} lg={6} width={"48.5%"}>
                <Card
                  sx={{
                    borderRadius: 1,
                    height: 500,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.05)",
                    overflow: "hidden", // Ngăn tràn nội dung
                  }}
                >
                  <CardContent sx={{ height: "100%", p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: "#2c3e50",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      📊 Phân phối lượt xem theo video
                    </Typography>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={processedPieData}
                          cx="37%"
                          cy="50%"
                          outerRadius={120}
                          dataKey="value"
                          label={({ percent }) =>
                            `${(percent * 100).toFixed(1)}%`
                          }
                          labelLine={false}
                        >
                          {processedPieData?.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.color || COLORS[index % COLORS.length]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value, name, props) => [
                            formatNumber(value),
                            "Lượt xem",
                          ]}
                          labelFormatter={(label) => `Video: ${label}`}
                          // Sử dụng tên đầy đủ trong tooltip nếu có
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <Paper
                                  elevation={3}
                                  sx={{
                                    p: 1.5,
                                    borderRadius: 1,
                                    border: "1px solid #ccc",
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontWeight: "bold",
                                      m: 0,
                                    }}
                                  >
                                    {data.fullName || data.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "#666",
                                      m: 0,
                                    }}
                                  >
                                    Lượt xem: {formatNumber(data.value)}
                                  </Typography>
                                </Paper>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend
                          verticalAlign="middle"
                          align="right"
                          layout="vertical"
                          iconType="circle"
                          wrapperStyle={{
                            paddingLeft: "20px",
                            fontSize: "20px",
                            lineHeight: "20px",
                            width: "250px",
                            overflow: "visible",
                          }}
                          formatter={(value) => (
                            <Box
                              component="span"
                              sx={{
                                display: "inline-block",
                                maxWidth: "220px",
                                fontSize: "11px",
                              }}
                              title={value}
                            >
                              {value}
                            </Box>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} lg={6} width={"48.5%"}>
                <Card
                  sx={{
                    borderRadius: 1,
                    height: 500,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <CardContent sx={{ height: "100%", p: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        mb: 3,
                        color: "#2c3e50",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      📈 Hiệu suất tương tác của người dùng
                    </Typography>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={12}
                        />
                        <YAxis tickFormatter={formatNumber} fontSize={12} />
                        <Tooltip
                          formatter={(value, name) => [
                            formatNumber(value),
                            name === "views"
                              ? "Lượt xem"
                              : name === "likes"
                              ? "Lượt thích"
                              : name === "comments"
                              ? "Bình luận"
                              : name,
                          ]}
                          labelFormatter={(label) => {
                            // Tìm video có tên rút gọn tương ứng để lấy tên đầy đủ
                            const video = sampleData.find((v) => {
                              const shortName =
                                v.title.length > 15
                                  ? v.title.substring(0, 15) + "..."
                                  : v.title;
                              return shortName === label;
                            });
                            return video ? video.title : label;
                          }}
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            maxWidth: "300px",
                            wordWrap: "break-word",
                          }}
                          labelStyle={{
                            fontWeight: "bold",
                            color: "#2c3e50",
                            marginBottom: "8px",
                            fontSize: "14px",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            lineHeight: "1.4",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="views"
                          stroke="#8B5FBF"
                          strokeWidth={3}
                          dot={{ fill: "#8B5FBF", strokeWidth: 2, r: 6 }}
                          name="Lượt xem"
                        />
                        <Line
                          type="monotone"
                          dataKey="likes"
                          stroke="#6B8DD6"
                          strokeWidth={3}
                          dot={{ fill: "#6B8DD6", strokeWidth: 2, r: 6 }}
                          name="Lượt thích"
                        />
                        <Line
                          type="monotone"
                          dataKey="comments"
                          stroke="#8FBC8F"
                          strokeWidth={3}
                          dot={{ fill: "#8FBC8F", strokeWidth: 2, r: 6 }}
                          name="Bình luận"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Table Tab */}
        {activeTab === 1 && (
          <Box sx={{ p: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              📋 Bảng dữ liệu chi tiết
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ borderRadius: 2, boxShadow: 3 }}
            >
              <Table>
                <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Video
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Ngày đăng
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Lượt xem
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Lượt thích
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Bình luận
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Hành động
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sampleData.map((video, index) => (
                    <TableRow
                      key={index}
                      hover
                      sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}
                    >
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Avatar
                            src={video.thumbnail}
                            variant="rounded"
                            sx={{ width: 60, height: 45 }}
                          />
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {video.title}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{formatDate(video.publishedAt)}</TableCell>
                      <TableCell>
                        <Chip
                          label={formatNumber(video.numOfViews)}
                          color="primary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={formatNumber(video.numOfLikes)}
                          color="primary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={formatNumber(video.numOfComments)}
                          color="primary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<PlayArrow />}
                          onClick={() => window.open(video.url, "_blank")}
                          sx={{ borderRadius: 1 }}
                        >
                          Xem
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Videos Tab */}
        {activeTab === 2 && (
          <Box sx={{ p: 4 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                🎬 Thẻ Videos
              </Typography>
              <ButtonGroup variant="outlined" sx={{ borderRadius: 2 }}>
                <Button
                  variant={videoFilter === "latest" ? "contained" : "outlined"}
                  onClick={() => setVideoFilter("latest")}
                >
                  Mới nhất
                </Button>
                <Button
                  variant={videoFilter === "popular" ? "contained" : "outlined"}
                  onClick={() => setVideoFilter("popular")}
                >
                  Phổ biến
                </Button>
                <Button
                  variant={videoFilter === "oldest" ? "contained" : "outlined"}
                  onClick={() => setVideoFilter("oldest")}
                >
                  Cũ nhất
                </Button>
              </ButtonGroup>
            </Box>

            <Grid container spacing={2}>
              {getSortedVideos().map((video, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  width={"24%"}
                >
                  <Card
                    sx={{
                      borderRadius: "8px",
                      border: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <Avatar
                        src={video.thumbnail}
                        variant="rounded"
                        sx={{
                          width: "100%",
                          height: 180,
                          borderRadius: "8px 8px 0 0",
                        }}
                      />
                      <Chip
                        label="2:47"
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: 8,
                          right: 8,
                          backgroundColor: "rgba(0,0,0,0.8)",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 1.5 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          mb: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.4,
                        }}
                      >
                        {video.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        {formatNumber(video.numOfViews)} lượt xem •{" "}
                        {formatDate(video.publishedAt)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Statistics;

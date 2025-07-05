import React, { useEffect, useState } from "react";
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
  ButtonGroup,
  Divider,
  Stack,
} from "@mui/material";
import {
  YouTube,
  Login,
  PlayArrow,
  Visibility,
  ThumbUp,
  Comment,
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
} from "recharts";
import { useMemo } from "react";
import Navigation from "../components/Navigation";
import { getAllVideosUploadToYoutube } from "../services/youtube";
import { checkLoginSocialAccount } from "../services/status";
import { getAllVideosUploadToTiktokStore } from "../services/tiktok";
import { useSelector } from "react-redux";
// TikTok icon component
const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.39z" />
  </svg>
);

const Statistics = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("youtube");

  const [activeTab, setActiveTab] = useState(0);
  const [videoFilter, setVideoFilter] = useState("latest");
  const [videosYoutube, setVideosYoutube] = useState([]);
  const [videosTiktok, setVideosTiktok] = useState([]);
  const [currentVideos, setCurrentVideos] = useState([]);
  const [statusAccountSocial, setStatusAccountSocial] = useState({
    youtube_status: false,
    tiktok_status: false,
  });
  const user = useSelector((state) => state.auth.login.currentUser);
  useEffect(() => {
    const fetchData = async () => {
      const response = await checkLoginSocialAccount();
      setStatusAccountSocial(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllVideosUploadToYoutube();
      setVideosYoutube(response);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllVideosUploadToTiktokStore();
      const data = response.map((video, index) => {
        return {
          ...video,
          number_of_views: video.numOfViews,
          number_of_likes: video.numOfLikes,
          number_of_comments: video.numOfComments,
          published_at: video.publishedAt,
          thumb_nail: video.thumbnail,
        };
      });
      setVideosTiktok(data);
    };
    fetchData();
  }, []);
  const isCurrentPlatformLoggedIn = () => {
    if (selectedPlatform === "youtube") {
      return statusAccountSocial.youtube_status;
    } else {
      return statusAccountSocial.tiktok_status;
    }
  };
  useEffect(() => {
    if (selectedPlatform === "youtube") {
      setCurrentVideos(videosYoutube);
    } else {
      setCurrentVideos(videosTiktok);
    }
  }, [selectedPlatform, videosYoutube, videosTiktok]);
  const totalViews = currentVideos.reduce(
    (sum, video) => sum + video.number_of_views,
    0
  );
  const totalLikes = currentVideos.reduce(
    (sum, video) => sum + video.number_of_likes,
    0
  );
  const totalComments = currentVideos.reduce(
    (sum, video) => sum + video.number_of_comments,
    0
  );

  // Prepare data for pie chart (top 5 videos + others)
  const pieData = useMemo(() => {
    if (!currentVideos || currentVideos.length === 0) return [];

    return currentVideos.map((video, index) => ({
      name:
        video.title.length > 25
          ? video.title.substring(0, 25) + "..."
          : video.title, // Rút ngắn tên để tránh tràn
      fullName: video.title, // Giữ tên đầy đủ cho tooltip
      value: video.number_of_views,
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
  }, [currentVideos]);
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
  const barData = currentVideos
    .sort((a, b) => new Date(a.published_at) - new Date(b.published_at))
    .map((video) => ({
      name:
        video.title.length > 15
          ? video.title.substring(0, 15) + "..."
          : video.title,
      views: video.number_of_views,
      likes: video.number_of_likes,
      comments: video.number_of_comments,
      date: new Date(video.published_at).getFullYear(),
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
    const sorted = [...currentVideos];
    switch (videoFilter) {
      case "popular":
        return sorted.sort((a, b) => b.number_of_views - a.number_of_views);
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.published_at) - new Date(b.published_at)
        );
      default: // latest
        return sorted.sort(
          (a, b) => new Date(b.published_at) - new Date(a.published_at)
        );
    }
  };

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

      {!isCurrentPlatformLoggedIn() && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 4,
            backgroundColor: "#fff3cd",
            border: "1px solid #ffeaa7",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={3}>
            <Box
              sx={{
                p: 2,
                backgroundColor: "#ffeaa7",
                borderRadius: 3,
                color: "#856404",
              }}
            >
              <Login sx={{ fontSize: 32 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{ color: "#856404", fontWeight: 600, mb: 1 }}
              >
                Chưa kết nối tài khoản{" "}
                {selectedPlatform === "youtube" ? "YouTube" : "TikTok"}
              </Typography>
              <Typography variant="body1" sx={{ color: "#856404", mb: 2 }}>
                Bạn cần đăng nhập để xem thống kê chi tiết cho nền tảng này
              </Typography>
              <Button
                variant="contained"
                startIcon={<Login />}
                onClick={() => {
                  if (selectedPlatform === "youtube") {
                    window.location.href = `http://localhost:8080/connect/youtube?user-id=${user.id}`;
                  } else {
                    window.location.href = `http://localhost:8080/connect/tiktok?user-id=${user.id}`;
                  }
                }}
                sx={{
                  backgroundColor:
                    selectedPlatform === "youtube" ? "#8B5FBF" : "#6B8DD6",
                  borderRadius: 2,
                  py: 1,
                  px: 3,
                  "&:hover": {
                    backgroundColor:
                      selectedPlatform === "youtube" ? "#7A4FA8" : "#5A7BC4",
                  },
                }}
              >
                Đăng nhập{" "}
                {selectedPlatform === "youtube" ? "YouTube" : "TikTok"}
              </Button>
            </Box>
          </Stack>
        </Paper>
      )}

      {isCurrentPlatformLoggedIn() && (
        <>
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
                  background:
                    "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)",
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
                    {currentVideos.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3} sx={{ width: "24%" }}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
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
                  background:
                    "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
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
                  background:
                    "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
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
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
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
                                const video = currentVideos.find((v) => {
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
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "1rem" }}
                        >
                          Video
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "1rem" }}
                        >
                          Ngày đăng
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "1rem" }}
                        >
                          Lượt xem
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "1rem" }}
                        >
                          Lượt thích
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "1rem" }}
                        >
                          Bình luận
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", fontSize: "1rem" }}
                        >
                          Hành động
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentVideos.map((video, index) => (
                        <TableRow
                          key={index}
                          hover
                          sx={{ "&:hover": { backgroundColor: "#f8f9fa" } }}
                        >
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <Avatar
                                src={video.thumb_nail}
                                variant="rounded"
                                sx={{
                                  width: 80,
                                  height: 50,
                                  objectFit: "contain",
                                  objectPosition: "center",
                                }}
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
                          <TableCell>
                            {formatDate(video.published_at)}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={formatNumber(video.number_of_views)}
                              color="primary"
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={formatNumber(video.number_of_likes)}
                              color="primary"
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={formatNumber(video.number_of_comments)}
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
                      variant={
                        videoFilter === "latest" ? "contained" : "outlined"
                      }
                      onClick={() => setVideoFilter("latest")}
                    >
                      Mới nhất
                    </Button>
                    <Button
                      variant={
                        videoFilter === "popular" ? "contained" : "outlined"
                      }
                      onClick={() => setVideoFilter("popular")}
                    >
                      Phổ biến
                    </Button>
                    <Button
                      variant={
                        videoFilter === "oldest" ? "contained" : "outlined"
                      }
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
                            src={video.thumb_nail}
                            variant="rounded"
                            sx={{
                              width: "100%",
                              height: 180,
                              borderRadius: "8px 8px 0 0",
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
                            {formatNumber(video.number_of_views)} lượt xem •{" "}
                            {formatDate(video.published_at)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Statistics;

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  Fade,
  Grow,
  useTheme,
  alpha,
} from "@mui/material";
import {
  VideoCall,
  TrendingUp,
  AutoAwesome,
  VolumeUp,
  ArrowForward,
} from "@mui/icons-material";

const Feature = () => {
  const theme = useTheme();
  const [animateStats, setAnimateStats] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <TrendingUp />,
      title: "Gợi ý chủ đề theo xu hướng",
      description:
        "AI phân tích xu hướng thời gian thực để đề xuất nội dung hot nhất",
      color: "#FF6B6B",
    },
    {
      icon: <AutoAwesome />,
      title: "Sinh kịch bản tự động",
      description:
        "Tạo nội dung hấp dẫn với cấu trúc chuyên nghiệp chỉ trong giây lát",
      color: "#4ECDC4",
    },
    {
      icon: <VolumeUp />,
      title: "Text-to-Speech AI",
      description:
        "Giọng đọc tự nhiên với nhiều phong cách và ngôn ngữ khác nhau",
      color: "#45B7D1",
    },
    {
      icon: <VideoCall />,
      title: "Tạo video tự động",
      description:
        "Ghép nối hình ảnh, âm thanh và phụ đề thành video hoàn thiện đẹp",
      color: "#96CEB4",
    },
  ];

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, 
        ${alpha("#667eea", 0.1)}, 
        ${alpha("#764ba2", 0.1)}, 
        ${alpha("#f093fb", 0.1)}, 
        ${alpha("#f5576c", 0.1)}
      )`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, py: 8 }}
        >
          {/* Features Section */}
          <Box mb={8}>
            <Typography
              variant="h2"
              textAlign="center"
              mb={6}
              fontWeight="bold"
            >
              Tính năng nổi bật
            </Typography>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Grow in timeout={1000 + index * 200}>
                    <Card
                      elevation={8}
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        transition: "all 0.3s ease",
                        background:
                          currentFeature === index
                            ? `linear-gradient(135deg, ${feature.color}, white)`
                            : "white",
                        transform:
                          currentFeature === index ? "scale(1.05)" : "scale(1)",
                        boxShadow:
                          currentFeature === index
                            ? `0 12px 40px ${alpha(feature.color, 0.3)}`
                            : theme.shadows[8],
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: `0 16px 48px ${alpha(feature.color, 0.2)}`,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Avatar
                          sx={{
                            bgcolor: feature.color,
                            width: 64,
                            height: 64,
                            mb: 3,
                            boxShadow: 4,
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" mb={2}>
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          lineHeight={1.7}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grow>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Feature;

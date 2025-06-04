import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  Container,
  Grid,
  Paper,
  Modal,
  Chip,
  Avatar,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";

import {
  PlayArrow,
  Delete,
  Edit,
  GetApp,
  Search,
  Add,
  Close,
  Visibility,
  Schedule,
  Person,
  ExpandMore,
  Description,
  Title,
  Movie,
  MoreVert,
  Share,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";

import Navigation from "../components/Navigation";

const mockVideos = [
  {
    id: 1,
    title: "5 AI Tools Every Developer Needs in 2025",
    thumbnail:
      "https://admin.esports.gg/wp-content/uploads/2024/09/T1-Worlds-2024-1024x1024.jpeg",
    duration: "0:45",
    createdAt: "2 days ago",
    views: 1234,
    author: "Tech Guru",
    tags: ["AI", "Development", "Tools"],
    liked: false,
    videoLink:
      "https://res.cloudinary.com/dpystprxq/video/upload/v1748392708/Download_3_owmdrx.mp4",
    script: `In this video, we'll explore the top 5 AI tools that every developer should know about in 2025.

First up is GitHub Copilot - an AI pair programmer that helps you write code faster and with fewer bugs. It can suggest entire lines or blocks of code as you type.

Second, we have ChatGPT for code reviews and debugging. It's incredibly helpful for understanding complex code and finding solutions to tricky problems.

Third is Tabnine, another excellent AI coding assistant that provides intelligent code completions across multiple programming languages.

Fourth, we'll look at DeepCode (now part of Snyk), which uses AI to analyze your code for potential bugs and security vulnerabilities.

Finally, there's Replit's AI features that can help you build entire applications with natural language prompts.

These tools are revolutionizing how we write code and making developers more productive than ever before.`,
    description:
      "Discover the essential AI tools that are transforming software development in 2025. From code generation to bug detection, these tools will supercharge your productivity.",
  },
  {
    id: 2,
    title: "Python Programming Basics Tutorial",
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=225&fit=crop",
    duration: "0:52",
    createdAt: "5 days ago",
    views: 856,
    author: "Code Academy",
    tags: ["Python", "Programming", "Tutorial"],
    liked: true,
    videoLink:
      "https://res.cloudinary.com/dpystprxq/video/upload/v1748392823/Download_4_hbdhoh.mp4",
    script: `Welcome to Python Programming Basics! In this comprehensive tutorial, we'll cover the fundamentals of Python programming.

We'll start with variables and data types - integers, strings, lists, and dictionaries. Understanding these basics is crucial for any Python developer.
Next, we'll explore control structures like if statements, for loops, and while loops. These are the building blocks of any program logic.
We'll then move on to functions - how to define them, pass parameters, and return values. Functions help you write reusable and organized code.
Finally, we'll touch on object-oriented programming concepts including classes and objects, which are essential for larger Python applications.
By the end of this tutorial, you'll have a solid foundation in Python programming and be ready to tackle more advanced topics.`,
    description:
      "A comprehensive introduction to Python programming covering variables, control structures, functions, and basic OOP concepts.",
  },
  {
    id: 3,
    title: "Top Technology Trends of 2025",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=225&fit=crop",
    duration: "0:58",
    createdAt: "1 week ago",
    views: 2156,
    author: "Future Tech",
    tags: ["Technology", "Trends", "Future"],
    liked: false,
    videoLink:
      "https://res.cloudinary.com/dpystprxq/video/upload/v1748392623/Download_2_bze5ey.mp4",
    script: `Let's dive into the most significant technology trends shaping 2025 and beyond.
Artificial Intelligence continues to dominate, with Large Language Models becoming more sophisticated and accessible to everyday users and businesses.
Quantum Computing is moving from research labs to practical applications, promising to solve complex problems in cryptography, drug discovery, and optimization.
Extended Reality (XR) combining AR, VR, and MR is creating immersive experiences in education, training, and entertainment.
Edge Computing is bringing processing power closer to data sources, reducing latency and improving real-time applications.
Sustainable Technology is becoming a priority, with green computing and renewable energy solutions leading the charge.
These trends are not just changing technology - they're transforming how we work, learn, and interact with the world around us.`,
    description:
      "Explore the cutting-edge technology trends that are defining 2025, from AI advancements to sustainable computing solutions.",
  },
];

export default function ModernVideoDashboard() {
  const [videos, setVideos] = useState(mockVideos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  // Filter videos based on search
  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Handle delete dialog
  const handleOpenDeleteDialog = (video) => {
    setSelectedVideo(video);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Handle video deletion
  const handleDeleteVideo = () => {
    setVideos(videos.filter((video) => video.id !== selectedVideo.id));
    setOpenDeleteDialog(false);
  };

  // Handle video play
  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    setOpenVideoDialog(true);
  };

  const handleCloseVideoDialog = () => {
    setOpenVideoDialog(false);
    setSelectedTab(0);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ py: 4, mt: "80px" }}>
        {/* Modern Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: 4,
            p: 4,
            mb: 4,
            color: "white",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.3,
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 1,
                background: "linear-gradient(45deg, #fff, #f0f0f0)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Video Library
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
              Manage and organize your video content with style
            </Typography>
          </Box>
        </Box>

        {/* Search and Actions Bar */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(145deg, #f8f9fa, #e9ecef)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", md: "center" },
              gap: 3,
            }}
          >
            <TextField
              placeholder="Search videos, tags, or authors..."
              size="medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                flex: 1,
                maxWidth: { md: 400 },

                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "none",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  },
                  "&.Mui-focused": {
                    boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "#667eea" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                borderRadius: 3,
                textTransform: "none",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 4px 16px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  background: "linear-gradient(45deg, #5a6fd8, #6a42a0)",
                  boxShadow: "0 6px 20px rgba(102, 126, 234, 0.6)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Create New Video
            </Button>
          </Box>
        </Paper>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              background: "linear-gradient(145deg, #f8f9fa, #e9ecef)",
              borderRadius: 4,
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <Movie sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No videos found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm
                ? `No videos match "${searchTerm}"`
                : "Start by creating your first video"}
            </Typography>
          </Paper>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(3, 1fr)",
              },
              gap: 3,
              width: "100%",
            }}
          >
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
                  },
                }}
              >
                {/* Enhanced Thumbnail */}
                <Box
                  sx={{
                    position: "relative",
                    height: 240,
                    overflow: "hidden",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: "100%",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${video.thumbnail})`,
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />

                  {/* Gradient Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "50%",
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.7))",
                    }}
                  />

                  {/* Duration Badge */}
                  <Chip
                    label={video.duration}
                    size="small"
                    sx={{
                      position: "absolute",
                      bottom: 12,
                      right: 12,
                      bgcolor: "rgba(0,0,0,0.8)",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: 2,
                    }}
                  />

                  {/* Play Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(0,0,0,0.3)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      "&:hover": {
                        opacity: 1,
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => handlePlayVideo(video)}
                  >
                    <IconButton
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.95)",
                        width: 64,
                        height: 64,
                        "&:hover": {
                          backgroundColor: "white",
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      <PlayArrow sx={{ color: "#667eea", fontSize: 32 }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Enhanced Content */}
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      lineHeight: 1.4,
                      minHeight: 56,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      color: "#2d3748",
                      textOverflow: "ellipsis",
                      wordBreak: "break-word",
                    }}
                    title={video.title}
                  >
                    {video.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: "auto" }}
                  >
                    Created {video.createdAt}
                  </Typography>
                </CardContent>

                {/* Enhanced Action Bar */}
                <Box
                  sx={{
                    display: "flex",
                    p: 2,
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    backgroundColor: "rgba(248, 249, 250, 0.8)",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    startIcon={<PlayArrow />}
                    variant="outlined"
                    sx={{
                      borderColor: "#667eea",
                      color: "#667eea",
                      textTransform: "none",
                      borderRadius: 2,
                      fontWeight: 600,
                      "&:hover": {
                        bgcolor: "rgba(102, 126, 234, 0.1)",
                        borderColor: "#5a6fd8",
                      },
                    }}
                    onClick={() => handlePlayVideo(video)}
                  >
                    Watch
                  </Button>

                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    <IconButton
                      size="small"
                      sx={{
                        color: "text.secondary",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                      }}
                    >
                      <Share fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      sx={{
                        color: "text.secondary",
                        "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
                      }}
                    >
                      <GetApp fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => handleOpenDeleteDialog(video)}
                      sx={{
                        color: "error.main",
                        "&:hover": { bgcolor: "rgba(244, 67, 54, 0.08)" },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        )}

        {/* Enhanced Delete Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          PaperProps={{
            sx: {
              borderRadius: 4,
              p: 1,
              minWidth: 400,
            },
          }}
        >
          <DialogTitle
            sx={{ fontSize: "1.5rem", fontWeight: 600, color: "#2d3748" }}
          >
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Are you sure you want to delete this video?
            </Typography>
            <Paper
              sx={{ p: 2, bgcolor: "rgba(244, 67, 54, 0.05)", borderRadius: 2 }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#2d3748" }}
              >
                "{selectedVideo?.title}"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This action cannot be undone.
              </Typography>
            </Paper>
          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3, gap: 1 }}>
            <Button
              onClick={handleCloseDeleteDialog}
              variant="outlined"
              sx={{ borderRadius: 3, px: 3 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteVideo}
              color="error"
              variant="contained"
              sx={{ borderRadius: 3, px: 3 }}
            >
              Delete Video
            </Button>
          </DialogActions>
        </Dialog>

        {/* Enhanced Video Player Modal */}
        <Modal
          open={openVideoDialog}
          onClose={handleCloseVideoDialog}
          aria-labelledby="video-player-modal"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "95%",
              maxWidth: "1200px",
              maxHeight: "90vh",
              bgcolor: "background.paper",
              boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
              borderRadius: 4,
              overflow: "hidden",
              outline: "none",
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            {/* Close Button */}
            <IconButton
              aria-label="close"
              onClick={handleCloseVideoDialog}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                color: "white",
                zIndex: 10,
                backgroundColor: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
              }}
            >
              <Close />
            </IconButton>

            {/* Video Section */}
            <Box
              sx={{
                flex: { xs: "none", lg: "1 1 60%" },
                minHeight: { xs: "50vh", lg: "auto" },
              }}
            >
              {selectedVideo && (
                <video
                  controls
                  autoPlay
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "300px",
                    display: "block",
                    backgroundColor: "#000",
                  }}
                >
                  <source src={selectedVideo.videoLink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </Box>

            {/* Enhanced Video Info Section */}
            <Box
              sx={{
                flex: { xs: "none", lg: "1 1 40%" },
                display: "flex",
                flexDirection: "column",
                maxHeight: { xs: "50vh", lg: "90vh" },
                overflow: "hidden",
              }}
            >
              {/* Tabs */}
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontWeight: 600,
                  },
                }}
              >
                <Tab icon={<Title />} label="Details" />
                <Tab icon={<Description />} label="Script" />
              </Tabs>

              {/* Tab Content */}
              <Box sx={{ flex: 1, overflow: "auto" }}>
                {selectedTab === 0 && selectedVideo && (
                  <Box sx={{ p: 3 }}>
                    {/* Video Title and Author */}
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: 700, mb: 2, color: "#2d3748" }}
                    >
                      {selectedVideo.title}
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    {/* Description */}
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Description
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {selectedVideo.description}
                    </Typography>
                  </Box>
                )}

                {selectedTab === 1 && selectedVideo && (
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                      Video Script
                    </Typography>
                    <Paper
                      sx={{
                        p: 3,
                        bgcolor: "rgba(248, 249, 250, 0.8)",
                        borderRadius: 3,
                        border: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.8,
                          whiteSpace: "pre-line",
                          color: "#2d3748",
                        }}
                      >
                        {selectedVideo.script}
                      </Typography>
                    </Paper>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
}

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Avatar,
  Tooltip,
  Card,
  CardContent,
  Divider,
  Button,
  Link,
  Container,
  Stack,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  VideoLibrary as VideoIcon,
  Image as ImageIcon,
  Launch as LaunchIcon,
  Folder as FolderIcon,
  CloudDownload as CloudIcon,
} from "@mui/icons-material";

const WorkspaceResourceManager = () => {
  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };

  const getResourceIcon = (type) => {
    switch (type.toLowerCase()) {
      case "video":
        return { icon: VideoIcon, color: "#1e40af", bgColor: "#dbeafe" };
      case "hình ảnh":
      case "image":
        return { icon: ImageIcon, color: "#9333ea", bgColor: "#e9d5ff" };
      default:
        return { icon: FolderIcon, color: "#047857", bgColor: "#d1fae5" };
    }
  };

  const workspaces = [
    {
      id: "demo",
      name: "Demo",
      description: "Không có mô tả",
      createdDate: "13:13 5 thg 5, 2025",
      resources: [
        {
          type: "Video",
          createdDate: "07:15 10 thg 5, 2025",
          url: "https://videos.pexels.com/video-files/19843107/19843107-uhd_2560_1440_30fps.mp4",
        },
      ],
    },
    {
      id: "video-demo",
      name: "Video mẫu",
      description: "Không có mô tả",
      createdDate: "18:43 6 thg 5, 2025",
      resources: [
        {
          type: "Hình Ảnh",
          createdDate: "07:15 10 thg 5, 2025",
          url: null,
        },
        {
          type: "Video",
          createdDate: "07:15 10 thg 5, 2025",
          url: "https://videos.pexels.com/video-files/19843107/19843107-uhd_2560_1440_30fps.mp4",
        },
        {
          type: "Hình Ảnh",
          createdDate: "07:15 10 thg 5, 2025",
          url: null,
        },
        {
          type: "Video",
          createdDate: "07:15 10 thg 5, 2025",
          url: "https://videos.pexels.com/video-files/31988293/31988293-1920_1080_24fps.mp4",
        },
        {
          type: "Video",
          createdDate: "07:15 10 thg 5, 2025",
          url: "https://videos.pexels.com/video-files/5428316/5428316-hd_1920_1080_25fps.mp4",
        },
        {
          type: "Hình Ảnh",
          createdDate: "07:15 10 thg 5, 2025",
          url: null,
        },
      ],
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", py: 4, bgcolor: "#f9fafb" }}>
      <Container maxWidth="lg">
        <Card
          elevation={6}
          sx={{
            mb: 4,
            borderRadius: 2,
            bgcolor: "#ffffff",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ py: 6, px: 5 }}>
            <Stack direction="row" alignItems="center" spacing={4} mb={4}>
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "#3b82f6",
                  color: "#ffffff",
                  fontSize: 28,
                }}
              >
                <FolderIcon />
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="700" color="#1e293b">
                  Quản lý tài nguyên Workspace
                </Typography>
                <Typography variant="subtitle1" color="#64748b">
                  Xem tài nguyên của tất cả các workspace
                </Typography>
              </Box>
            </Stack>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "#e0f2fe",
                px: 3,
                py: 2,
                borderRadius: 1,
                display: "inline-block",
              }}
            >
              <Typography variant="body2" fontWeight="600" color="#1e40af">
                Tổng số workspace: {workspaces.length}
              </Typography>
            </Paper>
          </CardContent>
        </Card>

        <Card elevation={4} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <Box
            sx={{ p: 4, bgcolor: "#f9fafb", borderBottom: "1px solid #e2e8f0" }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              color="#1e293b"
              gutterBottom
            >
              Danh sách Workspace và Tài nguyên
            </Typography>
            <Typography variant="body2" color="#64748b">
              Bấm vào nút mở rộng để xem tài nguyên của từng workspace.
            </Typography>
          </Box>

          <Box sx={{ p: 4 }}>
            {workspaces.map((workspace) => (
              <Accordion
                key={workspace.id}
                expanded={expanded === workspace.id}
                onChange={handleChange(workspace.id)}
                sx={{
                  mb: 3,
                  border: "1px solid #e2e8f0",
                  borderRadius: 1,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  "&:before": { display: "none" },
                  "&.Mui-expanded": { boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#3b82f6" }} />}
                  sx={{
                    bgcolor: "#ffffff",
                    minHeight: 72,
                    "& .MuiAccordionSummary-content": { my: 2 },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={3}
                    sx={{ width: "100%" }}
                  >
                    <Avatar sx={{ bgcolor: "#3b82f6", color: "#ffffff" }}>
                      {workspace.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" fontWeight="600" color="#1e293b">
                        {workspace.name}
                      </Typography>
                      <Typography variant="body2" color="#64748b">
                        {workspace.description}
                      </Typography>
                    </Box>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Box>
                        <Typography variant="caption" color="#64748b">
                          Ngày tạo
                        </Typography>
                        <Typography variant="body2" color="#1e293b">
                          {workspace.createdDate}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${workspace.resources.length} tài nguyên`}
                        size="small"
                        sx={{ bgcolor: "#bbf7d0", color: "#065f46" }}
                      />
                    </Stack>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, bgcolor: "#ffffff" }}>
                  <Box sx={{ p: 4 }}>
                    <Divider sx={{ mb: 3, borderColor: "#e2e8f0" }} />
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      color="#1e293b"
                      gutterBottom
                    >
                      Tài nguyên của {workspace.name}
                    </Typography>
                    <TableContainer
                      component={Paper}
                      sx={{
                        mt: 2,
                        border: "1px solid #e2e8f0",
                        borderRadius: 1,
                      }}
                    >
                      <Table>
                        <TableHead>
                          <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                            <TableCell
                              sx={{ fontWeight: 600, color: "#64748b", py: 2 }}
                            >
                              Loại
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: 600, color: "#64748b", py: 2 }}
                            >
                              Ngày tạo
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: 600, color: "#64748b", py: 2 }}
                            >
                              URL
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {workspace.resources.map((resource, index) => {
                            const {
                              icon: IconComponent,
                              color,
                              bgColor,
                            } = getResourceIcon(resource.type);
                            return (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td": { borderBottom: 0 },
                                  "&:hover": { bgcolor: "#f1f5f9" },
                                }}
                              >
                                <TableCell sx={{ py: 2 }}>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <Avatar
                                      sx={{
                                        bgcolor: bgColor,
                                        width: 32,
                                        height: 32,
                                      }}
                                    >
                                      <IconComponent
                                        sx={{ color: color, fontSize: 18 }}
                                      />
                                    </Avatar>
                                    <Typography variant="body2" color="#1e293b">
                                      {resource.type}
                                    </Typography>
                                  </Stack>
                                </TableCell>
                                <TableCell sx={{ py: 2 }}>
                                  <Typography variant="body2" color="#64748b">
                                    {resource.createdDate}
                                  </Typography>
                                </TableCell>
                                <TableCell sx={{ py: 2 }}>
                                  {resource.url ? (
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      spacing={1}
                                    >
                                      <Link
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener"
                                        sx={{
                                          color: "#3b82f6",
                                          textDecoration: "none",
                                          "&:hover": {
                                            textDecoration: "underline",
                                          },
                                        }}
                                      >
                                        {resource.url.length > 40
                                          ? `${resource.url.substring(
                                              0,
                                              40
                                            )}...`
                                          : resource.url}
                                      </Link>
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          window.open(resource.url, "_blank")
                                        }
                                        sx={{ color: "#3b82f6" }}
                                      >
                                        <LaunchIcon fontSize="small" />
                                      </IconButton>
                                    </Stack>
                                  ) : (
                                    <Typography
                                      variant="body2"
                                      color="#9ca3af"
                                      italic
                                    >
                                      Chưa có URL
                                    </Typography>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Box
            sx={{
              p: 4,
              bgcolor: "#f1f5f9",
              textAlign: "center",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <Button
              variant="contained"
              startIcon={<CloudIcon />}
              sx={{
                bgcolor: "#3b82f6",
                color: "#ffffff",
                "&:hover": { bgcolor: "#2563eb" },
              }}
            >
              LÀM MỚI DỮ LIỆU
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default WorkspaceResourceManager;

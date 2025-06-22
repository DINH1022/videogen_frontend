import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Card,
  CardContent,
  Avatar,
  Divider,
  Collapse,
  Chip,
  Stack,
  Tooltip,
  Badge,
} from "@mui/material";
import {
  Folder,
  Image,
  VideoFile,
  ChevronRight,
  ExpandMore,
  Refresh,
  OpenInNew,
  Dashboard,
  InsertDriveFile,
  Language,
  Analytics,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
const WorkspaceManagement = () => {
  const navigate = useNavigate();
  const [workspaces] = useState([
    {
      id: "1",
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
      id: "2",
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
    {
      id: "3",
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
      id: "4",
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
  ]);

  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  const getResourceIcon = (type) => {
    return type === "Video" ? (
      <VideoFile sx={{ color: "#6366f1", fontSize: 20 }} />
    ) : (
      <Image sx={{ color: "#10b981", fontSize: 20 }} />
    );
  };

  const getResourceChip = (type) => {
    return type === "Video" ? (
      <Chip
        label="Video"
        size="small"
        sx={{
          bgcolor: "#f0f0ff",
          color: "#6366f1",
          fontWeight: 500,
          fontSize: "0.75rem",
        }}
      />
    ) : (
      <Chip
        label="Hình ảnh"
        size="small"
        sx={{
          bgcolor: "#f0fdf4",
          color: "#10b981",
          fontWeight: 500,
          fontSize: "0.75rem",
        }}
      />
    );
  };

  const handleWorkspaceClick = (workspace) => {
    setSelectedWorkspace(
      selectedWorkspace?.id === workspace.id ? null : workspace
    );
  };

  const getResourceStats = (resources) => {
    const videoCount = resources.filter((r) => r.type === "Video").length;
    const imageCount = resources.filter((r) => r.type === "Hình Ảnh").length;
    return { videoCount, imageCount };
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <Navigation />
      {/* Header Card */}
      <Card
        sx={{
          mt: 8,
          mb: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: "#6366f1",
                width: 48,
                height: 48,
                mr: 2,
                boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
              }}
            >
              <Dashboard />
            </Avatar>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#1f2937",
                  mb: 0.5,
                }}
              >
                Quản lý tài nguyên Workspace
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#6b7280",
                  fontSize: "0.9rem",
                }}
              >
                Xem và quản lý tài nguyên của tất cả các workspace
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(102, 126, 234, 0.1)",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                }}
              >
                <Analytics sx={{ color: "#667eea", mr: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {workspaces.length} Workspace
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              startIcon={<Refresh />}
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1.5,
                bgcolor: "#6366f1",
                boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                "&:hover": {
                  bgcolor: "#5856eb",
                  boxShadow: "0 6px 16px rgba(99,102,241,0.4)",
                },
              }}
            >
              Làm mới dữ liệu
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Main Content Card */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
            }}
          >
            Danh sách Workspace và Tài nguyên
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            p: 4,
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#f8fafc",
                  "& .MuiTableCell-root": {
                    borderBottom: "2px solid #e2e8f0",
                    py: 2,
                  },
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 700,
                    width: "28%",
                    color: "#374151",
                    fontSize: "1rem",
                  }}
                >
                  Tên Workspace
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    width: "25%",
                    color: "#374151",
                    fontSize: "1rem",
                  }}
                >
                  Mô tả
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    width: "25%",
                    color: "#374151",
                    fontSize: "1rem",
                  }}
                >
                  Ngày tạo
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 700,
                    width: "22%",
                    color: "#374151",
                    fontSize: "1rem",
                  }}
                >
                  Tài nguyên
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workspaces.map((workspace, index) => {
                const stats = getResourceStats(workspace.resources);
                return (
                  <React.Fragment key={workspace.id}>
                    <TableRow
                      hover
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#f8fafc",
                          transform: "translateY(-1px)",
                          transition: "all 0.2s ease",
                        },
                        "& .MuiTableCell-root": {
                          borderBottom: "1px solid #e5e7eb",
                          py: 2.5,
                        },
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => handleWorkspaceClick(workspace)}
                            sx={{
                              mr: 1.5,
                              bgcolor:
                                selectedWorkspace?.id === workspace.id
                                  ? "#f0f0ff"
                                  : "transparent",
                              "&:hover": { bgcolor: "#f0f0ff" },
                            }}
                          >
                            {selectedWorkspace?.id === workspace.id ? (
                              <ExpandMore sx={{ color: "#6366f1" }} />
                            ) : (
                              <ChevronRight sx={{ color: "#6b7280" }} />
                            )}
                          </IconButton>
                          <Avatar
                            sx={{
                              bgcolor: index % 2 === 0 ? "#ddd6fe" : "#fce7f3",
                              width: 36,
                              height: 36,
                              mr: 2,
                            }}
                          >
                            <Folder
                              sx={{
                                color: index % 2 === 0 ? "#8b5cf6" : "#ec4899",
                                fontSize: 20,
                              }}
                            />
                          </Avatar>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: "#1f2937",
                                mb: 0.5,
                              }}
                            >
                              {workspace.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#6b7280",
                            fontStyle:
                              workspace.description === "Không có mô tả"
                                ? "italic"
                                : "normal",
                          }}
                        >
                          {workspace.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#374151",
                            fontWeight: 500,
                          }}
                        >
                          {workspace.createdDate}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Chip
                            label={`${workspace.resources.length} tài nguyên`}
                            size="small"
                            sx={{
                              backgroundColor: "#667eea",
                              color: "white",
                              fontWeight: 600,
                              borderRadius: "12px",
                            }}
                          />
                          <Tooltip
                            onClick={() =>
                              navigate(`/workspace/${workspace.id}`)
                            }
                            title="Mở workspace"
                          >
                            <IconButton
                              size="small"
                              sx={{
                                color: "#667eea",
                                "&:hover": {
                                  backgroundColor: "rgba(102, 126, 234, 0.1)",
                                },
                              }}
                            >
                              <OpenInNew fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>

                    {/* Resources Table */}
                    <TableRow>
                      <TableCell colSpan={4} sx={{ p: 0, border: "none" }}>
                        <Collapse
                          in={selectedWorkspace?.id === workspace.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box
                            sx={{
                              p: 3,
                              background:
                                "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                              borderTop: "1px solid #e2e8f0",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: "#374151",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Language
                                sx={{ fontSize: 18, color: "#6366f1" }}
                              />
                              Tài nguyên của {workspace.name}
                            </Typography>
                            <TableContainer
                              component={Paper}
                              elevation={0}
                              sx={{
                                border: "1px solid #e5e7eb",
                                overflow: "hidden",
                              }}
                            >
                              <Table size="small">
                                <TableHead>
                                  <TableRow
                                    sx={{
                                      backgroundColor: "#f9fafb",
                                      "& .MuiTableCell-root": {
                                        borderBottom: "1px solid #e5e7eb",
                                      },
                                    }}
                                  >
                                    <TableCell
                                      sx={{
                                        fontWeight: 600,
                                        color: "#374151",
                                        fontSize: "0.85rem",
                                        width: "20%",
                                        py: 1.5,
                                      }}
                                    >
                                      Loại tài nguyên
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        fontWeight: 600,
                                        color: "#374151",
                                        fontSize: "0.85rem",
                                        width: "25%",
                                      }}
                                    >
                                      Ngày tạo
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        fontWeight: 600,
                                        color: "#374151",
                                        fontSize: "0.85rem",
                                      }}
                                    >
                                      Đường dẫn
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {workspace.resources.map(
                                    (resource, index) => (
                                      <TableRow
                                        key={index}
                                        hover
                                        sx={{
                                          "&:hover": {
                                            backgroundColor: "#f8fafc",
                                          },
                                          "&:last-child td": {
                                            borderBottom: "none",
                                          },
                                        }}
                                      >
                                        <TableCell>
                                          <Box
                                            sx={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: 1.5,
                                              paddingTop: 1,
                                              paddingBottom: 1,
                                            }}
                                          >
                                            {getResourceIcon(resource.type)}
                                            {getResourceChip(resource.type)}
                                          </Box>
                                        </TableCell>
                                        <TableCell>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              color: "#6b7280",
                                              fontSize: "0.85rem",
                                            }}
                                          >
                                            {resource.createdDate}
                                          </Typography>
                                        </TableCell>
                                        <TableCell>
                                          {resource.url ? (
                                            <Typography
                                              variant="body2"
                                              sx={{
                                                color: "#2563eb",
                                                textDecoration: "none",
                                                cursor: "pointer",

                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                fontSize: "0.85rem",
                                                "&:hover": {
                                                  textDecoration: "underline",
                                                },
                                              }}
                                              onClick={() =>
                                                window.open(
                                                  resource.url,
                                                  "_blank"
                                                )
                                              }
                                            >
                                              {resource.url}
                                            </Typography>
                                          ) : (
                                            <Chip
                                              label="Chưa có URL"
                                              size="small"
                                              variant="outlined"
                                              sx={{
                                                color: "#6b7280",
                                                borderColor: "#d1d5db",
                                                fontSize: "0.75rem",
                                              }}
                                            />
                                          )}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default WorkspaceManagement;

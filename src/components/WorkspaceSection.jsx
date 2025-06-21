import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import WorkspaceCard from "./WorkspaceCard";
import { useNavigate } from "react-router-dom";
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

const WorkspaceSection = () => {
  const handleViewResources = (workspace) => {
    console.log("Xem tài nguyên cho workspace:", workspace);
  };

  const handleCreateNewWorkspace = () => {
    console.log("Tạo workspace mới");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          mb: 3,
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleViewResources}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
            py: 1.5,
            borderColor: "#fa709a",
            color: "#fa709a",
            "&:hover": {
              borderColor: "#e85d8a",
              backgroundColor: "rgba(250, 112, 154, 0.1)",
            },
          }}
        >
          📁 Xem tài nguyên
        </Button>
        <Button
          variant="contained"
          onClick={handleCreateNewWorkspace}
          sx={{
            background:
              "linear-gradient(135deg,rgb(211, 158, 208) 0%,rgb(237, 214, 108) 100%)",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
            py: 1.5,
            "&:hover": {
              background:
                "linear-gradient(135deg,rgb(112, 211, 19) 0%,rgb(237, 214, 108) 100%)",
            },
          }}
        >
          ➕ New Workspace
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
  );
};

export default WorkspaceSection;

import React, { use, useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import WorkspaceCard from "./WorkspaceCard";
import { useNavigate } from "react-router-dom";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";
import { getWorkspaces } from "../services/workspace";
// Dữ liệu mẫu cho workspaces

const WorkspaceSection = () => {
  const navigate = useNavigate();
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false);
  const [listWorkspaces, setListWorkspaces] = useState([]);
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await getWorkspaces();
        console.log("Workspaces fetched:", response);
        setListWorkspaces(response);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        throw error;
      }
    };
    fetchWorkspaces();
  }, []);
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
          onClick={() => navigate("/workspace-resources")}
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
          onClick={() => setCreateWorkspaceOpen(true)}
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
        {listWorkspaces.map((workspace) => (
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
      <CreateWorkspaceDialog
        open={createWorkspaceOpen}
        setOpen={setCreateWorkspaceOpen}
      />
    </Box>
  );
};

export default WorkspaceSection;

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { Folder, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const WorkspaceCard = ({ workspace, onViewResources, onCreateNew }) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/workspace/${workspace.id}`)}
      sx={{
        width: 458,
        height: 200,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        border: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: "#dbeafe",
              mr: 2,
            }}
          >
            <Folder sx={{ fontSize: 24, color: "#3b82f6" }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#1f2937",
              fontSize: "1.1rem",
              flex: 1,
            }}
          >
            {workspace.title}
          </Typography>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "#6b7280",
            mb: 3,
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {workspace.description}
        </Typography>

        {/* Date */}
        <Typography
          variant="caption"
          sx={{
            color: "#9ca3af",
            fontSize: "0.8rem",
            mb: 3,
            display: "block",
          }}
        >
          Tạo ngày: {workspace.dateCreate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WorkspaceCard;

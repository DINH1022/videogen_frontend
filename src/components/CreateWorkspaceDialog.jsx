import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const CreateWorkspaceDialog = ({ open, setOpen }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceNote, setWorkspaceNote] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const handleCloseCreateWorkspace = () => {
    setOpen(false);
    setWorkspaceName("");
    setWorkspaceNote("");
  };

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) return;

    setIsCreating(true);

    // Giả lập API call
    setTimeout(() => {
      const workspaceId = Math.random().toString(36).substr(2, 9);
      setIsCreating(false);
      handleCloseCreateWorkspace();
      navigate(`/workspace/${workspaceId}`);
    }, 2000);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseCreateWorkspace}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          pb: 2,
          textAlign: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontWeight: 700,
          fontSize: "1.5rem",
          mb: 2,
        }}
      >
        Tạo Workspace Mới
      </DialogTitle>
      <DialogContent sx={{ pt: 3, px: 4 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Tên Workspace"
          fullWidth
          variant="outlined"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover fieldset": {
                borderColor: "#667eea",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#667eea",
            },
          }}
        />
        <TextField
          margin="dense"
          label="Ghi chú (tùy chọn)"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={workspaceNote}
          onChange={(e) => setWorkspaceNote(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover fieldset": {
                borderColor: "#667eea",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#667eea",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#667eea",
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 4, pb: 3, pt: 2, gap: 2 }}>
        <Button
          onClick={handleCloseCreateWorkspace}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            color: "#666",
            "&:hover": {
              bgcolor: "rgba(0,0,0,0.05)",
            },
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleCreateWorkspace}
          disabled={!workspaceName.trim() || isCreating}
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
              transform: "translateY(-1px)",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
            },
            "&:disabled": {
              background: "rgba(0,0,0,0.12)",
              color: "rgba(0,0,0,0.26)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {isCreating ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} color="inherit" />
              Đang tạo...
            </Box>
          ) : (
            "Tạo Workspace"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CreateWorkspaceDialog;

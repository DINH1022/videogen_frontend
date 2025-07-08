import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  IconButton,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import {
  Search,
  ExpandMore,
  ExpandLess,
  PlayArrow,
  Language as LanguageIcon,
  Article,
  Link as LinkIcon,
  Edit,
  Save,
  Cancel,
  Check,
  Add,
  Close,
  Save as SaveIcon,
} from "@mui/icons-material";
import { saveScript } from "../services/script";
import LanguageSelect from "../components/LanguageSelect";
import showToast from "../components/ShowToast";
import { createShortScript, createLongScript } from "../services/script";
import { searchLinkWiki } from "../services/wiki";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSelectedWorkspace } from "../redux/workspaceSlice";
const ScriptGenerator = ({}) => {
  const workspace = useSelector((state) => state.workspace.selectedWorkspace);
  const dispatch = useDispatch();
  const [topic, setTopic] = useState(workspace?.topic || "");
  const [searchResults, setSearchResults] = useState(
    workspace?.shortScript || []
  );
  const [selectedScript, setSelectedScript] = useState(null);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [language, setLanguage] = useState(workspace?.language || "");
  const [style, setStyle] = useState(workspace?.writingStyle || "");
  const [editingScript, setEditingScript] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddScript, setShowAddScript] = useState(true);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customScript, setCustomScript] = useState("");
  const [fullScript, setFullScript] = useState(workspace?.script || "");
  const [isSaving, setIsSaving] = useState(false);
  const [sources, setSources] = useState([]);
  // New states for full script display
  const [showFullScript, setShowFullScript] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [mockResults, setMockResults] = useState([]);

  const styles = [
    {
      title: "Realistic",
      img: "https://i.ytimg.com/vi/NqMS9nldyP4/maxresdefault.jpg",
    },
    {
      title: "Cinematic",
      img: "https://pub-static.fotor.com/assets/aiImageConfig/template/webText2Video/bd7inuwsi6vy.jpg@166w_166h_1l.src",
    },
    {
      title: "Digital Art",
      img: "https://pub-static.fotor.com/assets/aiImageConfig/template/webText2Video/qqvlp1f3lxbo.jpg",
    },
    {
      title: "Anime",
      img: "https://4kwallpapers.com/images/wallpapers/anime-girl-dream-2560x2560-9766.jpg",
    },
    {
      title: "Neonpunk",
      img: "https://pub-static.fotor.com/assets/aiImageConfig/template/webText2Video/iw5pf432impk.jpg",
    },
  ];

  const handleSearch = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    // Simulate API call
    const response1 = await createShortScript({
      prompt: topic,
      type: "SHORT_SCRIPT",
    });

    const response2 = await createShortScript({
      prompt: topic,
      type: "SHORT_SCRIPT",
    });
    const response3 = await searchLinkWiki(topic);

    setLoading(false);
    const data = [
      {
        id: 1,
        summary: response1 || "",
      },
      {
        id: 2,
        summary: response2 || "",
      },
    ];
    setSearchResults(data);
    setSources(response3);
    setMockResults(data);
  };

  const handleSelectScript = (script) => {
    setSelectedScript(script);
    setSourcesOpen(false);
  };

  const handleEditScript = (script) => {
    setEditingScript(script);
    setEditingContent(script.summary);
  };

  const handleSaveEdit = () => {
    if (!editingScript) return;

    const updatedResults = mockResults.map((script) =>
      script.id === editingScript.id
        ? {
            ...script,
            summary: editingContent,
          }
        : script
    );

    setMockResults(updatedResults);
    setSearchResults(updatedResults);

    if (selectedScript && selectedScript.id === editingScript.id) {
      setSelectedScript({
        ...editingScript,
        summary: editingContent,
      });
    }

    setEditingScript(null);
    setEditingContent("");
  };

  const handleAddCustomScript = () => {
    const trimmedScript = customScript.trim();
    const wordCount = trimmedScript
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    if (wordCount < 100) {
      showToast("Script phải có ít nhất 100 từ!", "error");
      return;
    }

    const newScript = {
      id: Date.now(),
      summary: trimmedScript,
    };

    const updatedResults = [...mockResults, newScript];
    setMockResults(updatedResults);
    setSearchResults(updatedResults);
    setShowAddScript(false);
    setCustomScript("");
    setShowCustomInput(false);
    setSelectedScript(newScript);
  };

  const handleCancelEdit = () => {
    setEditingScript(null);
    setEditingContent("");
  };

  const handleGenerateFullScript = async () => {
    if (!selectedScript || !language || !style) return;

    setGenerating(true);
    const response = await createLongScript({
      type: "LONG_SCRIPT",
      shortScript: selectedScript.summary,
      topic: topic,
      writingStyle: style,
      language: language,
    });
    setFullScript(response || "");
    setGenerating(false);
    setShowFullScript(true);
  };
  const handleSaveInformation = async () => {
    if (!topic || searchResults.length === 0 || !language || !style) {
      showToast("Vui lòng hoàn tất tất cả thông tin trước khi lưu!", "warning");
      return;
    }

    setIsSaving(true);

    const saveData = {
      topic: topic,
      shortScript: searchResults.map((script) => script.summary),
      language: language,
      writingStyle: style,
      script: showFullScript ? fullScript : null,
      timestamp: new Date().toISOString(),
    };

    const response = await saveScript(saveData, workspace.id);
    dispatch(setSelectedWorkspace(response));
    showToast("Thông tin đã được lưu thành công!", "success");
    setIsSaving(false);
  };
  const handleFullScriptChange = (event) => {
    setFullScript(event.target.value);
  };

  return (
    <Box sx={{ px: 2 }}>
      {/* Search Section */}
      <Card
        sx={{
          mb: 3,
          position: "relative",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "20px",
          overflow: "visible",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            borderRadius: "20px",
            padding: "3px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "exclude",
            maskComposite: "exclude",
          },
        }}
      >
        <CardContent
          sx={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: "17px",
            p: 4,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              position: "relative",
            }}
          >
            <TextField
              fullWidth
              label="Nhập chủ đề bạn muốn tạo kịch bản"
              variant="outlined"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="VD: Phim về tình bạn, Khoa học vật lý quantum..."
              sx={{
                flexGrow: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255,255,255,0.8)",
                  borderRadius: "15px",
                  fontSize: "16px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "& fieldset": {
                    borderColor: "rgba(102, 126, 234, 0.3)",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(102, 126, 234, 0.6)",
                    transform: "scale(1.02)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#667eea",
                    boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                  },
                  "&.Mui-focused": {
                    backgroundColor: "rgba(255,255,255,1)",
                    transform: "translateY(-2px)",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#667eea",
                  fontWeight: 500,
                  "&.Mui-focused": {
                    color: "#667eea",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  padding: "16px 14px",
                  "&::placeholder": {
                    color: "rgba(102, 126, 234, 0.6)",
                    opacity: 1,
                  },
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Search size={20} />
                )
              }
              onClick={handleSearch}
              disabled={loading || !topic.trim()}
              sx={{
                minWidth: "140px",
                height: "56px",
                borderRadius: "15px",
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  transition: "left 0.5s",
                },
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 35px rgba(102, 126, 234, 0.5)",
                  "&::before": {
                    left: "100%",
                  },
                },
                "&:active": {
                  transform: "translateY(-1px)",
                },
                "&:disabled": {
                  background:
                    "linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)",
                  color: "#718096",
                  transform: "none",
                  boxShadow: "none",
                },
              }}
            >
              {loading ? "Đang tìm..." : "Tìm kiếm"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Results Section */}
      {searchResults.length > 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#2c3e50", fontWeight: "bold" }}
            >
              📝 Kịch bản tóm tắt
            </Typography>

            {/* Scripts arranged horizontally */}
            <Box
              sx={{ display: "flex", gap: 3, overflowX: "auto", pb: 2, pt: 2 }}
            >
              {searchResults.map((result) => (
                <Card
                  key={result.id}
                  sx={{
                    minWidth: 300,
                    width: 346,
                    cursor:
                      editingScript?.id === result.id ? "default" : "pointer",
                    transition: "all 0.1s linear",
                    border:
                      selectedScript?.id === result.id && !editingScript
                        ? "3px solid #2196F3"
                        : editingScript?.id === result.id
                        ? "2px solid #FF9800"
                        : "1px solid #e0e0e0",
                    "&:hover":
                      editingScript?.id !== result.id
                        ? {
                            transform: "translateY(-2px)",
                            boxShadow: 4,
                          }
                        : {},
                    height: editingScript?.id === result.id ? "auto" : "204px",
                    flexShrink: 0,
                  }}
                  onClick={() =>
                    editingScript?.id !== result.id &&
                    handleSelectScript(result)
                  }
                >
                  <CardContent
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {editingScript?.id === result.id ? (
                      // Edit mode
                      <Box>
                        <TextField
                          fullWidth
                          label="Nội dung kịch bản"
                          multiline
                          variant="outlined"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            justifyContent: "flex-end",
                          }}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<Cancel />}
                            onClick={handleCancelEdit}
                            sx={{ color: "#666", borderColor: "#666" }}
                          >
                            Hủy
                          </Button>
                          <Button
                            variant="contained"
                            startIcon={<Save />}
                            onClick={handleSaveEdit}
                            sx={{
                              background:
                                "linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)",
                              "&:hover": {
                                background:
                                  "linear-gradient(45deg, #388E3C 30%, #4CAF50 90%)",
                              },
                            }}
                          >
                            Lưu
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      // View mode
                      <Box
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            mb: 1,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditScript(result);
                            }}
                            sx={{
                              color: "#333",
                              "&:hover": { color: "#1976D2" },
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.5,
                            flexGrow: 1,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 6,
                            WebkitBoxOrient: "vertical",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {result.summary}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
              {showAddScript && (
                <Card
                  sx={{
                    minWidth: 300,
                    maxWidth: 350,
                    height: "200px",
                    flexShrink: 0,
                    border: "2px dashed #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "#2196F3",
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                  onClick={() => setShowCustomInput(true)}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Add sx={{ fontSize: 48, color: "#ccc", mb: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      Thêm kịch bản tùy chỉnh
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} md={4} mt={2}>
        {/* Sources Section */}
        {sources.length > 0 && (
          <Paper sx={{ mb: 3, overflow: "hidden" }}>
            <ListItemButton onClick={() => setSourcesOpen(!sourcesOpen)}>
              <LinkIcon sx={{ mr: 2, color: "#1976D2" }} />
              <ListItemText
                primary="Sources"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              />
              {sourcesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={sourcesOpen}>
              <Divider />
              <List dense>
                {sources.map((source, index) => (
                  <ListItem key={index} sx={{ pl: 4 }}>
                    <ListItemText
                      primary={source.url}
                      primaryTypographyProps={{
                        fontSize: "0.875rem",
                        color: "#1976D2",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                      onClick={() => window.open(source.url, "_blank")}
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Paper>
        )}

        {/* Script Generation Options */}
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ display: "flex", gap: 6 }}>
            {/* Language Select */}
            <Box sx={{ mb: 2, flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 2,
                  color: "#2c3e50",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                Language
              </Typography>
              <LanguageSelect
                value={language}
                onChange={setLanguage}
                startIcon={<LanguageIcon sx={{ mr: 1, color: "#1976D2" }} />}
              />
            </Box>

            {/* Style Selection Section */}
            <Box sx={{ mb: 3, flex: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 2,
                  color: "#2c3e50",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                Styles
              </Typography>
              <Box sx={{ p: 2, bgcolor: "#f8f9fa", borderRadius: 2 }}>
                <Grid container spacing={2}>
                  {styles.map((styleItem, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <Card
                        sx={{
                          position: "relative",
                          borderRadius: 2,
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          height: "200px",
                          width: "169px",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                          },
                        }}
                        onClick={() => setStyle(styleItem.title)}
                      >
                        <CardMedia
                          component="img"
                          image={styleItem.img}
                          alt={styleItem.title}
                          sx={{
                            objectFit: "cover",
                            objectPosition: "center",
                            height: "100%",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background:
                              "linear-gradient(transparent, rgba(0,0,0,0.8))",
                            color: "white",
                            p: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: 500,
                              fontSize: "0.75rem",
                              textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                              display: "block",
                              textAlign: "center",
                            }}
                          >
                            {styleItem.title}
                          </Typography>
                        </Box>
                        {/* Selected indicator */}
                        {style === styleItem.title && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              bgcolor: "#2196F3",
                              color: "white",
                              borderRadius: "50%",
                              width: 24,
                              height: 24,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Check sx={{ fontSize: 16 }} />
                          </Box>
                        )}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={
              generating ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <PlayArrow />
              )
            }
            onClick={handleGenerateFullScript}
            disabled={
              !selectedScript ||
              !language ||
              !style ||
              editingScript ||
              generating
            }
            sx={{
              py: 1.5,
              mt: 4,
              textAlign: "center",
              background: "linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)",
              "&:hover": {
                background: "linear-gradient(45deg, #FF5252 30%, #26A69A 90%)",
              },
              "&:disabled": {
                background: "#e0e0e0",
              },
            }}
          >
            {generating ? "Đang tạo..." : "Tạo kịch bản hoàn chỉnh"}
          </Button>
        </Box>
      </Grid>

      {/* Full Script Display Section */}
      {showFullScript && (
        <Card sx={{ mt: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#2c3e50",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              📄 Kịch bản hoàn chỉnh
            </Typography>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              value={fullScript}
              onChange={handleFullScriptChange}
              sx={{
                mt: 2,
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                  lineHeight: 1.6,
                  minHeight: "200px",
                  fontFamily: "'Roboto', sans-serif",
                },
              }}
            />
          </CardContent>
        </Card>
      )}
      {searchResults.length > 0 && language && style && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={
              isSaving ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SaveIcon />
              )
            }
            onClick={handleSaveInformation}
            disabled={
              isSaving ||
              !topic ||
              searchResults.length === 0 ||
              !language ||
              !style
            }
            sx={{
              py: 1.5,
              px: 4,
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "12px",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              boxShadow: "0 6px 20px rgba(33, 150, 243, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(33, 150, 243, 0.4)",
              },
              "&:disabled": {
                background: "#e0e0e0",
                color: "#999",
                transform: "none",
                boxShadow: "none",
              },
            }}
          >
            {isSaving ? "Đang lưu..." : "Lưu thông tin"}
          </Button>
        </Box>
      )}
      {/* Custom Script Input Dialog */}
      <Dialog
        open={showCustomInput}
        onClose={() => {
          setShowCustomInput(false);
          setCustomScript("");
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Thêm kịch bản tùy chỉnh</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nội dung kịch bản"
            multiline
            rows={10}
            fullWidth
            variant="outlined"
            value={customScript}
            onChange={(e) => setCustomScript(e.target.value)}
            placeholder="Nhập nội dung kịch bản của bạn..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowCustomInput(false);
              setCustomScript("");
            }}
          >
            Hủy
          </Button>
          <Button
            onClick={handleAddCustomScript}
            variant="contained"
            disabled={!customScript.trim()}
          >
            Thêm kịch bản
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ScriptGenerator;

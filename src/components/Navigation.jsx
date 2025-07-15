import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Tooltip,
} from "@mui/material";
import {
  VideoCall as VideoCallIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Movie as MovieIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  NotificationsNone as NotificationIcon,
  BarChart as BarChartIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import CreateWorkspaceDialog from "./CreateWorkspaceDialog";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../redux/authSlice";
const Navigation = () => {
  const theme = useTheme();
  const accessToken = useSelector((state) => state.auth.login.accessToken);
  const userData = useSelector((state) => state.auth.login.currentUser);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(accessToken ? true : false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rafId = useRef(null);
  const lastScrollY = useRef(0);
  const navigateRef = useRef(null);
  const isHomePage = location.pathname === "/" || location.pathname === "/home";
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      if (window.scrollY === 0) {
        navigateRef.current.style.borderBottom = "none";
        if (!isHomePage) {
          navigateRef.current.style.background = "transparent";
        }
      } else {
        if (!isHomePage) {
          navigateRef.current.style.borderBottom =
            "2px solid rgba(40, 36, 36, 0.2)";
        }
        if (!isHomePage) {
          navigateRef.current.style.background = "white";
        }
        if (isHomePage && window.scrollY > 4000) {
          navigateRef.current.style.background = "white";
          navigateRef.current.style.borderBottom =
            "2px solid rgba(40, 36, 36, 0.2)";
        }
      }

      rafId.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const maxScroll = 2000;
        const fadeStartPoint = 200;
        const showAgainPoint = 7200;

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        setScrolled(scrollTop > fadeStartPoint);

        if (isHomePage) {
          if (scrollTop <= fadeStartPoint) {
            // Giai đoạn 1: Từ 0-200px, opacity = 1
            setScrollOpacity(1);
          } else if (scrollTop >= maxScroll && scrollTop < showAgainPoint) {
            // Giai đoạn 2: Từ 2000px-3000px, opacity = 0 (ẩn hoàn toàn)
            setScrollOpacity(0);
          } else if (scrollTop >= showAgainPoint) {
            //  Giai đoạn 3: Từ 3000px trở lên, hiện lại với opacity = 1
            setScrollOpacity(1);
          } else {
            // Giai đoạn fade: Từ 200px-2000px, opacity giảm dần
            const fadeDistance = maxScroll - fadeStartPoint;
            const currentFadeDistance = scrollTop - fadeStartPoint;
            const progress = currentFadeDistance / fadeDistance;

            const easedProgress = easeOutQuart(progress);
            const opacity = 1 - easedProgress;

            setScrollOpacity(Math.max(0, Math.min(1, opacity)));
          }
        } else {
          setScrollOpacity(1);
        }

        lastScrollY.current = scrollTop;
      });
    };

    // Throttle scroll event để tăng performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    if (!isHomePage) {
      setScrollOpacity(1);
    }

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [isHomePage]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    dispatch(logoutSuccess({ userData: null, accessToken: "" }));
    setAnchorElUser(null);
    navigate("/login");
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLoginRedirect = async (platform) => {
    // Redirect to login for specific platform
    if (platform === "youtube") {
      window.location.href = `http://localhost:8080/connect/youtube?user-id=${userData.id}`;
    } else if (platform === "tiktok") {
      window.location.href = `http://localhost:8080/connect/tiktok?user-id=${userData.id}`;
    }
  };

  const handleCreateVideoClick = () => {
    setCreateWorkspaceOpen(true);
  };

  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Thống kê", icon: <BarChartIcon />, path: "/statistics" },
    {
      text: "Tạo Video",
      icon: <VideoCallIcon />,
      action: handleCreateVideoClick,
    },
  ];

  const getAppBarBackground = () => {
    if (isHomePage) {
      return "transparent";
    }
    return "white";
  };

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff6b9d 100%)",
        color: "white",
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <MovieIcon sx={{ fontSize: 20, color: "white" }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "white", fontSize: "1.1rem" }}
          >
            AI Video Creator
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 2, mt: 2 }}>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            sx={{
              mb: 1,
              borderRadius: 3,
              bgcolor: item.featured
                ? "rgba(255, 255, 255, 0.15)"
                : "transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
                transform: "translateX(8px)",
              },
              cursor: "pointer",
            }}
            onClick={() => {
              if (item.action) {
                item.action();
              } else if (item.path) {
                navigate(item.path);
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: "white" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: item.featured ? 600 : 500,
                color: "white",
                fontSize: "0.95rem",
              }}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ px: 3, mt: 4 }}>
        {!isLoggedIn ? (
          <Button
            fullWidth
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={handleLogin}
            sx={{
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              background: "#283c1c",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              "&:hover": {
                background: "#283c1c",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(255, 107, 157, 0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Đăng Nhập
          </Button>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2.5,
              bgcolor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Avatar sx={{ bgcolor: "#ff6b9d", fontWeight: 600 }}>U</Avatar>
            <Box>
              <Typography variant="subtitle2" fontWeight={600} color="white">
                User Name
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                user@example.com
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        ref={navigateRef}
        position="fixed"
        elevation={0}
        sx={{
          boxSizing: "border-box",
          borderRadius: isHomePage ? "0" : "0 0 10px 10px",
          background: getAppBarBackground(),
          backdropFilter: "blur(20px)",
          border: "none",
          borderBottom: "none",
          color: "white",
          opacity: isHomePage ? scrollOpacity : 1,
          transition: "all 0.3s ease", // ✅ Tăng thời gian transition để mượt hơn
          visibility: isHomePage && scrollOpacity === 0 ? "hidden" : "visible",
          willChange: isHomePage ? "opacity, visibility" : "auto",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              px: { xs: 0, sm: 2 },
              py: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  bgcolor: isHomePage
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(102, 126, 234, 0.2)",
                  color: isHomePage ? "#667eea" : "white",
                  "&:hover": {
                    bgcolor: isHomePage
                      ? "rgba(255, 255, 255, 1)"
                      : "rgba(102, 126, 234, 0.3)",
                    transform: "scale(1.05)",
                  },
                  borderRadius: 2,
                  transition: "all 0.3s ease",
                  border: isHomePage
                    ? "1px solid rgba(102, 126, 234, 0.2)"
                    : "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Box
              onClick={() => {
                navigate("/");
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: 2,
                flexGrow: isMobile ? 1 : 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 3,
                  background: "rgba(255, 255, 255, 0.9)",

                  backdropFilter: "blur(10px)",
                  border: isHomePage
                    ? "1px solid rgba(102, 126, 234, 0.2)"
                    : "1px solid rgba(255, 255, 255, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    background: isHomePage
                      ? "rgba(255, 255, 255, 1)"
                      : "linear-gradient(135deg, rgba(102, 126, 234, 0.4) 0%, rgba(255, 107, 157, 0.4) 100%)",
                  },
                }}
              >
                <MovieIcon
                  sx={{
                    color: "#667eea",
                    fontSize: 24,
                  }}
                />
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: "#333",
                  fontSize: "1.3rem",
                  display: { xs: "none", sm: "block" },
                  textShadow: "none",
                  transition: "all 0.3s ease",
                }}
              >
                AI Video Creator
              </Typography>
            </Box>

            {/* Right Side Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {!isMobile && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                  }}
                >
                  {navItems.map((item) => (
                    <Button
                      key={item.text}
                      startIcon={item.icon}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else if (item.path) {
                          navigate(item.path);
                        }
                      }}
                      sx={{
                        color: "#333",
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        background: item.featured
                          ? "rgba(255, 107, 157, 0.9)"
                          : "rgba(255, 255, 255, 0.9)",

                        backdropFilter: "blur(10px)",
                        border: isHomePage
                          ? "1px solid rgba(102, 126, 234, 0.2)"
                          : "1px solid rgba(107, 95, 95, 0.25)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: item.featured
                            ? "rgba(255, 107, 157, 1)"
                            : "rgba(255, 255, 255, 1)",

                          transform: "translateY(-2px)",
                          boxShadow: item.featured
                            ? "0 2px 10px rgba(255, 107, 157, 0.3)"
                            : "0 2px 10px rgba(102, 126, 234, 0.3)",
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
              )}
              {!isLoggedIn ? (
                <Button
                  variant="contained"
                  startIcon={<LoginIcon />}
                  onClick={handleLogin}
                  sx={{
                    textTransform: "none",
                    fontWeight: 700,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    background: "#283c1c",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "white",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {isMobile ? "Login" : "Đăng Nhập"}
                </Button>
              ) : (
                <Tooltip title="Tài khoản">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        bgcolor: "#ff6b9d",
                        width: 44,
                        height: 44,
                        fontWeight: 700,
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                          boxShadow: "0 8px 25px rgba(255, 107, 157, 0.4)",
                        },
                      }}
                    >
                      {userData.username[0].toUpperCase() || "U"}
                    </Avatar>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        ml: 1,
                        color: "#333",
                        fontWeight: 600,
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      {userData.username || "User Name"}
                    </Typography>
                  </IconButton>
                </Tooltip>
              )}

              <Menu
                sx={{ mt: "50px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 3,
                    minWidth: 220,
                    background:
                      "linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 50%, rgba(255, 107, 157, 0.95) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <MenuItem
                  onClick={() => handleLoginRedirect("youtube")}
                  sx={{
                    py: 1.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <SettingsIcon sx={{ mr: 2, color: "white" }} />
                  <Typography fontWeight={500}>Kết nối Youtube</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => handleLoginRedirect("tiktok")}
                  sx={{
                    py: 1.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <SettingsIcon sx={{ mr: 2, color: "white" }} />
                  <Typography fontWeight={500}>Kết nối Tiktok</Typography>
                </MenuItem>
                <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.2)", my: 1 }} />
                <MenuItem
                  onClick={handleLogin}
                  sx={{
                    py: 1.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 107, 157, 0.3)",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <LogoutIcon sx={{ mr: 2, color: "#ff6b9d" }} />
                  <Typography
                    fontWeight={500}
                    color="#ff6b9d"
                    onCclick={handleLogout}
                  >
                    Đăng xuất
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            borderRadius: "0 25px 25px 0",
            border: "none",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Create Workspace Dialog */}
      <CreateWorkspaceDialog
        open={createWorkspaceOpen}
        setOpen={setCreateWorkspaceOpen}
      />
    </>
  );
};

export default Navigation;

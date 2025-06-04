import React, { useState, useEffect } from "react";
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
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const navItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Tạo Video",
      icon: <VideoCallIcon />,
      path: "/create-video",
      featured: true,
    },
  ];

  const getAppBarBackground = () => {
    if (isHomePage) {
      return scrolled
        ? "linear-gradient(135deg, rgba(213, 216, 228, 0.95) 0%, rgba(239, 143, 111, 0.95) 100%)"
        : "rgba(0, 0, 0, 0.1)";
    }
    return "linear-gradient(135deg, rgba(213, 216, 228, 0.95) 0%, rgba(244, 245, 198, 0.95) 100%)";
  };

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
            {item.featured && (
              <Chip
                label="New"
                size="small"
                sx={{
                  bgcolor: "#ff6b9d",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                }}
              />
            )}
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
              bgcolor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.3)",
                transform: "translateY(-2px)",
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
        position="fixed"
        elevation={isHomePage && !scrolled ? 0 : 4}
        sx={{
          borderRadius: "0 0 20px 20px",
          background: getAppBarBackground(),
          backdropFilter:
            isHomePage && scrolled
              ? "blur(20px)"
              : isHomePage
              ? "blur(5px)"
              : "blur(20px)",
          borderBottom:
            isHomePage && !scrolled
              ? "none"
              : "1px solid rgba(255, 255, 255, 0.1)",
          color: "white",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow:
            isHomePage && !scrolled
              ? "none"
              : "0 4px 20px rgba(0, 0, 0, 0.1), 0 1px 5px rgba(0, 0, 0, 0.1)",
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
                  bgcolor:
                    isHomePage && !scrolled
                      ? "rgba(255, 255, 255, 0.15)"
                      : "rgba(255, 255, 255, 0.1)",
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                  borderRadius: 2,
                  transition: "all 0.3s ease",
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
                  bgcolor:
                    isHomePage && !scrolled
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    isHomePage && !scrolled
                      ? "rgba(255, 255, 255, 0.4)"
                      : "rgba(255, 255, 255, 0.3)"
                  }`,
                  transition: "all 0.3s ease",
                }}
              >
                <MovieIcon sx={{ color: "white", fontSize: 24 }} />
              </Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: "white",
                  fontSize: "1.3rem",
                  display: { xs: "none", sm: "block" },
                  textShadow:
                    isHomePage && !scrolled
                      ? "0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.3)"
                      : "0 2px 10px rgba(0,0,0,0.3)",
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
                      onClick={() => navigate(`${item.path}`)}
                      sx={{
                        color: "white",
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                        py: 1.5,
                        borderRadius: 3,
                        bgcolor: item.featured
                          ? isHomePage && !scrolled
                            ? "rgba(255, 255, 255, 0.2)"
                            : "rgba(255, 255, 255, 0.15)"
                          : isHomePage && !scrolled
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${
                          isHomePage && !scrolled
                            ? "rgba(255, 255, 255, 0.3)"
                            : "rgba(255, 255, 255, 0.2)"
                        }`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "rgba(255, 255, 255, 0.25)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
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
                    background:
                      isHomePage && !scrolled
                        ? "linear-gradient(135deg, rgba(255, 107, 157, 0.9) 0%, rgba(240, 147, 251, 0.9) 100%)"
                        : "linear-gradient(135deg, #ff6b9d 0%, #f093fb 100%)",
                    border: `1px solid ${
                      isHomePage && !scrolled
                        ? "rgba(255, 255, 255, 0.4)"
                        : "rgba(255, 255, 255, 0.3)"
                    }`,
                    color: "white",
                    fontSize: "0.95rem",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(255, 107, 157, 0.4)",
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
                        border: `2px solid ${
                          isHomePage && !scrolled
                            ? "rgba(255, 255, 255, 0.4)"
                            : "rgba(255, 255, 255, 0.3)"
                        }`,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      U
                    </Avatar>
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
                  onClick={handleCloseUserMenu}
                  sx={{
                    py: 1.5,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <AccountCircleIcon sx={{ mr: 2, color: "white" }} />
                  <Typography fontWeight={500}>Hồ sơ</Typography>
                </MenuItem>
                <MenuItem
                  onClick={handleCloseUserMenu}
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
                  <Typography fontWeight={500}>Cài đặt</Typography>
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
                  <Typography fontWeight={500} color="#ff6b9d">
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
    </>
  );
};

export default Navigation;

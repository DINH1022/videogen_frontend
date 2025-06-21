import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Link,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  Grid,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../services/auth";
import { requestRegister } from "../redux/requestAuth";
const RegisterComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateUsername = (username) => {
    if (!username) {
      return "Username is required";
    } else if (username.length < 3) {
      return "Username must be at least 3 characters";
    }
    return "";
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    } else if (!re.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) {
      return "Please confirm your password";
    } else if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setErrors({
      ...errors,
      username: "",
    });
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setErrors({
      ...errors,
      email: "",
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors({
      ...errors,
      password: "",
      // Also clear confirmPassword error if it was a match error
      confirmPassword: confirmPassword
        ? confirmPassword === newPassword
          ? ""
          : "Passwords do not match"
        : errors.confirmPassword,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setErrors({
      ...errors,
      confirmPassword: "",
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    // Only proceed if there are no errors
    if (
      !usernameError &&
      !emailError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      const userData = {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      };
      await requestRegister(userData, dispatch, navigate);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        bgcolor: "#070332",
        background: "linear-gradient(135deg, #070332 0%, #780080 100%)",
      }}
    >
      {/* Left Side - Brand and video preview */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 2,
          p: 4,
        }}
      >
        <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: "50%",
              bgcolor: "#6c38e8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <Box
              sx={{
                width: 0,
                height: 0,
                borderTop: "10px solid transparent",
                borderBottom: "10px solid transparent",
                borderLeft: "15px solid white",
                ml: 1,
              }}
            />
          </Box>
          <Typography
            variant="h4"
            component="div"
            sx={{ color: "white", fontWeight: "bold" }}
          >
            AI Short Video creator
          </Typography>
        </Box>

        <Paper
          elevation={4}
          sx={{
            width: "50%",
            height: "50%",
            bgcolor: "black",
            borderRadius: 2,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            component="video"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src="https://cdn.tryvidgen.com/1.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          <Box
            sx={{
              position: "absolute",
              bottom: 10,
              right: 10,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              px: 1,
              borderRadius: 1,
            }}
          ></Box>
        </Paper>
      </Box>

      {/* Right Side - Registration Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "black",
          p: 4,
          overflowY: "auto",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 3, color: "white", fontWeight: "bold" }}
          >
            Create Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
            {/* Username field with validation */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={handleUsernameChange}
              error={!!errors.username}
              helperText={errors.username}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.username ? "#f44336" : "#333",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.username ? "#f44336" : "#666",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: errors.username ? "#f44336" : "#aaa",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiFormHelperText-root": {
                  color: "#f44336",
                },
              }}
            />

            {/* Email field with validation */}
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.email ? "#f44336" : "#333",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.email ? "#f44336" : "#666",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: errors.email ? "#f44336" : "#aaa",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiFormHelperText-root": {
                  color: "#f44336",
                },
              }}
            />

            {/* Password field with toggle visibility */}
            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.password}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.password ? "#f44336" : "#333",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.password ? "#f44336" : "#666",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: errors.password ? "#f44336" : "#aaa",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiFormHelperText-root": {
                  color: "#f44336",
                },
              }}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
                autoComplete="new-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "#aaa" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
            </FormControl>

            {/* Confirm Password field with toggle visibility */}
            <FormControl
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: errors.confirmPassword ? "#f44336" : "#333",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.confirmPassword ? "#f44336" : "#666",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: errors.confirmPassword ? "#f44336" : "#aaa",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiFormHelperText-root": {
                  color: "#f44336",
                },
              }}
            >
              <InputLabel htmlFor="confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                autoComplete="new-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "#aaa" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              {errors.confirmPassword && (
                <FormHelperText>{errors.confirmPassword}</FormHelperText>
              )}
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                mb: 2,
                py: 1.5,
                bgcolor: "#6c38e8",
                "&:hover": {
                  bgcolor: "#5b2ed9",
                },
                borderRadius: 3,
              }}
            >
              Create Account
            </Button>
          </Box>

          <Box sx={{ position: "relative", my: 2 }}>
            <Divider sx={{ bgcolor: "#333" }} />
            <Typography
              variant="body2"
              component="span"
              sx={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "black",
                px: 2,
                color: "#aaa",
              }}
            >
              OR
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
              mb: 2,
              py: 1.5,
              color: "#000",
              bgcolor: "white",
              borderColor: "#ddd",
              "&:hover": {
                bgcolor: "#f8f8f8",
                borderColor: "#ccc",
              },
              borderRadius: 3,
            }}
          >
            Sign Up with Google
          </Button>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#aaa" }}>
              Already have an account?{" "}
              <Link
                href="#"
                underline="none"
                sx={{ color: "#6c38e8" }}
                onClick={() => navigate("/login")}
              >
                Sign in now
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RegisterComponent;

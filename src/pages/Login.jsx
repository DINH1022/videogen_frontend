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
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requestLogin } from "../redux/requestAuth.js";

const LoginComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateUsername = (email) => {
    if (!email) {
      return "Username is required";
    } else if (email.length < 3) {
      return "Username must be at least 3 characters";
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (password.length < 5) {
      return "Password must be at least 5 characters";
    }
    return "";
  };
  const handleEmailChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setErrors({
      ...errors,
      username: "",
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors({
      ...errors,
      password: "",
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    setErrors({
      username: usernameError,
      password: passwordError,
    });

    if (!usernameError && !passwordError) {
      const userData = { username: username, password };
      await requestLogin(userData, dispatch, navigate);
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

      {/* Right Side - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "black",
          p: 4,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 4, color: "white", fontWeight: "bold" }}
          >
            Sign In
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
            {/* Email field with validation */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={username}
              onChange={handleEmailChange}
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
              Sign In
            </Button>
          </Box>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#aaa" }}>
              Already have an account?{" "}
              <Link
                href="#"
                underline="none"
                sx={{ color: "#6c38e8" }}
                onClick={() => navigate("/register")}
              >
                Sign up now
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginComponent;

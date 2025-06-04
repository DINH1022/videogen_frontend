// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormHelperText,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   Link,
//   OutlinedInput,
//   Stack,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import {
//   Visibility,
//   VisibilityOff,
//   Email,
//   Person,
//   Lock,
// } from "@mui/icons-material";
// import { LoadingButton } from "@mui/lab";
// import { useNavigate } from "react-router-dom";

// function RegisterForm({ onSubmit }) {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const onSwitchToLogin = () => {
//     navigate("/login");
//   };
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Xóa lỗi khi người dùng bắt đầu nhập lại
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const toggleShowPassword = (field) => {
//     if (field === "password") {
//       setShowPassword((prev) => !prev);
//     } else {
//       setShowConfirmPassword((prev) => !prev);
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!formData.username.trim()) {
//       newErrors.username = "Tên người dùng không được để trống";
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email không được để trống";
//     } else if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Email không hợp lệ";
//     }

//     if (!formData.password) {
//       newErrors.password = "Mật khẩu không được để trống";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Vui lòng nhập lại mật khẩu";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     // Gọi hàm onSubmit từ props (giả định)
//     try {
//       if (onSubmit) {
//         await onSubmit(formData);
//       }
//     } catch (error) {
//       setErrors({ form: "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại." });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Card
//         elevation={isMobile ? 1 : 6}
//         sx={{
//           minWidth: 550,
//           overflow: "visible",
//           borderRadius: 3,
//           position: "relative",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: -20,
//             right: -20,
//             width: 70,
//             height: 70,
//             background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
//             borderRadius: "50%",
//             boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1,
//           }}
//         >
//           <Person sx={{ fontSize: 32, color: "white" }} />
//         </Box>

//         <CardContent sx={{ p: 4, pt: 5 }}>
//           <Typography
//             variant="h4"
//             component="h1"
//             sx={{ mb: 1, fontWeight: 700, color: theme.palette.secondary.main }}
//           >
//             Đăng ký
//           </Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
//             Tạo tài khoản để bắt đầu hành trình sáng tạo video AI
//           </Typography>

//           {errors.form && (
//             <Box
//               sx={{ mb: 2, p: 2, bgcolor: "error.lighter", borderRadius: 1 }}
//             >
//               <Typography color="error" variant="body2">
//                 {errors.form}
//               </Typography>
//             </Box>
//           )}

//           <form onSubmit={handleSubmit}>
//             <Stack spacing={3}>
//               <TextField
//                 fullWidth
//                 label="Tên người dùng"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 error={!!errors.username}
//                 helperText={errors.username}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Person color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={!!errors.email}
//                 helperText={errors.email}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Email color="action" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <FormControl
//                 fullWidth
//                 variant="outlined"
//                 error={!!errors.password}
//               >
//                 <InputLabel htmlFor="register-password">Mật khẩu</InputLabel>
//                 <OutlinedInput
//                   id="register-password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   startAdornment={
//                     <InputAdornment position="start">
//                       <Lock color="action" />
//                     </InputAdornment>
//                   }
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={() => toggleShowPassword("password")}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                   label="Mật khẩu"
//                 />
//                 {errors.password && (
//                   <FormHelperText>{errors.password}</FormHelperText>
//                 )}
//               </FormControl>

//               <FormControl
//                 fullWidth
//                 variant="outlined"
//                 error={!!errors.confirmPassword}
//               >
//                 <InputLabel htmlFor="confirm-password">
//                   Nhập lại mật khẩu
//                 </InputLabel>
//                 <OutlinedInput
//                   id="confirm-password"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   startAdornment={
//                     <InputAdornment position="start">
//                       <Lock color="action" />
//                     </InputAdornment>
//                   }
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle confirm password visibility"
//                         onClick={() => toggleShowPassword("confirm")}
//                         edge="end"
//                       >
//                         {showConfirmPassword ? (
//                           <VisibilityOff />
//                         ) : (
//                           <Visibility />
//                         )}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                   label="Nhập lại mật khẩu"
//                 />
//                 {errors.confirmPassword && (
//                   <FormHelperText>{errors.confirmPassword}</FormHelperText>
//                 )}
//               </FormControl>

//               <LoadingButton
//                 fullWidth
//                 size="large"
//                 type="submit"
//                 variant="contained"
//                 color="secondary"
//                 loading={isSubmitting}
//                 sx={{
//                   py: 1.5,
//                   textTransform: "none",
//                   borderRadius: 2,
//                   boxShadow: "0 8px 16px rgba(92, 107, 192, 0.15)",
//                 }}
//               >
//                 Đăng ký
//               </LoadingButton>
//             </Stack>
//           </form>

//           <Box sx={{ mt: 3, textAlign: "center" }}>
//             <Typography variant="body2">
//               Đã có tài khoản?{" "}
//               <Link
//                 component="button"
//                 variant="subtitle2"
//                 onClick={onSwitchToLogin}
//                 sx={{ textDecoration: "none" }}
//               >
//                 Đăng nhập
//               </Link>
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// export default RegisterForm;

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

const RegisterComponent = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (e) => {
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
      console.log({ username, email, password, confirmPassword });
      // Submit form logic here
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

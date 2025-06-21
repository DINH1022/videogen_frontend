import {
  loginStart,
  loginFailed,
  loginSuccess,
  registerFailed,
  registerSuccess,
  registerStart,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from "./authSlice";
import Swal from "sweetalert2";
import { loginUser, registerUser } from "../services/auth";
export const requestLogin = async (userData, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await loginUser(userData);
    if (response.success) {
      dispatch(loginSuccess({ accessToken: response }));
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
      });
      navigate("/");
    } else {
      dispatch(loginFailed());
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: response.message || "Please try again.",
      });
    }
  } catch (error) {
    dispatch(loginFailed());
    Swal.fire({
      icon: "error",
      title: "Login Error",
      text: error.message || "An error occurred during login.",
    });
  }
};
export const requestRegister = async (userData, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const response = await registerUser(userData);
    if (response.status === 200) {
      dispatch(registerSuccess());
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now log in.",
      });
      navigate("/login");
    } else {
      dispatch(registerFailed());
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: response.message || "Please try again.",
      });
    }
  } catch (error) {
    dispatch(registerFailed());
    Swal.fire({
      icon: "error",
      title: "Registration Error",
      text: error.message || "An error occurred during registration.",
    });
  }
};

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomePage from "./pages/HomePage.jsx";
import LoginForm from "./pages/Login.jsx";
import RegisterForm from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateVideo from "./pages/CreateVideo.jsx";
import Editor from "./pages/Edit.jsx";
import WorkspaceComponent from "./pages/WorkspaceResources.jsx";
import Statistics from "./pages/Statistics.jsx";
import { ToastContainer } from "react-toastify";
const theme = {
  palette: {
    primary: {
      main: "#3f51b5", // Indigo
    },
    secondary: {
      main: "#5c6bc0", // Light indigo
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
  },
  shape: {
    borderRadius: 8,
  },
};
function App() {
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegisterForm />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/workspace/:id" element={<CreateVideo />}></Route>
            <Route path="/workspace/:id/editor" element={<Editor />}></Route>
            <Route path="/statistics" element={<Statistics />}></Route>
            <Route
              path="/workspace-resources"
              element={<WorkspaceComponent />}
            ></Route>
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </ThemeProvider>
  );
}

export default App;

import React, { useState } from "react";
import { Box, Typography, Tabs, Tab, Container, Paper } from "@mui/material";

import VideoSection from "../components/VideoSection";
import WorkspaceSection from "../components/WorkspaceSection";
import Navigation from "../components/Navigation";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        minHeight: "100vh",
      }}
    >
      <Navigation />
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          fontWeight: 800,
          mt: 8,
          color: "white",
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        🚀 Dashboard
      </Typography>

      <Paper
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="dashboard tabs"
            variant="fullWidth"
            sx={{
              px: 0,
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#6b7280",
                minHeight: 80,
                flex: 1,
                maxWidth: "50%",
                "&.Mui-selected": {
                  color: "#667eea",
                  fontWeight: 700,
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                },
                "&:hover": {
                  backgroundColor: "rgba(102, 126, 234, 0.05)",
                  transition: "all 0.3s ease",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#667eea",
                height: 4,
                borderRadius: 2,
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>📹</span>
                  <span>Videos</span>
                </Box>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <span>🏢</span>
                  <span>Workspaces</span>
                </Box>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <Box sx={{ px: 3, pb: 4 }}>
          <TabPanel value={value} index={0}>
            <VideoSection />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WorkspaceSection />
          </TabPanel>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;

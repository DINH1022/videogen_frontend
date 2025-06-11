import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  VideoCall as VideoIcon,
  Speed as SpeedIcon,
  CloudUpload as CloudIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import Navigation from '../components/Navigation';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const features = [
    {
      icon: <VideoIcon />,
      title: 'Tạo Video AI Thông Minh',
      description: 'Công nghệ AI tạo video chất lượng cao từ văn bản một cách nhanh chóng.',
    },
    {
      icon: <SpeedIcon />,
      title: 'Xử Lý Nhanh Chóng',
      description: 'Tạo video chỉ trong vài phút với hiệu suất xử lý vượt trội và ổn định.',
    },
    {
      icon: <CloudIcon />,
      title: 'Lưu Trữ Đám Mây',
      description: 'Đồng bộ và lưu trữ video an toàn trên cloud với truy cập mọi lúc mọi nơi.',
    },
    {
      icon: <SecurityIcon />,
      title: 'Bảo Mật Cao',
      description: 'Đảm bảo tính riêng tư và bảo mật dữ liệu người dùng một cách tuyệt đối.',
    },
  ];

  const teamMembers = [
    { name: 'Nguyễn Văn A', role: 'Frontend Developer', avatar: 'A' },
    { name: 'Trần Thị B', role: 'Backend Developer', avatar: 'B' },
    { name: 'Lê Văn C', role: 'AI Engineer', avatar: 'C' },
    { name: 'Phạm Thị D', role: 'UI/UX Designer', avatar: 'D' },
  ];

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <Navigation />
      <Box sx={{ pt: 12, pb: 8, minHeight: '100vh' }}>
        {/* Hero Section */}
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              mb: 8,
              py: 6,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 4,
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.3,
              },
            }}
          >
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              sx={{ fontWeight: 800, mb: 2, position: 'relative', zIndex: 1 }}
            >
              AI Video Creator
            </Typography>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{ mb: 3, opacity: 0.9, position: 'relative', zIndex: 1 }}
            >
              Nền tảng tạo video AI hàng đầu
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 600,
                mx: 'auto',
                opacity: 0.8,
                position: 'relative',
                zIndex: 1,
                lineHeight: 1.6,
              }}
            >
              Chúng tôi mang đến công nghệ AI tiên tiến giúp bạn tạo ra những video
              chuyên nghiệp chỉ từ văn bản, tiết kiệm thời gian và chi phí sản xuất.
            </Typography>
          </Box>

          {/* Features Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                mb: 4,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Tính Năng Nổi Bật
            </Typography>
            <Grid
              container
              spacing={4}
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(2, 1fr)',
                },
                gap: 4,
              }}
            >
              {features.map((feature, index) => (
                <Card
                  key={index}
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      p: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      height: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 64,
                        height: 64,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        mb: 3,
                        flexShrink: 0,
                      }}
                    >
                      {feature.icon}
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          color: '#333',
                          textAlign: 'center',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          lineHeight: 1.6,
                          textAlign: 'center',
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Box>

          {/* Team Section */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                mb: 4,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Đội Ngũ Phát Triển
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        background: 'linear-gradient(135deg, #ff6b9d 0%, #f093fb 100%)',
                        fontSize: '2rem',
                        fontWeight: 700,
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#333' }}>
                      {member.name}
                    </Typography>
                    <Chip
                      label={member.role}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Stats Section */}
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: 4,
              mb: 8,
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, color: '#333' }}> {/* Tăng mb từ 4 lên 6 */}
              Thành Tích Đạt Được
            </Typography>
            <Grid container spacing={6} justifyContent="center"> {/* Tăng spacing từ 4 lên 6 */}
              <Grid item xs={12} sm={4} md={3}> {/* Thay đổi md từ 4 thành 3 để tạo khoảng cách */}
                <Box sx={{ px: 2 }}> {/* Thêm padding ngang */}
                  <Typography variant="h2" sx={{ fontWeight: 800, color: '#667eea', mb: 2 }}> {/* Tăng mb từ 1 lên 2 */}
                    1000+
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#666' }}>
                    Video đã tạo
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{ px: 2 }}>
                  <Typography variant="h2" sx={{ fontWeight: 800, color: '#764ba2', mb: 2 }}>
                    500+
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#666' }}>
                    Người dùng tin tưởng
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Box sx={{ px: 2 }}>
                  <Typography variant="h2" sx={{ fontWeight: 800, color: '#ff6b9d', mb: 2 }}>
                    99%
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#666' }}>
                    Độ hài lòng
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* CTA Section */}
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 4,
              color: 'white',
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              Sẵn sàng tạo video đầu tiên?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              Trải nghiệm ngay công nghệ AI tạo video hàng đầu
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleGetStarted}
              sx={{
                px: 6,
                py: 2,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #ff6b9d 0%, #f093fb 100%)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px rgba(255, 107, 157, 0.4)',
                },
              }}
            >
              Bắt Đầu Ngay
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default About;

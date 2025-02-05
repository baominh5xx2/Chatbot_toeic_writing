import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  Group as UsersIcon,
  TrendingUp as DifficultyIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Mockexam.css';

const ExamCard = ({ exam }) => {
  const navigate = useNavigate();

  return (
    <Card className="exam-card">
      <CardContent>
        <Box className="exam-header">
          <Typography variant="h6" component="div" className="exam-title">
            {exam.title}
          </Typography>
          <Chip 
            label={exam.type} 
            color="primary" 
            size="small"
            variant="outlined"
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" className="exam-description">
          {exam.description}
        </Typography>

        <Box className="exam-stats">
          <Box className="stat-item">
            <TimeIcon fontSize="small" />
            <Typography variant="body2">{exam.duration} mins</Typography>
          </Box>
          <Box className="stat-item">
            <UsersIcon fontSize="small" />
            <Typography variant="body2">{exam.attempts} attempts</Typography>
          </Box>
          <Box className="stat-item">
            <DifficultyIcon fontSize="small" />
            <Typography variant="body2">Level {exam.difficulty}/5</Typography>
          </Box>
        </Box>

        <Box className="exam-rating">
          <Rating value={exam.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({exam.reviews} reviews)
          </Typography>
        </Box>

        <Box className="completion-progress">
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Completion Rate
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={exam.completionRate} 
            sx={{ height: 6, borderRadius: 3 }}
          />
          <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 0.5 }}>
            {exam.completionRate}%
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions className="exam-actions">
        <Button 
          variant="contained" 
          fullWidth
          color="primary"
          onClick={() => navigate(`/app/mockexam/${exam.id}/start`)}  // Update this path
        >
          Start Exam
        </Button>
      </CardActions>
    </Card>
  );
};

const Mockexam = () => {
  // Mock data - replace with actual data from your backend
  const mockExams = [
    {
      id: 1,
      title: "TOEIC Writing Test 1",
      type: "Official",
      description: "Standard TOEIC writing test with email writing and essay tasks.",
      duration: 60,
      attempts: 1250,
      difficulty: 3,
      rating: 4.5,
      reviews: 128,
      completionRate: 85
    },
    {
      id: 2,
      title: "Business Writing Practice",
      type: "Practice",
      description: "Focus on business correspondence and professional writing.",
      duration: 45,
      attempts: 850,
      difficulty: 4,
      rating: 4.2,
      reviews: 95,
      completionRate: 72
    },
    {
      id: 3,
      title: "Quick Assessment Test",
      type: "Assessment",
      description: "Short writing test to assess your current TOEIC level.",
      duration: 30,
      attempts: 2100,
      difficulty: 2,
      rating: 4.8,
      reviews: 245,
      completionRate: 93
    }
    // Add more mock exams as needed
  ];

  return (
    <Box sx={{ 
      height: '100vh',
      width: `calc(100vw - 240px)`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      ml: '240px',
      position: 'fixed',
      top: 0,
      right: 0,
    }}>
      <Paper 
        elevation={0} 
        sx={{ 
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 0,
          overflow: 'auto',
          bgcolor: 'background.default',
          p: 3
        }}
      >
        <Typography variant="h4" className="page-title">
          Mock Exams
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Choose a test to practice your TOEIC writing skills
        </Typography>

        <Grid container spacing={3}>
          {mockExams.map((exam) => (
            <Grid item xs={12} md={6} lg={4} key={exam.id}>
              <ExamCard exam={exam} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Mockexam;

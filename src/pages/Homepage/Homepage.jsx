import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Paper } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ErrorIcon from '@mui/icons-material/Error';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Homepage.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatCard = ({ icon, title, value, description }) => (
  <Card className="stat-card">
    <CardContent>
      <Box className="stat-card-content">
        <Box className="stat-icon">{icon}</Box>
        <Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="h4" component="div" className="stat-value">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Homepage = () => {
  // Mock data - replace with actual data from your backend
  const stats = {
    testScores: {
      average: 165,
      total: 5,
      history: [
        { date: '2023-10-01', score: 150 },
        { date: '2023-10-15', score: 160 },
        { date: '2023-11-01', score: 165 },
        { date: '2023-11-15', score: 175 },
        { date: '2023-12-01', score: 180 },
      ]
    },
    vocabulary: {
      count: 150
    },
    errors: {
      count: 25
    }
  };

  const chartData = {
    labels: stats.testScores.history.map(test => 
      new Date(test.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Test Scores',
        data: stats.testScores.history.map(test => test.score),
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.3,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Test Score Progress'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 200,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

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
          Dashboard
        </Typography>
        
        <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={<AssignmentIcon fontSize="large" />}
              title="Test Scores"
              value={`${stats.testScores.average}/200`}
              description={`Average score from ${stats.testScores.total} tests taken`}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={<MenuBookIcon fontSize="large" />}
              title="Vocabulary Notes"
              value={stats.vocabulary.count}
              description="Words saved"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard
              icon={<ErrorIcon fontSize="large" />}
              title="Common Errors"
              value={stats.errors.count}
              description="Recorded mistakes"
            />
          </Grid>

          <Grid item xs={12}>
            <Paper 
              className="chart-container"
              sx={{
                width: '100%',
                '& canvas': {
                  width: '100% !important',
                  height: '100% !important'
                }
              }}
            >
              <Line 
                data={chartData} 
                options={{
                  ...chartOptions,
                  maintainAspectRatio: false
                }} 
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper className="test-history-container">
              <Typography variant="h6" className="section-title">
                Test History
              </Typography>
              <Box className="test-list">
                {stats.testScores.history.map((test, index) => (
                  <Box key={index} className="test-item">
                    <Typography variant="body1">
                      {new Date(test.date).toLocaleDateString('en-US', { 
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {test.score}/200
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Homepage;

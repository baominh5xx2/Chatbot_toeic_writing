import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Avatar, 
  Grid, 
  Divider,
  IconButton,
  Container
} from '@mui/material';
import { PhotoCamera, Edit } from '@mui/icons-material';
import './Userpage.css';

const UserPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/path/to/avatar.jpg',
    role: 'Student',
    joinDate: 'January 2023'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (event) => {
    setPasswords({
      ...passwords,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Container maxWidth="lg" className="user-page-container">
      <Typography variant="h4" className="page-title">
        User Profile
      </Typography>
      
      <Grid container spacing={3}>
        {/* Left Column - Profile Info */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="profile-card">
            <Box className="avatar-section">
              <Avatar
                src={userInfo.avatar}
                alt={userInfo.name}
                sx={{ width: 150, height: 150 }}
              />
              <IconButton className="upload-avatar-btn" color="primary">
                <PhotoCamera />
              </IconButton>
            </Box>
            
            <Box className="user-info-section">
              <Box className="name-section">
                <Typography variant="h5">{userInfo.name}</Typography>
                <IconButton size="small" onClick={() => setIsEditing(!isEditing)}>
                  <Edit />
                </IconButton>
              </Box>
              <Typography variant="body1" color="textSecondary">{userInfo.email}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" className="info-item">
                <strong>Role:</strong> {userInfo.role}
              </Typography>
              <Typography variant="body2" className="info-item">
                <strong>Member since:</strong> {userInfo.joinDate}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Password Change */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} className="password-card">
            <Typography variant="h6" className="section-title">
              Security Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <form className="password-form">
              <Typography variant="subtitle1" gutterBottom>
                Change Password
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="password"
                    name="currentPassword"
                    label="Current Password"
                    variant="outlined"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="password"
                    name="newPassword"
                    label="New Password"
                    variant="outlined"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    label="Confirm New Password"
                    variant="outlined"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </Grid>
              </Grid>
              <Box className="action-buttons">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Update Password
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;

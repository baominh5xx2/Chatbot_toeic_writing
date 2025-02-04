import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  IconButton,
  InputAdornment,
  AppBar,
  Toolbar
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import './SignIn.css';
import { useAuth } from '../../contexts/AuthContext';

const SignIn = () => {
  const auth = useAuth();
  console.log('useAuth() content:', auth); // Kiểm tra object này có login không
  const { login } = auth;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');  // Thêm state cho error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    handleLogin();
  };

  const handleLogin = () => {
    console.log('Attempting login with:', formData);

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Gọi hàm login và lưu kết quả trực tiếp
    const loginSuccess = login(formData.email, formData.password);
    console.log('Login success:', loginSuccess);

    if (loginSuccess) {
      navigate('/app', { replace: true });  // Changed from '/' to '/app'
    } else {
      setError('Login failed. Please try again.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <AppBar position="fixed" className="signin_container">
        <Toolbar>
          <Box
            component="img"
            sx={{
              height: 40,
              width: 'auto',
              mr: 2
            }}
            alt="Logo"
            src="/Toeic_logo.jpg"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TOEIC Writing Practice
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              marginTop: 12
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              {error && (
                <Typography color="error" align="center" sx={{ mb: 2 }}>
                  {error}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Typography align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;

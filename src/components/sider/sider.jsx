import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  Toolbar, 
  ListItemIcon,
  Typography,
  Box,
  Divider,
  Button
} from '@mui/material';
import { 
  Home as HomeIcon,
  Chat as ChatIcon,
  Assignment as AssignmentIcon,
  LibraryBooks as LibraryIcon,
  Logout as LogoutIcon,
  Style as StyleIcon, // Add this import
  Create as CreateIcon, // Add this import for Mock Exam icon
  Person as PersonIcon // Add this import for Profile icon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

function Sider() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/app' },
    { text: 'Chatbot', icon: <ChatIcon />, path: '/app/chatbot' },
    { text: 'Flashcards', icon: <StyleIcon />, path: '/app/flashcards' },
    { text: 'Mock Exam', icon: <CreateIcon />, path: '/app/mockexam' },
    { text: 'Profile', icon: <PersonIcon />, path: '/app/profile' }
  ];

  const handleLogout = () => {
    navigate('/signin');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#ff9800',
          color: 'white',
          overflow: 'hidden'
        }
      }}
    >
      <Toolbar 
        sx={{ 
          backgroundColor: '#f57c00',
          minHeight: '64px !important'
        }}
      >
        <Box
          component="img"
          src="/Toeic_logo.jpg"
          alt="Logo"
          sx={{
            height: 40,
            width: 'auto',
            mr: 1
          }}
        />
        <Typography variant="h6" component="div">
          TOEIC
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
      <List sx={{ mt: 2, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              mx: 1,
              borderRadius: 2,
              backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontSize: '0.9rem',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal'
              }}
            />
          </ListItem>
        ))}
      </List>
      
      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogout}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.2)',
            },
            borderRadius: 2,
            textTransform: 'none',
          }}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}

export default Sider;

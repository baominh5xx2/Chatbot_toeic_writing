import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import './chatbotpage.css';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ 
      height: '100vh',
      width: `calc(100vw - 240px)`, // Chỉnh lại width
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      ml: '240px', // Thêm margin-left để chừa chỗ cho sidebar
      position: 'fixed',  // Đổi lại position thành fixed
      top: 0,            // Thêm top 0
      right: 0,          // Thêm right 0
    }}>
      <Paper 
        elevation={0} 
        sx={{ 
          height: '100%',
          width: '100%',  // Thêm width 100%
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 0,
          overflow: 'hidden',
          bgcolor: 'background.default'
        }}
      >
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          bgcolor: '#c62828', // Đổi màu thành đỏ đậm
          color: 'white',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Typography variant="h6">
            TOEIC Writing Teacher Chatbot
          </Typography>
        </Box>
        
        <Divider />

        {/* Messages Area */}
        <Box sx={{ 
          flexGrow: 1, 
          p: 2, 
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: '#f5f5f5'
        }}>
          {messages.length === 0 ? (
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'text.secondary'
            }}>
              <Typography variant="body1">
                Start a conversation by typing a message below
              </Typography>
            </Box>
          ) : (
            messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  maxWidth: '70%',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  bgcolor: msg.sender === 'user' ? 'primary.main' : 'white',
                  color: msg.sender === 'user' ? 'white' : 'text.primary',
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 1
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
              </Box>
            ))
          )}
        </Box>

        {/* Input Area */}
        <Box sx={{ 
          p: 2, 
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="outlined"
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              sx={{ 
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&.Mui-disabled': {
                  bgcolor: 'action.disabledBackground',
                  color: 'action.disabled'
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatbotPage;

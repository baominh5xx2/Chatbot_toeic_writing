import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { getGeminiResponse } from '../../services/Geminichat/Geminichat';
import './chatbotpage.css';
import ReactMarkdown from 'react-markdown'; // Thêm import này

const ChatbotPage = () => {
  const [messages, setMessages] = useState([{
    text: `Xin chào! Mình là giáo viên TOEIC Writing của bạn 👋

Mình có thể giúp bạn luyện tập hai phần sau:

1️⃣ Task 1: Write a sentence based on a picture
   • Viết câu dựa trên hình ảnh
   • Học cách quan sát và mô tả
   • Luyện tập cấu trúc câu

2️⃣ Task 2: Respond to a written request
   • Trả lời thư/email
   • Học cách tổ chức ý tưởng
   • Luyện tập viết văn bản hoàn chỉnh

Bạn muốn luyện tập phần nào? Hãy cho mình biết nhé! 😊`,
    sender: 'bot'
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Truyền toàn bộ lịch sử chat vào hàm getGeminiResponse
      const response = await getGeminiResponse(inputValue, messages);
      const botMessage = { text: response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { 
        text: "Sorry, I encountered an error. Please try again.", 
        sender: 'bot',
        isError: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
                  bgcolor: msg.sender === 'user' ? 'primary.main' : 
                          msg.isError ? '#ffebee' : 'white',
                  color: msg.sender === 'user' ? 'white' : 
                         msg.isError ? '#c62828' : 'text.primary',
                  p: 2,
                  borderRadius: 3,
                  boxShadow: 1
                }}
              >
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          whiteSpace: 'pre-line',
                          '& ul': { 
                            paddingLeft: 2,
                            marginTop: 0,
                            marginBottom: 0 
                          },
                          '& li': { 
                            marginBottom: 0.5 
                          },
                          '& strong': {
                            fontWeight: 600
                          }
                        }}
                      >
                        {children}
                      </Typography>
                    )
                  }}
                >
                  {msg.text}
                </ReactMarkdown>
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
              disabled={isLoading}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3
                }
              }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
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
              {isLoading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatbotPage;

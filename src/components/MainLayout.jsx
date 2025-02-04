import { Routes, Route } from 'react-router-dom';
import Sider from './sider/sider';
import Homepage from '../pages/Homepage/Homepage';
import ChatbotPage from '../pages/chatbotpage/chatbotpage';
import Flashcard from '../pages/Flashcard/Flashcard';
import Mockexam from '../pages/Mockexam/Mockexam';
import UserPage from '../pages/Userpage/Userpage';
import Box from '@mui/material/Box';

function MainLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sider />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/flashcards" element={<Flashcard />} />
          <Route path="/mockexam" element={<Mockexam />} />
          <Route path="/profile" element={<UserPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default MainLayout;

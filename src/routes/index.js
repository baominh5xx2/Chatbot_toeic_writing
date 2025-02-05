import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import Error404 from "../pages/Error/Error404";
import ChatbotPage from "../pages/chatbotpage/chatbotpage";
import Homepage from "../pages/Homepage/Homepage";
import Flashcard from "../pages/Flashcard/Flashcard";
import Mockexam from "../pages/Mockexam/Mockexam";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import UserPage from "../pages/Userpage/Userpage";
import Sider from "../components/sider/sider";
import { AuthProvider } from "../contexts/AuthContext"; // Fix the import path
import ExamMode from "../pages/Mockexam/ExamMode"; // Add this import

function MainLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%', overflow: 'hidden' }}>
      <Sider />
      <Box component="main" sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', position: 'relative' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProvider>
      <Navigate to="/signin" replace />
    </AuthProvider>
  },
  {
    path: "/signin",
    element: <AuthProvider><SignIn /></AuthProvider>
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/app",
    element: <AuthProvider><MainLayout /></AuthProvider>,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: "chatbot",
        element: <ChatbotPage />
      },
      {
        path: "flashcards",
        element: <Flashcard />
      },
      {
        path: "mockexam",
        element: <Mockexam />
      },
      {
        path: "profile",
        element: <UserPage />
      }
    ]
  },
  // Tạo route riêng cho exam mode, không nằm trong MainLayout
  {
    path: "/app/mockexam/:examId/start",
    element: <ExamMode /> // Bỏ MainLayout và chỉ render ExamMode
  },
  {
    path: "*",
    element: <Error404 />
  }
]);

export default router;

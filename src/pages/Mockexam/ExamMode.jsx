import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  LinearProgress,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepButton,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { AccessTime as TimeIcon, ExitToApp } from '@mui/icons-material';
import './ExamMode.css';

const QuestionTypes = {
  PICTURE: 'picture',
  EMAIL: 'email',
  ESSAY: 'essay'
};

const mockQuestions = [
  { id: 1, type: QuestionTypes.PICTURE, title: 'Picture Description 1' },
  { id: 2, type: QuestionTypes.PICTURE, title: 'Picture Description 2' },
  { id: 3, type: QuestionTypes.PICTURE, title: 'Picture Description 3' },
  { id: 4, type: QuestionTypes.PICTURE, title: 'Picture Description 4' },
  { id: 5, type: QuestionTypes.PICTURE, title: 'Picture Description 5' },
  { id: 6, type: QuestionTypes.EMAIL, title: 'Email Response 1' },
  { id: 7, type: QuestionTypes.EMAIL, title: 'Email Response 2' },
  { id: 8, type: QuestionTypes.ESSAY, title: 'Essay Writing' },
];

const ExamMode = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExit = () => {
    setOpenDialog(true);
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSaveAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const renderQuestionContent = () => {
    const question = mockQuestions[currentQuestion];
    
    switch (question.type) {
      case QuestionTypes.PICTURE:
        return (
          <>
            <Typography variant="h6" className="panel-title">
              Picture Description Task {currentQuestion + 1}
            </Typography>
            <Box className="question-image" sx={{ my: 2 }}>
              {/* Replace with actual image */}
              <Paper 
                sx={{ 
                  width: '100%', 
                  height: 200, 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: '#f5f5f5'
                }}
              >
                <Typography color="text.secondary">Image Placeholder</Typography>
              </Paper>
            </Box>
            <Typography variant="body1">
              Describe the image in detail. Write at least 100 words.
            </Typography>
          </>
        );

      case QuestionTypes.EMAIL:
        return (
          <>
            <Typography variant="h6" className="panel-title">
              Email Response Task
            </Typography>
            <Paper elevation={0} className="email-preview">
              {/* Email content */}
            </Paper>
          </>
        );

      case QuestionTypes.ESSAY:
        return (
          <>
            <Typography variant="h6" className="panel-title">
              Essay Writing Task
            </Typography>
            <Typography variant="body1">
              Write an essay of at least 300 words on the given topic.
            </Typography>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      bgcolor: '#f5f5f5',  // Added background color
      overflow: 'hidden'
    }}>  
      <AppBar position="fixed" className="exam-header">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography variant="h6">TOEIC Writing Test {examId}</Typography>
            <Chip 
              label="In Progress"
              color="success"
              size="small"
              sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            />
            <Box className="timer-container">
              <TimeIcon />
              <Typography className="timer-display">{formatTime(timeLeft)}</Typography>
            </Box>
          </Box>
          <Button 
            variant="outlined"
            className="exit-button"
            onClick={handleExit}
            startIcon={<ExitToApp />}
          >
            Exit Exam
          </Button>
        </Toolbar>
        
        <Stepper 
          activeStep={currentQuestion} 
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.1)',
            py: 1,
            px: 2,
            overflowX: 'auto'
          }}
        >
          {mockQuestions.map((q, index) => (
            <Step key={q.id}>
              <StepButton onClick={() => setCurrentQuestion(index)}>
                <StepLabel>
                  <Typography variant="caption" sx={{ color: 'white' }}>
                    {q.type}
                  </Typography>
                </StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </AppBar>

      <Box className="exam-container" sx={{ 
        width: '100%',
        height: 'calc(100vh - 64px)',  // Adjusted height
        mt: '64px',  // Added margin top
        p: 3,  // Added padding
        boxSizing: 'border-box',
        display: 'flex',
        gap: 3
      }}>
        {/* Question Panel */}
        <Paper className="panel question-panel" sx={{ 
          height: '100%',
          flex: '0 0 40%'  // Fixed width
        }}>
          {renderQuestionContent()}
        </Paper>

        {/* Answer Panel */}
        <Paper className="panel answer-panel" sx={{ 
          height: '100%',
          flex: '0 0 60%'  // Fixed width
        }}>
          <Box className="answer-header">
            <Typography variant="h6">Your Response</Typography>
            <Typography variant="body2" color="text.secondary">
              Word count: 0/{mockQuestions[currentQuestion].type === QuestionTypes.ESSAY ? 300 : 150}
            </Typography>
          </Box>
          <TextField
            className="answer-textfield"
            fullWidth
            multiline
            value={answers[currentQuestion] || ''}
            onChange={(e) => handleSaveAnswer(e.target.value)}
            placeholder="Write your response here..."
            variant="outlined"
            sx={{ flex: 1 }}
          />
          <Box className="button-container">
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              onClick={handleNext}
              disabled={currentQuestion === mockQuestions.length - 1}
            >
              Next
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => {/* Handle submission */}}
            >
              {currentQuestion === mockQuestions.length - 1 ? 'Submit Test' : 'Save Answer'}
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Exit Confirmation Dialog */}
      <Dialog 
        className="exit-dialog"
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Exit Exam?</DialogTitle>
        <DialogContent>
          <Typography className="exit-warning">
            Are you sure you want to exit? Your progress will be lost.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => navigate('/mockexam')} 
            color="error"
          >
            Exit Exam
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExamMode;

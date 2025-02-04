import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Grid,
  InputAdornment,
  TextField as SearchField,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import './Flashcard.css';

const FlashCard = ({ item, onEdit, onDelete }) => (
  <Card className="flashcard">
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6" component="div">
          {item.title}
        </Typography>
        <Box>
          <IconButton size="small" onClick={() => onEdit(item)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(item.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {item.description}
      </Typography>
      {item.example && (
        <Typography variant="body2" className="example-text">
          Example: {item.example}
        </Typography>
      )}
      {item.note && (
        <Typography variant="body2" className="note-text">
          Note: {item.note}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const Flashcard = () => {
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState({
    vocabulary: [
      {
        id: 1,
        title: 'Abundant',
        description: 'Existing in large quantities',
        example: 'The region has abundant natural resources.',
        note: 'Remember: Similar to "plentiful" or "copious"',
        type: 'vocabulary'
      }
    ],
    grammar: [
      {
        id: 2,
        title: 'Subject-Verb Agreement',
        description: 'Error in matching singular subjects with singular verbs',
        example: 'Incorrect: The team are playing. Correct: The team is playing.',
        type: 'grammar'
      }
    ],
    notes: [
      {
        id: 3,
        title: 'TOEIC Writing Study Tips',
        description: 'Key strategies for TOEIC Writing test',
        example: 'Use formal language and clear structure in essays',
        note: 'Remember to practice timing - 30 minutes for essay',
        type: 'notes'
      },
      {
        id: 4,
        title: 'Email Writing Format',
        description: 'Standard format for business emails',
        example: 'Dear [Name],\n[Content]\nBest regards,\n[Your name]',
        note: 'Always maintain professional tone',
        type: 'notes'
      }
    ]
  });

  const handleAddItem = (newItem) => {
    const type = tab === 0 ? 'vocabulary' : tab === 1 ? 'grammar' : 'notes';
    setItems(prev => ({
      ...prev,
      [type]: [...prev[type], { ...newItem, id: Date.now(), type }]
    }));
  };

  const handleEditItem = (item) => {
    const type = item.type;
    setItems(prev => ({
      ...prev,
      [type]: prev[type].map(i => i.id === item.id ? item : i)
    }));
  };

  const handleDeleteItem = (id) => {
    const type = tab === 0 ? 'vocabulary' : tab === 1 ? 'grammar' : 'notes';
    setItems(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item.id !== id)
    }));
  };

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    const type = tab === 0 ? 'vocabulary' : tab === 1 ? 'grammar' : 'notes';
    return items[type].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.example?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, tab, searchQuery]);

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
          My Flashcards
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          <Tabs 
            value={tab} 
            onChange={(e, newValue) => setTab(newValue)}
          >
            <Tab label="Vocabulary" />
            <Tab label="Grammar Errors" />
            <Tab label="Study Notes" />
          </Tabs>

          <SearchField
            size="small"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ 
              ml: 'auto',
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: 3
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container spacing={2}>
          {filteredItems.length === 0 ? (
            <Grid item xs={12}>
              <Box sx={{ 
                textAlign: 'center', 
                py: 4, 
                color: 'text.secondary'
              }}>
                {searchQuery ? 
                  'No cards match your search' : 
                  'No cards added yet'
                }
              </Box>
            </Grid>
          ) : (
            filteredItems.map(item => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <FlashCard
                  item={item}
                  onEdit={(item) => {
                    setEditItem(item);
                    setOpenDialog(true);
                  }}
                  onDelete={handleDeleteItem}
                />
              </Grid>
            ))
          )}
        </Grid>

        <Fab
          color="primary"
          sx={{ position: 'fixed', bottom: 24, right: 24 }}
          onClick={() => {
            setEditItem(null);
            setOpenDialog(true);
          }}
        >
          <AddIcon />
        </Fab>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {editItem ? 'Edit Card' : 'Add New Card'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 2 }} className="dialog-form">
              <TextField
                fullWidth
                label="Title"
                defaultValue={editItem?.title}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                defaultValue={editItem?.description}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Example"
                multiline
                rows={2}
                defaultValue={editItem?.example}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Personal Note"
                multiline
                rows={2}
                defaultValue={editItem?.note}
                placeholder="Add your personal notes here..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button 
              variant="contained"
              onClick={() => {
                // Add logic to save the card
                setOpenDialog(false);
              }}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Flashcard;

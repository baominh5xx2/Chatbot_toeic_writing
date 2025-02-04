import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <CssBaseline />
                <RouterProvider router={router} />
            </Container>
        </ThemeProvider>
    );
}

export default App;
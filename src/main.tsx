import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import App from './components/App/App.tsx';
import '@mantine/core/styles.css';
import './index.css';

const theme = createTheme({
    fontFamily: 'Inter, sans-serif',
    headings: { fontFamily: 'Inter, sans-serif' },
    colors: {
        'prime-blue': [
        '#E6F4FF', 
        '#D1EAFF', 
        '#A7D5FF', 
        '#7FC0FF', 
        '#57ABFF', 
        '#3395FF', 
        '#2680EB', 
        '#1A6BCC', 
        '#165BA3', 
        '#0D4A7A',
        ],
        gray: [
            '#F5F5F5',
            '#EEEEEE',
            '#E0E0E0',
            '#DEE2E6',
            '#BDBDBD',
            '#9E9E9E',
            '#757575',
            '#616161',
            '#424242',
            '#212121',
        ],
    },

    primaryColor: 'prime-blue',
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <App />
        </MantineProvider>
    </StrictMode>
);
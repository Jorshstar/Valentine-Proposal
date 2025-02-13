// src/App.js
import React, { useState, useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ValentineProposal from './page/ValentineProposal';
import ProposalQuestion from './page/ProposalQuestion';
import AcceptedPage from './page/AcceptedPage';  // Add this import

const theme = createTheme({
  palette: {
    primary: {
      main: '#e91e63',
      light: '#ff6090',
    },
    secondary: {
      main: '#9c27b0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

function App() {
  const audioRef = useRef(new Audio('/background-music.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    if (!isPlaying) {
      audioRef.current.play();
      audioRef.current.loop = true;
      setIsPlaying(true);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', startMusic, { once: true });
    return () => {
      document.removeEventListener('click', startMusic);
      audioRef.current.pause();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ValentineProposal />} />
          <Route path="/proposal-question" element={<ProposalQuestion />} />
          <Route path="/accepted" element={<AcceptedPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
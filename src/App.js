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
  const audioRef = useRef(new Audio('/audio/background-music.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    if (!isPlaying) {
      audioRef.current.play().catch(error => {
        console.log("Audio playback failed:", error);
      });
      audioRef.current.loop = true;
      setIsPlaying(true);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    document.addEventListener('click', startMusic, { once: true });
    return () => {
      document.removeEventListener('click', startMusic);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current.pause();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
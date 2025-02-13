import React, { useState } from 'react';
import { Box, Button, Typography, Container, Paper, styled, Snackbar, useMediaQuery } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const heartFloat = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate(var(--tx), -120px) rotate(var(--r)); opacity: 0.5; }
`;

const textReveal = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const QuestionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  backdropFilter: 'blur(10px)',
  textAlign: 'center',
  width: '100%',
  maxWidth: '500px',
}));

const YesButton = styled(Button)(({ theme }) => ({
  animation: `${pulse} 2s infinite`,
  background: 'linear-gradient(45deg, #FF1493, #FF69B4)',
  padding: '10px 30px',
  fontSize: '1rem',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF69B4, #FF1493)',
    transform: 'scale(1.1)',
  }
}));

const FloatingHeart = styled(Box)(({ index }) => ({
  position: 'absolute',
  animation: `${heartFloat} 6s infinite`,
  animationDelay: `${index * 0.3}s`,
  '--tx': `${Math.random() * 300 - 150}px`,
  '--r': `${Math.random() * 90 - 45}deg`,
  opacity: 0.8,
}));

const AnimatedText = styled(Typography)(({ theme }) => ({
  animation: `${textReveal} 1s ease forwards`,
  background: 'linear-gradient(45deg, #FF1493, #FF69B4)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  fontSize: '2rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const ProposalQuestion = () => {
  const [noCount, setNoCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const hearts = Array(20).fill(null); // Now 20 hearts for better effect

  // Messages when clicking "No"
  const noMessages = [
    "Aww, don't say no! 😢",
    "Are you sure? 🥺💔",
    "I'm Gonna cook your best meal babeeee! 🌹",
    "Even the stars are rooting for us! ✨",
    "C'mon, give me a chance! 😘",
    "What if I bake you cookies? 🍪❤️",
    "You can’t resist me forever! 😏",
    "Okay, now you're just teasing me... 😭",
    "Last chance! Say yes! 🤞💖",
    "I'm not giving up! Love always wins! 💘"
  ];

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
    setToastMessage(noMessages[Math.min(noCount, noMessages.length - 1)]);
    setShowToast(true);
  };

  return (
    <Container maxWidth="lg" sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: 2,
    }}>
      {/* Floating Hearts */}
      {hearts.map((_, i) => (
        <FloatingHeart key={i} index={i}>
          <Favorite sx={{ color: '#ff1493', fontSize: isMobile ? 40 : 50 }} /> {/* Bigger hearts */}
        </FloatingHeart>
      ))}
      
      <QuestionCard elevation={5}>
        <AnimatedText variant="h3" sx={{ mb: 4 }}>
          Will You Be My Valentine?
        </AnimatedText>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
          <YesButton
            variant="contained"
            onClick={() => navigate('/accepted')}
            startIcon={<Favorite />}
          >
            Yes
          </YesButton>
          
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleNoClick}
            sx={{
              transform: `translate(${Math.sin(noCount) * 50}px, ${Math.cos(noCount) * 20}px)`,
              transition: 'transform 0.3s',
              opacity: Math.max(1 - noCount * 0.1, 0.3),
            }}
          >
            No
          </Button>
        </Box>
      </QuestionCard>

      <Snackbar
        open={showToast}
        autoHideDuration={2000}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            background: 'linear-gradient(45deg, #FF69B4, #FF1493)',
            fontSize: '1.1rem',
          },
        }}
      />
    </Container>
  );
};

export default ProposalQuestion;

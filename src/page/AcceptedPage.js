import React from 'react';
import { Box, Typography, Paper, Container, styled } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Define colors for the flowers
const flowerColors = ['#ff1493', '#ff4500', '#ffcc00', '#32cd32'];

// Keyframe animation for changing colors
const colorChange = keyframes`
  0% { color: ${flowerColors[0]}; }  
  25% { color: ${flowerColors[1]}; }  
  50% { color: ${flowerColors[2]}; }  
  75% { color: ${flowerColors[3]}; }  
  100% { color: ${flowerColors[0]}; }  
`;

// Falling animation for flowers & hearts
const fallAnimation = keyframes`
  0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
`;

// Pulse effect for text
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Styling for falling elements (hearts & flowers)
const FallingElement = styled(Box)(({ delay, x }) => ({
  position: 'absolute',
  top: -50,
  left: `${x}%`,
  animation: `${fallAnimation} ${Math.random() * 3 + 5}s linear infinite`,
  animationDelay: `${delay}s`,
  fontSize: `${Math.random() * 15 + 25}px`,
}));

const CelebrationContainer = styled(Container)({
  minHeight: '100vh',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  background: 'linear-gradient(135deg, #ffcccc 0%, #ff6666 100%)',
  padding: '20px',
});

const MessageCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  textAlign: 'center',
  animation: `${pulse} 2s infinite`,
  maxWidth: '90%',
}));

const AnimatedText = styled(Typography)({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  background: 'linear-gradient(45deg, #ff0000, #b30000)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

// **Color-changing flower inside text**
const AnimatedFlower = styled('span')({
  display: 'inline-block',
  animation: `${colorChange} 3s infinite`,
});

const flowerEmojis = ['🌸', '🌺', '🌷', '💐'];

const AcceptedPage = () => {
  const elements = Array(60).fill(null); // More elements for full effect

  return (
    <CelebrationContainer maxWidth={false}>
      {/* Falling Hearts & Flowers */}
      {elements.map((_, i) => (
        <FallingElement key={i} delay={Math.random() * 3} x={Math.random() * 100}>
          {Math.random() > 0.5 ? (
            <Favorite
              sx={{
                color: '#ff0000',
                fontSize: Math.random() * 25 + 30,
                filter: 'drop-shadow(0 0 15px rgba(255,0,0,0.8))',
              }}
            />
          ) : (
            <Box
              sx={{
                fontSize: '1.5rem',
                color: flowerColors[i % flowerColors.length],
                animation: `${colorChange} 3s infinite`,
              }}
            >
              {flowerEmojis[i % flowerEmojis.length]}
            </Box>
          )}
        </FallingElement>
      ))}

      {/* Message Card */}
      <MessageCard elevation={8}>
        <AnimatedText variant="h3">
          🎉 <AnimatedFlower>🌸</AnimatedFlower> YAY! You said YES!{' '}
          <AnimatedFlower>🌺</AnimatedFlower> 🎉
        </AnimatedText>
        <Typography variant="h5" color="secondary" sx={{ fontWeight: 500, mt: 2 }}>
          You’ve officially unlocked premium access to unlimited love & happiness! ❤️😍
        </Typography>
      </MessageCard>
    </CelebrationContainer>
  );
};

export default AcceptedPage;

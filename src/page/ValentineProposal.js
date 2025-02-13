import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Button, 
  Typography, 
  Container,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import TypewriterText from '../components/TypewriterText';

// Custom animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(0, -10px); }
`;

const descendAnimation = keyframes`
  from { transform: rotateX(15deg) rotateY(5deg) translateY(0); }
  to { transform: rotateX(15deg) rotateY(5deg) translateY(100px); }
`;

// Styled components
const StyledEnvelope = styled(Paper)(({ theme, isEnvelopeOpen, isMobile }) => ({
  width: isMobile ? 320 : 500, 
  height: isMobile ? 270 : 250,
  position: 'relative',
  transformStyle: 'preserve-3d',
  transform: 'rotateX(15deg) rotateY(5deg)',
  transition: 'all 1s ease',
  backgroundColor: theme.palette.primary.light,
  animation: isEnvelopeOpen 
    ? `${descendAnimation} 1s ease forwards` 
    : `${floatAnimation} 3s ease-in-out infinite`,
  margin: '0 auto',
  '&:hover': {
    transform: isEnvelopeOpen ? 'none' : 'rotateX(15deg) rotateY(8deg)',
  }
}));

const EnvelopeFlap = styled(Box)(({ theme, open, isMobile }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: isMobile ? 80 : 100, 
  backgroundColor: theme.palette.primary.main,
  transformOrigin: 'top',
  transition: 'transform 1.5s ease',
  transform: open ? 'rotateX(-165deg)' : 'rotateX(0deg)',
  zIndex: open ? 1 : 3,
}));

const WaxSeal = styled(Box)(({ theme, broken, isMobile }) => ({
  position: 'absolute',
  top: isMobile ? 50 : 70,
  left: '50%',
  transform: `translateX(-50%) ${broken ? 'scale(1.5)' : 'scale(1)'}`,
  width: isMobile ? 60 : 80, 
  height: isMobile ? 60 : 80,
  backgroundColor: theme.palette.error.main,
  borderRadius: '50%',
  cursor: 'pointer',
  transition: 'all 0.5s ease',
  opacity: broken ? 0 : 1,
  zIndex: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows[4],
  '&:hover': {
    transform: 'translateX(-50%) scale(1.1)',
  }
}));

const LetterPaper = styled(Paper)(({ theme, height, isMobile }) => ({
  position: 'absolute',
  left: '50%',
  width: isMobile ? '90%' : '80%',
  height: `${height}%`,
  transform: `translateX(-50%) translateY(-${height}%) translateZ(1px)`,
  transition: 'all 1s ease',
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(isMobile ? 2 : 3),
  backgroundImage: `
    linear-gradient(#e3e3e3 1px, transparent 1px),
    linear-gradient(90deg, #f0f0f0 1px, transparent 1px)
  `,
  backgroundSize: '15px 15px',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 30,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: theme.palette.error.light,
  }
}));

const ContinueButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  animation: `${fadeIn} 0.5s ease`
}));

const ContentContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100%',
  maxWidth: '1200px !important',
  padding: '40px 20px',
});

const ValentineProposal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  const navigate = useNavigate();
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showPaper, setShowPaper] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [paperHeight, setPaperHeight] = useState(0);
  const [sealBroken, setSealBroken] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const handleSealClick = () => {
    if (!sealBroken) {
      setSealBroken(true);
      setTimeout(() => {
        setIsEnvelopeOpen(true);
        setTimeout(() => {
          setShowPaper(true);
          const paperAnimation = setInterval(() => {
            setPaperHeight(prev => {
              if (prev >= 50) { 
                clearInterval(paperAnimation);
                setShowMessage(true);
                return 50;
              }
              return prev + 1;
            });
          }, 30);
        }, 1000);
      }, 500);
    }
  };

  return (
    <ContentContainer sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      bgcolor: '#fce4ec' 
    }}>
      <Box sx={{ perspective: 2000 }}>
        <StyledEnvelope elevation={12} isEnvelopeOpen={isEnvelopeOpen} isMobile={isMobile}>
          <EnvelopeFlap open={isEnvelopeOpen} isMobile={isMobile} />
          
          <WaxSeal broken={sealBroken} onClick={handleSealClick} isMobile={isMobile}>
            <Typography variant="button" color="white">
              OPEN
            </Typography>
          </WaxSeal>

          {showPaper && (
            <LetterPaper height={paperHeight} elevation={4} isMobile={isMobile}>
              {showMessage && (
                <Box sx={{ pl: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      width: '100%',
                      maxWidth: isMobile ? '280px' : '400px',
                      margin: '0 auto',
                      lineHeight: 1.6,
                      fontSize: isMobile ? '0.85rem' : '0.9rem'
                    }}
                  >
                    <TypewriterText 
                      text="My Dearest Valentine, 

Your love makes every moment magical. I have something special to ask..."
                      onComplete={() => setShowButton(true)}
                    />
                  </Typography>
                  
                  {showButton && (
                    <ContinueButton
                      variant="contained"
                      color="primary"
                      endIcon={<ChevronRight />}
                      onClick={() => navigate('/proposal-question')}
                    >
                      Please Proceed
                    </ContinueButton>
                  )}
                </Box>
              )}
            </LetterPaper>
          )}
        </StyledEnvelope>
      </Box>
    </ContentContainer>
  );
};

export default ValentineProposal;

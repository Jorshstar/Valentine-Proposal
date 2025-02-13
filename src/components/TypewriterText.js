import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      setTimeout(onComplete, 1000);
    }
  }, [currentIndex, text, onComplete]);

  return <span>{displayText}</span>;
};

export default TypewriterText;
// FlexFlow Marketing Website - Typewriter Hook
// Custom hook for typewriter text animation effect

import { useState, useEffect, useCallback } from 'react';

interface UseTypewriterOptions {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
  loop?: boolean;
  cursor?: string;
  cursorBlinking?: boolean;
}

export const useTypewriter = (options: UseTypewriterOptions) => {
  const {
    words,
    typeSpeed = 100,
    deleteSpeed = 50,
    delaySpeed = 2000,
    loop = true,
    cursor = '|',
    cursorBlinking = true
  } = options;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const type = useCallback(() => {
    const currentWord = words[currentWordIndex];
    
    if (isDeleting) {
      // Deleting characters
      setCurrentText(currentWord.substring(0, currentText.length - 1));
      
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      // Typing characters
      setCurrentText(currentWord.substring(0, currentText.length + 1));
      
      if (currentText === currentWord) {
        // Finished typing current word
        if (loop || currentWordIndex < words.length - 1) {
          setTimeout(() => setIsDeleting(true), delaySpeed);
        }
      }
    }
  }, [currentWordIndex, currentText, isDeleting, words, delaySpeed, loop]);

  useEffect(() => {
    const timer = setTimeout(
      type,
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timer);
  }, [type, isDeleting, deleteSpeed, typeSpeed]);

  // Cursor blinking effect
  useEffect(() => {
    if (!cursorBlinking) {
      setShowCursor(true);
      return;
    }

    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, [cursorBlinking]);

  const displayText = currentText + (showCursor ? cursor : ' ');

  return {
    text: displayText,
    currentWord: words[currentWordIndex],
    isTyping: !isDeleting,
    isDeleting,
    progress: currentText.length / words[currentWordIndex].length
  };
};

export default useTypewriter;
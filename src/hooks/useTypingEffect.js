import { useState, useEffect } from 'react';

export function useTypingEffect(text, speed = 50) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (text === '') {
      setDisplayedText('');
      setIsComplete(false);
      return;
    }

    let i = 0;
    setDisplayedText('');
    setIsComplete(false);

    const intervalId = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return { displayedText, isComplete };
}
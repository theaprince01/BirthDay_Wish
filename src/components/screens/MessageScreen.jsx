import { useState, useEffect } from 'react';
import { CONFIG } from '../../data/config';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import './MessageScreen.css';

export function MessageScreen({ onComplete }) {
  const [showCursor, setShowCursor] = useState(true);
  const message = CONFIG.personalMessage.replace('[NAME]', CONFIG.friendName);
  const { displayedText, isComplete } = useTypingEffect(message, 40);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-proceed when typing is complete
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, onComplete]);

  return (
    <div className="message-screen">
      <div className="envelope">
        <div className="envelope-flap"></div>
        <div className="envelope-body"></div>
      </div>
      
      <div className="letter">
        <div className="letter-content">
          <div className="typewriter-text">
            {displayedText}
            <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
          </div>
          {/* {isComplete && (
            // <div className="signature">
            //   <p>With all my love,</p>
            //   <p className="your-name">{CONFIG.yourName}</p>
            // </div>
          )} */}
        </div>
      </div>
      
      <div className="photos-grid">
        <div className="photo-placeholder">📸</div>
        <div className="photo-placeholder">❤️</div>
        <div className="photo-placeholder">😊</div>
        <div className="photo-placeholder">🎂</div>
      </div>
      
      {isComplete && (
        <p className="continue-hint">Continuing to your surprise...</p>
      )}
    </div>
  );
}
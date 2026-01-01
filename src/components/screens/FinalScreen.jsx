import { useState, useEffect } from 'react';
import { CONFIG } from '../../data/config';
import { Confetti } from '../shared/Confetti';
import './FinalScreen.css';

export function FinalScreen() {
  const [showSecret, setShowSecret] = useState(false);
  const [showReplay, setShowReplay] = useState(false);

  useEffect(() => {
    // Show replay button after 5 seconds
    const timer = setTimeout(() => {
      setShowReplay(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleReplay = () => {
    window.location.reload();
  };

  const handleShare = () => {
    const shareText = `Check out this amazing birthday surprise for ${CONFIG.friendName}! 🎂✨`;
    
    if (navigator.share) {
      navigator.share({
        title: `Happy Birthday ${CONFIG.friendName}!`,
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Birthday message copied to clipboard! 📋');
    }
  };

  return (
    <div className="final-screen">
      <h1 className="final-title">🎉 Happy Birthday! 🎉</h1>
      
      <div className="final-message">
        <p className="main-message">
          Wishing you the most amazing year ahead, filled with joy, laughter, and beautiful moments.
        </p>
        
        <div className="friend-name-large">
          {CONFIG.friendName}
        </div>
        
        <p className="closing-message">
          Thank you for being such an incredible friend. You deserve all the happiness in the world!
        </p>
        
        {/* <div className="signature-final">
          With love,<br />
          <span className="your-name-final">{CONFIG.yourName}</span>
        </div> */}
      </div>
      
      <div className="final-actions">
        {showReplay && (
          <>
            <button className="action-btn replay-btn" onClick={handleReplay}>
              🔄 Experience Again
            </button>
            
            <button className="action-btn share-btn" onClick={handleShare}>
              📤 Share the Joy
            </button>
          </>
        )}
      </div>
      
      <button 
        className="secret-btn" 
        onClick={() => setShowSecret(!showSecret)}
        title="Psst... there's a secret!"
      >
        🔒
      </button>
      
      {showSecret && (
        <div className="secret-message">
          <h3>One More Secret! 🤫</h3>
          <p>The password for extra surprises is:</p>
          <p className="secret-password">0102</p>
          <p>(Your birthday: January 2nd!)</p>
        </div>
      )}
      
      <Confetti active={true} />
      
      <div className="birthday-wishes">
        <span>🎂</span>
        <span>✨</span>
        <span>🎉</span>
        <span>🥳</span>
        <span>🎁</span>
        <span>❤️</span>
      </div>
    </div>
  );
}
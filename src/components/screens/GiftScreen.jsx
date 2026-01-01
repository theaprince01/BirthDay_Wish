import { useState, useEffect } from 'react';
import { CONFIG } from '../../data/config';
import { Confetti } from '../shared/Confetti';
import './GiftScreen.css';

export function GiftScreen({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [revealedGifts, setRevealedGifts] = useState([]);

  const openGift = () => {
    setIsOpen(true);
    
    // Reveal gifts one by one
    CONFIG.gifts.forEach((_, index) => {
      setTimeout(() => {
        setRevealedGifts(prev => [...prev, index]);
      }, index * 1000);
    });

    // Auto-proceed after all gifts are revealed
    setTimeout(() => {
      onComplete();
    }, CONFIG.gifts.length * 1000 + 2000);
  };

  return (
    <div className="gift-screen">
      <h1>Your Birthday Surprise! 🎁</h1>
      <p className="instruction">Tap the gift box to open</p>
      
      <div className={`gift-box ${isOpen ? 'open' : ''}`} onClick={!isOpen ? openGift : null}>
        <div className="box-lid"></div>
        <div className="box-base"></div>
        <div className="ribbon-vertical"></div>
        <div className="ribbon-horizontal"></div>
        <div className="ribbon-bow"></div>
        
        {isOpen && (
          <div className="gift-sparkle">✨</div>
        )}
      </div>
      
      <div className="gifts-container">
        {CONFIG.gifts.map((gift, index) => (
          <div 
            key={index}
            className={`gift-item ${revealedGifts.includes(index) ? 'revealed' : ''}`}
          >
            <div className="gift-emoji">{gift.emoji}</div>
            <h3>{gift.title}</h3>
            <p>{gift.description}</p>
          </div>
        ))}
      </div>
      
      {isOpen && (
        <p className="continue-hint">Preparing final surprise...</p>
      )}
      
      <Confetti active={isOpen} />
    </div>
  );
}
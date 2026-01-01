import { useEffect, useState } from 'react';
import { CONFIG } from '../../data/config';
import { Confetti } from '../shared/Confetti';
import './CountdownScreen.css';

export function Countdown3Screen() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timers = CONFIG.reasons.map((_, index) => {
      return setTimeout(() => {
        setActiveCard(index + 1);
      }, index * 1000);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="countdown-screen countdown-3">
      <div className="countdown-number">3</div>
      <h1>3 Reasons You're Amazing</h1>
      
      <div className="reasons-container">
        {CONFIG.reasons.map((reason, index) => (
          <div 
            key={index}
            className={`reason-card ${index < activeCard ? 'active' : ''}`}
          >
            <div className="card-emoji">{reason.emoji}</div>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
      
      <Confetti active={activeCard === 3} />
    </div>
  );
}

export function Countdown2Screen() {
  const [activeMemory, setActiveMemory] = useState(0);

  useEffect(() => {
    const timers = [0, 1].map(index => {
      return setTimeout(() => {
        setActiveMemory(index + 1);
      }, index * 1500);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="countdown-screen countdown-2">
      <div className="countdown-number">2</div>
      <h1>2 Unforgettable Memories</h1>
      
      <div className="memories-container">
        {[0, 1].map(index => (
          <div 
            key={index}
            className={`memory-card ${index < activeMemory ? 'active' : ''}`}
          >
            <div className="memory-emoji">
              {index === 0 ? '📸' : '🎉'}
            </div>
            <h3>
              {index === 0 ? 'That Amazing Adventure' : 'Our Talks'}
            </h3>
            <p>
              {index === 0 
                ? 'Playing Free Fire together and just enjoying the moment..' 
                : 'The simple conversations we had  calm, random, and real.'}
            </p>
          </div>
        ))}
      </div>
      
      <Confetti active={activeMemory === 2} />
    </div>
  );
}

export function Countdown1Screen() {
  const [nameRevealed, setNameRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNameRevealed(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="countdown-screen countdown-1">
      <div className="countdown-number">1</div>
      <h1>1 Extraordinary Friend</h1>
      
      <div className={`name-reveal ${nameRevealed ? 'revealed' : ''}`}>
        {CONFIG.friendName}
      </div>
      
      <p className="friend-description">
        The one who makes every day brighter just by being in it
      </p>
      
      <Confetti active={nameRevealed} />
    </div>
  );
}
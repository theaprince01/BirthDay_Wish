import { useEffect, useState } from 'react';
import { CONFIG } from '../../data/config';
import './LoadingScreen.css';

export function LoadingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="heartbeat">❤️</div>
      <h1>Something magical is loading{dots}</h1>
      <p className="subtitle">For the incredible</p>
      <h2 className="friend-name">{CONFIG.friendName}</h2>
      <p className="hint">Get ready for a special birthday surprise</p>
    </div>
  );
}
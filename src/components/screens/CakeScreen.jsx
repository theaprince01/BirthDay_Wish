import { useState, useEffect } from 'react';
import { CONFIG } from '../../data/config';
import './CakeScreen.css';

export function CakeScreen({ onComplete }) {
  const [candles, setCandles] = useState([]);
  const [blownCount, setBlownCount] = useState(0);
  const totalCandles = Math.min(CONFIG.friendAge, 10);

  useEffect(() => {
    // Initialize candles
    const initialCandles = Array.from({ length: totalCandles }, (_, i) => ({
      id: i,
      isLit: true,
      isBlown: false,
      color: `hsl(${(i * 360) / totalCandles}, 70%, 60%)`
    }));
    setCandles(initialCandles);
  }, [totalCandles]);

  const blowCandle = (id) => {
    if (candles[id].isBlown) return;
    
    setCandles(prev => prev.map((candle, idx) => 
      idx === id ? { ...candle, isBlown: true, isLit: false } : candle
    ));
    
    setBlownCount(prev => prev + 1);
    
    // Play blow sound
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-candle-blow-738.mp3');
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio error"));
  };

  const blowAllCandles = () => {
    setCandles(prev => prev.map(candle => ({ ...candle, isBlown: true, isLit: false })));
    setBlownCount(totalCandles);
  };

  // Check if all candles are blown
  useEffect(() => {
    if (blownCount === totalCandles && totalCandles > 0) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  }, [blownCount, totalCandles, onComplete]);

  return (
    <div className="cake-screen">
      <h1>Make a Wish! 🎂</h1>
      <p className="instruction">Tap each candle to blow it out</p>
      
      <div className="cake-container">
        <div className="cake">
          {/* Cake base */}
          <div className="cake-base"></div>
          <div className="cake-top"></div>
          <div className="cake-icing"></div>
          
          {/* Candles */}
          {candles.map((candle, index) => (
            <div
              key={candle.id}
              className={`candle ${candle.isBlown ? 'blown' : ''}`}
              style={{
                left: `${(index + 1) * (100 / (totalCandles + 1))}%`,
                backgroundColor: candle.color
              }}
              onClick={() => blowCandle(index)}
            >
              <div className={`flame ${candle.isLit ? 'lit' : ''}`} />
              <div className="candle-wick" />
            </div>
          ))}
        </div>
      </div>
      
      <button className="blow-all-btn" onClick={blowAllCandles}>
        🎂 Blow All Candles
      </button>
      
      <p className="candle-count">
        {blownCount} of {totalCandles} candles blown
      </p>
      
      <p className="wish-hint">Make your birthday wish before blowing all candles!</p>
    </div>
  );
}
import { useEffect, useState } from 'react';
import './Confetti.css';

export function Confetti({ active = false }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) return;

    // Create 50 confetti particles
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
      duration: Math.random() * 3000 + 2000
    }));

    setParticles(newParticles);

    // Clear particles after animation
    const timer = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!active) return null;

  return (
    <div className="confetti-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}vw`,
            top: `${particle.y}vh`,
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}ms`,
            transform: `rotate(${particle.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
}
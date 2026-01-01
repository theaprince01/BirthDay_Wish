import { useState, useEffect, useRef } from 'react';

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-happy-birthday-to-you-443.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Handle audio events
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.addEventListener('play', handlePlay);
      audioRef.current.addEventListener('pause', handlePause);
      audioRef.current.addEventListener('ended', handleEnded);
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
    };
  }, []);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.log('Audio play failed:', e);
          setIsPlaying(false);
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const setVolume = (volume) => {
    if (audioRef.current) {
      const newVolume = Math.max(0, Math.min(1, volume));
      audioRef.current.volume = newVolume;
    }
  };

  return {
    play,
    pause,
    stop,
    setVolume,
    isPlaying
  };
}
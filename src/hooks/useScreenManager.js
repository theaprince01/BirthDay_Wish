import { useState, useEffect, useCallback } from 'react';
import { CONFIG } from '../data/config';

export function useScreenManager() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const screens = [
    'loading',
    'countdown3', 
    'countdown2',
    'countdown1',
    'cake',
    'message',
    'gift',
    'final'
  ];
  
  const screenDurations = Object.values(CONFIG.screenDurations);

  const nextScreen = useCallback(() => {
    setCurrentScreen(prev => Math.min(prev + 1, screens.length - 1));
  }, [screens.length]);

  const prevScreen = useCallback(() => {
    setCurrentScreen(prev => Math.max(prev - 1, 0));
  }, []);

  // Auto-progression
  useEffect(() => {
    if (isPaused || currentScreen >= screens.length - 1) return;
    
    const duration = screenDurations[currentScreen];
    if (duration === Infinity) return;
    
    const timer = setTimeout(nextScreen, duration);
    
    return () => clearTimeout(timer);
  }, [currentScreen, isPaused, nextScreen, screenDurations, screens.length]);

  return {
    currentScreen,
    setCurrentScreen,
    nextScreen,
    prevScreen,
    isPaused,
    setIsPaused,
    totalScreens: screens.length,
    currentScreenName: screens[currentScreen]
  };
}
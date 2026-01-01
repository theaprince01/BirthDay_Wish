import { useScreenManager } from './hooks/useScreenManager';

import { LoadingScreen } from './components/screens/LoadingScreen';
import { Countdown1Screen, Countdown2Screen, Countdown3Screen } from './components/screens/CountdownScreen'; // Updated import
import { CakeScreen } from './components/screens/CakeScreen';
import { MessageScreen } from './components/screens/MessageScreen';
import { GiftScreen } from './components/screens/GiftScreen';
import { FinalScreen } from './components/screens/FinalScreen';
import { ProgressBar } from './components/shared/ProgressBar';
import { Controls } from './components/shared/Controls';
import './App.css';

function App() {
  const screenManager = useScreenManager();

  const renderScreen = () => {
    switch(screenManager.currentScreen) {
      case 0: return <LoadingScreen />;
      case 1: return <Countdown3Screen />;
      case 2: return <Countdown2Screen />;
      case 3: return <Countdown1Screen />;
      case 4: return <CakeScreen onComplete={screenManager.nextScreen} />;
      case 5: return <MessageScreen onComplete={screenManager.nextScreen} />;
      case 6: return <GiftScreen onComplete={screenManager.nextScreen} />;
      case 7: return <FinalScreen />;
      default: return <LoadingScreen />;
    }
  };

  return (
    <div className="app">
      {renderScreen()}
      
      <ProgressBar 
        current={screenManager.currentScreen} 
        total={screenManager.totalScreens} 
      />
      
      <Controls
        onNext={screenManager.nextScreen}
        onPrev={screenManager.prevScreen}
        onPause={() => screenManager.setIsPaused(!screenManager.isPaused)}
        isPaused={screenManager.isPaused}
        show={screenManager.currentScreenName !== 'loading'}
      />
    </div>
  );
}

export default App;
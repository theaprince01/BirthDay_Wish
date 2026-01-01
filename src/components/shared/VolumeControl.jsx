import './VolumeControl.css';

export function VolumeControl({ volume, setVolume, isPlaying }) {
  if (!isPlaying) return null;

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="volume-control">
      <span className="volume-icon">🔊</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
      />
      <span className="volume-percentage">{Math.round(volume * 100)}%</span>
    </div>
  );
}
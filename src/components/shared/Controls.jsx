import './Controls.css';

export function Controls({ onNext, onPrev, onPause, isPaused, show = true }) {
  if (!show) return null;

  return (
    <div className="controls-container">
      <button className="control-btn prev-btn" onClick={onPrev} title="Previous">
        ←
      </button>
      
      <button className="control-btn pause-btn" onClick={onPause} title={isPaused ? "Resume" : "Pause"}>
        {isPaused ? "▶" : "⏸"}
      </button>
      
      <button className="control-btn next-btn" onClick={onNext} title="Next">
        →
      </button>
      
      <div className="controls-hint">
        Click or tap anywhere to advance
      </div>
    </div>
  );
}
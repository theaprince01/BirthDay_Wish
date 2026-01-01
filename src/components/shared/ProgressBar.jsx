import './ProgressBar.css';

export function ProgressBar({ current, total }) {
  const progress = (current / (total - 1)) * 100;
  
  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="progress-text">
        {current + 1} / {total}
      </div>
    </div>
  );
}
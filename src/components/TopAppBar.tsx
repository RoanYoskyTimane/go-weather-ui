import React from 'react';
import './TopAppBar.css';

interface TopAppBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title = 'Go Weather',
  showBack = false,
  onBack,
}) => {
  return (
    <header className="top-app-bar">
      <div className="top-app-bar-content">
        {showBack ? (
          <div className="header-left">
            <button 
              className="material-symbols-outlined back-button" 
              onClick={onBack}
              aria-label="Go back"
            >
              arrow_back
            </button>
            <span className="app-title">{title}</span>
          </div>
        ) : (
          <div className="header-left">
            <span className="app-title">
              Go<span className="app-title-accent">&nbsp;Weather</span>
            </span>
          </div>
        )}
        <div className="header-right">
          {/* Optional actions or clean gap matching design */}
        </div>
      </div>
    </header>
  );
};

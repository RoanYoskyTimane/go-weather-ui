import React from 'react';
import './BottomNav.css';

interface BottomNavProps {
  activeTab: 'home' | 'search' | 'radar';
  onChangeTab?: (tab: 'home' | 'search' | 'radar') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
}) => {
  return (
    <nav className="bottom-nav">
      <button
        className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => onChangeTab?.('home')}
        aria-label="Home"
      >
        <span className="material-symbols-outlined">home</span>
      </button>
      
      <button
        className={`bottom-nav-item ${activeTab === 'search' ? 'active' : ''}`}
        onClick={() => onChangeTab?.('search')}
        aria-label="Search"
      >
        <span className="material-symbols-outlined">search</span>
      </button>
      
      <button
        className={`bottom-nav-item ${activeTab === 'radar' ? 'active' : ''}`}
        onClick={() => onChangeTab?.('radar')}
        aria-label="Radar"
      >
        <span className="material-symbols-outlined">radar</span>
      </button>
    </nav>
  );
};

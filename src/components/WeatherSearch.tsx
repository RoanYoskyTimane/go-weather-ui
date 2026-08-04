import React, { useState } from 'react';
import './WeatherSearch.css';

export interface RecentCity {
  city: string;
  country: string;
  temperature: string;
  condition: string; // e.g. 'clear', 'cloudy', 'rainy', 'snowy'
}

interface WeatherSearchProps {
  onSearch: (city: string, days: number) => void;
  recentCities: RecentCity[];
  onSelectRecentCity: (city: string) => void;
  onClearRecents: () => void;
  isLoading: boolean;
  error?: string | null;
}

export const WeatherSearch: React.FC<WeatherSearchProps> = ({
  onSearch,
  recentCities,
  onSelectRecentCity,
  onClearRecents,
  isLoading,
  error,
}) => {
  const [cityInput, setCityInput] = useState('');
  const [daysInput, setDaysInput] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onSearch(cityInput.trim(), daysInput);
    }
  };

  const getConditionIcon = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes('clear') || cond.includes('sun')) return 'sunny';
    if (cond.includes('rain') || cond.includes('drizzle')) return 'rainy';
    if (cond.includes('snow') || cond.includes('ice') || cond.includes('flurry')) return 'ac_unit';
    return 'cloud';
  };

  return (
    <div className="weather-search-container animate-fade-in">
      <div className="search-branding">
        <h1 className="branding-title">Find Your Atmosphere</h1>
        <p className="branding-subtitle">Real-time weather data with digital weightlessness.</p>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper glass-panel">
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            className="search-input"
            type="text"
            placeholder="Enter city name..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            disabled={isLoading}
          />
          <div className="days-select-wrapper">
            <span className="days-select-label">DAYS</span>
            <select
              className="days-select-field"
              value={daysInput}
              onChange={(e) => setDaysInput(Number(e.target.value))}
              disabled={isLoading}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <button 
            type="submit" 
            className="glass-button search-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="material-symbols-outlined loading-spinner">progress_activity</span>
            ) : (
              'SEARCH'
            )}
          </button>
        </div>
      </form>

      {error && <div className="search-error-msg">{error}</div>}

      {recentCities.length > 0 && (
        <div className="recent-cities-section">
          <div className="recent-cities-header">
            <span className="recent-cities-title">RECENT CITIES</span>
            <button className="clear-all-btn" onClick={onClearRecents} type="button">
              CLEAR ALL
            </button>
          </div>
          
          <div className="recent-cities-grid">
            {recentCities.map((item, idx) => (
              <div
                key={`${item.city}-${idx}`}
                className="recent-city-card glass-panel"
                onClick={() => onSelectRecentCity(item.city)}
              >
                <div className="recent-city-info">
                  <span className="recent-city-name">{item.city}</span>
                  <span className="recent-city-country">{item.country}</span>
                </div>
                <div className="recent-city-weather">
                  <span className="recent-city-temp">{item.temperature}</span>
                  <span className="material-symbols-outlined recent-city-icon">
                    {getConditionIcon(item.condition)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decorative spinning alignment rings */}
      <div className="decorative-accent">
        <div className="outer-ring animate-spin-slow"></div>
        <div className="inner-ring animate-spin-slow-reverse"></div>
        <div className="center-icon">
          <span className="material-symbols-outlined">filter_drama</span>
        </div>
      </div>
    </div>
  );
};

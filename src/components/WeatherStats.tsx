import React from 'react';
import './WeatherStats.css';

interface WeatherStatsProps {
  windSpeed: string;
  humidity: string;
  uvIndex: string;
  visibility: string;
  sunrise: string;
  sunset: string;
}

export const WeatherStats: React.FC<WeatherStatsProps> = ({
  windSpeed,
  humidity,
  uvIndex,
  visibility,
  sunrise,
  sunset,
}) => {
  return (
    <>
      {/* Wind & Humidity Card */}
      <section className="stats-card glass-card">
        <div className="stat-row">
          <div className="stat-icon-wrapper">
            <span className="material-symbols-outlined text-primary">air</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">WIND SPEED</p>
            <p className="stat-value">{windSpeed}</p>
          </div>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="stat-row">
          <div className="stat-icon-wrapper">
            <span className="material-symbols-outlined text-primary">humidity_low</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">HUMIDITY</p>
            <p className="stat-value">{humidity}</p>
          </div>
        </div>
      </section>

      {/* UV & Visibility Card */}
      <section className="stats-card glass-card">
        <div className="stat-row">
          <div className="stat-icon-wrapper">
            <span className="material-symbols-outlined text-primary">wb_sunny</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">UV INDEX</p>
            <p className="stat-value">{uvIndex}</p>
          </div>
        </div>
        
        <div className="stat-divider"></div>
        
        <div className="stat-row">
          <div className="stat-icon-wrapper">
            <span className="material-symbols-outlined text-primary">visibility</span>
          </div>
          <div className="stat-content">
            <p className="stat-label">VISIBILITY</p>
            <p className="stat-value">{visibility}</p>
          </div>
        </div>
      </section>

      {/* Sunrise & Sunset Card */}
      <section className="stats-card glass-card sunrise-sunset-card">
        <div className="sun-row">
          <p className="stat-label">SUNRISE</p>
          <p className="sun-time">{sunrise}</p>
        </div>
        
        {/* Sun Position Arc Graphic */}
        <div className="sun-path-container">
          <div className="sun-path-line bg-line"></div>
          <div className="sun-path-line active-line"></div>
          <div className="sun-orb"></div>
        </div>
        
        <div className="sun-row">
          <p className="stat-label">SUNSET</p>
          <p className="sun-time">{sunset}</p>
        </div>
      </section>
    </>
  );
};

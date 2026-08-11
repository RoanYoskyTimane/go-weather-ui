import React from 'react';
import './WeatherResults.css';
import { WeatherStats } from './WeatherStats';

export interface WeatherInfo {
  city: string;
  country: string;
  temperature: string;
  condition?: string;
  highTemp?: string;
  lowTemp?: string;
}

export interface ForecastItem {
  date: string;
  max_temp: string;
  min_temp: string;
  condition?: string;
}

export interface ForecastInfo {
  city: string;
  country: string;
  forecasts: ForecastItem[];
}

interface WeatherResultsProps {
  weather: WeatherInfo;
  forecast: ForecastInfo;
  onSearchAgain: () => void;
  // Stats details (generated dynamically or fetched)
  stats: {
    windSpeed: string;
    humidity: string;
    uvIndex: string;
    visibility: string;
    sunrise: string;
    sunset: string;
  };
}

export const WeatherResults: React.FC<WeatherResultsProps> = ({
  weather,
  forecast,
  onSearchAgain,
  stats,
}) => {
  // Determine if condition is sunny/cloudy/rainy/snowy based on temperature or name
  const tempVal = parseFloat(weather.temperature) || 20;
  const condition = weather.condition || (tempVal > 25 ? 'Clear Sky' : tempVal > 15 ? 'Partly Cloudy' : 'Light Rain');
  
  const getConditionIcon = (condName?: string) => {
    const c = (condName || '').toLowerCase();
    if (c.includes('clear') || c.includes('sun') || c.includes('hot')) return 'light_mode';
    if (c.includes('rain') || c.includes('drizzle')) return 'rainy';
    if (c.includes('snow') || c.includes('ice') || c.includes('flurry')) return 'ac_unit';
    return 'cloud';
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    // Format date as Short Day Name (e.g. Mon, Tue)
    return date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
  };

  const getFormattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  };

  // Choose beautiful city specific photo if matches common cities, else use city tag search URL
  const getSkylineUrl = (city: string) => {
    const c = city.toLowerCase();
    if (c.includes('london')) return 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80';
    if (c.includes('new york')) return 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80';
    if (c.includes('tokyo')) return 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80';
    if (c.includes('paris')) return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80';
    if (c.includes('maputo')) return 'https://images.unsplash.com/photo-1550133130-0d3d2d6470d2?auto=format&fit=crop&w=800&q=80';
    return `https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80`;
  };

  return (
    <div className="weather-results-container animate-fade-in">
      <div className="bento-grid">
        {/* Hero Weather Card */}
        <section className="hero-weather-card glass-card">
          <div className="hero-header">
            <div className="hero-city-info notranslate" translate="no">
              <h1 className="hero-city-name">{weather.city}</h1>
              <p className="hero-country-name">{weather.country}</p>
            </div>
            
            <div className="condition-badge">
              <span className="material-symbols-outlined badge-icon">
                {getConditionIcon(condition)}
              </span>
              <span className="badge-text">{condition}</span>
            </div>
          </div>
          
          <div className="hero-footer">
            <div className="hero-temp-container">
              <span className="hero-temp">{weather.temperature}</span>
              <div className="temp-range">
                <span className="temp-range-item">H: {weather.highTemp || '27°'}</span>
                <span className="temp-range-item">L: {weather.lowTemp || '19°'}</span>
              </div>
            </div>
            
            <div className="hero-actions">
              <button className="glass-button search-again-btn" onClick={onSearchAgain}>
                <span className="material-symbols-outlined btn-icon">search</span>
                Search again
              </button>
            </div>
          </div>
        </section>

        {/* Local Context Image Card */}
        <section className="local-context-card glass-card">
          <div 
            className="context-bg" 
            style={{ backgroundImage: `url(${getSkylineUrl(weather.city)})` }}
            role="img"
            aria-label={`${weather.city} skyline`}
          ></div>
          <div className="context-overlay"></div>
          <div className="context-content">
            <span className="context-label">Local Context</span>
            <h3 className="context-title">{weather.city} Skyline</h3>
          </div>
        </section>

        {/* Forecast Scroll Section */}
        <section className="forecast-section">
          <div className="forecast-header">
            <h2 className="forecast-title">{forecast.forecasts.length}-Day Forecast</h2>
            <span className="material-symbols-outlined forecast-header-icon">schedule</span>
          </div>
          
          <div className="forecast-scroll custom-scroll">
            {forecast.forecasts.map((day) => {
              const dayTemp = parseFloat(day.max_temp) || 20;
              const dayCondition = day.condition || (dayTemp > 25 ? 'sunny' : 'cloudy');
              
              return (
                <div key={day.date} className="forecast-item glass-card">
                  <span className="forecast-day-name">{getDayName(day.date)}</span>
                  <span className="forecast-date-sub">{getFormattedDate(day.date)}</span>
                  <span className="material-symbols-outlined forecast-day-icon">
                    {getConditionIcon(dayCondition)}
                  </span>
                  <div className="forecast-temps">
                    <span className="forecast-max">{day.max_temp}</span>
                    <span className="forecast-min">{day.min_temp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Reusable detailed statistics widget grid */}
        <WeatherStats
          windSpeed={stats.windSpeed}
          humidity={stats.humidity}
          uvIndex={stats.uvIndex}
          visibility={stats.visibility}
          sunrise={stats.sunrise}
          sunset={stats.sunset}
        />
      </div>
    </div>
  );
};

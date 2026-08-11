import { useState, useEffect } from 'react';
import { fetchWeather, fetchForecast } from './api/weatherApi';
import './App.css';
import { TopAppBar } from './components/TopAppBar';
import { BottomNav } from './components/BottomNav';
import { WeatherSearch } from './components/WeatherSearch';
import type { RecentCity } from './components/WeatherSearch';
import { WeatherResults } from './components/WeatherResults';
import type { WeatherInfo, ForecastInfo } from './components/WeatherResults';

// Default initial recents matching Stitch mockup layout
const DEFAULT_RECENTS: RecentCity[] = [
  { city: 'London', country: 'United Kingdom', temperature: '12°C', condition: 'cloudy' },
  { city: 'New York', country: 'United States', temperature: '19°C', condition: 'sunny' },
];

function App() {
  const [screen, setScreen] = useState<'search' | 'results'>('search');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'radar'>('home');
  const [recentCities, setRecentCities] = useState<RecentCity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Weather data states
  const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);
  const [forecastData, setForecastData] = useState<ForecastInfo | null>(null);
  const [generatedStats, setGeneratedStats] = useState({
    windSpeed: '12 km/h',
    humidity: '45%',
    uvIndex: '6 High',
    visibility: '10 km',
    sunrise: '05:42 AM',
    sunset: '08:14 PM',
  });

  // Load recent cities from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('recent_cities');
    if (saved) {
      try {
        setRecentCities(JSON.parse(saved));
      } catch {
        setRecentCities(DEFAULT_RECENTS);
      }
    } else {
      setRecentCities(DEFAULT_RECENTS);
      localStorage.setItem('recent_cities', JSON.stringify(DEFAULT_RECENTS));
    }
  }, []);

  // Parallax glass-card effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      const cards = document.querySelectorAll('.glass-card');
      cards.forEach((card) => {
        (card as HTMLElement).style.transform = `translate(${x * 12}px, ${y * 12}px)`;
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [screen]);

  // Main search operation
  const handleSearch = async (city: string, days: number = 3) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Fetch current weather and forecast via the api service layer
      const weather = await fetchWeather(city);
      const forecast = await fetchForecast(city, days);

      // Extract high/low from forecast if available
      let highTemp = '27°';
      let lowTemp = '19°';
      if (forecast.forecasts && forecast.forecasts.length > 0) {
        highTemp = forecast.forecasts[0].max_temp;
        lowTemp = forecast.forecasts[0].min_temp;
      }

      const enrichedWeather: WeatherInfo = {
        ...weather,
        highTemp,
        lowTemp,
        condition: parseFloat(weather.temperature) > 22 ? 'Clear Sky' : 'Partly Cloudy',
      };

      setWeatherData(enrichedWeather);
      setForecastData(forecast);

      // Generate rich stats based on temperature to populate mockup cards
      const tempNum = parseFloat(weather.temperature) || 20;
      const hash = city.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      const windVal = Math.round(8 + (tempNum % 12) + (hash % 5));
      const humidityVal = Math.round(35 + (tempNum % 25) + (hash % 10));
      const uvVal = tempNum > 26 ? '8 Very High' : tempNum > 20 ? '6 High' : tempNum > 14 ? '4 Moderate' : '2 Low';
      const visibilityVal = tempNum > 18 ? '10 km' : '8 km';
      
      // Dynamic sunrise/sunset based on city name hash
      const sunriseHour = 5 + (hash % 2);
      const sunriseMin = 10 + (hash % 45);
      const sunsetHour = 7 + (hash % 2);
      const sunsetMin = 10 + (hash % 45);

      setGeneratedStats({
        windSpeed: `${windVal} km/h`,
        humidity: `${humidityVal}%`,
        uvIndex: uvVal,
        visibility: visibilityVal,
        sunrise: `0${sunriseHour}:${sunriseMin < 10 ? '0' + sunriseMin : sunriseMin} AM`,
        sunset: `0${sunsetHour}:${sunsetMin < 10 ? '0' + sunsetMin : sunsetMin} PM`,
      });

      // Update recent cities in history
      const newRecent: RecentCity = {
        city: weather.city,
        country: weather.country,
        temperature: weather.temperature,
        condition: tempNum > 22 ? 'sunny' : 'cloudy',
      };

      setRecentCities((prev) => {
        const filtered = prev.filter((item) => item.city.toLowerCase() !== city.toLowerCase());
        const updated = [newRecent, ...filtered].slice(0, 4); // Limit to top 4
        localStorage.setItem('recent_cities', JSON.stringify(updated));
        return updated;
      });

      setScreen('results');
      setActiveTab('home');
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        'Could not fetch weather data. Please check the city name and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRecentCity = (city: string) => {
    handleSearch(city, 3);
  };

  const handleClearRecents = () => {
    setRecentCities([]);
    localStorage.removeItem('recent_cities');
  };

  const handleTabChange = (tab: 'home' | 'search' | 'radar') => {
    setActiveTab(tab);
    if (tab === 'search') {
      setScreen('search');
    }
  };

  // Determine dynamic weather theme gradient based on temp
  const getThemeClass = () => {
    if (!weatherData) return 'theme-clear';
    const tempNum = parseFloat(weatherData.temperature) || 20;
    if (tempNum > 24) return 'theme-clear';
    if (tempNum > 16) return 'theme-cloudy';
    if (tempNum > 8) return 'theme-rainy';
    return 'theme-snowy';
  };

  return (
    <div className="app-container selection-glow">
      {/* Background Atmosphere */}
      <div className={`weather-bg ${getThemeClass()}`}>
        <div className="bg-blur-orb-1"></div>
        <div className="bg-blur-orb-2"></div>
      </div>

      {/* Top Header */}
      <TopAppBar
        title={screen === 'results' ? `Go Weather - ${weatherData?.city}` : 'Go Weather'}
        showBack={screen === 'results'}
        onBack={() => setScreen('search')}
      />

      {/* Main Container */}
      <main className="main-content">
        {screen === 'search' ? (
          <WeatherSearch
            onSearch={handleSearch}
            recentCities={recentCities}
            onSelectRecentCity={handleSelectRecentCity}
            onClearRecents={handleClearRecents}
            isLoading={isLoading}
            error={error}
          />
        ) : (
          weatherData &&
          forecastData && (
            <WeatherResults
              weather={weatherData}
              forecast={forecastData}
              stats={generatedStats}
              onSearchAgain={() => setScreen('search')}
            />
          )
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={handleTabChange} />
    </div>
  );
}

export default App;

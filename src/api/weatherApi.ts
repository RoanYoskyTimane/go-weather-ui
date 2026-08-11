import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const weatherApi = axios.create({
  baseURL: BASE_URL,
});

export interface WeatherResponse {
  city: string;
  country: string;
  temperature: string;
}

export interface ForecastDay {
  date: string;
  max_temp: string;
  min_temp: string;
}

export interface ForecastResponse {
  city: string;
  country: string;
  forecasts: ForecastDay[];
}

export const fetchWeather = async (city: string): Promise<WeatherResponse> => {
  const response = await weatherApi.get<WeatherResponse>('/weather', {
    params: { city },
  });
  return response.data;
};

export const fetchForecast = async (city: string, days: number = 3): Promise<ForecastResponse> => {
  const response = await weatherApi.get<ForecastResponse>('/forecast', {
    params: { city, days },
  });
  return response.data;
};

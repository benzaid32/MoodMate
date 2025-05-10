import React, { createContext, useContext, useState } from 'react';

type Weather = {
  temperature: number;
  condition: 'clear' | 'cloudy' | 'rainy' | 'stormy';
  location: string;
  humidity?: number;
};

type WeatherContextType = {
  currentWeather: Weather | null;
  updateWeather: (weather: Weather) => void;
};

const WeatherContext = createContext<WeatherContextType>({
  currentWeather: null,
  updateWeather: () => {},
});

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<Weather | null>({
    temperature: 22,
    condition: 'clear',
    location: 'Current Location',
    humidity: 60,
  });
  
  const updateWeather = (weather: Weather) => {
    setCurrentWeather(weather);
  };
  
  return (
    <WeatherContext.Provider value={{ currentWeather, updateWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
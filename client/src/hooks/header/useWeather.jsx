import { useState, useEffect } from 'react';
import weatherApi from '../../api/weather.js';

const useWeather = (latitude, longitude) => {
  const [temperature, setTemperature] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');

  useEffect(() => {
    if (!latitude || !longitude) return;

    const fetchWeatherData = async () => {
      try {
        const weatherData = await weatherApi.fetchWeatherData(latitude, longitude);
        setTemperature(weatherData.temperature);
        setWeatherIcon(weatherData.weatherIcon);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchAirQualityData = async () => {
      try {
        const airQualityData = await weatherApi.fetchAirQualityData(latitude, longitude);
        setAirQuality(airQualityData);
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    fetchWeatherData();
    fetchAirQualityData();
  }, [latitude, longitude]);

  return { temperature, airQuality, weatherIcon };
};

export default useWeather;

import { useState, useEffect } from 'react';
import NepaliDate from 'nepali-date-converter';
import moment from 'moment'; // Import moment for Gregorian date (if necessary)
import 'moment/locale/ne'; // Import Nepali locale for moment (if necessary)
import { Link } from 'react-router-dom';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const Header = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [nepaliDate, setNepaliDate] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [location, setLocation] = useState(null); // State to store the location name
  const [locationCoordinates, setLocationCoordinates] = useState(null); // Store coordinates

  useEffect(() => {
    // Get the current Nepali date using NepaliDate
    const nepali = new NepaliDate();
    const formattedNepaliDate = nepali.format('ddd DD, MMMM YYYY', 'np');
    setNepaliDate(formattedNepaliDate);

    moment.locale('ne');
    setCurrentDate(moment().format('dddd, D MMMM YYYY'));

    // Function to get the user's location using Geolocation API
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocationCoordinates({ latitude, longitude });

            // Fetch location name using reverse geocoding API
            await fetchLocationName(latitude, longitude);

            // Fetch weather data based on user's location
            await fetchWeatherData(latitude, longitude);
            await fetchAirQualityData(latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
            // Handle error if geolocation fails
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    // Fetch location name using reverse geocoding API
    const fetchLocationName = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        const city = data.name; // Get city name
        const country = data.sys.country; // Get country code
        setLocation(`${city}, ${country}`); // Set location name
      } catch (error) {
        console.error('Error fetching location name:', error);
      }
    };

    // Fetch weather data based on coordinates
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        setTemperature(data.main.temp.toFixed(1));
        setWeatherIcon(`https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // Fetch air quality data based on coordinates
    const fetchAirQualityData = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        setAirQuality(data.list[0].main.aqi); // Air Quality Index (AQI)
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    // Fetch user's location and weather data
    getLocation();

  }, []); // Empty dependency array ensures this runs only on page refresh or initial load

  return (
    <div className="py-4">
      <div className="mainContent flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8">
        {/* Date Section on the Left with Nepali Date */}
        <div className="flex flex-col justify-center items-start text-sm text-gray-800 mb-2 sm:mb-0">
          <time className='text-center sm:text-left'>
            <div>{nepaliDate}</div>
            <span className="block text-gray-600 mt-0 sm:mt-2">{currentDate}</span>
          </time>
        </div>

        {/* Logo Section in the Middle */}
        <div className="logo flex justify-center items-center flex-shrink-0 mb-2 sm:mb-0">
          <Link to="/">
            <img src="/logo.png" alt="Sunaulo News" className="w-[120px] h-[50px]" />
          </Link>
        </div>

        {/* Weather and Air Quality Section on the Right */}
        <div className="todays-weather flex flex-col items-center sm:items-end text-sm text-gray-800">
          {temperature && weatherIcon && (
            <div className="temp flex items-center gap-2 sm:mb-2">
              <img src={weatherIcon} alt="Weather Icon" className="w-6 h-6" />
              <span>{temperature}°C</span>
              {location && (
                  <span>{location}</span>
                )}
            </div>
          )}
          {airQuality && (
            <div className="air-q">
              वायुको गुणस्तर: <span>{airQuality}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

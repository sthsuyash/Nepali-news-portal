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

  useEffect(() => {
    // Get the current Nepali date using NepaliDate
    const nepali = new NepaliDate(); // Get the current Nepali date
    const formattedNepaliDate = nepali.format('ddd DD, MMMM YYYY', 'np'); // Format the Nepali date
    setNepaliDate(formattedNepaliDate); // Set Nepali date for rendering

    // Set the current Gregorian date using moment in Nepali locale
    moment.locale('ne');
    setCurrentDate(moment().format('dddd, D MMMM YYYY'));

    // Fetch weather data (replace `YOUR_API_KEY` with actual values)
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        setTemperature(data.main.temp.toFixed(1));
        setWeatherIcon(`https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    // Fetch air quality data
    const fetchAirQualityData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=27.7172&lon=85.3240&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        setAirQuality(data.list[0].main.aqi); // Air Quality Index (AQI)
      } catch (error) {
        console.error('Error fetching air quality data:', error);
      }
    };

    fetchWeatherData();
    fetchAirQualityData();
  }, []); // Empty dependency array ensures this runs only on page refresh or initial load

  return (
    <div className="py-4">
      <div className="mainContent flex justify-between items-center px-8">
        {/* Date Section on the Left with Nepali Date */}
        <div className="flex flex-col justify-center items-start text-sm text-gray-800">
          <time>
            {/* Display Nepali Date on the top */}
            <div>{nepaliDate}</div>  {/* Make Nepali Date a block */}
            
            {/* Display Gregorian Date on the next line */}
            <span className="block text-gray-600 mt-2">{currentDate}</span> {/* Force line break */}
          </time>
        </div>

        {/* Logo Section in the Middle */}
        <div className="logo flex justify-center items-center flex-shrink-0">
          <Link to="/">
            <img
              src="/logo-old.png"
              alt="Sunaulo News"
              className="w-[200px] h-[30px]"
            />
          </Link>
        </div>

        {/* Weather and Air Quality Section on the Right */}
        <div className="todays-weather flex flex-col items-end text-sm text-gray-800">
          {temperature && weatherIcon && (
            <div className="temp flex items-center gap-2 mb-2">
              <img src={weatherIcon} alt="Weather Icon" className="w-6 h-6" />
              <span>{temperature}°C काठमाडौं</span>
            </div>
          )}
          {airQuality && (
            <div className="air-q">
              काठमाडौंमा वायुको गुणस्तर: <span>{airQuality}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

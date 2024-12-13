import { Link } from 'react-router-dom';
import useDate from "../../hooks/header/useDate";
import useLocation from '../../hooks/header/useLocation';
import useWeather from '../../hooks/header/useWeather';

const Header = () => {
  const { currentDate, nepaliDate } = useDate();
  const { location, locationCoordinates } = useLocation();
  const { temperature, airQuality, weatherIcon } = useWeather(locationCoordinates?.latitude, locationCoordinates?.longitude);

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
              {location && <span>{location}</span>}
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

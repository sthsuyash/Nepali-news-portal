import { OPENWEATHER_API_KEY } from "../config";

const fetchLocationName = async (latitude, longitude) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        if (data.cod !== 200) {
            throw new Error('Unable to fetch location data');
        }
        const city = data.name;
        const country = data.sys.country;
        return `${city}, ${country}`;
    } catch (error) {
        console.error('Error fetching location name:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};

const fetchWeatherData = async (latitude, longitude) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        if (data.cod !== 200) {
            throw new Error('Unable to fetch weather data');
        }
        return {
            temperature: data.main.temp.toFixed(1),
            weatherIcon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};

const fetchAirQualityData = async (latitude, longitude) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();
        if (!data.list || !data.list[0] || typeof data.list[0].main.aqi === 'undefined') {
            throw new Error('Unable to fetch valid air quality data');
        }
        return data.list[0].main.aqi; // Air Quality Index (AQI)
    } catch (error) {
        console.error('Error fetching air quality data:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export default {
    fetchLocationName,
    fetchWeatherData,
    fetchAirQualityData,
};

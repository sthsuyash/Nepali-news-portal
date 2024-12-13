import { useState, useEffect } from 'react';
import locationApi from "../../api/weather.js";

const useLocation = () => {
  const [location, setLocation] = useState(null); // Location name (e.g., Kathmandu, or fetched location)
  const [locationCoordinates, setLocationCoordinates] = useState(null); // Location coordinates

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocationCoordinates({ latitude, longitude });
            try {
              const locationName = await locationApi.fetchLocationName(latitude, longitude);
              setLocation(locationName); // Set the fetched location name
            } catch (error) {
              console.error('Error fetching location:', error);
              // If error, fallback to Kathmandu
              setLocation("Kathmandu");
              setLocationCoordinates({ latitude: 27.7, longitude: 85.3 });
            }
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocation("Kathmandu");
            setLocationCoordinates({ latitude: 27.7, longitude: 85.3 });
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        // Fallback to Kathmandu if geolocation is unsupported
        setLocation("Kathmandu");
        setLocationCoordinates({ latitude: 27.7, longitude: 85.3 });
      }
    };

    getLocation();
  }, []);

  return { location, locationCoordinates };
};

export default useLocation;

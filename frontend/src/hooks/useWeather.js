import { useState, useEffect } from 'react';
import { weatherService } from '../services/weatherService';

export const useWeather = (district = 'Akola') => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await weatherService.getWeather(district);
        if (isMounted) setWeather(data);
      } catch (err) {
        if (isMounted) setError('Unable to load weather telemetry.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();
    return () => { isMounted = false; };
  }, [district]);

  return { weather, loading, error };
};

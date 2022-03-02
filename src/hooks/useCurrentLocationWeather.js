import axios from 'axios';
import {useEffect, useState} from 'react';

import useLocation from '../hooks/useLocation';

const API_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b3d279c3d0ec08d4fc55a9c59238c55c&lang=fr&units=metric`;

export default () => {
  const {
    isAuthorized,
    isLoading: locationIsLoading,
    coordonnates,
  } = useLocation();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!locationIsLoading && coordonnates && isAuthorized) {
      const fetch = async () => {
        try {
          const response = await axios.get(
            API_URL(coordonnates.latitude, coordonnates.longitude),
          );
          setData(response.data)
          setIsLoading(false)
        } catch (e) {
          setError(e)
          setIsLoading(false)
        }
      }
      fetch()
    }
  }, [locationIsLoading, coordonnates, isAuthorized])

  return {isAuthorized, isLoading: locationIsLoading || isLoading, data, error};
}

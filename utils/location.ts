import axios from 'axios';
import { Location } from '../types/places';

const MAIN_URL = 'https://eu1.locationiq.com/v1';
const API_KEY = 'pk.8f403b0ba1e12120348868a9799feaf7';

export const getGeocode = async (location: Location) => {
  const { latitude, longitude } = location;
  const response = await axios.get(
    `${MAIN_URL}/reverse?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
  );
  const { country, city } = response.data?.address;
  return `${country}: ${city}`;
};

import api from './api';
import { mockWeather } from '../data/mockWeather';

export const weatherService = {
  async getWeather(district = 'Akola') {
    await new Promise((r) => setTimeout(r, 250));
    return mockWeather[district] || mockWeather['Akola'];
  }
};

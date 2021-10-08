import axios from 'axios';
import { API_KEY } from '../util/APIKey';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.openweathermap.org/',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  getWeather = (lat, lon) => {
    return this.api.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
  }

  getForecast = (lat, lon) => {
    return this.api.get(`/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
  }

  getOneCallApi = (lat, lon) => {
    return this.api.get(`/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&units=metric&appid=${API_KEY}`);
  }
  
}

export default Api;
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_KEY } from '../../../WEATHER-APP/config';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private geocodingApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) {}

  getWeather(city: string, unit: string) {
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=' +
        API_KEY +
        '&units=' +
        unit
    );
  }

  getCurrentWeather(latitude: number, longitude: number) {
    return this.http.get(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
  }
}

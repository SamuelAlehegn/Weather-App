import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private geocodingApiUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  
  constructor(private http: HttpClient) {}

  getWeather(city: string, unit: string) {
    // https://api.openweathermap.org/data/2.5/weather?q=London&appid=6101a5f570d2853d3cca5d93c9b8a6db
    // https://api.openweathermap.org/data/2.5/weather?q=London&appid=6101a5f570d2853d3cca5d93c9b8a6db&units=metric
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=6101a5f570d2853d3cca5d93c9b8a6db&units=' +
        unit
    );
  }

  getCurrentWeather(latitude: number, longitude: number) {
    return this.http.get(
      // 'https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid=6101a5f570d2853d3cca5d93c9b8a6db'
      'https://api.openweathermap.org/geo/1.0/reverse?lat=9.0372174&lon=38.8758198&appid=6101a5f570d2853d3cca5d93c9b8a6db'
      // `http://api.openweathermap.org/geo/1.0/reverse?lat={latitude}&lon={longitude}&appid=6101a5f570d2853d3cca5d93c9b8a6db` 
    );
  }
}

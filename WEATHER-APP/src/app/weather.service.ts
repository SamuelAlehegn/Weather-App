import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http:  HttpClient) { }

  getWeather(city:string, unit:string) {
    // https://api.openweathermap.org/data/2.5/weather?q=London&appid=6101a5f570d2853d3cca5d93c9b8a6db
    // https://api.openweathermap.org/data/2.5/weather?q=London&appid=6101a5f570d2853d3cca5d93c9b8a6db&units=metric
    return this.http.get(
      'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=6101a5f570d2853d3cca5d93c9b8a6db&units=' + unit
    );
  }
}

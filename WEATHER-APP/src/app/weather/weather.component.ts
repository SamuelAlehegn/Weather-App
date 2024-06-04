import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  weather: any;
  temp: number = 0;
  feelsLikeTemp: number = 0;
  pressure: number = 0;
  humidity: number = 0;
  summary: string = '';
  iconUrl: string = '';
  city: string = 'paris';
  units: string = 'standard';
  inputCity: string = 'paris'; // default
  unit: string = ' K';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData(): void {
    this.weatherService.getWeather(this.city, this.units).subscribe({
      next: (res: any) => {
        console.log(res);
        this.weather = res;
        this.temp = this.weather.main.temp;
        this.feelsLikeTemp = this.weather.main.feels_like;
        this.pressure = this.weather.main.pressure;
        this.humidity = this.weather.main.humidity;
        this.summary = this.weather.weather[0].main;

        this.iconUrl =
          'https://openweathermap.org/img/wn/' +
          this.weather.weather[0].icon +
          '@2x.png';
      },
      error: (error: { message: any }) => console.log(error.message),
      complete: () => console.info('API call completed'),
    });
  }

  onSubmit(): void {
    if (this.city) {
      this.inputCity = this.city;
      this.getWeatherData();
    }
  }

  setUnit(unit: string): void {
  
    if (unit === 'si') {
      this.unit = ' K';
      this.units = 'standard';
    } else if (unit === 'metric') {
      this.unit = ' °C';
      this.units = 'metric';
    } else if (unit === 'imperial') {
      this.unit = ' °F';
      this.units = 'imperial';
    } else {
      this.unit = ' K';
      this.units = 'standard';
    }

    this.getWeatherData();
  }

  resetForm(): void {
    this.inputCity = '';
    this.city = '';
    this.unit = ' ';
    this.units = 'standard';
    this.weather = null;
    this.temp = 0;
    this.feelsLikeTemp = 0;
    this.pressure = 0;
    this.humidity = 0;
    this.summary = '';
    this.iconUrl = '';
  }
}

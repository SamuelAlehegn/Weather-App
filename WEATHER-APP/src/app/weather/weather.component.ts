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
  city: string = '';
  units: string = 'standard';
  inputCity: string = '';
  unit: string = ' K';
  latitude: number = 0;
  longitude: number = 0;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getLocationWeather();
  }

  getWeatherData(): void {
    this.weatherService.getWeather(this.city, this.units).subscribe({
      next: (res: any) => {
        this.weather = res;
        this.updateWeatherData();
      },
      error: (error: { message: any }) => console.error('Error fetching weather data:', error.message),
      complete: () => console.info('Weather API call completed'),
    });
  }

  private updateWeatherData(): void {
    if (this.weather && this.weather.main) {
      this.temp = this.weather.main.temp;
      this.feelsLikeTemp = this.weather.main.feels_like;
      this.pressure = this.weather.main.pressure;
      this.humidity = this.weather.main.humidity;
      this.summary = this.weather.weather[0]?.main || '';
      this.iconUrl = this.weather.weather[0]?.icon
        ? `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`
        : '';
    }
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

  getLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handleLocationSuccess.bind(this),
        this.handleLocationError.bind(this)
      );
    } else {
      this.handleLocationError({
        code: 0,
        message: 'Geolocation is not supported by this browser.',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      });
    }
  }

  private handleLocationSuccess(position: GeolocationPosition) {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    
    this.weatherService.getCurrentWeather(this.latitude, this.longitude).subscribe({
      next: (res: any) => {
        if (res && res.length > 0) {
          this.inputCity = res[0].state || res[0].name;
          this.city = this.inputCity;
          this.getWeatherData();
        } else {
          this.handleLocationError({ code: 0, message: 'Unable to determine location.' } as GeolocationPositionError);
        }
      },
      error: (error: { message: any }) => this.handleLocationError(error.message),
      complete: () => console.info('Location API call completed'),
    });
  }

  private handleLocationError(error: GeolocationPositionError): void {
    // Handle the error here
    console.error('Geolocation error:', error.message);
  }

  private setDefaultCityWeather() {
    this.city = 'Paris';
    this.inputCity = 'Paris';
    this.getWeatherData();
  }
}

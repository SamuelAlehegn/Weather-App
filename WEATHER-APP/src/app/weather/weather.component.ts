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
    if (navigator.geolocation) {
      this.getLocationWeather();
    } else {
      this.setDefaultCityWeather;
    }
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

  getLocationWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          // this.getCityByCoordinates(); 

          this.weatherService
            .getCurrentWeather(this.latitude, this.longitude)
            .subscribe({
              next: (res: any) => {
                console.log("location", res); 
                this.inputCity = res[0].state;
                this.city = this.inputCity;
                this.getWeatherData();
              },
              error: (error: { message: any }) => console.log(error.message),
              complete: () => console.info('API call completed'),
            });
          
        },
        (error) => {
          console.log('Error occurred while retrieving location:', error);
          this.setDefaultCityWeather();
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      this.setDefaultCityWeather();
    }
  }

  setDefaultCityWeather() {
    this.city = 'paris'; // Default city if the user does not grant access to their location
    this.inputCity = 'paris';
    this.getWeatherData();
  }
}

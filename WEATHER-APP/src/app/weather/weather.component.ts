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
  city: any = 'paris';
  unit: string = 'metric';
  inputCity: string = "paris";


  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {

    this.inputCity = this.onSubmit();
    console.log(this.inputCity)

    this.weatherService.getWeather(this.inputCity, this.unit).subscribe({
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
      complete: () => console.info('API  call completed'),
    });
  }

  onSubmit() {
    if (this.city) {
      return this.city;
    }
  }
}

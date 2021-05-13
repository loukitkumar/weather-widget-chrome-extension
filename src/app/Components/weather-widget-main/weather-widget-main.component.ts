import { Component, OnInit } from '@angular/core';
import { WeatherService } from "../../weather.service";

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent implements OnInit {

   WeatherData:any;
   city:string;
  // data:any;
  constructor(private weatherService:WeatherService) { }

  ngOnInit() {
    this.WeatherData = {
      main : {},
      sys:{},
      isDay: true
    };
    this.city="mumbai";
     this.getWeatherData(this.city);

    console.log(this.WeatherData);
  }
/* by promise
async getWeatherData(value:string)
  {
    this.data=await this.weatherService.getWeatherData(value);
    this.setWeatherData(this.data);
     // or
     // const res= await this.weatherService.getWeatherData(value);
     // this.data= res;
     // this.setWeatherData(this.data);
  }
*/

// by observable
  getWeatherData(value:string)
  {
    this.weatherService.getWeatherData(value)
        .subscribe(data=> {console.log(data);this.setWeatherData(data);});
  }

  setWeatherData(data:any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);

  }

   changedata(value:string){
     this.city=value;
    this.getWeatherData(this.city);
   };
}

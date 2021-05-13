import { Injectable } from '@angular/core';
import { Weather } from "./weather";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable,of } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

    constructor(private http:HttpClient) { }

   getWeatherData(value:string): Observable<any>{

  return  this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=ff1bc4683fc7325e9c57e586c20cc03e`);


           /*
                       .then(response=>{
                         if(response.ok)
                         return response.json();
                          else
                          {
                            throw new Error('Something went wrong');
                          }
                       })
                       .catch((error)=>{
                         console.log(error);
                       });
           */
   }

}

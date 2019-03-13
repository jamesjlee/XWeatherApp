import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";

//NOTE: Normally would store this data in a database, but for ease of use we're using localstorage
@Injectable({
  providedIn: "root"
})
export class WeatherService {
  constructor() {}

  apiKey = "785ce35356910695d41b4e96e8dd7d03";
  units = "imperial";

  private weatherStorage = new Subject<any>();

  watchWeatherStorage(): Observable<any> {
    return this.weatherStorage.asObservable();
  }

  setWeatherArrInStorage(cities: any) {
    localStorage.setItem(
      "weatherArr-" + localStorage.getItem("signedEmail"),
      JSON.stringify(cities)
    );
    this.weatherStorage.next(JSON.stringify(cities));
  }

  getWeatherArrFromStorage(): any {
    return (
      JSON.parse(
        localStorage.getItem(
          "weatherArr-" + localStorage.getItem("signedEmail")
        )
      ) || JSON.parse("[]")
    );
  }

  removeWeatherLocationFromStorage(id: string) {
    let weatherArr = this.getWeatherArrFromStorage();
    weatherArr = weatherArr.filter((item) => {
      return item.id !== id;
    });
    this.setWeatherArrInStorage(weatherArr);
    // this.weatherStorage.next(JSON.stringify(weatherArr));
  }

  async getWeather(city: string) {
    try {
      const response = await fetch(
        "/data/2.5/weather?q=" +
          city +
          "&units=" +
          (localStorage.getItem(
            "tempFormat-" + localStorage.getItem("signedEmail")
          ) || this.units) +
          "&appid=" +
          this.apiKey,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getFiveDayForecast(id: string) {
    try {
      const response = await fetch(
        "/data/2.5/forecast?id=" +
          id +
          "&units=" +
          (localStorage.getItem(
            "tempFormat-" + localStorage.getItem("signedEmail")
          ) || this.units) +
          "&appid=" +
          this.apiKey,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

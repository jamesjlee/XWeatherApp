import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WeatherService } from "../services/weather.service";

@Component({
  selector: "app-weather-widget",
  templateUrl: "./weather-widget.component.html",
  styleUrls: ["./weather-widget.component.css"]
})
export class WeatherWidgetComponent implements OnInit {
  weatherArr: any;

  constructor(private weatherService: WeatherService, private router: Router) {
    this.weatherArr = JSON.parse(weatherService.getWeatherArrFromStorage());
  }

  ngOnInit() {
    this.weatherService.watchWeatherStorage().subscribe((data: any) => {
      let result = JSON.parse(data);
      if (this.weatherArr.length < result.length) {
        //if the current weather array length is less than the updated storage array, then add the last element
        let lastEl = result[result.length - 1];
        this.weatherArr.push(lastEl);
      }

      if (this.weatherArr.length > result.length) {
        //if the current weather array length is greater than the updated storage array, then remove the first occurence of that element
        this.weatherArr = result;
      }
    });
  }

  removeLocation(id: string) {
    this.weatherService.removeWeatherLocationFromStorage(id);
  }

  moreInfo(id: string) {
    this.router.navigate(["moreinfo/" + id]);
  }
}

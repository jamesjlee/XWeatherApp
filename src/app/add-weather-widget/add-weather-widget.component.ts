import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { WeatherService } from "../services/weather.service";

declare let $: any;

@Component({
  selector: "app-add-weather-widget",
  templateUrl: "./add-weather-widget.component.html",
  styleUrls: ["./add-weather-widget.component.css"]
})
export class AddWeatherWidgetComponent implements OnInit {
  @ViewChild("modal") modal: ElementRef;
  city: string;
  invalidCity: boolean;
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}

  addCity() {
    $(this.modal.nativeElement).modal("show");
  }

  async addCityToLocalStorage() {
    try {
      const weather = await this.weatherService.getWeather(this.city);
      if (weather.cod === "404") {
        //if there is a 404 city not found error
        this.invalidCity = true;
      } else {
        //proceed
        this.invalidCity = false;
        let cities = this.weatherService.getWeatherArrFromStorage();
        cities.push({
          id: weather.id,
          location: weather.name,
          temp: weather.main.temp,
          high: weather.main.temp_max,
          low: weather.main.temp_min,
          overcastState: weather.weather[0].main,
          format:
            localStorage.getItem(
              "tempFormat-" + localStorage.getItem("signedEmail")
            ) || "imperial"
        });
        this.weatherService.setWeatherArrInStorage(cities);
        this.city = "";
        $(this.modal.nativeElement).modal("hide");
      }
    } catch (err) {
      console.log(err);
    }
  }

  removeCityFromLocalStorage() {}
}

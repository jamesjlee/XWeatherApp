import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { WeatherService } from "../services/weather.service";
import { convertFtoC, convertCtoF } from "../utils/convertCtoFandFtoC";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  radioButtonToggle: boolean;
  settingsSaved: boolean = false;
  isLoggedIn: boolean;
  @ViewChild("fahrenheight") fahrenheight: ElementRef;
  @ViewChild("celsius") celsius: ElementRef;

  constructor(private router: Router, private weatherService: WeatherService) {}

  ngOnInit() {
    if (
      localStorage.getItem(
        "tempFormat-" + localStorage.getItem("signedEmail")
      ) === "imperial"
    ) {
      this.radioButtonToggle = true;
      return;
    }

    if (
      localStorage.getItem(
        "tempFormat-" + localStorage.getItem("signedEmail")
      ) === "metric"
    ) {
      this.radioButtonToggle = false;
      return;
    }

    //default set it to true or imperial format
    this.radioButtonToggle = true;
  }

  celsiusOrFahrenheightClicked() {
    this.radioButtonToggle = !this.radioButtonToggle;
    this.settingsSaved = false;
  }

  saveSettings() {
    if (this.fahrenheight.nativeElement.classList.contains("active")) {
      localStorage.setItem(
        "tempFormat-" + localStorage.getItem("signedEmail"),
        "imperial"
      );
      let arr = this.weatherService.getWeatherArrFromStorage();
      const nArr = arr.map((location) => {
        if (location.format === "metric") {
          location.high = convertCtoF(location.high);
          location.low = convertCtoF(location.low);
          location.temp = convertCtoF(location.temp);
          location.format = "imperial";
        }
        return location;
      });

      this.weatherService.setWeatherArrInStorage(nArr);
    }

    if (this.celsius.nativeElement.classList.contains("active")) {
      localStorage.setItem(
        "tempFormat-" + localStorage.getItem("signedEmail"),
        "metric"
      );
      let arr = this.weatherService.getWeatherArrFromStorage();
      const nArr = arr.map((location) => {
        if (location.format === "imperial") {
          location.high = convertFtoC(location.high);
          location.low = convertFtoC(location.low);
          location.temp = convertFtoC(location.temp);
          location.format = "metric";
        }
        return location;
      });
      this.weatherService.setWeatherArrInStorage(nArr);
    }

    this.settingsSaved = true;
  }
}

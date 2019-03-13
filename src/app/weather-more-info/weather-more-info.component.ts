import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WeatherService } from "../services/weather.service";
import * as moment from "moment";
import { Chart } from "chart.js";
@Component({
  selector: "app-weather-more-info",
  templateUrl: "./weather-more-info.component.html",
  styleUrls: ["./weather-more-info.component.css"]
})
export class WeatherMoreInfoComponent implements OnInit {
  moreInfoArrDisplay: Array<any>;
  type: string;
  data: object;
  options: object;
  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.weatherService.getFiveDayForecast(params["id"]).then((data) => {
        let date = "";
        let moreInfoArr = [];
        let dates = [];
        let tempMax = [];
        let tempMin = [];
        data.list.forEach((item) => {
          if (moment(item.dt_txt).format("YYYY-MM-DD") !== date) {
            let obj = {
              dayOfWeek: "",
              high: "",
              low: "",
              overcastState: ""
            };
            obj.dayOfWeek = moment(item.dt_txt).format("ddd");
            obj.high = item.main.temp_max;
            obj.low = item.main.temp_min;
            obj.overcastState = item.weather[0].main;
            moreInfoArr.push(obj);
            dates.push(moment(item.dt_txt).format("ddd"));
            tempMax.push(item.main.temp_max);
            tempMin.push(item.main.temp_min);
          }
          date = moment(item.dt_txt).format("YYYY-MM-DD");
        });

        this.type = "line";
        this.data = {
          labels: dates,
          datasets: [
            {
              data: tempMax,
              label: "Max Tempature",
              borderColor: "#3cba9f",
              fill: false
            },
            {
              data: tempMin,
              label: "Min Tempature",
              borderColor: "#ffcc00",
              fill: false
            }
          ]
        };
        this.options = {
          responsive: true,
          maintainAspectRatio: false
        };

        this.moreInfoArrDisplay = moreInfoArr;
      });
    });
  }
}

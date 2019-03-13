import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LandingComponent } from "./landing/landing.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthService } from "./services/auth.service";
import { AddWeatherWidgetComponent } from "./add-weather-widget/add-weather-widget.component";
import { WeatherWidgetComponent } from "./weather-widget/weather-widget.component";
import { WeatherService } from "./services/weather.service";
import { WeatherMoreInfoComponent } from "./weather-more-info/weather-more-info.component";
import { ChartModule } from "angular2-chartjs";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    LandingComponent,
    PageNotFoundComponent,
    AddWeatherWidgetComponent,
    WeatherWidgetComponent,
    WeatherMoreInfoComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ChartModule],
  providers: [AuthService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {}

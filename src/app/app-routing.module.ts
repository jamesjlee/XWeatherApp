import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LandingComponent } from "./landing/landing.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WeatherMoreInfoComponent } from "./weather-more-info/weather-more-info.component";
import { SettingsComponent } from "./settings/settings.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/landing",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "landing",
    component: LandingComponent
  },
  {
    path: "moreinfo/:id",
    component: WeatherMoreInfoComponent
  },
  {
    path: "settings",
    component: SettingsComponent
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

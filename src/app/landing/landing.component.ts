import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {
  constructor(authService: AuthService, router: Router) {
    if (!authService.isLoggedIn()) {
      router.navigate(["login"]);
    }
  }

  ngOnInit() {}
}

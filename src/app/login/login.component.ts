import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  login: any = {};
  wrongPassword: boolean = false;
  password: String = "test1234";
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    if (authService.isLoggedIn()) {
      router.navigate(["landing"]);
    }
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.login.password === this.password) {
      this.isLoggedIn = true;
      await this.authService.login(this.login.email, this.login.password);
      this.router.navigate(["landing"]);
    } else {
      this.wrongPassword = true;
    }
  }
}

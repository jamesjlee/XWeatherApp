import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}

  async login(email: string, password: string) {
    const data = {
      email: email,
      password: password
    };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const json = await response.json();
      localStorage.setItem("authToken", json.token);

      localStorage.setItem("email", data.email);

      const expiresAt = moment().add(json.expiresIn, "second");

      localStorage.setItem(
        "tokenExpiresAt",
        JSON.stringify(expiresAt.valueOf())
      );
      return json;
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiresAt");
  }

  public isLoggedIn() {
    return moment().isBefore(
      moment(JSON.parse(localStorage.getItem("tokenExpiresAt")))
    );
  }
}

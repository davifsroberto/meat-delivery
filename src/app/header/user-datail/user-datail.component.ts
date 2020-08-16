import { Component, OnInit } from "@angular/core";

import { LoginService } from "app/security/login/login.service";

import { User } from "app/security/login/user.model";

@Component({
  selector: "mt-user-datail",
  templateUrl: "./user-datail.component.html",
  styleUrls: ["./user-datail.component.css"],
})
export class UserDatailComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit() {}

  user(): User {
    return this.loginService.user;
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  login() {
    this.loginService.handleLogin();
  }

  logout() {
    this.loginService.logout();
  }
}

import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { LoginService } from "./login.service";
import { NotificationService } from "app/shared/messages/notification.service";

@Component({
  selector: "mt-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  natigateTo: string;
  loginForme: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForme = this.fb.group({
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required]),
    });
    this.natigateTo = this.activatedRoute.snapshot.params["to"] || btoa("/");
  }

  login() {
    this.loginService
      .login(this.loginForme.value.email, this.loginForme.value.password)
      .subscribe(
        (user) => this.notificationService.notify(`Bem vindo, ${user.name}`),
        (response) => this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate([atob(this.natigateTo)]);
        }
      );
  }
}

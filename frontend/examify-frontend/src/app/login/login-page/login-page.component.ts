import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { LoginService } from "../login.service";


@Component({
    selector: "ex-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {

    private username: string;
    private password: string;

    constructor(
        private loginService: LoginService,
        private router: Router,
    ) { }

    public ngOnInit() {

    }

    public login() {
        this.loginService.login(this.username, this.password).subscribe();
    }
}

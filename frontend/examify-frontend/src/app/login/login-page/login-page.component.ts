import * as _ from "lodash";
import { AbstractControl, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ERRORS } from "../../common/const/errors";
import { checkSpaces } from "../../common/validators/check-spaces";
import { LoginService } from "../login.service";
import { BaseFormComponent } from "../../common/base-form/base-form.component";


@Component({
    selector: "ex-login-page",
    templateUrl: "./login-page.component.html",
    styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent extends BaseFormComponent implements OnInit {

    private username: string;
    private password: string;

    constructor(
        private loginService: LoginService,
        private router: Router,
        private formBuilder: FormBuilder
    ) {
        super();
    }

    public ngOnInit() {
        this.formModel = this.createFormControls();
        this.formGroup = this.formBuilder.group(this.formModel);

    }

    public login() {
        this.loginService.login(this.formGroup.get("username").value, this.formGroup.get("password").value)
            .subscribe(
                (data) => {
                    console.log(data);
                },
                (err) => {
                    this.formGroup.get("username").setErrors({ badCredentials: true });
                    this.formGroup.get("password").setErrors({ badCredentials: true });
                }
            );
    }

    protected createFormControls(): { [key: string]: AbstractControl; } {
        return {
            username: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50)])),
            password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(50), checkSpaces()])),
        };
    }

    public createErrors() {
        return {
            username: {
                required: ERRORS.validations.required,
                minlength: ERRORS.validations.minlength,
                maxlength: ERRORS.validations.maxlength,
                badCredentials: ERRORS.validations.badCredentials
            },
            password: {
                required: ERRORS.validations.required,
                minlength: ERRORS.validations.minlength,
                maxlength: ERRORS.validations.maxlength,
                hasSpaces: ERRORS.validations.hasSpaces,
                badCredentials: ERRORS.validations.badCredentials
            }
        };
    }
}

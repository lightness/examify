import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routing } from "./login.routing";
import { LoginService } from "./login.service";
import { LoginPageComponent } from "./login-page/login-page.component";
import { WrapperFormModule } from "../common/base-form/wrapper-form.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        WrapperFormModule
    ],
    providers: [
        LoginService,
    ],
    declarations: [
        LoginPageComponent,
    ]
})
export class LoginModule { }

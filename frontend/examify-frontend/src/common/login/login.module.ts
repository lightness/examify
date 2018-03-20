import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routing } from "./login.routing";
import { LoginService } from "./login.service";
import { LoginPageComponent } from "./login-page/login-page.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing
    ],
    providers: [
        LoginService,
    ],
    declarations: [
        LoginPageComponent,
    ]
})
export class LoginModule { }

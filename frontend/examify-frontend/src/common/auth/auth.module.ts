import { NgModule } from "@angular/core";

import { AuthService } from "./auth.service";
import { AuthInterceptor } from "./auth.interceptor";


@NgModule({
    providers: [
        AuthService
    ]
})
export class AuthModule { }

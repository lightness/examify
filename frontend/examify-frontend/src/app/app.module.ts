import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { routing } from "./app.routing";
import { ApiService } from "../common/api.service";
import { AuthModule } from "../common/auth/auth.module";
import { MenuModule } from "./menu/menu.module";
import { AppComponent } from "./app.component";
import { AuthInterceptor } from "../common/auth/auth.interceptor";
import { CalculationsService } from "../common/calculations.service";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthModule,
        MenuModule,
        routing,
    ],
    providers: [
        ApiService,
        CalculationsService,
        [
            { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
        ]
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

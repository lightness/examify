import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { routing } from "./app.routing";
import { ApiService } from "../common/api.service";
import { AuthModule } from "../common/auth/auth.module";
import { AppComponent } from "./app.component";
import { AuthInterceptor } from "../common/auth/auth.interceptor";
import { MenuModule } from "./menu/menu.module";


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
    [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

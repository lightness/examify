import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { routing } from "./app.routing";
import { ApiService } from "./common/api.service";
import { AuthModule } from "./common/auth/auth.module";
import { MenuModule } from "./menu/menu.module";
import { AppComponent } from "./app.component";
import { TopicResolver } from "./common/resolvers/topic.resolver";
import { AuthInterceptor } from "./common/auth/auth.interceptor";
import { CommonApiService } from "./common/common-api.service";
import { QuestionResolver } from "./common/resolvers/question.resolver";
import { AllUsersResolver } from "./common/resolvers/all-users.resolver";
import { AllTopicsResolver } from "./common/resolvers/all-topics.resolver";
import { CalculationsService } from "./common/calculations.service";
import { QuestionsByTopicResolver } from "./common/resolvers/questions-by-topic.resolver";
import { RoutingService } from "./common/routing.service";


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
        RoutingService,
        CommonApiService,
        CalculationsService,
        [
            { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
        ],

        // Resolvers
        AllTopicsResolver,
        AllUsersResolver,
        QuestionResolver,
        QuestionsByTopicResolver,
        TopicResolver

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

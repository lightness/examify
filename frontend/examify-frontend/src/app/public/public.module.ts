import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routing } from "./public.routing";
import { PublicService } from "./public.service";
import { ExamComponent } from "./exam/exam.component";
import { TopicResolver } from "./common/topic.resolver";
import { PublicComponent } from "./public.component";
import { TheoryComponent } from "./theory/theory.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        PublicComponent,
        TheoryComponent,
        ExamComponent
    ],
    providers: [
        PublicService,
        TopicResolver
    ]
})
export class PublicModule { }

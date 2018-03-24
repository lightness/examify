import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routing } from "./public.routing";
import { ExamComponent } from "./exam/exam.component";
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
    providers: []
})
export class PublicModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { FormControlWrapperComponent, FormValidationMessagesComponent } from "./components";


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [FormControlWrapperComponent, FormValidationMessagesComponent],
    exports: [FormControlWrapperComponent, FormValidationMessagesComponent]
})
export class WrapperFormModule { }

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MenuComponent } from "./menu.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        MenuComponent,
    ],
    providers: [
    ],
    exports: [
        MenuComponent
    ]
})
export class MenuModule { }

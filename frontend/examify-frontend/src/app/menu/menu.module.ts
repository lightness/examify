import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { MenuComponent } from "./menu.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        NgbDropdownModule.forRoot()
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

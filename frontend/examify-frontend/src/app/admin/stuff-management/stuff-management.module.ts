import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { routing } from "./stuff-management.routing";
import { ManageUsersComponent } from "./manage-users/manage-users.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        ManageUsersComponent
    ],
    providers: []
})
export class StuffManagementModule { }

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";

import { routing } from "./stuff-management.routing";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { EditUserComponent } from "./edit-user/edit-user.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MultiselectDropdownModule,
        routing
    ],
    declarations: [
        ManageUsersComponent,
        EditUserComponent
    ],
    providers: []
})
export class StuffManagementModule { }

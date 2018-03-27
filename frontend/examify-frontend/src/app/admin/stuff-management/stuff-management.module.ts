import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";

import { routing } from "./stuff-management.routing";
import { EditRoleComponent } from "./edit-role/edit-role.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { ManageRolesComponent } from "./manage-roles/manage-roles.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MultiselectDropdownModule,
        routing
    ],
    declarations: [
        ManageUsersComponent,
        ManageRolesComponent,
        EditUserComponent,
        EditRoleComponent
    ],
    providers: []
})
export class StuffManagementModule { }

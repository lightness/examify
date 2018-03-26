import { Routes, RouterModule } from "@angular/router";

import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { AllUsersWithRolesResolver } from "../../common/resolvers/all-users-with-roles.resolver";


const routes: Routes = [
    {
        path: "users",
        component: ManageUsersComponent,
        resolve: {
            users: AllUsersWithRolesResolver,
        }
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/admin/stuff-management/users"
    }
];

export const routing = RouterModule.forChild(routes);

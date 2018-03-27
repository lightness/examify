import { Routes, RouterModule } from "@angular/router";

import { UserResolver } from "../../common/resolvers/user.resolver";
import { AllUsersResolver } from "../../common/resolvers/all-users.resolver";
import { AllRolesResolver } from "../../common/resolvers/all-roles.resolver";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";


const routes: Routes = [
    {
        path: "users",
        component: ManageUsersComponent,
        resolve: {
            users: AllUsersResolver,
        }
    },
    {
        path: "user/new",
        component: EditUserComponent,
        resolve: {
            allRoles: AllRolesResolver
        }
    },
    {
        path: "user/:userId",
        component: EditUserComponent,
        resolve: {
            user: UserResolver,
            allRoles: AllRolesResolver
        }
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/admin/stuff-management/users"
    }
];

export const routing = RouterModule.forChild(routes);

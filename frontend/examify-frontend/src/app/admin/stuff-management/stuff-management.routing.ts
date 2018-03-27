import { Routes, RouterModule } from "@angular/router";

import { RoleResolver } from "../../common/resolvers/role.resolver";
import { UserResolver } from "../../common/resolvers/user.resolver";
import { AllUsersResolver } from "../../common/resolvers/all-users.resolver";
import { AllRolesResolver } from "../../common/resolvers/all-roles.resolver";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { ManageRolesComponent } from "./manage-roles/manage-roles.component";
import { EditRoleComponent } from "./edit-role/edit-role.component";


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
        path: "roles",
        component: ManageRolesComponent,
        resolve: {
            roles: AllRolesResolver
        }
    },
    {
        path: "role/new",
        component: EditRoleComponent,
    },
    {
        path: "role/:roleId",
        component: EditRoleComponent,
        resolve: {
            role: RoleResolver
        }
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: "/admin/stuff-management/users"
    }
];

export const routing = RouterModule.forChild(routes);

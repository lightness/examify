import { Routes, RouterModule } from "@angular/router";


const appRoutes: Routes = [
    {
        path: "admin",
        loadChildren: "./admin/admin.module#AdminModule",
    },
    {
        path: "login",
        loadChildren: "../common/login/login.module#LoginModule",
    },
    {
        path: "",
        loadChildren: "./public/public.module#PublicModule",
    },
    {
        path: "**",
        redirectTo: "/login"
    }
];

export const routing = RouterModule.forRoot(appRoutes);

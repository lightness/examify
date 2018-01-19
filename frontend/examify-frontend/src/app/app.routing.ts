import { Routes, RouterModule } from "@angular/router";


const appRoutes: Routes = [
    { 
        path: "admin", 
        loadChildren: "./admin/admin.module#AdminModule" 
    },
    {
        path: "", 
        loadChildren: "./public/public.module#PublicModule",
    },
    { 
        path: "**", 
        redirectTo: "/" 
    }
];

export const routing = RouterModule.forRoot(appRoutes);

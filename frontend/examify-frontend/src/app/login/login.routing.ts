import { Routes, RouterModule } from "@angular/router";

import { LoginPageComponent } from "./login-page/login-page.component";


const routes: Routes = [
    {
        path: "",
        component: LoginPageComponent
    }
];

export const routing = RouterModule.forChild(routes);

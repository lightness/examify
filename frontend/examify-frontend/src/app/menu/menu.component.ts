import { map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { Component, OnInit } from "@angular/core";

import { Permission } from "../../common/entity/permission.enum";
import { AuthService } from "../../common/auth/auth.service";


@Component({
    selector: "ex-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {

    private currentUserName: string;
    private isAuthenticated: boolean;

    public constructor(
        private authService: AuthService
    ) {
    }

    public ngOnInit() {
        this.authService.currentUser
            .pipe(
                map(currentUser => currentUser && currentUser.name)
            )
            .subscribe((currentUserName: string) => {
                this.currentUserName = currentUserName;
                this.isAuthenticated = !!currentUserName;
            });
    }

    public signOut() {
        this.authService.signOut();
    }

    private get canManageContent() {
        return this.authService.hasPermissions([Permission.MANAGE_CONTENT]);
    }

    private get canManageStuff() {
        return this.authService.hasPermissions([Permission.MANAGE_STUFF]);
    }

    private get canSeePersonalDashboard() {
        return this.authService.hasPermissions([Permission.SEE_PERSONAL_DASHBOARD]);
    }

}

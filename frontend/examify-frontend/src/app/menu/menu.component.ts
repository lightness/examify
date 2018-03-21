import { Component } from "@angular/core";
import { AuthService } from "../../common/auth/auth.service";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Observable } from "rxjs/Observable";
import { Permission } from "../../common/auth/permission.enum";


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

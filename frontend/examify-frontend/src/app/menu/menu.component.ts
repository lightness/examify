import { map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { Component, OnInit } from "@angular/core";

import { Permission } from "../common/entity/permission.enum";
import { AuthService } from "../common/auth/auth.service";
import { RoutingService } from "../common/routing.service";


@Component({
    selector: "ex-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {

    private currentUserName: string;
    private isAuthenticated: boolean;

    public constructor(
        private authService: AuthService,
        private routingService: RoutingService
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
        return this.authService.hasPermissions([Permission.VIEW_DASHBOARD]);
    }

    private get loginPageRoute() {
        return this.routingService.getLoginPage();
    }

    private get statisticsRootPageRoute() {
        return this.routingService.getStatisticsRootPage();
    }

    private get examSelectPageRoute() {
        return this.routingService.getExamSelectPage();
    }

    private get topicsManagePageRoute() {
        return this.routingService.getTopicsManagePage();
    }

    private get usersManagePageRoute() {
        return this.routingService.getTopicsManagePage(); // TODO: getUsersManagePage
    }

}

import { Component } from "@angular/core";
import { map, tap, filter } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";

import { User } from "../../common/entity/user.entity";
import { Permission } from "../../common/entity/permission.enum";
import { AuthService } from "../../common/auth/auth.service";
import { CommonApiService } from "../../common/common-api.service";
import { RoutingService } from "../../common/routing.service";


@Component({
    selector: "ex-statistics-home",
    templateUrl: "./statistics-home.component.html",
    styleUrls: ["./statistics-home.component.scss"]
})
export class StatisticsHomeComponent {

    private allUsers: User[];
    private selectedUserId: number;

    public constructor(
        private authService: AuthService,
        private router: Router,
        private commonApiService: CommonApiService,
        private activatedRoute: ActivatedRoute,
        private routingService: RoutingService
    ) {
        this.allUsers = this.activatedRoute.snapshot.data["allUsers"];
    }

    public goToMyStatistics() {
        this.authService.currentUser
            .pipe(
            filter(currentUser => !!currentUser),
            // tap(currentUser => console.log(">>> currentUser!", currentUser)),
            map(currentUser => currentUser && currentUser.id)
            )
            .subscribe(currentUserId => {
                let route = this.routingService.getUserStatisticsPage(currentUserId);

                this.router.navigate(route);
            });
    }

    public goToUserStatistics() {
        let route = this.routingService.getUserStatisticsPage(this.selectedUserId);

        this.router.navigate(route);
    }

    private get canManageStuff() {
        return this.authService.hasPermissions([Permission.MANAGE_STUFF]);
    }

}

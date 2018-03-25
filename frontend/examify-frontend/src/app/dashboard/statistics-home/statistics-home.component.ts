import { Router } from "@angular/router";
import { map, tap, filter } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";

import { User } from "../../common/entity/user.entity";
import { Permission } from "../../common/entity/permission.enum";
import { AuthService } from "../../common/auth/auth.service";
import { CommonApiService } from "../../common/common-api.service";


@Component({
    selector: "ex-statistics-home",
    templateUrl: "./statistics-home.component.html",
    styleUrls: ["./statistics-home.component.scss"]
})
export class StatisticsHomeComponent implements OnInit {

    private allUsers: User[];
    private selectedUserId: number;

    public constructor(
        private authService: AuthService,
        private router: Router,
        private commonApiService: CommonApiService
    ) {
    }

    public ngOnInit() {
        if (this.canManageStuff) {
            this.commonApiService.getAllUsers()
                .subscribe((users: User[]) => {
                    this.allUsers = users;
                });
        }
    }

    public goToMyStatistics() {
        this.authService.currentUser
            .pipe(
            filter(currentUser => !!currentUser),
            // tap(currentUser => console.log(">>> currentUser!", currentUser)),
            map(currentUser => currentUser && currentUser.id)
            )
            .subscribe(currentUserId => {
                this.router.navigate(["/dashboard", "statistics", "user", currentUserId]);
            });
    }

    private get canManageStuff() {
        return this.authService.hasPermissions([Permission.MANAGE_STUFF]);
    }

}

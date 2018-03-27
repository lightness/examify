import * as _ from "lodash";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { User } from "../../../common/entity/user.entity";
import { Role } from "../../../common/entity/role.entity";
import { RoutingService } from "../../../common/routing.service";
import { CommonApiService } from "../../../common/common-api.service";


@Component({
    selector: "ex-manage-users",
    templateUrl: "./manage-users.component.html",
    styleUrls: ["./manage-users.component.scss"]
})
export class ManageUsersComponent {

    private users: User[];

    public constructor(
        private activatedRoute: ActivatedRoute,
        private routingService: RoutingService,
        private commonApiService: CommonApiService
    ) {
        this.users = this.activatedRoute.snapshot.data["users"];
    }

    private get userAddPageRoute() {
        return this.routingService.getUserAddPage();
    }

    private getUserEditPageRoute(userId: number) {
        return this.routingService.getUserEditPage(userId);
    }

    private beautifyRoles(roles: Role[]): string {
        return _(roles)
            .map(role => role.name)
            .join(", ");
    }

    private deleteUser(userId: number) {
        if (confirm(`Do you really want to remove user #${userId}?`)) {
            this.commonApiService.deleteUser(userId)
                .subscribe(() => {
                    this.fetchUsers();
                });
        }
    }

    private fetchUsers() {
        this.commonApiService.getAllUsers()
            .subscribe(users => {
                this.users = users;
            });
    }

}

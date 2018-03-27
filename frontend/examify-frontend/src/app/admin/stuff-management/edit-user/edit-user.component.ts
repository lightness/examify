import * as _ from "lodash";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Role } from "../../../common/entity/role.entity";
import { User } from "../../../common/entity/user.entity";
import { RoutingService } from "../../../common/routing.service";
import { CommonApiService } from "../../../common/common-api.service";


@Component({
    selector: "ex-edit-user",
    templateUrl: "./edit-user.component.html",
    styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent {

    public user: User;
    private allRoles: Role[];
    private roleIds: number[];

    private multiselectSettings: Object = { checkedStyle: "fontawesome", buttonClasses: "btn btn-default" };

    public constructor(
        private activatedRoute: ActivatedRoute,
        private commonApiService: CommonApiService,
        private routingService: RoutingService,
        private router: Router
    ) {
        this.user = this.activatedRoute.snapshot.data["user"] || {};
        this.roleIds = _.map(this.user.roles, role => role.id);

        this.allRoles = this.activatedRoute.snapshot.data["allRoles"] || [];
    }

    private get usersManagePageRoute() {
        return this.routingService.getUsersManagePage();
    }

    private onRolesChange(roleIds: number[]) {
        this.user.roles = _.filter(this.allRoles, role => _.find(roleIds, id => id === role.id));
    }

    private deleteUser() {
        if (confirm(`Do you really want to delete user #${this.user.id}?`)) {
            this.commonApiService.deleteUser(this.user.id)
                .subscribe(() => {
                    this.router.navigate(this.usersManagePageRoute);
                });
        }
    }

    private save() {
        let result;

        if (this.user.id) {
            result = this.commonApiService.updateUser(this.user);
        } else {
            result = this.commonApiService.createUser(this.user);
        }

        result.subscribe(newTopic => {
            this.router.navigate(this.usersManagePageRoute);
        });
    }

}

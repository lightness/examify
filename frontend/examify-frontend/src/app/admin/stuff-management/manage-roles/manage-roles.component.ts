import * as _ from "lodash";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Role } from "../../../common/entity/role.entity";
import { RoutingService } from "../../../common/routing.service";
import { CommonApiService } from "../../../common/common-api.service";
import { Permission } from "../../../common/entity/permission.enum";
import { RolePermission } from "../../../common/entity/role-permission.entity";


@Component({
    selector: "ex-manage-roles",
    templateUrl: "./manage-roles.component.html",
    styleUrls: ["./manage-roles.component.scss"]
})
export class ManageRolesComponent {

    private roles: Role[];

    public constructor(
        private activatedRoute: ActivatedRoute,
        private routingService: RoutingService,
        private commonApiService: CommonApiService
    ) {
        this.roles = this.activatedRoute.snapshot.data["roles"];
    }

    private get roleAddPageRoute() {
        return this.routingService.getRoleAddPage();
    }

    private getRoleEditPageRoute(userId: number) {
        return this.routingService.getRoleEditPage(userId);
    }

    private beautifyPermissions(rolePermissions: RolePermission[]): string {
        return _(rolePermissions)
            .map(rolePermission => rolePermission.permission)
            .join(", ");
    }

    private deleteRole(roleId: number) {
        if (confirm(`Do you really want to remove role #${roleId}?`)) {
            this.commonApiService.deleteRole(roleId)
                .subscribe(() => {
                    this.fetchRoles();
                });
        }
    }

    private fetchRoles() {
        this.commonApiService.getAllRoles()
            .subscribe(roles => {
                this.roles = roles;
            });
    }

}

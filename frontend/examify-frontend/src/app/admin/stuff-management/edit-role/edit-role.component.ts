import * as _ from "lodash";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Role } from "../../../common/entity/role.entity";
import { RoutingService } from "../../../common/routing.service";
import { CommonApiService } from "../../../common/common-api.service";
import { Permission } from "../../../common/entity/permission.enum";


@Component({
    selector: "ex-edit-role",
    templateUrl: "./edit-role.component.html",
    styleUrls: ["./edit-role.component.scss"]
})
export class EditRoleComponent {

    public role: Role;
    private allPermissions: Permission[];
    private selectedPermissions: Permission[];

    private multiselectSettings: Object = { checkedStyle: "fontawesome", buttonClasses: "btn btn-default" };

    public constructor(
        private activatedRoute: ActivatedRoute,
        private commonApiService: CommonApiService,
        private routingService: RoutingService,
        private router: Router
    ) {
        this.role = this.activatedRoute.snapshot.data["role"] || {};
        this.selectedPermissions = _.map(this.role.rolePermissions, rolePermission => rolePermission.permission);
        this.allPermissions = _(Permission)
            .values()
            .map(permission => ({ id: permission, name: permission }))
            .value();
    }

    private get rolesManagePageRoute() {
        return this.routingService.getRolesManagePage();
    }

    private onPermissionsChange(permissions: Permission[]) {
        this.role.rolePermissions = _.map(permissions, permission => {
            return {
                permission
            };
        });
    }

    private deleteUser() {
        if (confirm(`Do you really want to delete role "${this.role.name}"?`)) {
            this.commonApiService.deleteRole(this.role.id)
                .subscribe(() => {
                    this.router.navigate(this.rolesManagePageRoute);
                });
        }
    }

    private save() {
        let result;

        if (this.role.id) {
            result = this.commonApiService.updateRole(this.role);
        } else {
            result = this.commonApiService.createRole(this.role);
        }

        result.subscribe(newTopic => {
            this.router.navigate(this.rolesManagePageRoute);
        });
    }

}

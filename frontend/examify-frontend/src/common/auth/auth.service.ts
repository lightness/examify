import * as _ from "lodash";
import { Injectable } from "@angular/core";

import { Permission } from "./permission.enum";


@Injectable()
export class AuthService {

    private TOKEN_KEY = "auth_token";
    private PERMISSIONS_KEY = "auth_permissions";

    public setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    public getToken(): string {
        return localStorage.getItem(this.TOKEN_KEY) || null;
    }

    public setPermissions(permissions: Permission[]): void {
        localStorage.setItem(this.PERMISSIONS_KEY, JSON.stringify(permissions));
    }

    public hasPermissions(requiredPermissions: Permission[]): boolean {
        let allPermissions: Permission[] = JSON.parse(localStorage.getItem(this.PERMISSIONS_KEY));
        let absentPermissions: Permission[] = _.difference(requiredPermissions, allPermissions);
        let hasAbsentPermissions: boolean = !_.isEmpty(absentPermissions);

        if (hasAbsentPermissions) {
            console.error("Absent permissions: ", absentPermissions);
        }

        return !hasAbsentPermissions;
    }

}

import * as _ from "lodash";
import * as jwtDecode from "jwt-decode";
import { Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { Permission } from "../entity/permission.enum";


@Injectable()
export class AuthService {

    private TOKEN_KEY = "auth_token";
    private PERMISSIONS_KEY = "auth_permissions";

    private currentUser$: Subject<{ id: number, name: string }> = new BehaviorSubject<{ id: number, name: string }>(null);

    public constructor(private router: Router) {
        let token: string = this.getToken();

        if (token) {
            this.emitCurrentUser(token);
        } else {
            this.router.navigate(["/login"]);
        }
    }

    public get currentUser(): Observable<{ id: number, name: string }> {
        return this.currentUser$.asObservable();
    }

    public get isAuthenticated(): boolean {
        return;
    }

    public setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        this.emitCurrentUser(token);
    }

    public getToken(): string {
        return localStorage.getItem(this.TOKEN_KEY) || null;
    }

    public signOut(): void {
        this.removeToken();
        this.removePermissions();
        this.emitCurrentUser(null);
        this.router.navigate(["/login"]);
    }

    public setPermissions(permissions: Permission[]): void {
        localStorage.setItem(this.PERMISSIONS_KEY, JSON.stringify(permissions));
    }

    public hasPermissions(requiredPermissions: Permission[]): boolean {
        let allPermissions: Permission[] = JSON.parse(localStorage.getItem(this.PERMISSIONS_KEY));
        let absentPermissions: Permission[] = _.difference(requiredPermissions, allPermissions);
        let hasAbsentPermissions: boolean = !_.isEmpty(absentPermissions);

        return !hasAbsentPermissions;
    }

    private emitCurrentUser(token: string): void {
        if (!token) {
            this.currentUser$.next(null);

            return;
        }

        let payload = jwtDecode(token);
        this.currentUser$.next(payload.user);
    }

    private removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    private removePermissions(): void {
        localStorage.removeItem(this.PERMISSIONS_KEY);
    }
}

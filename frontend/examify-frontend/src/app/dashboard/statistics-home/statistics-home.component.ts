import { map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Component } from "@angular/core";

import { AuthService } from "../../../common/auth/auth.service";


@Component({
    selector: "ex-statistics-home",
    templateUrl: "./statistics-home.component.html",
    styleUrls: ["./statistics-home.component.css"]
})
export class StatisticsHomeComponent {

    public constructor(
        private authService: AuthService,
        private router: Router
    ) {
    }

    public goToMyStatistics() {
        this.authService.currentUser
            .pipe(
                tap(currentUser => console.log(">>> currentUser!", currentUser)),
                map(currentUser => currentUser && currentUser.id)
            )
            .subscribe(currentUserId => {
                console.log(">>> XX!", currentUserId);

                this.router.navigate(["/dashboard", "statistics", "user", currentUserId]);
            });
    }

}

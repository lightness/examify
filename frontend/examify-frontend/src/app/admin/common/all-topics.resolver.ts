import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { AdminService } from "../admin.service";


@Injectable()
export class AllTopicsResolver implements Resolve<Topic[]> {

    public constructor(
        private adminService: AdminService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<Topic[]> {
        return this.adminService.getAllTopics();
    }

}

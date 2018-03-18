import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { AdminService } from "../admin.service";


@Injectable()
export class TopicResolver implements Resolve<Topic> {

    public constructor(
        private adminService: AdminService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<Topic> {
        let topicId: number = route.params["topicId"];

        if (!topicId) {
            return;
        }

        return this.adminService.getTopic(topicId);
    }

}

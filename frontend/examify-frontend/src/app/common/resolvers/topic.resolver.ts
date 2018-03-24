import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { Topic } from "../../common/entity/topic.entity";
import { CommonApiService } from "../common-api.service";


@Injectable()
export class TopicResolver implements Resolve<Topic> {

    public constructor(
        private commonApiService: CommonApiService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<Topic> {
        let topicId: number = route.params["topicId"] || route.queryParams["topicId"];

        if (!topicId) {
            return;
        }

        return this.commonApiService.getTopic(topicId);
    }

}

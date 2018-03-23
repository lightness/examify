import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { Topic } from "../../../common/entity/topic.entity";
import { PublicService } from "../public.service";


@Injectable()
export class TopicResolver implements Resolve<Topic> {

    public constructor(
        private publicService: PublicService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<Topic> {
        let topicId: number = route.params["topicId"];

        if (!topicId) {
            return;
        }

        return this.publicService.getTopic(topicId);
    }

}

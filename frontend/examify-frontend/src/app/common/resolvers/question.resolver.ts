import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";

import { Question } from "../../common/entity/question.entity";
import { CommonApiService } from "../common-api.service";


@Injectable()
export class QuestionResolver implements Resolve<Question> {

    public constructor(
        private commonApiService: CommonApiService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<Question> {
        let questionId: number = route.params["questionId"];

        if (!questionId) {
            return;
        }

        return this.commonApiService.getQuestion(questionId);
    }

}

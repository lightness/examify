import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { ApiService } from "../../common/api.service";
import { Topic } from "../../common/entity/topic.entity";


@Injectable()
export class PublicService {

    constructor(private apiService: ApiService) { }

    public getAllTopics(): Observable<Topic[]> {
        return this.apiService.get("/topics");
    }

    public getTopic(topicId: number): Observable<Topic> {
        return this.apiService.get(`/topics/${topicId}`);
    }

    public getExam(topicId: number): Observable<Topic> {
        return this.apiService.get(`/exam/start`, { topicId });
    }

    public checkExam(results: any): Observable<any> {
        return this.apiService.post(`/exam/check`, results);
    }

}

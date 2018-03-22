import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Exam } from "../../common/entity/exam.entity";
import { Topic } from "../../common/entity/topic.entity";
import { ApiService } from "../../common/api.service";


@Injectable()
export class PublicService {

    constructor(private apiService: ApiService) { }

    public getAllTopics(): Observable<Topic[]> {
        return this.apiService.get("/topics");
    }

    public getTopic(topicId: number): Observable<Topic> {
        return this.apiService.get(`/topics/${topicId}`);
    }

    public startExamByTopic(topicId: number): Observable<Exam> {
        return this.apiService.get(`/exam/start`, { topicId });
    }

    public checkExam(results: any): Observable<any> {
        return this.apiService.post(`/exam/finish`, results);
    }

}
